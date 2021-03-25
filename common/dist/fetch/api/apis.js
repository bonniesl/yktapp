// 统一请求接口
export default {
    //baseUrl 
    baseUrl:'http://app.asyke.com',
    //ossUrl
    ossUrl:'http://ueditor-upload.oss-cn-beijing.aliyuncs.com',
    // 用户登录
    getUserLogin: '/api/v1/auth/login',
    //用户注册
    postUserRegister: '/api/v1/auth/register',
    //用户退出
    userLogout: '/api/v1/auth/logout',
    //图片上传
    imgUpload:'/api/v1/asyke/upload',
    //老师获取班级列表 
    getClassList:'/api/v1/asyke/course/tealists',
    //学生获取班级列表 
    getStuClassList:'/api/v1/asyke/course/stulists',
    //用户信息
    getUserInfo:'/api/v1/me/information',
    //上传图片
    upload:'/api/v1/upload',
    //个信息编辑
    editinfo:'/api/v1/me/editinfo',
    //获取班级信息接口
    classInfo:'/api/v1/asyke/class/classlist',
    // //获取班级的人员列表接口
    // getclassUser:'/api/v1/asyke/class/userlist',
    //获取书本
    getbookList:'/api/v1/asyke/course/book',
    //加入班级
    addenterClass:'/api/v1/asyke/class/join',
    //创建课程接口
    createcourse:'/api/v1/asyke/course/store',
    //更新课程信息
    courseUpdate:'/api/v1/asyke/course/courseupdate',
    //新增班级
    addclass:'/api/v1/asyke/class/store',
    //获取班级成员
    getClassUserList:'/api/v1/asyke/class/userlist',
    //更改课程归档接口
    courseFileOver:'/api/v1/asyke/course/coursefile',
    //课程班级修改
    classUpdate:'/api/v1/asyke/class/update',
    //班级归档设置
    classSetFile:'/api/v1/asyke/class/setfile',
    //获取班级下面的跑步主题列表
    runList:'/api/v1/run/index',
    //跑步主题创建
    createRun:'/api/v1/run/store',
    //跑步主题跟新删除
    runOperation:'/api/v1/run/operation',
    //创建主题下面的操作
    runProject:'/api/v1/run/project/store',
    //获取跑步项目操作列表
    getrunActionList:'/api/v1/run/project/index',
    //跑步发布跟新
    runSendUpdate:'/api/v1/run/project/update',
    //获取班级跑步人员列表接口
    runUserList:'/api/v1/asyke/class/run/user',
    runUserList2:'/api/v1/asyke/class/run/usernew',
    //获取用户跑步项目
    getrunUserPro:'/api/v1/asyke/class/user/runlist',
    //用户设置体重身高
    setUserHeight:'/api/v1/run/set/store',
    //跑步设置
    setRunSave:'/api/v1/run/set/save',
    //发送短信验证码
    getCode:'/api/v1/auth/pwdcode',
    //忘记密码
    forgetPassword:'/api/v1/auth/forget',
    //重置密码
    reSetPass:'/api/v1/auth/reset',
    //获取学校下面校区列表
    getRunCampus:'/api/v1/run/campus',
    //用户开始跑步接口
    getRunStart:'/api/v1/run/user/index',
    //班级成员退出接口
    courseClassOut:"/api/v1/asyke/class/out",
    //微信登陆
    weixinLogin:'/api/v1/auth/wxlogin',
    //获取校区列表和跑步列表
    getUserRunSList:'/api/v1/asyke/class/user/run/set',
    //获取用户跑步设置
    getUserRunSet:'/api/v1/run/set/user',
    //获取跑步详情接口
    getUserRunInfo:'/api/v1/run/user/info',
    //用户跑步记录接口
    userRunList:'/api/v1/run/user/list',
    //周记录接口
    userWeekRunList:'/api/v1/run/user/week',
    //用户跑步月记录接口
    userMonthRunList:'/api/v1/run/user/month',
    //用户跑步年记录接口
    userYearRunList:'/api/v1/run/user/year',
    //用户成绩跑
    userRunRank:'/api/v1/run/rank/user',
    //获取指定用户跑步记录
    userOpenRunList:'/api/v1/asyke/class/run/user/list',
    //审核免跑接口
    setNorun:'/api/v1/run/setnorun',
    //申请免跑
    getNoRun:'/api/v1/run/no_run',
    //初始化接口
    setInit:'/api/v1/init',
    //权限说明
    setExplain:'/api/v1/questions',
    //院系
    partRank:'/api/v1/run/rank/part',
    //作弊
    cheatRank:'/api/v1/run/rank/cheat',
    //用户点赞接口
    praise:'/api/v1/run/rank/praise'
}


