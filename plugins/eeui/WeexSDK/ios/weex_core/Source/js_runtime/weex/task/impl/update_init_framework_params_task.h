/**
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
//
// Created by furture on 2019/3/25.
//

#ifndef WEEX_PROJECT_UPDATEINITFRAMEWORKPARAMSTASK_H
#define WEEX_PROJECT_UPDATEINITFRAMEWORKPARAMSTASK_H

#include "js_runtime/weex/task/weex_task.h"


class UpdateInitFrameworkParamsTask : public WeexTask {

public:
    UpdateInitFrameworkParamsTask(const std::string& key, const std::string& value, const std::string& desc);

    void run(WeexRuntime *runtime) override;

    std::string taskName() override { return "UpdateInitFrameworkParamsTask"; }

private:
    std::string key_;
    std::string value_;
    std::string desc_;

};


#endif //WEEX_PROJECT_UPDATEINITFRAMEWORKPARAMSTASK_H
