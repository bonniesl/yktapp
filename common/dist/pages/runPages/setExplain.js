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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/runPages/setExplain.vue?entry=true");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./src/pages/runPages/setExplain.vue?entry=true":
/*!******************************************************!*\
  !*** ./src/pages/runPages/setExplain.vue?entry=true ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter?id=data-v-4be3e34a!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=styles&index=0!./setExplain.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-4be3e34a!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/pages/runPages/setExplain.vue")
)

/* script */
__vue_exports__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader!babel-loader!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=script&index=0!./setExplain.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/pages/runPages/setExplain.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler?id=data-v-4be3e34a!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector?type=template&index=0!./setExplain.vue */ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-4be3e34a!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/pages/runPages/setExplain.vue")
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
__vue_options__.__file = "F:\\workspace\\weexZruup\\zruupApp\\src\\pages\\runPages\\setExplain.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4be3e34a"
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

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\script-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=script&index=0!./src/pages/runPages/setExplain.vue":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/script-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/node_modules/_babel-loader@8.1.0@babel-loader/lib!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=script&index=0!./src/pages/runPages/setExplain.vue ***!
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
var eeui = app.requireModule('eeui');
var stream = app.requireModule('stream');

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      explainList: [],
      link: '',
      phoneName: '',
      phoneType: [{
        name: '??????',
        type: 'mi'
      }, {
        name: '??????',
        type: 'huawei'
      }, {
        name: 'oppo',
        type: 'oppo'
      }, {
        name: 'vivo',
        type: 'vivo'
      }, {
        name: '??????',
        type: 'meizu'
      }, {
        name: '??????',
        type: 'sam'
      }, {
        name: '??????',
        type: 'one'
      }]
    };
  },
  methods: {
    explainFun: function explainFun() {
      var _this = this;

      stream.fetch({
        method: 'GET',
        url: _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl + _fetch_api_apis__WEBPACK_IMPORTED_MODULE_0__["default"].setExplain,
        type: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      }, function (res) {
        if (res.status === 200) {
          _this.explainList = res.data;

          if (res.data.length) {
            for (var index = 0; index < res.data.length; index++) {
              var el = res.data[index];

              for (var i = 0; i < _this.phoneType.length; i++) {
                var elType = _this.phoneType[i];

                if (_this.phoneName.indexOf(elType.type) != -1) {
                  //console.log(elType);
                  if (el.question_content.indexOf(elType.name) != -1) {
                    _this.link = el.link_url;
                  } //     

                } else {
                  if (el.question_content == '????????????') {
                    eeuiLog.log(el.link_url, '11111');
                  }
                } //console.log(el.question_content.indexOf(elType.name) );

              }
            } //console.log(res.data[0].question_content);

          }
        }
      });
    }
  },
  created: function created() {
    this.explainFun();

    if (app.config.params.phoneName !== undefined) {
      this.phoneName = app.config.params.phoneName.toLowerCase();
      eeuiLog.log(app.config.params.phoneName);
    } //console.log(WXEnvironment.deviceModel);

  }
});

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-loader.js!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\style-rewriter.js?id=data-v-4be3e34a!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=styles&index=0!./src/pages/runPages/setExplain.vue":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-loader.js!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/style-rewriter.js?id=data-v-4be3e34a!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=styles&index=0!./src/pages/runPages/setExplain.vue ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "righttext": {
    "fontSize": "30",
    "color": "#333333",
    "marginRight": "55"
  },
  "scroller": {
    "width": "750"
  },
  "webInner": {
    "width": "750",
    "flex": 1
  }
}

/***/ }),

/***/ "C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\template-compiler.js?id=data-v-4be3e34a!C:\\Users\\10844\\AppData\\Roaming\\npm\\node_modules\\eeui-cli\\lib\\loaders\\eeui-loader\\lib\\selector.js?type=template&index=0!./src/pages/runPages/setExplain.vue":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/template-compiler.js?id=data-v-4be3e34a!C:/Users/10844/AppData/Roaming/npm/node_modules/eeui-cli/lib/loaders/eeui-loader/lib/selector.js?type=template&index=0!./src/pages/runPages/setExplain.vue ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._v("??????????????????")])])], 1), _c('scroller', {
    staticClass: ["scroller"]
  }, [_c('web', {
    staticClass: ["webInner"],
    attrs: {
      "src": _vm.link
    }
  })])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });