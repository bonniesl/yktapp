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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/homePages/summpage.vue?entry=true");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/WEcharts/index.vue":
/*!*******************************************!*\
  !*** ./src/components/WEcharts/index.vue ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter?id=data-v-4f506fc9!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=styles&index=0!./index.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-4f506fc9!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/components/WEcharts/index.vue")
)

/* script */
__vue_exports__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader!babel-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=script&index=0!./index.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/components/WEcharts/index.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler?id=data-v-4f506fc9!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=template&index=0!./index.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-4f506fc9!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/components/WEcharts/index.vue")
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
__vue_options__.__file = "F:\\workspace\\weexZruup\\zruupApp\\src\\components\\WEcharts\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4f506fc9"
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

/***/ "./src/pages/homePages/summpage.vue?entry=true":
/*!*****************************************************!*\
  !*** ./src/pages/homePages/summpage.vue?entry=true ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter?id=data-v-3ea3d186!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=styles&index=0!./summpage.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-3ea3d186!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/pages/homePages/summpage.vue")
)

/* script */
__vue_exports__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader!babel-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=script&index=0!./summpage.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/pages/homePages/summpage.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler?id=data-v-3ea3d186!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=template&index=0!./summpage.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-3ea3d186!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/pages/homePages/summpage.vue")
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
__vue_options__.__file = "F:\\workspace\\weexZruup\\zruupApp\\src\\pages\\homePages\\summpage.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3ea3d186"
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

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/components/WEcharts/index.vue":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/node_modules/_babel-loader@8.1.0@babel-loader/lib!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=script&index=0!./src/components/WEcharts/index.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../fetch/api/apis */ "./src/fetch/api/apis.js");
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

