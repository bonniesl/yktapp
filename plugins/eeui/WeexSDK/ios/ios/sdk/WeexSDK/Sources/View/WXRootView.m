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

#import "WXRootView.h"
#import "WXSDKInstance.h"
#import "WXPageEventNotifyEvent.h"
#import "WXSDKEngine.h"

@interface WXRootView()

@property (nonatomic, assign) BOOL mHasEvent;

@end

@implementation WXRootView

- (void)setFrame:(CGRect)frame
{
    BOOL shouldNotifyLayout = NO;
    if (_instance.onLayoutChange && !CGRectEqualToRect(self.frame, frame)) {
        shouldNotifyLayout = YES;
    }
    
    [super setFrame:frame];
    
    if (shouldNotifyLayout && _instance.onLayoutChange) {
        _instance.onLayoutChange(self);
    }
}

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
{
    _mHasEvent = TRUE;
    id<WXPageEventNotifyEventProtocol> pageEventNotify = [WXSDKEngine handlerForProtocol:@protocol(WXPageEventNotifyEventProtocol)];
    if ([pageEventNotify respondsToSelector:@selector(hitTest:withEvent:withView:)]){
        [pageEventNotify hitTest:point withEvent:event withView:self];
    }
    return [super hitTest:point withEvent:event];
}

- (BOOL)isHasEvent
{
    return _mHasEvent;
}

@end
