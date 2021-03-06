/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import "WXLog.h"
#import "WXUtility.h"
#import "WXComponent_internal.h"
#import "WXComponentManager.h"
#import "WXSDKInstance_private.h"

#import "WXCellSlotComponent.h"
#import "WXRecycleListLayout.h"
#import "WXRecycleListComponent.h"
#import "WXRecycleListDataManager.h"
#import "WXRecycleListTemplateManager.h"
#import "WXRecycleListUpdateManager.h"
#import "WXBridgeManager.h"
#import "WXSDKManager.h"
#import "WXComponent+DataBinding.h"
#import "WXComponent+Layout.h"
#import "WXModuleProtocol.h"

@interface WXRecycleListComponentView:UICollectionView
@end

@implementation WXRecycleListComponentView
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch
{
    if ([(id <WXScrollerProtocol>) self.wx_component respondsToSelector:@selector(requestGestureShouldStopPropagation:shouldReceiveTouch:)]) {
        return [(id <WXScrollerProtocol>) self.wx_component requestGestureShouldStopPropagation:gestureRecognizer shouldReceiveTouch:touch];
    }
    else{
        return YES;
    }
}

- (void)setContentOffset:(CGPoint)contentOffset animated:(BOOL)animated
{
    [super setContentOffset:contentOffset animated:animated];
    BOOL scrollStartEvent = [[self.wx_component valueForKey:@"_scrollStartEvent"] boolValue];
    id scrollEventListener = [self.wx_component valueForKey:@"_scrollEventListener"];
    
    if (animated && (scrollStartEvent ||scrollEventListener)  && !WXPointEqualToPoint(contentOffset, self.contentOffset)) {
        CGFloat scaleFactor = self.wx_component.weexInstance.pixelScaleFactor;
        NSDictionary *contentSizeData = @{@"width":@(self.contentSize.width / scaleFactor),
                                          @"height":@(self.contentSize.height / scaleFactor)};
        NSDictionary *contentOffsetData = @{@"x":@(-self.contentOffset.x / scaleFactor),
                                            @"y":@(-self.contentOffset.y / scaleFactor)};
        if (scrollStartEvent) {
            [self.wx_component fireEvent:@"scrollstart" params:@{@"contentSize":contentSizeData, @"contentOffset":contentOffsetData} domChanges:nil];
        }
        if (scrollEventListener) {
            WXScrollerComponent *component = (WXScrollerComponent *)self.wx_component;
            component.scrollEventListener(component, @"scrollstart", @{@"contentSize":contentSizeData, @"contentOffset":contentOffsetData});
        }
    }
}

@end

@interface WXRecycleListComponent () <WXRecycleListLayoutDelegate, WXRecycleListUpdateDelegate, UICollectionViewDelegateFlowLayout, UICollectionViewDataSource>

@end

@implementation WXRecycleListComponent
{
    NSString *_templateSwitchKey;
    NSString *_aliasKey;
    NSString *_indexKey;
    __weak UICollectionView *_collectionView;
    
    NSMutableDictionary *_sizeCache;
    NSMutableDictionary *_stickyCache;
    
    NSUInteger _previousLoadMoreCellNumber;
}

WX_EXPORT_METHOD(@selector(appendData:))
WX_EXPORT_METHOD(@selector(appendRange:))
WX_EXPORT_METHOD(@selector(insertData:data:))
WX_EXPORT_METHOD(@selector(updateData:data:))
WX_EXPORT_METHOD(@selector(removeData:count:))
WX_EXPORT_METHOD(@selector(moveData:toIndex:))
WX_EXPORT_METHOD(@selector(insertRange:range:))
WX_EXPORT_METHOD(@selector(setListData:))
WX_EXPORT_METHOD(@selector(scrollTo:options:))
WX_EXPORT_METHOD(@selector(scrollToElement:options:))
WX_EXPORT_METHOD(@selector(queryElement:cssSelector:callback:))
WX_EXPORT_METHOD(@selector(queryElementAll:cssSelector:callback:))
WX_EXPORT_METHOD(@selector(closest:cssSelector:callback:))

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString *)type
                     styles:(NSDictionary *)styles
                 attributes:(NSDictionary *)attributes
                     events:(NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _dataManager = attributes[@"listData"]? [[WXRecycleListDataManager alloc] initWithData:attributes[@"listData"]] : [WXRecycleListDataManager new];
        _templateManager = [WXRecycleListTemplateManager new];
        _updateManager = [WXRecycleListUpdateManager new];
        _updateManager.delegate = self;
        _templateSwitchKey = [WXConvert NSString:attributes[@"switch"]];
        _aliasKey = [WXConvert NSString:attributes[@"alias"]];
        _indexKey = [WXConvert NSString:attributes[@"index"]];
        _sizeCache = [NSMutableDictionary dictionary];
        _stickyCache = [NSMutableDictionary dictionary];
    }
    
    return self;
}

