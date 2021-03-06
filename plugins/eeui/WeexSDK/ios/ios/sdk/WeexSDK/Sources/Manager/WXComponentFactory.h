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

#import <Foundation/Foundation.h>
#import <WeexSDK/WXInvocationConfig.h>

NS_ASSUME_NONNULL_BEGIN

@interface WXComponentConfig : WXInvocationConfig

@property (nonatomic, strong) NSDictionary * _Nullable properties;

- (instancetype)initWithName:(NSString *)name class:(NSString *)clazz pros:(NSDictionary * _Nullable)pros;

@end


@interface WXComponentFactory : NSObject

/**
 * @abstract Register an affine base type to weex core. So that all subclasses of clazz will use this type to render.
 *  For example: WXNestedListComponent is a subclass of WXListComponent and uses type of 'nested-list'.
 *  It should be rendered using RenderList in weexcore.
 *
 * @param typeName weex core type identifier
 * @param clazz The WXComponent subclass to register
 */
+ (void)registerBaseType:(NSString *)typeName withClass:(Class)clazz;

/**
 * @abstract Register a component for a given name
 *
 * @param name The component name to register;
 * @param clazz The WXComponent subclass to register
 * @param pros The component properties to register
 */
+ (void)registerComponent:(NSString *)name withClass:(Class)clazz withPros:(NSDictionary * _Nullable)pros;

/**
 * @abstract Register a list of components
 * @param components The components array to register, every element in array should be a dictionary,  in the form of @{@"name": @"xxx", @"class":@"yyy"}, which specifies the name and class of the component
 */
+ (void)registerComponents:(NSArray *)components;

+ (NSMutableDictionary *)componentMethodMapsWithName:(NSString *)name;
+ (NSMutableDictionary *)componentSelectorMapsWithName:(NSString *)name;

+ (SEL)methodWithComponentName:(NSString *)name withMethod:(NSString *)method isSync:(BOOL *)isSync;

+ (SEL)methodWithComponentName:(NSString *)name withMethod:(NSString *)method;

/**
 * @abstract Unregister all the components
 */
+ (void)unregisterAllComponents;

/**
 * @abstract Returns the class with a given component name.
 * @param name The component's name
 * @return The component's class
 */
+ (Class)classWithComponentName:(NSString *)name;

+ (WXComponentConfig *)configWithComponentName:(NSString *)name;

/**
 * @abstract Returns the registered components.
 */
+ (NSDictionary *)componentConfigs;


@end

NS_ASSUME_NONNULL_END
