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

#ifndef WEEX_PROJECT_THREAD_IMPL_IOS_H
#define WEEX_PROJECT_THREAD_IMPL_IOS_H

#ifdef OS_IOS

#include "base/thread/thread_impl_posix.h"

namespace weex {
namespace base {
class ThreadImplDarwin : public ThreadImplPosix {
 public:
  ThreadImplDarwin(const ThreadParams& params);
  virtual ~ThreadImplDarwin();
  void SetName(const std::string& name) override;

 private:
  DISALLOW_COPY_AND_ASSIGN(ThreadImplDarwin);
};
}  // namespace base
}  // namespace weex

#endif
#endif  // WEEX_PROJECT_THREAD_IMPL_IOS_H
