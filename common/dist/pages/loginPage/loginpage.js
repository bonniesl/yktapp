// { "framework": "Vue"} 
if(typeof app=="undefined"){app=weex}
if(typeof eeuiLog=="undefined"){var eeuiLog={_:function(t,e){var s=e.map(function(e){return e="[object object]"===Object.prototype.toString.call(e).toLowerCase()?JSON.stringify(e):e});if(typeof this.__m==='undefined'){this.__m=app.requireModule('debug')}this.__m.addLog(t,s)},debug:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];this._("debug",e)},log:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];this._("log",e)},info:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];this._("info",e)},warn:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];this._("warn",e)},error:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];this._("error",e)}}}
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/loginPage/loginpage.vue?entry=true");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/failNet.vue":
/*!************************************!*\
  !*** ./src/components/failNet.vue ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter?id=data-v-23197b42!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=styles&index=0!./failNet.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-23197b42!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/components/failNet.vue")
)

/* script */
__vue_exports__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader!babel-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=script&index=0!./failNet.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/components/failNet.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler?id=data-v-23197b42!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=template&index=0!./failNet.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-23197b42!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/components/failNet.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {eeuiLog.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\workspace\\weexZruup\\zruupApp\\src\\components\\failNet.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-23197b42"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "./src/fetch/api/apis.js":
/*!*******************************!*\
  !*** ./src/fetch/api/apis.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// ??????????????????
/* harmony default export */ __webpack_exports__["default"] = ({
  //baseUrl 
  baseUrl: 'http://app.asyke.com',
  //ossUrl
  ossUrl: 'http://ueditor-upload.oss-cn-beijing.aliyuncs.com',
  // ????????????
  getUserLogin: '/api/v1/auth/login',
  //????????????
  postUserRegister: '/api/v1/auth/register',
  //????????????
  userLogout: '/api/v1/auth/logout',
  //????????????
  imgUpload: '/api/v1/asyke/upload',
  //???????????????????????? 
  getClassList: '/api/v1/asyke/course/tealists',
  //???????????????????????? 
  getStuClassList: '/api/v1/asyke/course/stulists',
  //????????????
  getUserInfo: '/api/v1/me/information',
  //????????????
  upload: '/api/v1/upload',
  //???????????????
  editinfo: '/api/v1/me/editinfo',
  //????????????????????????
  classInfo: '/api/v1/asyke/class/classlist',
  // //?????????????????????????????????
  // getclassUser:'/api/v1/asyke/class/userlist',
  //????????????
  getbookList: '/api/v1/asyke/course/book',
  //????????????
  addenterClass: '/api/v1/asyke/class/join',
  //??????????????????
  createcourse: '/api/v1/asyke/course/store',
  //??????????????????
  courseUpdate: '/api/v1/asyke/course/courseupdate',
  //????????????
  addclass: '/api/v1/asyke/class/store',
  //??????????????????
  getClassUserList: '/api/v1/asyke/class/userlist',
  //????????????????????????
  courseFileOver: '/api/v1/asyke/course/coursefile',
  //??????????????????
  classUpdate: '/api/v1/asyke/class/update',
  //??????????????????
  classSetFile: '/api/v1/asyke/class/setfile',
  //???????????????????????????????????????
  runList: '/api/v1/run/index',
  //??????????????????
  createRun: '/api/v1/run/store',
  //????????????????????????
  runOperation: '/api/v1/run/operation',
  //???????????????????????????
  runProject: '/api/v1/run/project/store',
  //??????????????????????????????
  getrunActionList: '/api/v1/run/project/index',
  //??????????????????
  runSendUpdate: '/api/v1/run/project/update',
  //????????????????????????????????????
  runUserList: '/api/v1/asyke/class/run/user',
  runUserList2: '/api/v1/asyke/class/run/usernew',
  //????????????????????????
  getrunUserPro: '/api/v1/asyke/class/user/runlist',
  //????????????????????????
  setUserHeight: '/api/v1/run/set/store',
  //????????????
  setRunSave: '/api/v1/run/set/save',
  //?????????????????????
  getCode: '/api/v1/auth/pwdcode',
  //????????????
  forgetPassword: '/api/v1/auth/forget',
  //????????????
  reSetPass: '/api/v1/auth/reset',
  //??????????????????????????????
  getRunCampus: '/api/v1/run/campus',
  //????????????????????????
  getRunStart: '/api/v1/run/user/index',
  //????????????????????????
  courseClassOut: "/api/v1/asyke/class/out",
  //????????????
  weixinLogin: '/api/v1/auth/wxlogin',
  //?????????????????????????????????
  getUserRunSList: '/api/v1/asyke/class/user/run/set',
  //????????????????????????
  getUserRunSet: '/api/v1/run/set/user',
  //????????????????????????
  getUserRunInfo: '/api/v1/run/user/info',
  //????????????????????????
  userRunList: '/api/v1/run/user/list',
  //???????????????
  userWeekRunList: '/api/v1/run/user/week',
  //???????????????????????????
  userMonthRunList: '/api/v1/run/user/month',
  //???????????????????????????
  userYearRunList: '/api/v1/run/user/year',
  //???????????????
  userRunRank: '/api/v1/run/rank/user',
  //??????????????????????????????
  userOpenRunList: '/api/v1/asyke/class/run/user/list',
  //??????????????????
  setNorun: '/api/v1/run/setnorun',
  //????????????
  getNoRun: '/api/v1/run/no_run',
  //???????????????
  setInit: '/api/v1/init',
  //????????????
  setExplain: '/api/v1/questions',
  //??????
  partRank: '/api/v1/run/rank/part',
  //??????
  cheatRank: '/api/v1/run/rank/cheat',
  //??????????????????
  praise: '/api/v1/run/rank/praise'
});

/***/ }),

/***/ "./src/pages/loginPage/loginpage.vue?entry=true":
/*!******************************************************!*\
  !*** ./src/pages/loginPage/loginpage.vue?entry=true ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter?id=data-v-715e28f4!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=styles&index=0!./loginpage.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-715e28f4!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/pages/loginPage/loginpage.vue")
)

/* script */
__vue_exports__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader!babel-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=script&index=0!./loginpage.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/pages/loginPage/loginpage.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler?id=data-v-715e28f4!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=template&index=0!./loginpage.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-715e28f4!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/pages/loginPage/loginpage.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {eeuiLog.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\workspace\\weexZruup\\zruupApp\\src\\pages\\loginPage\\loginpage.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-715e28f4"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/components/failNet.vue":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/node_modules/_babel-loader@8.1.0@babel-loader/lib!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=script&index=0!./src/components/failNet.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
var eeui = app.requireModule('eeui');
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {};
  },
  methods: {
    reloadPage: function reloadPage() {
      eeui.reloadPage(eeui.getPageInfo().pageName);
    }
  },
  created: function created() {}
});

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/pages/loginPage/loginpage.vue":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/node_modules/_babel-loader@8.1.0@babel-loader/lib!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=script&index=0!./src/pages/loginPage/loginpage.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../fetch/api/apis */ "./src/fetch/api/apis.js");
/* harmony import */ var _components_failNet_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/failNet.vue */ "./src/components/failNet.vue");
/* harmony import */ var _components_failNet_vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_failNet_vue__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var eeui = app.requireModule('eeui');
var stream = weex.requireModule('stream');
var storage = weex.requireModule('storage');
var globalEvent = weex.requireModule('globalEvent');
var deviceInfo = app.requireModule("eeuiDeviceInfo");


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    failNet: _components_failNet_vue__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      disaction: true,
      password: eeui.getCaches('slpassword') ? eeui.getCaches('slpassword') : '',
      iphone: eeui.getCaches('sluserName') ? eeui.getCaches('sluserName') : '',
      token: '',
      iconList: ['md-phone-portrait', 'md-lock'],
      schoolList: [],
      eyeIcon: 'ios-eye-off',
      inputType: 'password',
      weixinParmas: '',
      mobile_uuid: '',
      isWechatShow: true,
      weixinType: true,
      tabShow: false,
      netWorkShow: false
    };
  },
  methods: {
    weixinTab: function weixinTab(val) {
      if (val === 1) {
        this.tabShow = false;
      } else {
        this.tabShow = true;
      }
    },
    //????????????
    weixinLogin: function weixinLogin(type) {
      if (type == 1) {
        this.weixinType = true;
      } else {
        this.weixinType = false;
      }

      weex.requireModule('userRun').wxLogin();
    },
    openShowPassword: function openShowPassword() {
      if (this.eyeIcon == 'ios-eye-off') {
        this.eyeIcon = 'ios-eye';
        this.inputType = 'text';
      } else {
        this.eyeIcon = 'ios-eye-off';
        this.inputType = 'password';
      }
    },
    //???????????????
    getenterYear: function getenterYear() {
      var self = this;
      stream.fetch({
        method: 'GET',
        url: "http://ueditor-upload.oss-cn-beijing.aliyuncs.com/data/years.json",
        type: 'json'
      }, function (res) {
        if (res.ok) {
          eeui.setCaches('enterYear', res.data, 0);
        }
      });
    },
    //ios?????????????????????
    isWechat: function isWechat() {
      var platform = WXEnvironment.platform.toLowerCase();

      if (platform === 'ios') {
        weex.requireModule('userRun').wxInstalled();
      }
    },
    //????????????
    getschools: function getschools() {
      var self = this;
      stream.fetch({
        method: 'GET',
        url: "http://ueditor-upload.oss-cn-beijing.aliyuncs.com/data/schools.json",
        type: 'json'
      }, function (res) {
        //console.log(res);
        if (res.ok) {
          eeui.setCaches('schoollist', res.data, 0); //self.schoolList = res.data;
          //console.log(res.data);
        }
      });
    },
    //??????api
    getWxLogin: function getWxLogin(id) {
      var self = this;
      stream.fetch({
        method: 'POST',
        url: _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl + _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].weixinLogin,
        body: JSON.stringify({
          unionid: id,
          mobile_type: weex.config.env.deviceModel,
          mobile_platform: weex.config.env.platform,
          mobile_uuid: self.mobile_uuid,
          umeng_token: '1111'
        }),
        type: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      }, function (res) {
        if (res.status == 200) {
          if (res.data.code == -1) {
            self.rechargePage(); //   eeui.openPage({
            //         pageName: 'loadPage',
            //         pageType: 'app',
            //         statusBarColor:'#1eb76e',
            //         url: 'loadPage.js'
            //     }, function(result) {
            //         //......
            //     }); 
            //console.log(res.data);
          } else if (res.data.code == 1) {
            if (res.data.mobile != '') {
              eeui.openPage({
                pageName: 'home',
                url: '../homePages/home.js',
                statusBarColor: '#1eb76e',
                backPressedClose: true,
                softInputMode: 'nothing',
                swipeBack: false,
                params: {
                  position: 0
                } // params:{token:self.token},

              }, function (result) {
                //...... 
                eeui.setCaches('token', res.data.token, 0);
                self.disaction = true;
                eeui.setCustomConfig("homePage", "homePages/home.js");
              });
            } else {
              self.changeuserPage(res.data.token, res.data.avatar_file); //console.log('??????????????????',res.data); 
            } //eeui.setCaches('token', res.data.token, 0);

          } else {
            eeui.toast({
              message: '????????????',
              gravity: 'top'
            });
          }
        } else {}
      });
    },
    //????????????
    getWxreg: function getWxreg(id) {
      var self = this;
      stream.fetch({
        method: 'POST',
        url: _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl + _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].weixinLogin,
        body: JSON.stringify({
          unionid: id,
          mobile_type: weex.config.env.deviceModel,
          mobile_platform: weex.config.env.platform,
          mobile_uuid: self.mobile_uuid,
          umeng_token: '1111'
        }),
        type: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      }, function (res) {
        if (res.status == 200) {
          if (res.data.code == -1) {
            self.rechargePage();
          } else if (res.data.code == 1) {
            if (res.data.mobile != '') {
              eeui.toast({
                message: '??????????????????????????????????????????',
                gravity: 'top'
              });
            } else {
              self.changeuserPage(res.data.token, res.data.avatar_file);
            } //eeui.setCaches('token', res.data.token, 0);

          } else {
            eeui.toast({
              message: '?????????????????????',
              gravity: 'top'
            });
          }
        } else {}
      });
    },
    forgePassword: function forgePassword() {
      eeui.openPage({
        url: 'findPassword.js',
        statusBarColor: '#1eb76e'
      }, function (result) {//......
      });
    },
    rechargePage: function rechargePage() {
      var self = this;
      eeui.openPage({
        url: 'recharge.js',
        statusBarColor: '#1eb76e',
        params: {
          'schools': self.schoolList
        }
      }, function (result) {//......
      });
    },
    //????????????
    getUserLogin: function getUserLogin() {
      var _this = this;

      if (!this.disaction) {
        return;
      }

      var self = this;
      var params = {
        mobile: this.iphone,
        password: this.password,
        mobile_type: weex.config.env.deviceModel,
        mobile_platform: weex.config.env.platform,
        mobile_uuid: self.mobile_uuid,
        umeng_token: '1'
      };

      if (params.mobile == '') {
        eeui.toast({
          message: '?????????????????????',
          gravity: 'top'
        });
        return;
      }

      var myreg = /^1\d{10}$/;

      if (!myreg.test(params.mobile)) {
        eeui.toast({
          message: '????????????????????????',
          gravity: 'top'
        });
        return;
      }

      if (params.password == '') {
        eeui.toast({
          message: '??????????????????',
          gravity: 'top'
        });
        return;
      } // let reg=/^\d{6}$/;
      // if(!reg.test(params.password)){
      //     eeui.toast({
      //         message:'??????????????????',
      //         gravity:'top'
      //     });
      //     return;
      // }


      this.disaction = false;
      stream.fetch({
        method: 'PUT',
        url: _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl + _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].getUserLogin,
        body: params,
        type: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      }, function (res) {
        if (res.status == '200') {
          eeui.setCaches('sluserName', _this.iphone, 0);
          eeui.setCaches('slpassword', _this.password, 0);
          eeui.openPage({
            pageName: 'home',
            url: '../homePages/home.js',
            statusBarColor: '#1eb76e',
            backPressedClose: true,
            softInputMode: 'nothing',
            swipeBack: false,
            params: {
              position: 0
            } // params:{token:self.token},

          }, function (result) {
            //...... 
            eeui.setCaches('token', res.data, 0);
            self.disaction = true;
            eeui.setCustomConfig("homePage", "homePages/home.js");
          });
        } else {
          self.disaction = true;

          if (res.status == '-1') {
            self.netWorkShow = true;
            return;
          }

          if (res.headers['x-mzq-message']) {
            eeui.toast({
              message: decodeURIComponent(res.headers['x-mzq-message']),
              gravity: 'top'
            });
          }
        }
      });
    },
    //???????????????????????????
    changeuserPage: function changeuserPage(token, avatar) {
      var self = this;
      eeui.openPage({
        url: 'changeuser.js',
        statusBarColor: '#1eb76e',
        animated: false,
        params: {
          'avatar': avatar
        }
      }, function (result) {
        eeui.setCaches('token', token, 0); //......
      });
    }
  },
  created: function created() {
    this.getenterYear();
    this.getschools();
    var self = this;
    var count = 0;
    var platform = WXEnvironment.platform.toLowerCase(); //console.log(eeui.getCaches('userName'))

    if (platform != 'ios') {
      eeui.setPageBackPressed(eeui.getPageInfo().pageName, function () {
        count++;

        if (count == 1) {
          eeui.toast('?????????????????????????????????');
        } else {
          eeui.toastClose();
          eeui.goDesktop();
          count = 0;
        }
      });
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    setTimeout(function () {
      _this2.isWechat();
    }, 100);

    if (weex.config.env.platform == "iOS") {
      this.mobile_uuid = eeui.getIfa(); //console.log(this.mobile_uuid);
    } else {
      this.mobile_uuid = eeui.getImei();
    }

    globalEvent.addEventListener("wxLoginCallback", function (data) {
      _this2.weixinParmas = JSON.parse(data.install); //console.log(JSON.parse(data.install).headimgurl);

      eeui.setCaches('headimgurl', JSON.parse(data.install).headimgurl, 0);

      if (_this2.weixinType) {
        _this2.getWxLogin(_this2.weixinParmas.unionid);

        eeui.setCaches('unionid', _this2.weixinParmas.unionid, 0); //console.log(this.weixinParmas.unionid);
      } else {
        _this2.getWxreg(_this2.weixinParmas.unionid);

        eeui.setCaches('unionid', _this2.weixinParmas.unionid, 0);
      }
    });
    var platform = WXEnvironment.platform.toLowerCase();

    if (platform === 'ios') {
      globalEvent.addEventListener("ios_wxLoginDataCallback", function (data) {
        if (JSON.parse(data).unionid) {
          eeui.setCaches('headimgurl', JSON.parse(data).headimgurl, 0);

          if (_this2.weixinType) {
            _this2.getWxLogin(JSON.parse(data).unionid);

            eeui.setCaches('unionid', JSON.parse(data).unionid, 0);
          } else {
            _this2.getWxreg(JSON.parse(data).unionid);

            eeui.setCaches('unionid', JSON.parse(data).unionid, 0);
          }
        }
      });
      globalEvent.addEventListener("ios_wxInstallDataCallback", function (data) {
        if (JSON.parse(data).WXinstalled) {
          _this2.isWechatShow = true;
        } else {
          _this2.isWechatShow = false;
          _this2.tabShow = true;
        }
      });
    }
  }
});

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-23197b42!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/components/failNet.vue":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter.js?id=data-v-23197b42!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=styles&index=0!./src/components/failNet.vue ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "networkW": {
    "position": "fixed",
    "top": 0,
    "right": 0,
    "bottom": 0,
    "left": 0,
    "backgroundColor": "#ffffff",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "netpic": {
    "width": "180",
    "height": "151",
    "marginBottom": "28"
  },
  "netTxt1": {
    "fontSize": "26",
    "color": "#2edb7d"
  },
  "netTxt2": {
    "paddingTop": "16",
    "fontSize": "22",
    "color": "#222222"
  },
  "reloadP": {
    "width": "130",
    "height": "66",
    "marginTop": "20"
  }
}

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-715e28f4!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/pages/loginPage/loginpage.vue":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter.js?id=data-v-715e28f4!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=styles&index=0!./src/pages/loginPage/loginpage.vue ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "weixinIcon": {
    "width": "200",
    "height": "200",
    "marginLeft": "275",
    "marginTop": "30"
  },
  "weixinbutton": {
    "width": "600",
    "height": "100",
    "marginLeft": "75",
    "marginTop": "100",
    "marginBottom": "20",
    "fontSize": "30"
  },
  "littleweixin": {
    "width": "50",
    "height": "50"
  },
  "weixinbox": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "marginTop": "50"
  },
  "loginPage": {
    "backgroundColor": "#e7e8ec"
  },
  "headBg": {
    "width": "750",
    "height": "340"
  },
  "newBox": {
    "width": "750",
    "position": "absolute",
    "top": "285",
    "borderTopLeftRadius": "60",
    "borderTopRightRadius": "60",
    "backgroundColor": "#e7e8ec"
  },
  "navbar": {
    "width": "750",
    "height": "100",
    "backgroundColor": "#e7e8ec"
  },
  "tabBar": {
    "flexDirection": "row",
    "width": "750",
    "borderBottomWidth": "1",
    "borderBottomColor": "rgb(216,216,216)",
    "borderBottomStyle": "solid"
  },
  "tabBarLeft": {
    "width": "375",
    "textAlign": "center",
    "height": "100",
    "lineHeight": "100",
    "fontSize": "30",
    "color": "#333333",
    "borderRightColor": "rgb(216,216,216)",
    "borderRightWidth": "1",
    "borderRightStyle": "solid"
  },
  "cur": {
    "color": "#1eb76e"
  },
  "newBoxLeft": {
    "marginTop": "70"
  },
  "tabBarRight": {
    "width": "375",
    "textAlign": "center",
    "height": "100",
    "lineHeight": "100",
    "fontSize": "30",
    "color": "#333333"
  },
  "icon": {
    "width": "100",
    "height": "100",
    "color": "#666666"
  },
  "text": {
    "fontSize": "36",
    "color": "#1c1d21"
  },
  "logo": {
    "marginTop": 40,
    "width": 150,
    "height": 150,
    "alignSelf": "center"
  },
  "image": {
    "width": "150",
    "height": "150"
  },
  "iphoneNum": {
    "width": "600",
    "alignSelf": "center",
    "position": "relative",
    "marginTop": "20",
    "backgroundColor": "#ffffff",
    "borderRadius": 20
  },
  "presonIcon": {
    "width": "120",
    "height": "40",
    "position": "absolute",
    "top": 30,
    "left": 0,
    "borderRightColor": "#999999",
    "borderRightStyle": "solid",
    "borderRightWidth": "1"
  },
  "inputNum": {
    "paddingLeft": "150",
    "height": "100",
    "fontSize": "30",
    "width": "600",
    "borderRadius": "20"
  },
  "buttonLogin": {
    "fontSize": 32,
    "marginBottom": "20",
    "width": "600",
    "height": "100",
    "marginLeft": "75",
    "marginTop": "40",
    "backgroundColor": "#1eb76e"
  },
  "weixinTEXT": {
    "fontSize": "30",
    "color": "#1eb76e"
  },
  "button2": {
    "fontSize": 32,
    "width": "320",
    "height": "50",
    "lineHeight": "50",
    "marginBottom": "10",
    "marginTop": "0"
  },
  "ftext": {
    "width": "120",
    "textAlign": "right",
    "color": "#97989c",
    "fontSize": 26,
    "marginRight": 80,
    "marginTop": "30",
    "height": "40",
    "marginLeft": "560"
  },
  "gorecharge": {
    "marginRight": "20",
    "fontSize": 32,
    "color": "#444444"
  },
  "eyeicon": {
    "width": "40",
    "height": "80",
    "position": "absolute",
    "right": "40",
    "top": "10"
  },
  "inputpassword": {
    "width": "500"
  }
}

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-23197b42!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/components/failNet.vue":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler.js?id=data-v-23197b42!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=template&index=0!./src/components/failNet.vue ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["app"]
  }, [_c('div', {
    staticClass: ["networkW"]
  }, [_c('image', {
    staticClass: ["netpic"],
    attrs: {
      "src": "root://assets/images/netWork.png"
    }
  }), _c('text', {
    staticClass: ["netTxt1"]
  }, [_vm._v("??????????????????")]), _c('text', {
    staticClass: ["netTxt2"]
  }, [_vm._v("???????????????????????????")]), _c('button', {
    staticClass: ["reloadP"],
    attrs: {
      "eeui": {
        text: '????????????',
        backgroundColor: '#1eb76e',
        fontSize: 24
      }
    },
    on: {
      "click": _vm.reloadPage
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-715e28f4!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/pages/loginPage/loginpage.vue":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler.js?id=data-v-715e28f4!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=template&index=0!./src/pages/loginPage/loginpage.vue ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["loginPage"]
  }, [_vm._m(0), _c('div', {
    staticClass: ["newBox"]
  }, [_c('div', {
    staticClass: ["tabBar"]
  }, [(_vm.isWechatShow) ? _c('text', {
    staticClass: ["tabBarLeft"],
    class: [!_vm.tabShow ? 'cur' : ''],
    on: {
      "click": function($event) {
        _vm.weixinTab(1)
      }
    }
  }, [_vm._v("????????????")]) : _vm._e(), _c('text', {
    staticClass: ["tabBarRight"],
    class: [_vm.tabShow ? 'cur' : ''],
    on: {
      "click": function($event) {
        _vm.weixinTab(2)
      }
    }
  }, [_vm._v("???????????????")])]), (!_vm.tabShow) ? _c('div', {
    staticClass: ["newBoxLeft"]
  }, [_c('image', {
    staticClass: ["weixinIcon"],
    attrs: {
      "src": "root://assets/images/weixin.png"
    }
  }), _c('button', {
    staticClass: ["weixinbutton"],
    attrs: {
      "text": "????????????",
      "model": "green"
    },
    on: {
      "click": function($event) {
        _vm.weixinLogin(1)
      }
    }
  }), (_vm.isWechatShow) ? _c('div', {
    staticClass: ["weixinbox"]
  }, [_c('image', {
    staticClass: ["littleweixin"],
    attrs: {
      "src": "root://assets/images/litteweixin.png"
    }
  }), _c('text', {
    staticClass: ["weixinTEXT"],
    on: {
      "click": function($event) {
        _vm.weixinLogin(2)
      }
    }
  }, [_vm._v(" ???????????????????????????")])]) : _vm._e()], 1) : _vm._e(), (_vm.tabShow) ? _c('div', {
    staticClass: ["newBoxLeft"]
  }, [_c('div', {
    staticClass: ["formInput"]
  }, [_c('div', {
    staticClass: ["iphoneNum"]
  }, [_c('icon', {
    staticClass: ["presonIcon"],
    attrs: {
      "eeui": {
        content: _vm.iconList[0],
        fontSize: 45,
        color: '#242424'
      }
    }
  }), _c('input', {
    staticClass: ["inputNum"],
    attrs: {
      "type": "tel",
      "placeholder": "?????????????????????",
      "placeholderColor": "#c7c7c7",
      "value": (_vm.iphone)
    },
    on: {
      "input": function($event) {
        _vm.iphone = $event.target.attr.value
      }
    }
  })], 1), _c('div', {
    staticClass: ["iphoneNum"]
  }, [_c('icon', {
    staticClass: ["presonIcon"],
    attrs: {
      "eeui": {
        content: _vm.iconList[1],
        fontSize: 45,
        color: '#242424'
      }
    }
  }), _c('input', {
    staticClass: ["inputNum", "inputpassword"],
    attrs: {
      "type": _vm.inputType,
      "placeholder": "???????????????",
      "placeholderColor": "#c7c7c7",
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        _vm.password = $event.target.attr.value
      }
    }
  }), _c('icon', {
    staticClass: ["eyeicon"],
    attrs: {
      "eeui": {
        content: _vm.eyeIcon,
        fontSize: 42
      }
    },
    on: {
      "click": _vm.openShowPassword
    }
  })], 1), _c('text', {
    staticClass: ["ftext"],
    on: {
      "click": _vm.forgePassword
    }
  }, [_vm._v("?????????????")]), _c('button', {
    staticClass: ["buttonLogin"],
    attrs: {
      "text": "??????"
    },
    on: {
      "click": _vm.getUserLogin
    }
  }), (_vm.isWechatShow) ? _c('div', {
    staticClass: ["weixinbox"]
  }, [_c('image', {
    staticClass: ["littleweixin"],
    attrs: {
      "src": "root://assets/images/litteweixin.png"
    }
  }), _c('text', {
    staticClass: ["weixinTEXT"],
    on: {
      "click": function($event) {
        _vm.weixinLogin(2)
      }
    }
  }, [_vm._v(" ???????????????????????????")])]) : _vm._e()], 1)]) : _vm._e()]), (_vm.netWorkShow) ? _c('failNet') : _vm._e()], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["loginBg"]
  }, [_c('image', {
    staticClass: ["headBg"],
    attrs: {
      "src": "root://assets/images/loginbg.jpg"
    }
  })])
}]}
module.exports.render._withStripped = true

/***/ })

/******/ });