#pragma mark - WXComponent Methods

- (UIView *)loadView
{
    WXRecycleListLayout *layout = [self recycleListLayout];
    return [[WXRecycleListComponentView alloc] initWithFrame:CGRectZero collectionViewLayout:layout];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    _collectionView = (UICollectionView *)self.view;
    _collectionView.allowsSelection = NO;
    _collectionView.allowsMultipleSelection = NO;
    _collectionView.dataSource = self;
    _collectionView.delegate = self;
    
    _templateManager.collectionView = _collectionView;
    _updateManager.collectionView = _collectionView;
}

- (void)viewWillUnload
{
    [super viewWillUnload];
    
    _collectionView.dataSource = nil;
    _collectionView.delegate = nil;
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    [super updateAttributes:attributes];
    
    if (attributes[@"listData"]) {
        NSArray *listData = attributes[@"listData"];
        [self _updateListData:listData withCompletion:nil animation:NO];
    }
    if (attributes[@"switch"]) {
        _templateSwitchKey = [WXConvert NSString:attributes[@"switch"]];
    }
    if (attributes[@"alias"]) {
        _aliasKey = [WXConvert NSString:attributes[@"alias"]];
    }
    if (attributes[@"index"]) {
        _indexKey = [WXConvert NSString:attributes[@"index"]];
    }
    if (attributes[@"scrollDirection"]) {
        WXScrollDirection newScrollDirection = attributes[@"scrollDirection"] ? [WXConvert WXScrollDirection:attributes[@"scrollDirection"]] : WXScrollDirectionVertical;
        [self _updateScrollDirection:newScrollDirection];
    }
}

- (CGPoint)absolutePositionForComponent:(WXComponent *)component
{
    CGPoint position = CGPointZero;
    UIView *view = component->_view;
    while (view) {
        if ([view isKindOfClass:[UICollectionViewCell class]]) {
            NSIndexPath *indexPath = [_collectionView indexPathForCell:(UICollectionViewCell *)view];
            if (!indexPath) {
                return CGPointMake(NAN, NAN);
            }
            UICollectionViewLayoutAttributes *attributes = [_collectionView layoutAttributesForItemAtIndexPath:indexPath];
            CGPoint cellOrigin = attributes.frame.origin;
            position = CGPointMake(position.x + cellOrigin.x,
                                   position.y + cellOrigin.y);
            break;
        }
        position = CGPointMake(position.x + view.frame.origin.x,
                               position.y + view.frame.origin.y);
        view = view.superview;
    }
    
    return position;
}

- (void)setContentSize:(CGSize)contentSize
{
    // Do Nothing
}

- (void)adjustSticky
{
    // Do Nothing, sticky is adjusted by layout
}

#pragma mark - Load More Event

- (void)loadMore
{
    [super loadMore];
    _previousLoadMoreCellNumber = [_collectionView numberOfItemsInSection:0];
}

- (BOOL)isNeedLoadMore
{
    BOOL superNeedLoadMore = [super isNeedLoadMore];
    return superNeedLoadMore && _previousLoadMoreCellNumber != [_collectionView numberOfItemsInSection:0];
}

- (void)resetLoadmore
{
    [super resetLoadmore];
    _previousLoadMoreCellNumber = 0;
}

#pragma mark - Exported Component Methods

- (void)appendData:(id)appendingData
{
    if (!appendingData){
        return;
    }
    NSMutableArray * newListData = [[_dataManager data] mutableCopy];
    [newListData addObject:appendingData];
}