var stream = app.requireModule('stream');
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WEcharts',
  props: {
    baidukey: {
      type: String,
      "default": "706afcb60ea4460e246fe6a24c73e0c5"
    },
    options: {
      type: Object,
      "default": {
        title: {
          text: '??????????????????????????????'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  data: function data() {
    return {
      randId: '',
      loadIng: true,
      dayList: [],
      dayNewList: [],
      dayPlIST: [],
      cliIndex: 0,
      userList: app.config.params ? app.config.params : {},
      // opUid:app.config.params ? app.config.params.uid : '',
      sdateC: app.config.params ? app.config.params.sdate : '' // userInfos:app.config.params ? app.config.params.user : ''

    };
  },
  watch: {
    options: function options(option) {
      this.setOptions(option);
    },
    dayNewList: function dayNewList(val) {
      this.dayNewList = val;
    },
    cliIndex: function cliIndex(val) {
      this.cliIndex = val;
    }
  },
  methods: {
    webReady: function webReady() {
      this.$refs.reflectName.setUrl(eeui.rewriteUrl('../../components/WEcharts/echarts.html#' + this.randId));
    },
    webState: function webState(data) {
      if (data.status === 'start') {
        this.loadIng = true;
      } else if (data.status === 'success' || data.status === 'error') {
        this.loadIng = false;
      }
    },
    setOptions: function setOptions(option) {
      eeui.setVariate("components::echarts::option:" + this.randId, JSON.stringify(option));
      this.$refs.reflectName.setJavaScript("if (typeof loadOption == 'function') { loadOption() }");
    },
    randomString: function randomString(len) {
      len = len || 32;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678oOLl9gqVvUuI1';
      var maxPos = $chars.length;
      var pwd = '';

      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }

      return pwd;
    },
    getuserRunList: function getuserRunList() {
      var self = this;
      var s_date = self.getDay(-6);
      var e_date = self.getDay(0);
      var getUrl = '';

      if (!self.userList.uid) {
        getUrl = _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl + _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].userRunList + '?s_date=' + s_date + '&end_date=' + e_date;
      } else {
        getUrl = _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl + _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].userOpenRunList + '?uid=' + self.userList.uid + '&s_date=' + s_date + '&end_date=' + e_date; // getUrl=API.baseUrl + API.userOpenRunList+ '?uid='+ self.userList.uid +'&s_date=' + self.userList.sdate + '&end_date=' + self.userList.sdate;

        self.dayNewList = [];
      }

      stream.fetch({
        url: getUrl,
        method: 'GET',
        type: 'json',
        headers: {
          Authorization: eeui.getCaches('token', null).token
        }
      }, function (res) {
        if (res.status == '200') {
          self.dayList = res.data;

          if (self.dayList.length != 0) {
            for (var i = 0; i < self.dayList.length; i++) {
              var dayL = self.dayList[i].c_time.substring(0, 10); //???????????????,???????????????

              var valDetailList = {
                "calorie": self.dayList[i].calorie,
                "check_status": self.dayList[i].check_status,
                "course_class_user_run_id": self.dayList[i].course_class_user_run_id,
                "metre": self.dayList[i].metre,
                "run_type": self.dayList[i].run_type,
                "spend_time": self.dayList[i].spend_time,
                "status": self.dayList[i].status,
                "step_number": self.dayList[i].step_number,
                "tr_id": self.dayList[i].tr_id,
                "valid_metre": self.dayList[i].valid_metre,
                "test_metre": self.dayList[i].test_metre
              }; //????????????????????????,???????????????Item

              var valItem = {
                "dayCtime": '',
                "dayListInfo": []
              };
              valItem.dayCtime = dayL;
              valItem.dayListInfo.push(valDetailList); //???0??????????????????

              if (i == 0) {
                self.dayNewList.push(valItem);
              } else {
                var index1 = -1; // ??????for????????????index

                for (var k = 0; k < self.dayNewList.length; k++) {
                  if (dayL == self.dayNewList[k].dayCtime) {
                    index1 = k;
                    break;
                  }
                }

                if (index1 === -1) {
                  // ????????????
                  self.dayNewList.push(valItem);
                } else {
                  // ?????????
                  self.dayNewList[k].dayListInfo.push(valDetailList);
                }
              }
            }

            self.dayNewList.sort(function (a, b) {
              return b.dayCtime < a.dayCtime ? 1 : -1;
            });
            self.dayNewList.forEach(function (vval, idx) {
              if (vval.dayCtime.indexOf(self.sdateC) > -1) {
                self.cliIndex = idx;
                return self.cliIndex;
              }
            });
            eeui.setVariate("components::echarts::idx:" + self.randId, JSON.stringify(self.cliIndex));
            eeui.setVariate("components::echarts::dlList:" + self.randId, JSON.stringify(self.dayNewList));
          } else {//  eeui.setVariate("components::echarts::dlList:", JSON.stringify( self.dayList));
          }
        }
      });
    },
    getDay: function getDay(day) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds);
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth: function doHandleMonth(month) {
      var m = month;

      if (month.toString().length == 1) {
        m = "0" + month;
      }

      return m;
    }
  },
  created: function created() {
    this.getuserRunList();
  },
  mounted: function mounted() {
    this.randId = this.randomString(6);
    eeui.setVariate("components::echarts::baidukey", this.baidukey); // eeui.setVariate("components::echarts::opUid:" + this.randId, this.userList.uid);

    eeui.setVariate("components::echarts::option:" + this.randId, JSON.stringify(this.options));
    eeui.setVariate("components::echarts::userInfos:" + this.randId, JSON.stringify(this.userList));
    eeui.setVariate("components::echarts::sdateC:" + this.randId, this.sdateC);
  }
});

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/pages/homePages/summpage.vue":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/node_modules/_babel-loader@8.1.0@babel-loader/lib!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=script&index=0!./src/pages/homePages/summpage.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_WEcharts_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/WEcharts/index */ "./src/components/WEcharts/index.vue");
/* harmony import */ var _components_WEcharts_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_WEcharts_index__WEBPACK_IMPORTED_MODULE_0__);
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
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    WEcharts: _components_WEcharts_index__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      options: {
        title: {
          // text: '???????????????????????????',
          // subtext: '????????????',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['??????', '?????????', '??????']
        },
        series: [{
          name: '????????????',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [{
            value: 335,
            name: '??????'
          }, {
            value: 310,
            name: '?????????'
          }, {
            value: 234,
            name: '??????'
          }],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    };
  },
  created: function created() {
    // ?????? ????????????
    var domModule = weex.requireModule('dom');
    domModule.addRule('fontFace', {
      'fontFamily': "iconfont",
      'src': "url('http://at.alicdn.com/t/font_1628280_p78f7z67jyq.ttf')"
    });
  }
});

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-3ea3d186!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/pages/homePages/summpage.vue":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter.js?id=data-v-3ea3d186!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=styles&index=0!./src/pages/homePages/summpage.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "navbarb": {
    "width": "750",
    "height": "100",
    "backgroundColor": "#1eb76e"
  },
  "headtext": {
    "fontSize": "30",
    "color": "#ffffff"
  },
  "navbutton": {
    "width": 110,
    "height": 65,
    "marginRight": 25
  },
  "summSearch": {
    "height": 100,
    "marginLeft": 100,
    "flexDirection": "row"
  },
  "summStext": {
    "fontSize": 28,
    "color": "#333333",
    "lineHeight": 100
  },
  "summarrowicon": {
    "fontFamily": "iconfont",
    "fontSize": 27,
    "color": "#333333",
    "lineHeight": 100,
    "marginLeft": 20
  },
  "tableHead": {
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "width": 750,
    "backgroundColor": "#1eb76e",
    "height": 80
  },
  "tbody": {
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "width": 750,
    "backgroundColor": "#ffffff",
    "height": 80
  },
  "RB": {
    "borderRightWidth": "1",
    "borderRightStyle": "solid",
    "borderRightColor": "#c7d0d7"
  },
  "BB": {
    "borderBottomWidth": "1",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#c7d0d7"
  },
  "thw1": {
    "width": 250
  },
  "thw2": {
    "width": 100
  },
  "thw3": {
    "width": 250
  },
  "thw4": {
    "width": 250
  },
  "thwbig": {
    "width": 600
  },
  "th": {
    "height": 80,
    "textAlign": "center",
    "color": "#ffffff",
    "fontSize": 26,
    "lineHeight": 80,
    "fontWeight": "bold"
  },
  "td": {
    "height": 80,
    "textAlign": "center",
    "color": "#000000",
    "fontSize": 26,
    "lineHeight": 80
  },
  "echarts": {
    "width": 710,
    "height": 600,
    "marginLeft": 20,
    "marginTop": 30
  }
}

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-4f506fc9!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/components/WEcharts/index.vue":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter.js?id=data-v-4f506fc9!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=styles&index=0!./src/components/WEcharts/index.vue ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "app": {
    "position": "relative"
  },
  "webview": {
    "flex": 1,
    "scrollEnabled": "false",
    "progressbarVisibility": "false"
  },
  "icon": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "content": "\"tb-loading-c spin\"",
    "fontSize": "48",
    "color": "#666666"
  }
}

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-3ea3d186!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/pages/homePages/summpage.vue":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler.js?id=data-v-3ea3d186!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=template&index=0!./src/pages/homePages/summpage.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["app"]
  }, [_c('navbar', {
    staticClass: ["navbarb"]
  }, [_c('navbar-item', {
    attrs: {
      "type": "back"
    }
  }), _c('navbar-item', {
    attrs: {
      "type": "title"
    }
  }, [_c('text', {
    staticClass: ["headtext"]
  }, [_vm._v("????????????")])]), _c('navbar-item', {
    attrs: {
      "type": "right"
    }
  }, [_c('button', {
    staticClass: ["navbutton"],
    attrs: {
      "eeui": {
        text: '??????',
        backgroundColor: '#2fdc7e'
      }
    },
    on: {
      "click": _vm.popurshowaction
    }
  })], 1)], 1), _c('scroller', {
    staticClass: ["scroller"]
  }, [_c('div', {
    staticClass: ["summBox"]
  }, [_vm._m(0), _vm._m(1), _c('WEcharts', {
    staticClass: ["echarts"],
    attrs: {
      "options": _vm.options
    }
  })], 1)])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["summSearch"]
  }, [_c('text', {
    staticClass: ["summStext"]
  }, [_vm._v("???????????????0???")]), _c('text', {
    staticClass: ["summarrowicon"]
  }, [_vm._v("???")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["tablebox"]
  }, [_c('div', {
    staticClass: ["tableHead"]
  }, [_c('text', {
    staticClass: ["th", "thw1", "RB"]
  }, [_vm._v("??????")]), _c('text', {
    staticClass: ["th", "thw1", "RB"]
  }, [_vm._v("??????")]), _c('text', {
    staticClass: ["th", "thw1", "RB"]
  }, [_vm._v("??????")])]), _c('div', {
    staticClass: ["tbody", "BB"]
  }, [_c('text', {
    staticClass: ["td", "thw1", "RB"]
  }, [_vm._v("??????")]), _c('text', {
    staticClass: ["td", "thw1", "RB"]
  }, [_vm._v("0")]), _c('text', {
    staticClass: ["td", "thw1", "RB"]
  }, [_vm._v("12%")])]), _c('div', {
    staticClass: ["tbody", "BB"]
  }, [_c('text', {
    staticClass: ["td", "thw1", "RB"]
  }, [_vm._v("?????????")]), _c('text', {
    staticClass: ["td", "thw1", "RB"]
  }, [_vm._v("0")]), _c('text', {
    staticClass: ["td", "thw1", "RB"]
  }, [_vm._v("12%")])]), _c('div', {
    staticClass: ["tbody", "BB"]
  }, [_c('text', {
    staticClass: ["td", "thw1", "RB"]
  }, [_vm._v("??????")]), _c('text', {
    staticClass: ["td", "thw1", "RB"]
  }, [_vm._v("0")]), _c('text', {
    staticClass: ["td", "thw1", "RB"]
  }, [_vm._v("12%")])])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-4f506fc9!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/components/WEcharts/index.vue":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler.js?id=data-v-4f506fc9!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=template&index=0!./src/components/WEcharts/index.vue ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["app"]
  }, [_c('web-view', {
    ref: "reflectName",
    staticClass: ["webview"],
    on: {
      "ready": _vm.webReady,
      "stateChanged": _vm.webState
    }
  }), (_vm.loadIng) ? _c('icon', {
    staticClass: ["icon"]
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });