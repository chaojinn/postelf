(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _wizard_wizard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wizard/wizard.component */ "./src/app/wizard/wizard.component.ts");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./test/test.component */ "./src/app/test/test.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: 'wizard', component: _wizard_wizard_component__WEBPACK_IMPORTED_MODULE_3__["WizardComponent"] },
    { path: 'test', component: _test_test_component__WEBPACK_IMPORTED_MODULE_4__["TestComponent"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _wizard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wizard.service */ "./src/app/wizard.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(router, wizardService) {
        this.router = router;
        this.wizardService = wizardService;
        this.title = 'postelf';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("this.router.url:" + window.location);
        if (window.location.toString().lastIndexOf("/") == window.location.toString().length - 1) {
            this.wizardService.getCurrentConfig().subscribe(function (data) {
                if (data["code"] == 200 && data["installed"] != "yes")
                    _this.router.navigate(['/wizard']);
                else
                    _this.router.navigate(['/login']);
            }, function (err) {
                console.log("error:" + err);
            });
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _wizard_service__WEBPACK_IMPORTED_MODULE_1__["WizardService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _wizard_wizard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./wizard/wizard.component */ "./src/app/wizard/wizard.component.ts");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./test/test.component */ "./src/app/test/test.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                _wizard_wizard_component__WEBPACK_IMPORTED_MODULE_7__["WizardComponent"],
                _test_test_component__WEBPACK_IMPORTED_MODULE_8__["TestComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div class=\"form-group\">\n    <label for=\"username\">Username</label>\n    <input type=\"text\" class=\"form-control\" id=\"username\" required name=\"username\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"password\">Password</label>\n    <input type=\"text\" class=\"form-control\" id=\"password\" required name=\"password\">\n  </div>\n  <div class=\"form-group\">\n    <button name=\"login\" id=\"login\" (click)=\"onClickMe()\">Login</button>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginComponent = /** @class */ (function () {
    function LoginComponent() {
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onClickMe = function () {
        console.log("onClickMe done");
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/test/test.component.html":
/*!******************************************!*\
  !*** ./src/app/test/test.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  <button id=\"btnRunWizard\" class=\"btn btn-primary\" (click)=\"testRun()\">Wizard Run</button><br>\n  <button id=\"btnRunWizard\" class=\"btn btn-primary\" (click)=\"testCreateFolder()\">test create folder</button><br>\n  <button id=\"btnRunWizard\" class=\"btn btn-primary\" (click)=\"testWriteFile()\">test write file</button><br>\n  <button id=\"btnRunWizard\" class=\"btn btn-primary\" (click)=\"testRestartService()\">test restart service</button><br>\n  <button id=\"btnRunWizard\" class=\"btn btn-primary\" (click)=\"testStartCore()\">test start core</button><br>\n  <button id=\"btnRunWizard\" class=\"btn btn-primary\" (click)=\"testDependency()\">test check dependency</button><br>\n  <button id=\"btnRunWizard\" class=\"btn btn-primary\" (click)=\"testLogin()\">test login</button><br>\n  <button id=\"btnRunWizard\" class=\"btn btn-primary\" (click)=\"testGetUser()\">test get user</button><br>\n</p>\n"

/***/ }),

/***/ "./src/app/test/test.component.scss":
/*!******************************************!*\
  !*** ./src/app/test/test.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/test/test.component.ts":
/*!****************************************!*\
  !*** ./src/app/test/test.component.ts ***!
  \****************************************/
/*! exports provided: TestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponent", function() { return TestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _wizard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wizard.service */ "./src/app/wizard.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TestComponent = /** @class */ (function () {
    function TestComponent(wizardService) {
        this.wizardService = wizardService;
    }
    TestComponent.prototype.ngOnInit = function () {
    };
    TestComponent.prototype.testRun = function () {
        console.log("testRun clicked");
        this.wizardService.testRunWizard().subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("error:" + err);
        });
    };
    TestComponent.prototype.testCreateFolder = function () {
        console.log("testCreateFolder clicked");
        this.wizardService.testCreateFolder().subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("error:" + err);
        });
    };
    TestComponent.prototype.testWriteFile = function () {
        console.log("testWriteFile clicked");
        this.wizardService.testWriteFile().subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("error:" + err);
        });
    };
    TestComponent.prototype.testRestartService = function () {
        console.log("testRestartService clicked");
        this.wizardService.testRestartService().subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("error:" + err);
        });
    };
    TestComponent.prototype.testStartCore = function () {
        console.log("testStartCore clicked");
        this.wizardService.testStartCore().subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("error:" + err);
        });
    };
    TestComponent.prototype.testDependency = function () {
        console.log("testDependency clicked");
        this.wizardService.testDependencyMock().subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("error:" + err);
        });
    };
    TestComponent.prototype.testLogin = function () {
        console.log("testLogin clicked");
        this.wizardService.testLogin().subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("error:" + err);
        });
    };
    TestComponent.prototype.testGetUser = function () {
        console.log("testGetUser clicked");
        this.wizardService.testGetUser().subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("error:" + err);
        });
    };
    TestComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-test',
            template: __webpack_require__(/*! ./test.component.html */ "./src/app/test/test.component.html"),
            styles: [__webpack_require__(/*! ./test.component.scss */ "./src/app/test/test.component.scss")]
        }),
        __metadata("design:paramtypes", [_wizard_service__WEBPACK_IMPORTED_MODULE_1__["WizardService"]])
    ], TestComponent);
    return TestComponent;
}());



/***/ }),

/***/ "./src/app/wizard.service.ts":
/*!***********************************!*\
  !*** ./src/app/wizard.service.ts ***!
  \***********************************/
/*! exports provided: WizardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizardService", function() { return WizardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WizardService = /** @class */ (function () {
    function WizardService(httpClient) {
        this.httpClient = httpClient;
        this.API_URL = 'http://localhost:3030';
        this.CORE_API_URL = 'http://localhost:3033';
        /*let fullURL=window.location;
        let strFullURL=fullURL.toString().toLowerCase();
        let https=false;
        if(strFullURL.indexOf("https://")!=-1)
          https=true;
        strFullURL=strFullURL.replace("https://","");
        strFullURL=strFullURL.replace("http://","");
        let idx=strFullURL.indexOf("/");
        if(https)
          this.API_URL="https://"+strFullURL.substr(0,idx);
        else
          this.API_URL="http://"+strFullURL.substr(0,idx);  */
    }
    WizardService.prototype.testDatabase = function (config) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.API_URL + "/wizard-controller", { cmd: "testDatabase", data: config }, { headers: headers });
        return ret;
    };
    WizardService.prototype.testDependency = function (config) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.API_URL + "/wizard-controller", { cmd: "testDependency", data: config }, { headers: headers });
        return ret;
    };
    WizardService.prototype.finishWizard = function (config) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.API_URL + "/wizard-controller", { cmd: "finishWizard", data: config }, { headers: headers });
        return ret;
    };
    WizardService.prototype.getCurrentConfig = function () {
        console.log("getCurrentConfig called:" + this.API_URL);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.API_URL + "/wizard-controller", { cmd: "getConfig" }, { headers: headers });
        return ret;
    };
    WizardService.prototype.testRunWizard = function () {
        var config = {};
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.API_URL + "/wizard-controller", { cmd: "finishWizard", data: config }, { headers: headers });
        return ret;
    };
    WizardService.prototype.testCreateFolder = function () {
        var config = {
            path: '/etc/postfix/certs'
        };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.CORE_API_URL + "/postelf-core", { cmd: "createFolder", data: config }, { headers: headers });
        return ret;
    };
    WizardService.prototype.testWriteFile = function () {
        var config = {
            path: '/etc/postfix/certs/server.csr',
            content: "aaaaaaaaaaaddddddddddsssssssss"
        };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.CORE_API_URL + "/postelf-core", { cmd: "writeFile", data: config }, { headers: headers });
        return ret;
    };
    WizardService.prototype.testRestartService = function () {
        var config = {
            service: 'saslauthds'
        };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.CORE_API_URL + "/postelf-core", { cmd: "restartService", data: config }, { headers: headers });
        return ret;
    };
    WizardService.prototype.testStartCore = function () {
        var config = {};
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.API_URL + "/wizard-controller", { cmd: "startCoreService", data: config }, { headers: headers });
        return ret;
    };
    WizardService.prototype.testDependencyMock = function () {
        var config = {};
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.put(this.API_URL + "/wizard-controller", { cmd: "testDependency", data: config }, { headers: headers });
        return ret;
    };
    WizardService.prototype.testLogin = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var ret = this.httpClient.post(this.API_URL + "/authentication", { "strategy": "local", "email": "123@123", "password": "123123" }, { headers: headers });
        return ret;
    };
    WizardService.prototype.testGetUser = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", "application/json");
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set("email", "123@123").set("$limit", "1");
        var ret = this.httpClient.get(this.API_URL + "/users", { headers: headers, params: params });
        return ret;
    };
    WizardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], WizardService);
    return WizardService;
}());



/***/ }),

/***/ "./src/app/wizard/wizard.component.html":
/*!**********************************************!*\
  !*** ./src/app/wizard/wizard.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h1>Install Wizard, Step {{wizard.step}}/{{wizard.totalStep}}</h1>\n\n  <div *ngIf=\"wizard.step==1\">\n    <form [formGroup]=\"wizardForm1\" > \n      <div class=\"form-group\">\n        <label for=\"loginAdmin\">Admin Login(email)</label>\n        <input type=\"email\" class=\"form-control\" id=\"loginAdmin\" formControlName=\"loginName\" placeholder=\"Admin Login\" >\n        <div *ngIf=\"wizardForm1.controls.loginName.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm1.controls.loginName.errors.required\">\n            Admin Login is required.\n          </div>\n          <div *ngIf=\"wizardForm1.controls.loginName.errors.email\">\n            Admin Login is not a vaild email address.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"password\" formControlName=\"password\"  >\n        <div *ngIf=\"wizardForm1.controls.password.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm1.controls.password.errors.required\">\n            Password is required.\n          </div>\n          <div *ngIf=\"wizardForm1.controls.password.errors.minlength\">\n            Password must be at least 6 characters.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"cfmpassword\">Confirm Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"cfmPassword\" formControlName=\"cfmPassword\"  >\n        <div *ngIf=\"wizardForm1.controls.cfmPassword.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm1.controls.cfmPassword.errors.required\">\n            Confirm password is required.\n          </div>\n          <div *ngIf=\"wizardForm1.controls.cfmPassword.errors.notEquivalent\">\n            Confirm password does not match password.\n          </div>\n          <div *ngIf=\"wizardForm1.controls.cfmPassword.errors.minlength\">\n            Confirm password must be at least 6 characters.\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n  <div *ngIf=\"wizard.step==2\">\n    <form [formGroup]=\"wizardForm2\" > \n      <div class=\"form-group\">\n        <label for=\"dbAddress\">Database Address</label>\n        <input type=\"text\" class=\"form-control\" id=\"dbAddress\" formControlName=\"dbAddress\" placeholder=\"Database address(ip or domain)\" >\n        <div *ngIf=\"wizardForm2.controls.dbAddress.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm2.controls.dbAddress.errors.required\">\n            Database address is required.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"dbUSer\">Database User</label>\n        <input type=\"text\" class=\"form-control\" id=\"dbUSer\" formControlName=\"dbUSer\" placeholder=\"Database user\" >\n        <div *ngIf=\"wizardForm2.controls.dbUSer.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm2.controls.dbUSer.errors.required\">\n            Database user is required.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"dbPassword\">Database Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"dbPassword\" formControlName=\"dbPassword\" placeholder=\"Database password\" >\n        <div *ngIf=\"wizardForm2.controls.dbPassword.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm2.controls.dbPassword.errors.required\">\n            Database password is required.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"dbName\">Database Name</label>\n        <input type=\"text\" class=\"form-control\" id=\"dbName\" formControlName=\"dbName\" placeholder=\"Database name\" >\n        <div *ngIf=\"wizardForm2.controls.dbName.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm2.controls.dbName.errors.required\">\n            Database name is required.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <button id=\"btnTestConnection\" class=\" btn btn-primary\" (click)=\"testDBConnection()\" style=\"margin-bottom: 10px;\">Test DB Connection</button>\n        \n        <div *ngIf=\"dbTested==2\" class=\"alert alert-danger\">\n          Connect to db failed, pleaes check db credentials\n        </div>\n        <div *ngIf=\"dbTested==1\" class=\"alert alert-success\">\n          DB tested OK\n        </div>\n        <div *ngIf=\"dbTested==0\" class=\"alert alert-warning\">\n          Connecting to DB...\n        </div>\n      </div>\n    </form>\n  </div>\n  <div *ngIf=\"wizard.step==3\">\n    <form [formGroup]=\"wizardForm3\" > \n      <div class=\"form-group\">\n        <label for=\"emailDomain\">Email Domain</label>\n        <input type=\"text\" class=\"form-control\" id=\"emailDomain\" formControlName=\"emailDomain\" placeholder=\"Email Domain\" >\n        <div *ngIf=\"wizardForm3.controls.emailDomain.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm3.controls.emailDomain.errors.required\">\n            Email domain is required.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"emailUser\">Email User</label>\n        <input type=\"text\" class=\"form-control\" id=\"emailUser\" formControlName=\"emailUser\" placeholder=\"Email User\" >\n        <div *ngIf=\"wizardForm3.controls.emailUser.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm3.controls.emailUser.errors.required\">\n            Email USer is required.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"emailPassword\">Email Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"emailPassword\" formControlName=\"emailPassword\" placeholder=\"Email Password\" >\n        <div *ngIf=\"wizardForm3.controls.emailPassword.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm3.controls.emailPassword.errors.required\">\n            Email password is required.\n          </div>\n          <div *ngIf=\"wizardForm3.controls.emailPassword.errors.minlength\">\n            Email password must be at least 6 characters.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"cfmEmailPassword\">Confirm Email Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"cfmEmailPassword\" formControlName=\"cfmEmailPassword\" placeholder=\"Confirm Email Password\" >\n        <div *ngIf=\"wizardForm3.controls.cfmEmailPassword.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm3.controls.cfmEmailPassword.errors.required\">\n            Confirm email password is required.\n          </div>\n          <div *ngIf=\"wizardForm3.controls.cfmEmailPassword.errors.notEquivalent\">\n            Confirm email password does not match password.\n          </div>\n          <div *ngIf=\"wizardForm3.controls.cfmEmailPassword.errors.minlength\">\n            Confirm email password must be at least 6 characters.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"baseMailFolder\">Path for Email Storage</label>\n        <input class=\"form-control\" id=\"baseMailFolder\" formControlName=\"baseMailFolder\" placeholder=\"Path for email storage\">\n        <div *ngIf=\"wizardForm3.controls.baseMailFolder.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm3.controls.baseMailFolder.errors.required\">\n            Path for email storage is required.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"runasuser\">Run Postfix/Dovecot as User</label>\n        <input class=\"form-control\" id=\"runasuser\" formControlName=\"runasuser\" placeholder=\"Run postfix/dovecot as user\" >\n        <div *ngIf=\"wizardForm3.controls.runasuser.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm3.controls.runasuser.errors.required\">\n            Run postfix/dovecot as user is required.\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"sudoPassword\">Sudo Password</label>\n        <input class=\"form-control\" id=\"sudoPassword\" formControlName=\"sudoPassword\" placeholder=\"Sudo password\" >\n        <div *ngIf=\"wizardForm3.controls.sudoPassword.invalid && submitted\" class=\"alert alert-danger\">\n          <div *ngIf=\"wizardForm3.controls.sudoPassword.errors.required\">\n            Sudo password is required.\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n  <div *ngIf=\"wizard.step==4\">\n    <form [formGroup]=\"wizardForm4\" > \n      <h2 *ngIf=\"dependencyTested==0\">Checking dependency</h2>\n      <h2 *ngIf=\"dependencyTested!=0\">Check dependency result</h2>\n      <ul>\n        <li *ngFor=\"let dep of dependencyResult\">\n          <div *ngIf=\"dep.error;then err_result else ok_result\"></div>    \n          <ng-template #err_result>{{ dep.name }} not installed</ng-template>\n          <ng-template #ok_result>{{ dep.name }} check ok</ng-template>\n          \n        </li>\n      </ul>\n    </form>\n  </div>\n  \n  <div class=\"form-group\">\n    <button id=\"btnPrevious\" *ngIf=\"wizard.step>1\" class=\"btn btn-primary\" (click)=\"previousStep()\">Previous</button>\n    <button id=\"btnNext\" *ngIf=\"wizard.step<=wizard.totalStep\" class=\"btn btn-primary\" (click)=\" nextStep()\" [disabled]=\"dependencyTested==0\">\n      <span *ngIf=\"wizard.step<wizard.totalStep\">Next</span>\n      <span *ngIf=\"wizard.step==wizard.totalStep&&dependencyTested==0\">Check</span>\n      <span *ngIf=\"wizard.step==wizard.totalStep&&dependencyTested==1\">Finish</span>\n      <span *ngIf=\"wizard.step==wizard.totalStep&&dependencyTested==2\">Check</span>\n    </button>\n  </div>\n  \n  \n\n<div>\n"

/***/ }),

/***/ "./src/app/wizard/wizard.component.scss":
/*!**********************************************!*\
  !*** ./src/app/wizard/wizard.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#btnPrevious {\n  margin-right: 5vw; }\n"

/***/ }),

/***/ "./src/app/wizard/wizard.component.ts":
/*!********************************************!*\
  !*** ./src/app/wizard/wizard.component.ts ***!
  \********************************************/
/*! exports provided: WizardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizardComponent", function() { return WizardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _wizard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wizard */ "./src/app/wizard/wizard.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _wizard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../wizard.service */ "./src/app/wizard.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WizardComponent = /** @class */ (function () {
    function WizardComponent(router, formBuilder, wizardService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.wizardService = wizardService;
        this.checked = false;
        this.submitted = false;
        this.dbTested = -1; //0 testing, //1 ok //2 failed
        this.dependencyTested = -1;
        this.wizardFinished = -1;
        this.wizard = new _wizard__WEBPACK_IMPORTED_MODULE_1__["Wizard"]();
    }
    WizardComponent.prototype.checkIfMatchingPasswords = function (passwordKey, passwordConfirmationKey) {
        return function (group) {
            var passwordInput = group.controls[passwordKey];
            var passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true });
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    };
    WizardComponent.prototype.ngOnInit = function () {
        this.wizardForm1 = this.formBuilder.group({
            loginName: [this.wizard.loginName, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)]],
            cfmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)]]
        }, { validator: this.checkIfMatchingPasswords('password', 'cfmPassword') });
        this.wizardForm2 = this.formBuilder.group({
            dbAddress: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            dbUSer: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            dbPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            dbName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]]
        });
        this.wizardForm3 = this.formBuilder.group({
            emailDomain: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            emailUser: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            emailPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)]],
            cfmEmailPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)]],
            baseMailFolder: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            runasuser: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            sudoPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
        }, { validator: this.checkIfMatchingPasswords('emailPassword', 'cfmEmailPassword') });
        this.wizardForm4 = this.formBuilder.group({});
    };
    WizardComponent.prototype.nextStep = function () {
        this.submitted = true;
        if (this["wizardForm" + this.wizard.step].invalid) {
            return;
        }
        for (var keyName in this["wizardForm" + this.wizard.step].controls) {
            this.wizard[keyName] = this["wizardForm" + this.wizard.step].controls[keyName].value;
        }
        console.log("submit ok:" + JSON.stringify(this.wizard));
        this.submitted = false;
        if (this.wizard.step == 4) {
            if (this.dependencyTested == 1)
                this.finishWizard();
            else
                this.testDependency();
            return;
        }
        this.wizard.step++;
        console.log("next clicked");
        if (this.wizard.step == 4) {
            this.testDependency();
        }
    };
    WizardComponent.prototype.previousStep = function () {
        console.log("previousStep clicked");
        this.wizard.step--;
    };
    WizardComponent.prototype.testDBConnection = function () {
        var _this = this;
        console.log("testDBConnection");
        this.dbTested = 0;
        this.submitted = true;
        if (this["wizardForm" + this.wizard.step].invalid) {
            return;
        }
        for (var keyName in this["wizardForm" + this.wizard.step].controls) {
            this.wizard[keyName] = this["wizardForm" + this.wizard.step].controls[keyName].value;
        }
        console.log(JSON.stringify(this.wizard));
        this.wizardService.testDatabase(this.wizard).subscribe(function (data) {
            console.log(data);
            if (data["error"])
                _this.dbTested = 2;
            else
                _this.dbTested = 1;
        }, function (err) {
            _this.dbTested = 2;
            console.log("error:" + err);
        });
    };
    WizardComponent.prototype.testDependency = function () {
        var _this = this;
        console.log("testDependency");
        this.dependencyTested = 0;
        this.wizardService.testDependency(this.wizard).subscribe(function (data) {
            console.log(data);
            if (Array.isArray(data)) {
                _this.dependencyResult = data;
            }
            var i = 0;
            var error = false;
            console.log(JSON.stringify(data));
            for (i = 0; i < _this.dependencyResult.length; i++) {
                if (_this.dependencyResult[i].error) {
                    _this.dependencyTested = 2;
                    error = true;
                    break;
                }
            }
            if (!error)
                _this.dependencyTested = 1;
        }, function (err) {
            _this.dependencyTested = 2;
            console.log("error:" + err);
        });
    };
    WizardComponent.prototype.finishWizard = function () {
        var _this = this;
        console.log("finishWizard");
        this.wizardFinished = 0;
        this.wizardService.finishWizard(this.wizard).subscribe(function (data) {
            console.log(data);
            if (data["code"] == 200) {
                _this.router.navigate(['/login']);
                _this.wizardFinished = 1;
            }
        }, function (err) {
            _this.wizardFinished = 2;
            console.log("error:" + err);
        });
    };
    WizardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-wizard',
            template: __webpack_require__(/*! ./wizard.component.html */ "./src/app/wizard/wizard.component.html"),
            styles: [__webpack_require__(/*! ./wizard.component.scss */ "./src/app/wizard/wizard.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _wizard_service__WEBPACK_IMPORTED_MODULE_3__["WizardService"]])
    ], WizardComponent);
    return WizardComponent;
}());



/***/ }),

/***/ "./src/app/wizard/wizard.ts":
/*!**********************************!*\
  !*** ./src/app/wizard/wizard.ts ***!
  \**********************************/
/*! exports provided: Wizard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wizard", function() { return Wizard; });
var Wizard = /** @class */ (function () {
    function Wizard() {
        this.step = 1;
        this.totalStep = 4;
        this.loginName = "";
        this.password = "";
        this.cfmPassword = "";
        this.dbAddress = "";
        this.dbUSer = "";
        this.dbPassword = "";
        this.dbName = "";
        this.emailDomain = "";
        this.emailUser = "";
        this.emailPassword = "";
        this.cfmEmailPassword = "";
    }
    return Wizard;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/chaojinn/postelf-client/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map