- (void)appendRange:(NSArray*)data
{
    if (![data isKindOfClass:[NSArray class]]) {
        WXLogError(@"wrong format of appending data:%@", data);
        return;
    }
    
    NSArray *oldData = [_dataManager data];
    [_updateManager updateWithAppendingData:data oldData:oldData completion:nil animation:NO];
}

- (void)setListData:(NSArray*)data
{
    if ([data count]) {
        [_dataManager updateData:data];
    }
}
- (void)insertData:(NSUInteger)index data:(id)data
{
    // TODO: bring the update logic to UpdateManager
    // TODO: update cell because index has changed
    NSMutableArray *newListData = [[_dataManager data] mutableCopy];
    if (index <= newListData.count) {
        [newListData insertObject:data atIndex:index];
        [_dataManager updateData:newListData];
        
        NSIndexPath *indexPath = [NSIndexPath indexPathForItem:index inSection:0];
        
        [UIView performWithoutAnimation:^{
            [self->_collectionView insertItemsAtIndexPaths:@[indexPath]];
        }];
    }
}

- (void)updateComponentData:(NSString*)componentDataId componentData:(NSDictionary*)componentData callback:(NSString*)callbackId
{
    NSMutableDictionary * virtualComponentData = [[_dataManager virtualComponentDataWithId:componentDataId] mutableCopy];
    NSIndexPath * indexPath = virtualComponentData[@"indexPath"];
    if (!indexPath) {
        return;
    }
    virtualComponentData = virtualComponentData?:[NSMutableDictionary new];
    [virtualComponentData addEntriesFromDictionary:componentData];
    [_dataManager updateVirtualComponentData:componentDataId data:[virtualComponentData copy]];
    virtualComponentData[@"@phase"] = @"update";
    virtualComponentData[@"callbackId"] = callbackId;
    [self _updateDataForCellSlotAtIndexPath:indexPath data:virtualComponentData];
}

- (void)_updateDataForCellSlotAtIndexPath:(NSIndexPath*)indexPath data:(NSDictionary*)data
{
    if(!indexPath || !data) {
        return;
    }
    WXPerformBlockOnMainThread(^{
        UICollectionViewCell * cellView = [self->_collectionView cellForItemAtIndexPath:indexPath];
        WXCellSlotComponent * cellSlotComponent = (WXCellSlotComponent*)cellView.wx_component;
        if (cellSlotComponent) {
            [self _updateBindingData:data forCell:cellSlotComponent atIndexPath:indexPath];
        }
        // callback when update virtual component data success.
        NSString * callbackId = data[@"callbackId"];
        if (callbackId) {
            [[WXSDKManager bridgeMgr] callBack:self.weexInstance.instanceId funcId:callbackId params:@{@"result":@"success"}];
        }
    });
}

- (void)updateData:(NSUInteger)index data:(id)data
{
    NSMutableArray *newListData = [[_dataManager data] mutableCopy];
    if (!data && index > [newListData count]) {
        return;
    }
    // TODO: bring the update logic to UpdateManager
    newListData[index] = data;
    [_dataManager updateData:newListData];
    NSMutableDictionary * newData = nil;
    if (![data isKindOfClass:[NSDictionary class]]) {
         newData = [NSMutableDictionary new];
        [newData setObject:@"data" forKey:data];
        data = newData;
    }
    newData = [data mutableCopy];
    newData[@"@phase"] = @"update";
    NSIndexPath *indexPath = [NSIndexPath indexPathForRow:index inSection:0];
    [self _updateDataForCellSlotAtIndexPath:indexPath data:[newData copy]];
}

- (void)insertRange:(NSInteger)index range:(NSArray*)data
{
    if (![data count]) {
        WXLogDebug(@"ignore invalid insertRange");
        return;
    }
    
    NSMutableArray * newListData = [[_dataManager data] mutableCopy];
    NSRange range = NSMakeRange(index,[data count]);
    NSIndexSet *indexSet = [NSIndexSet indexSetWithIndexesInRange:range];
    [newListData insertObjects:data atIndexes:indexSet];
    [_dataManager updateData:newListData];
    [_collectionView reloadData];
}

