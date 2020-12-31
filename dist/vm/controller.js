var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import _ from 'lodash';
import { nav, Page, resOptions } from '../components';
import { env } from '../tool';
import { messageHub } from '../net';
var Controller = /** @class */ (function () {
    function Controller(res) {
        var _this = this;
        this._t = {};
        this.isDev = env.isDevelopment;
        //private disposer:()=>void;
        this.dispose = function () {
            // message listener的清理
            //nav.unregisterReceiveHandler(this.receiveHandlerId);
            messageHub.unregisterReceiveHandler(_this.receiveHandlerId);
            _this.onDispose();
        };
        this.onMessageReceive = function (message) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onMessage(message)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.res = res || {};
        this.x = this.res.x || {};
        this.t = function (str) { return _this.internalT(str) || str; };
    }
    Object.defineProperty(Controller.prototype, "user", {
        get: function () { return nav.user; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "isLogined", {
        get: function () {
            var user = nav.user;
            if (user === undefined)
                return false;
            return user.id > 0;
        },
        enumerable: false,
        configurable: true
    });
    Controller.prototype.beforeInit = function () { };
    Controller.prototype.afterInit = function () { };
    Controller.prototype.init = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.beforeInit();
        this.pageWebNav = this.getPageWebNav();
        this.afterInit();
    };
    Controller.prototype.internalT = function (str) {
        return this._t[str];
    };
    Object.defineProperty(Controller.prototype, "webNav", {
        get: function () { return undefined; },
        enumerable: false,
        configurable: true
    });
    Controller.prototype.getWebNav = function () { return this.webNav; };
    Controller.prototype.getPageWebNav = function () { return undefined; };
    Object.defineProperty(Controller.prototype, "isWebNav", {
        get: function () { return nav.isWebNav; },
        enumerable: false,
        configurable: true
    });
    Controller.prototype.navigate = function (url) {
        nav.navigate(url);
    };
    Controller.prototype.setRes = function (res) {
        if (res === undefined)
            return;
        var $lang = resOptions.$lang, $district = resOptions.$district;
        _.merge(this._t, res);
        if ($lang !== undefined) {
            var l = res[$lang];
            if (l !== undefined) {
                _.merge(this._t, l);
                var d = l[$district];
                if (d !== undefined) {
                    _.merge(this._t, d);
                }
            }
        }
    };
    Controller.prototype.onDispose = function () {
    };
    //get isRouting() {return nav.isRouting;}
    Controller.prototype.isMe = function (id) {
        if (id === null)
            return false;
        var user = this.user;
        var userId = user.id;
        switch (typeof id) {
            default: return false;
            case 'string': return Number(id) === userId;
            case 'number': return id === userId;
            case 'object': return id.id === userId;
        }
    };
    Controller.prototype.openVPage = function (vp, param, afterBack) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ret = new vp(this);
                        return [4 /*yield*/, ret.open(param, afterBack)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Controller.prototype.replaceVPage = function (vp, param, afterBack) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ret = new vp(this);
                        return [4 /*yield*/, ret.replaceOpen(param, afterBack)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Controller.prototype.renderView = function (view, param) {
        var ret = new view(this);
        ret.render(param);
        return ret;
    };
    Controller.prototype.event = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onEvent(type, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.onEvent = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Controller.prototype.msg = function (text) {
        alert(text);
    };
    Controller.prototype.errorPage = function (header, err) {
        this.openPage(React.createElement(Page, { header: "App error!" },
            React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
    };
    Controller.prototype.onMessage = function (message) {
        return;
    };
    Controller.prototype.beforeStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /*
                console.log('this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);');
                this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);
                console.log('return true');
                */
                return [2 /*return*/, true];
            });
        });
    };
    Controller.prototype.afterStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Controller.prototype.registerReceiveHandler = function () {
        this.receiveHandlerId = messageHub.registerReceiveHandler(this.onMessageReceive);
    };
    Controller.prototype.start = function (param) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //this.disposer = this.dispose;
                        this.registerReceiveHandler();
                        return [4 /*yield*/, this.beforeStart()];
                    case 1:
                        ret = _a.sent();
                        if (ret === false)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.internalStart.apply(this, __spreadArrays([param], params))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.afterStart()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Controller.prototype, "isCalling", {
        get: function () { return this._resolve_$ !== undefined; },
        enumerable: false,
        configurable: true
    });
    Controller.prototype.call = function (param) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this._resolve_$ === undefined)
                    this._resolve_$ = [];
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this._resolve_$.push(resolve);
                                    return [4 /*yield*/, this.start.apply(this, __spreadArrays([param], params))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Controller.prototype.vCall = function (vp, param) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this._resolve_$ === undefined)
                    this._resolve_$ = [];
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this._resolve_$.push(resolve);
                                    return [4 /*yield*/, (new vp(this)).open(param)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Controller.prototype.returnCall = function (value) {
        if (this._resolve_$ === undefined)
            return;
        var resolve = this._resolve_$.pop();
        if (resolve === undefined) {
            alert('the Controller call already returned, or not called');
            return;
        }
        resolve(value);
    };
    Controller.prototype.openPage = function (page, onClosePage) {
        var disposer;
        if (onClosePage !== undefined) {
            disposer = function () {
                //if (this.disposer) this.disposer();
                onClosePage(undefined);
            };
        }
        nav.push(page, disposer);
        //this.disposer = undefined;
    };
    Controller.prototype.replacePage = function (page, onClosePage) {
        nav.replace(page, onClosePage);
        //this.disposer = undefined;
    };
    Controller.prototype.backPage = function () {
        nav.back();
    };
    Controller.prototype.closePage = function (level) {
        nav.pop(level);
    };
    Controller.prototype.ceasePage = function (level) {
        nav.ceaseTop(level);
    };
    Controller.prototype.go = function (showPage, url, absolute) {
        nav.go(showPage, url, absolute);
    };
    Controller.prototype.removeCeased = function () {
        nav.removeCeased();
    };
    Controller.prototype.regConfirmClose = function (confirmClose) {
        nav.regConfirmClose(confirmClose);
    };
    Controller.prototype.startAction = function () {
        this.topPageKey = nav.topKey();
    };
    Object.defineProperty(Controller.prototype, "TopKey", {
        get: function () {
            return this.topPageKey;
        },
        enumerable: false,
        configurable: true
    });
    Controller.prototype.SetTopKey = function (key) {
        this.topPageKey = key;
    };
    Controller.prototype.popToTopPage = function () {
        nav.popTo(this.topPageKey);
    };
    Controller.prototype.confirm = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var caption, message, ok, yes, no, classNames, close, buttons;
                        var _this = this;
                        return __generator(this, function (_a) {
                            caption = options.caption, message = options.message, ok = options.ok, yes = options.yes, no = options.no, classNames = options.classNames;
                            close = function (res) {
                                _this.closePage();
                                resolve(res);
                            };
                            buttons = [];
                            if (ok !== undefined) {
                                buttons.push(React.createElement("button", { key: "ok", className: "btn btn-primary mr-3", onClick: function () { return close('ok'); } }, ok));
                            }
                            if (yes !== undefined) {
                                buttons.push(React.createElement("button", { key: "yes", className: "btn btn-success mr-3", onClick: function () { return close('yes'); } }, yes));
                            }
                            if (no !== undefined) {
                                buttons.push(React.createElement("button", { key: "no", className: "btn btn-outline-danger mr-3", onClick: function () { return close('no'); } }, no));
                            }
                            this.openPage(React.createElement(Page, { header: caption || '请确认', back: "close" },
                                React.createElement("div", { className: classNames || "rounded bg-white m-5 p-3 border" },
                                    React.createElement("div", { className: "d-flex align-items-center justify-content-center" }, message),
                                    React.createElement("div", { className: "mt-3 d-flex align-items-center justify-content-center" }, buttons))));
                            nav.regConfirmClose(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    resolve(undefined);
                                    return [2 /*return*/, true];
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    return Controller;
}());
export { Controller };
//# sourceMappingURL=controller.js.map