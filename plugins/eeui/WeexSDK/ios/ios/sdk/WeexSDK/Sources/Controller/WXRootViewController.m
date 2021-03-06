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

#import "WXRootViewController.h"
#import "WXBaseViewController.h"
#import "WXDefine.h"

typedef void(^OperationBlock)(void);

@interface WXRootViewController() <UIGestureRecognizerDelegate>

@property (nonatomic, strong) NSMutableArray *operationArray;
@property (nonatomic, assign) BOOL operationInProcess;

@end

@implementation WXRootViewController


- (void)viewDidLoad
{
    self.interactivePopGestureRecognizer.delegate = self;
}

- (id)initWithSourceURL:(NSURL *)sourceURL
{
    WXBaseViewController *baseViewController = [[WXBaseViewController alloc]initWithSourceURL:sourceURL];
    
    return [super initWithRootViewController:baseViewController];
}

//reduced pop/push animation in iOS 7
- (UIViewController *)popViewControllerAnimated:(BOOL)animated
{
    return [super popViewControllerAnimated:animated];
}

- (NSArray<UIViewController *> *)popToViewController:(UIViewController *)viewController animated:(BOOL)animated
{
    return [super popToViewController:viewController animated:animated];
}

- (NSArray<UIViewController *> *)popToRootViewControllerAnimated:(BOOL)animated
{
    return [super popToRootViewControllerAnimated:animated];
}

- (void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated
{
    return [super pushViewController:viewController animated:animated];
}

- (void)addOperationBlock:(OperationBlock)operation
{
    
    if (self.operationInProcess && [self.operationArray count]) {
        [self.operationArray addObject:[operation copy]];
    } else {
        _operationInProcess = YES;
        operation();
    }
}

#pragma mark- UIGestureRecognizerDelegate

- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer
{
    if ([self.viewControllers count] == 1) {
        return NO;
    }
    return YES;
}

- (NSMutableArray *)operationArray
{
    if (nil == _operationArray) {
        _operationArray = [[NSMutableArray alloc] init];
    }
    
    return _operationArray;
}

@end