- (void)removeData:(NSInteger)index count:(NSInteger)count
{
    // TODO: bring the update logic to UpdateManager
    
    NSMutableArray *newListData = [[_dataManager data] mutableCopy];
    if (index > [newListData count] || index + count - 1 > [newListData count]) {
        
        return;
    }
    NSIndexSet *indexSet = [NSIndexSet indexSetWithIndexesInRange:NSMakeRange(index, count)];
    [newListData removeObjectsAtIndexes:indexSet];
    __block NSMutableArray<NSIndexPath*>* indexPaths = [NSMutableArray new];
    [indexSet enumerateIndexesUsingBlock:^(NSUInteger idx, BOOL * _Nonnull stop) {
        NSIndexPath* indexPath = [NSIndexPath indexPathForRow:idx inSection:0];
        [indexPaths addObject:indexPath];
    }];
    
    [_dataManager updateData:newListData];
    [_dataManager deleteVirtualComponentAtIndexPaths:indexPaths];
    [UIView performWithoutAnimation:^{
        [self->_collectionView deleteItemsAtIndexPaths:indexPaths];
        [self->_collectionView reloadSections:[NSIndexSet indexSetWithIndex:0]];
    }];
}

- (void)moveData:(NSUInteger)fromIndex toIndex:(NSUInteger)toIndex
{
    // TODO: bring the update logic to UpdateManager
    NSMutableArray *newListData = [[_dataManager data] mutableCopy];
    id data = newListData[fromIndex];
    [newListData removeObjectAtIndex:fromIndex];
    [newListData insertObject:data atIndex:toIndex];
    [_dataManager updateData:newListData];
    
    NSIndexPath *fromIndexPath = [NSIndexPath indexPathForItem:fromIndex inSection:0];
    NSIndexPath *toIndexPath = [NSIndexPath indexPathForItem:toIndex inSection:0];
    [UIView performWithoutAnimation:^{
        [self->_collectionView moveItemAtIndexPath:fromIndexPath toIndexPath:toIndexPath];
    }];
}

- (void)scrollTo:(NSString *)virtualElementInfo options:(NSDictionary *)options
{
    NSUInteger position = 0;
    if ([virtualElementInfo isKindOfClass:[NSNumber class]]) {
        position = [virtualElementInfo integerValue];
    }
    else
    {
        if (virtualElementInfo.length == 0) {
            return;
        }
        position = [self _positionForVirtualElementInfo:virtualElementInfo];
    }
    NSIndexPath *toIndexPath = [NSIndexPath indexPathForItem:position inSection:0];
    BOOL animated = options[@"animated"] ? [WXConvert BOOL:options[@"animated"]] : YES;
    [_collectionView scrollToItemAtIndexPath:toIndexPath atScrollPosition:UICollectionViewScrollPositionTop animated:animated];
}

- (void)scrollToElement:(NSString *)virtualElementInfo options:(NSDictionary *)options
{
    [self scrollTo:virtualElementInfo options:options];
}

- (void)queryElement:(NSString *)virtualElementInfo cssSelector:(NSString *)cssSelector callback:(WXModuleCallback)callback
{
    [self _queryElement:virtualElementInfo cssSelector:cssSelector callback:callback isAll:NO];
}

- (void)queryElementAll:(NSString *)virtualElementInfo cssSelector:(NSString *)cssSelector callback:(WXModuleCallback)callback
{
    [self _queryElement:virtualElementInfo cssSelector:cssSelector callback:callback isAll:YES];
}

- (NSString *)_refForVirtualElementInfo:(NSString *)virtualElementInfo
{
    if ([virtualElementInfo isKindOfClass:[NSString class]]){
        NSArray *stringArray = [virtualElementInfo componentsSeparatedByString:@"@"];
        if (stringArray.count == 2) {
            return stringArray[0];
        }
    }
    return nil;
}

- (NSUInteger )_positionForVirtualElementInfo:(NSString *)virtualElementInfo
{
    NSArray *stringArray = [virtualElementInfo componentsSeparatedByString:@"@"];
    if (stringArray.count == 2) {
        return [stringArray[1] integerValue];
    }
    return 0;
}

- (void)closest:(NSString *)virtualElementInfo cssSelector:(NSString *)cssSelector callback:(WXModuleCallback)callback
{
    if(callback)
    {
        WXPerformBlockOnComponentThread(^{
            WXComponent *component = [self.weexInstance.componentManager componentForRef:[self _refForVirtualElementInfo:virtualElementInfo]];
            if (component) {
                callback([self _closestComponentForCSSSelector:cssSelector component:component]);
            }
        });
    }
}

- (NSDictionary *)_closestComponentForCSSSelector:(NSString *)cssSelector component:(WXComponent *)component
{
    WXComponent *supercomponent = component.supercomponent;
    if ([self _parseCssSelector:cssSelector component:supercomponent]) {
        NSDictionary *info = @{@"attrs":supercomponent.attributes,@"type":supercomponent->_type,@"ref":supercomponent.ref};
        return info;
    }
    else
    {
        if ([supercomponent isKindOfClass:[WXRecycleListComponent class]] ) {
            return nil;
        }
        return [self _closestComponentForCSSSelector:cssSelector component:supercomponent];
    }
}

- (void)_queryElement:(NSString *)virtualElementInfo cssSelector:(NSString *)cssSelector callback:(WXModuleCallback)callback isAll:(BOOL)isAll
{
    if(callback)
    {
        WXPerformBlockSyncOnComponentThread(^{
            WXComponent *component = [self.weexInstance.componentManager componentForRef:[self _refForVirtualElementInfo:virtualElementInfo]];
            if (component) {
                NSMutableArray *infoArray = [NSMutableArray new];
                [self _matchComponentForCSSSelector:cssSelector component:component infoArray:infoArray];
                if (isAll) {
                    callback(infoArray);
                }
                else
                {
                    if (infoArray.count != 0) {
                        callback(infoArray[0]);
                    }
                }
            }
        });
    }
}

- (void)_matchComponentForCSSSelector:(NSString *)cssSelector component:(WXComponent *)component infoArray:(NSMutableArray *)infoArray
{
    for (WXComponent *subcomponent in component.subcomponents) {
        if ([self _parseCssSelector:cssSelector component:subcomponent]) {
            NSDictionary *info = @{@"attrs":subcomponent.attributes,@"type":subcomponent->_type,@"ref":subcomponent.ref};
            [infoArray addObject:info];
        }
        if (subcomponent.subcomponents.count != 0) {
            [self _matchComponentForCSSSelector:cssSelector component:subcomponent infoArray:infoArray];
        }
    }
}

- (BOOL)_parseCssSelector:(NSString *)cssSelector component:(WXComponent *)component
{
    if (!cssSelector) {
        return NO;
    }
    if ([cssSelector hasPrefix:@"["]&&[cssSelector hasSuffix:@"]"]) {
        NSCharacterSet *unwantedChars = [NSCharacterSet characterSetWithCharactersInString:@"\"[]"];
        NSString *requiredString = [[cssSelector componentsSeparatedByCharactersInSet:unwantedChars] componentsJoinedByString:@""];
        NSArray *selectorArray = [requiredString componentsSeparatedByString:@"="];
        if (selectorArray.count == 2) {
            NSString *attribute = selectorArray[0];
            NSString *value = selectorArray[1];
            NSDictionary *componentAttrs = component.attributes;
            NSString *valueString = [NSString stringWithFormat:@"%@",componentAttrs[attribute]];
            if ([valueString isEqualToString:value]) {
                return YES;
            }
        }
    }
    return NO;
}

#pragma mark - WXComponent Internal Methods

- (BOOL)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    BOOL inserted = [super _insertSubcomponent:subcomponent atIndex:index];
    if ([subcomponent isKindOfClass:[WXCellSlotComponent class]]) {
        WXCellSlotComponent *cell = (WXCellSlotComponent*)subcomponent;
        [self.weexInstance.componentManager _addUITask:^{
            [_templateManager addTemplate:cell];
        }];
        //TODO: update collection view if adding template
    }
    return inserted;
}

#pragma mark - Private

- (void)_updateBindingData:(id)data forCell:(WXCellSlotComponent *)cellComponent atIndexPath:(NSIndexPath *)indexPath
{
    id originalData = data;
    if (![originalData isKindOfClass:[NSDictionary class]]) {
        if (_aliasKey) {
            NSMutableDictionary * dictionary = [NSMutableDictionary dictionary];
            [dictionary setObject:data forKey:_aliasKey];
            data = dictionary;
        } else {
            return;
        }
    }
    
    if (!data[@"indexPath"] || !data[@"recycleListComponentRef"]) {
        NSMutableDictionary * dataNew = [data mutableCopy];
        dataNew[@"recycleListComponentRef"] = self.ref;
        dataNew[@"indexPath"] = indexPath;
        data = dataNew;
    }
    
    if ([originalData isKindOfClass:[NSDictionary class]] && _aliasKey &&!data[@"phase"]) {
        data = @{_aliasKey:data,@"aliasKey":_aliasKey};
    }
    
    if (_indexKey) {
        NSMutableDictionary *dataNew = [data mutableCopy];
        dataNew[_indexKey] = @(indexPath.item);
        data = dataNew;
    }
    
#ifdef DEBUG
    NSDate *startTime = [NSDate date];
#endif
    
    WXPerformBlockSyncOnComponentThread(^{
        [cellComponent updateCellData:[data copy]];
    });
#ifdef DEBUG
    double duration = -[startTime timeIntervalSinceNow] * 1000;
    WXLogDebug(@"cell:%li update data time:%f", (long)indexPath.item, duration);
#endif
    
    NSValue *cachedSize = _sizeCache[indexPath];
    if (!cachedSize || !CGSizeEqualToSize([cachedSize CGSizeValue] , cellComponent.calculatedFrame.size)) {
        _sizeCache[indexPath] = [NSValue valueWithCGSize:cellComponent.calculatedFrame.size];
        [_collectionView.collectionViewLayout invalidateLayout];
    }
    NSNumber *cachedSticky = _stickyCache[indexPath];
    BOOL isSticky = cellComponent->_positionType == WXPositionTypeSticky;
    if (!cachedSticky || [cachedSticky boolValue] != isSticky) {
        _stickyCache[indexPath] = @(isSticky);
    }
}

- (void)_updateListData:(NSArray *)newData
        withCompletion:(WXRecycleListUpdateCompletion)completion
             animation:(BOOL)animation
{
    if (![newData isKindOfClass:[NSArray class]]) {
        WXLogError(@"wrong format of list data:%@", newData);
        if (completion) {
            completion(NO);
        }
        return;
    }
    
    NSArray *oldData = [_dataManager data];
    [_updateManager updateWithNewData:newData oldData:oldData completion:completion animation:animation];
}

- (void)_updateScrollDirection:(WXScrollDirection)newScrollDirection
{   
    WXRecycleListLayout *layout = [self recycleListLayout];
    _collectionView.collectionViewLayout = layout;
}

- (WXRecycleListLayout *)recycleListLayout
{
    WXRecycleListLayout *layout = [WXRecycleListLayout new];
    layout.delegate = self;
    // to show cells that original width / height is zero, otherwise cellForItemAtIndexPath will not be called
    layout.minimumLineSpacing = 0.01;
    layout.minimumInteritemSpacing = 0.01;
    if (WXScrollDirectionHorizontal == self.scrollDirection) {
        layout.scrollDirection = UICollectionViewScrollDirectionHorizontal;
    }
    return layout;
}

#pragma mark - UICollectionViewDataSource

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView
{
    return 1;
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return [_dataManager numberOfItems];
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    // 1. get the data relating to the cell
    id data = [_dataManager dataAtIndex:indexPath.row];
    
    // 2. get the template type specified by data, and if template is not found, return an empty view of any template to avoid crash.
    NSString * templateType = [self templateType:indexPath];
    _templateManager.collectionView = collectionView;
    if (!templateType) {
        WXLogError(@"Template %@ not registered for collection view.", templateType);
        UICollectionViewCell *cellView = [_collectionView dequeueReusableCellWithReuseIdentifier:[_templateManager anyRegisteredTemplate] forIndexPath:indexPath];
        for (UIView *view in cellView.contentView.subviews) {
            [view removeFromSuperview];
        }
        cellView.wx_component = nil;
        [cellView setAccessibilityIdentifier:nil];
        return cellView;
    }
    if (![_templateManager isTemplateRegistered:templateType]) {
        templateType = @"default";
    }
    
    // 3. dequeue a cell component by template type
    UICollectionViewCell *cellView = [_collectionView dequeueReusableCellWithReuseIdentifier:templateType forIndexPath:indexPath];
    WXCellSlotComponent *cellComponent = (WXCellSlotComponent *)cellView.wx_component;
    if (!cellComponent) {
        cellComponent = [_templateManager dequeueCellSlotWithType:templateType forIndexPath:indexPath];
        cellView.wx_component = cellComponent;
        WXPerformBlockOnComponentThread(^{
            //TODO: How can we avoid this?
            [super _insertSubcomponent:cellComponent atIndex:self.subcomponents.count];
        });
    }
    
    // 4. binding the data to the cell component
    [self _updateBindingData:data forCell:cellComponent atIndexPath:indexPath];

    // 5. Add cell component's view to content view.
    UIView *contentView = cellComponent.view;
    if (contentView.superview == cellView.contentView) {
        return cellView;
    }
    
    for (UIView *view in cellView.contentView.subviews) {
        [view removeFromSuperview];
    }
    [cellView.contentView addSubview:contentView];
    [cellView setAccessibilityIdentifier:contentView.accessibilityIdentifier];
    
    WXLogDebug(@"Return cell view:%@, indexPath:%@", cellView, indexPath);
    
    [self handleAppear];
    
    return cellView;
}

- (UICollectionReusableView *)collectionView:(UICollectionView *)collectionView viewForSupplementaryElementOfKind:(NSString *)kind atIndexPath:(NSIndexPath *)indexPath
{
    return nil;
}

#pragma mark - UICollectionViewDelegate

- (void)collectionView:(UICollectionView *)collectionView willDisplayCell:(UICollectionViewCell *)cell forItemAtIndexPath:(NSIndexPath *)indexPath
{
    WXLogDebug(@"will display cell:%@, at index path:%@", cell, indexPath);
}

- (void)collectionView:(UICollectionView *)collectionView didEndDisplayingCell:(UICollectionViewCell *)cell forItemAtIndexPath:(NSIndexPath *)indexPath
{
    cell.wx_component = nil;
    WXLogDebug(@"Did end displaying cell:%@, at index path:%@", cell, indexPath);
}

#pragma mark - UICollectionViewDelegateFlowLayout

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath
{
    NSValue *size = _sizeCache[indexPath];
    if (size) {
        return [size CGSizeValue];
    } else {

        WXCellSlotComponent *cell = [_templateManager templateWithType:[self templateType:indexPath]];
        CGSize size = cell.calculatedFrame.size;
        _sizeCache[indexPath] = [NSValue valueWithCGSize:size];
        return CGSizeMake(_collectionView.frame.size.width, size.height);
    }
}

#pragma mark - WXRecycleListLayoutDelegate

- (BOOL)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout isNeedStickyForIndexPath:(NSIndexPath *)indexPath
{
    NSNumber *cachedSticky = _stickyCache[indexPath];
    if (cachedSticky) {
        return [cachedSticky boolValue];
    } else {
        return NO;
    }
}

#pragma mark - WXRecycleListUpdateDelegate

- (void)updateManager:(WXRecycleListUpdateManager *)manager willUpdateData:(id)newData
{
    [_dataManager updateData:newData];
}

- (void)updateManager:(WXRecycleListUpdateManager *)manager didUpdateData:(id)newData withSuccess:(BOOL)finished
{
    
}

- (NSString*)templateType:(NSIndexPath*)indexPath
{
    NSDictionary *data = [_dataManager dataAtIndex:indexPath.row];
    // default is first template.
    NSString *templateType = [_templateManager topTemplate].templateCaseType;
    if (!data || ![data isKindOfClass:[NSDictionary class]]) {
        return templateType;
    }
    
    if (_templateSwitchKey && data[_templateSwitchKey]){
        templateType = data[_templateSwitchKey];
    } else if (data[WXDefaultRecycleTemplateType]){
        // read the default type.
        templateType = data[WXDefaultRecycleTemplateType];
    }
    return templateType;
}

@end
