"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return expectsLowerCase ? (val) => set2.has(val.toLowerCase()) : (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s2 = str ? `on${capitalize(str)}` : ``;
  return s2;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i2) => {
          entries[stringifySymbol(key, i2) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v2) => stringifySymbol(v2))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v2, i2 = "") => {
  var _a;
  return isSymbol(v2) ? `Symbol(${(_a = v2.description) != null ? _a : i2})` : v2;
};
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject$1(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode$1 = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode$1) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$1(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E$1 = function() {
};
E$1.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len = evtArr.length;
    for (i2; i2 < len; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i2 = evts.length - 1; i2 >= 0; i2--) {
        if (evts[i2].fn === callback || evts[i2].fn._ === callback) {
          evts.splice(i2, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1$1 = E$1;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$1(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    const opts = protocol[i2];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject$1(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType$1(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject$1(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$2(hooks, data, params) {
  let promise = false;
  for (let i2 = 0; i2 < hooks.length; i2++) {
    const hook = hooks[i2];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray$1(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$2(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray$1(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray$1(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray$1(interceptor.invoke)) {
      const res = queue$2(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject$1(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !options.formatArgs || !isPlainObject$1(options.formatArgs) && isPlainObject$1(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i2 = 0; i2 < keys.length; i2++) {
    const name = keys[i2];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const apiErrMsg = name + ":fail" + (errMsg ? " " + errMsg : "");
  delete errRes.errCode;
  let res = extend({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + "\n" + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray$1(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$1(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject$1(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject$1(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject$1(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject$1(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray$1(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i2 = 0; i2 < onPushMessageCallbacks.length; i2++) {
      const callback = onPushMessageCallbacks[i2];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_2, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject$1(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject$1(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__051B1C3",
    appName: "ddnh_wx",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.23",
    uniRuntimeVersion: "4.23",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray$1(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__051B1C3",
      appName: "ddnh_wx",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function toRaw$1(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw$1(raw) : observed;
}
function isRef$1(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack$1 = [];
function pushWarningContext$1(vnode) {
  stack$1.push(vnode);
}
function popWarningContext$1() {
  stack$1.pop();
}
function warn$1$1(msg, ...args) {
  const instance = stack$1.length ? stack$1[stack$1.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace$1();
  if (appWarnHandler) {
    callWithErrorHandling$1(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a2) => {
          var _a, _b;
          return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName$1(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace$1(trace));
    }
    console.warn(...warnArgs);
  }
}
function getComponentTrace$1() {
  let currentVNode = stack$1[stack$1.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace$1(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry$1(entry));
  });
  return logs;
}
function formatTraceEntry$1({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName$1(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps$1(vnode.props), close] : [open + close];
}
function formatProps$1(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp$1(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp$1(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef$1(value)) {
    value = formatProp$1(key, toRaw$1(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw$1(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling$1(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError$1(err, instance, type);
  }
}
function handleError$1(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings$1[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling$1(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError$1(err, type, contextVNode, throwInDev);
}
function logError$1(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext$1(contextVNode);
    }
    warn$1$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext$1();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing$1 = false;
let isFlushPending$1 = false;
const queue$1 = [];
let flushIndex$1 = 0;
const pendingPostFlushCbs$1 = [];
let activePostFlushCbs$1 = null;
let postFlushIndex$1 = 0;
const resolvedPromise$1 = /* @__PURE__ */ Promise.resolve();
const RECURSION_LIMIT$1 = 100;
function findInsertionIndex$1(id) {
  let start = flushIndex$1 + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId$1(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob$1(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing$1 && job.allowRecurse ? flushIndex$1 + 1 : flushIndex$1
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex$1(job.id), 0, job);
    }
    queueFlush$1();
  }
}
function queueFlush$1() {
  if (!isFlushing$1 && !isFlushPending$1) {
    isFlushPending$1 = true;
    resolvedPromise$1.then(flushJobs$1);
  }
}
function queuePostFlushCb$1(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs$1 || !activePostFlushCbs$1.includes(
      cb,
      cb.allowRecurse ? postFlushIndex$1 + 1 : postFlushIndex$1
    )) {
      pendingPostFlushCbs$1.push(cb);
    }
  } else {
    pendingPostFlushCbs$1.push(...cb);
  }
  queueFlush$1();
}
function flushPostFlushCbs$1(seen) {
  if (pendingPostFlushCbs$1.length) {
    const deduped = [...new Set(pendingPostFlushCbs$1)].sort(
      (a2, b2) => getId$1(a2) - getId$1(b2)
    );
    pendingPostFlushCbs$1.length = 0;
    if (activePostFlushCbs$1) {
      activePostFlushCbs$1.push(...deduped);
      return;
    }
    activePostFlushCbs$1 = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex$1 = 0; postFlushIndex$1 < activePostFlushCbs$1.length; postFlushIndex$1++) {
      if (checkRecursiveUpdates$1(seen, activePostFlushCbs$1[postFlushIndex$1])) {
        continue;
      }
      activePostFlushCbs$1[postFlushIndex$1]();
    }
    activePostFlushCbs$1 = null;
    postFlushIndex$1 = 0;
  }
}
const getId$1 = (job) => job.id == null ? Infinity : job.id;
const comparator$1 = (a2, b2) => {
  const diff2 = getId$1(a2) - getId$1(b2);
  if (diff2 === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs$1(seen) {
  isFlushPending$1 = false;
  isFlushing$1 = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator$1);
  const check = (job) => checkRecursiveUpdates$1(seen, job);
  try {
    for (flushIndex$1 = 0; flushIndex$1 < queue$1.length; flushIndex$1++) {
      const job = queue$1[flushIndex$1];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling$1(job, null, 14);
      }
    }
  } finally {
    flushIndex$1 = 0;
    queue$1.length = 0;
    flushPostFlushCbs$1(seen);
    isFlushing$1 = false;
    if (queue$1.length || pendingPostFlushCbs$1.length) {
      flushJobs$1(seen);
    }
  }
}
function checkRecursiveUpdates$1(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT$1) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName$1(instance.type);
      handleError$1(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent$1(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    instance.effect.dirty = true;
    instance.update();
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      instance.parent.effect.dirty = true;
      queueJob$1(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb$1(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e2) {
      console.error(e2);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
{
  const g2 = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g2[key]))
      setters = g2[key] = [];
    setters.push(setter);
    return (v2) => {
      if (setters.length > 1)
        setters.forEach((set2) => set2(v2));
      else
        setters[0](v2);
    };
  };
  registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v2) => v2
  );
  registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v2) => v2
  );
}
const classifyRE$1 = /(?:^|[-_])(\w)/g;
const classify$1 = (str) => str.replace(classifyRE$1, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName$1(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName$1(instance, Component2, isRoot = false) {
  let name = getComponentName$1(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify$1(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent$1(value) {
  return isFunction(value) && "__vccOpts" in value;
}
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect2 {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i2 = 0; i2 < this._depsLength; i2++) {
        const dep = this.deps[i2];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v2) {
    this._dirtyLevel = v2 ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i2 = effect2._depsLength; i2 < effect2.deps.length; i2++) {
      cleanupDepEffect(effect2.deps[i2], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key
      }
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler2 {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler2 extends BaseReactiveHandler2 {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler2 extends BaseReactiveHandler2 {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler2();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler2();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler2(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler2(true);
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach3(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect2(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v2) {
    this.effect.dirty = v2;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a2) => {
          var _a, _b;
          return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i2 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i2 < queue.length; i2++) {
    const cb = queue[i2];
    if (cb && cb.pre) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a2, b2) => getId(a2) - getId(b2)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b2) => {
  const diff2 = getId(a2) - getId(b2);
  if (diff2 === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect2(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, depth, currentDepth, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i2) => i2.__$el || (i2.__$el = {}),
    $data: (i2) => i2.data,
    $props: (i2) => shallowReadonly(i2.props),
    $attrs: (i2) => shallowReadonly(i2.attrs),
    $slots: (i2) => shallowReadonly(i2.slots),
    $refs: (i2) => shallowReadonly(i2.refs),
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => {
      i2.effect.dirty = true;
      queueJob(i2.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$1(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v2) => injected.value = v2
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i2) => {
    currentInstance = i2;
  };
  setInSSRSetupState = (v2) => {
    isInSSRComponentSetup = v2;
  };
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions$1(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray$1(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i2 = getCurrentInstance();
    if (i2 && i2.appContext.config.warnRecursiveComputed) {
      c2._warnRecursive = true;
    }
  }
  return c2;
};
const version = "3.4.21";
const warn = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v2) {
  result[k] = v2;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone$1(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray$1(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i2 = 0; i2 < len; i2++) {
        copy[i2] = clone$1(src[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone$1(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone$1(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(
    options,
    instance,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    ctx: { $scope, $mpPlatform }
  } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$1(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray$1(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props,
        setupState,
        data,
        ctx
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter(
      (key) => key !== "class" && key !== "style"
    );
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(
        data,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance
  );
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u: u2 } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u2) {
        queuePostRenderEffect(u2);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance.effect = new ReactiveEffect2(
    componentUpdateFn,
    NOOP,
    () => queueJob(update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray$1(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined" && typeof global[method] !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq" || ctx.$mpPlatform === "mp-xhs") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray$1(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$1(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$1(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray$1(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
const o$1 = (value, key) => vOn(value, key);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value) => stringifyStyle(value);
const e$1 = (target, ...sources) => extend(target, ...sources);
const n$1 = (value) => normalizeClass(value);
const t$2 = (val) => toDisplayString(val);
const p$1 = (props) => renderProps(props);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray$1(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray$1(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const { onError } = internalInstance;
  if (onError) {
    internalInstance.appContext.config.errorHandler = (err) => {
      instance.$callHook(ON_ERROR, err);
    };
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray$1(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray$1(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray$1(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$1(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject$1(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$1(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray$1(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray$1(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray$1(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray$1(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$1(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var toString = Object.prototype.toString;
function isArray(val) {
  return toString.call(val) === "[object Array]";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isDate(val) {
  return toString.call(val) === "[object Date]";
}
function isURLSearchParams(val) {
  return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i2 = 0, l2 = obj.length; i2 < l2; i2++) {
      fn.call(null, obj[i2], i2, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function deepMerge() {
  let result = {};
  function assignValue(val, key) {
    if (typeof result[key] === "object" && typeof val === "object") {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === "object") {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (let i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
    forEach(arguments[i2], assignValue);
  }
  return result;
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      forEach(val, function parseValue(v2) {
        if (isDate(v2)) {
          v2 = v2.toISOString();
        } else if (isObject(v2)) {
          v2 = JSON.stringify(v2);
        }
        parts.push(encode(key) + "=" + encode(v2));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
function settle(resolve2, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  const status = response.statusCode;
  if (status && (!validateStatus2 || validateStatus2(status))) {
    resolve2(response);
  } else {
    reject(response);
  }
}
const mergeKeys$1 = (keys, config2) => {
  let config = {};
  keys.forEach((prop) => {
    if (!isUndefined(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};
const adapter = (config) => {
  return new Promise((resolve2, reject) => {
    let fullPath = buildURL(buildFullPath(config.baseURL, config.url), config.params, config.paramsSerializer);
    const _config = {
      url: fullPath,
      header: config.header,
      complete: (response) => {
        config.fullPath = fullPath;
        response.config = config;
        response.rawData = response.data;
        try {
          let jsonParseHandle = false;
          const forcedJSONParsingType = typeof config.forcedJSONParsing;
          if (forcedJSONParsingType === "boolean") {
            jsonParseHandle = config.forcedJSONParsing;
          } else if (forcedJSONParsingType === "object") {
            const includesMethod = config.forcedJSONParsing.include || [];
            jsonParseHandle = includesMethod.includes(config.method);
          }
          if (jsonParseHandle && typeof response.data === "string") {
            response.data = JSON.parse(response.data);
          }
        } catch (e2) {
        }
        settle(resolve2, reject, response);
      }
    };
    let requestTask;
    if (config.method === "UPLOAD") {
      delete _config.header["content-type"];
      delete _config.header["Content-Type"];
      let otherConfig = {
        filePath: config.filePath,
        name: config.name
      };
      const optionalKeys = [
        "timeout",
        "formData"
      ];
      requestTask = index.uploadFile({ ..._config, ...otherConfig, ...mergeKeys$1(optionalKeys, config) });
    } else if (config.method === "DOWNLOAD") {
      const optionalKeys = [
        "timeout",
        "filePath"
      ];
      requestTask = index.downloadFile({ ..._config, ...mergeKeys$1(optionalKeys, config) });
    } else {
      const optionalKeys = [
        "data",
        "method",
        "timeout",
        "dataType",
        "responseType",
        "enableHttp2",
        "enableQuic",
        "enableCache",
        "enableHttpDNS",
        "httpDNSServiceId",
        "enableChunked",
        "forceCellularNetwork"
      ];
      requestTask = index.request({ ..._config, ...mergeKeys$1(optionalKeys, config) });
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};
const dispatchRequest = (config) => {
  return adapter(config);
};
function InterceptorManager() {
  this.handlers = [];
}
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
  });
  return this.handlers.length - 1;
};
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager.prototype.forEach = function forEach2(fn) {
  this.handlers.forEach((h2) => {
    if (h2 !== null) {
      fn(h2);
    }
  });
};
const mergeKeys = (keys, globalsConfig, config2) => {
  let config = {};
  keys.forEach((prop) => {
    if (!isUndefined(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!isUndefined(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
const mergeConfig = (globalsConfig, config2 = {}) => {
  const method = config2.method || globalsConfig.method || "GET";
  let config = {
    baseURL: config2.baseURL || globalsConfig.baseURL || "",
    method,
    url: config2.url || "",
    params: config2.params || {},
    custom: { ...globalsConfig.custom || {}, ...config2.custom || {} },
    header: deepMerge(globalsConfig.header || {}, config2.header || {})
  };
  const defaultToConfig2Keys = ["getTask", "validateStatus", "paramsSerializer", "forcedJSONParsing"];
  config = { ...config, ...mergeKeys(defaultToConfig2Keys, globalsConfig, config2) };
  if (method === "DOWNLOAD") {
    const downloadKeys = [
      "timeout",
      "filePath"
    ];
    config = { ...config, ...mergeKeys(downloadKeys, globalsConfig, config2) };
  } else if (method === "UPLOAD") {
    delete config.header["content-type"];
    delete config.header["Content-Type"];
    const uploadKeys = [
      "filePath",
      "name",
      "timeout",
      "formData"
    ];
    uploadKeys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config[prop] = config2[prop];
      }
    });
    if (isUndefined(config.timeout) && !isUndefined(globalsConfig.timeout)) {
      config["timeout"] = globalsConfig["timeout"];
    }
  } else {
    const defaultsKeys = [
      "data",
      "timeout",
      "dataType",
      "responseType",
      "enableHttp2",
      "enableQuic",
      "enableCache",
      "enableHttpDNS",
      "httpDNSServiceId",
      "enableChunked",
      "forceCellularNetwork"
    ];
    config = { ...config, ...mergeKeys(defaultsKeys, globalsConfig, config2) };
  }
  return config;
};
const defaults = {
  baseURL: "",
  header: {},
  method: "GET",
  dataType: "json",
  paramsSerializer: null,
  responseType: "text",
  custom: {},
  timeout: 6e4,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  // 是否尝试将响应数据json化
  forcedJSONParsing: true
};
var clone = function() {
  function _instanceof(obj, type) {
    return type != null && obj instanceof type;
  }
  var nativeMap;
  try {
    nativeMap = Map;
  } catch (_2) {
    nativeMap = function() {
    };
  }
  var nativeSet;
  try {
    nativeSet = Set;
  } catch (_2) {
    nativeSet = function() {
    };
  }
  var nativePromise;
  try {
    nativePromise = Promise;
  } catch (_2) {
    nativePromise = function() {
    };
  }
  function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
    if (typeof circular === "object") {
      depth = circular.depth;
      prototype = circular.prototype;
      includeNonEnumerable = circular.includeNonEnumerable;
      circular = circular.circular;
    }
    var allParents = [];
    var allChildren = [];
    var useBuffer = typeof Buffer != "undefined";
    if (typeof circular == "undefined")
      circular = true;
    if (typeof depth == "undefined")
      depth = Infinity;
    function _clone(parent2, depth2) {
      if (parent2 === null)
        return null;
      if (depth2 === 0)
        return parent2;
      var child;
      var proto;
      if (typeof parent2 != "object") {
        return parent2;
      }
      if (_instanceof(parent2, nativeMap)) {
        child = new nativeMap();
      } else if (_instanceof(parent2, nativeSet)) {
        child = new nativeSet();
      } else if (_instanceof(parent2, nativePromise)) {
        child = new nativePromise(function(resolve2, reject) {
          parent2.then(function(value) {
            resolve2(_clone(value, depth2 - 1));
          }, function(err) {
            reject(_clone(err, depth2 - 1));
          });
        });
      } else if (clone2.__isArray(parent2)) {
        child = [];
      } else if (clone2.__isRegExp(parent2)) {
        child = new RegExp(parent2.source, __getRegExpFlags(parent2));
        if (parent2.lastIndex)
          child.lastIndex = parent2.lastIndex;
      } else if (clone2.__isDate(parent2)) {
        child = new Date(parent2.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent2)) {
        if (Buffer.from) {
          child = Buffer.from(parent2);
        } else {
          child = new Buffer(parent2.length);
          parent2.copy(child);
        }
        return child;
      } else if (_instanceof(parent2, Error)) {
        child = Object.create(parent2);
      } else {
        if (typeof prototype == "undefined") {
          proto = Object.getPrototypeOf(parent2);
          child = Object.create(proto);
        } else {
          child = Object.create(prototype);
          proto = prototype;
        }
      }
      if (circular) {
        var index2 = allParents.indexOf(parent2);
        if (index2 != -1) {
          return allChildren[index2];
        }
        allParents.push(parent2);
        allChildren.push(child);
      }
      if (_instanceof(parent2, nativeMap)) {
        parent2.forEach(function(value, key) {
          var keyChild = _clone(key, depth2 - 1);
          var valueChild = _clone(value, depth2 - 1);
          child.set(keyChild, valueChild);
        });
      }
      if (_instanceof(parent2, nativeSet)) {
        parent2.forEach(function(value) {
          var entryChild = _clone(value, depth2 - 1);
          child.add(entryChild);
        });
      }
      for (var i2 in parent2) {
        var attrs = Object.getOwnPropertyDescriptor(parent2, i2);
        if (attrs) {
          child[i2] = _clone(parent2[i2], depth2 - 1);
        }
        try {
          var objProperty = Object.getOwnPropertyDescriptor(parent2, i2);
          if (objProperty.set === "undefined") {
            continue;
          }
          child[i2] = _clone(parent2[i2], depth2 - 1);
        } catch (e2) {
          if (e2 instanceof TypeError) {
            continue;
          } else if (e2 instanceof ReferenceError) {
            continue;
          }
        }
      }
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(parent2);
        for (var i2 = 0; i2 < symbols.length; i2++) {
          var symbol = symbols[i2];
          var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
          if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
            continue;
          }
          child[symbol] = _clone(parent2[symbol], depth2 - 1);
          Object.defineProperty(child, symbol, descriptor);
        }
      }
      if (includeNonEnumerable) {
        var allPropertyNames = Object.getOwnPropertyNames(parent2);
        for (var i2 = 0; i2 < allPropertyNames.length; i2++) {
          var propertyName = allPropertyNames[i2];
          var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
          if (descriptor && descriptor.enumerable) {
            continue;
          }
          child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
          Object.defineProperty(child, propertyName, descriptor);
        }
      }
      return child;
    }
    return _clone(parent, depth);
  }
  clone2.clonePrototype = function clonePrototype(parent) {
    if (parent === null)
      return null;
    var c2 = function() {
    };
    c2.prototype = parent;
    return new c2();
  };
  function __objToStr(o2) {
    return Object.prototype.toString.call(o2);
  }
  clone2.__objToStr = __objToStr;
  function __isDate(o2) {
    return typeof o2 === "object" && __objToStr(o2) === "[object Date]";
  }
  clone2.__isDate = __isDate;
  function __isArray(o2) {
    return typeof o2 === "object" && __objToStr(o2) === "[object Array]";
  }
  clone2.__isArray = __isArray;
  function __isRegExp(o2) {
    return typeof o2 === "object" && __objToStr(o2) === "[object RegExp]";
  }
  clone2.__isRegExp = __isRegExp;
  function __getRegExpFlags(re2) {
    var flags = "";
    if (re2.global)
      flags += "g";
    if (re2.ignoreCase)
      flags += "i";
    if (re2.multiline)
      flags += "m";
    return flags;
  }
  clone2.__getRegExpFlags = __getRegExpFlags;
  return clone2;
}();
class Request {
  /**
   * @param {Object} arg - 全局配置
   * @param {String} arg.baseURL - 全局根路径
   * @param {Object} arg.header - 全局header
   * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
   * @param {String} arg.dataType = [json] - 全局默认的dataType
   * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
   * @param {Object} arg.custom - 全局默认的自定义参数
   * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
   * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
   * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
   * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
   * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
   */
  constructor(arg = {}) {
    if (!isPlainObject(arg)) {
      arg = {};
      console.warn("设置全局参数必须接收一个Object");
    }
    this.config = clone({ ...defaults, ...arg });
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * @Function
   * @param {Request~setConfigCallback} f - 设置全局默认配置
   */
  setConfig(f2) {
    this.config = f2(this.config);
  }
  middleware(config) {
    config = mergeConfig(this.config, config);
    let chain = [dispatchRequest, void 0];
    let promise = Promise.resolve(config);
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  /**
   * @Function
   * @param {Object} config - 请求配置项
   * @prop {String} options.url - 请求路径
   * @prop {Object} options.data - 请求参数
   * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
   * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
   * @prop {Object} [options.header = config.header] - 请求header
   * @prop {Object} [options.method = config.method] - 请求方法
   * @returns {Promise<unknown>}
   */
  request(config = {}) {
    return this.middleware(config);
  }
  get(url, options = {}) {
    return this.middleware({
      url,
      method: "GET",
      ...options
    });
  }
  post(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "POST",
      ...options
    });
  }
  put(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "PUT",
      ...options
    });
  }
  delete(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "DELETE",
      ...options
    });
  }
  connect(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "CONNECT",
      ...options
    });
  }
  head(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "HEAD",
      ...options
    });
  }
  options(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "OPTIONS",
      ...options
    });
  }
  trace(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "TRACE",
      ...options
    });
  }
  upload(url, config = {}) {
    config.url = url;
    config.method = "UPLOAD";
    return this.middleware(config);
  }
  download(url, config = {}) {
    config.url = url;
    config.method = "DOWNLOAD";
    return this.middleware(config);
  }
  get version() {
    return "3.1.0";
  }
}
var navigator = {};
navigator.userAgent = false;
var window$1 = {};
/*! CryptoJS v3.1.2 core-fix.js
 * code.google.com/p/crypto-js
 * (c) 2009-2013 by Jeff Mott. All rights reserved.
 * code.google.com/p/crypto-js/wiki/License
 * THIS IS FIX of 'core.js' to fix Hmac issue.
 * https://code.google.com/p/crypto-js/issues/detail?id=84
 * https://crypto-js.googlecode.com/svn-history/r667/branches/3.x/src/core.js
 */
var CryptoJS = CryptoJS || function(e2, g2) {
  var a2 = {};
  var b2 = a2.lib = {};
  var j2 = b2.Base = /* @__PURE__ */ function() {
    function n2() {
    }
    return { extend: function(p2) {
      n2.prototype = this;
      var o2 = new n2();
      if (p2) {
        o2.mixIn(p2);
      }
      if (!o2.hasOwnProperty("init")) {
        o2.init = function() {
          o2.$super.init.apply(this, arguments);
        };
      }
      o2.init.prototype = o2;
      o2.$super = this;
      return o2;
    }, create: function() {
      var o2 = this.extend();
      o2.init.apply(o2, arguments);
      return o2;
    }, init: function() {
    }, mixIn: function(p2) {
      for (var o2 in p2) {
        if (p2.hasOwnProperty(o2)) {
          this[o2] = p2[o2];
        }
      }
      if (p2.hasOwnProperty("toString")) {
        this.toString = p2.toString;
      }
    }, clone: function() {
      return this.init.prototype.extend(this);
    } };
  }();
  var l2 = b2.WordArray = j2.extend({ init: function(o2, n2) {
    o2 = this.words = o2 || [];
    if (n2 != g2) {
      this.sigBytes = n2;
    } else {
      this.sigBytes = o2.length * 4;
    }
  }, toString: function(n2) {
    return (n2 || h2).stringify(this);
  }, concat: function(t2) {
    var q2 = this.words;
    var p2 = t2.words;
    var n2 = this.sigBytes;
    var s2 = t2.sigBytes;
    this.clamp();
    if (n2 % 4) {
      for (var r2 = 0; r2 < s2; r2++) {
        var o2 = p2[r2 >>> 2] >>> 24 - r2 % 4 * 8 & 255;
        q2[n2 + r2 >>> 2] |= o2 << 24 - (n2 + r2) % 4 * 8;
      }
    } else {
      for (var r2 = 0; r2 < s2; r2 += 4) {
        q2[n2 + r2 >>> 2] = p2[r2 >>> 2];
      }
    }
    this.sigBytes += s2;
    return this;
  }, clamp: function() {
    var o2 = this.words;
    var n2 = this.sigBytes;
    o2[n2 >>> 2] &= 4294967295 << 32 - n2 % 4 * 8;
    o2.length = e2.ceil(n2 / 4);
  }, clone: function() {
    var n2 = j2.clone.call(this);
    n2.words = this.words.slice(0);
    return n2;
  }, random: function(p2) {
    var o2 = [];
    for (var n2 = 0; n2 < p2; n2 += 4) {
      o2.push(e2.random() * 4294967296 | 0);
    }
    return new l2.init(o2, p2);
  } });
  var m2 = a2.enc = {};
  var h2 = m2.Hex = { stringify: function(p2) {
    var r2 = p2.words;
    var o2 = p2.sigBytes;
    var q2 = [];
    for (var n2 = 0; n2 < o2; n2++) {
      var s2 = r2[n2 >>> 2] >>> 24 - n2 % 4 * 8 & 255;
      q2.push((s2 >>> 4).toString(16));
      q2.push((s2 & 15).toString(16));
    }
    return q2.join("");
  }, parse: function(p2) {
    var n2 = p2.length;
    var q2 = [];
    for (var o2 = 0; o2 < n2; o2 += 2) {
      q2[o2 >>> 3] |= parseInt(p2.substr(o2, 2), 16) << 24 - o2 % 8 * 4;
    }
    return new l2.init(q2, n2 / 2);
  } };
  var d2 = m2.Latin1 = { stringify: function(q2) {
    var r2 = q2.words;
    var p2 = q2.sigBytes;
    var n2 = [];
    for (var o2 = 0; o2 < p2; o2++) {
      var s2 = r2[o2 >>> 2] >>> 24 - o2 % 4 * 8 & 255;
      n2.push(String.fromCharCode(s2));
    }
    return n2.join("");
  }, parse: function(p2) {
    var n2 = p2.length;
    var q2 = [];
    for (var o2 = 0; o2 < n2; o2++) {
      q2[o2 >>> 2] |= (p2.charCodeAt(o2) & 255) << 24 - o2 % 4 * 8;
    }
    return new l2.init(q2, n2);
  } };
  var c2 = m2.Utf8 = { stringify: function(n2) {
    try {
      return decodeURIComponent(escape(d2.stringify(n2)));
    } catch (o2) {
      throw new Error("Malformed UTF-8 data");
    }
  }, parse: function(n2) {
    return d2.parse(unescape(encodeURIComponent(n2)));
  } };
  var i2 = b2.BufferedBlockAlgorithm = j2.extend({ reset: function() {
    this._data = new l2.init();
    this._nDataBytes = 0;
  }, _append: function(n2) {
    if (typeof n2 == "string") {
      n2 = c2.parse(n2);
    }
    this._data.concat(n2);
    this._nDataBytes += n2.sigBytes;
  }, _process: function(w2) {
    var q2 = this._data;
    var x = q2.words;
    var n2 = q2.sigBytes;
    var t2 = this.blockSize;
    var v2 = t2 * 4;
    var u2 = n2 / v2;
    if (w2) {
      u2 = e2.ceil(u2);
    } else {
      u2 = e2.max((u2 | 0) - this._minBufferSize, 0);
    }
    var s2 = u2 * t2;
    var r2 = e2.min(s2 * 4, n2);
    if (s2) {
      for (var p2 = 0; p2 < s2; p2 += t2) {
        this._doProcessBlock(x, p2);
      }
      var o2 = x.splice(0, s2);
      q2.sigBytes -= r2;
    }
    return new l2.init(o2, r2);
  }, clone: function() {
    var n2 = j2.clone.call(this);
    n2._data = this._data.clone();
    return n2;
  }, _minBufferSize: 0 });
  b2.Hasher = i2.extend({ cfg: j2.extend(), init: function(n2) {
    this.cfg = this.cfg.extend(n2);
    this.reset();
  }, reset: function() {
    i2.reset.call(this);
    this._doReset();
  }, update: function(n2) {
    this._append(n2);
    this._process();
    return this;
  }, finalize: function(n2) {
    if (n2) {
      this._append(n2);
    }
    var o2 = this._doFinalize();
    return o2;
  }, blockSize: 512 / 32, _createHelper: function(n2) {
    return function(p2, o2) {
      return new n2.init(o2).finalize(p2);
    };
  }, _createHmacHelper: function(n2) {
    return function(p2, o2) {
      return new k.HMAC.init(n2, o2).finalize(p2);
    };
  } });
  var k = a2.algo = {};
  return a2;
}(Math);
(function(g2) {
  var a2 = CryptoJS, f2 = a2.lib, e2 = f2.Base, h2 = f2.WordArray, a2 = a2.x64 = {};
  a2.Word = e2.extend({ init: function(b2, c2) {
    this.high = b2;
    this.low = c2;
  } });
  a2.WordArray = e2.extend({ init: function(b2, c2) {
    b2 = this.words = b2 || [];
    this.sigBytes = c2 != g2 ? c2 : 8 * b2.length;
  }, toX32: function() {
    for (var b2 = this.words, c2 = b2.length, a3 = [], d2 = 0; d2 < c2; d2++) {
      var e3 = b2[d2];
      a3.push(e3.high);
      a3.push(e3.low);
    }
    return h2.create(a3, this.sigBytes);
  }, clone: function() {
    for (var b2 = e2.clone.call(this), c2 = b2.words = this.words.slice(0), a3 = c2.length, d2 = 0; d2 < a3; d2++)
      c2[d2] = c2[d2].clone();
    return b2;
  } });
})();
CryptoJS.lib.Cipher || function(u2) {
  var g2 = CryptoJS, f2 = g2.lib, k = f2.Base, l2 = f2.WordArray, q2 = f2.BufferedBlockAlgorithm, r2 = g2.enc.Base64, v2 = g2.algo.EvpKDF, n2 = f2.Cipher = q2.extend({ cfg: k.extend(), createEncryptor: function(a2, b2) {
    return this.create(this._ENC_XFORM_MODE, a2, b2);
  }, createDecryptor: function(a2, b2) {
    return this.create(this._DEC_XFORM_MODE, a2, b2);
  }, init: function(a2, b2, c2) {
    this.cfg = this.cfg.extend(c2);
    this._xformMode = a2;
    this._key = b2;
    this.reset();
  }, reset: function() {
    q2.reset.call(this);
    this._doReset();
  }, process: function(a2) {
    this._append(a2);
    return this._process();
  }, finalize: function(a2) {
    a2 && this._append(a2);
    return this._doFinalize();
  }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function(a2) {
    return { encrypt: function(b2, c2, d2) {
      return ("string" == typeof c2 ? s2 : j2).encrypt(a2, b2, c2, d2);
    }, decrypt: function(b2, c2, d2) {
      return ("string" == typeof c2 ? s2 : j2).decrypt(a2, b2, c2, d2);
    } };
  } });
  f2.StreamCipher = n2.extend({ _doFinalize: function() {
    return this._process(true);
  }, blockSize: 1 });
  var m2 = g2.mode = {}, t2 = function(a2, b2, c2) {
    var d2 = this._iv;
    d2 ? this._iv = u2 : d2 = this._prevBlock;
    for (var e2 = 0; e2 < c2; e2++)
      a2[b2 + e2] ^= d2[e2];
  }, h2 = (f2.BlockCipherMode = k.extend({ createEncryptor: function(a2, b2) {
    return this.Encryptor.create(a2, b2);
  }, createDecryptor: function(a2, b2) {
    return this.Decryptor.create(a2, b2);
  }, init: function(a2, b2) {
    this._cipher = a2;
    this._iv = b2;
  } })).extend();
  h2.Encryptor = h2.extend({ processBlock: function(a2, b2) {
    var c2 = this._cipher, d2 = c2.blockSize;
    t2.call(this, a2, b2, d2);
    c2.encryptBlock(a2, b2);
    this._prevBlock = a2.slice(b2, b2 + d2);
  } });
  h2.Decryptor = h2.extend({ processBlock: function(a2, b2) {
    var c2 = this._cipher, d2 = c2.blockSize, e2 = a2.slice(b2, b2 + d2);
    c2.decryptBlock(
      a2,
      b2
    );
    t2.call(this, a2, b2, d2);
    this._prevBlock = e2;
  } });
  m2 = m2.CBC = h2;
  h2 = (g2.pad = {}).Pkcs7 = { pad: function(a2, b2) {
    for (var c2 = 4 * b2, c2 = c2 - a2.sigBytes % c2, d2 = c2 << 24 | c2 << 16 | c2 << 8 | c2, e2 = [], f3 = 0; f3 < c2; f3 += 4)
      e2.push(d2);
    c2 = l2.create(e2, c2);
    a2.concat(c2);
  }, unpad: function(a2) {
    a2.sigBytes -= a2.words[a2.sigBytes - 1 >>> 2] & 255;
  } };
  f2.BlockCipher = n2.extend({ cfg: n2.cfg.extend({ mode: m2, padding: h2 }), reset: function() {
    n2.reset.call(this);
    var a2 = this.cfg, b2 = a2.iv, a2 = a2.mode;
    if (this._xformMode == this._ENC_XFORM_MODE)
      var c2 = a2.createEncryptor;
    else
      c2 = a2.createDecryptor, this._minBufferSize = 1;
    this._mode = c2.call(a2, this, b2 && b2.words);
  }, _doProcessBlock: function(a2, b2) {
    this._mode.processBlock(a2, b2);
  }, _doFinalize: function() {
    var a2 = this.cfg.padding;
    if (this._xformMode == this._ENC_XFORM_MODE) {
      a2.pad(this._data, this.blockSize);
      var b2 = this._process(true);
    } else
      b2 = this._process(true), a2.unpad(b2);
    return b2;
  }, blockSize: 4 });
  var p2 = f2.CipherParams = k.extend({ init: function(a2) {
    this.mixIn(a2);
  }, toString: function(a2) {
    return (a2 || this.formatter).stringify(this);
  } }), m2 = (g2.format = {}).OpenSSL = { stringify: function(a2) {
    var b2 = a2.ciphertext;
    a2 = a2.salt;
    return (a2 ? l2.create([1398893684, 1701076831]).concat(a2).concat(b2) : b2).toString(r2);
  }, parse: function(a2) {
    a2 = r2.parse(a2);
    var b2 = a2.words;
    if (1398893684 == b2[0] && 1701076831 == b2[1]) {
      var c2 = l2.create(b2.slice(2, 4));
      b2.splice(0, 4);
      a2.sigBytes -= 16;
    }
    return p2.create({ ciphertext: a2, salt: c2 });
  } }, j2 = f2.SerializableCipher = k.extend({ cfg: k.extend({ format: m2 }), encrypt: function(a2, b2, c2, d2) {
    d2 = this.cfg.extend(d2);
    var e2 = a2.createEncryptor(c2, d2);
    b2 = e2.finalize(b2);
    e2 = e2.cfg;
    return p2.create({
      ciphertext: b2,
      key: c2,
      iv: e2.iv,
      algorithm: a2,
      mode: e2.mode,
      padding: e2.padding,
      blockSize: a2.blockSize,
      formatter: d2.format
    });
  }, decrypt: function(a2, b2, c2, d2) {
    d2 = this.cfg.extend(d2);
    b2 = this._parse(b2, d2.format);
    return a2.createDecryptor(c2, d2).finalize(b2.ciphertext);
  }, _parse: function(a2, b2) {
    return "string" == typeof a2 ? b2.parse(a2, this) : a2;
  } }), g2 = (g2.kdf = {}).OpenSSL = { execute: function(a2, b2, c2, d2) {
    d2 || (d2 = l2.random(8));
    a2 = v2.create({ keySize: b2 + c2 }).compute(a2, d2);
    c2 = l2.create(a2.words.slice(b2), 4 * c2);
    a2.sigBytes = 4 * b2;
    return p2.create({ key: a2, iv: c2, salt: d2 });
  } }, s2 = f2.PasswordBasedCipher = j2.extend({ cfg: j2.cfg.extend({ kdf: g2 }), encrypt: function(a2, b2, c2, d2) {
    d2 = this.cfg.extend(d2);
    c2 = d2.kdf.execute(c2, a2.keySize, a2.ivSize);
    d2.iv = c2.iv;
    a2 = j2.encrypt.call(this, a2, b2, c2.key, d2);
    a2.mixIn(c2);
    return a2;
  }, decrypt: function(a2, b2, c2, d2) {
    d2 = this.cfg.extend(d2);
    b2 = this._parse(b2, d2.format);
    c2 = d2.kdf.execute(c2, a2.keySize, a2.ivSize, b2.salt);
    d2.iv = c2.iv;
    return j2.decrypt.call(this, a2, b2, c2.key, d2);
  } });
}();
(function() {
  for (var q2 = CryptoJS, x = q2.lib.BlockCipher, r2 = q2.algo, j2 = [], y2 = [], z2 = [], A2 = [], B2 = [], C2 = [], s2 = [], u2 = [], v2 = [], w2 = [], g2 = [], k = 0; 256 > k; k++)
    g2[k] = 128 > k ? k << 1 : k << 1 ^ 283;
  for (var n2 = 0, l2 = 0, k = 0; 256 > k; k++) {
    var f2 = l2 ^ l2 << 1 ^ l2 << 2 ^ l2 << 3 ^ l2 << 4, f2 = f2 >>> 8 ^ f2 & 255 ^ 99;
    j2[n2] = f2;
    y2[f2] = n2;
    var t2 = g2[n2], D2 = g2[t2], E2 = g2[D2], b2 = 257 * g2[f2] ^ 16843008 * f2;
    z2[n2] = b2 << 24 | b2 >>> 8;
    A2[n2] = b2 << 16 | b2 >>> 16;
    B2[n2] = b2 << 8 | b2 >>> 24;
    C2[n2] = b2;
    b2 = 16843009 * E2 ^ 65537 * D2 ^ 257 * t2 ^ 16843008 * n2;
    s2[f2] = b2 << 24 | b2 >>> 8;
    u2[f2] = b2 << 16 | b2 >>> 16;
    v2[f2] = b2 << 8 | b2 >>> 24;
    w2[f2] = b2;
    n2 ? (n2 = t2 ^ g2[g2[g2[E2 ^ t2]]], l2 ^= g2[g2[l2]]) : n2 = l2 = 1;
  }
  var F2 = [
    0,
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    27,
    54
  ], r2 = r2.AES = x.extend({ _doReset: function() {
    for (var c2 = this._key, e2 = c2.words, a2 = c2.sigBytes / 4, c2 = 4 * ((this._nRounds = a2 + 6) + 1), b3 = this._keySchedule = [], h2 = 0; h2 < c2; h2++)
      if (h2 < a2)
        b3[h2] = e2[h2];
      else {
        var d2 = b3[h2 - 1];
        h2 % a2 ? 6 < a2 && 4 == h2 % a2 && (d2 = j2[d2 >>> 24] << 24 | j2[d2 >>> 16 & 255] << 16 | j2[d2 >>> 8 & 255] << 8 | j2[d2 & 255]) : (d2 = d2 << 8 | d2 >>> 24, d2 = j2[d2 >>> 24] << 24 | j2[d2 >>> 16 & 255] << 16 | j2[d2 >>> 8 & 255] << 8 | j2[d2 & 255], d2 ^= F2[h2 / a2 | 0] << 24);
        b3[h2] = b3[h2 - a2] ^ d2;
      }
    e2 = this._invKeySchedule = [];
    for (a2 = 0; a2 < c2; a2++)
      h2 = c2 - a2, d2 = a2 % 4 ? b3[h2] : b3[h2 - 4], e2[a2] = 4 > a2 || 4 >= h2 ? d2 : s2[j2[d2 >>> 24]] ^ u2[j2[d2 >>> 16 & 255]] ^ v2[j2[d2 >>> 8 & 255]] ^ w2[j2[d2 & 255]];
  }, encryptBlock: function(c2, e2) {
    this._doCryptBlock(c2, e2, this._keySchedule, z2, A2, B2, C2, j2);
  }, decryptBlock: function(c2, e2) {
    var a2 = c2[e2 + 1];
    c2[e2 + 1] = c2[e2 + 3];
    c2[e2 + 3] = a2;
    this._doCryptBlock(c2, e2, this._invKeySchedule, s2, u2, v2, w2, y2);
    a2 = c2[e2 + 1];
    c2[e2 + 1] = c2[e2 + 3];
    c2[e2 + 3] = a2;
  }, _doCryptBlock: function(c2, e2, a2, b3, h2, d2, j3, m2) {
    for (var n3 = this._nRounds, f3 = c2[e2] ^ a2[0], g3 = c2[e2 + 1] ^ a2[1], k2 = c2[e2 + 2] ^ a2[2], p2 = c2[e2 + 3] ^ a2[3], l3 = 4, t3 = 1; t3 < n3; t3++)
      var q3 = b3[f3 >>> 24] ^ h2[g3 >>> 16 & 255] ^ d2[k2 >>> 8 & 255] ^ j3[p2 & 255] ^ a2[l3++], r3 = b3[g3 >>> 24] ^ h2[k2 >>> 16 & 255] ^ d2[p2 >>> 8 & 255] ^ j3[f3 & 255] ^ a2[l3++], s3 = b3[k2 >>> 24] ^ h2[p2 >>> 16 & 255] ^ d2[f3 >>> 8 & 255] ^ j3[g3 & 255] ^ a2[l3++], p2 = b3[p2 >>> 24] ^ h2[f3 >>> 16 & 255] ^ d2[g3 >>> 8 & 255] ^ j3[k2 & 255] ^ a2[l3++], f3 = q3, g3 = r3, k2 = s3;
    q3 = (m2[f3 >>> 24] << 24 | m2[g3 >>> 16 & 255] << 16 | m2[k2 >>> 8 & 255] << 8 | m2[p2 & 255]) ^ a2[l3++];
    r3 = (m2[g3 >>> 24] << 24 | m2[k2 >>> 16 & 255] << 16 | m2[p2 >>> 8 & 255] << 8 | m2[f3 & 255]) ^ a2[l3++];
    s3 = (m2[k2 >>> 24] << 24 | m2[p2 >>> 16 & 255] << 16 | m2[f3 >>> 8 & 255] << 8 | m2[g3 & 255]) ^ a2[l3++];
    p2 = (m2[p2 >>> 24] << 24 | m2[f3 >>> 16 & 255] << 16 | m2[g3 >>> 8 & 255] << 8 | m2[k2 & 255]) ^ a2[l3++];
    c2[e2] = q3;
    c2[e2 + 1] = r3;
    c2[e2 + 2] = s3;
    c2[e2 + 3] = p2;
  }, keySize: 8 });
  q2.AES = x._createHelper(r2);
})();
(function() {
  function j2(b2, c2) {
    var a2 = (this._lBlock >>> b2 ^ this._rBlock) & c2;
    this._rBlock ^= a2;
    this._lBlock ^= a2 << b2;
  }
  function l2(b2, c2) {
    var a2 = (this._rBlock >>> b2 ^ this._lBlock) & c2;
    this._lBlock ^= a2;
    this._rBlock ^= a2 << b2;
  }
  var h2 = CryptoJS, e2 = h2.lib, n2 = e2.WordArray, e2 = e2.BlockCipher, g2 = h2.algo, q2 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], p2 = [
    14,
    17,
    11,
    24,
    1,
    5,
    3,
    28,
    15,
    6,
    21,
    10,
    23,
    19,
    12,
    4,
    26,
    8,
    16,
    7,
    27,
    20,
    13,
    2,
    41,
    52,
    31,
    37,
    47,
    55,
    30,
    40,
    51,
    45,
    33,
    48,
    44,
    49,
    39,
    56,
    34,
    53,
    46,
    42,
    50,
    36,
    29,
    32
  ], r2 = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], s2 = [{
    "0": 8421888,
    268435456: 32768,
    536870912: 8421378,
    805306368: 2,
    1073741824: 512,
    1342177280: 8421890,
    1610612736: 8389122,
    1879048192: 8388608,
    2147483648: 514,
    2415919104: 8389120,
    2684354560: 33280,
    2952790016: 8421376,
    3221225472: 32770,
    3489660928: 8388610,
    3758096384: 0,
    4026531840: 33282,
    134217728: 0,
    402653184: 8421890,
    671088640: 33282,
    939524096: 32768,
    1207959552: 8421888,
    1476395008: 512,
    1744830464: 8421378,
    2013265920: 2,
    2281701376: 8389120,
    2550136832: 33280,
    2818572288: 8421376,
    3087007744: 8389122,
    3355443200: 8388610,
    3623878656: 32770,
    3892314112: 514,
    4160749568: 8388608,
    1: 32768,
    268435457: 2,
    536870913: 8421888,
    805306369: 8388608,
    1073741825: 8421378,
    1342177281: 33280,
    1610612737: 512,
    1879048193: 8389122,
    2147483649: 8421890,
    2415919105: 8421376,
    2684354561: 8388610,
    2952790017: 33282,
    3221225473: 514,
    3489660929: 8389120,
    3758096385: 32770,
    4026531841: 0,
    134217729: 8421890,
    402653185: 8421376,
    671088641: 8388608,
    939524097: 512,
    1207959553: 32768,
    1476395009: 8388610,
    1744830465: 2,
    2013265921: 33282,
    2281701377: 32770,
    2550136833: 8389122,
    2818572289: 514,
    3087007745: 8421888,
    3355443201: 8389120,
    3623878657: 0,
    3892314113: 33280,
    4160749569: 8421378
  }, {
    "0": 1074282512,
    16777216: 16384,
    33554432: 524288,
    50331648: 1074266128,
    67108864: 1073741840,
    83886080: 1074282496,
    100663296: 1073758208,
    117440512: 16,
    134217728: 540672,
    150994944: 1073758224,
    167772160: 1073741824,
    184549376: 540688,
    201326592: 524304,
    218103808: 0,
    234881024: 16400,
    251658240: 1074266112,
    8388608: 1073758208,
    25165824: 540688,
    41943040: 16,
    58720256: 1073758224,
    75497472: 1074282512,
    92274688: 1073741824,
    109051904: 524288,
    125829120: 1074266128,
    142606336: 524304,
    159383552: 0,
    176160768: 16384,
    192937984: 1074266112,
    209715200: 1073741840,
    226492416: 540672,
    243269632: 1074282496,
    260046848: 16400,
    268435456: 0,
    285212672: 1074266128,
    301989888: 1073758224,
    318767104: 1074282496,
    335544320: 1074266112,
    352321536: 16,
    369098752: 540688,
    385875968: 16384,
    402653184: 16400,
    419430400: 524288,
    436207616: 524304,
    452984832: 1073741840,
    469762048: 540672,
    486539264: 1073758208,
    503316480: 1073741824,
    520093696: 1074282512,
    276824064: 540688,
    293601280: 524288,
    310378496: 1074266112,
    327155712: 16384,
    343932928: 1073758208,
    360710144: 1074282512,
    377487360: 16,
    394264576: 1073741824,
    411041792: 1074282496,
    427819008: 1073741840,
    444596224: 1073758224,
    461373440: 524304,
    478150656: 0,
    494927872: 16400,
    511705088: 1074266128,
    528482304: 540672
  }, {
    "0": 260,
    1048576: 0,
    2097152: 67109120,
    3145728: 65796,
    4194304: 65540,
    5242880: 67108868,
    6291456: 67174660,
    7340032: 67174400,
    8388608: 67108864,
    9437184: 67174656,
    10485760: 65792,
    11534336: 67174404,
    12582912: 67109124,
    13631488: 65536,
    14680064: 4,
    15728640: 256,
    524288: 67174656,
    1572864: 67174404,
    2621440: 0,
    3670016: 67109120,
    4718592: 67108868,
    5767168: 65536,
    6815744: 65540,
    7864320: 260,
    8912896: 4,
    9961472: 256,
    11010048: 67174400,
    12058624: 65796,
    13107200: 65792,
    14155776: 67109124,
    15204352: 67174660,
    16252928: 67108864,
    16777216: 67174656,
    17825792: 65540,
    18874368: 65536,
    19922944: 67109120,
    20971520: 256,
    22020096: 67174660,
    23068672: 67108868,
    24117248: 0,
    25165824: 67109124,
    26214400: 67108864,
    27262976: 4,
    28311552: 65792,
    29360128: 67174400,
    30408704: 260,
    31457280: 65796,
    32505856: 67174404,
    17301504: 67108864,
    18350080: 260,
    19398656: 67174656,
    20447232: 0,
    21495808: 65540,
    22544384: 67109120,
    23592960: 256,
    24641536: 67174404,
    25690112: 65536,
    26738688: 67174660,
    27787264: 65796,
    28835840: 67108868,
    29884416: 67109124,
    30932992: 67174400,
    31981568: 4,
    33030144: 65792
  }, {
    "0": 2151682048,
    65536: 2147487808,
    131072: 4198464,
    196608: 2151677952,
    262144: 0,
    327680: 4198400,
    393216: 2147483712,
    458752: 4194368,
    524288: 2147483648,
    589824: 4194304,
    655360: 64,
    720896: 2147487744,
    786432: 2151678016,
    851968: 4160,
    917504: 4096,
    983040: 2151682112,
    32768: 2147487808,
    98304: 64,
    163840: 2151678016,
    229376: 2147487744,
    294912: 4198400,
    360448: 2151682112,
    425984: 0,
    491520: 2151677952,
    557056: 4096,
    622592: 2151682048,
    688128: 4194304,
    753664: 4160,
    819200: 2147483648,
    884736: 4194368,
    950272: 4198464,
    1015808: 2147483712,
    1048576: 4194368,
    1114112: 4198400,
    1179648: 2147483712,
    1245184: 0,
    1310720: 4160,
    1376256: 2151678016,
    1441792: 2151682048,
    1507328: 2147487808,
    1572864: 2151682112,
    1638400: 2147483648,
    1703936: 2151677952,
    1769472: 4198464,
    1835008: 2147487744,
    1900544: 4194304,
    1966080: 64,
    2031616: 4096,
    1081344: 2151677952,
    1146880: 2151682112,
    1212416: 0,
    1277952: 4198400,
    1343488: 4194368,
    1409024: 2147483648,
    1474560: 2147487808,
    1540096: 64,
    1605632: 2147483712,
    1671168: 4096,
    1736704: 2147487744,
    1802240: 2151678016,
    1867776: 4160,
    1933312: 2151682048,
    1998848: 4194304,
    2064384: 4198464
  }, {
    "0": 128,
    4096: 17039360,
    8192: 262144,
    12288: 536870912,
    16384: 537133184,
    20480: 16777344,
    24576: 553648256,
    28672: 262272,
    32768: 16777216,
    36864: 537133056,
    40960: 536871040,
    45056: 553910400,
    49152: 553910272,
    53248: 0,
    57344: 17039488,
    61440: 553648128,
    2048: 17039488,
    6144: 553648256,
    10240: 128,
    14336: 17039360,
    18432: 262144,
    22528: 537133184,
    26624: 553910272,
    30720: 536870912,
    34816: 537133056,
    38912: 0,
    43008: 553910400,
    47104: 16777344,
    51200: 536871040,
    55296: 553648128,
    59392: 16777216,
    63488: 262272,
    65536: 262144,
    69632: 128,
    73728: 536870912,
    77824: 553648256,
    81920: 16777344,
    86016: 553910272,
    90112: 537133184,
    94208: 16777216,
    98304: 553910400,
    102400: 553648128,
    106496: 17039360,
    110592: 537133056,
    114688: 262272,
    118784: 536871040,
    122880: 0,
    126976: 17039488,
    67584: 553648256,
    71680: 16777216,
    75776: 17039360,
    79872: 537133184,
    83968: 536870912,
    88064: 17039488,
    92160: 128,
    96256: 553910272,
    100352: 262272,
    104448: 553910400,
    108544: 0,
    112640: 553648128,
    116736: 16777344,
    120832: 262144,
    124928: 537133056,
    129024: 536871040
  }, {
    "0": 268435464,
    256: 8192,
    512: 270532608,
    768: 270540808,
    1024: 268443648,
    1280: 2097152,
    1536: 2097160,
    1792: 268435456,
    2048: 0,
    2304: 268443656,
    2560: 2105344,
    2816: 8,
    3072: 270532616,
    3328: 2105352,
    3584: 8200,
    3840: 270540800,
    128: 270532608,
    384: 270540808,
    640: 8,
    896: 2097152,
    1152: 2105352,
    1408: 268435464,
    1664: 268443648,
    1920: 8200,
    2176: 2097160,
    2432: 8192,
    2688: 268443656,
    2944: 270532616,
    3200: 0,
    3456: 270540800,
    3712: 2105344,
    3968: 268435456,
    4096: 268443648,
    4352: 270532616,
    4608: 270540808,
    4864: 8200,
    5120: 2097152,
    5376: 268435456,
    5632: 268435464,
    5888: 2105344,
    6144: 2105352,
    6400: 0,
    6656: 8,
    6912: 270532608,
    7168: 8192,
    7424: 268443656,
    7680: 270540800,
    7936: 2097160,
    4224: 8,
    4480: 2105344,
    4736: 2097152,
    4992: 268435464,
    5248: 268443648,
    5504: 8200,
    5760: 270540808,
    6016: 270532608,
    6272: 270540800,
    6528: 270532616,
    6784: 8192,
    7040: 2105352,
    7296: 2097160,
    7552: 0,
    7808: 268435456,
    8064: 268443656
  }, {
    "0": 1048576,
    16: 33555457,
    32: 1024,
    48: 1049601,
    64: 34604033,
    80: 0,
    96: 1,
    112: 34603009,
    128: 33555456,
    144: 1048577,
    160: 33554433,
    176: 34604032,
    192: 34603008,
    208: 1025,
    224: 1049600,
    240: 33554432,
    8: 34603009,
    24: 0,
    40: 33555457,
    56: 34604032,
    72: 1048576,
    88: 33554433,
    104: 33554432,
    120: 1025,
    136: 1049601,
    152: 33555456,
    168: 34603008,
    184: 1048577,
    200: 1024,
    216: 34604033,
    232: 1,
    248: 1049600,
    256: 33554432,
    272: 1048576,
    288: 33555457,
    304: 34603009,
    320: 1048577,
    336: 33555456,
    352: 34604032,
    368: 1049601,
    384: 1025,
    400: 34604033,
    416: 1049600,
    432: 1,
    448: 0,
    464: 34603008,
    480: 33554433,
    496: 1024,
    264: 1049600,
    280: 33555457,
    296: 34603009,
    312: 1,
    328: 33554432,
    344: 1048576,
    360: 1025,
    376: 34604032,
    392: 33554433,
    408: 34603008,
    424: 0,
    440: 34604033,
    456: 1049601,
    472: 1024,
    488: 33555456,
    504: 1048577
  }, {
    "0": 134219808,
    1: 131072,
    2: 134217728,
    3: 32,
    4: 131104,
    5: 134350880,
    6: 134350848,
    7: 2048,
    8: 134348800,
    9: 134219776,
    10: 133120,
    11: 134348832,
    12: 2080,
    13: 0,
    14: 134217760,
    15: 133152,
    2147483648: 2048,
    2147483649: 134350880,
    2147483650: 134219808,
    2147483651: 134217728,
    2147483652: 134348800,
    2147483653: 133120,
    2147483654: 133152,
    2147483655: 32,
    2147483656: 134217760,
    2147483657: 2080,
    2147483658: 131104,
    2147483659: 134350848,
    2147483660: 0,
    2147483661: 134348832,
    2147483662: 134219776,
    2147483663: 131072,
    16: 133152,
    17: 134350848,
    18: 32,
    19: 2048,
    20: 134219776,
    21: 134217760,
    22: 134348832,
    23: 131072,
    24: 0,
    25: 131104,
    26: 134348800,
    27: 134219808,
    28: 134350880,
    29: 133120,
    30: 2080,
    31: 134217728,
    2147483664: 131072,
    2147483665: 2048,
    2147483666: 134348832,
    2147483667: 133152,
    2147483668: 32,
    2147483669: 134348800,
    2147483670: 134217728,
    2147483671: 134219808,
    2147483672: 134350880,
    2147483673: 134217760,
    2147483674: 134219776,
    2147483675: 0,
    2147483676: 133120,
    2147483677: 2080,
    2147483678: 131104,
    2147483679: 134350848
  }], t2 = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], m2 = g2.DES = e2.extend({ _doReset: function() {
    for (var b2 = this._key.words, c2 = [], a2 = 0; 56 > a2; a2++) {
      var f2 = q2[a2] - 1;
      c2[a2] = b2[f2 >>> 5] >>> 31 - f2 % 32 & 1;
    }
    b2 = this._subKeys = [];
    for (f2 = 0; 16 > f2; f2++) {
      for (var d2 = b2[f2] = [], e3 = r2[f2], a2 = 0; 24 > a2; a2++)
        d2[a2 / 6 | 0] |= c2[(p2[a2] - 1 + e3) % 28] << 31 - a2 % 6, d2[4 + (a2 / 6 | 0)] |= c2[28 + (p2[a2 + 24] - 1 + e3) % 28] << 31 - a2 % 6;
      d2[0] = d2[0] << 1 | d2[0] >>> 31;
      for (a2 = 1; 7 > a2; a2++)
        d2[a2] >>>= 4 * (a2 - 1) + 3;
      d2[7] = d2[7] << 5 | d2[7] >>> 27;
    }
    c2 = this._invSubKeys = [];
    for (a2 = 0; 16 > a2; a2++)
      c2[a2] = b2[15 - a2];
  }, encryptBlock: function(b2, c2) {
    this._doCryptBlock(b2, c2, this._subKeys);
  }, decryptBlock: function(b2, c2) {
    this._doCryptBlock(b2, c2, this._invSubKeys);
  }, _doCryptBlock: function(b2, c2, a2) {
    this._lBlock = b2[c2];
    this._rBlock = b2[c2 + 1];
    j2.call(this, 4, 252645135);
    j2.call(this, 16, 65535);
    l2.call(this, 2, 858993459);
    l2.call(this, 8, 16711935);
    j2.call(this, 1, 1431655765);
    for (var f2 = 0; 16 > f2; f2++) {
      for (var d2 = a2[f2], e3 = this._lBlock, h3 = this._rBlock, g3 = 0, k = 0; 8 > k; k++)
        g3 |= s2[k][((h3 ^ d2[k]) & t2[k]) >>> 0];
      this._lBlock = h3;
      this._rBlock = e3 ^ g3;
    }
    a2 = this._lBlock;
    this._lBlock = this._rBlock;
    this._rBlock = a2;
    j2.call(this, 1, 1431655765);
    l2.call(this, 8, 16711935);
    l2.call(this, 2, 858993459);
    j2.call(this, 16, 65535);
    j2.call(this, 4, 252645135);
    b2[c2] = this._lBlock;
    b2[c2 + 1] = this._rBlock;
  }, keySize: 2, ivSize: 2, blockSize: 2 });
  h2.DES = e2._createHelper(m2);
  g2 = g2.TripleDES = e2.extend({ _doReset: function() {
    var b2 = this._key.words;
    this._des1 = m2.createEncryptor(n2.create(b2.slice(0, 2)));
    this._des2 = m2.createEncryptor(n2.create(b2.slice(2, 4)));
    this._des3 = m2.createEncryptor(n2.create(b2.slice(4, 6)));
  }, encryptBlock: function(b2, c2) {
    this._des1.encryptBlock(b2, c2);
    this._des2.decryptBlock(b2, c2);
    this._des3.encryptBlock(b2, c2);
  }, decryptBlock: function(b2, c2) {
    this._des3.decryptBlock(b2, c2);
    this._des2.encryptBlock(b2, c2);
    this._des1.decryptBlock(b2, c2);
  }, keySize: 6, ivSize: 2, blockSize: 2 });
  h2.TripleDES = e2._createHelper(g2);
})();
(function() {
  var h2 = CryptoJS, j2 = h2.lib.WordArray;
  h2.enc.Base64 = { stringify: function(b2) {
    var e2 = b2.words, f2 = b2.sigBytes, c2 = this._map;
    b2.clamp();
    b2 = [];
    for (var a2 = 0; a2 < f2; a2 += 3)
      for (var d2 = (e2[a2 >>> 2] >>> 24 - 8 * (a2 % 4) & 255) << 16 | (e2[a2 + 1 >>> 2] >>> 24 - 8 * ((a2 + 1) % 4) & 255) << 8 | e2[a2 + 2 >>> 2] >>> 24 - 8 * ((a2 + 2) % 4) & 255, g2 = 0; 4 > g2 && a2 + 0.75 * g2 < f2; g2++)
        b2.push(c2.charAt(d2 >>> 6 * (3 - g2) & 63));
    if (e2 = c2.charAt(64))
      for (; b2.length % 4; )
        b2.push(e2);
    return b2.join("");
  }, parse: function(b2) {
    var e2 = b2.length, f2 = this._map, c2 = f2.charAt(64);
    c2 && (c2 = b2.indexOf(c2), -1 != c2 && (e2 = c2));
    for (var c2 = [], a2 = 0, d2 = 0; d2 < e2; d2++)
      if (d2 % 4) {
        var g2 = f2.indexOf(b2.charAt(d2 - 1)) << 2 * (d2 % 4), h3 = f2.indexOf(b2.charAt(d2)) >>> 6 - 2 * (d2 % 4);
        c2[a2 >>> 2] |= (g2 | h3) << 24 - 8 * (a2 % 4);
        a2++;
      }
    return j2.create(c2, a2);
  }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
})();
(function(E2) {
  function h2(a3, f2, g2, j2, p2, h3, k2) {
    a3 = a3 + (f2 & g2 | ~f2 & j2) + p2 + k2;
    return (a3 << h3 | a3 >>> 32 - h3) + f2;
  }
  function k(a3, f2, g2, j2, p2, h3, k2) {
    a3 = a3 + (f2 & j2 | g2 & ~j2) + p2 + k2;
    return (a3 << h3 | a3 >>> 32 - h3) + f2;
  }
  function l2(a3, f2, g2, j2, h3, k2, l3) {
    a3 = a3 + (f2 ^ g2 ^ j2) + h3 + l3;
    return (a3 << k2 | a3 >>> 32 - k2) + f2;
  }
  function n2(a3, f2, g2, j2, h3, k2, l3) {
    a3 = a3 + (g2 ^ (f2 | ~j2)) + h3 + l3;
    return (a3 << k2 | a3 >>> 32 - k2) + f2;
  }
  for (var r2 = CryptoJS, q2 = r2.lib, F2 = q2.WordArray, s2 = q2.Hasher, q2 = r2.algo, a2 = [], t2 = 0; 64 > t2; t2++)
    a2[t2] = 4294967296 * E2.abs(E2.sin(t2 + 1)) | 0;
  q2 = q2.MD5 = s2.extend({
    _doReset: function() {
      this._hash = new F2.init([1732584193, 4023233417, 2562383102, 271733878]);
    },
    _doProcessBlock: function(m2, f2) {
      for (var g2 = 0; 16 > g2; g2++) {
        var j2 = f2 + g2, p2 = m2[j2];
        m2[j2] = (p2 << 8 | p2 >>> 24) & 16711935 | (p2 << 24 | p2 >>> 8) & 4278255360;
      }
      var g2 = this._hash.words, j2 = m2[f2 + 0], p2 = m2[f2 + 1], q3 = m2[f2 + 2], r3 = m2[f2 + 3], s3 = m2[f2 + 4], t3 = m2[f2 + 5], u2 = m2[f2 + 6], v2 = m2[f2 + 7], w2 = m2[f2 + 8], x = m2[f2 + 9], y2 = m2[f2 + 10], z2 = m2[f2 + 11], A2 = m2[f2 + 12], B2 = m2[f2 + 13], C2 = m2[f2 + 14], D2 = m2[f2 + 15], b2 = g2[0], c2 = g2[1], d2 = g2[2], e2 = g2[3], b2 = h2(b2, c2, d2, e2, j2, 7, a2[0]), e2 = h2(e2, b2, c2, d2, p2, 12, a2[1]), d2 = h2(d2, e2, b2, c2, q3, 17, a2[2]), c2 = h2(c2, d2, e2, b2, r3, 22, a2[3]), b2 = h2(b2, c2, d2, e2, s3, 7, a2[4]), e2 = h2(e2, b2, c2, d2, t3, 12, a2[5]), d2 = h2(d2, e2, b2, c2, u2, 17, a2[6]), c2 = h2(c2, d2, e2, b2, v2, 22, a2[7]), b2 = h2(b2, c2, d2, e2, w2, 7, a2[8]), e2 = h2(e2, b2, c2, d2, x, 12, a2[9]), d2 = h2(d2, e2, b2, c2, y2, 17, a2[10]), c2 = h2(c2, d2, e2, b2, z2, 22, a2[11]), b2 = h2(b2, c2, d2, e2, A2, 7, a2[12]), e2 = h2(e2, b2, c2, d2, B2, 12, a2[13]), d2 = h2(d2, e2, b2, c2, C2, 17, a2[14]), c2 = h2(c2, d2, e2, b2, D2, 22, a2[15]), b2 = k(b2, c2, d2, e2, p2, 5, a2[16]), e2 = k(e2, b2, c2, d2, u2, 9, a2[17]), d2 = k(d2, e2, b2, c2, z2, 14, a2[18]), c2 = k(c2, d2, e2, b2, j2, 20, a2[19]), b2 = k(b2, c2, d2, e2, t3, 5, a2[20]), e2 = k(e2, b2, c2, d2, y2, 9, a2[21]), d2 = k(d2, e2, b2, c2, D2, 14, a2[22]), c2 = k(c2, d2, e2, b2, s3, 20, a2[23]), b2 = k(b2, c2, d2, e2, x, 5, a2[24]), e2 = k(e2, b2, c2, d2, C2, 9, a2[25]), d2 = k(d2, e2, b2, c2, r3, 14, a2[26]), c2 = k(c2, d2, e2, b2, w2, 20, a2[27]), b2 = k(b2, c2, d2, e2, B2, 5, a2[28]), e2 = k(
        e2,
        b2,
        c2,
        d2,
        q3,
        9,
        a2[29]
      ), d2 = k(d2, e2, b2, c2, v2, 14, a2[30]), c2 = k(c2, d2, e2, b2, A2, 20, a2[31]), b2 = l2(b2, c2, d2, e2, t3, 4, a2[32]), e2 = l2(e2, b2, c2, d2, w2, 11, a2[33]), d2 = l2(d2, e2, b2, c2, z2, 16, a2[34]), c2 = l2(c2, d2, e2, b2, C2, 23, a2[35]), b2 = l2(b2, c2, d2, e2, p2, 4, a2[36]), e2 = l2(e2, b2, c2, d2, s3, 11, a2[37]), d2 = l2(d2, e2, b2, c2, v2, 16, a2[38]), c2 = l2(c2, d2, e2, b2, y2, 23, a2[39]), b2 = l2(b2, c2, d2, e2, B2, 4, a2[40]), e2 = l2(e2, b2, c2, d2, j2, 11, a2[41]), d2 = l2(d2, e2, b2, c2, r3, 16, a2[42]), c2 = l2(c2, d2, e2, b2, u2, 23, a2[43]), b2 = l2(b2, c2, d2, e2, x, 4, a2[44]), e2 = l2(e2, b2, c2, d2, A2, 11, a2[45]), d2 = l2(d2, e2, b2, c2, D2, 16, a2[46]), c2 = l2(c2, d2, e2, b2, q3, 23, a2[47]), b2 = n2(b2, c2, d2, e2, j2, 6, a2[48]), e2 = n2(e2, b2, c2, d2, v2, 10, a2[49]), d2 = n2(
        d2,
        e2,
        b2,
        c2,
        C2,
        15,
        a2[50]
      ), c2 = n2(c2, d2, e2, b2, t3, 21, a2[51]), b2 = n2(b2, c2, d2, e2, A2, 6, a2[52]), e2 = n2(e2, b2, c2, d2, r3, 10, a2[53]), d2 = n2(d2, e2, b2, c2, y2, 15, a2[54]), c2 = n2(c2, d2, e2, b2, p2, 21, a2[55]), b2 = n2(b2, c2, d2, e2, w2, 6, a2[56]), e2 = n2(e2, b2, c2, d2, D2, 10, a2[57]), d2 = n2(d2, e2, b2, c2, u2, 15, a2[58]), c2 = n2(c2, d2, e2, b2, B2, 21, a2[59]), b2 = n2(b2, c2, d2, e2, s3, 6, a2[60]), e2 = n2(e2, b2, c2, d2, z2, 10, a2[61]), d2 = n2(d2, e2, b2, c2, q3, 15, a2[62]), c2 = n2(c2, d2, e2, b2, x, 21, a2[63]);
      g2[0] = g2[0] + b2 | 0;
      g2[1] = g2[1] + c2 | 0;
      g2[2] = g2[2] + d2 | 0;
      g2[3] = g2[3] + e2 | 0;
    },
    _doFinalize: function() {
      var a3 = this._data, f2 = a3.words, g2 = 8 * this._nDataBytes, j2 = 8 * a3.sigBytes;
      f2[j2 >>> 5] |= 128 << 24 - j2 % 32;
      var h3 = E2.floor(g2 / 4294967296);
      f2[(j2 + 64 >>> 9 << 4) + 15] = (h3 << 8 | h3 >>> 24) & 16711935 | (h3 << 24 | h3 >>> 8) & 4278255360;
      f2[(j2 + 64 >>> 9 << 4) + 14] = (g2 << 8 | g2 >>> 24) & 16711935 | (g2 << 24 | g2 >>> 8) & 4278255360;
      a3.sigBytes = 4 * (f2.length + 1);
      this._process();
      a3 = this._hash;
      f2 = a3.words;
      for (g2 = 0; 4 > g2; g2++)
        j2 = f2[g2], f2[g2] = (j2 << 8 | j2 >>> 24) & 16711935 | (j2 << 24 | j2 >>> 8) & 4278255360;
      return a3;
    },
    clone: function() {
      var a3 = s2.clone.call(this);
      a3._hash = this._hash.clone();
      return a3;
    }
  });
  r2.MD5 = s2._createHelper(q2);
  r2.HmacMD5 = s2._createHmacHelper(q2);
})(Math);
(function() {
  var k = CryptoJS, b2 = k.lib, m2 = b2.WordArray, l2 = b2.Hasher, d2 = [], b2 = k.algo.SHA1 = l2.extend({ _doReset: function() {
    this._hash = new m2.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
  }, _doProcessBlock: function(n2, p2) {
    for (var a2 = this._hash.words, e2 = a2[0], f2 = a2[1], h2 = a2[2], j2 = a2[3], b3 = a2[4], c2 = 0; 80 > c2; c2++) {
      if (16 > c2)
        d2[c2] = n2[p2 + c2] | 0;
      else {
        var g2 = d2[c2 - 3] ^ d2[c2 - 8] ^ d2[c2 - 14] ^ d2[c2 - 16];
        d2[c2] = g2 << 1 | g2 >>> 31;
      }
      g2 = (e2 << 5 | e2 >>> 27) + b3 + d2[c2];
      g2 = 20 > c2 ? g2 + ((f2 & h2 | ~f2 & j2) + 1518500249) : 40 > c2 ? g2 + ((f2 ^ h2 ^ j2) + 1859775393) : 60 > c2 ? g2 + ((f2 & h2 | f2 & j2 | h2 & j2) - 1894007588) : g2 + ((f2 ^ h2 ^ j2) - 899497514);
      b3 = j2;
      j2 = h2;
      h2 = f2 << 30 | f2 >>> 2;
      f2 = e2;
      e2 = g2;
    }
    a2[0] = a2[0] + e2 | 0;
    a2[1] = a2[1] + f2 | 0;
    a2[2] = a2[2] + h2 | 0;
    a2[3] = a2[3] + j2 | 0;
    a2[4] = a2[4] + b3 | 0;
  }, _doFinalize: function() {
    var b3 = this._data, d3 = b3.words, a2 = 8 * this._nDataBytes, e2 = 8 * b3.sigBytes;
    d3[e2 >>> 5] |= 128 << 24 - e2 % 32;
    d3[(e2 + 64 >>> 9 << 4) + 14] = Math.floor(a2 / 4294967296);
    d3[(e2 + 64 >>> 9 << 4) + 15] = a2;
    b3.sigBytes = 4 * d3.length;
    this._process();
    return this._hash;
  }, clone: function() {
    var b3 = l2.clone.call(this);
    b3._hash = this._hash.clone();
    return b3;
  } });
  k.SHA1 = l2._createHelper(b2);
  k.HmacSHA1 = l2._createHmacHelper(b2);
})();
(function(k) {
  for (var g2 = CryptoJS, h2 = g2.lib, v2 = h2.WordArray, j2 = h2.Hasher, h2 = g2.algo, s2 = [], t2 = [], u2 = function(q2) {
    return 4294967296 * (q2 - (q2 | 0)) | 0;
  }, l2 = 2, b2 = 0; 64 > b2; ) {
    var d2;
    a: {
      d2 = l2;
      for (var w2 = k.sqrt(d2), r2 = 2; r2 <= w2; r2++)
        if (!(d2 % r2)) {
          d2 = false;
          break a;
        }
      d2 = true;
    }
    d2 && (8 > b2 && (s2[b2] = u2(k.pow(l2, 0.5))), t2[b2] = u2(k.pow(l2, 1 / 3)), b2++);
    l2++;
  }
  var n2 = [], h2 = h2.SHA256 = j2.extend({ _doReset: function() {
    this._hash = new v2.init(s2.slice(0));
  }, _doProcessBlock: function(q2, h3) {
    for (var a2 = this._hash.words, c2 = a2[0], d3 = a2[1], b3 = a2[2], k2 = a2[3], f2 = a2[4], g3 = a2[5], j3 = a2[6], l3 = a2[7], e2 = 0; 64 > e2; e2++) {
      if (16 > e2)
        n2[e2] = q2[h3 + e2] | 0;
      else {
        var m2 = n2[e2 - 15], p2 = n2[e2 - 2];
        n2[e2] = ((m2 << 25 | m2 >>> 7) ^ (m2 << 14 | m2 >>> 18) ^ m2 >>> 3) + n2[e2 - 7] + ((p2 << 15 | p2 >>> 17) ^ (p2 << 13 | p2 >>> 19) ^ p2 >>> 10) + n2[e2 - 16];
      }
      m2 = l3 + ((f2 << 26 | f2 >>> 6) ^ (f2 << 21 | f2 >>> 11) ^ (f2 << 7 | f2 >>> 25)) + (f2 & g3 ^ ~f2 & j3) + t2[e2] + n2[e2];
      p2 = ((c2 << 30 | c2 >>> 2) ^ (c2 << 19 | c2 >>> 13) ^ (c2 << 10 | c2 >>> 22)) + (c2 & d3 ^ c2 & b3 ^ d3 & b3);
      l3 = j3;
      j3 = g3;
      g3 = f2;
      f2 = k2 + m2 | 0;
      k2 = b3;
      b3 = d3;
      d3 = c2;
      c2 = m2 + p2 | 0;
    }
    a2[0] = a2[0] + c2 | 0;
    a2[1] = a2[1] + d3 | 0;
    a2[2] = a2[2] + b3 | 0;
    a2[3] = a2[3] + k2 | 0;
    a2[4] = a2[4] + f2 | 0;
    a2[5] = a2[5] + g3 | 0;
    a2[6] = a2[6] + j3 | 0;
    a2[7] = a2[7] + l3 | 0;
  }, _doFinalize: function() {
    var d3 = this._data, b3 = d3.words, a2 = 8 * this._nDataBytes, c2 = 8 * d3.sigBytes;
    b3[c2 >>> 5] |= 128 << 24 - c2 % 32;
    b3[(c2 + 64 >>> 9 << 4) + 14] = k.floor(a2 / 4294967296);
    b3[(c2 + 64 >>> 9 << 4) + 15] = a2;
    d3.sigBytes = 4 * b3.length;
    this._process();
    return this._hash;
  }, clone: function() {
    var b3 = j2.clone.call(this);
    b3._hash = this._hash.clone();
    return b3;
  } });
  g2.SHA256 = j2._createHelper(h2);
  g2.HmacSHA256 = j2._createHmacHelper(h2);
})(Math);
(function() {
  var b2 = CryptoJS, d2 = b2.lib.WordArray, a2 = b2.algo, c2 = a2.SHA256, a2 = a2.SHA224 = c2.extend({ _doReset: function() {
    this._hash = new d2.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
  }, _doFinalize: function() {
    var a3 = c2._doFinalize.call(this);
    a3.sigBytes -= 4;
    return a3;
  } });
  b2.SHA224 = c2._createHelper(a2);
  b2.HmacSHA224 = c2._createHmacHelper(a2);
})();
(function() {
  function a2() {
    return d2.create.apply(d2, arguments);
  }
  for (var n2 = CryptoJS, r2 = n2.lib.Hasher, e2 = n2.x64, d2 = e2.Word, T2 = e2.WordArray, e2 = n2.algo, ea = [
    a2(1116352408, 3609767458),
    a2(1899447441, 602891725),
    a2(3049323471, 3964484399),
    a2(3921009573, 2173295548),
    a2(961987163, 4081628472),
    a2(1508970993, 3053834265),
    a2(2453635748, 2937671579),
    a2(2870763221, 3664609560),
    a2(3624381080, 2734883394),
    a2(310598401, 1164996542),
    a2(607225278, 1323610764),
    a2(1426881987, 3590304994),
    a2(1925078388, 4068182383),
    a2(2162078206, 991336113),
    a2(2614888103, 633803317),
    a2(3248222580, 3479774868),
    a2(3835390401, 2666613458),
    a2(4022224774, 944711139),
    a2(264347078, 2341262773),
    a2(604807628, 2007800933),
    a2(770255983, 1495990901),
    a2(1249150122, 1856431235),
    a2(1555081692, 3175218132),
    a2(1996064986, 2198950837),
    a2(2554220882, 3999719339),
    a2(2821834349, 766784016),
    a2(2952996808, 2566594879),
    a2(3210313671, 3203337956),
    a2(3336571891, 1034457026),
    a2(3584528711, 2466948901),
    a2(113926993, 3758326383),
    a2(338241895, 168717936),
    a2(666307205, 1188179964),
    a2(773529912, 1546045734),
    a2(1294757372, 1522805485),
    a2(
      1396182291,
      2643833823
    ),
    a2(1695183700, 2343527390),
    a2(1986661051, 1014477480),
    a2(2177026350, 1206759142),
    a2(2456956037, 344077627),
    a2(2730485921, 1290863460),
    a2(2820302411, 3158454273),
    a2(3259730800, 3505952657),
    a2(3345764771, 106217008),
    a2(3516065817, 3606008344),
    a2(3600352804, 1432725776),
    a2(4094571909, 1467031594),
    a2(275423344, 851169720),
    a2(430227734, 3100823752),
    a2(506948616, 1363258195),
    a2(659060556, 3750685593),
    a2(883997877, 3785050280),
    a2(958139571, 3318307427),
    a2(1322822218, 3812723403),
    a2(1537002063, 2003034995),
    a2(1747873779, 3602036899),
    a2(1955562222, 1575990012),
    a2(2024104815, 1125592928),
    a2(2227730452, 2716904306),
    a2(2361852424, 442776044),
    a2(2428436474, 593698344),
    a2(2756734187, 3733110249),
    a2(3204031479, 2999351573),
    a2(3329325298, 3815920427),
    a2(3391569614, 3928383900),
    a2(3515267271, 566280711),
    a2(3940187606, 3454069534),
    a2(4118630271, 4000239992),
    a2(116418474, 1914138554),
    a2(174292421, 2731055270),
    a2(289380356, 3203993006),
    a2(460393269, 320620315),
    a2(685471733, 587496836),
    a2(852142971, 1086792851),
    a2(1017036298, 365543100),
    a2(1126000580, 2618297676),
    a2(
      1288033470,
      3409855158
    ),
    a2(1501505948, 4234509866),
    a2(1607167915, 987167468),
    a2(1816402316, 1246189591)
  ], v2 = [], w2 = 0; 80 > w2; w2++)
    v2[w2] = a2();
  e2 = e2.SHA512 = r2.extend({ _doReset: function() {
    this._hash = new T2.init([new d2.init(1779033703, 4089235720), new d2.init(3144134277, 2227873595), new d2.init(1013904242, 4271175723), new d2.init(2773480762, 1595750129), new d2.init(1359893119, 2917565137), new d2.init(2600822924, 725511199), new d2.init(528734635, 4215389547), new d2.init(1541459225, 327033209)]);
  }, _doProcessBlock: function(a3, d3) {
    for (var f2 = this._hash.words, F2 = f2[0], e3 = f2[1], n3 = f2[2], r3 = f2[3], G2 = f2[4], H2 = f2[5], I2 = f2[6], f2 = f2[7], w3 = F2.high, J2 = F2.low, X2 = e3.high, K2 = e3.low, Y2 = n3.high, L2 = n3.low, Z2 = r3.high, M2 = r3.low, $2 = G2.high, N2 = G2.low, aa = H2.high, O2 = H2.low, ba = I2.high, P2 = I2.low, ca = f2.high, Q2 = f2.low, k = w3, g2 = J2, z2 = X2, x = K2, A2 = Y2, y2 = L2, U2 = Z2, B2 = M2, l2 = $2, h2 = N2, R2 = aa, C2 = O2, S2 = ba, D2 = P2, V2 = ca, E2 = Q2, m2 = 0; 80 > m2; m2++) {
      var s2 = v2[m2];
      if (16 > m2)
        var j2 = s2.high = a3[d3 + 2 * m2] | 0, b2 = s2.low = a3[d3 + 2 * m2 + 1] | 0;
      else {
        var j2 = v2[m2 - 15], b2 = j2.high, p2 = j2.low, j2 = (b2 >>> 1 | p2 << 31) ^ (b2 >>> 8 | p2 << 24) ^ b2 >>> 7, p2 = (p2 >>> 1 | b2 << 31) ^ (p2 >>> 8 | b2 << 24) ^ (p2 >>> 7 | b2 << 25), u2 = v2[m2 - 2], b2 = u2.high, c2 = u2.low, u2 = (b2 >>> 19 | c2 << 13) ^ (b2 << 3 | c2 >>> 29) ^ b2 >>> 6, c2 = (c2 >>> 19 | b2 << 13) ^ (c2 << 3 | b2 >>> 29) ^ (c2 >>> 6 | b2 << 26), b2 = v2[m2 - 7], W2 = b2.high, t2 = v2[m2 - 16], q2 = t2.high, t2 = t2.low, b2 = p2 + b2.low, j2 = j2 + W2 + (b2 >>> 0 < p2 >>> 0 ? 1 : 0), b2 = b2 + c2, j2 = j2 + u2 + (b2 >>> 0 < c2 >>> 0 ? 1 : 0), b2 = b2 + t2, j2 = j2 + q2 + (b2 >>> 0 < t2 >>> 0 ? 1 : 0);
        s2.high = j2;
        s2.low = b2;
      }
      var W2 = l2 & R2 ^ ~l2 & S2, t2 = h2 & C2 ^ ~h2 & D2, s2 = k & z2 ^ k & A2 ^ z2 & A2, T3 = g2 & x ^ g2 & y2 ^ x & y2, p2 = (k >>> 28 | g2 << 4) ^ (k << 30 | g2 >>> 2) ^ (k << 25 | g2 >>> 7), u2 = (g2 >>> 28 | k << 4) ^ (g2 << 30 | k >>> 2) ^ (g2 << 25 | k >>> 7), c2 = ea[m2], fa = c2.high, da = c2.low, c2 = E2 + ((h2 >>> 14 | l2 << 18) ^ (h2 >>> 18 | l2 << 14) ^ (h2 << 23 | l2 >>> 9)), q2 = V2 + ((l2 >>> 14 | h2 << 18) ^ (l2 >>> 18 | h2 << 14) ^ (l2 << 23 | h2 >>> 9)) + (c2 >>> 0 < E2 >>> 0 ? 1 : 0), c2 = c2 + t2, q2 = q2 + W2 + (c2 >>> 0 < t2 >>> 0 ? 1 : 0), c2 = c2 + da, q2 = q2 + fa + (c2 >>> 0 < da >>> 0 ? 1 : 0), c2 = c2 + b2, q2 = q2 + j2 + (c2 >>> 0 < b2 >>> 0 ? 1 : 0), b2 = u2 + T3, s2 = p2 + s2 + (b2 >>> 0 < u2 >>> 0 ? 1 : 0), V2 = S2, E2 = D2, S2 = R2, D2 = C2, R2 = l2, C2 = h2, h2 = B2 + c2 | 0, l2 = U2 + q2 + (h2 >>> 0 < B2 >>> 0 ? 1 : 0) | 0, U2 = A2, B2 = y2, A2 = z2, y2 = x, z2 = k, x = g2, g2 = c2 + b2 | 0, k = q2 + s2 + (g2 >>> 0 < c2 >>> 0 ? 1 : 0) | 0;
    }
    J2 = F2.low = J2 + g2;
    F2.high = w3 + k + (J2 >>> 0 < g2 >>> 0 ? 1 : 0);
    K2 = e3.low = K2 + x;
    e3.high = X2 + z2 + (K2 >>> 0 < x >>> 0 ? 1 : 0);
    L2 = n3.low = L2 + y2;
    n3.high = Y2 + A2 + (L2 >>> 0 < y2 >>> 0 ? 1 : 0);
    M2 = r3.low = M2 + B2;
    r3.high = Z2 + U2 + (M2 >>> 0 < B2 >>> 0 ? 1 : 0);
    N2 = G2.low = N2 + h2;
    G2.high = $2 + l2 + (N2 >>> 0 < h2 >>> 0 ? 1 : 0);
    O2 = H2.low = O2 + C2;
    H2.high = aa + R2 + (O2 >>> 0 < C2 >>> 0 ? 1 : 0);
    P2 = I2.low = P2 + D2;
    I2.high = ba + S2 + (P2 >>> 0 < D2 >>> 0 ? 1 : 0);
    Q2 = f2.low = Q2 + E2;
    f2.high = ca + V2 + (Q2 >>> 0 < E2 >>> 0 ? 1 : 0);
  }, _doFinalize: function() {
    var a3 = this._data, d3 = a3.words, f2 = 8 * this._nDataBytes, e3 = 8 * a3.sigBytes;
    d3[e3 >>> 5] |= 128 << 24 - e3 % 32;
    d3[(e3 + 128 >>> 10 << 5) + 30] = Math.floor(f2 / 4294967296);
    d3[(e3 + 128 >>> 10 << 5) + 31] = f2;
    a3.sigBytes = 4 * d3.length;
    this._process();
    return this._hash.toX32();
  }, clone: function() {
    var a3 = r2.clone.call(this);
    a3._hash = this._hash.clone();
    return a3;
  }, blockSize: 32 });
  n2.SHA512 = r2._createHelper(e2);
  n2.HmacSHA512 = r2._createHmacHelper(e2);
})();
(function() {
  var c2 = CryptoJS, a2 = c2.x64, b2 = a2.Word, e2 = a2.WordArray, a2 = c2.algo, d2 = a2.SHA512, a2 = a2.SHA384 = d2.extend({ _doReset: function() {
    this._hash = new e2.init([new b2.init(3418070365, 3238371032), new b2.init(1654270250, 914150663), new b2.init(2438529370, 812702999), new b2.init(355462360, 4144912697), new b2.init(1731405415, 4290775857), new b2.init(2394180231, 1750603025), new b2.init(3675008525, 1694076839), new b2.init(1203062813, 3204075428)]);
  }, _doFinalize: function() {
    var a3 = d2._doFinalize.call(this);
    a3.sigBytes -= 16;
    return a3;
  } });
  c2.SHA384 = d2._createHelper(a2);
  c2.HmacSHA384 = d2._createHmacHelper(a2);
})();
(function() {
  var q2 = CryptoJS, d2 = q2.lib, n2 = d2.WordArray, p2 = d2.Hasher, d2 = q2.algo, x = n2.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), y2 = n2.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), z2 = n2.create([
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ]), A2 = n2.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), B2 = n2.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), C2 = n2.create([
    1352829926,
    1548603684,
    1836072691,
    2053994217,
    0
  ]), d2 = d2.RIPEMD160 = p2.extend({ _doReset: function() {
    this._hash = n2.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
  }, _doProcessBlock: function(e2, v2) {
    for (var b2 = 0; 16 > b2; b2++) {
      var c2 = v2 + b2, f2 = e2[c2];
      e2[c2] = (f2 << 8 | f2 >>> 24) & 16711935 | (f2 << 24 | f2 >>> 8) & 4278255360;
    }
    var c2 = this._hash.words, f2 = B2.words, d3 = C2.words, n3 = x.words, q3 = y2.words, p3 = z2.words, w2 = A2.words, t2, g2, h2, j2, r2, u2, k, l2, m2, s2;
    u2 = t2 = c2[0];
    k = g2 = c2[1];
    l2 = h2 = c2[2];
    m2 = j2 = c2[3];
    s2 = r2 = c2[4];
    for (var a2, b2 = 0; 80 > b2; b2 += 1)
      a2 = t2 + e2[v2 + n3[b2]] | 0, a2 = 16 > b2 ? a2 + ((g2 ^ h2 ^ j2) + f2[0]) : 32 > b2 ? a2 + ((g2 & h2 | ~g2 & j2) + f2[1]) : 48 > b2 ? a2 + (((g2 | ~h2) ^ j2) + f2[2]) : 64 > b2 ? a2 + ((g2 & j2 | h2 & ~j2) + f2[3]) : a2 + ((g2 ^ (h2 | ~j2)) + f2[4]), a2 |= 0, a2 = a2 << p3[b2] | a2 >>> 32 - p3[b2], a2 = a2 + r2 | 0, t2 = r2, r2 = j2, j2 = h2 << 10 | h2 >>> 22, h2 = g2, g2 = a2, a2 = u2 + e2[v2 + q3[b2]] | 0, a2 = 16 > b2 ? a2 + ((k ^ (l2 | ~m2)) + d3[0]) : 32 > b2 ? a2 + ((k & m2 | l2 & ~m2) + d3[1]) : 48 > b2 ? a2 + (((k | ~l2) ^ m2) + d3[2]) : 64 > b2 ? a2 + ((k & l2 | ~k & m2) + d3[3]) : a2 + ((k ^ l2 ^ m2) + d3[4]), a2 |= 0, a2 = a2 << w2[b2] | a2 >>> 32 - w2[b2], a2 = a2 + s2 | 0, u2 = s2, s2 = m2, m2 = l2 << 10 | l2 >>> 22, l2 = k, k = a2;
    a2 = c2[1] + h2 + m2 | 0;
    c2[1] = c2[2] + j2 + s2 | 0;
    c2[2] = c2[3] + r2 + u2 | 0;
    c2[3] = c2[4] + t2 + k | 0;
    c2[4] = c2[0] + g2 + l2 | 0;
    c2[0] = a2;
  }, _doFinalize: function() {
    var e2 = this._data, d3 = e2.words, b2 = 8 * this._nDataBytes, c2 = 8 * e2.sigBytes;
    d3[c2 >>> 5] |= 128 << 24 - c2 % 32;
    d3[(c2 + 64 >>> 9 << 4) + 14] = (b2 << 8 | b2 >>> 24) & 16711935 | (b2 << 24 | b2 >>> 8) & 4278255360;
    e2.sigBytes = 4 * (d3.length + 1);
    this._process();
    e2 = this._hash;
    d3 = e2.words;
    for (b2 = 0; 5 > b2; b2++)
      c2 = d3[b2], d3[b2] = (c2 << 8 | c2 >>> 24) & 16711935 | (c2 << 24 | c2 >>> 8) & 4278255360;
    return e2;
  }, clone: function() {
    var d3 = p2.clone.call(this);
    d3._hash = this._hash.clone();
    return d3;
  } });
  q2.RIPEMD160 = p2._createHelper(d2);
  q2.HmacRIPEMD160 = p2._createHmacHelper(d2);
})();
(function() {
  var c2 = CryptoJS, k = c2.enc.Utf8;
  c2.algo.HMAC = c2.lib.Base.extend({ init: function(a2, b2) {
    a2 = this._hasher = new a2.init();
    "string" == typeof b2 && (b2 = k.parse(b2));
    var c3 = a2.blockSize, e2 = 4 * c3;
    b2.sigBytes > e2 && (b2 = a2.finalize(b2));
    b2.clamp();
    for (var f2 = this._oKey = b2.clone(), g2 = this._iKey = b2.clone(), h2 = f2.words, j2 = g2.words, d2 = 0; d2 < c3; d2++)
      h2[d2] ^= 1549556828, j2[d2] ^= 909522486;
    f2.sigBytes = g2.sigBytes = e2;
    this.reset();
  }, reset: function() {
    var a2 = this._hasher;
    a2.reset();
    a2.update(this._iKey);
  }, update: function(a2) {
    this._hasher.update(a2);
    return this;
  }, finalize: function(a2) {
    var b2 = this._hasher;
    a2 = b2.finalize(a2);
    b2.reset();
    return b2.finalize(this._oKey.clone().concat(a2));
  } });
})();
(function() {
  var b2 = CryptoJS, a2 = b2.lib, d2 = a2.Base, m2 = a2.WordArray, a2 = b2.algo, q2 = a2.HMAC, l2 = a2.PBKDF2 = d2.extend({ cfg: d2.extend({ keySize: 4, hasher: a2.SHA1, iterations: 1 }), init: function(a3) {
    this.cfg = this.cfg.extend(a3);
  }, compute: function(a3, b3) {
    for (var c2 = this.cfg, f2 = q2.create(c2.hasher, a3), g2 = m2.create(), d3 = m2.create([1]), l3 = g2.words, r2 = d3.words, n2 = c2.keySize, c2 = c2.iterations; l3.length < n2; ) {
      var h2 = f2.update(b3).finalize(d3);
      f2.reset();
      for (var j2 = h2.words, s2 = j2.length, k = h2, p2 = 1; p2 < c2; p2++) {
        k = f2.finalize(k);
        f2.reset();
        for (var t2 = k.words, e2 = 0; e2 < s2; e2++)
          j2[e2] ^= t2[e2];
      }
      g2.concat(h2);
      r2[0]++;
    }
    g2.sigBytes = 4 * n2;
    return g2;
  } });
  b2.PBKDF2 = function(a3, b3, c2) {
    return l2.create(c2).compute(a3, b3);
  };
})();
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(d2) {
  var b2;
  var e2;
  var a2 = "";
  for (b2 = 0; b2 + 3 <= d2.length; b2 += 3) {
    e2 = parseInt(d2.substring(b2, b2 + 3), 16);
    a2 += b64map.charAt(e2 >> 6) + b64map.charAt(e2 & 63);
  }
  if (b2 + 1 == d2.length) {
    e2 = parseInt(d2.substring(b2, b2 + 1), 16);
    a2 += b64map.charAt(e2 << 2);
  } else {
    if (b2 + 2 == d2.length) {
      e2 = parseInt(d2.substring(b2, b2 + 2), 16);
      a2 += b64map.charAt(e2 >> 2) + b64map.charAt((e2 & 3) << 4);
    }
  }
  {
    while ((a2.length & 3) > 0) {
      a2 += b64pad;
    }
  }
  return a2;
}
function b64tohex(f2) {
  var d2 = "";
  var e2;
  var b2 = 0;
  var c2;
  var a2;
  for (e2 = 0; e2 < f2.length; ++e2) {
    if (f2.charAt(e2) == b64pad) {
      break;
    }
    a2 = b64map.indexOf(f2.charAt(e2));
    if (a2 < 0) {
      continue;
    }
    if (b2 == 0) {
      d2 += int2char(a2 >> 2);
      c2 = a2 & 3;
      b2 = 1;
    } else {
      if (b2 == 1) {
        d2 += int2char(c2 << 2 | a2 >> 4);
        c2 = a2 & 15;
        b2 = 2;
      } else {
        if (b2 == 2) {
          d2 += int2char(c2);
          d2 += int2char(a2 >> 2);
          c2 = a2 & 3;
          b2 = 3;
        } else {
          d2 += int2char(c2 << 2 | a2 >> 4);
          d2 += int2char(a2 & 15);
          b2 = 0;
        }
      }
    }
  }
  if (b2 == 1) {
    d2 += int2char(c2 << 2);
  }
  return d2;
}
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
*/
var dbits;
function BigInteger(e2, d2, f2) {
  if (e2 != null) {
    if ("number" == typeof e2) {
      this.fromNumber(e2, d2, f2);
    } else {
      if (d2 == null && "string" != typeof e2) {
        this.fromString(e2, 256);
      } else {
        this.fromString(e2, d2);
      }
    }
  }
}
function nbi() {
  return new BigInteger(null);
}
function am1(f2, a2, b2, e2, h2, g2) {
  while (--g2 >= 0) {
    var d2 = a2 * this[f2++] + b2[e2] + h2;
    h2 = Math.floor(d2 / 67108864);
    b2[e2++] = d2 & 67108863;
  }
  return h2;
}
function am2(f2, q2, r2, e2, o2, a2) {
  var k = q2 & 32767, p2 = q2 >> 15;
  while (--a2 >= 0) {
    var d2 = this[f2] & 32767;
    var g2 = this[f2++] >> 15;
    var b2 = p2 * d2 + g2 * k;
    d2 = k * d2 + ((b2 & 32767) << 15) + r2[e2] + (o2 & 1073741823);
    o2 = (d2 >>> 30) + (b2 >>> 15) + p2 * g2 + (o2 >>> 30);
    r2[e2++] = d2 & 1073741823;
  }
  return o2;
}
function am3(f2, q2, r2, e2, o2, a2) {
  var k = q2 & 16383, p2 = q2 >> 14;
  while (--a2 >= 0) {
    var d2 = this[f2] & 16383;
    var g2 = this[f2++] >> 14;
    var b2 = p2 * d2 + g2 * k;
    d2 = k * d2 + ((b2 & 16383) << 14) + r2[e2] + o2;
    o2 = (d2 >> 28) + (b2 >> 14) + p2 * g2;
    r2[e2++] = d2 & 268435455;
  }
  return o2;
}
if (navigator.appName == "Microsoft Internet Explorer") {
  BigInteger.prototype.am = am2;
  dbits = 30;
} else {
  if (navigator.appName != "Netscape") {
    BigInteger.prototype.am = am1;
    dbits = 26;
  } else {
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
function int2char(a2) {
  return BI_RM.charAt(a2);
}
function intAt(b2, a2) {
  var d2 = BI_RC[b2.charCodeAt(a2)];
  return d2 == null ? -1 : d2;
}
function bnpCopyTo(b2) {
  for (var a2 = this.t - 1; a2 >= 0; --a2) {
    b2[a2] = this[a2];
  }
  b2.t = this.t;
  b2.s = this.s;
}
function bnpFromInt(a2) {
  this.t = 1;
  this.s = a2 < 0 ? -1 : 0;
  if (a2 > 0) {
    this[0] = a2;
  } else {
    if (a2 < -1) {
      this[0] = a2 + this.DV;
    } else {
      this.t = 0;
    }
  }
}
function nbv(a2) {
  var b2 = nbi();
  b2.fromInt(a2);
  return b2;
}
function bnpFromString(h2, c2) {
  var e2;
  if (c2 == 16) {
    e2 = 4;
  } else {
    if (c2 == 8) {
      e2 = 3;
    } else {
      if (c2 == 256) {
        e2 = 8;
      } else {
        if (c2 == 2) {
          e2 = 1;
        } else {
          if (c2 == 32) {
            e2 = 5;
          } else {
            if (c2 == 4) {
              e2 = 2;
            } else {
              this.fromRadix(h2, c2);
              return;
            }
          }
        }
      }
    }
  }
  this.t = 0;
  this.s = 0;
  var g2 = h2.length, d2 = false, f2 = 0;
  while (--g2 >= 0) {
    var a2 = e2 == 8 ? h2[g2] & 255 : intAt(h2, g2);
    if (a2 < 0) {
      if (h2.charAt(g2) == "-") {
        d2 = true;
      }
      continue;
    }
    d2 = false;
    if (f2 == 0) {
      this[this.t++] = a2;
    } else {
      if (f2 + e2 > this.DB) {
        this[this.t - 1] |= (a2 & (1 << this.DB - f2) - 1) << f2;
        this[this.t++] = a2 >> this.DB - f2;
      } else {
        this[this.t - 1] |= a2 << f2;
      }
    }
    f2 += e2;
    if (f2 >= this.DB) {
      f2 -= this.DB;
    }
  }
  if (e2 == 8 && (h2[0] & 128) != 0) {
    this.s = -1;
    if (f2 > 0) {
      this[this.t - 1] |= (1 << this.DB - f2) - 1 << f2;
    }
  }
  this.clamp();
  if (d2) {
    BigInteger.ZERO.subTo(this, this);
  }
}
function bnpClamp() {
  var a2 = this.s & this.DM;
  while (this.t > 0 && this[this.t - 1] == a2) {
    --this.t;
  }
}
function bnToString(c2) {
  if (this.s < 0) {
    return "-" + this.negate().toString(c2);
  }
  var e2;
  if (c2 == 16) {
    e2 = 4;
  } else {
    if (c2 == 8) {
      e2 = 3;
    } else {
      if (c2 == 2) {
        e2 = 1;
      } else {
        if (c2 == 32) {
          e2 = 5;
        } else {
          if (c2 == 4) {
            e2 = 2;
          } else {
            return this.toRadix(c2);
          }
        }
      }
    }
  }
  var g2 = (1 << e2) - 1, l2, a2 = false, h2 = "", f2 = this.t;
  var j2 = this.DB - f2 * this.DB % e2;
  if (f2-- > 0) {
    if (j2 < this.DB && (l2 = this[f2] >> j2) > 0) {
      a2 = true;
      h2 = int2char(l2);
    }
    while (f2 >= 0) {
      if (j2 < e2) {
        l2 = (this[f2] & (1 << j2) - 1) << e2 - j2;
        l2 |= this[--f2] >> (j2 += this.DB - e2);
      } else {
        l2 = this[f2] >> (j2 -= e2) & g2;
        if (j2 <= 0) {
          j2 += this.DB;
          --f2;
        }
      }
      if (l2 > 0) {
        a2 = true;
      }
      if (a2) {
        h2 += int2char(l2);
      }
    }
  }
  return a2 ? h2 : "0";
}
function bnNegate() {
  var a2 = nbi();
  BigInteger.ZERO.subTo(this, a2);
  return a2;
}
function bnAbs() {
  return this.s < 0 ? this.negate() : this;
}
function bnCompareTo(b2) {
  var d2 = this.s - b2.s;
  if (d2 != 0) {
    return d2;
  }
  var c2 = this.t;
  d2 = c2 - b2.t;
  if (d2 != 0) {
    return this.s < 0 ? -d2 : d2;
  }
  while (--c2 >= 0) {
    if ((d2 = this[c2] - b2[c2]) != 0) {
      return d2;
    }
  }
  return 0;
}
function nbits(a2) {
  var c2 = 1, b2;
  if ((b2 = a2 >>> 16) != 0) {
    a2 = b2;
    c2 += 16;
  }
  if ((b2 = a2 >> 8) != 0) {
    a2 = b2;
    c2 += 8;
  }
  if ((b2 = a2 >> 4) != 0) {
    a2 = b2;
    c2 += 4;
  }
  if ((b2 = a2 >> 2) != 0) {
    a2 = b2;
    c2 += 2;
  }
  if ((b2 = a2 >> 1) != 0) {
    a2 = b2;
    c2 += 1;
  }
  return c2;
}
function bnBitLength() {
  if (this.t <= 0) {
    return 0;
  }
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
}
function bnpDLShiftTo(c2, b2) {
  var a2;
  for (a2 = this.t - 1; a2 >= 0; --a2) {
    b2[a2 + c2] = this[a2];
  }
  for (a2 = c2 - 1; a2 >= 0; --a2) {
    b2[a2] = 0;
  }
  b2.t = this.t + c2;
  b2.s = this.s;
}
function bnpDRShiftTo(c2, b2) {
  for (var a2 = c2; a2 < this.t; ++a2) {
    b2[a2 - c2] = this[a2];
  }
  b2.t = Math.max(this.t - c2, 0);
  b2.s = this.s;
}
function bnpLShiftTo(j2, e2) {
  var b2 = j2 % this.DB;
  var a2 = this.DB - b2;
  var g2 = (1 << a2) - 1;
  var f2 = Math.floor(j2 / this.DB), h2 = this.s << b2 & this.DM, d2;
  for (d2 = this.t - 1; d2 >= 0; --d2) {
    e2[d2 + f2 + 1] = this[d2] >> a2 | h2;
    h2 = (this[d2] & g2) << b2;
  }
  for (d2 = f2 - 1; d2 >= 0; --d2) {
    e2[d2] = 0;
  }
  e2[f2] = h2;
  e2.t = this.t + f2 + 1;
  e2.s = this.s;
  e2.clamp();
}
function bnpRShiftTo(g2, d2) {
  d2.s = this.s;
  var e2 = Math.floor(g2 / this.DB);
  if (e2 >= this.t) {
    d2.t = 0;
    return;
  }
  var b2 = g2 % this.DB;
  var a2 = this.DB - b2;
  var f2 = (1 << b2) - 1;
  d2[0] = this[e2] >> b2;
  for (var c2 = e2 + 1; c2 < this.t; ++c2) {
    d2[c2 - e2 - 1] |= (this[c2] & f2) << a2;
    d2[c2 - e2] = this[c2] >> b2;
  }
  if (b2 > 0) {
    d2[this.t - e2 - 1] |= (this.s & f2) << a2;
  }
  d2.t = this.t - e2;
  d2.clamp();
}
function bnpSubTo(d2, f2) {
  var e2 = 0, g2 = 0, b2 = Math.min(d2.t, this.t);
  while (e2 < b2) {
    g2 += this[e2] - d2[e2];
    f2[e2++] = g2 & this.DM;
    g2 >>= this.DB;
  }
  if (d2.t < this.t) {
    g2 -= d2.s;
    while (e2 < this.t) {
      g2 += this[e2];
      f2[e2++] = g2 & this.DM;
      g2 >>= this.DB;
    }
    g2 += this.s;
  } else {
    g2 += this.s;
    while (e2 < d2.t) {
      g2 -= d2[e2];
      f2[e2++] = g2 & this.DM;
      g2 >>= this.DB;
    }
    g2 -= d2.s;
  }
  f2.s = g2 < 0 ? -1 : 0;
  if (g2 < -1) {
    f2[e2++] = this.DV + g2;
  } else {
    if (g2 > 0) {
      f2[e2++] = g2;
    }
  }
  f2.t = e2;
  f2.clamp();
}
function bnpMultiplyTo(c2, e2) {
  var b2 = this.abs(), f2 = c2.abs();
  var d2 = b2.t;
  e2.t = d2 + f2.t;
  while (--d2 >= 0) {
    e2[d2] = 0;
  }
  for (d2 = 0; d2 < f2.t; ++d2) {
    e2[d2 + b2.t] = b2.am(0, f2[d2], e2, d2, 0, b2.t);
  }
  e2.s = 0;
  e2.clamp();
  if (this.s != c2.s) {
    BigInteger.ZERO.subTo(e2, e2);
  }
}
function bnpSquareTo(d2) {
  var a2 = this.abs();
  var b2 = d2.t = 2 * a2.t;
  while (--b2 >= 0) {
    d2[b2] = 0;
  }
  for (b2 = 0; b2 < a2.t - 1; ++b2) {
    var e2 = a2.am(b2, a2[b2], d2, 2 * b2, 0, 1);
    if ((d2[b2 + a2.t] += a2.am(b2 + 1, 2 * a2[b2], d2, 2 * b2 + 1, e2, a2.t - b2 - 1)) >= a2.DV) {
      d2[b2 + a2.t] -= a2.DV;
      d2[b2 + a2.t + 1] = 1;
    }
  }
  if (d2.t > 0) {
    d2[d2.t - 1] += a2.am(b2, a2[b2], d2, 2 * b2, 0, 1);
  }
  d2.s = 0;
  d2.clamp();
}
function bnpDivRemTo(n2, h2, g2) {
  var w2 = n2.abs();
  if (w2.t <= 0) {
    return;
  }
  var k = this.abs();
  if (k.t < w2.t) {
    if (h2 != null) {
      h2.fromInt(0);
    }
    if (g2 != null) {
      this.copyTo(g2);
    }
    return;
  }
  if (g2 == null) {
    g2 = nbi();
  }
  var d2 = nbi(), a2 = this.s, l2 = n2.s;
  var v2 = this.DB - nbits(w2[w2.t - 1]);
  if (v2 > 0) {
    w2.lShiftTo(v2, d2);
    k.lShiftTo(v2, g2);
  } else {
    w2.copyTo(d2);
    k.copyTo(g2);
  }
  var p2 = d2.t;
  var b2 = d2[p2 - 1];
  if (b2 == 0) {
    return;
  }
  var o2 = b2 * (1 << this.F1) + (p2 > 1 ? d2[p2 - 2] >> this.F2 : 0);
  var A2 = this.FV / o2, z2 = (1 << this.F1) / o2, x = 1 << this.F2;
  var u2 = g2.t, s2 = u2 - p2, f2 = h2 == null ? nbi() : h2;
  d2.dlShiftTo(s2, f2);
  if (g2.compareTo(f2) >= 0) {
    g2[g2.t++] = 1;
    g2.subTo(f2, g2);
  }
  BigInteger.ONE.dlShiftTo(p2, f2);
  f2.subTo(d2, d2);
  while (d2.t < p2) {
    d2[d2.t++] = 0;
  }
  while (--s2 >= 0) {
    var c2 = g2[--u2] == b2 ? this.DM : Math.floor(g2[u2] * A2 + (g2[u2 - 1] + x) * z2);
    if ((g2[u2] += d2.am(0, c2, g2, s2, 0, p2)) < c2) {
      d2.dlShiftTo(s2, f2);
      g2.subTo(f2, g2);
      while (g2[u2] < --c2) {
        g2.subTo(f2, g2);
      }
    }
  }
  if (h2 != null) {
    g2.drShiftTo(p2, h2);
    if (a2 != l2) {
      BigInteger.ZERO.subTo(h2, h2);
    }
  }
  g2.t = p2;
  g2.clamp();
  if (v2 > 0) {
    g2.rShiftTo(v2, g2);
  }
  if (a2 < 0) {
    BigInteger.ZERO.subTo(g2, g2);
  }
}
function bnMod(b2) {
  var c2 = nbi();
  this.abs().divRemTo(b2, null, c2);
  if (this.s < 0 && c2.compareTo(BigInteger.ZERO) > 0) {
    b2.subTo(c2, c2);
  }
  return c2;
}
function Classic(a2) {
  this.m = a2;
}
function cConvert(a2) {
  if (a2.s < 0 || a2.compareTo(this.m) >= 0) {
    return a2.mod(this.m);
  } else {
    return a2;
  }
}
function cRevert(a2) {
  return a2;
}
function cReduce(a2) {
  a2.divRemTo(this.m, null, a2);
}
function cMulTo(a2, c2, b2) {
  a2.multiplyTo(c2, b2);
  this.reduce(b2);
}
function cSqrTo(a2, b2) {
  a2.squareTo(b2);
  this.reduce(b2);
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
  if (this.t < 1) {
    return 0;
  }
  var a2 = this[0];
  if ((a2 & 1) == 0) {
    return 0;
  }
  var b2 = a2 & 3;
  b2 = b2 * (2 - (a2 & 15) * b2) & 15;
  b2 = b2 * (2 - (a2 & 255) * b2) & 255;
  b2 = b2 * (2 - ((a2 & 65535) * b2 & 65535)) & 65535;
  b2 = b2 * (2 - a2 * b2 % this.DV) % this.DV;
  return b2 > 0 ? this.DV - b2 : -b2;
}
function Montgomery(a2) {
  this.m = a2;
  this.mp = a2.invDigit();
  this.mpl = this.mp & 32767;
  this.mph = this.mp >> 15;
  this.um = (1 << a2.DB - 15) - 1;
  this.mt2 = 2 * a2.t;
}
function montConvert(a2) {
  var b2 = nbi();
  a2.abs().dlShiftTo(this.m.t, b2);
  b2.divRemTo(this.m, null, b2);
  if (a2.s < 0 && b2.compareTo(BigInteger.ZERO) > 0) {
    this.m.subTo(b2, b2);
  }
  return b2;
}
function montRevert(a2) {
  var b2 = nbi();
  a2.copyTo(b2);
  this.reduce(b2);
  return b2;
}
function montReduce(a2) {
  while (a2.t <= this.mt2) {
    a2[a2.t++] = 0;
  }
  for (var c2 = 0; c2 < this.m.t; ++c2) {
    var b2 = a2[c2] & 32767;
    var d2 = b2 * this.mpl + ((b2 * this.mph + (a2[c2] >> 15) * this.mpl & this.um) << 15) & a2.DM;
    b2 = c2 + this.m.t;
    a2[b2] += this.m.am(0, d2, a2, c2, 0, this.m.t);
    while (a2[b2] >= a2.DV) {
      a2[b2] -= a2.DV;
      a2[++b2]++;
    }
  }
  a2.clamp();
  a2.drShiftTo(this.m.t, a2);
  if (a2.compareTo(this.m) >= 0) {
    a2.subTo(this.m, a2);
  }
}
function montSqrTo(a2, b2) {
  a2.squareTo(b2);
  this.reduce(b2);
}
function montMulTo(a2, c2, b2) {
  a2.multiplyTo(c2, b2);
  this.reduce(b2);
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
  return (this.t > 0 ? this[0] & 1 : this.s) == 0;
}
function bnpExp(h2, j2) {
  if (h2 > 4294967295 || h2 < 1) {
    return BigInteger.ONE;
  }
  var f2 = nbi(), a2 = nbi(), d2 = j2.convert(this), c2 = nbits(h2) - 1;
  d2.copyTo(f2);
  while (--c2 >= 0) {
    j2.sqrTo(f2, a2);
    if ((h2 & 1 << c2) > 0) {
      j2.mulTo(a2, d2, f2);
    } else {
      var b2 = f2;
      f2 = a2;
      a2 = b2;
    }
  }
  return j2.revert(f2);
}
function bnModPowInt(b2, a2) {
  var c2;
  if (b2 < 256 || a2.isEven()) {
    c2 = new Classic(a2);
  } else {
    c2 = new Montgomery(a2);
  }
  return this.exp(b2, c2);
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function bnClone() {
  var a2 = nbi();
  this.copyTo(a2);
  return a2;
}
function bnIntValue() {
  if (this.s < 0) {
    if (this.t == 1) {
      return this[0] - this.DV;
    } else {
      if (this.t == 0) {
        return -1;
      }
    }
  } else {
    if (this.t == 1) {
      return this[0];
    } else {
      if (this.t == 0) {
        return 0;
      }
    }
  }
  return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
}
function bnByteValue() {
  return this.t == 0 ? this.s : this[0] << 24 >> 24;
}
function bnShortValue() {
  return this.t == 0 ? this.s : this[0] << 16 >> 16;
}
function bnpChunkSize(a2) {
  return Math.floor(Math.LN2 * this.DB / Math.log(a2));
}
function bnSigNum() {
  if (this.s < 0) {
    return -1;
  } else {
    if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
      return 0;
    } else {
      return 1;
    }
  }
}
function bnpToRadix(c2) {
  if (c2 == null) {
    c2 = 10;
  }
  if (this.signum() == 0 || c2 < 2 || c2 > 36) {
    return "0";
  }
  var f2 = this.chunkSize(c2);
  var e2 = Math.pow(c2, f2);
  var i2 = nbv(e2), j2 = nbi(), h2 = nbi(), g2 = "";
  this.divRemTo(i2, j2, h2);
  while (j2.signum() > 0) {
    g2 = (e2 + h2.intValue()).toString(c2).substr(1) + g2;
    j2.divRemTo(i2, j2, h2);
  }
  return h2.intValue().toString(c2) + g2;
}
function bnpFromRadix(m2, h2) {
  this.fromInt(0);
  if (h2 == null) {
    h2 = 10;
  }
  var f2 = this.chunkSize(h2);
  var g2 = Math.pow(h2, f2), e2 = false, a2 = 0, l2 = 0;
  for (var c2 = 0; c2 < m2.length; ++c2) {
    var k = intAt(m2, c2);
    if (k < 0) {
      if (m2.charAt(c2) == "-" && this.signum() == 0) {
        e2 = true;
      }
      continue;
    }
    l2 = h2 * l2 + k;
    if (++a2 >= f2) {
      this.dMultiply(g2);
      this.dAddOffset(l2, 0);
      a2 = 0;
      l2 = 0;
    }
  }
  if (a2 > 0) {
    this.dMultiply(Math.pow(h2, a2));
    this.dAddOffset(l2, 0);
  }
  if (e2) {
    BigInteger.ZERO.subTo(this, this);
  }
}
function bnpFromNumber(f2, e2, h2) {
  if ("number" == typeof e2) {
    if (f2 < 2) {
      this.fromInt(1);
    } else {
      this.fromNumber(f2, h2);
      if (!this.testBit(f2 - 1)) {
        this.bitwiseTo(BigInteger.ONE.shiftLeft(f2 - 1), op_or, this);
      }
      if (this.isEven()) {
        this.dAddOffset(1, 0);
      }
      while (!this.isProbablePrime(e2)) {
        this.dAddOffset(2, 0);
        if (this.bitLength() > f2) {
          this.subTo(BigInteger.ONE.shiftLeft(f2 - 1), this);
        }
      }
    }
  } else {
    var d2 = new Array(), g2 = f2 & 7;
    d2.length = (f2 >> 3) + 1;
    e2.nextBytes(d2);
    if (g2 > 0) {
      d2[0] &= (1 << g2) - 1;
    } else {
      d2[0] = 0;
    }
    this.fromString(d2, 256);
  }
}
function bnToByteArray() {
  var b2 = this.t, c2 = new Array();
  c2[0] = this.s;
  var e2 = this.DB - b2 * this.DB % 8, f2, a2 = 0;
  if (b2-- > 0) {
    if (e2 < this.DB && (f2 = this[b2] >> e2) != (this.s & this.DM) >> e2) {
      c2[a2++] = f2 | this.s << this.DB - e2;
    }
    while (b2 >= 0) {
      if (e2 < 8) {
        f2 = (this[b2] & (1 << e2) - 1) << 8 - e2;
        f2 |= this[--b2] >> (e2 += this.DB - 8);
      } else {
        f2 = this[b2] >> (e2 -= 8) & 255;
        if (e2 <= 0) {
          e2 += this.DB;
          --b2;
        }
      }
      if ((f2 & 128) != 0) {
        f2 |= -256;
      }
      if (a2 == 0 && (this.s & 128) != (f2 & 128)) {
        ++a2;
      }
      if (a2 > 0 || f2 != this.s) {
        c2[a2++] = f2;
      }
    }
  }
  return c2;
}
function bnEquals(b2) {
  return this.compareTo(b2) == 0;
}
function bnMin(b2) {
  return this.compareTo(b2) < 0 ? this : b2;
}
function bnMax(b2) {
  return this.compareTo(b2) > 0 ? this : b2;
}
function bnpBitwiseTo(c2, h2, e2) {
  var d2, g2, b2 = Math.min(c2.t, this.t);
  for (d2 = 0; d2 < b2; ++d2) {
    e2[d2] = h2(this[d2], c2[d2]);
  }
  if (c2.t < this.t) {
    g2 = c2.s & this.DM;
    for (d2 = b2; d2 < this.t; ++d2) {
      e2[d2] = h2(this[d2], g2);
    }
    e2.t = this.t;
  } else {
    g2 = this.s & this.DM;
    for (d2 = b2; d2 < c2.t; ++d2) {
      e2[d2] = h2(g2, c2[d2]);
    }
    e2.t = c2.t;
  }
  e2.s = h2(this.s, c2.s);
  e2.clamp();
}
function op_and(a2, b2) {
  return a2 & b2;
}
function bnAnd(b2) {
  var c2 = nbi();
  this.bitwiseTo(b2, op_and, c2);
  return c2;
}
function op_or(a2, b2) {
  return a2 | b2;
}
function bnOr(b2) {
  var c2 = nbi();
  this.bitwiseTo(b2, op_or, c2);
  return c2;
}
function op_xor(a2, b2) {
  return a2 ^ b2;
}
function bnXor(b2) {
  var c2 = nbi();
  this.bitwiseTo(b2, op_xor, c2);
  return c2;
}
function op_andnot(a2, b2) {
  return a2 & ~b2;
}
function bnAndNot(b2) {
  var c2 = nbi();
  this.bitwiseTo(b2, op_andnot, c2);
  return c2;
}
function bnNot() {
  var b2 = nbi();
  for (var a2 = 0; a2 < this.t; ++a2) {
    b2[a2] = this.DM & ~this[a2];
  }
  b2.t = this.t;
  b2.s = ~this.s;
  return b2;
}
function bnShiftLeft(b2) {
  var a2 = nbi();
  if (b2 < 0) {
    this.rShiftTo(-b2, a2);
  } else {
    this.lShiftTo(b2, a2);
  }
  return a2;
}
function bnShiftRight(b2) {
  var a2 = nbi();
  if (b2 < 0) {
    this.lShiftTo(-b2, a2);
  } else {
    this.rShiftTo(b2, a2);
  }
  return a2;
}
function lbit(a2) {
  if (a2 == 0) {
    return -1;
  }
  var b2 = 0;
  if ((a2 & 65535) == 0) {
    a2 >>= 16;
    b2 += 16;
  }
  if ((a2 & 255) == 0) {
    a2 >>= 8;
    b2 += 8;
  }
  if ((a2 & 15) == 0) {
    a2 >>= 4;
    b2 += 4;
  }
  if ((a2 & 3) == 0) {
    a2 >>= 2;
    b2 += 2;
  }
  if ((a2 & 1) == 0) {
    ++b2;
  }
  return b2;
}
function bnGetLowestSetBit() {
  for (var a2 = 0; a2 < this.t; ++a2) {
    if (this[a2] != 0) {
      return a2 * this.DB + lbit(this[a2]);
    }
  }
  if (this.s < 0) {
    return this.t * this.DB;
  }
  return -1;
}
function cbit(a2) {
  var b2 = 0;
  while (a2 != 0) {
    a2 &= a2 - 1;
    ++b2;
  }
  return b2;
}
function bnBitCount() {
  var c2 = 0, a2 = this.s & this.DM;
  for (var b2 = 0; b2 < this.t; ++b2) {
    c2 += cbit(this[b2] ^ a2);
  }
  return c2;
}
function bnTestBit(b2) {
  var a2 = Math.floor(b2 / this.DB);
  if (a2 >= this.t) {
    return this.s != 0;
  }
  return (this[a2] & 1 << b2 % this.DB) != 0;
}
function bnpChangeBit(c2, b2) {
  var a2 = BigInteger.ONE.shiftLeft(c2);
  this.bitwiseTo(a2, b2, a2);
  return a2;
}
function bnSetBit(a2) {
  return this.changeBit(a2, op_or);
}
function bnClearBit(a2) {
  return this.changeBit(a2, op_andnot);
}
function bnFlipBit(a2) {
  return this.changeBit(a2, op_xor);
}
function bnpAddTo(d2, f2) {
  var e2 = 0, g2 = 0, b2 = Math.min(d2.t, this.t);
  while (e2 < b2) {
    g2 += this[e2] + d2[e2];
    f2[e2++] = g2 & this.DM;
    g2 >>= this.DB;
  }
  if (d2.t < this.t) {
    g2 += d2.s;
    while (e2 < this.t) {
      g2 += this[e2];
      f2[e2++] = g2 & this.DM;
      g2 >>= this.DB;
    }
    g2 += this.s;
  } else {
    g2 += this.s;
    while (e2 < d2.t) {
      g2 += d2[e2];
      f2[e2++] = g2 & this.DM;
      g2 >>= this.DB;
    }
    g2 += d2.s;
  }
  f2.s = g2 < 0 ? -1 : 0;
  if (g2 > 0) {
    f2[e2++] = g2;
  } else {
    if (g2 < -1) {
      f2[e2++] = this.DV + g2;
    }
  }
  f2.t = e2;
  f2.clamp();
}
function bnAdd(b2) {
  var c2 = nbi();
  this.addTo(b2, c2);
  return c2;
}
function bnSubtract(b2) {
  var c2 = nbi();
  this.subTo(b2, c2);
  return c2;
}
function bnMultiply(b2) {
  var c2 = nbi();
  this.multiplyTo(b2, c2);
  return c2;
}
function bnSquare() {
  var a2 = nbi();
  this.squareTo(a2);
  return a2;
}
function bnDivide(b2) {
  var c2 = nbi();
  this.divRemTo(b2, c2, null);
  return c2;
}
function bnRemainder(b2) {
  var c2 = nbi();
  this.divRemTo(b2, null, c2);
  return c2;
}
function bnDivideAndRemainder(b2) {
  var d2 = nbi(), c2 = nbi();
  this.divRemTo(b2, d2, c2);
  return new Array(d2, c2);
}
function bnpDMultiply(a2) {
  this[this.t] = this.am(0, a2 - 1, this, 0, 0, this.t);
  ++this.t;
  this.clamp();
}
function bnpDAddOffset(b2, a2) {
  if (b2 == 0) {
    return;
  }
  while (this.t <= a2) {
    this[this.t++] = 0;
  }
  this[a2] += b2;
  while (this[a2] >= this.DV) {
    this[a2] -= this.DV;
    if (++a2 >= this.t) {
      this[this.t++] = 0;
    }
    ++this[a2];
  }
}
function NullExp() {
}
function nNop(a2) {
  return a2;
}
function nMulTo(a2, c2, b2) {
  a2.multiplyTo(c2, b2);
}
function nSqrTo(a2, b2) {
  a2.squareTo(b2);
}
NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;
function bnPow(a2) {
  return this.exp(a2, new NullExp());
}
function bnpMultiplyLowerTo(b2, f2, e2) {
  var d2 = Math.min(this.t + b2.t, f2);
  e2.s = 0;
  e2.t = d2;
  while (d2 > 0) {
    e2[--d2] = 0;
  }
  var c2;
  for (c2 = e2.t - this.t; d2 < c2; ++d2) {
    e2[d2 + this.t] = this.am(0, b2[d2], e2, d2, 0, this.t);
  }
  for (c2 = Math.min(b2.t, f2); d2 < c2; ++d2) {
    this.am(0, b2[d2], e2, d2, 0, f2 - d2);
  }
  e2.clamp();
}
function bnpMultiplyUpperTo(b2, e2, d2) {
  --e2;
  var c2 = d2.t = this.t + b2.t - e2;
  d2.s = 0;
  while (--c2 >= 0) {
    d2[c2] = 0;
  }
  for (c2 = Math.max(e2 - this.t, 0); c2 < b2.t; ++c2) {
    d2[this.t + c2 - e2] = this.am(e2 - c2, b2[c2], d2, 0, 0, this.t + c2 - e2);
  }
  d2.clamp();
  d2.drShiftTo(1, d2);
}
function Barrett(a2) {
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2 * a2.t, this.r2);
  this.mu = this.r2.divide(a2);
  this.m = a2;
}
function barrettConvert(a2) {
  if (a2.s < 0 || a2.t > 2 * this.m.t) {
    return a2.mod(this.m);
  } else {
    if (a2.compareTo(this.m) < 0) {
      return a2;
    } else {
      var b2 = nbi();
      a2.copyTo(b2);
      this.reduce(b2);
      return b2;
    }
  }
}
function barrettRevert(a2) {
  return a2;
}
function barrettReduce(a2) {
  a2.drShiftTo(this.m.t - 1, this.r2);
  if (a2.t > this.m.t + 1) {
    a2.t = this.m.t + 1;
    a2.clamp();
  }
  this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
  this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
  while (a2.compareTo(this.r2) < 0) {
    a2.dAddOffset(1, this.m.t + 1);
  }
  a2.subTo(this.r2, a2);
  while (a2.compareTo(this.m) >= 0) {
    a2.subTo(this.m, a2);
  }
}
function barrettSqrTo(a2, b2) {
  a2.squareTo(b2);
  this.reduce(b2);
}
function barrettMulTo(a2, c2, b2) {
  a2.multiplyTo(c2, b2);
  this.reduce(b2);
}
Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;
function bnModPow(q2, f2) {
  var o2 = q2.bitLength(), h2, b2 = nbv(1), v2;
  if (o2 <= 0) {
    return b2;
  } else {
    if (o2 < 18) {
      h2 = 1;
    } else {
      if (o2 < 48) {
        h2 = 3;
      } else {
        if (o2 < 144) {
          h2 = 4;
        } else {
          if (o2 < 768) {
            h2 = 5;
          } else {
            h2 = 6;
          }
        }
      }
    }
  }
  if (o2 < 8) {
    v2 = new Classic(f2);
  } else {
    if (f2.isEven()) {
      v2 = new Barrett(f2);
    } else {
      v2 = new Montgomery(f2);
    }
  }
  var p2 = new Array(), d2 = 3, s2 = h2 - 1, a2 = (1 << h2) - 1;
  p2[1] = v2.convert(this);
  if (h2 > 1) {
    var A2 = nbi();
    v2.sqrTo(p2[1], A2);
    while (d2 <= a2) {
      p2[d2] = nbi();
      v2.mulTo(A2, p2[d2 - 2], p2[d2]);
      d2 += 2;
    }
  }
  var l2 = q2.t - 1, x, u2 = true, c2 = nbi(), y2;
  o2 = nbits(q2[l2]) - 1;
  while (l2 >= 0) {
    if (o2 >= s2) {
      x = q2[l2] >> o2 - s2 & a2;
    } else {
      x = (q2[l2] & (1 << o2 + 1) - 1) << s2 - o2;
      if (l2 > 0) {
        x |= q2[l2 - 1] >> this.DB + o2 - s2;
      }
    }
    d2 = h2;
    while ((x & 1) == 0) {
      x >>= 1;
      --d2;
    }
    if ((o2 -= d2) < 0) {
      o2 += this.DB;
      --l2;
    }
    if (u2) {
      p2[x].copyTo(b2);
      u2 = false;
    } else {
      while (d2 > 1) {
        v2.sqrTo(b2, c2);
        v2.sqrTo(c2, b2);
        d2 -= 2;
      }
      if (d2 > 0) {
        v2.sqrTo(b2, c2);
      } else {
        y2 = b2;
        b2 = c2;
        c2 = y2;
      }
      v2.mulTo(c2, p2[x], b2);
    }
    while (l2 >= 0 && (q2[l2] & 1 << o2) == 0) {
      v2.sqrTo(b2, c2);
      y2 = b2;
      b2 = c2;
      c2 = y2;
      if (--o2 < 0) {
        o2 = this.DB - 1;
        --l2;
      }
    }
  }
  return v2.revert(b2);
}
function bnGCD(c2) {
  var b2 = this.s < 0 ? this.negate() : this.clone();
  var h2 = c2.s < 0 ? c2.negate() : c2.clone();
  if (b2.compareTo(h2) < 0) {
    var e2 = b2;
    b2 = h2;
    h2 = e2;
  }
  var d2 = b2.getLowestSetBit(), f2 = h2.getLowestSetBit();
  if (f2 < 0) {
    return b2;
  }
  if (d2 < f2) {
    f2 = d2;
  }
  if (f2 > 0) {
    b2.rShiftTo(f2, b2);
    h2.rShiftTo(f2, h2);
  }
  while (b2.signum() > 0) {
    if ((d2 = b2.getLowestSetBit()) > 0) {
      b2.rShiftTo(d2, b2);
    }
    if ((d2 = h2.getLowestSetBit()) > 0) {
      h2.rShiftTo(d2, h2);
    }
    if (b2.compareTo(h2) >= 0) {
      b2.subTo(h2, b2);
      b2.rShiftTo(1, b2);
    } else {
      h2.subTo(b2, h2);
      h2.rShiftTo(1, h2);
    }
  }
  if (f2 > 0) {
    h2.lShiftTo(f2, h2);
  }
  return h2;
}
function bnpModInt(e2) {
  if (e2 <= 0) {
    return 0;
  }
  var c2 = this.DV % e2, b2 = this.s < 0 ? e2 - 1 : 0;
  if (this.t > 0) {
    if (c2 == 0) {
      b2 = this[0] % e2;
    } else {
      for (var a2 = this.t - 1; a2 >= 0; --a2) {
        b2 = (c2 * b2 + this[a2]) % e2;
      }
    }
  }
  return b2;
}
function bnModInverse(f2) {
  var j2 = f2.isEven();
  if (this.isEven() && j2 || f2.signum() == 0) {
    return BigInteger.ZERO;
  }
  var i2 = f2.clone(), h2 = this.clone();
  var g2 = nbv(1), e2 = nbv(0), l2 = nbv(0), k = nbv(1);
  while (i2.signum() != 0) {
    while (i2.isEven()) {
      i2.rShiftTo(1, i2);
      if (j2) {
        if (!g2.isEven() || !e2.isEven()) {
          g2.addTo(this, g2);
          e2.subTo(f2, e2);
        }
        g2.rShiftTo(1, g2);
      } else {
        if (!e2.isEven()) {
          e2.subTo(f2, e2);
        }
      }
      e2.rShiftTo(1, e2);
    }
    while (h2.isEven()) {
      h2.rShiftTo(1, h2);
      if (j2) {
        if (!l2.isEven() || !k.isEven()) {
          l2.addTo(this, l2);
          k.subTo(f2, k);
        }
        l2.rShiftTo(1, l2);
      } else {
        if (!k.isEven()) {
          k.subTo(f2, k);
        }
      }
      k.rShiftTo(1, k);
    }
    if (i2.compareTo(h2) >= 0) {
      i2.subTo(h2, i2);
      if (j2) {
        g2.subTo(l2, g2);
      }
      e2.subTo(k, e2);
    } else {
      h2.subTo(i2, h2);
      if (j2) {
        l2.subTo(g2, l2);
      }
      k.subTo(e2, k);
    }
  }
  if (h2.compareTo(BigInteger.ONE) != 0) {
    return BigInteger.ZERO;
  }
  if (k.compareTo(f2) >= 0) {
    return k.subtract(f2);
  }
  if (k.signum() < 0) {
    k.addTo(f2, k);
  } else {
    return k;
  }
  if (k.signum() < 0) {
    return k.add(f2);
  } else {
    return k;
  }
}
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
function bnIsProbablePrime(e2) {
  var d2, b2 = this.abs();
  if (b2.t == 1 && b2[0] <= lowprimes[lowprimes.length - 1]) {
    for (d2 = 0; d2 < lowprimes.length; ++d2) {
      if (b2[0] == lowprimes[d2]) {
        return true;
      }
    }
    return false;
  }
  if (b2.isEven()) {
    return false;
  }
  d2 = 1;
  while (d2 < lowprimes.length) {
    var a2 = lowprimes[d2], c2 = d2 + 1;
    while (c2 < lowprimes.length && a2 < lplim) {
      a2 *= lowprimes[c2++];
    }
    a2 = b2.modInt(a2);
    while (d2 < c2) {
      if (a2 % lowprimes[d2++] == 0) {
        return false;
      }
    }
  }
  return b2.millerRabin(e2);
}
function bnpMillerRabin(f2) {
  var g2 = this.subtract(BigInteger.ONE);
  var c2 = g2.getLowestSetBit();
  if (c2 <= 0) {
    return false;
  }
  var h2 = g2.shiftRight(c2);
  f2 = f2 + 1 >> 1;
  if (f2 > lowprimes.length) {
    f2 = lowprimes.length;
  }
  var b2 = nbi();
  for (var e2 = 0; e2 < f2; ++e2) {
    b2.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
    var l2 = b2.modPow(h2, this);
    if (l2.compareTo(BigInteger.ONE) != 0 && l2.compareTo(g2) != 0) {
      var d2 = 1;
      while (d2++ < c2 && l2.compareTo(g2) != 0) {
        l2 = l2.modPowInt(2, this);
        if (l2.compareTo(BigInteger.ONE) == 0) {
          return false;
        }
      }
      if (l2.compareTo(g2) != 0) {
        return false;
      }
    }
  }
  return true;
}
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.prototype.square = bnSquare;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Arcfour() {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
}
function ARC4init(d2) {
  var c2, a2, b2;
  for (c2 = 0; c2 < 256; ++c2) {
    this.S[c2] = c2;
  }
  a2 = 0;
  for (c2 = 0; c2 < 256; ++c2) {
    a2 = a2 + this.S[c2] + d2[c2 % d2.length] & 255;
    b2 = this.S[c2];
    this.S[c2] = this.S[a2];
    this.S[a2] = b2;
  }
  this.i = 0;
  this.j = 0;
}
function ARC4next() {
  var a2;
  this.i = this.i + 1 & 255;
  this.j = this.j + this.S[this.i] & 255;
  a2 = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = a2;
  return this.S[a2 + this.S[this.i] & 255];
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
function prng_newstate() {
  return new Arcfour();
}
var rng_psize = 256;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var rng_state;
var rng_pool;
var rng_pptr;
function rng_seed_int(a2) {
  rng_pool[rng_pptr++] ^= a2 & 255;
  rng_pool[rng_pptr++] ^= a2 >> 8 & 255;
  rng_pool[rng_pptr++] ^= a2 >> 16 & 255;
  rng_pool[rng_pptr++] ^= a2 >> 24 & 255;
  if (rng_pptr >= rng_psize) {
    rng_pptr -= rng_psize;
  }
}
function rng_seed_time() {
  rng_seed_int((/* @__PURE__ */ new Date()).getTime());
}
if (rng_pool == null) {
  rng_pool = new Array();
  rng_pptr = 0;
  var t$1;
  if (window$1 !== void 0 && (window$1.crypto !== void 0 || window$1.msCrypto !== void 0)) {
    var crypto = window$1.crypto || window$1.msCrypto;
    if (crypto.getRandomValues) {
      var ua = new Uint8Array(32);
      crypto.getRandomValues(ua);
      for (t$1 = 0; t$1 < 32; ++t$1) {
        rng_pool[rng_pptr++] = ua[t$1];
      }
    } else {
      if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
        var z$1 = window$1.crypto.random(32);
        for (t$1 = 0; t$1 < z$1.length; ++t$1) {
          rng_pool[rng_pptr++] = z$1.charCodeAt(t$1) & 255;
        }
      }
    }
  }
  while (rng_pptr < rng_psize) {
    t$1 = Math.floor(65536 * Math.random());
    rng_pool[rng_pptr++] = t$1 >>> 8;
    rng_pool[rng_pptr++] = t$1 & 255;
  }
  rng_pptr = 0;
  rng_seed_time();
}
function rng_get_byte() {
  if (rng_state == null) {
    rng_seed_time();
    rng_state = prng_newstate();
    rng_state.init(rng_pool);
    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
      rng_pool[rng_pptr] = 0;
    }
    rng_pptr = 0;
  }
  return rng_state.next();
}
function rng_get_bytes(b2) {
  var a2;
  for (a2 = 0; a2 < b2.length; ++a2) {
    b2[a2] = rng_get_byte();
  }
}
function SecureRandom() {
}
SecureRandom.prototype.nextBytes = rng_get_bytes;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function parseBigInt(b2, a2) {
  return new BigInteger(b2, a2);
}
function RSAKey() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}
function RSASetPublic(b2, a2) {
  this.isPublic = true;
  this.isPrivate = false;
  if (typeof b2 !== "string") {
    this.n = b2;
    this.e = a2;
  } else {
    if (b2 != null && a2 != null && b2.length > 0 && a2.length > 0) {
      this.n = parseBigInt(b2, 16);
      this.e = parseInt(a2, 16);
    } else {
      throw "Invalid RSA public key";
    }
  }
}
function RSADoPublic(a2) {
  return a2.modPowInt(this.e, this.n);
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.type = "RSA";
function RSASetPrivate(c2, a2, b2) {
  this.isPrivate = true;
  if (typeof c2 !== "string") {
    this.n = c2;
    this.e = a2;
    this.d = b2;
  } else {
    if (c2 != null && a2 != null && c2.length > 0 && a2.length > 0) {
      this.n = parseBigInt(c2, 16);
      this.e = parseInt(a2, 16);
      this.d = parseBigInt(b2, 16);
    } else {
      throw "Invalid RSA private key";
    }
  }
}
function RSASetPrivateEx(g2, d2, e2, c2, b2, a2, h2, f2) {
  this.isPrivate = true;
  this.isPublic = false;
  if (g2 == null) {
    throw "RSASetPrivateEx N == null";
  }
  if (d2 == null) {
    throw "RSASetPrivateEx E == null";
  }
  if (g2.length == 0) {
    throw "RSASetPrivateEx N.length == 0";
  }
  if (d2.length == 0) {
    throw "RSASetPrivateEx E.length == 0";
  }
  if (g2 != null && d2 != null && g2.length > 0 && d2.length > 0) {
    this.n = parseBigInt(g2, 16);
    this.e = parseInt(d2, 16);
    this.d = parseBigInt(e2, 16);
    this.p = parseBigInt(c2, 16);
    this.q = parseBigInt(b2, 16);
    this.dmp1 = parseBigInt(a2, 16);
    this.dmq1 = parseBigInt(h2, 16);
    this.coeff = parseBigInt(f2, 16);
  } else {
    throw "Invalid RSA private key in RSASetPrivateEx";
  }
}
function RSAGenerate(b2, l2) {
  var a2 = new SecureRandom();
  var g2 = b2 >> 1;
  this.e = parseInt(l2, 16);
  var c2 = new BigInteger(l2, 16);
  var d2 = b2 / 2 - 100;
  var k = BigInteger.ONE.shiftLeft(d2);
  for (; ; ) {
    for (; ; ) {
      this.p = new BigInteger(b2 - g2, 1, a2);
      if (this.p.subtract(BigInteger.ONE).gcd(c2).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
        break;
      }
    }
    for (; ; ) {
      this.q = new BigInteger(g2, 1, a2);
      if (this.q.subtract(BigInteger.ONE).gcd(c2).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
        break;
      }
    }
    if (this.p.compareTo(this.q) <= 0) {
      var j2 = this.p;
      this.p = this.q;
      this.q = j2;
    }
    var h2 = this.q.subtract(this.p).abs();
    if (h2.bitLength() < d2 || h2.compareTo(k) <= 0) {
      continue;
    }
    var i2 = this.p.subtract(BigInteger.ONE);
    var e2 = this.q.subtract(BigInteger.ONE);
    var f2 = i2.multiply(e2);
    if (f2.gcd(c2).compareTo(BigInteger.ONE) == 0) {
      this.n = this.p.multiply(this.q);
      if (this.n.bitLength() == b2) {
        this.d = c2.modInverse(f2);
        this.dmp1 = this.d.mod(i2);
        this.dmq1 = this.d.mod(e2);
        this.coeff = this.q.modInverse(this.p);
        break;
      }
    }
  }
  this.isPrivate = true;
}
function RSADoPrivate(a2) {
  if (this.p == null || this.q == null) {
    return a2.modPow(this.d, this.n);
  }
  var c2 = a2.mod(this.p).modPow(this.dmp1, this.p);
  var b2 = a2.mod(this.q).modPow(this.dmq1, this.q);
  while (c2.compareTo(b2) < 0) {
    c2 = c2.add(this.p);
  }
  return c2.subtract(b2).multiply(this.coeff).mod(this.p).multiply(this.q).add(b2);
}
RSAKey.prototype.doPrivate = RSADoPrivate;
RSAKey.prototype.setPrivate = RSASetPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function ECFieldElementFp(b2, a2) {
  this.x = a2;
  this.q = b2;
}
function feFpEquals(a2) {
  if (a2 == this) {
    return true;
  }
  return this.q.equals(a2.q) && this.x.equals(a2.x);
}
function feFpToBigInteger() {
  return this.x;
}
function feFpNegate() {
  return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
}
function feFpAdd(a2) {
  return new ECFieldElementFp(this.q, this.x.add(a2.toBigInteger()).mod(this.q));
}
function feFpSubtract(a2) {
  return new ECFieldElementFp(this.q, this.x.subtract(a2.toBigInteger()).mod(this.q));
}
function feFpMultiply(a2) {
  return new ECFieldElementFp(this.q, this.x.multiply(a2.toBigInteger()).mod(this.q));
}
function feFpSquare() {
  return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
}
function feFpDivide(a2) {
  return new ECFieldElementFp(this.q, this.x.multiply(a2.toBigInteger().modInverse(this.q)).mod(this.q));
}
ECFieldElementFp.prototype.equals = feFpEquals;
ECFieldElementFp.prototype.toBigInteger = feFpToBigInteger;
ECFieldElementFp.prototype.negate = feFpNegate;
ECFieldElementFp.prototype.add = feFpAdd;
ECFieldElementFp.prototype.subtract = feFpSubtract;
ECFieldElementFp.prototype.multiply = feFpMultiply;
ECFieldElementFp.prototype.square = feFpSquare;
ECFieldElementFp.prototype.divide = feFpDivide;
ECFieldElementFp.prototype.sqrt = function() {
  return new ECFieldElementFp(this.q, this.x.sqrt().mod(this.q));
};
function ECPointFp(c2, a2, d2, b2) {
  this.curve = c2;
  this.x = a2;
  this.y = d2;
  if (b2 == null) {
    this.z = BigInteger.ONE;
  } else {
    this.z = b2;
  }
  this.zinv = null;
}
function pointFpGetX() {
  if (this.zinv == null) {
    this.zinv = this.z.modInverse(this.curve.q);
  }
  return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
}
function pointFpGetY() {
  if (this.zinv == null) {
    this.zinv = this.z.modInverse(this.curve.q);
  }
  return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
}
function pointFpEquals(a2) {
  if (a2 == this) {
    return true;
  }
  if (this.isInfinity()) {
    return a2.isInfinity();
  }
  if (a2.isInfinity()) {
    return this.isInfinity();
  }
  var c2, b2;
  c2 = a2.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a2.z)).mod(this.curve.q);
  if (!c2.equals(BigInteger.ZERO)) {
    return false;
  }
  b2 = a2.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a2.z)).mod(this.curve.q);
  return b2.equals(BigInteger.ZERO);
}
function pointFpIsInfinity() {
  if (this.x == null && this.y == null) {
    return true;
  }
  return this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO);
}
function pointFpNegate() {
  return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
}
function pointFpAdd(l2) {
  if (this.isInfinity()) {
    return l2;
  }
  if (l2.isInfinity()) {
    return this;
  }
  var p2 = l2.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(l2.z)).mod(this.curve.q);
  var o2 = l2.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(l2.z)).mod(this.curve.q);
  if (BigInteger.ZERO.equals(o2)) {
    if (BigInteger.ZERO.equals(p2)) {
      return this.twice();
    }
    return this.curve.getInfinity();
  }
  var j2 = new BigInteger("3");
  var e2 = this.x.toBigInteger();
  var n2 = this.y.toBigInteger();
  l2.x.toBigInteger();
  l2.y.toBigInteger();
  var m2 = o2.square();
  var i2 = m2.multiply(o2);
  var d2 = e2.multiply(m2);
  var g2 = p2.square().multiply(this.z);
  var a2 = g2.subtract(d2.shiftLeft(1)).multiply(l2.z).subtract(i2).multiply(o2).mod(this.curve.q);
  var h2 = d2.multiply(j2).multiply(p2).subtract(n2.multiply(i2)).subtract(g2.multiply(p2)).multiply(l2.z).add(p2.multiply(i2)).mod(this.curve.q);
  var f2 = i2.multiply(this.z).multiply(l2.z).mod(this.curve.q);
  return new ECPointFp(this.curve, this.curve.fromBigInteger(a2), this.curve.fromBigInteger(h2), f2);
}
function pointFpTwice() {
  if (this.isInfinity()) {
    return this;
  }
  if (this.y.toBigInteger().signum() == 0) {
    return this.curve.getInfinity();
  }
  var g2 = new BigInteger("3");
  var c2 = this.x.toBigInteger();
  var h2 = this.y.toBigInteger();
  var e2 = h2.multiply(this.z);
  var j2 = e2.multiply(h2).mod(this.curve.q);
  var i2 = this.curve.a.toBigInteger();
  var k = c2.square().multiply(g2);
  if (!BigInteger.ZERO.equals(i2)) {
    k = k.add(this.z.square().multiply(i2));
  }
  k = k.mod(this.curve.q);
  var b2 = k.square().subtract(c2.shiftLeft(3).multiply(j2)).shiftLeft(1).multiply(e2).mod(this.curve.q);
  var f2 = k.multiply(g2).multiply(c2).subtract(j2.shiftLeft(1)).shiftLeft(2).multiply(j2).subtract(k.square().multiply(k)).mod(this.curve.q);
  var d2 = e2.square().multiply(e2).shiftLeft(3).mod(this.curve.q);
  return new ECPointFp(this.curve, this.curve.fromBigInteger(b2), this.curve.fromBigInteger(f2), d2);
}
function pointFpMultiply(d2) {
  if (this.isInfinity()) {
    return this;
  }
  if (d2.signum() == 0) {
    return this.curve.getInfinity();
  }
  var m2 = d2;
  var l2 = m2.multiply(new BigInteger("3"));
  var b2 = this.negate();
  var j2 = this;
  var q2 = this.curve.q.subtract(d2);
  var o2 = q2.multiply(new BigInteger("3"));
  var c2 = new ECPointFp(this.curve, this.x, this.y);
  var a2 = c2.negate();
  var g2;
  for (g2 = l2.bitLength() - 2; g2 > 0; --g2) {
    j2 = j2.twice();
    var n2 = l2.testBit(g2);
    var f2 = m2.testBit(g2);
    if (n2 != f2) {
      j2 = j2.add(n2 ? this : b2);
    }
  }
  for (g2 = o2.bitLength() - 2; g2 > 0; --g2) {
    c2 = c2.twice();
    var p2 = o2.testBit(g2);
    var r2 = q2.testBit(g2);
    if (p2 != r2) {
      c2 = c2.add(p2 ? c2 : a2);
    }
  }
  return j2;
}
function pointFpMultiplyTwo(c2, a2, b2) {
  var d2;
  if (c2.bitLength() > b2.bitLength()) {
    d2 = c2.bitLength() - 1;
  } else {
    d2 = b2.bitLength() - 1;
  }
  var f2 = this.curve.getInfinity();
  var e2 = this.add(a2);
  while (d2 >= 0) {
    f2 = f2.twice();
    if (c2.testBit(d2)) {
      if (b2.testBit(d2)) {
        f2 = f2.add(e2);
      } else {
        f2 = f2.add(this);
      }
    } else {
      if (b2.testBit(d2)) {
        f2 = f2.add(a2);
      }
    }
    --d2;
  }
  return f2;
}
ECPointFp.prototype.getX = pointFpGetX;
ECPointFp.prototype.getY = pointFpGetY;
ECPointFp.prototype.equals = pointFpEquals;
ECPointFp.prototype.isInfinity = pointFpIsInfinity;
ECPointFp.prototype.negate = pointFpNegate;
ECPointFp.prototype.add = pointFpAdd;
ECPointFp.prototype.twice = pointFpTwice;
ECPointFp.prototype.multiply = pointFpMultiply;
ECPointFp.prototype.multiplyTwo = pointFpMultiplyTwo;
function ECCurveFp(e2, d2, c2) {
  this.q = e2;
  this.a = this.fromBigInteger(d2);
  this.b = this.fromBigInteger(c2);
  this.infinity = new ECPointFp(this, null, null);
}
function curveFpGetQ() {
  return this.q;
}
function curveFpGetA() {
  return this.a;
}
function curveFpGetB() {
  return this.b;
}
function curveFpEquals(a2) {
  if (a2 == this) {
    return true;
  }
  return this.q.equals(a2.q) && this.a.equals(a2.a) && this.b.equals(a2.b);
}
function curveFpGetInfinity() {
  return this.infinity;
}
function curveFpFromBigInteger(a2) {
  return new ECFieldElementFp(this.q, a2);
}
function curveFpDecodePointHex(m2) {
  switch (parseInt(m2.substr(0, 2), 16)) {
    case 0:
      return this.infinity;
    case 2:
    case 3:
      var c2 = m2.substr(0, 2);
      m2.substr(2);
      var j2 = this.fromBigInteger(new BigInteger(k, 16));
      var i2 = this.getA();
      var h2 = this.getB();
      var e2 = j2.square().add(i2).multiply(j2).add(h2);
      var g2 = e2.sqrt();
      if (c2 == "03") {
        g2 = g2.negate();
      }
      return new ECPointFp(this, j2, g2);
    case 4:
    case 6:
    case 7:
      var d2 = (m2.length - 2) / 2;
      var k = m2.substr(2, d2);
      var f2 = m2.substr(d2 + 2, d2);
      return new ECPointFp(this, this.fromBigInteger(new BigInteger(k, 16)), this.fromBigInteger(new BigInteger(f2, 16)));
    default:
      return null;
  }
}
ECCurveFp.prototype.getQ = curveFpGetQ;
ECCurveFp.prototype.getA = curveFpGetA;
ECCurveFp.prototype.getB = curveFpGetB;
ECCurveFp.prototype.equals = curveFpEquals;
ECCurveFp.prototype.getInfinity = curveFpGetInfinity;
ECCurveFp.prototype.fromBigInteger = curveFpFromBigInteger;
ECCurveFp.prototype.decodePointHex = curveFpDecodePointHex;
/*! (c) Stefan Thomas | https://github.com/bitcoinjs/bitcoinjs-lib
 */
ECFieldElementFp.prototype.getByteLength = function() {
  return Math.floor((this.toBigInteger().bitLength() + 7) / 8);
};
ECPointFp.prototype.getEncoded = function(c2) {
  var d2 = function(h2, f2) {
    var g2 = h2.toByteArrayUnsigned();
    if (f2 < g2.length) {
      g2 = g2.slice(g2.length - f2);
    } else {
      while (f2 > g2.length) {
        g2.unshift(0);
      }
    }
    return g2;
  };
  var a2 = this.getX().toBigInteger();
  var e2 = this.getY().toBigInteger();
  var b2 = d2(a2, 32);
  if (c2) {
    if (e2.isEven()) {
      b2.unshift(2);
    } else {
      b2.unshift(3);
    }
  } else {
    b2.unshift(4);
    b2 = b2.concat(d2(e2, 32));
  }
  return b2;
};
ECPointFp.decodeFrom = function(g2, c2) {
  c2[0];
  var e2 = c2.length - 1;
  var d2 = c2.slice(1, 1 + e2 / 2);
  var b2 = c2.slice(1 + e2 / 2, 1 + e2);
  d2.unshift(0);
  b2.unshift(0);
  var a2 = new BigInteger(d2);
  var h2 = new BigInteger(b2);
  return new ECPointFp(g2, g2.fromBigInteger(a2), g2.fromBigInteger(h2));
};
ECPointFp.decodeFromHex = function(g2, c2) {
  c2.substr(0, 2);
  var e2 = c2.length - 2;
  var d2 = c2.substr(2, e2 / 2);
  var b2 = c2.substr(2 + e2 / 2, e2 / 2);
  var a2 = new BigInteger(d2, 16);
  var h2 = new BigInteger(b2, 16);
  return new ECPointFp(g2, g2.fromBigInteger(a2), g2.fromBigInteger(h2));
};
ECPointFp.prototype.add2D = function(c2) {
  if (this.isInfinity()) {
    return c2;
  }
  if (c2.isInfinity()) {
    return this;
  }
  if (this.x.equals(c2.x)) {
    if (this.y.equals(c2.y)) {
      return this.twice();
    }
    return this.curve.getInfinity();
  }
  var g2 = c2.x.subtract(this.x);
  var e2 = c2.y.subtract(this.y);
  var a2 = e2.divide(g2);
  var d2 = a2.square().subtract(this.x).subtract(c2.x);
  var f2 = a2.multiply(this.x.subtract(d2)).subtract(this.y);
  return new ECPointFp(this.curve, d2, f2);
};
ECPointFp.prototype.twice2D = function() {
  if (this.isInfinity()) {
    return this;
  }
  if (this.y.toBigInteger().signum() == 0) {
    return this.curve.getInfinity();
  }
  var b2 = this.curve.fromBigInteger(BigInteger.valueOf(2));
  var e2 = this.curve.fromBigInteger(BigInteger.valueOf(3));
  var a2 = this.x.square().multiply(e2).add(this.curve.a).divide(this.y.multiply(b2));
  var c2 = a2.square().subtract(this.x.multiply(b2));
  var d2 = a2.multiply(this.x.subtract(c2)).subtract(this.y);
  return new ECPointFp(this.curve, c2, d2);
};
ECPointFp.prototype.multiply2D = function(b2) {
  if (this.isInfinity()) {
    return this;
  }
  if (b2.signum() == 0) {
    return this.curve.getInfinity();
  }
  var g2 = b2;
  var f2 = g2.multiply(new BigInteger("3"));
  var l2 = this.negate();
  var d2 = this;
  var c2;
  for (c2 = f2.bitLength() - 2; c2 > 0; --c2) {
    d2 = d2.twice();
    var a2 = f2.testBit(c2);
    var j2 = g2.testBit(c2);
    if (a2 != j2) {
      d2 = d2.add2D(a2 ? this : l2);
    }
  }
  return d2;
};
ECPointFp.prototype.isOnCurve = function() {
  var d2 = this.getX().toBigInteger();
  var i2 = this.getY().toBigInteger();
  var f2 = this.curve.getA().toBigInteger();
  var c2 = this.curve.getB().toBigInteger();
  var h2 = this.curve.getQ();
  var e2 = i2.multiply(i2).mod(h2);
  var g2 = d2.multiply(d2).multiply(d2).add(f2.multiply(d2)).add(c2).mod(h2);
  return e2.equals(g2);
};
ECPointFp.prototype.toString = function() {
  return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")";
};
ECPointFp.prototype.validate = function() {
  var c2 = this.curve.getQ();
  if (this.isInfinity()) {
    throw new Error("Point is at infinity.");
  }
  var a2 = this.getX().toBigInteger();
  var b2 = this.getY().toBigInteger();
  if (a2.compareTo(BigInteger.ONE) < 0 || a2.compareTo(c2.subtract(BigInteger.ONE)) > 0) {
    throw new Error("x coordinate out of bounds");
  }
  if (b2.compareTo(BigInteger.ONE) < 0 || b2.compareTo(c2.subtract(BigInteger.ONE)) > 0) {
    throw new Error("y coordinate out of bounds");
  }
  if (!this.isOnCurve()) {
    throw new Error("Point is not on the curve.");
  }
  if (this.multiply(c2).isInfinity()) {
    throw new Error("Point is not a scalar multiple of G.");
  }
  return true;
};
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
 */
var jsonParse = function() {
  var e2 = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
  var j2 = '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
  var i2 = '(?:"' + j2 + '*")';
  var d2 = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|" + e2 + "|" + i2 + ")", "g");
  var k = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
  var g2 = { '"': '"', "/": "/", "\\": "\\", b: "\b", f: "\f", n: "\n", r: "\r", t: "	" };
  function h2(l2, m2, n2) {
    return m2 ? g2[m2] : String.fromCharCode(parseInt(n2, 16));
  }
  var c2 = new String("");
  var a2 = "\\";
  var b2 = Object.hasOwnProperty;
  return function(u2, q2) {
    var p2 = u2.match(d2);
    var x;
    var v2 = p2[0];
    var l2 = false;
    if ("{" === v2) {
      x = {};
    } else {
      if ("[" === v2) {
        x = [];
      } else {
        x = [];
        l2 = true;
      }
    }
    var t2;
    var r2 = [x];
    for (var o2 = 1 - l2, m2 = p2.length; o2 < m2; ++o2) {
      v2 = p2[o2];
      var w2;
      switch (v2.charCodeAt(0)) {
        default:
          w2 = r2[0];
          w2[t2 || w2.length] = +v2;
          t2 = void 0;
          break;
        case 34:
          v2 = v2.substring(1, v2.length - 1);
          if (v2.indexOf(a2) !== -1) {
            v2 = v2.replace(k, h2);
          }
          w2 = r2[0];
          if (!t2) {
            if (w2 instanceof Array) {
              t2 = w2.length;
            } else {
              t2 = v2 || c2;
              break;
            }
          }
          w2[t2] = v2;
          t2 = void 0;
          break;
        case 91:
          w2 = r2[0];
          r2.unshift(w2[t2 || w2.length] = []);
          t2 = void 0;
          break;
        case 93:
          r2.shift();
          break;
        case 102:
          w2 = r2[0];
          w2[t2 || w2.length] = false;
          t2 = void 0;
          break;
        case 110:
          w2 = r2[0];
          w2[t2 || w2.length] = null;
          t2 = void 0;
          break;
        case 116:
          w2 = r2[0];
          w2[t2 || w2.length] = true;
          t2 = void 0;
          break;
        case 123:
          w2 = r2[0];
          r2.unshift(w2[t2 || w2.length] = {});
          t2 = void 0;
          break;
        case 125:
          r2.shift();
          break;
      }
    }
    if (l2) {
      if (r2.length !== 1) {
        throw new Error();
      }
      x = x[0];
    } else {
      if (r2.length) {
        throw new Error();
      }
    }
    if (q2) {
      var s2 = function(C2, B2) {
        var D2 = C2[B2];
        if (D2 && typeof D2 === "object") {
          var n2 = null;
          for (var z2 in D2) {
            if (b2.call(D2, z2) && D2 !== C2) {
              var y2 = s2(D2, z2);
              if (y2 !== void 0) {
                D2[z2] = y2;
              } else {
                if (!n2) {
                  n2 = [];
                }
                n2.push(z2);
              }
            }
          }
          if (n2) {
            for (var A2 = n2.length; --A2 >= 0; ) {
              delete D2[n2[A2]];
            }
          }
        }
        return q2.call(C2, B2, D2);
      };
      x = s2({ "": x }, "");
    }
    return x;
  };
}();
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
KJUR.asn1.ASN1Util = new function() {
  this.integerToByteHex = function(a2) {
    var b2 = a2.toString(16);
    if (b2.length % 2 == 1) {
      b2 = "0" + b2;
    }
    return b2;
  };
  this.bigIntToMinTwosComplementsHex = function(a2) {
    return twoscompl(a2);
  };
  this.getPEMStringFromHex = function(a2, b2) {
    return hextopem(a2, b2);
  };
  this.newObject = function(k) {
    var F2 = KJUR, o2 = F2.asn1, v2 = o2.ASN1Object, B2 = o2.DERBoolean, e2 = o2.DERInteger, t2 = o2.DERBitString, h2 = o2.DEROctetString, x = o2.DERNull, y2 = o2.DERObjectIdentifier, m2 = o2.DEREnumerated, g2 = o2.DERUTF8String, f2 = o2.DERNumericString, A2 = o2.DERPrintableString, w2 = o2.DERTeletexString, q2 = o2.DERIA5String, E2 = o2.DERUTCTime, j2 = o2.DERGeneralizedTime, b2 = o2.DERVisibleString, l2 = o2.DERBMPString, n2 = o2.DERSequence, c2 = o2.DERSet, s2 = o2.DERTaggedObject, p2 = o2.ASN1Util.newObject;
    if (k instanceof o2.ASN1Object) {
      return k;
    }
    var u2 = Object.keys(k);
    if (u2.length != 1) {
      throw new Error("key of param shall be only one.");
    }
    var H2 = u2[0];
    if (":asn1:bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:visstr:bmpstr:seq:set:tag:".indexOf(":" + H2 + ":") == -1) {
      throw new Error("undefined key: " + H2);
    }
    if (H2 == "bool") {
      return new B2(k[H2]);
    }
    if (H2 == "int") {
      return new e2(k[H2]);
    }
    if (H2 == "bitstr") {
      return new t2(k[H2]);
    }
    if (H2 == "octstr") {
      return new h2(k[H2]);
    }
    if (H2 == "null") {
      return new x(k[H2]);
    }
    if (H2 == "oid") {
      return new y2(k[H2]);
    }
    if (H2 == "enum") {
      return new m2(k[H2]);
    }
    if (H2 == "utf8str") {
      return new g2(k[H2]);
    }
    if (H2 == "numstr") {
      return new f2(k[H2]);
    }
    if (H2 == "prnstr") {
      return new A2(k[H2]);
    }
    if (H2 == "telstr") {
      return new w2(k[H2]);
    }
    if (H2 == "ia5str") {
      return new q2(k[H2]);
    }
    if (H2 == "utctime") {
      return new E2(k[H2]);
    }
    if (H2 == "gentime") {
      return new j2(k[H2]);
    }
    if (H2 == "visstr") {
      return new b2(k[H2]);
    }
    if (H2 == "bmpstr") {
      return new l2(k[H2]);
    }
    if (H2 == "asn1") {
      return new v2(k[H2]);
    }
    if (H2 == "seq") {
      var d2 = k[H2];
      var G2 = [];
      for (var z2 = 0; z2 < d2.length; z2++) {
        var D2 = p2(d2[z2]);
        G2.push(D2);
      }
      return new n2({ array: G2 });
    }
    if (H2 == "set") {
      var d2 = k[H2];
      var G2 = [];
      for (var z2 = 0; z2 < d2.length; z2++) {
        var D2 = p2(d2[z2]);
        G2.push(D2);
      }
      return new c2({ array: G2 });
    }
    if (H2 == "tag") {
      var C2 = k[H2];
      if (Object.prototype.toString.call(C2) === "[object Array]" && C2.length == 3) {
        var r2 = p2(C2[2]);
        return new s2({ tag: C2[0], explicit: C2[1], obj: r2 });
      } else {
        return new s2(C2);
      }
    }
  };
  this.jsonToASN1HEX = function(b2) {
    var a2 = this.newObject(b2);
    return a2.tohex();
  };
}();
KJUR.asn1.ASN1Util.oidHexToInt = function(a2) {
  var j2 = "";
  var k = parseInt(a2.substr(0, 2), 16);
  var d2 = Math.floor(k / 40);
  var c2 = k % 40;
  var j2 = d2 + "." + c2;
  var e2 = "";
  for (var f2 = 2; f2 < a2.length; f2 += 2) {
    var g2 = parseInt(a2.substr(f2, 2), 16);
    var h2 = ("00000000" + g2.toString(2)).slice(-8);
    e2 = e2 + h2.substr(1, 7);
    if (h2.substr(0, 1) == "0") {
      var b2 = new BigInteger(e2, 2);
      j2 = j2 + "." + b2.toString(10);
      e2 = "";
    }
  }
  return j2;
};
KJUR.asn1.ASN1Util.oidIntToHex = function(f2) {
  var e2 = function(a2) {
    var k = a2.toString(16);
    if (k.length == 1) {
      k = "0" + k;
    }
    return k;
  };
  var d2 = function(o2) {
    var n2 = "";
    var k = new BigInteger(o2, 10);
    var a2 = k.toString(2);
    var l2 = 7 - a2.length % 7;
    if (l2 == 7) {
      l2 = 0;
    }
    var q2 = "";
    for (var m2 = 0; m2 < l2; m2++) {
      q2 += "0";
    }
    a2 = q2 + a2;
    for (var m2 = 0; m2 < a2.length - 1; m2 += 7) {
      var p2 = a2.substr(m2, 7);
      if (m2 != a2.length - 7) {
        p2 = "1" + p2;
      }
      n2 += e2(parseInt(p2, 2));
    }
    return n2;
  };
  if (!f2.match(/^[0-9.]+$/)) {
    throw "malformed oid string: " + f2;
  }
  var g2 = "";
  var b2 = f2.split(".");
  var j2 = parseInt(b2[0]) * 40 + parseInt(b2[1]);
  g2 += e2(j2);
  b2.splice(0, 2);
  for (var c2 = 0; c2 < b2.length; c2++) {
    g2 += d2(b2[c2]);
  }
  return g2;
};
KJUR.asn1.ASN1Object = function(e2) {
  var a2 = "";
  this.params = null;
  this.getLengthHexFromValue = function() {
    if (typeof this.hV == "undefined" || this.hV == null) {
      throw new Error("this.hV is null or undefined");
    }
    if (this.hV.length % 2 == 1) {
      throw new Error("value hex must be even length: n=" + a2.length + ",v=" + this.hV);
    }
    var j2 = this.hV.length / 2;
    var i2 = j2.toString(16);
    if (i2.length % 2 == 1) {
      i2 = "0" + i2;
    }
    if (j2 < 128) {
      return i2;
    } else {
      var h2 = i2.length / 2;
      if (h2 > 15) {
        throw new Error("ASN.1 length too long to represent by 8x: n = " + j2.toString(16));
      }
      var g2 = 128 + h2;
      return g2.toString(16) + i2;
    }
  };
  this.tohex = function() {
    if (this.hTLV == null || this.isModified) {
      this.hV = this.getFreshValueHex();
      this.hL = this.getLengthHexFromValue();
      this.hTLV = this.hT + this.hL + this.hV;
      this.isModified = false;
    }
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.getValueHex = function() {
    this.tohex();
    return this.hV;
  };
  this.getFreshValueHex = function() {
    return "";
  };
  this.setByParam = function(g2) {
    this.params = g2;
  };
  if (e2 != void 0) {
    if (e2.tlv != void 0) {
      this.hTLV = e2.tlv;
      this.isModified = false;
    }
  }
};
KJUR.asn1.DERAbstractString = function(c2) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  this.getString = function() {
    return this.s;
  };
  this.setString = function(d2) {
    this.hTLV = null;
    this.isModified = true;
    this.s = d2;
    this.hV = utf8tohex(this.s).toLowerCase();
  };
  this.setStringHex = function(d2) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = d2;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof c2 != "undefined") {
    if (typeof c2 == "string") {
      this.setString(c2);
    } else {
      if (typeof c2.str != "undefined") {
        this.setString(c2.str);
      } else {
        if (typeof c2.hex != "undefined") {
          this.setStringHex(c2.hex);
        }
      }
    }
  }
};
extendClass(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractTime = function(c2) {
  KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
  this.localDateToUTC = function(g2) {
    var e2 = g2.getTime() + g2.getTimezoneOffset() * 6e4;
    var f2 = new Date(e2);
    return f2;
  };
  this.formatDate = function(m2, o2, e2) {
    var g2 = this.zeroPadding;
    var n2 = this.localDateToUTC(m2);
    var p2 = String(n2.getFullYear());
    if (o2 == "utc") {
      p2 = p2.substr(2, 2);
    }
    var l2 = g2(String(n2.getMonth() + 1), 2);
    var q2 = g2(String(n2.getDate()), 2);
    var h2 = g2(String(n2.getHours()), 2);
    var i2 = g2(String(n2.getMinutes()), 2);
    var j2 = g2(String(n2.getSeconds()), 2);
    var r2 = p2 + l2 + q2 + h2 + i2 + j2;
    if (e2 === true) {
      var f2 = n2.getMilliseconds();
      if (f2 != 0) {
        var k = g2(String(f2), 3);
        k = k.replace(/[0]+$/, "");
        r2 = r2 + "." + k;
      }
    }
    return r2 + "Z";
  };
  this.zeroPadding = function(e2, d2) {
    if (e2.length >= d2) {
      return e2;
    }
    return new Array(d2 - e2.length + 1).join("0") + e2;
  };
  this.setByParam = function(d2) {
    this.hV = null;
    this.hTLV = null;
    this.params = d2;
  };
  this.getString = function() {
    return void 0;
  };
  this.setString = function(d2) {
    this.hTLV = null;
    this.isModified = true;
    if (this.params == void 0) {
      this.params = {};
    }
    this.params.str = d2;
  };
  this.setByDate = function(d2) {
    this.hTLV = null;
    this.isModified = true;
    if (this.params == void 0) {
      this.params = {};
    }
    this.params.date = d2;
  };
  this.setByDateValue = function(h2, j2, e2, d2, f2, g2) {
    var i2 = new Date(Date.UTC(h2, j2 - 1, e2, d2, f2, g2, 0));
    this.setByDate(i2);
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
};
extendClass(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractStructured = function(b2) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  this.setByASN1ObjectArray = function(c2) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array = c2;
  };
  this.appendASN1Object = function(c2) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array.push(c2);
  };
  this.asn1Array = new Array();
  if (typeof b2 != "undefined") {
    if (typeof b2.array != "undefined") {
      this.asn1Array = b2.array;
    }
  }
};
extendClass(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBoolean = function(a2) {
  KJUR.asn1.DERBoolean.superclass.constructor.call(this);
  this.hT = "01";
  if (a2 == false) {
    this.hTLV = "010100";
  } else {
    this.hTLV = "0101ff";
  }
};
extendClass(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
KJUR.asn1.DERInteger = function(b2) {
  KJUR.asn1.DERInteger.superclass.constructor.call(this);
  this.hT = "02";
  this.params = null;
  var a2 = twoscompl;
  this.setByBigInteger = function(c2) {
    this.isModified = true;
    this.params = { bigint: c2 };
  };
  this.setByInteger = function(c2) {
    this.isModified = true;
    this.params = c2;
  };
  this.setValueHex = function(c2) {
    this.isModified = true;
    this.params = { hex: c2 };
  };
  this.getFreshValueHex = function() {
    var d2 = this.params;
    var c2 = null;
    if (d2 == null) {
      throw new Error("value not set");
    }
    if (typeof d2 == "object" && d2.hex != void 0) {
      this.hV = d2.hex;
      return this.hV;
    }
    if (typeof d2 == "number") {
      c2 = new BigInteger(String(d2), 10);
    } else {
      if (d2["int"] != void 0) {
        c2 = new BigInteger(String(d2["int"]), 10);
      } else {
        if (d2.bigint != void 0) {
          c2 = d2.bigint;
        } else {
          throw new Error("wrong parameter");
        }
      }
    }
    this.hV = a2(c2);
    return this.hV;
  };
  if (b2 != void 0) {
    this.params = b2;
  }
};
extendClass(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBitString = function(b2) {
  if (b2 !== void 0 && typeof b2.obj !== "undefined") {
    var a2 = KJUR.asn1.ASN1Util.newObject(b2.obj);
    b2.hex = "00" + a2.tohex();
  }
  KJUR.asn1.DERBitString.superclass.constructor.call(this);
  this.hT = "03";
  this.setHexValueIncludingUnusedBits = function(c2) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = c2;
  };
  this.setUnusedBitsAndHexValue = function(c2, e2) {
    if (c2 < 0 || 7 < c2) {
      throw "unused bits shall be from 0 to 7: u = " + c2;
    }
    var d2 = "0" + c2;
    this.hTLV = null;
    this.isModified = true;
    this.hV = d2 + e2;
  };
  this.setByBinaryString = function(e2) {
    e2 = e2.replace(/0+$/, "");
    var f2 = 8 - e2.length % 8;
    if (f2 == 8) {
      f2 = 0;
    }
    e2 += "0000000".substr(0, f2);
    var j2 = "";
    for (var g2 = 0; g2 < e2.length - 1; g2 += 8) {
      var d2 = e2.substr(g2, 8);
      var c2 = parseInt(d2, 2).toString(16);
      if (c2.length == 1) {
        c2 = "0" + c2;
      }
      j2 += c2;
    }
    this.hTLV = null;
    this.isModified = true;
    this.hV = "0" + f2 + j2;
  };
  this.setByBooleanArray = function(e2) {
    var d2 = "";
    for (var c2 = 0; c2 < e2.length; c2++) {
      if (e2[c2] == true) {
        d2 += "1";
      } else {
        d2 += "0";
      }
    }
    this.setByBinaryString(d2);
  };
  this.newFalseArray = function(e2) {
    var c2 = new Array(e2);
    for (var d2 = 0; d2 < e2; d2++) {
      c2[d2] = false;
    }
    return c2;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof b2 != "undefined") {
    if (typeof b2 == "string" && b2.toLowerCase().match(/^[0-9a-f]+$/)) {
      this.setHexValueIncludingUnusedBits(b2);
    } else {
      if (typeof b2.hex != "undefined") {
        this.setHexValueIncludingUnusedBits(b2.hex);
      } else {
        if (typeof b2.bin != "undefined") {
          this.setByBinaryString(b2.bin);
        } else {
          if (typeof b2.array != "undefined") {
            this.setByBooleanArray(b2.array);
          }
        }
      }
    }
  }
};
extendClass(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
KJUR.asn1.DEROctetString = function(b2) {
  if (b2 !== void 0 && typeof b2.obj !== "undefined") {
    var a2 = KJUR.asn1.ASN1Util.newObject(b2.obj);
    b2.hex = a2.tohex();
  }
  KJUR.asn1.DEROctetString.superclass.constructor.call(this, b2);
  this.hT = "04";
};
extendClass(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNull = function() {
  KJUR.asn1.DERNull.superclass.constructor.call(this);
  this.hT = "05";
  this.hTLV = "0500";
};
extendClass(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
KJUR.asn1.DERObjectIdentifier = function(a2) {
  KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
  this.hT = "06";
  this.setValueHex = function(b2) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = b2;
  };
  this.setValueOidString = function(b2) {
    var c2 = oidtohex(b2);
    if (c2 == null) {
      throw new Error("malformed oid string: " + b2);
    }
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = c2;
  };
  this.setValueName = function(c2) {
    var b2 = KJUR.asn1.x509.OID.name2oid(c2);
    if (b2 !== "") {
      this.setValueOidString(b2);
    } else {
      throw new Error("DERObjectIdentifier oidName undefined: " + c2);
    }
  };
  this.setValueNameOrOid = function(b2) {
    if (b2.match(/^[0-2].[0-9.]+$/)) {
      this.setValueOidString(b2);
    } else {
      this.setValueName(b2);
    }
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  this.setByParam = function(b2) {
    if (typeof b2 === "string") {
      this.setValueNameOrOid(b2);
    } else {
      if (b2.oid !== void 0) {
        this.setValueNameOrOid(b2.oid);
      } else {
        if (b2.name !== void 0) {
          this.setValueNameOrOid(b2.name);
        } else {
          if (b2.hex !== void 0) {
            this.setValueHex(b2.hex);
          }
        }
      }
    }
  };
  if (a2 !== void 0) {
    this.setByParam(a2);
  }
};
extendClass(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.DEREnumerated = function(a2) {
  KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
  this.hT = "0a";
  this.setByBigInteger = function(b2) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = twoscompl(b2);
  };
  this.setByInteger = function(c2) {
    var b2 = new BigInteger(String(c2), 10);
    this.setByBigInteger(b2);
  };
  this.setValueHex = function(b2) {
    this.hV = b2;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof a2 != "undefined") {
    if (typeof a2["int"] != "undefined") {
      this.setByInteger(a2["int"]);
    } else {
      if (typeof a2 == "number") {
        this.setByInteger(a2);
      } else {
        if (typeof a2.hex != "undefined") {
          this.setValueHex(a2.hex);
        }
      }
    }
  }
};
extendClass(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
KJUR.asn1.DERUTF8String = function(a2) {
  KJUR.asn1.DERUTF8String.superclass.constructor.call(this, a2);
  this.hT = "0c";
};
extendClass(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNumericString = function(a2) {
  KJUR.asn1.DERNumericString.superclass.constructor.call(this, a2);
  this.hT = "12";
};
extendClass(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERPrintableString = function(a2) {
  KJUR.asn1.DERPrintableString.superclass.constructor.call(this, a2);
  this.hT = "13";
};
extendClass(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERTeletexString = function(a2) {
  KJUR.asn1.DERTeletexString.superclass.constructor.call(this, a2);
  this.hT = "14";
};
extendClass(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERIA5String = function(a2) {
  KJUR.asn1.DERIA5String.superclass.constructor.call(this, a2);
  this.hT = "16";
};
extendClass(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERVisibleString = function(a2) {
  KJUR.asn1.DERIA5String.superclass.constructor.call(this, a2);
  this.hT = "1a";
};
extendClass(KJUR.asn1.DERVisibleString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERBMPString = function(a2) {
  KJUR.asn1.DERBMPString.superclass.constructor.call(this, a2);
  this.hT = "1e";
};
extendClass(KJUR.asn1.DERBMPString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERUTCTime = function(a2) {
  KJUR.asn1.DERUTCTime.superclass.constructor.call(this, a2);
  this.hT = "17";
  this.params = void 0;
  this.getFreshValueHex = function() {
    var d2 = this.params;
    if (this.params == void 0) {
      d2 = { date: /* @__PURE__ */ new Date() };
    }
    if (typeof d2 == "string") {
      if (d2.match(/^[0-9]{12}Z$/) || d2.match(/^[0-9]{12}\.[0-9]+Z$/)) {
        this.hV = stohex(d2);
      } else {
        throw new Error("malformed string for UTCTime: " + d2);
      }
    } else {
      if (d2.str != void 0) {
        this.hV = stohex(d2.str);
      } else {
        if (d2.date == void 0 && d2.millis == true) {
          var c2 = /* @__PURE__ */ new Date();
          this.hV = stohex(this.formatDate(c2, "utc", true));
        } else {
          if (d2.date != void 0 && d2.date instanceof Date) {
            var b2 = d2.millis === true;
            this.hV = stohex(this.formatDate(d2.date, "utc", b2));
          } else {
            if (d2 instanceof Date) {
              this.hV = stohex(this.formatDate(d2, "utc"));
            }
          }
        }
      }
    }
    if (this.hV == void 0) {
      throw new Error("parameter not specified properly for UTCTime");
    }
    return this.hV;
  };
  if (a2 != void 0) {
    this.setByParam(a2);
  }
};
extendClass(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERGeneralizedTime = function(a2) {
  KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, a2);
  this.hT = "18";
  this.params = a2;
  this.getFreshValueHex = function() {
    var d2 = this.params;
    if (this.params == void 0) {
      d2 = { date: /* @__PURE__ */ new Date() };
    }
    if (typeof d2 == "string") {
      if (d2.match(/^[0-9]{14}Z$/) || d2.match(/^[0-9]{14}\.[0-9]+Z$/)) {
        this.hV = stohex(d2);
      } else {
        throw new Error("malformed string for GeneralizedTime: " + d2);
      }
    } else {
      if (d2.str != void 0) {
        this.hV = stohex(d2.str);
      } else {
        if (d2.date == void 0 && d2.millis == true) {
          var c2 = /* @__PURE__ */ new Date();
          this.hV = stohex(this.formatDate(c2, "gen", true));
        } else {
          if (d2.date != void 0 && d2.date instanceof Date) {
            var b2 = d2.millis === true;
            this.hV = stohex(this.formatDate(d2.date, "gen", b2));
          } else {
            if (d2 instanceof Date) {
              this.hV = stohex(this.formatDate(d2, "gen"));
            }
          }
        }
      }
    }
    if (this.hV == void 0) {
      throw new Error("parameter not specified properly for GeneralizedTime");
    }
    return this.hV;
  };
  if (a2 != void 0) {
    this.setByParam(a2);
  }
};
extendClass(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERSequence = function(a2) {
  KJUR.asn1.DERSequence.superclass.constructor.call(this, a2);
  this.hT = "30";
  this.getFreshValueHex = function() {
    var c2 = "";
    for (var b2 = 0; b2 < this.asn1Array.length; b2++) {
      var d2 = this.asn1Array[b2];
      c2 += d2.tohex();
    }
    this.hV = c2;
    return this.hV;
  };
};
extendClass(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERSet = function(a2) {
  KJUR.asn1.DERSet.superclass.constructor.call(this, a2);
  this.hT = "31";
  this.sortFlag = true;
  this.getFreshValueHex = function() {
    var b2 = new Array();
    for (var c2 = 0; c2 < this.asn1Array.length; c2++) {
      var d2 = this.asn1Array[c2];
      b2.push(d2.tohex());
    }
    if (this.sortFlag == true) {
      b2.sort();
    }
    this.hV = b2.join("");
    return this.hV;
  };
  if (typeof a2 != "undefined") {
    if (typeof a2.sortflag != "undefined" && a2.sortflag == false) {
      this.sortFlag = false;
    }
  }
};
extendClass(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERTaggedObject = function(f2) {
  KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
  var d2 = KJUR.asn1, e2 = ASN1HEX, a2 = e2.getV;
  e2.isASN1HEX;
  var b2 = d2.ASN1Util.newObject;
  this.hT = "a0";
  this.hV = "";
  this.isExplicit = true;
  this.asn1Object = null;
  this.params = { tag: "a0", explicit: true };
  this.setASN1Object = function(g2, h2, i2) {
    this.params = { tag: h2, explicit: g2, obj: i2 };
  };
  this.getFreshValueHex = function() {
    var h2 = this.params;
    if (h2.explicit == void 0) {
      h2.explicit = true;
    }
    if (h2.tage != void 0) {
      h2.tag = h2.tage;
      h2.explicit = true;
    }
    if (h2.tagi != void 0) {
      h2.tag = h2.tagi;
      h2.explicit = false;
    }
    if (h2.str != void 0) {
      this.hV = utf8tohex(h2.str);
    } else {
      if (h2.hex != void 0) {
        this.hV = h2.hex;
      } else {
        if (h2.obj != void 0) {
          var g2;
          if (h2.obj instanceof d2.ASN1Object) {
            g2 = h2.obj.tohex();
          } else {
            if (typeof h2.obj == "object") {
              g2 = b2(h2.obj).tohex();
            }
          }
          if (h2.explicit) {
            this.hV = g2;
          } else {
            this.hV = a2(g2, 0);
          }
        } else {
          throw new Error("str, hex nor obj not specified");
        }
      }
    }
    if (h2.tag == void 0) {
      h2.tag = "a0";
    }
    this.hT = h2.tag;
    this.hTLV = null;
    this.isModified = true;
    return this.hV;
  };
  this.setByParam = function(g2) {
    this.params = g2;
  };
  if (f2 !== void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
var ASN1HEX = new function() {
}();
ASN1HEX.getLblen = function(c2, a2) {
  if (c2.substr(a2 + 2, 1) != "8") {
    return 1;
  }
  var b2 = parseInt(c2.substr(a2 + 3, 1));
  if (b2 == 0) {
    return -1;
  }
  if (0 < b2 && b2 < 10) {
    return b2 + 1;
  }
  return -2;
};
ASN1HEX.getL = function(c2, b2) {
  var a2 = ASN1HEX.getLblen(c2, b2);
  if (a2 < 1) {
    return "";
  }
  return c2.substr(b2 + 2, a2 * 2);
};
ASN1HEX.getVblen = function(d2, a2) {
  var c2, b2;
  c2 = ASN1HEX.getL(d2, a2);
  if (c2 == "") {
    return -1;
  }
  if (c2.substr(0, 1) === "8") {
    b2 = new BigInteger(c2.substr(2), 16);
  } else {
    b2 = new BigInteger(c2, 16);
  }
  return b2.intValue();
};
ASN1HEX.getVidx = function(c2, b2) {
  var a2 = ASN1HEX.getLblen(c2, b2);
  if (a2 < 0) {
    return a2;
  }
  return b2 + (a2 + 1) * 2;
};
ASN1HEX.getV = function(d2, a2) {
  var c2 = ASN1HEX.getVidx(d2, a2);
  var b2 = ASN1HEX.getVblen(d2, a2);
  return d2.substr(c2, b2 * 2);
};
ASN1HEX.getTLV = function(b2, a2) {
  return b2.substr(a2, 2) + ASN1HEX.getL(b2, a2) + ASN1HEX.getV(b2, a2);
};
ASN1HEX.getTLVblen = function(b2, a2) {
  return 2 + ASN1HEX.getLblen(b2, a2) * 2 + ASN1HEX.getVblen(b2, a2) * 2;
};
ASN1HEX.getNextSiblingIdx = function(d2, a2) {
  var c2 = ASN1HEX.getVidx(d2, a2);
  var b2 = ASN1HEX.getVblen(d2, a2);
  return c2 + b2 * 2;
};
ASN1HEX.getChildIdx = function(e2, k) {
  var l2 = ASN1HEX;
  var j2 = [];
  var c2, f2, g2;
  c2 = l2.getVidx(e2, k);
  f2 = l2.getVblen(e2, k) * 2;
  if (e2.substr(k, 2) == "03") {
    c2 += 2;
    f2 -= 2;
  }
  g2 = 0;
  var d2 = c2;
  while (g2 <= f2) {
    var b2 = l2.getTLVblen(e2, d2);
    g2 += b2;
    if (g2 <= f2) {
      j2.push(d2);
    }
    d2 += b2;
    if (g2 >= f2) {
      break;
    }
  }
  return j2;
};
ASN1HEX.getNthChildIdx = function(d2, b2, e2) {
  var c2 = ASN1HEX.getChildIdx(d2, b2);
  return c2[e2];
};
ASN1HEX.getIdxbyList = function(e2, d2, c2, i2) {
  var g2 = ASN1HEX;
  var f2, b2;
  if (c2.length == 0) {
    if (i2 !== void 0) {
      if (e2.substr(d2, 2) !== i2) {
        return -1;
      }
    }
    return d2;
  }
  f2 = c2.shift();
  b2 = g2.getChildIdx(e2, d2);
  if (f2 >= b2.length) {
    return -1;
  }
  return g2.getIdxbyList(e2, b2[f2], c2, i2);
};
ASN1HEX.getIdxbyListEx = function(f2, k, b2, g2) {
  var m2 = ASN1HEX;
  var d2, l2;
  if (b2.length == 0) {
    if (g2 !== void 0) {
      if (f2.substr(k, 2) !== g2) {
        return -1;
      }
    }
    return k;
  }
  d2 = b2.shift();
  l2 = m2.getChildIdx(f2, k);
  var j2 = 0;
  for (var e2 = 0; e2 < l2.length; e2++) {
    var c2 = f2.substr(l2[e2], 2);
    if (typeof d2 == "number" && !m2.isContextTag(c2) && j2 == d2 || typeof d2 == "string" && m2.isContextTag(c2, d2)) {
      return m2.getIdxbyListEx(f2, l2[e2], b2, g2);
    }
    if (!m2.isContextTag(c2)) {
      j2++;
    }
  }
  return -1;
};
ASN1HEX.getTLVbyList = function(d2, c2, b2, f2) {
  var e2 = ASN1HEX;
  var a2 = e2.getIdxbyList(d2, c2, b2, f2);
  if (a2 == -1) {
    return null;
  }
  if (a2 >= d2.length) {
    return null;
  }
  return e2.getTLV(d2, a2);
};
ASN1HEX.getTLVbyListEx = function(d2, c2, b2, f2) {
  var e2 = ASN1HEX;
  var a2 = e2.getIdxbyListEx(d2, c2, b2, f2);
  if (a2 == -1) {
    return null;
  }
  return e2.getTLV(d2, a2);
};
ASN1HEX.getVbyList = function(e2, c2, b2, g2, i2) {
  var f2 = ASN1HEX;
  var a2, d2;
  a2 = f2.getIdxbyList(e2, c2, b2, g2);
  if (a2 == -1) {
    return null;
  }
  if (a2 >= e2.length) {
    return null;
  }
  d2 = f2.getV(e2, a2);
  if (i2 === true) {
    d2 = d2.substr(2);
  }
  return d2;
};
ASN1HEX.getVbyListEx = function(b2, e2, a2, d2, f2) {
  var j2 = ASN1HEX;
  var g2, i2;
  g2 = j2.getIdxbyListEx(b2, e2, a2, d2);
  if (g2 == -1) {
    return null;
  }
  i2 = j2.getV(b2, g2);
  if (b2.substr(g2, 2) == "03" && f2 !== false) {
    i2 = i2.substr(2);
  }
  return i2;
};
ASN1HEX.getInt = function(e2, b2, f2) {
  if (f2 == void 0) {
    f2 = -1;
  }
  try {
    var c2 = e2.substr(b2, 2);
    if (c2 != "02" && c2 != "03") {
      return f2;
    }
    var a2 = ASN1HEX.getV(e2, b2);
    if (c2 == "02") {
      return parseInt(a2, 16);
    } else {
      return bitstrtoint(a2);
    }
  } catch (d2) {
    return f2;
  }
};
ASN1HEX.getOID = function(c2, a2, d2) {
  if (d2 == void 0) {
    d2 = null;
  }
  try {
    if (c2.substr(a2, 2) != "06") {
      return d2;
    }
    var e2 = ASN1HEX.getV(c2, a2);
    return hextooid(e2);
  } catch (b2) {
    return d2;
  }
};
ASN1HEX.getOIDName = function(d2, a2, f2) {
  if (f2 == void 0) {
    f2 = null;
  }
  try {
    var e2 = ASN1HEX.getOID(d2, a2, f2);
    if (e2 == f2) {
      return f2;
    }
    var b2 = KJUR.asn1.x509.OID.oid2name(e2);
    if (b2 == "") {
      return e2;
    }
    return b2;
  } catch (c2) {
    return f2;
  }
};
ASN1HEX.getString = function(d2, b2, e2) {
  if (e2 == void 0) {
    e2 = null;
  }
  try {
    var a2 = ASN1HEX.getV(d2, b2);
    return hextorstr(a2);
  } catch (c2) {
    return e2;
  }
};
ASN1HEX.hextooidstr = function(e2) {
  var h2 = function(b2, a2) {
    if (b2.length >= a2) {
      return b2;
    }
    return new Array(a2 - b2.length + 1).join("0") + b2;
  };
  var l2 = [];
  var o2 = e2.substr(0, 2);
  var f2 = parseInt(o2, 16);
  l2[0] = new String(Math.floor(f2 / 40));
  l2[1] = new String(f2 % 40);
  var m2 = e2.substr(2);
  var k = [];
  for (var g2 = 0; g2 < m2.length / 2; g2++) {
    k.push(parseInt(m2.substr(g2 * 2, 2), 16));
  }
  var j2 = [];
  var d2 = "";
  for (var g2 = 0; g2 < k.length; g2++) {
    if (k[g2] & 128) {
      d2 = d2 + h2((k[g2] & 127).toString(2), 7);
    } else {
      d2 = d2 + h2((k[g2] & 127).toString(2), 7);
      j2.push(new String(parseInt(d2, 2)));
      d2 = "";
    }
  }
  var n2 = l2.join(".");
  if (j2.length > 0) {
    n2 = n2 + "." + j2.join(".");
  }
  return n2;
};
ASN1HEX.dump = function(t2, c2, l2, g2) {
  var p2 = ASN1HEX;
  var j2 = p2.getV;
  var y2 = p2.dump;
  var w2 = p2.getChildIdx;
  var e2 = t2;
  if (t2 instanceof KJUR.asn1.ASN1Object) {
    e2 = t2.tohex();
  }
  var q2 = function(A2, i2) {
    if (A2.length <= i2 * 2) {
      return A2;
    } else {
      var v2 = A2.substr(0, i2) + "..(total " + A2.length / 2 + "bytes).." + A2.substr(A2.length - i2, i2);
      return v2;
    }
  };
  if (c2 === void 0) {
    c2 = { ommit_long_octet: 32 };
  }
  if (l2 === void 0) {
    l2 = 0;
  }
  if (g2 === void 0) {
    g2 = "";
  }
  var x = c2.ommit_long_octet;
  var z2 = e2.substr(l2, 2);
  if (z2 == "01") {
    var h2 = j2(e2, l2);
    if (h2 == "00") {
      return g2 + "BOOLEAN FALSE\n";
    } else {
      return g2 + "BOOLEAN TRUE\n";
    }
  }
  if (z2 == "02") {
    var h2 = j2(e2, l2);
    return g2 + "INTEGER " + q2(h2, x) + "\n";
  }
  if (z2 == "03") {
    var h2 = j2(e2, l2);
    if (p2.isASN1HEX(h2.substr(2))) {
      var k = g2 + "BITSTRING, encapsulates\n";
      k = k + y2(h2.substr(2), c2, 0, g2 + "  ");
      return k;
    } else {
      return g2 + "BITSTRING " + q2(h2, x) + "\n";
    }
  }
  if (z2 == "04") {
    var h2 = j2(e2, l2);
    if (p2.isASN1HEX(h2)) {
      var k = g2 + "OCTETSTRING, encapsulates\n";
      k = k + y2(h2, c2, 0, g2 + "  ");
      return k;
    } else {
      return g2 + "OCTETSTRING " + q2(h2, x) + "\n";
    }
  }
  if (z2 == "05") {
    return g2 + "NULL\n";
  }
  if (z2 == "06") {
    var m2 = j2(e2, l2);
    var b2 = KJUR.asn1.ASN1Util.oidHexToInt(m2);
    var o2 = KJUR.asn1.x509.OID.oid2name(b2);
    var a2 = b2.replace(/\./g, " ");
    if (o2 != "") {
      return g2 + "ObjectIdentifier " + o2 + " (" + a2 + ")\n";
    } else {
      return g2 + "ObjectIdentifier (" + a2 + ")\n";
    }
  }
  if (z2 == "0a") {
    return g2 + "ENUMERATED " + parseInt(j2(e2, l2)) + "\n";
  }
  if (z2 == "0c") {
    return g2 + "UTF8String '" + hextoutf8(j2(e2, l2)) + "'\n";
  }
  if (z2 == "13") {
    return g2 + "PrintableString '" + hextoutf8(j2(e2, l2)) + "'\n";
  }
  if (z2 == "14") {
    return g2 + "TeletexString '" + hextoutf8(j2(e2, l2)) + "'\n";
  }
  if (z2 == "16") {
    return g2 + "IA5String '" + hextoutf8(j2(e2, l2)) + "'\n";
  }
  if (z2 == "17") {
    return g2 + "UTCTime " + hextoutf8(j2(e2, l2)) + "\n";
  }
  if (z2 == "18") {
    return g2 + "GeneralizedTime " + hextoutf8(j2(e2, l2)) + "\n";
  }
  if (z2 == "1a") {
    return g2 + "VisualString '" + hextoutf8(j2(e2, l2)) + "'\n";
  }
  if (z2 == "1e") {
    return g2 + "BMPString '" + ucs2hextoutf8(j2(e2, l2)) + "'\n";
  }
  if (z2 == "30") {
    if (e2.substr(l2, 4) == "3000") {
      return g2 + "SEQUENCE {}\n";
    }
    var k = g2 + "SEQUENCE\n";
    var d2 = w2(e2, l2);
    var f2 = c2;
    if ((d2.length == 2 || d2.length == 3) && e2.substr(d2[0], 2) == "06" && e2.substr(d2[d2.length - 1], 2) == "04") {
      var o2 = p2.oidname(j2(e2, d2[0]));
      var r2 = JSON.parse(JSON.stringify(c2));
      r2.x509ExtName = o2;
      f2 = r2;
    }
    for (var u2 = 0; u2 < d2.length; u2++) {
      k = k + y2(e2, f2, d2[u2], g2 + "  ");
    }
    return k;
  }
  if (z2 == "31") {
    var k = g2 + "SET\n";
    var d2 = w2(e2, l2);
    for (var u2 = 0; u2 < d2.length; u2++) {
      k = k + y2(e2, c2, d2[u2], g2 + "  ");
    }
    return k;
  }
  var z2 = parseInt(z2, 16);
  if ((z2 & 128) != 0) {
    var n2 = z2 & 31;
    if ((z2 & 32) != 0) {
      var k = g2 + "[" + n2 + "]\n";
      var d2 = w2(e2, l2);
      for (var u2 = 0; u2 < d2.length; u2++) {
        k = k + y2(e2, c2, d2[u2], g2 + "  ");
      }
      return k;
    } else {
      var h2 = j2(e2, l2);
      if (ASN1HEX.isASN1HEX(h2)) {
        var k = g2 + "[" + n2 + "]\n";
        k = k + y2(h2, c2, 0, g2 + "  ");
        return k;
      } else {
        if (h2.substr(0, 8) == "68747470") {
          h2 = hextoutf8(h2);
        } else {
          if (c2.x509ExtName === "subjectAltName" && n2 == 2) {
            h2 = hextoutf8(h2);
          }
        }
      }
      var k = g2 + "[" + n2 + "] " + h2 + "\n";
      return k;
    }
  }
  return g2 + "UNKNOWN(" + z2 + ") " + j2(e2, l2) + "\n";
};
ASN1HEX.parse = function(x) {
  var t2 = ASN1HEX, f2 = t2.parse, a2 = t2.isASN1HEX, l2 = t2.getV, b2 = t2.getTLV, y2 = t2.getChildIdx, i2 = KJUR.asn1, e2 = i2.ASN1Util.oidHexToInt, B2 = i2.x509.OID.oid2name, k = hextoutf8, n2 = ucs2hextoutf8, q2 = iso88591hextoutf8;
  var c2 = { "0c": "utf8str", "12": "numstr", "13": "prnstr", "14": "telstr", "16": "ia5str", "17": "utctime", "18": "gentime", "1a": "visstr", "1e": "bmpstr", "30": "seq", "31": "set" };
  var u2 = function(H2) {
    var D2 = [];
    var E2 = y2(H2, 0);
    for (var G2 = 0; G2 < E2.length; G2++) {
      var s2 = E2[G2];
      var d2 = b2(H2, s2);
      var F2 = f2(d2);
      D2.push(F2);
    }
    return D2;
  };
  var C2 = x.substr(0, 2);
  var j2 = {};
  var p2 = l2(x, 0);
  if (C2 == "01") {
    if (x == "0101ff") {
      return { bool: true };
    }
    return { bool: false };
  } else {
    if (C2 == "02") {
      return { "int": { hex: p2 } };
    } else {
      if (C2 == "03") {
        try {
          if (p2.substr(0, 2) != "00") {
            throw "not encap";
          }
          var v2 = p2.substr(2);
          if (!a2(v2)) {
            throw "not encap";
          }
          return { bitstr: { obj: f2(v2) } };
        } catch (z2) {
          var m2 = null;
          if (p2.length <= 10) {
            m2 = bitstrtobinstr(p2);
          }
          if (m2 == null) {
            return { bitstr: { hex: p2 } };
          } else {
            return { bitstr: { bin: m2 } };
          }
        }
      } else {
        if (C2 == "04") {
          try {
            if (!a2(p2)) {
              throw "not encap";
            }
            return { octstr: { obj: f2(p2) } };
          } catch (z2) {
            return { octstr: { hex: p2 } };
          }
        } else {
          if (C2 == "05") {
            return { "null": "" };
          } else {
            if (C2 == "06") {
              var g2 = e2(p2);
              var r2 = B2(g2);
              if (r2 == "") {
                return { oid: g2 };
              } else {
                return { oid: r2 };
              }
            } else {
              if (C2 == "0a") {
                if (p2.length > 4) {
                  return { "enum": { hex: p2 } };
                } else {
                  return { "enum": parseInt(p2, 16) };
                }
              } else {
                if (C2 == "30" || C2 == "31") {
                  j2[c2[C2]] = u2(x);
                  return j2;
                } else {
                  if (C2 == "14") {
                    var o2 = q2(p2);
                    j2[c2[C2]] = { str: o2 };
                    return j2;
                  } else {
                    if (C2 == "1e") {
                      var o2 = n2(p2);
                      j2[c2[C2]] = { str: o2 };
                      return j2;
                    } else {
                      if (":0c:12:13:16:17:18:1a:".indexOf(C2) != -1) {
                        var o2 = k(p2);
                        j2[c2[C2]] = { str: o2 };
                        return j2;
                      } else {
                        if (C2.match(/^8[0-9]$/)) {
                          var o2 = k(p2);
                          if (o2 == null | o2 == "") {
                            return { tag: { tag: C2, explicit: false, hex: p2 } };
                          } else {
                            if (o2.match(/[\x00-\x1F\x7F-\x9F]/) != null || o2.match(/[\u0000-\u001F\u0080–\u009F]/) != null) {
                              return { tag: { tag: C2, explicit: false, hex: p2 } };
                            } else {
                              return { tag: { tag: C2, explicit: false, str: o2 } };
                            }
                          }
                        } else {
                          if (C2.match(/^a[0-9]$/)) {
                            try {
                              if (!a2(p2)) {
                                throw new Error("not encap");
                              }
                              return { tag: { tag: C2, explicit: true, obj: f2(p2) } };
                            } catch (z2) {
                              return { tag: { tag: C2, explicit: true, hex: p2 } };
                            }
                          } else {
                            var A2 = new KJUR.asn1.ASN1Object();
                            A2.hV = p2;
                            var w2 = A2.getLengthHexFromValue();
                            return { asn1: { tlv: C2 + w2 + p2 } };
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
ASN1HEX.isContextTag = function(c2, b2) {
  c2 = c2.toLowerCase();
  var f2, e2;
  try {
    f2 = parseInt(c2, 16);
  } catch (d2) {
    return -1;
  }
  if (b2 === void 0) {
    if ((f2 & 192) == 128) {
      return true;
    } else {
      return false;
    }
  }
  try {
    var a2 = b2.match(/^\[[0-9]+\]$/);
    if (a2 == null) {
      return false;
    }
    e2 = parseInt(b2.substr(1, b2.length - 1), 10);
    if (e2 > 31) {
      return false;
    }
    if ((f2 & 192) == 128 && (f2 & 31) == e2) {
      return true;
    }
    return false;
  } catch (d2) {
    return false;
  }
};
ASN1HEX.isASN1HEX = function(e2) {
  var d2 = ASN1HEX;
  if (e2.length % 2 == 1) {
    return false;
  }
  var c2 = d2.getVblen(e2, 0);
  var b2 = e2.substr(0, 2);
  var f2 = d2.getL(e2, 0);
  var a2 = e2.length - b2.length - f2.length;
  if (a2 == c2 * 2) {
    return true;
  }
  return false;
};
ASN1HEX.checkStrictDER = function(g2, o2, d2, c2, r2) {
  var s2 = ASN1HEX;
  if (d2 === void 0) {
    if (typeof g2 != "string") {
      throw new Error("not hex string");
    }
    g2 = g2.toLowerCase();
    if (!KJUR.lang.String.isHex(g2)) {
      throw new Error("not hex string");
    }
    d2 = g2.length;
    c2 = g2.length / 2;
    if (c2 < 128) {
      r2 = 1;
    } else {
      r2 = Math.ceil(c2.toString(16)) + 1;
    }
  }
  var k = s2.getL(g2, o2);
  if (k.length > r2 * 2) {
    throw new Error("L of TLV too long: idx=" + o2);
  }
  var n2 = s2.getVblen(g2, o2);
  if (n2 > c2) {
    throw new Error("value of L too long than hex: idx=" + o2);
  }
  var q2 = s2.getTLV(g2, o2);
  var f2 = q2.length - 2 - s2.getL(g2, o2).length;
  if (f2 !== n2 * 2) {
    throw new Error("V string length and L's value not the same:" + f2 + "/" + n2 * 2);
  }
  if (o2 === 0) {
    if (g2.length != q2.length) {
      throw new Error("total length and TLV length unmatch:" + g2.length + "!=" + q2.length);
    }
  }
  var b2 = g2.substr(o2, 2);
  if (b2 === "02") {
    var a2 = s2.getVidx(g2, o2);
    if (g2.substr(a2, 2) == "00" && g2.charCodeAt(a2 + 2) < 56) {
      throw new Error("not least zeros for DER INTEGER");
    }
  }
  if (parseInt(b2, 16) & 32) {
    var p2 = s2.getVblen(g2, o2);
    var m2 = 0;
    var l2 = s2.getChildIdx(g2, o2);
    for (var e2 = 0; e2 < l2.length; e2++) {
      var j2 = s2.getTLV(g2, l2[e2]);
      m2 += j2.length;
      s2.checkStrictDER(g2, l2[e2], d2, c2, r2);
    }
    if (p2 * 2 != m2) {
      throw new Error("sum of children's TLV length and L unmatch: " + p2 * 2 + "!=" + m2);
    }
  }
};
ASN1HEX.oidname = function(a2) {
  var c2 = KJUR.asn1;
  if (KJUR.lang.String.isHex(a2)) {
    a2 = c2.ASN1Util.oidHexToInt(a2);
  }
  var b2 = c2.x509.OID.oid2name(a2);
  if (b2 === "") {
    b2 = a2;
  }
  return b2;
};
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.x509 == "undefined" || !KJUR.asn1.x509) {
  KJUR.asn1.x509 = {};
}
KJUR.asn1.x509.Certificate = function(h2) {
  KJUR.asn1.x509.Certificate.superclass.constructor.call(this);
  var d2 = KJUR, c2 = d2.asn1, f2 = c2.DERBitString, b2 = c2.DERSequence, g2 = c2.x509, a2 = g2.TBSCertificate, e2 = g2.AlgorithmIdentifier;
  this.params = void 0;
  this.setByParam = function(i2) {
    this.params = i2;
  };
  this.sign = function() {
    var l2 = this.params;
    var k = l2.sigalg;
    if (l2.sigalg.name != void 0) {
      k = l2.sigalg.name;
    }
    var i2 = l2.tbsobj.tohex();
    var j2 = new KJUR.crypto.Signature({ alg: k });
    j2.init(l2.cakey);
    j2.updateHex(i2);
    l2.sighex = j2.sign();
  };
  this.getPEM = function() {
    return hextopem(this.tohex(), "CERTIFICATE");
  };
  this.tohex = function() {
    var k = this.params;
    if (k.tbsobj == void 0 || k.tbsobj == null) {
      k.tbsobj = new a2(k);
    }
    if (k.sighex == void 0 && k.cakey != void 0) {
      this.sign();
    }
    if (k.sighex == void 0) {
      throw new Error("sighex or cakey parameter not defined");
    }
    var i2 = [];
    i2.push(k.tbsobj);
    i2.push(new e2({ name: k.sigalg }));
    i2.push(new f2({ hex: "00" + k.sighex }));
    var j2 = new b2({ array: i2 });
    return j2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (h2 != void 0) {
    this.params = h2;
  }
};
extendClass(KJUR.asn1.x509.Certificate, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.TBSCertificate = function(f2) {
  KJUR.asn1.x509.TBSCertificate.superclass.constructor.call(this);
  var b2 = KJUR, i2 = b2.asn1, d2 = i2.x509, c2 = i2.DERTaggedObject, h2 = i2.DERInteger, g2 = i2.DERSequence, l2 = d2.AlgorithmIdentifier, e2 = d2.Time, a2 = d2.X500Name, j2 = d2.Extensions, k = d2.SubjectPublicKeyInfo;
  this.params = null;
  this.setByParam = function(m2) {
    this.params = m2;
  };
  this.tohex = function() {
    var n2 = [];
    var q2 = this.params;
    if (q2.version != void 0 || q2.version != 1) {
      var m2 = 2;
      if (q2.version != void 0) {
        m2 = q2.version - 1;
      }
      var p2 = new c2({ obj: new h2({ "int": m2 }) });
      n2.push(p2);
    }
    n2.push(new h2(q2.serial));
    n2.push(new l2({ name: q2.sigalg }));
    n2.push(new a2(q2.issuer));
    n2.push(new g2({ array: [new e2(q2.notbefore), new e2(q2.notafter)] }));
    n2.push(new a2(q2.subject));
    n2.push(new k(KEYUTIL.getKey(q2.sbjpubkey)));
    if (q2.ext !== void 0 && q2.ext.length > 0) {
      n2.push(new c2({ tag: "a3", obj: new j2(q2.ext) }));
    }
    var o2 = new KJUR.asn1.DERSequence({ array: n2 });
    return o2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 !== void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.x509.TBSCertificate, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.Extensions = function(d2) {
  KJUR.asn1.x509.Extensions.superclass.constructor.call(this);
  var c2 = KJUR, b2 = c2.asn1, a2 = b2.DERSequence, e2 = b2.x509;
  this.aParam = [];
  this.setByParam = function(f2) {
    this.aParam = f2;
  };
  this.tohex = function() {
    var f2 = [];
    for (var h2 = 0; h2 < this.aParam.length; h2++) {
      var l2 = this.aParam[h2];
      var k = l2.extname;
      var j2 = null;
      if (l2.extn != void 0) {
        j2 = new e2.PrivateExtension(l2);
      } else {
        if (k == "subjectKeyIdentifier") {
          j2 = new e2.SubjectKeyIdentifier(l2);
        } else {
          if (k == "keyUsage") {
            j2 = new e2.KeyUsage(l2);
          } else {
            if (k == "subjectAltName") {
              j2 = new e2.SubjectAltName(l2);
            } else {
              if (k == "issuerAltName") {
                j2 = new e2.IssuerAltName(l2);
              } else {
                if (k == "basicConstraints") {
                  j2 = new e2.BasicConstraints(l2);
                } else {
                  if (k == "nameConstraints") {
                    j2 = new e2.NameConstraints(l2);
                  } else {
                    if (k == "cRLDistributionPoints") {
                      j2 = new e2.CRLDistributionPoints(l2);
                    } else {
                      if (k == "certificatePolicies") {
                        j2 = new e2.CertificatePolicies(l2);
                      } else {
                        if (k == "policyMappings") {
                          j2 = new e2.PolicyMappings(l2);
                        } else {
                          if (k == "policyConstraints") {
                            j2 = new e2.PolicyConstraints(l2);
                          } else {
                            if (k == "inhibitAnyPolicy") {
                              j2 = new e2.InhibitAnyPolicy(l2);
                            } else {
                              if (k == "authorityKeyIdentifier") {
                                j2 = new e2.AuthorityKeyIdentifier(l2);
                              } else {
                                if (k == "extKeyUsage") {
                                  j2 = new e2.ExtKeyUsage(l2);
                                } else {
                                  if (k == "authorityInfoAccess") {
                                    j2 = new e2.AuthorityInfoAccess(l2);
                                  } else {
                                    if (k == "cRLNumber") {
                                      j2 = new e2.CRLNumber(l2);
                                    } else {
                                      if (k == "cRLReason") {
                                        j2 = new e2.CRLReason(l2);
                                      } else {
                                        if (k == "ocspNonce") {
                                          j2 = new e2.OCSPNonce(l2);
                                        } else {
                                          if (k == "ocspNoCheck") {
                                            j2 = new e2.OCSPNoCheck(l2);
                                          } else {
                                            if (k == "adobeTimeStamp") {
                                              j2 = new e2.AdobeTimeStamp(l2);
                                            } else {
                                              if (k == "subjectDirectoryAttributes") {
                                                j2 = new e2.SubjectDirectoryAttributes(l2);
                                              } else {
                                                throw new Error("extension not supported:" + JSON.stringify(l2));
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (j2 != null) {
        f2.push(j2);
      }
    }
    var g2 = new a2({ array: f2 });
    return g2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (d2 != void 0) {
    this.setByParam(d2);
  }
};
extendClass(KJUR.asn1.x509.Extensions, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.Extension = function(d2) {
  KJUR.asn1.x509.Extension.superclass.constructor.call(this);
  var a2 = KJUR, e2 = a2.asn1, h2 = e2.DERObjectIdentifier, i2 = e2.DEROctetString;
  e2.DERBitString;
  var g2 = e2.DERBoolean, c2 = e2.DERSequence;
  this.tohex = function() {
    var m2 = new h2({ oid: this.oid });
    var l2 = new i2({ hex: this.getExtnValueHex() });
    var k = new Array();
    k.push(m2);
    if (this.critical) {
      k.push(new g2());
    }
    k.push(l2);
    var j2 = new c2({ array: k });
    return j2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.critical = false;
  if (d2 !== void 0) {
    if (d2.critical !== void 0) {
      this.critical = d2.critical;
    }
  }
};
extendClass(KJUR.asn1.x509.Extension, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.KeyUsage = function(c2) {
  KJUR.asn1.x509.KeyUsage.superclass.constructor.call(this, c2);
  var b2 = Error;
  var a2 = { digitalSignature: 0, nonRepudiation: 1, keyEncipherment: 2, dataEncipherment: 3, keyAgreement: 4, keyCertSign: 5, cRLSign: 6, encipherOnly: 7, decipherOnly: 8 };
  this.getExtnValueHex = function() {
    var d2 = this.getBinValue();
    this.asn1ExtnValue = new KJUR.asn1.DERBitString({ bin: d2 });
    return this.asn1ExtnValue.tohex();
  };
  this.getBinValue = function() {
    var d2 = this.params;
    if (typeof d2 != "object" || typeof d2.names != "object" && typeof d2.bin != "string") {
      throw new b2("parameter not yet set");
    }
    if (d2.names != void 0) {
      return namearraytobinstr(d2.names, a2);
    } else {
      if (d2.bin != void 0) {
        return d2.bin;
      } else {
        throw new b2("parameter not set properly");
      }
    }
  };
  this.oid = "2.5.29.15";
  if (c2 !== void 0) {
    this.params = c2;
  }
};
extendClass(KJUR.asn1.x509.KeyUsage, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.BasicConstraints = function(g2) {
  KJUR.asn1.x509.BasicConstraints.superclass.constructor.call(this, g2);
  var c2 = KJUR.asn1, e2 = c2.DERBoolean, f2 = c2.DERInteger, b2 = c2.DERSequence;
  this.getExtnValueHex = function() {
    var i2 = new Array();
    if (this.cA) {
      i2.push(new e2());
    }
    if (this.pathLen > -1) {
      i2.push(new f2({ "int": this.pathLen }));
    }
    var h2 = new b2({ array: i2 });
    this.asn1ExtnValue = h2;
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.19";
  this.cA = false;
  this.pathLen = -1;
  if (g2 !== void 0) {
    if (g2.cA !== void 0) {
      this.cA = g2.cA;
    }
    if (g2.pathLen !== void 0) {
      this.pathLen = g2.pathLen;
    }
  }
};
extendClass(KJUR.asn1.x509.BasicConstraints, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.CRLDistributionPoints = function(d2) {
  KJUR.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this, d2);
  var b2 = KJUR, a2 = b2.asn1, c2 = a2.x509;
  this.getExtnValueHex = function() {
    return this.asn1ExtnValue.tohex();
  };
  this.setByDPArray = function(e2) {
    var f2 = [];
    for (var g2 = 0; g2 < e2.length; g2++) {
      if (e2[g2] instanceof KJUR.asn1.ASN1Object) {
        f2.push(e2[g2]);
      } else {
        var h2 = new c2.DistributionPoint(e2[g2]);
        f2.push(h2);
      }
    }
    this.asn1ExtnValue = new a2.DERSequence({ array: f2 });
  };
  this.setByOneURI = function(f2) {
    var e2 = new c2.DistributionPoint({ fulluri: f2 });
    this.setByDPArray([e2]);
  };
  this.oid = "2.5.29.31";
  if (d2 !== void 0) {
    if (d2.array !== void 0) {
      this.setByDPArray(d2.array);
    } else {
      if (d2.uri !== void 0) {
        this.setByOneURI(d2.uri);
      }
    }
  }
};
extendClass(KJUR.asn1.x509.CRLDistributionPoints, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.DistributionPoint = function(e2) {
  KJUR.asn1.x509.DistributionPoint.superclass.constructor.call(this);
  var c2 = KJUR, b2 = c2.asn1, d2 = b2.x509.DistributionPointName;
  this.tohex = function() {
    var f2 = new b2.DERSequence();
    if (this.asn1DP != null) {
      var g2 = new b2.DERTaggedObject({ explicit: true, tag: "a0", obj: this.asn1DP });
      f2.appendASN1Object(g2);
    }
    this.hTLV = f2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    if (e2.dpobj !== void 0) {
      this.asn1DP = e2.dpobj;
    } else {
      if (e2.dpname !== void 0) {
        this.asn1DP = new d2(e2.dpname);
      } else {
        if (e2.fulluri !== void 0) {
          this.asn1DP = new d2({ full: [{ uri: e2.fulluri }] });
        }
      }
    }
  }
};
extendClass(KJUR.asn1.x509.DistributionPoint, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.DistributionPointName = function(h2) {
  KJUR.asn1.x509.DistributionPointName.superclass.constructor.call(this);
  var c2 = KJUR, b2 = c2.asn1, e2 = b2.DERTaggedObject;
  this.tohex = function() {
    if (this.type != "full") {
      throw new Error("currently type shall be 'full': " + this.type);
    }
    this.asn1Obj = new e2({ explicit: false, tag: this.tag, obj: this.asn1V });
    this.hTLV = this.asn1Obj.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (h2 !== void 0) {
    if (b2.x509.GeneralNames.prototype.isPrototypeOf(h2)) {
      this.type = "full";
      this.tag = "a0";
      this.asn1V = h2;
    } else {
      if (h2.full !== void 0) {
        this.type = "full";
        this.tag = "a0";
        this.asn1V = new b2.x509.GeneralNames(h2.full);
      } else {
        throw new Error("This class supports GeneralNames only as argument");
      }
    }
  }
};
extendClass(KJUR.asn1.x509.DistributionPointName, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.CertificatePolicies = function(f2) {
  KJUR.asn1.x509.CertificatePolicies.superclass.constructor.call(this, f2);
  var c2 = KJUR, b2 = c2.asn1, e2 = b2.x509, a2 = b2.DERSequence, d2 = e2.PolicyInformation;
  this.params = null;
  this.getExtnValueHex = function() {
    var j2 = [];
    for (var h2 = 0; h2 < this.params.array.length; h2++) {
      j2.push(new d2(this.params.array[h2]));
    }
    var g2 = new a2({ array: j2 });
    this.asn1ExtnValue = g2;
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.32";
  if (f2 !== void 0) {
    this.params = f2;
  }
};
extendClass(KJUR.asn1.x509.CertificatePolicies, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.PolicyInformation = function(d2) {
  KJUR.asn1.x509.PolicyInformation.superclass.constructor.call(this, d2);
  var c2 = KJUR.asn1, b2 = c2.DERSequence, e2 = c2.DERObjectIdentifier, a2 = c2.x509.PolicyQualifierInfo;
  this.params = null;
  this.tohex = function() {
    if (this.params.policyoid === void 0 && this.params.array === void 0) {
      throw new Error("parameter oid and array missing");
    }
    var f2 = [new e2(this.params.policyoid)];
    if (this.params.array !== void 0) {
      var j2 = [];
      for (var h2 = 0; h2 < this.params.array.length; h2++) {
        j2.push(new a2(this.params.array[h2]));
      }
      if (j2.length > 0) {
        f2.push(new b2({ array: j2 }));
      }
    }
    var g2 = new b2({ array: f2 });
    return g2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (d2 !== void 0) {
    this.params = d2;
  }
};
extendClass(KJUR.asn1.x509.PolicyInformation, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.PolicyQualifierInfo = function(e2) {
  KJUR.asn1.x509.PolicyQualifierInfo.superclass.constructor.call(this, e2);
  var c2 = KJUR.asn1, b2 = c2.DERSequence, d2 = c2.DERIA5String, f2 = c2.DERObjectIdentifier, a2 = c2.x509.UserNotice;
  this.params = null;
  this.tohex = function() {
    if (this.params.cps !== void 0) {
      var g2 = new b2({ array: [new f2({ oid: "1.3.6.1.5.5.7.2.1" }), new d2({ str: this.params.cps })] });
      return g2.tohex();
    }
    if (this.params.unotice != void 0) {
      var g2 = new b2({ array: [new f2({ oid: "1.3.6.1.5.5.7.2.2" }), new a2(this.params.unotice)] });
      return g2.tohex();
    }
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    this.params = e2;
  }
};
extendClass(KJUR.asn1.x509.PolicyQualifierInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.UserNotice = function(e2) {
  KJUR.asn1.x509.UserNotice.superclass.constructor.call(this, e2);
  var a2 = KJUR.asn1.DERSequence;
  KJUR.asn1.DERInteger;
  var c2 = KJUR.asn1.x509.DisplayText, b2 = KJUR.asn1.x509.NoticeReference;
  this.params = null;
  this.tohex = function() {
    var f2 = [];
    if (this.params.noticeref !== void 0) {
      f2.push(new b2(this.params.noticeref));
    }
    if (this.params.exptext !== void 0) {
      f2.push(new c2(this.params.exptext));
    }
    var g2 = new a2({ array: f2 });
    return g2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    this.params = e2;
  }
};
extendClass(KJUR.asn1.x509.UserNotice, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.NoticeReference = function(d2) {
  KJUR.asn1.x509.NoticeReference.superclass.constructor.call(this, d2);
  var a2 = KJUR.asn1.DERSequence, c2 = KJUR.asn1.DERInteger, b2 = KJUR.asn1.x509.DisplayText;
  this.params = null;
  this.tohex = function() {
    var f2 = [];
    if (this.params.org !== void 0) {
      f2.push(new b2(this.params.org));
    }
    if (this.params.noticenum !== void 0) {
      var h2 = [];
      var e2 = this.params.noticenum;
      for (var j2 = 0; j2 < e2.length; j2++) {
        h2.push(new c2(e2[j2]));
      }
      f2.push(new a2({ array: h2 }));
    }
    if (f2.length == 0) {
      throw new Error("parameter is empty");
    }
    var g2 = new a2({ array: f2 });
    return g2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (d2 !== void 0) {
    this.params = d2;
  }
};
extendClass(KJUR.asn1.x509.NoticeReference, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.DisplayText = function(a2) {
  KJUR.asn1.x509.DisplayText.superclass.constructor.call(this, a2);
  this.hT = "0c";
  if (a2 !== void 0) {
    if (a2.type === "ia5") {
      this.hT = "16";
    } else {
      if (a2.type === "vis") {
        this.hT = "1a";
      } else {
        if (a2.type === "bmp") {
          this.hT = "1e";
        }
      }
    }
  }
};
extendClass(KJUR.asn1.x509.DisplayText, KJUR.asn1.DERAbstractString);
KJUR.asn1.x509.PolicyMappings = function(e2) {
  KJUR.asn1.x509.PolicyMappings.superclass.constructor.call(this, e2);
  var c2 = KJUR, b2 = c2.asn1;
  b2.x509;
  var a2 = b2.ASN1Util.newObject;
  this.params = null;
  this.getExtnValueHex = function() {
    var j2 = this.params;
    var f2 = [];
    for (var g2 = 0; g2 < j2.array.length; g2++) {
      var h2 = j2.array[g2];
      f2.push({ seq: [{ oid: h2[0] }, { oid: h2[1] }] });
    }
    this.asn1ExtnValue = a2({ seq: f2 });
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.33";
  if (e2 !== void 0) {
    this.params = e2;
  }
};
extendClass(KJUR.asn1.x509.PolicyMappings, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.PolicyConstraints = function(e2) {
  KJUR.asn1.x509.PolicyConstraints.superclass.constructor.call(this, e2);
  var c2 = KJUR, b2 = c2.asn1;
  b2.x509;
  var a2 = b2.ASN1Util.newObject;
  this.params = null;
  this.getExtnValueHex = function() {
    var g2 = this.params;
    var f2 = [];
    if (g2.reqexp != void 0) {
      f2.push({ tag: { tagi: "80", obj: { "int": g2.reqexp } } });
    }
    if (g2.inhibit != void 0) {
      f2.push({ tag: { tagi: "81", obj: { "int": g2.inhibit } } });
    }
    this.asn1ExtnValue = a2({ seq: f2 });
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.36";
  if (e2 !== void 0) {
    this.params = e2;
  }
};
extendClass(KJUR.asn1.x509.PolicyConstraints, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.InhibitAnyPolicy = function(e2) {
  KJUR.asn1.x509.InhibitAnyPolicy.superclass.constructor.call(this, e2);
  var c2 = KJUR, b2 = c2.asn1;
  b2.x509;
  var a2 = b2.ASN1Util.newObject;
  this.params = null;
  this.getExtnValueHex = function() {
    this.asn1ExtnValue = a2({ "int": this.params.skip });
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.54";
  if (e2 !== void 0) {
    this.params = e2;
  }
};
extendClass(KJUR.asn1.x509.InhibitAnyPolicy, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.NameConstraints = function(f2) {
  KJUR.asn1.x509.NameConstraints.superclass.constructor.call(this, f2);
  var c2 = KJUR, b2 = c2.asn1, e2 = b2.x509, a2 = b2.ASN1Util.newObject, d2 = e2.GeneralSubtree;
  this.params = null;
  this.getExtnValueHex = function() {
    var l2 = this.params;
    var g2 = [];
    if (l2.permit != void 0 && l2.permit.length != void 0) {
      var k = [];
      for (var h2 = 0; h2 < l2.permit.length; h2++) {
        k.push(new d2(l2.permit[h2]));
      }
      g2.push({ tag: { tagi: "a0", obj: { seq: k } } });
    }
    if (l2.exclude != void 0 && l2.exclude.length != void 0) {
      var j2 = [];
      for (var h2 = 0; h2 < l2.exclude.length; h2++) {
        j2.push(new d2(l2.exclude[h2]));
      }
      g2.push({ tag: { tagi: "a1", obj: { seq: j2 } } });
    }
    this.asn1ExtnValue = a2({ seq: g2 });
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.30";
  if (f2 !== void 0) {
    this.params = f2;
  }
};
extendClass(KJUR.asn1.x509.NameConstraints, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.GeneralSubtree = function(e2) {
  KJUR.asn1.x509.GeneralSubtree.superclass.constructor.call(this);
  var b2 = KJUR.asn1, d2 = b2.x509, c2 = d2.GeneralName, a2 = b2.ASN1Util.newObject;
  this.params = null;
  this.setByParam = function(f2) {
    this.params = f2;
  };
  this.tohex = function() {
    var h2 = this.params;
    var f2 = [new c2(h2)];
    if (h2.min != void 0) {
      f2.push({ tag: { tagi: "80", obj: { "int": h2.min } } });
    }
    if (h2.max != void 0) {
      f2.push({ tag: { tagi: "81", obj: { "int": h2.max } } });
    }
    var g2 = a2({ seq: f2 });
    return g2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.x509.GeneralSubtree, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.ExtKeyUsage = function(c2) {
  KJUR.asn1.x509.ExtKeyUsage.superclass.constructor.call(this, c2);
  var b2 = KJUR, a2 = b2.asn1;
  this.setPurposeArray = function(d2) {
    this.asn1ExtnValue = new a2.DERSequence();
    for (var e2 = 0; e2 < d2.length; e2++) {
      var f2 = new a2.DERObjectIdentifier(d2[e2]);
      this.asn1ExtnValue.appendASN1Object(f2);
    }
  };
  this.getExtnValueHex = function() {
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.37";
  if (c2 !== void 0) {
    if (c2.array !== void 0) {
      this.setPurposeArray(c2.array);
    }
  }
};
extendClass(KJUR.asn1.x509.ExtKeyUsage, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.AuthorityKeyIdentifier = function(f2) {
  KJUR.asn1.x509.AuthorityKeyIdentifier.superclass.constructor.call(this, f2);
  var b2 = KJUR, a2 = b2.asn1, d2 = a2.DERTaggedObject, e2 = a2.x509.GeneralNames;
  b2.crypto.Util.isKey;
  this.asn1KID = null;
  this.asn1CertIssuer = null;
  this.asn1CertSN = null;
  this.getExtnValueHex = function() {
    var h2 = new Array();
    if (this.asn1KID) {
      h2.push(new d2({ explicit: false, tag: "80", obj: this.asn1KID }));
    }
    if (this.asn1CertIssuer) {
      h2.push(new d2({ explicit: false, tag: "a1", obj: new e2([{ dn: this.asn1CertIssuer }]) }));
    }
    if (this.asn1CertSN) {
      h2.push(new d2({ explicit: false, tag: "82", obj: this.asn1CertSN }));
    }
    var g2 = new a2.DERSequence({ array: h2 });
    this.asn1ExtnValue = g2;
    return this.asn1ExtnValue.tohex();
  };
  this.setKIDByParam = function(i2) {
    if (i2.str !== void 0 || i2.hex !== void 0) {
      this.asn1KID = new KJUR.asn1.DEROctetString(i2);
    } else {
      if (typeof i2 === "object" && KJUR.crypto.Util.isKey(i2) || typeof i2 === "string" && i2.indexOf("BEGIN ") != -1) {
        var h2 = i2;
        if (typeof i2 === "string") {
          h2 = KEYUTIL.getKey(i2);
        }
        var g2 = KEYUTIL.getKeyID(h2);
        this.asn1KID = new KJUR.asn1.DEROctetString({ hex: g2 });
      }
    }
  };
  this.setCertIssuerByParam = function(g2) {
    if (g2.str !== void 0 || g2.ldapstr !== void 0 || g2.hex !== void 0 || g2.certsubject !== void 0 || g2.certissuer !== void 0) {
      this.asn1CertIssuer = new KJUR.asn1.x509.X500Name(g2);
    } else {
      if (typeof g2 === "string" && g2.indexOf("BEGIN ") != -1 && g2.indexOf("CERTIFICATE") != -1) {
        this.asn1CertIssuer = new KJUR.asn1.x509.X500Name({ certissuer: g2 });
      }
    }
  };
  this.setCertSNByParam = function(i2) {
    if (i2.str !== void 0 || i2.bigint !== void 0 || i2.hex !== void 0) {
      this.asn1CertSN = new KJUR.asn1.DERInteger(i2);
    } else {
      if (typeof i2 === "string" && i2.indexOf("BEGIN ") != -1 && i2.indexOf("CERTIFICATE")) {
        var g2 = new X509();
        g2.readCertPEM(i2);
        var h2 = g2.getSerialNumberHex();
        this.asn1CertSN = new KJUR.asn1.DERInteger({ hex: h2 });
      }
    }
  };
  this.oid = "2.5.29.35";
  if (f2 !== void 0) {
    if (f2.kid !== void 0) {
      this.setKIDByParam(f2.kid);
    }
    if (f2.issuer !== void 0) {
      this.setCertIssuerByParam(f2.issuer);
    }
    if (f2.sn !== void 0) {
      this.setCertSNByParam(f2.sn);
    }
    if (f2.issuersn !== void 0 && typeof f2.issuersn === "string" && f2.issuersn.indexOf("BEGIN ") != -1 && f2.issuersn.indexOf("CERTIFICATE")) {
      this.setCertSNByParam(f2.issuersn);
      this.setCertIssuerByParam(f2.issuersn);
    }
  }
};
extendClass(KJUR.asn1.x509.AuthorityKeyIdentifier, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.SubjectKeyIdentifier = function(d2) {
  KJUR.asn1.x509.SubjectKeyIdentifier.superclass.constructor.call(this, d2);
  var b2 = KJUR, a2 = b2.asn1, c2 = a2.DEROctetString;
  this.asn1KID = null;
  this.getExtnValueHex = function() {
    this.asn1ExtnValue = this.asn1KID;
    return this.asn1ExtnValue.tohex();
  };
  this.setKIDByParam = function(g2) {
    if (g2.str !== void 0 || g2.hex !== void 0) {
      this.asn1KID = new c2(g2);
    } else {
      if (typeof g2 === "object" && KJUR.crypto.Util.isKey(g2) || typeof g2 === "string" && g2.indexOf("BEGIN") != -1) {
        var f2 = g2;
        if (typeof g2 === "string") {
          f2 = KEYUTIL.getKey(g2);
        }
        var e2 = KEYUTIL.getKeyID(f2);
        this.asn1KID = new KJUR.asn1.DEROctetString({ hex: e2 });
      }
    }
  };
  this.oid = "2.5.29.14";
  if (d2 !== void 0) {
    if (d2.kid !== void 0) {
      this.setKIDByParam(d2.kid);
    }
  }
};
extendClass(KJUR.asn1.x509.SubjectKeyIdentifier, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.AuthorityInfoAccess = function(a2) {
  KJUR.asn1.x509.AuthorityInfoAccess.superclass.constructor.call(this, a2);
  this.setAccessDescriptionArray = function(k) {
    var d2 = new Array(), b2 = KJUR, g2 = b2.asn1, c2 = g2.DERSequence, j2 = g2.DERObjectIdentifier, l2 = g2.x509.GeneralName;
    for (var f2 = 0; f2 < k.length; f2++) {
      var e2;
      var h2 = k[f2];
      if (h2.ocsp !== void 0) {
        e2 = new c2({ array: [new j2({ oid: "1.3.6.1.5.5.7.48.1" }), new l2({ uri: h2.ocsp })] });
      } else {
        if (h2.caissuer !== void 0) {
          e2 = new c2({ array: [new j2({ oid: "1.3.6.1.5.5.7.48.2" }), new l2({ uri: h2.caissuer })] });
        } else {
          throw new Error("unknown AccessMethod parameter: " + JSON.stringify(h2));
        }
      }
      d2.push(e2);
    }
    this.asn1ExtnValue = new c2({ array: d2 });
  };
  this.getExtnValueHex = function() {
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "1.3.6.1.5.5.7.1.1";
  if (a2 !== void 0) {
    if (a2.array !== void 0) {
      this.setAccessDescriptionArray(a2.array);
    }
  }
};
extendClass(KJUR.asn1.x509.AuthorityInfoAccess, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.SubjectAltName = function(a2) {
  KJUR.asn1.x509.SubjectAltName.superclass.constructor.call(this, a2);
  this.setNameArray = function(b2) {
    this.asn1ExtnValue = new KJUR.asn1.x509.GeneralNames(b2);
  };
  this.getExtnValueHex = function() {
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.17";
  if (a2 !== void 0) {
    if (a2.array !== void 0) {
      this.setNameArray(a2.array);
    }
  }
};
extendClass(KJUR.asn1.x509.SubjectAltName, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.IssuerAltName = function(a2) {
  KJUR.asn1.x509.IssuerAltName.superclass.constructor.call(this, a2);
  this.setNameArray = function(b2) {
    this.asn1ExtnValue = new KJUR.asn1.x509.GeneralNames(b2);
  };
  this.getExtnValueHex = function() {
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.18";
  if (a2 !== void 0) {
    if (a2.array !== void 0) {
      this.setNameArray(a2.array);
    }
  }
};
extendClass(KJUR.asn1.x509.IssuerAltName, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.SubjectDirectoryAttributes = function(e2) {
  KJUR.asn1.x509.SubjectDirectoryAttributes.superclass.constructor.call(this, e2);
  var c2 = KJUR.asn1, a2 = c2.DERSequence, b2 = c2.ASN1Util.newObject, d2 = c2.x509.OID.name2oid;
  this.params = null;
  this.getExtnValueHex = function() {
    var f2 = [];
    for (var j2 = 0; j2 < this.params.array.length; j2++) {
      var l2 = this.params.array[j2];
      if (l2.attr != void 0 && l2.array != void 0) {
        var k = { seq: [{ oid: l2.attr }, { set: l2.array }] };
        f2.push(b2(k));
        continue;
      }
      var h2 = { seq: [{ oid: "1.2.3.4" }, { set: [{ utf8str: "DE" }] }] };
      if (l2.attr == "dateOfBirth") {
        h2.seq[0].oid = d2(l2.attr);
        h2.seq[1].set[0] = { gentime: l2.str };
      } else {
        if (l2.attr == "placeOfBirth") {
          h2.seq[0].oid = d2(l2.attr);
          h2.seq[1].set[0] = { utf8str: l2.str };
        } else {
          if (l2.attr == "gender") {
            h2.seq[0].oid = d2(l2.attr);
            h2.seq[1].set[0] = { prnstr: l2.str };
          } else {
            if (l2.attr == "countryOfCitizenship") {
              h2.seq[0].oid = d2(l2.attr);
              h2.seq[1].set[0] = { prnstr: l2.str };
            } else {
              if (l2.attr == "countryOfResidence") {
                h2.seq[0].oid = d2(l2.attr);
                h2.seq[1].set[0] = { prnstr: l2.str };
              } else {
                throw new Error("unsupported attribute: " + l2.attr);
              }
            }
          }
        }
      }
      f2.push(new b2(h2));
    }
    var g2 = new a2({ array: f2 });
    this.asn1ExtnValue = g2;
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.9";
  if (e2 !== void 0) {
    this.params = e2;
  }
};
extendClass(KJUR.asn1.x509.SubjectDirectoryAttributes, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.PrivateExtension = function(f2) {
  KJUR.asn1.x509.PrivateExtension.superclass.constructor.call(this, f2);
  var c2 = KJUR, e2 = c2.lang.String.isHex, b2 = c2.asn1, d2 = b2.x509.OID.name2oid, a2 = b2.ASN1Util.newObject;
  this.params = null;
  this.setByParam = function(g2) {
    this.oid = d2(g2.extname);
    this.params = g2;
  };
  this.getExtnValueHex = function() {
    if (this.params.extname == void 0 || this.params.extn == void 0) {
      throw new Error("extname or extnhex not specified");
    }
    var h2 = this.params.extn;
    if (typeof h2 == "string" && e2(h2)) {
      return h2;
    } else {
      if (typeof h2 == "object") {
        try {
          return a2(h2).tohex();
        } catch (g2) {
        }
      }
    }
    throw new Error("unsupported extn value");
  };
  if (f2 != void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.x509.PrivateExtension, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.CRL = function(g2) {
  KJUR.asn1.x509.CRL.superclass.constructor.call(this);
  var c2 = KJUR, b2 = c2.asn1, a2 = b2.DERSequence, e2 = b2.DERBitString, f2 = b2.x509, d2 = f2.AlgorithmIdentifier, h2 = f2.TBSCertList;
  this.params = void 0;
  this.setByParam = function(i2) {
    this.params = i2;
  };
  this.sign = function() {
    var j2 = new h2(this.params).tohex();
    var k = new KJUR.crypto.Signature({ alg: this.params.sigalg });
    k.init(this.params.cakey);
    k.updateHex(j2);
    var i2 = k.sign();
    this.params.sighex = i2;
  };
  this.getPEM = function() {
    return hextopem(this.tohex(), "X509 CRL");
  };
  this.tohex = function() {
    var k = this.params;
    if (k.tbsobj == void 0) {
      k.tbsobj = new h2(k);
    }
    if (k.sighex == void 0 && k.cakey != void 0) {
      this.sign();
    }
    if (k.sighex == void 0) {
      throw new Error("sighex or cakey parameter not defined");
    }
    var i2 = [];
    i2.push(k.tbsobj);
    i2.push(new d2({ name: k.sigalg }));
    i2.push(new e2({ hex: "00" + k.sighex }));
    var j2 = new a2({ array: i2 });
    return j2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 != void 0) {
    this.params = g2;
  }
};
extendClass(KJUR.asn1.x509.CRL, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.TBSCertList = function(f2) {
  KJUR.asn1.x509.TBSCertList.superclass.constructor.call(this);
  var b2 = KJUR, i2 = b2.asn1, h2 = i2.DERInteger, g2 = i2.DERSequence, c2 = i2.DERTaggedObject;
  i2.DERObjectIdentifier;
  var d2 = i2.x509, l2 = d2.AlgorithmIdentifier, e2 = d2.Time, j2 = d2.Extensions, a2 = d2.X500Name;
  this.params = null;
  this.setByParam = function(m2) {
    this.params = m2;
  };
  this.getRevCertSequence = function() {
    var m2 = [];
    var n2 = this.params.revcert;
    for (var o2 = 0; o2 < n2.length; o2++) {
      var p2 = [new h2(n2[o2].sn), new e2(n2[o2].date)];
      if (n2[o2].ext != void 0) {
        p2.push(new j2(n2[o2].ext));
      }
      m2.push(new g2({ array: p2 }));
    }
    return new g2({ array: m2 });
  };
  this.tohex = function() {
    var n2 = [];
    var r2 = this.params;
    if (r2.version != void 0) {
      var m2 = r2.version - 1;
      var p2 = new h2({ "int": m2 });
      n2.push(p2);
    }
    n2.push(new l2({ name: r2.sigalg }));
    n2.push(new a2(r2.issuer));
    n2.push(new e2(r2.thisupdate));
    if (r2.nextupdate != void 0) {
      n2.push(new e2(r2.nextupdate));
    }
    if (r2.revcert != void 0) {
      n2.push(this.getRevCertSequence());
    }
    if (r2.ext != void 0) {
      var q2 = new j2(r2.ext);
      n2.push(new c2({ tag: "a0", explicit: true, obj: q2 }));
    }
    var o2 = new g2({ array: n2 });
    return o2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 !== void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.x509.TBSCertList, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.CRLEntry = function(e2) {
  KJUR.asn1.x509.CRLEntry.superclass.constructor.call(this);
  var b2 = KJUR, a2 = b2.asn1;
  this.setCertSerial = function(f2) {
    this.sn = new a2.DERInteger(f2);
  };
  this.setRevocationDate = function(f2) {
    this.time = new a2.x509.Time(f2);
  };
  this.tohex = function() {
    var f2 = new a2.DERSequence({ array: [this.sn, this.time] });
    this.TLV = f2.tohex();
    return this.TLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    if (e2.time !== void 0) {
      this.setRevocationDate(e2.time);
    }
    if (e2.sn !== void 0) {
      this.setCertSerial(e2.sn);
    }
  }
};
extendClass(KJUR.asn1.x509.CRLEntry, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.CRLNumber = function(a2) {
  KJUR.asn1.x509.CRLNumber.superclass.constructor.call(this, a2);
  this.params = void 0;
  this.getExtnValueHex = function() {
    this.asn1ExtnValue = new KJUR.asn1.DERInteger(this.params.num);
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.20";
  if (a2 != void 0) {
    this.params = a2;
  }
};
extendClass(KJUR.asn1.x509.CRLNumber, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.CRLReason = function(a2) {
  KJUR.asn1.x509.CRLReason.superclass.constructor.call(this, a2);
  this.params = void 0;
  this.getExtnValueHex = function() {
    this.asn1ExtnValue = new KJUR.asn1.DEREnumerated(this.params.code);
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "2.5.29.21";
  if (a2 != void 0) {
    this.params = a2;
  }
};
extendClass(KJUR.asn1.x509.CRLReason, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.OCSPNonce = function(a2) {
  KJUR.asn1.x509.OCSPNonce.superclass.constructor.call(this, a2);
  this.params = void 0;
  this.getExtnValueHex = function() {
    this.asn1ExtnValue = new KJUR.asn1.DEROctetString(this.params);
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "1.3.6.1.5.5.7.48.1.2";
  if (a2 != void 0) {
    this.params = a2;
  }
};
extendClass(KJUR.asn1.x509.OCSPNonce, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.OCSPNoCheck = function(a2) {
  KJUR.asn1.x509.OCSPNoCheck.superclass.constructor.call(this, a2);
  this.params = void 0;
  this.getExtnValueHex = function() {
    this.asn1ExtnValue = new KJUR.asn1.DERNull();
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "1.3.6.1.5.5.7.48.1.5";
  if (a2 != void 0) {
    this.params = a2;
  }
};
extendClass(KJUR.asn1.x509.OCSPNoCheck, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.AdobeTimeStamp = function(g2) {
  KJUR.asn1.x509.AdobeTimeStamp.superclass.constructor.call(this, g2);
  var c2 = KJUR, b2 = c2.asn1, f2 = b2.DERInteger, d2 = b2.DERBoolean, a2 = b2.DERSequence, e2 = b2.x509.GeneralName;
  this.params = null;
  this.getExtnValueHex = function() {
    var i2 = this.params;
    var h2 = [new f2(1)];
    h2.push(new e2({ uri: i2.uri }));
    if (i2.reqauth != void 0) {
      h2.push(new d2(i2.reqauth));
    }
    this.asn1ExtnValue = new a2({ array: h2 });
    return this.asn1ExtnValue.tohex();
  };
  this.oid = "1.2.840.113583.1.1.9.1";
  if (g2 !== void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.x509.AdobeTimeStamp, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.X500Name = function(f2) {
  KJUR.asn1.x509.X500Name.superclass.constructor.call(this);
  this.asn1Array = [];
  this.paramArray = [];
  this.sRule = "utf8";
  var c2 = KJUR, b2 = c2.asn1, e2 = b2.x509, d2 = e2.RDN;
  this.setByString = function(g2, l2) {
    if (l2 !== void 0) {
      this.sRule = l2;
    }
    var k = g2.split("/");
    k.shift();
    var j2 = [];
    for (var m2 = 0; m2 < k.length; m2++) {
      if (k[m2].match(/^[^=]+=.+$/)) {
        j2.push(k[m2]);
      } else {
        var h2 = j2.length - 1;
        j2[h2] = j2[h2] + "/" + k[m2];
      }
    }
    for (var m2 = 0; m2 < j2.length; m2++) {
      this.asn1Array.push(new d2({ str: j2[m2], rule: this.sRule }));
    }
  };
  this.setByLdapString = function(g2, h2) {
    if (h2 !== void 0) {
      this.sRule = h2;
    }
    var i2 = e2.X500Name.ldapToCompat(g2);
    this.setByString(i2, h2);
  };
  this.setByObject = function(j2, i2) {
    if (i2 !== void 0) {
      this.sRule = i2;
    }
    for (var g2 in j2) {
      if (j2.hasOwnProperty(g2)) {
        var h2 = new d2({ str: g2 + "=" + j2[g2], rule: this.sRule });
        this.asn1Array ? this.asn1Array.push(h2) : this.asn1Array = [h2];
      }
    }
  };
  this.setByParam = function(h2) {
    if (h2.rule !== void 0) {
      this.sRule = h2.rule;
    }
    if (h2.array !== void 0) {
      this.paramArray = h2.array;
    } else {
      if (h2.str !== void 0) {
        this.setByString(h2.str);
      } else {
        if (h2.ldapstr !== void 0) {
          this.setByLdapString(h2.ldapstr);
        } else {
          if (h2.hex !== void 0) {
            this.hTLV = h2.hex;
          } else {
            if (h2.certissuer !== void 0) {
              var g2 = new X509();
              g2.readCertPEM(h2.certissuer);
              this.hTLV = g2.getIssuerHex();
            } else {
              if (h2.certsubject !== void 0) {
                var g2 = new X509();
                g2.readCertPEM(h2.certsubject);
                this.hTLV = g2.getSubjectHex();
              } else {
                if (typeof h2 === "object" && h2.certsubject === void 0 && h2.certissuer === void 0) {
                  this.setByObject(h2);
                }
              }
            }
          }
        }
      }
    }
  };
  this.tohex = function() {
    if (typeof this.hTLV == "string") {
      return this.hTLV;
    }
    if (this.asn1Array.length == 0 && this.paramArray.length > 0) {
      for (var g2 = 0; g2 < this.paramArray.length; g2++) {
        var k = { array: this.paramArray[g2] };
        if (this.sRule != "utf8") {
          k.rule = this.sRule;
        }
        var h2 = new d2(k);
        this.asn1Array.push(h2);
      }
    }
    var j2 = new b2.DERSequence({ array: this.asn1Array });
    this.hTLV = j2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 !== void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.x509.X500Name, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.X500Name.compatToLDAP = function(d2) {
  if (d2.substr(0, 1) !== "/") {
    throw "malformed input";
  }
  d2 = d2.substr(1);
  var c2 = d2.split("/");
  c2.reverse();
  c2 = c2.map(function(a2) {
    return a2.replace(/,/, "\\,");
  });
  return c2.join(",");
};
KJUR.asn1.x509.X500Name.onelineToLDAP = function(a2) {
  return KJUR.asn1.x509.X500Name.compatToLDAP(a2);
};
KJUR.asn1.x509.X500Name.ldapToCompat = function(g2) {
  var c2 = g2.split(",");
  var e2 = false;
  var b2 = [];
  for (var f2 = 0; c2.length > 0; f2++) {
    var h2 = c2.shift();
    if (e2 === true) {
      var d2 = b2.pop();
      var j2 = (d2 + "," + h2).replace(/\\,/g, ",");
      b2.push(j2);
      e2 = false;
    } else {
      b2.push(h2);
    }
    if (h2.substr(-1, 1) === "\\") {
      e2 = true;
    }
  }
  b2 = b2.map(function(a2) {
    return a2.replace("/", "\\/");
  });
  b2.reverse();
  return "/" + b2.join("/");
};
KJUR.asn1.x509.X500Name.ldapToOneline = function(a2) {
  return KJUR.asn1.x509.X500Name.ldapToCompat(a2);
};
KJUR.asn1.x509.RDN = function(b2) {
  KJUR.asn1.x509.RDN.superclass.constructor.call(this);
  this.asn1Array = [];
  this.paramArray = [];
  this.sRule = "utf8";
  var a2 = KJUR.asn1.x509.AttributeTypeAndValue;
  this.setByParam = function(c2) {
    if (c2.rule !== void 0) {
      this.sRule = c2.rule;
    }
    if (c2.str !== void 0) {
      this.addByMultiValuedString(c2.str);
    }
    if (c2.array !== void 0) {
      this.paramArray = c2.array;
    }
  };
  this.addByString = function(c2) {
    this.asn1Array.push(new KJUR.asn1.x509.AttributeTypeAndValue({ str: c2, rule: this.sRule }));
  };
  this.addByMultiValuedString = function(e2) {
    var c2 = KJUR.asn1.x509.RDN.parseString(e2);
    for (var d2 = 0; d2 < c2.length; d2++) {
      this.addByString(c2[d2]);
    }
  };
  this.tohex = function() {
    if (this.asn1Array.length == 0 && this.paramArray.length > 0) {
      for (var d2 = 0; d2 < this.paramArray.length; d2++) {
        var f2 = this.paramArray[d2];
        if (f2.rule !== void 0 && this.sRule != "utf8") {
          f2.rule = this.sRule;
        }
        var c2 = new a2(f2);
        this.asn1Array.push(c2);
      }
    }
    var e2 = new KJUR.asn1.DERSet({ array: this.asn1Array });
    this.TLV = e2.tohex();
    return this.TLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (b2 !== void 0) {
    this.setByParam(b2);
  }
};
extendClass(KJUR.asn1.x509.RDN, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.RDN.parseString = function(m2) {
  var j2 = m2.split(/\+/);
  var h2 = false;
  var c2 = [];
  for (var g2 = 0; j2.length > 0; g2++) {
    var k = j2.shift();
    if (h2 === true) {
      var f2 = c2.pop();
      var d2 = (f2 + "+" + k).replace(/\\\+/g, "+");
      c2.push(d2);
      h2 = false;
    } else {
      c2.push(k);
    }
    if (k.substr(-1, 1) === "\\") {
      h2 = true;
    }
  }
  var l2 = false;
  var b2 = [];
  for (var g2 = 0; c2.length > 0; g2++) {
    var k = c2.shift();
    if (l2 === true) {
      var e2 = b2.pop();
      if (k.match(/"$/)) {
        var d2 = (e2 + "+" + k).replace(/^([^=]+)="(.*)"$/, "$1=$2");
        b2.push(d2);
        l2 = false;
      } else {
        b2.push(e2 + "+" + k);
      }
    } else {
      b2.push(k);
    }
    if (k.match(/^[^=]+="/)) {
      l2 = true;
    }
  }
  return b2;
};
KJUR.asn1.x509.AttributeTypeAndValue = function(c2) {
  KJUR.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);
  this.sRule = "utf8";
  this.sType = null;
  this.sValue = null;
  this.dsType = null;
  var a2 = KJUR, g2 = a2.asn1, d2 = g2.DERSequence, l2 = g2.DERUTF8String, i2 = g2.DERPrintableString, h2 = g2.DERTeletexString, b2 = g2.DERIA5String, e2 = g2.DERVisibleString, k = g2.DERBMPString, f2 = a2.lang.String.isMail, j2 = a2.lang.String.isPrintable;
  this.setByParam = function(o2) {
    if (o2.rule !== void 0) {
      this.sRule = o2.rule;
    }
    if (o2.ds !== void 0) {
      this.dsType = o2.ds;
    }
    if (o2.value === void 0 && o2.str !== void 0) {
      var n2 = o2.str;
      var m2 = n2.match(/^([^=]+)=(.+)$/);
      if (m2) {
        this.sType = m2[1];
        this.sValue = m2[2];
      } else {
        throw new Error("malformed attrTypeAndValueStr: " + attrTypeAndValueStr);
      }
    } else {
      this.sType = o2.type;
      this.sValue = o2.value;
    }
  };
  this.setByString = function(n2, o2) {
    if (o2 !== void 0) {
      this.sRule = o2;
    }
    var m2 = n2.match(/^([^=]+)=(.+)$/);
    if (m2) {
      this.setByAttrTypeAndValueStr(m2[1], m2[2]);
    } else {
      throw new Error("malformed attrTypeAndValueStr: " + attrTypeAndValueStr);
    }
  };
  this._getDsType = function() {
    var o2 = this.sType;
    var n2 = this.sValue;
    var m2 = this.sRule;
    if (m2 === "prn") {
      if (o2 == "CN" && f2(n2)) {
        return "ia5";
      }
      if (j2(n2)) {
        return "prn";
      }
      return "utf8";
    } else {
      if (m2 === "utf8") {
        if (o2 == "CN" && f2(n2)) {
          return "ia5";
        }
        if (o2 == "C") {
          return "prn";
        }
        return "utf8";
      }
    }
    return "utf8";
  };
  this.setByAttrTypeAndValueStr = function(o2, n2, m2) {
    if (m2 !== void 0) {
      this.sRule = m2;
    }
    this.sType = o2;
    this.sValue = n2;
  };
  this.getValueObj = function(n2, m2) {
    if (n2 == "utf8") {
      return new l2({ str: m2 });
    }
    if (n2 == "prn") {
      return new i2({ str: m2 });
    }
    if (n2 == "tel") {
      return new h2({ str: m2 });
    }
    if (n2 == "ia5") {
      return new b2({ str: m2 });
    }
    if (n2 == "vis") {
      return new e2({ str: m2 });
    }
    if (n2 == "bmp") {
      return new k({ str: m2 });
    }
    throw new Error("unsupported directory string type: type=" + n2 + " value=" + m2);
  };
  this.tohex = function() {
    if (this.dsType == null) {
      this.dsType = this._getDsType();
    }
    var n2 = KJUR.asn1.x509.OID.atype2obj(this.sType);
    var m2 = this.getValueObj(this.dsType, this.sValue);
    var p2 = new d2({ array: [n2, m2] });
    this.TLV = p2.tohex();
    return this.TLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (c2 !== void 0) {
    this.setByParam(c2);
  }
};
extendClass(KJUR.asn1.x509.AttributeTypeAndValue, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.SubjectPublicKeyInfo = function(f2) {
  KJUR.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);
  var a2 = KJUR, j2 = a2.asn1, i2 = j2.DERInteger, b2 = j2.DERBitString, m2 = j2.DERObjectIdentifier, e2 = j2.DERSequence, h2 = j2.ASN1Util.newObject, d2 = j2.x509, o2 = d2.AlgorithmIdentifier, g2 = a2.crypto;
  g2.ECDSA;
  g2.DSA;
  this.getASN1Object = function() {
    if (this.asn1AlgId == null || this.asn1SubjPKey == null) {
      throw "algId and/or subjPubKey not set";
    }
    var p2 = new e2({ array: [this.asn1AlgId, this.asn1SubjPKey] });
    return p2;
  };
  this.tohex = function() {
    var p2 = this.getASN1Object();
    this.hTLV = p2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setPubKey = function(q2) {
    try {
      if (q2 instanceof RSAKey) {
        var u2 = h2({ seq: [{ "int": { bigint: q2.n } }, { "int": { "int": q2.e } }] });
        var s2 = u2.tohex();
        this.asn1AlgId = new o2({ name: "rsaEncryption" });
        this.asn1SubjPKey = new b2({ hex: "00" + s2 });
      }
    } catch (p2) {
    }
    try {
      if (q2 instanceof KJUR.crypto.ECDSA) {
        var r2 = new m2({ name: q2.curveName });
        this.asn1AlgId = new o2({ name: "ecPublicKey", asn1params: r2 });
        this.asn1SubjPKey = new b2({ hex: "00" + q2.pubKeyHex });
      }
    } catch (p2) {
    }
    try {
      if (q2 instanceof KJUR.crypto.DSA) {
        var r2 = new h2({ seq: [{ "int": { bigint: q2.p } }, { "int": { bigint: q2.q } }, { "int": { bigint: q2.g } }] });
        this.asn1AlgId = new o2({ name: "dsa", asn1params: r2 });
        var t2 = new i2({ bigint: q2.y });
        this.asn1SubjPKey = new b2({ hex: "00" + t2.tohex() });
      }
    } catch (p2) {
    }
  };
  if (f2 !== void 0) {
    this.setPubKey(f2);
  }
};
extendClass(KJUR.asn1.x509.SubjectPublicKeyInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.Time = function(f2) {
  KJUR.asn1.x509.Time.superclass.constructor.call(this);
  var d2 = KJUR, c2 = d2.asn1, b2 = c2.DERUTCTime, g2 = c2.DERGeneralizedTime;
  this.params = null;
  this.type = null;
  this.setTimeParams = function(h2) {
    this.timeParams = h2;
  };
  this.setByParam = function(h2) {
    this.params = h2;
  };
  this.getType = function(h2) {
    if (h2.match(/^[0-9]{12}Z$/)) {
      return "utc";
    }
    if (h2.match(/^[0-9]{14}Z$/)) {
      return "gen";
    }
    if (h2.match(/^[0-9]{12}\.[0-9]+Z$/)) {
      return "utc";
    }
    if (h2.match(/^[0-9]{14}\.[0-9]+Z$/)) {
      return "gen";
    }
    return null;
  };
  this.tohex = function() {
    var i2 = this.params;
    var h2 = null;
    if (typeof i2 == "string") {
      i2 = { str: i2 };
    }
    if (i2 != null && i2.str && (i2.type == null || i2.type == void 0)) {
      i2.type = this.getType(i2.str);
    }
    if (i2 != null && i2.str) {
      if (i2.type == "utc") {
        h2 = new b2(i2.str);
      }
      if (i2.type == "gen") {
        h2 = new g2(i2.str);
      }
    } else {
      if (this.type == "gen") {
        h2 = new g2();
      } else {
        h2 = new b2();
      }
    }
    if (h2 == null) {
      throw new Error("wrong setting for Time");
    }
    this.TLV = h2.tohex();
    return this.TLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 != void 0) {
    this.setByParam(f2);
  }
};
KJUR.asn1.x509.Time_bak = function(f2) {
  KJUR.asn1.x509.Time_bak.superclass.constructor.call(this);
  var d2 = KJUR, c2 = d2.asn1, b2 = c2.DERUTCTime, g2 = c2.DERGeneralizedTime;
  this.setTimeParams = function(h2) {
    this.timeParams = h2;
  };
  this.tohex = function() {
    var h2 = null;
    if (this.timeParams != null) {
      if (this.type == "utc") {
        h2 = new b2(this.timeParams);
      } else {
        h2 = new g2(this.timeParams);
      }
    } else {
      if (this.type == "utc") {
        h2 = new b2();
      } else {
        h2 = new g2();
      }
    }
    this.TLV = h2.tohex();
    return this.TLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.type = "utc";
  if (f2 !== void 0) {
    if (f2.type !== void 0) {
      this.type = f2.type;
    } else {
      if (f2.str !== void 0) {
        if (f2.str.match(/^[0-9]{12}Z$/)) {
          this.type = "utc";
        }
        if (f2.str.match(/^[0-9]{14}Z$/)) {
          this.type = "gen";
        }
      }
    }
    this.timeParams = f2;
  }
};
extendClass(KJUR.asn1.x509.Time, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.AlgorithmIdentifier = function(e2) {
  KJUR.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this);
  this.nameAlg = null;
  this.asn1Alg = null;
  this.asn1Params = null;
  this.paramEmpty = false;
  var b2 = KJUR, a2 = b2.asn1, c2 = a2.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV;
  this.tohex = function() {
    if (this.nameAlg === null && this.asn1Alg === null) {
      throw new Error("algorithm not specified");
    }
    if (this.nameAlg !== null) {
      var f2 = null;
      for (var h2 in c2) {
        if (h2 === this.nameAlg) {
          f2 = c2[h2];
        }
      }
      if (f2 !== null) {
        this.hTLV = f2;
        return this.hTLV;
      }
    }
    if (this.nameAlg !== null && this.asn1Alg === null) {
      this.asn1Alg = a2.x509.OID.name2obj(this.nameAlg);
    }
    var g2 = [this.asn1Alg];
    if (this.asn1Params !== null) {
      g2.push(this.asn1Params);
    }
    var i2 = new a2.DERSequence({ array: g2 });
    this.hTLV = i2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    if (e2.name !== void 0) {
      this.nameAlg = e2.name;
    }
    if (e2.asn1params !== void 0) {
      this.asn1Params = e2.asn1params;
    }
    if (e2.paramempty !== void 0) {
      this.paramEmpty = e2.paramempty;
    }
  }
  if (this.asn1Params === null && this.paramEmpty === false && this.nameAlg !== null) {
    if (this.nameAlg.name !== void 0) {
      this.nameAlg = this.nameAlg.name;
    }
    var d2 = this.nameAlg.toLowerCase();
    if (d2.substr(-7, 7) !== "withdsa" && d2.substr(-9, 9) !== "withecdsa") {
      this.asn1Params = new a2.DERNull();
    }
  }
};
extendClass(KJUR.asn1.x509.AlgorithmIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV = { SHAwithRSAandMGF1: "300d06092a864886f70d01010a3000", SHA256withRSAandMGF1: "303d06092a864886f70d01010a3030a00d300b0609608648016503040201a11a301806092a864886f70d010108300b0609608648016503040201a203020120", SHA384withRSAandMGF1: "303d06092a864886f70d01010a3030a00d300b0609608648016503040202a11a301806092a864886f70d010108300b0609608648016503040202a203020130", SHA512withRSAandMGF1: "303d06092a864886f70d01010a3030a00d300b0609608648016503040203a11a301806092a864886f70d010108300b0609608648016503040203a203020140" };
KJUR.asn1.x509.GeneralName = function(f2) {
  KJUR.asn1.x509.GeneralName.superclass.constructor.call(this);
  var b2 = KJUR, h2 = b2.asn1, d2 = h2.x509, a2 = d2.X500Name, g2 = d2.OtherName, e2 = h2.DERIA5String;
  h2.DERPrintableString;
  var k = h2.DEROctetString, c2 = h2.DERTaggedObject, m2 = h2.ASN1Object, j2 = Error;
  this.params = null;
  this.setByParam = function(n2) {
    this.params = n2;
  };
  this.tohex = function() {
    var p2 = this.params;
    var A2, y2, q2;
    var y2 = false;
    if (p2.other !== void 0) {
      A2 = "a0", q2 = new g2(p2.other);
    } else {
      if (p2.rfc822 !== void 0) {
        A2 = "81";
        q2 = new e2({ str: p2.rfc822 });
      } else {
        if (p2.dns !== void 0) {
          A2 = "82";
          q2 = new e2({ str: p2.dns });
        } else {
          if (p2.dn !== void 0) {
            A2 = "a4";
            y2 = true;
            if (typeof p2.dn === "string") {
              q2 = new a2({ str: p2.dn });
            } else {
              if (p2.dn instanceof KJUR.asn1.x509.X500Name) {
                q2 = p2.dn;
              } else {
                q2 = new a2(p2.dn);
              }
            }
          } else {
            if (p2.ldapdn !== void 0) {
              A2 = "a4";
              y2 = true;
              q2 = new a2({ ldapstr: p2.ldapdn });
            } else {
              if (p2.certissuer !== void 0 || p2.certsubj !== void 0) {
                A2 = "a4";
                y2 = true;
                var n2, o2;
                var z2 = null;
                if (p2.certsubj !== void 0) {
                  n2 = false;
                  o2 = p2.certsubj;
                } else {
                  n2 = true;
                  o2 = p2.certissuer;
                }
                if (o2.match(/^[0-9A-Fa-f]+$/))
                  ;
                if (o2.indexOf("-----BEGIN ") != -1) {
                  z2 = pemtohex(o2);
                }
                if (z2 == null) {
                  throw new Error("certsubj/certissuer not cert");
                }
                var w2 = new X509();
                w2.hex = z2;
                var s2;
                if (n2) {
                  s2 = w2.getIssuerHex();
                } else {
                  s2 = w2.getSubjectHex();
                }
                q2 = new m2();
                q2.hTLV = s2;
              } else {
                if (p2.uri !== void 0) {
                  A2 = "86";
                  q2 = new e2({ str: p2.uri });
                } else {
                  if (p2.ip !== void 0) {
                    A2 = "87";
                    var v2;
                    var t2 = p2.ip;
                    try {
                      if (t2.match(/^[0-9a-f]+$/)) {
                        var r2 = t2.length;
                        if (r2 == 8 || r2 == 16 || r2 == 32 || r2 == 64) {
                          v2 = t2;
                        } else {
                          throw "err";
                        }
                      } else {
                        v2 = iptohex(t2);
                      }
                    } catch (u2) {
                      throw new j2("malformed IP address: " + p2.ip + ":" + u2.message);
                    }
                    q2 = new k({ hex: v2 });
                  } else {
                    throw new j2("improper params");
                  }
                }
              }
            }
          }
        }
      }
    }
    var B2 = new c2({ tag: A2, explicit: y2, obj: q2 });
    return B2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 !== void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.x509.GeneralName, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.GeneralNames = function(d2) {
  KJUR.asn1.x509.GeneralNames.superclass.constructor.call(this);
  var c2 = KJUR, b2 = c2.asn1;
  this.setByParamArray = function(g2) {
    for (var e2 = 0; e2 < g2.length; e2++) {
      var f2 = new b2.x509.GeneralName(g2[e2]);
      this.asn1Array.push(f2);
    }
  };
  this.tohex = function() {
    var e2 = new b2.DERSequence({ array: this.asn1Array });
    return e2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.asn1Array = new Array();
  if (typeof d2 != "undefined") {
    this.setByParamArray(d2);
  }
};
extendClass(KJUR.asn1.x509.GeneralNames, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.OtherName = function(g2) {
  KJUR.asn1.x509.OtherName.superclass.constructor.call(this);
  var d2 = KJUR, c2 = d2.asn1, h2 = c2.DERObjectIdentifier, a2 = c2.DERSequence, b2 = c2.ASN1Util.newObject;
  this.params = null;
  this.setByParam = function(i2) {
    this.params = i2;
  };
  this.tohex = function() {
    var k = this.params;
    if (k.oid == void 0 || k.value == void 0) {
      throw new Error("oid or value not specified");
    }
    var l2 = new h2({ oid: k.oid });
    var i2 = b2({ tag: { tag: "a0", explicit: true, obj: k.value } });
    var j2 = new a2({ array: [l2, i2] });
    return j2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 !== void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.x509.OtherName, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.OID = new function() {
  var a2 = KJUR.asn1.DERObjectIdentifier;
  this.name2oidList = { "aes128-CBC": "2.16.840.1.101.3.4.1.2", "aes256-CBC": "2.16.840.1.101.3.4.1.42", sha1: "1.3.14.3.2.26", sha256: "2.16.840.1.101.3.4.2.1", sha384: "2.16.840.1.101.3.4.2.2", sha512: "2.16.840.1.101.3.4.2.3", sha224: "2.16.840.1.101.3.4.2.4", md5: "1.2.840.113549.2.5", md2: "1.3.14.7.2.2.1", ripemd160: "1.3.36.3.2.1", hmacWithSHA1: "1.2.840.113549.2.7", hmacWithSHA224: "1.2.840.113549.2.8", hmacWithSHA256: "1.2.840.113549.2.9", hmacWithSHA384: "1.2.840.113549.2.10", hmacWithSHA512: "1.2.840.113549.2.11", MD2withRSA: "1.2.840.113549.1.1.2", MD4withRSA: "1.2.840.113549.1.1.3", MD5withRSA: "1.2.840.113549.1.1.4", SHA1withRSA: "1.2.840.113549.1.1.5", "pkcs1-MGF": "1.2.840.113549.1.1.8", rsaPSS: "1.2.840.113549.1.1.10", SHA224withRSA: "1.2.840.113549.1.1.14", SHA256withRSA: "1.2.840.113549.1.1.11", SHA384withRSA: "1.2.840.113549.1.1.12", SHA512withRSA: "1.2.840.113549.1.1.13", SHA1withECDSA: "1.2.840.10045.4.1", SHA224withECDSA: "1.2.840.10045.4.3.1", SHA256withECDSA: "1.2.840.10045.4.3.2", SHA384withECDSA: "1.2.840.10045.4.3.3", SHA512withECDSA: "1.2.840.10045.4.3.4", dsa: "1.2.840.10040.4.1", SHA1withDSA: "1.2.840.10040.4.3", SHA224withDSA: "2.16.840.1.101.3.4.3.1", SHA256withDSA: "2.16.840.1.101.3.4.3.2", rsaEncryption: "1.2.840.113549.1.1.1", commonName: "2.5.4.3", countryName: "2.5.4.6", localityName: "2.5.4.7", stateOrProvinceName: "2.5.4.8", streetAddress: "2.5.4.9", organizationName: "2.5.4.10", organizationalUnitName: "2.5.4.11", domainComponent: "0.9.2342.19200300.100.1.25", userId: "0.9.2342.19200300.100.1.1", surname: "2.5.4.4", givenName: "2.5.4.42", title: "2.5.4.12", distinguishedName: "2.5.4.49", emailAddress: "1.2.840.113549.1.9.1", description: "2.5.4.13", businessCategory: "2.5.4.15", postalCode: "2.5.4.17", uniqueIdentifier: "2.5.4.45", organizationIdentifier: "2.5.4.97", jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1", jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2", jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3", subjectDirectoryAttributes: "2.5.29.9", subjectKeyIdentifier: "2.5.29.14", keyUsage: "2.5.29.15", subjectAltName: "2.5.29.17", issuerAltName: "2.5.29.18", basicConstraints: "2.5.29.19", cRLNumber: "2.5.29.20", cRLReason: "2.5.29.21", nameConstraints: "2.5.29.30", cRLDistributionPoints: "2.5.29.31", certificatePolicies: "2.5.29.32", anyPolicy: "2.5.29.32.0", policyMappings: "2.5.29.33", authorityKeyIdentifier: "2.5.29.35", policyConstraints: "2.5.29.36", extKeyUsage: "2.5.29.37", inhibitAnyPolicy: "2.5.29.54", authorityInfoAccess: "1.3.6.1.5.5.7.1.1", ocsp: "1.3.6.1.5.5.7.48.1", ocspBasic: "1.3.6.1.5.5.7.48.1.1", ocspNonce: "1.3.6.1.5.5.7.48.1.2", ocspNoCheck: "1.3.6.1.5.5.7.48.1.5", caIssuers: "1.3.6.1.5.5.7.48.2", anyExtendedKeyUsage: "2.5.29.37.0", serverAuth: "1.3.6.1.5.5.7.3.1", clientAuth: "1.3.6.1.5.5.7.3.2", codeSigning: "1.3.6.1.5.5.7.3.3", emailProtection: "1.3.6.1.5.5.7.3.4", timeStamping: "1.3.6.1.5.5.7.3.8", ocspSigning: "1.3.6.1.5.5.7.3.9", smtpUTF8Mailbox: "1.3.6.1.5.5.7.8.9", dateOfBirth: "1.3.6.1.5.5.7.9.1", placeOfBirth: "1.3.6.1.5.5.7.9.2", gender: "1.3.6.1.5.5.7.9.3", countryOfCitizenship: "1.3.6.1.5.5.7.9.4", countryOfResidence: "1.3.6.1.5.5.7.9.5", ecPublicKey: "1.2.840.10045.2.1", "P-256": "1.2.840.10045.3.1.7", secp256r1: "1.2.840.10045.3.1.7", secp256k1: "1.3.132.0.10", secp384r1: "1.3.132.0.34", secp521r1: "1.3.132.0.35", pkcs5PBES2: "1.2.840.113549.1.5.13", pkcs5PBKDF2: "1.2.840.113549.1.5.12", "des-EDE3-CBC": "1.2.840.113549.3.7", data: "1.2.840.113549.1.7.1", "signed-data": "1.2.840.113549.1.7.2", "enveloped-data": "1.2.840.113549.1.7.3", "digested-data": "1.2.840.113549.1.7.5", "encrypted-data": "1.2.840.113549.1.7.6", "authenticated-data": "1.2.840.113549.1.9.16.1.2", tstinfo: "1.2.840.113549.1.9.16.1.4", signingCertificate: "1.2.840.113549.1.9.16.2.12", timeStampToken: "1.2.840.113549.1.9.16.2.14", signaturePolicyIdentifier: "1.2.840.113549.1.9.16.2.15", etsArchiveTimeStamp: "1.2.840.113549.1.9.16.2.27", signingCertificateV2: "1.2.840.113549.1.9.16.2.47", etsArchiveTimeStampV2: "1.2.840.113549.1.9.16.2.48", extensionRequest: "1.2.840.113549.1.9.14", contentType: "1.2.840.113549.1.9.3", messageDigest: "1.2.840.113549.1.9.4", signingTime: "1.2.840.113549.1.9.5", counterSignature: "1.2.840.113549.1.9.6", archiveTimeStampV3: "0.4.0.1733.2.4", pdfRevocationInfoArchival: "1.2.840.113583.1.1.8", adobeTimeStamp: "1.2.840.113583.1.1.9.1", smimeMailboxLegacy: "2.23.140.1.5.1.1", smimeMailboxMulti: "2.23.140.1.5.1.2", smimeMailboxStrict: "2.23.140.1.5.1.3", smimeOrganizationLegacy: "2.23.140.1.5.2.1", smimeOrganizationMulti: "2.23.140.1.5.2.2", smimeOrganizationStrict: "2.23.140.1.5.2.3", smimeSponsorLegacy: "2.23.140.1.5.3.1", smimeSponsorMulti: "2.23.140.1.5.3.2", smimeSponsorStrict: "2.23.140.1.5.3.3", smimeIndividualLegacy: "2.23.140.1.5.4.1", smimeIndividualMulti: "2.23.140.1.5.4.2", smimeIndividualStrict: "2.23.140.1.5.4.3" };
  this.atype2oidList = { CN: "2.5.4.3", L: "2.5.4.7", ST: "2.5.4.8", O: "2.5.4.10", OU: "2.5.4.11", C: "2.5.4.6", STREET: "2.5.4.9", DC: "0.9.2342.19200300.100.1.25", UID: "0.9.2342.19200300.100.1.1", SN: "2.5.4.4", T: "2.5.4.12", GN: "2.5.4.42", DN: "2.5.4.49", E: "1.2.840.113549.1.9.1", description: "2.5.4.13", businessCategory: "2.5.4.15", postalCode: "2.5.4.17", serialNumber: "2.5.4.5", uniqueIdentifier: "2.5.4.45", organizationIdentifier: "2.5.4.97", jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1", jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2", jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3" };
  this.objCache = {};
  this.name2obj = function(b2) {
    if (typeof this.objCache[b2] != "undefined") {
      return this.objCache[b2];
    }
    if (typeof this.name2oidList[b2] == "undefined") {
      throw "Name of ObjectIdentifier not defined: " + b2;
    }
    var c2 = this.name2oidList[b2];
    var d2 = new a2({ oid: c2 });
    this.objCache[b2] = d2;
    return d2;
  };
  this.atype2obj = function(b2) {
    if (this.objCache[b2] !== void 0) {
      return this.objCache[b2];
    }
    var c2;
    if (b2.match(/^\d+\.\d+\.[0-9.]+$/)) {
      c2 = b2;
    } else {
      if (this.atype2oidList[b2] !== void 0) {
        c2 = this.atype2oidList[b2];
      } else {
        if (this.name2oidList[b2] !== void 0) {
          c2 = this.name2oidList[b2];
        } else {
          throw new Error("AttributeType name undefined: " + b2);
        }
      }
    }
    var d2 = new a2({ oid: c2 });
    this.objCache[b2] = d2;
    return d2;
  };
  this.registerOIDs = function(b2) {
    if (!this.checkOIDs(b2)) {
      return;
    }
    for (var c2 in b2) {
      this.name2oidList[c2] = b2[c2];
    }
  };
  this.checkOIDs = function(b2) {
    try {
      var d2 = Object.keys(b2);
      if (d2.length == 0) {
        return false;
      }
      d2.map(function(g2, e2, h2) {
        var f2 = this[g2];
        if (!f2.match(/^[0-2]\.[0-9.]+$/)) {
          throw new Error("value is not OID");
        }
      }, b2);
      return true;
    } catch (c2) {
      return false;
    }
  };
}();
KJUR.asn1.x509.OID.oid2name = function(b2) {
  var c2 = KJUR.asn1.x509.OID.name2oidList;
  for (var a2 in c2) {
    if (c2[a2] == b2) {
      return a2;
    }
  }
  return "";
};
KJUR.asn1.x509.OID.oid2atype = function(b2) {
  var c2 = KJUR.asn1.x509.OID.atype2oidList;
  for (var a2 in c2) {
    if (c2[a2] == b2) {
      return a2;
    }
  }
  return b2;
};
KJUR.asn1.x509.OID.name2oid = function(a2) {
  if (a2.match(/^[0-9.]+$/)) {
    return a2;
  }
  var b2 = KJUR.asn1.x509.OID.name2oidList;
  if (b2[a2] === void 0) {
    return "";
  }
  return b2[a2];
};
KJUR.asn1.x509.X509Util = {};
KJUR.asn1.x509.X509Util.newCertPEM = function(e2) {
  var d2 = KJUR.asn1.x509;
  d2.TBSCertificate;
  var a2 = d2.Certificate;
  var c2 = new a2(e2);
  return c2.getPEM();
};
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.cms == "undefined" || !KJUR.asn1.cms) {
  KJUR.asn1.cms = {};
}
KJUR.asn1.cms.Attribute = function(f2) {
  var e2 = Error, d2 = KJUR, c2 = d2.asn1, b2 = c2.DERSequence, a2 = c2.DERSet, g2 = c2.DERObjectIdentifier;
  this.params = null;
  this.typeOid = null;
  this.setByParam = function(h2) {
    this.params = h2;
  };
  this.getValueArray = function() {
    throw new e2("not yet implemented abstract");
  };
  this.tohex = function() {
    var j2 = new g2({ oid: this.typeOid });
    var h2 = new a2({ array: this.getValueArray() });
    var i2 = new b2({ array: [j2, h2] });
    return i2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
};
extendClass(KJUR.asn1.cms.Attribute, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.ContentType = function(c2) {
  var b2 = KJUR, a2 = b2.asn1;
  a2.cms.ContentType.superclass.constructor.call(this);
  this.typeOid = "1.2.840.113549.1.9.3";
  this.getValueArray = function() {
    var d2 = new a2.DERObjectIdentifier(this.params.type);
    return [d2];
  };
  if (c2 != void 0) {
    this.setByParam(c2);
  }
};
extendClass(KJUR.asn1.cms.ContentType, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.MessageDigest = function(e2) {
  var b2 = KJUR, a2 = b2.asn1, c2 = a2.DEROctetString, d2 = a2.cms;
  d2.MessageDigest.superclass.constructor.call(this);
  this.typeOid = "1.2.840.113549.1.9.4";
  this.getValueArray = function() {
    var f2 = new c2(this.params);
    return [f2];
  };
  if (e2 != void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.cms.MessageDigest, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.SigningTime = function(c2) {
  var b2 = KJUR, a2 = b2.asn1;
  a2.cms.SigningTime.superclass.constructor.call(this);
  this.typeOid = "1.2.840.113549.1.9.5";
  this.getValueArray = function() {
    var d2 = new a2.x509.Time(this.params);
    return [d2];
  };
  if (c2 != void 0) {
    this.setByParam(c2);
  }
};
extendClass(KJUR.asn1.cms.SigningTime, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.SigningCertificate = function(h2) {
  var e2 = Error, d2 = KJUR, c2 = d2.asn1, b2 = c2.DERSequence, g2 = c2.cms, a2 = g2.ESSCertID;
  d2.crypto;
  g2.SigningCertificate.superclass.constructor.call(this);
  this.typeOid = "1.2.840.113549.1.9.16.2.12";
  this.getValueArray = function() {
    if (this.params == null || this.params == void 0 || this.params.array == void 0) {
      throw new e2("parameter 'array' not specified");
    }
    var o2 = this.params.array;
    var k = [];
    for (var l2 = 0; l2 < o2.length; l2++) {
      var n2 = o2[l2];
      if (h2.hasis == false && (typeof n2 == "string" && (n2.indexOf("-----BEGIN") != -1 || ASN1HEX.isASN1HEX(n2)))) {
        n2 = { cert: n2 };
      }
      if (n2.hasis != false && h2.hasis == false) {
        n2.hasis = false;
      }
      k.push(new a2(n2));
    }
    var j2 = new b2({ array: k });
    var m2 = new b2({ array: [j2] });
    return [m2];
  };
  if (h2 != void 0) {
    this.setByParam(h2);
  }
};
extendClass(KJUR.asn1.cms.SigningCertificate, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.ESSCertID = function(g2) {
  KJUR.asn1.cms.ESSCertID.superclass.constructor.call(this);
  var d2 = Error, c2 = KJUR, b2 = c2.asn1, f2 = b2.DEROctetString, a2 = b2.DERSequence, e2 = b2.cms.IssuerSerial;
  this.params = null;
  this.getCertHash = function(k, h2) {
    if (k.hash != void 0) {
      return k.hash;
    }
    if (typeof k == "string" && k.indexOf("-----BEGIN") == -1 && !ASN1HEX.isASN1HEX(k)) {
      return k;
    }
    var i2;
    if (typeof k == "string") {
      i2 = k;
    } else {
      if (k.cert != void 0) {
        i2 = k.cert;
      } else {
        throw new d2("hash nor cert unspecified");
      }
    }
    var j2;
    if (i2.indexOf("-----BEGIN") != -1) {
      j2 = pemtohex(i2);
    } else {
      j2 = i2;
    }
    if (typeof k == "string") {
      if (k.indexOf("-----BEGIN") != -1) {
        j2 = pemtohex(k);
      } else {
        if (ASN1HEX.isASN1HEX(k)) {
          j2 = k;
        }
      }
    }
    var l2;
    if (k.alg != void 0) {
      l2 = k.alg;
    } else {
      if (h2 != void 0) {
        l2 = h2;
      } else {
        throw new d2("hash alg unspecified");
      }
    }
    return c2.crypto.Util.hashHex(j2, l2);
  };
  this.tohex = function() {
    var k = this.params;
    var j2 = this.getCertHash(k, "sha1");
    var h2 = [];
    h2.push(new f2({ hex: j2 }));
    if (typeof k == "string" && k.indexOf("-----BEGIN") != -1 || k.cert != void 0 && k.hasis != false || k.issuer != void 0 && k.serial != void 0) {
      h2.push(new e2(k));
    }
    var i2 = new a2({ array: h2 });
    return i2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 != void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.cms.ESSCertID, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.SigningCertificateV2 = function(d2) {
  var h2 = Error, a2 = KJUR, g2 = a2.asn1, e2 = g2.DERSequence;
  g2.x509;
  var i2 = g2.cms, c2 = i2.ESSCertIDv2;
  a2.crypto;
  i2.SigningCertificateV2.superclass.constructor.call(this);
  this.typeOid = "1.2.840.113549.1.9.16.2.47";
  this.getValueArray = function() {
    if (this.params == null || this.params == void 0 || this.params.array == void 0) {
      throw new h2("parameter 'array' not specified");
    }
    var o2 = this.params.array;
    var l2 = [];
    for (var m2 = 0; m2 < o2.length; m2++) {
      var n2 = o2[m2];
      if ((d2.alg != void 0 || d2.hasis == false) && (typeof n2 == "string" && (n2.indexOf("-----BEGIN") != -1 || ASN1HEX.isASN1HEX(n2)))) {
        n2 = { cert: n2 };
      }
      if (n2.alg == void 0 && d2.alg != void 0) {
        n2.alg = d2.alg;
      }
      if (n2.hasis != false && d2.hasis == false) {
        n2.hasis = false;
      }
      l2.push(new c2(n2));
    }
    var k = new e2({ array: l2 });
    var j2 = new e2({ array: [k] });
    return [j2];
  };
  if (d2 != void 0) {
    this.setByParam(d2);
  }
};
extendClass(KJUR.asn1.cms.SigningCertificateV2, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.ESSCertIDv2 = function(h2) {
  KJUR.asn1.cms.ESSCertIDv2.superclass.constructor.call(this);
  var c2 = KJUR, b2 = c2.asn1, f2 = b2.DEROctetString, a2 = b2.DERSequence, e2 = b2.cms.IssuerSerial, g2 = b2.x509.AlgorithmIdentifier;
  this.params = null;
  this.tohex = function() {
    var l2 = this.params;
    var k = this.getCertHash(l2, "sha256");
    var i2 = [];
    if (l2.alg != void 0 && l2.alg != "sha256") {
      i2.push(new g2({ name: l2.alg }));
    }
    i2.push(new f2({ hex: k }));
    if (typeof l2 == "string" && l2.indexOf("-----BEGIN") != -1 || l2.cert != void 0 && l2.hasis != false || l2.issuer != void 0 && l2.serial != void 0) {
      i2.push(new e2(l2));
    }
    var j2 = new a2({ array: i2 });
    return j2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (h2 != void 0) {
    this.setByParam(h2);
  }
};
extendClass(KJUR.asn1.cms.ESSCertIDv2, KJUR.asn1.cms.ESSCertID);
KJUR.asn1.cms.IssuerSerial = function(e2) {
  var i2 = Error, c2 = KJUR, h2 = c2.asn1, g2 = h2.DERInteger, f2 = h2.DERSequence, j2 = h2.cms, d2 = h2.x509, a2 = d2.GeneralNames, b2 = X509;
  j2.IssuerSerial.superclass.constructor.call(this);
  this.setByParam = function(k) {
    this.params = k;
  };
  this.tohex = function() {
    var p2 = this.params;
    var l2, r2;
    if (typeof p2 == "string" && p2.indexOf("-----BEGIN") != -1 || p2.cert != void 0) {
      var n2;
      if (p2.cert != void 0) {
        n2 = p2.cert;
      } else {
        n2 = p2;
      }
      var k = new b2();
      k.readCertPEM(n2);
      l2 = k.getIssuer();
      r2 = { hex: k.getSerialNumberHex() };
    } else {
      if (p2.issuer != void 0 && p2.serial) {
        l2 = p2.issuer;
        r2 = p2.serial;
      } else {
        throw new i2("cert or issuer and serial parameter not specified");
      }
    }
    var q2 = new a2([{ dn: l2 }]);
    var o2 = new g2(r2);
    var m2 = new f2({ array: [q2, o2] });
    return m2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 != void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.cms.IssuerSerial, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.SignerIdentifier = function(f2) {
  var c2 = KJUR, i2 = c2.asn1;
  i2.DERInteger;
  i2.DERSequence;
  var l2 = i2.cms, k = l2.IssuerAndSerialNumber, d2 = l2.SubjectKeyIdentifier, e2 = i2.x509;
  e2.X500Name;
  l2.SignerIdentifier.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var o2 = this.params;
    if (o2.type == "isssn") {
      var m2 = new k(o2);
      return m2.tohex();
    } else {
      if (o2.type == "skid") {
        var n2 = new d2(o2);
        return n2.tohex();
      } else {
        throw new Error("wrong property for isssn or skid");
      }
    }
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 != void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.cms.SignerIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.IssuerAndSerialNumber = function(e2) {
  var c2 = KJUR, h2 = c2.asn1, g2 = h2.DERInteger, f2 = h2.DERSequence, j2 = h2.cms, d2 = h2.x509, a2 = d2.X500Name, b2 = X509, i2 = Error;
  j2.IssuerAndSerialNumber.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var p2 = this.params;
    var l2, r2;
    if (typeof p2 == "string" && p2.indexOf("-----BEGIN") != -1 || p2.cert != void 0) {
      var n2;
      if (p2.cert != void 0) {
        n2 = p2.cert;
      } else {
        n2 = p2;
      }
      var k = new b2();
      k.readCertPEM(n2);
      l2 = k.getIssuer();
      r2 = { hex: k.getSerialNumberHex() };
    } else {
      if (p2.issuer != void 0 && p2.serial) {
        l2 = p2.issuer;
        r2 = p2.serial;
      } else {
        throw new i2("cert or issuer and serial parameter not specified");
      }
    }
    var q2 = new a2(l2);
    var o2 = new g2(r2);
    var m2 = new f2({ array: [q2, o2] });
    return m2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setByParam = function(k) {
    this.params = k;
  };
  if (e2 != void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.cms.IssuerAndSerialNumber, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.SubjectKeyIdentifier = function(g2) {
  var d2 = KJUR, k = d2.asn1;
  k.DERInteger;
  k.DERSequence;
  var j2 = k.ASN1Util.newObject, m2 = k.cms;
  m2.IssuerAndSerialName;
  m2.SubjectKeyIdentifier;
  var e2 = k.x509;
  e2.X500Name;
  var b2 = X509, l2 = Error;
  m2.SubjectKeyIdentifier.superclass.constructor.call(this);
  this.tohex = function() {
    var r2 = this.params;
    if (r2.cert == void 0 && r2.skid == void 0) {
      throw new l2("property cert nor skid undefined");
    }
    var q2;
    if (r2.cert != void 0) {
      var n2 = new b2(r2.cert);
      var o2 = n2.getExtSubjectKeyIdentifier();
      q2 = o2.kid.hex;
    } else {
      if (r2.skid != void 0) {
        q2 = r2.skid;
      }
    }
    var p2 = j2({ tag: { tage: "a0", obj: { octstr: { hex: q2 } } } });
    return p2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 != void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.cms.SubjectKeyIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.AttributeList = function(f2) {
  var d2 = Error, c2 = KJUR, b2 = c2.asn1, a2 = b2.DERSet, e2 = b2.cms;
  e2.AttributeList.superclass.constructor.call(this);
  this.params = null;
  this.hTLV = null;
  this.setByParam = function(g2) {
    this.params = g2;
  };
  this.tohex = function() {
    var o2 = this.params;
    if (this.hTLV != null) {
      return this.hTLV;
    }
    var m2 = true;
    if (o2.sortflag != void 0) {
      m2 = o2.sortflag;
    }
    var j2 = o2.array;
    var g2 = [];
    for (var l2 = 0; l2 < j2.length; l2++) {
      var n2 = j2[l2];
      var k = n2.attr;
      if (k == "contentType") {
        g2.push(new e2.ContentType(n2));
      } else {
        if (k == "messageDigest") {
          g2.push(new e2.MessageDigest(n2));
        } else {
          if (k == "signingTime") {
            g2.push(new e2.SigningTime(n2));
          } else {
            if (k == "signingCertificate") {
              g2.push(new e2.SigningCertificate(n2));
            } else {
              if (k == "signingCertificateV2") {
                g2.push(new e2.SigningCertificateV2(n2));
              } else {
                if (k == "signaturePolicyIdentifier") {
                  g2.push(new KJUR.asn1.cades.SignaturePolicyIdentifier(n2));
                } else {
                  if (k == "signatureTimeStamp" || k == "timeStampToken") {
                    g2.push(new KJUR.asn1.cades.SignatureTimeStamp(n2));
                  } else {
                    throw new d2("unknown attr: " + k);
                  }
                }
              }
            }
          }
        }
      }
    }
    var h2 = new a2({ array: g2, sortflag: m2 });
    this.hTLV = h2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 != void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.cms.AttributeList, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.SignerInfo = function(q2) {
  var n2 = Error, r2 = KJUR, i2 = r2.asn1, c2 = i2.DERInteger, f2 = i2.DEROctetString, h2 = i2.DERSequence, m2 = i2.DERTaggedObject, k = i2.cms, p2 = k.SignerIdentifier, l2 = k.AttributeList;
  k.ContentType;
  k.EncapsulatedContentInfo;
  k.MessageDigest;
  k.SignedData;
  var a2 = i2.x509, s2 = a2.AlgorithmIdentifier, b2 = r2.crypto, o2 = KEYUTIL;
  k.SignerInfo.superclass.constructor.call(this);
  this.params = null;
  this.sign = function() {
    var y2 = this.params;
    var x = y2.sigalg;
    var u2 = new l2(y2.sattrs).tohex();
    var v2 = o2.getKey(y2.signkey);
    var w2 = new b2.Signature({ alg: x });
    w2.init(v2);
    w2.updateHex(u2);
    var t2 = w2.sign();
    y2.sighex = t2;
  };
  this.tohex = function() {
    var w2 = this.params;
    var t2 = [];
    t2.push(new c2({ "int": w2.version }));
    t2.push(new p2(w2.id));
    t2.push(new s2({ name: w2.hashalg }));
    if (w2.sattrs != void 0) {
      var x = new l2(w2.sattrs);
      try {
        t2.push(new m2({ tag: "a0", explicit: false, obj: x }));
      } catch (v2) {
        throw new n2("si sattr error: " + v2);
      }
    }
    if (w2.sigalgfield != void 0) {
      t2.push(new s2({ name: w2.sigalgfield }));
    } else {
      t2.push(new s2({ name: w2.sigalg }));
    }
    if (w2.sighex == void 0 && w2.signkey != void 0) {
      this.sign();
    }
    t2.push(new f2({ hex: w2.sighex }));
    if (w2.uattrs != void 0) {
      var x = new l2(w2.uattrs);
      try {
        t2.push(new m2({ tag: "a1", explicit: false, obj: x }));
      } catch (v2) {
        throw new n2("si uattr error: " + v2);
      }
    }
    var u2 = new h2({ array: t2 });
    return u2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (q2 != void 0) {
    this.setByParam(q2);
  }
};
extendClass(KJUR.asn1.cms.SignerInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.EncapsulatedContentInfo = function(g2) {
  var c2 = KJUR, b2 = c2.asn1, e2 = b2.DERTaggedObject, a2 = b2.DERSequence, h2 = b2.DERObjectIdentifier, d2 = b2.DEROctetString, f2 = b2.cms;
  f2.EncapsulatedContentInfo.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var m2 = this.params;
    var i2 = [];
    i2.push(new h2(m2.type));
    if (m2.content != void 0 && (m2.content.hex != void 0 || m2.content.str != void 0) && m2.isDetached != true) {
      var k = new d2(m2.content);
      var l2 = new e2({ tag: "a0", explicit: true, obj: k });
      i2.push(l2);
    }
    var j2 = new a2({ array: i2 });
    return j2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setByParam = function(i2) {
    this.params = i2;
  };
  if (g2 != void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.cms.EncapsulatedContentInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.ContentInfo = function(g2) {
  var c2 = KJUR, b2 = c2.asn1, d2 = b2.DERTaggedObject, a2 = b2.DERSequence, h2 = b2.DERObjectIdentifier, f2 = b2.x509;
  f2.OID.name2obj;
  KJUR.asn1.cms.ContentInfo.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var l2 = this.params;
    var i2 = [];
    i2.push(new h2(l2.type));
    var k = new d2({ tag: "a0", explicit: true, obj: l2.obj });
    i2.push(k);
    var j2 = new a2({ array: i2 });
    return j2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setByParam = function(i2) {
    this.params = i2;
  };
  if (g2 != void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.cms.ContentInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.SignedData = function(e2) {
  var a2 = KJUR, h2 = a2.asn1;
  h2.ASN1Object;
  var g2 = h2.DERInteger, p2 = h2.DERSet, f2 = h2.DERSequence;
  h2.DERTaggedObject;
  var o2 = h2.cms, l2 = o2.EncapsulatedContentInfo, d2 = o2.SignerInfo, q2 = o2.ContentInfo, k = o2.CertificateSet, i2 = o2.RevocationInfoChoices, c2 = h2.x509, n2 = c2.AlgorithmIdentifier;
  KJUR.asn1.cms.SignedData.superclass.constructor.call(this);
  this.params = null;
  this.checkAndFixParam = function() {
    var r2 = this.params;
    this._setDigestAlgs(r2);
    this._setContentTypeByEContent(r2);
    this._setMessageDigestByEContent(r2);
    this._setSignerInfoVersion(r2);
    this._setSignedDataVersion(r2);
  };
  this._setDigestAlgs = function(v2) {
    var u2 = {};
    var t2 = v2.sinfos;
    for (var r2 = 0; r2 < t2.length; r2++) {
      var s2 = t2[r2];
      u2[s2.hashalg] = 1;
    }
    v2.hashalgs = Object.keys(u2).sort();
  };
  this._setContentTypeByEContent = function(w2) {
    var u2 = w2.econtent.type;
    var v2 = w2.sinfos;
    for (var r2 = 0; r2 < v2.length; r2++) {
      var t2 = v2[r2];
      var s2 = this._getAttrParamByName(t2, "contentType");
      s2.type = u2;
    }
  };
  this._setMessageDigestByEContent = function(r2) {
    var v2 = r2.econtent;
    r2.econtent.type;
    var x = v2.content.hex;
    if (x == void 0 && v2.type == "data" && v2.content.str != void 0) {
      x = rstrtohex(v2.content.str);
    }
    var A2 = r2.sinfos;
    for (var u2 = 0; u2 < A2.length; u2++) {
      var t2 = A2[u2];
      var s2 = t2.hashalg;
      var z2 = this._getAttrParamByName(t2, "messageDigest");
      var w2 = KJUR.crypto.Util.hashHex(x, s2);
      z2.hex = w2;
    }
  };
  this._getAttrParamByName = function(t2, s2) {
    var u2 = t2.sattrs.array;
    for (var r2 = 0; r2 < u2.length; r2++) {
      if (u2[r2].attr == s2) {
        return u2[r2];
      }
    }
  };
  this._setSignerInfoVersion = function(v2) {
    var t2 = v2.sinfos;
    for (var r2 = 0; r2 < t2.length; r2++) {
      var s2 = t2[r2];
      var u2 = 1;
      if (s2.id.type == "skid") {
        u2 = 3;
      }
      s2.version = u2;
    }
  };
  this._setSignedDataVersion = function(s2) {
    var r2 = this._getSignedDataVersion(s2);
    s2.version = r2;
  };
  this._getSignedDataVersion = function(w2) {
    if (w2.revinfos != void 0) {
      var r2 = w2.revinfos;
      for (var t2 = 0; t2 < r2.length; t2++) {
        var s2 = r2[t2];
        if (s2.ocsp != void 0) {
          return 5;
        }
      }
    }
    var v2 = w2.sinfos;
    for (var t2 = 0; t2 < v2.length; t2++) {
      var u2 = w2.sinfos[t2];
      if (u2.version == 3) {
        return 3;
      }
    }
    if (w2.econtent.type != "data") {
      return 3;
    }
    return 1;
  };
  this.tohex = function() {
    var y2 = this.params;
    if (this.getEncodedHexPrepare != void 0) {
      this.getEncodedHexPrepare();
    }
    if (y2.fixed != true) {
      this.checkAndFixParam();
    }
    var r2 = [];
    r2.push(new g2({ "int": y2.version }));
    var w2 = [];
    for (var v2 = 0; v2 < y2.hashalgs.length; v2++) {
      var t2 = y2.hashalgs[v2];
      w2.push(new n2({ name: t2 }));
    }
    r2.push(new p2({ array: w2 }));
    r2.push(new l2(y2.econtent));
    if (y2.certs != void 0) {
      r2.push(new k(y2.certs));
    }
    if (y2.revinfos != void 0) {
      r2.push(new i2(y2.revinfos));
    }
    var u2 = [];
    for (var v2 = 0; v2 < y2.sinfos.length; v2++) {
      var x = y2.sinfos[v2];
      u2.push(new d2(x));
    }
    r2.push(new p2({ array: u2 }));
    var s2 = new f2({ array: r2 });
    return s2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.getContentInfo = function() {
    var r2 = new q2({ type: "signed-data", obj: this });
    return r2;
  };
  this.getContentInfoEncodedHex = function() {
    return this.getContentInfo().tohex();
  };
  if (e2 != void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.cms.SignedData, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.CertificateSet = function(f2) {
  KJUR.asn1.cms.CertificateSet.superclass.constructor.call(this);
  var c2 = Error, b2 = KJUR.asn1, e2 = b2.DERTaggedObject, a2 = b2.DERSet, d2 = b2.ASN1Object;
  this.params = null;
  this.tohex = function() {
    var j2 = this.params;
    var p2 = [];
    var q2;
    if (j2 instanceof Array) {
      q2 = j2;
    } else {
      if (j2.array != void 0) {
        q2 = j2.array;
      } else {
        throw new c2("cert array not specified");
      }
    }
    for (var k = 0; k < q2.length; k++) {
      var l2 = q2[k];
      var n2 = pemtohex(l2);
      var g2 = new d2();
      g2.hTLV = n2;
      p2.push(g2);
    }
    var m2 = { array: p2 };
    if (j2.sortflag == false) {
      m2.sortflag = false;
    }
    var o2 = new a2(m2);
    var h2 = new e2({ tag: "a0", explicit: false, obj: o2 });
    return h2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 != void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.cms.CertificateSet, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.RevocationInfoChoices = function(a2) {
  KJUR.asn1.cms.RevocationInfoChoices.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var e2 = this.params;
    if (!e2 instanceof Array) {
      throw new Error("params is not array");
    }
    var b2 = [];
    for (var c2 = 0; c2 < e2.length; c2++) {
      b2.push(new KJUR.asn1.cms.RevocationInfoChoice(e2[c2]));
    }
    var d2 = KJUR.asn1.ASN1Util.newObject({ tag: { tagi: "a1", obj: { set: b2 } } });
    return d2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (a2 != void 0) {
    this.setByParam(a2);
  }
};
extendClass(KJUR.asn1.cms.RevocationInfoChoices, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.RevocationInfoChoice = function(a2) {
  KJUR.asn1.cms.RevocationInfoChoice.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var d2 = this.params;
    if (d2.crl != void 0 && typeof d2.crl == "string") {
      var b2 = d2.crl;
      if (d2.crl.indexOf("-----BEGIN") != -1) {
        b2 = pemtohex(d2.crl);
      }
      return b2;
    } else {
      if (d2.ocsp != void 0) {
        var c2 = KJUR.asn1.ASN1Util.newObject({ tag: { tagi: "a1", obj: new KJUR.asn1.cms.OtherRevocationFormat(d2) } });
        return c2.tohex();
      } else {
        throw new Error("property crl or ocsp undefined");
      }
    }
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (a2 != void 0) {
    this.setByParam(a2);
  }
};
extendClass(KJUR.asn1.cms.RevocationInfoChoice, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.OtherRevocationFormat = function(f2) {
  KJUR.asn1.cms.OtherRevocationFormat.superclass.constructor.call(this);
  var d2 = Error, c2 = KJUR, b2 = c2.asn1, a2 = b2.ASN1Util.newObject, e2 = c2.lang.String.isHex;
  this.params = null;
  this.tohex = function() {
    var h2 = this.params;
    if (h2.ocsp == void 0) {
      throw new d2("property ocsp not specified");
    }
    if (!e2(h2.ocsp) || !ASN1HEX.isASN1HEX(h2.ocsp)) {
      throw new d2("ocsp value not ASN.1 hex string");
    }
    var g2 = a2({ seq: [{ oid: "1.3.6.1.5.5.7.16.2" }, { asn1: { tlv: h2.ocsp } }] });
    return g2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 != void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.cms.OtherRevocationFormat, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.CMSUtil = new function() {
}();
KJUR.asn1.cms.CMSUtil.newSignedData = function(a2) {
  return new KJUR.asn1.cms.SignedData(a2);
};
KJUR.asn1.cms.CMSUtil.verifySignedData = function(n2) {
  var C2 = KJUR, p2 = C2.asn1, s2 = p2.cms;
  s2.SignerInfo;
  s2.SignedData;
  s2.SigningTime;
  s2.SigningCertificate;
  s2.SigningCertificateV2;
  var A2 = p2.cades;
  A2.SignaturePolicyIdentifier;
  var i2 = C2.lang.String.isHex, v2 = ASN1HEX, h2 = v2.getVbyList, a2 = v2.getTLVbyList, t2 = v2.getIdxbyList, z2 = v2.getChildIdx, c2 = v2.getTLV, B2 = v2.oidname, j2 = C2.crypto.Util.hashHex;
  if (n2.cms === void 0 && !i2(n2.cms))
    ;
  var E2 = n2.cms;
  var g2 = function(J2, H2) {
    var G2;
    for (var I2 = 3; I2 < 6; I2++) {
      G2 = t2(J2, 0, [1, 0, I2]);
      if (G2 !== void 0) {
        var F2 = J2.substr(G2, 2);
        if (F2 === "a0") {
          H2.certsIdx = G2;
        }
        if (F2 === "a1") {
          H2.revinfosIdx = G2;
        }
        if (F2 === "31") {
          H2.signerinfosIdx = G2;
        }
      }
    }
  };
  var l2 = function(I2, F2) {
    var H2 = F2.signerinfosIdx;
    if (H2 === void 0) {
      return;
    }
    var L2 = z2(I2, H2);
    F2.signerInfoIdxList = L2;
    for (var G2 = 0; G2 < L2.length; G2++) {
      var K2 = L2[G2];
      var J2 = { idx: K2 };
      k(I2, J2);
      F2.signerInfos.push(J2);
    }
  };
  var k = function(I2, J2) {
    var F2 = J2.idx;
    J2.signerid_issuer1 = a2(I2, F2, [1, 0], "30");
    J2.signerid_serial1 = h2(I2, F2, [1, 1], "02");
    J2.hashalg = B2(h2(I2, F2, [2, 0], "06"));
    var H2 = t2(I2, F2, [3], "a0");
    J2.idxSignedAttrs = H2;
    f2(I2, J2, H2);
    var G2 = z2(I2, F2);
    var K2 = G2.length;
    if (K2 < 6) {
      throw "malformed SignerInfo";
    }
    J2.sigalg = B2(h2(I2, F2, [K2 - 2, 0], "06"));
    J2.sigval = h2(I2, F2, [K2 - 1], "04");
  };
  var f2 = function(L2, M2, F2) {
    var J2 = z2(L2, F2);
    M2.signedAttrIdxList = J2;
    for (var K2 = 0; K2 < J2.length; K2++) {
      var I2 = J2[K2];
      var G2 = h2(L2, I2, [0], "06");
      var H2;
      if (G2 === "2a864886f70d010905") {
        H2 = hextoutf8(h2(L2, I2, [1, 0]));
        M2.saSigningTime = H2;
      } else {
        if (G2 === "2a864886f70d010904") {
          H2 = h2(L2, I2, [1, 0], "04");
          M2.saMessageDigest = H2;
        }
      }
    }
  };
  var w2 = function(G2, F2) {
    if (h2(G2, 0, [0], "06") !== "2a864886f70d010702") {
      return F2;
    }
    F2.cmsType = "signedData";
    F2.econtent = h2(G2, 0, [1, 0, 2, 1, 0]);
    g2(G2, F2);
    F2.signerInfos = [];
    l2(G2, F2);
  };
  var o2 = function(J2, F2) {
    var G2 = F2.parse.signerInfos;
    var L2 = G2.length;
    var K2 = true;
    for (var I2 = 0; I2 < L2; I2++) {
      var H2 = G2[I2];
      e2(J2, F2, H2);
      if (!H2.isValid) {
        K2 = false;
      }
    }
    F2.isValid = K2;
  };
  var x = function(F2, Q2, J2, P2) {
    var N2 = Q2.parse.certsIdx;
    var H2;
    if (Q2.certs === void 0) {
      H2 = [];
      Q2.certkeys = [];
      var K2 = z2(F2, N2);
      for (var I2 = 0; I2 < K2.length; I2++) {
        var M2 = c2(F2, K2[I2]);
        var O2 = new X509();
        O2.readCertHex(M2);
        H2[I2] = O2;
        Q2.certkeys[I2] = O2.getPublicKey();
      }
      Q2.certs = H2;
    } else {
      H2 = Q2.certs;
    }
    Q2.cccc = H2.length;
    Q2.cccci = K2.length;
    for (var I2 = 0; I2 < H2.length; I2++) {
      var L2 = O2.getIssuerHex();
      var G2 = O2.getSerialNumberHex();
      if (J2.signerid_issuer1 === L2 && J2.signerid_serial1 === G2) {
        J2.certkey_idx = I2;
      }
    }
  };
  var e2 = function(F2, R2, I2, N2) {
    I2.verifyDetail = {};
    var Q2 = I2.verifyDetail;
    var K2 = R2.parse.econtent;
    var G2 = I2.hashalg;
    var L2 = I2.saMessageDigest;
    Q2.validMessageDigest = false;
    if (j2(K2, G2) === L2) {
      Q2.validMessageDigest = true;
    }
    x(F2, R2, I2);
    Q2.validSignatureValue = false;
    var H2 = I2.sigalg;
    var M2 = "31" + c2(F2, I2.idxSignedAttrs).substr(2);
    I2.signedattrshex = M2;
    var J2 = R2.certs[I2.certkey_idx].getPublicKey();
    var P2 = new KJUR.crypto.Signature({ alg: H2 });
    P2.init(J2);
    P2.updateHex(M2);
    var O2 = P2.verify(I2.sigval);
    Q2.validSignatureValue_isValid = O2;
    if (O2 === true) {
      Q2.validSignatureValue = true;
    }
    I2.isValid = false;
    if (Q2.validMessageDigest && Q2.validSignatureValue) {
      I2.isValid = true;
    }
  };
  var r2 = { isValid: false, parse: {} };
  w2(E2, r2.parse);
  o2(E2, r2);
  return r2;
};
KJUR.asn1.cms.CMSParser = function() {
  var g2 = Error, a2 = X509, h2 = new a2(), l2 = ASN1HEX, i2 = l2.getV, b2 = l2.getTLV;
  l2.getIdxbyList;
  var c2 = l2.getTLVbyList, d2 = l2.getTLVbyListEx, e2 = l2.getVbyList, k = l2.getVbyListEx, j2 = l2.getChildIdx;
  this.getCMSSignedData = function(m2) {
    var o2 = c2(m2, 0, [1, 0]);
    var n2 = this.getSignedData(o2);
    return n2;
  };
  this.getSignedData = function(o2) {
    var q2 = j2(o2, 0);
    var v2 = {};
    var p2 = i2(o2, q2[0]);
    var n2 = parseInt(p2, 16);
    v2.version = n2;
    var r2 = b2(o2, q2[1]);
    v2.hashalgs = this.getHashAlgArray(r2);
    var t2 = b2(o2, q2[2]);
    v2.econtent = this.getEContent(t2);
    var m2 = d2(o2, 0, ["[0]"]);
    if (m2 != null) {
      v2.certs = this.getCertificateSet(m2);
    }
    d2(o2, 0, ["[1]"]);
    var s2 = d2(o2, 0, [3]);
    v2.sinfos = this.getSignerInfos(s2);
    return v2;
  };
  this.getHashAlgArray = function(s2) {
    var q2 = j2(s2, 0);
    var m2 = new a2();
    var n2 = [];
    for (var r2 = 0; r2 < q2.length; r2++) {
      var p2 = b2(s2, q2[r2]);
      var o2 = m2.getAlgorithmIdentifierName(p2);
      n2.push(o2);
    }
    return n2;
  };
  this.getEContent = function(m2) {
    var n2 = {};
    var p2 = e2(m2, 0, [0]);
    var o2 = e2(m2, 0, [1, 0]);
    n2.type = KJUR.asn1.x509.OID.oid2name(ASN1HEX.hextooidstr(p2));
    n2.content = { hex: o2 };
    return n2;
  };
  this.getSignerInfos = function(p2) {
    var r2 = [];
    var m2 = j2(p2, 0);
    for (var n2 = 0; n2 < m2.length; n2++) {
      var o2 = b2(p2, m2[n2]);
      var q2 = this.getSignerInfo(o2);
      r2.push(q2);
    }
    return r2;
  };
  this.getSignerInfo = function(s2) {
    var y2 = {};
    var u2 = j2(s2, 0);
    var q2 = l2.getInt(s2, u2[0], -1);
    if (q2 != -1) {
      y2.version = q2;
    }
    var t2 = b2(s2, u2[1]);
    var p2 = this.getIssuerAndSerialNumber(t2);
    y2.id = p2;
    var z2 = b2(s2, u2[2]);
    var n2 = h2.getAlgorithmIdentifierName(z2);
    y2.hashalg = n2;
    var w2 = d2(s2, 0, ["[0]"]);
    if (w2 != null) {
      var A2 = this.getAttributeList(w2);
      y2.sattrs = A2;
    }
    var m2 = d2(s2, 0, [3]);
    var x = h2.getAlgorithmIdentifierName(m2);
    y2.sigalg = x;
    var o2 = k(s2, 0, [4]);
    y2.sighex = o2;
    var r2 = d2(s2, 0, ["[1]"]);
    if (r2 != null) {
      var v2 = this.getAttributeList(r2);
      y2.uattrs = v2;
    }
    return y2;
  };
  this.getSignerIdentifier = function(m2) {
    if (m2.substr(0, 2) == "30") {
      return this.getIssuerAndSerialNumber(m2);
    } else {
      throw new Error("SKID of signerIdentifier not supported");
    }
  };
  this.getIssuerAndSerialNumber = function(n2) {
    var o2 = { type: "isssn" };
    var m2 = j2(n2, 0);
    var p2 = b2(n2, m2[0]);
    o2.issuer = h2.getX500Name(p2);
    var q2 = i2(n2, m2[1]);
    o2.serial = { hex: q2 };
    return o2;
  };
  this.getAttributeList = function(q2) {
    var m2 = [];
    var n2 = j2(q2, 0);
    for (var o2 = 0; o2 < n2.length; o2++) {
      var p2 = b2(q2, n2[o2]);
      var r2 = this.getAttribute(p2);
      m2.push(r2);
    }
    return { array: m2 };
  };
  this.getAttribute = function(p2) {
    var t2 = {};
    var q2 = j2(p2, 0);
    var o2 = l2.getOID(p2, q2[0]);
    var m2 = KJUR.asn1.x509.OID.oid2name(o2);
    t2.attr = m2;
    var r2 = b2(p2, q2[1]);
    var u2 = j2(r2, 0);
    if (u2.length == 1) {
      t2.valhex = b2(r2, u2[0]);
    } else {
      var s2 = [];
      for (var n2 = 0; n2 < u2.length; n2++) {
        s2.push(b2(r2, u2[n2]));
      }
      t2.valhex = s2;
    }
    if (m2 == "contentType") {
      this.setContentType(t2);
    } else {
      if (m2 == "messageDigest") {
        this.setMessageDigest(t2);
      } else {
        if (m2 == "signingTime") {
          this.setSigningTime(t2);
        } else {
          if (m2 == "signingCertificate") {
            this.setSigningCertificate(t2);
          } else {
            if (m2 == "signingCertificateV2") {
              this.setSigningCertificateV2(t2);
            } else {
              if (m2 == "signaturePolicyIdentifier") {
                this.setSignaturePolicyIdentifier(t2);
              }
            }
          }
        }
      }
    }
    return t2;
  };
  this.setContentType = function(m2) {
    var n2 = l2.getOIDName(m2.valhex, 0, null);
    if (n2 != null) {
      m2.type = n2;
      delete m2.valhex;
    }
  };
  this.setSigningTime = function(o2) {
    var n2 = i2(o2.valhex, 0);
    var m2 = hextoutf8(n2);
    o2.str = m2;
    delete o2.valhex;
  };
  this.setMessageDigest = function(m2) {
    var n2 = i2(m2.valhex, 0);
    m2.hex = n2;
    delete m2.valhex;
  };
  this.setSigningCertificate = function(n2) {
    var q2 = j2(n2.valhex, 0);
    if (q2.length > 0) {
      var m2 = b2(n2.valhex, q2[0]);
      var p2 = j2(m2, 0);
      var t2 = [];
      for (var o2 = 0; o2 < p2.length; o2++) {
        var s2 = b2(m2, p2[o2]);
        var u2 = this.getESSCertID(s2);
        t2.push(u2);
      }
      n2.array = t2;
    }
    if (q2.length > 1) {
      var r2 = b2(n2.valhex, q2[1]);
      n2.polhex = r2;
    }
    delete n2.valhex;
  };
  this.setSignaturePolicyIdentifier = function(s2) {
    var q2 = j2(s2.valhex, 0);
    if (q2.length > 0) {
      var r2 = l2.getOID(s2.valhex, q2[0]);
      s2.oid = r2;
    }
    if (q2.length > 1) {
      var m2 = new a2();
      var t2 = j2(s2.valhex, q2[1]);
      var p2 = b2(s2.valhex, t2[0]);
      var o2 = m2.getAlgorithmIdentifierName(p2);
      s2.alg = o2;
      var n2 = i2(s2.valhex, t2[1]);
      s2.hash = n2;
    }
    delete s2.valhex;
  };
  this.setSigningCertificateV2 = function(o2) {
    var s2 = j2(o2.valhex, 0);
    if (s2.length > 0) {
      var n2 = b2(o2.valhex, s2[0]);
      var r2 = j2(n2, 0);
      var u2 = [];
      for (var q2 = 0; q2 < r2.length; q2++) {
        var m2 = b2(n2, r2[q2]);
        var p2 = this.getESSCertIDv2(m2);
        u2.push(p2);
      }
      o2.array = u2;
    }
    if (s2.length > 1) {
      var t2 = b2(o2.valhex, s2[1]);
      o2.polhex = t2;
    }
    delete o2.valhex;
  };
  this.getESSCertID = function(o2) {
    var p2 = {};
    var n2 = j2(o2, 0);
    if (n2.length > 0) {
      var q2 = i2(o2, n2[0]);
      p2.hash = q2;
    }
    if (n2.length > 1) {
      var m2 = b2(o2, n2[1]);
      var r2 = this.getIssuerSerial(m2);
      if (r2.serial != void 0) {
        p2.serial = r2.serial;
      }
      if (r2.issuer != void 0) {
        p2.issuer = r2.issuer;
      }
    }
    return p2;
  };
  this.getESSCertIDv2 = function(q2) {
    var s2 = {};
    var p2 = j2(q2, 0);
    if (p2.length < 1 || 3 < p2.length) {
      throw new g2("wrong number of elements");
    }
    var r2 = 0;
    if (q2.substr(p2[0], 2) == "30") {
      var o2 = b2(q2, p2[0]);
      s2.alg = h2.getAlgorithmIdentifierName(o2);
      r2++;
    } else {
      s2.alg = "sha256";
    }
    var n2 = i2(q2, p2[r2]);
    s2.hash = n2;
    if (p2.length > r2 + 1) {
      var m2 = b2(q2, p2[r2 + 1]);
      var t2 = this.getIssuerSerial(m2);
      s2.issuer = t2.issuer;
      s2.serial = t2.serial;
    }
    return s2;
  };
  this.getIssuerSerial = function(q2) {
    var r2 = {};
    var n2 = j2(q2, 0);
    var m2 = b2(q2, n2[0]);
    var p2 = h2.getGeneralNames(m2);
    var o2 = p2[0].dn;
    r2.issuer = o2;
    var s2 = i2(q2, n2[1]);
    r2.serial = { hex: s2 };
    return r2;
  };
  this.getCertificateSet = function(p2) {
    var n2 = j2(p2, 0);
    var m2 = [];
    for (var o2 = 0; o2 < n2.length; o2++) {
      var r2 = b2(p2, n2[o2]);
      if (r2.substr(0, 2) == "30") {
        var q2 = hextopem(r2, "CERTIFICATE");
        m2.push(q2);
      }
    }
    return { array: m2, sortflag: false };
  };
};
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.tsp == "undefined" || !KJUR.asn1.tsp) {
  KJUR.asn1.tsp = {};
}
KJUR.asn1.tsp.TimeStampToken = function(d2) {
  var c2 = KJUR, b2 = c2.asn1, a2 = b2.tsp;
  a2.TimeStampToken.superclass.constructor.call(this);
  this.params = null;
  this.getEncodedHexPrepare = function() {
    var e2 = new a2.TSTInfo(this.params.econtent.content);
    this.params.econtent.content.hex = e2.tohex();
  };
  if (d2 != void 0) {
    this.setByParam(d2);
  }
};
extendClass(KJUR.asn1.tsp.TimeStampToken, KJUR.asn1.cms.SignedData);
KJUR.asn1.tsp.TSTInfo = function(f2) {
  var c2 = KJUR, j2 = c2.asn1, g2 = j2.DERSequence, i2 = j2.DERInteger, l2 = j2.DERBoolean, h2 = j2.DERGeneralizedTime, n2 = j2.DERObjectIdentifier, e2 = j2.DERTaggedObject, k = j2.tsp, d2 = k.MessageImprint, b2 = k.Accuracy;
  j2.x509.X500Name;
  var o2 = j2.x509.GeneralName;
  k.TSTInfo.superclass.constructor.call(this);
  this.dVersion = new i2({ "int": 1 });
  this.dPolicy = null;
  this.dMessageImprint = null;
  this.dSerial = null;
  this.dGenTime = null;
  this.dAccuracy = null;
  this.dOrdering = null;
  this.dNonce = null;
  this.dTsa = null;
  this.tohex = function() {
    var p2 = [this.dVersion];
    if (this.dPolicy == null) {
      throw new Error("policy shall be specified.");
    }
    p2.push(this.dPolicy);
    if (this.dMessageImprint == null) {
      throw new Error("messageImprint shall be specified.");
    }
    p2.push(this.dMessageImprint);
    if (this.dSerial == null) {
      throw new Error("serialNumber shall be specified.");
    }
    p2.push(this.dSerial);
    if (this.dGenTime == null) {
      throw new Error("genTime shall be specified.");
    }
    p2.push(this.dGenTime);
    if (this.dAccuracy != null) {
      p2.push(this.dAccuracy);
    }
    if (this.dOrdering != null) {
      p2.push(this.dOrdering);
    }
    if (this.dNonce != null) {
      p2.push(this.dNonce);
    }
    if (this.dTsa != null) {
      p2.push(this.dTsa);
    }
    var q2 = new g2({ array: p2 });
    this.hTLV = q2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 !== void 0) {
    if (typeof f2.policy == "string") {
      if (!f2.policy.match(/^[0-9.]+$/)) {
        throw "policy shall be oid like 0.1.4.134";
      }
      this.dPolicy = new n2({ oid: f2.policy });
    }
    if (f2.messageImprint !== void 0) {
      this.dMessageImprint = new d2(f2.messageImprint);
    }
    if (f2.serial !== void 0) {
      this.dSerial = new i2(f2.serial);
    }
    if (f2.genTime !== void 0) {
      this.dGenTime = new h2(f2.genTime);
    }
    if (f2.accuracy !== void 0) {
      this.dAccuracy = new b2(f2.accuracy);
    }
    if (f2.ordering !== void 0 && f2.ordering == true) {
      this.dOrdering = new l2();
    }
    if (f2.nonce !== void 0) {
      this.dNonce = new i2(f2.nonce);
    }
    if (f2.tsa !== void 0) {
      this.dTsa = new e2({ tag: "a0", explicit: true, obj: new o2({ dn: f2.tsa }) });
    }
  }
};
extendClass(KJUR.asn1.tsp.TSTInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.Accuracy = function(d2) {
  var c2 = KJUR, b2 = c2.asn1, a2 = b2.ASN1Util.newObject;
  b2.tsp.Accuracy.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var f2 = this.params;
    var e2 = [];
    if (f2.seconds != void 0 && typeof f2.seconds == "number") {
      e2.push({ "int": f2.seconds });
    }
    if (f2.millis != void 0 && typeof f2.millis == "number") {
      e2.push({ tag: { tagi: "80", obj: { "int": f2.millis } } });
    }
    if (f2.micros != void 0 && typeof f2.micros == "number") {
      e2.push({ tag: { tagi: "81", obj: { "int": f2.micros } } });
    }
    return a2({ seq: e2 }).tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (d2 != void 0) {
    this.setByParam(d2);
  }
};
extendClass(KJUR.asn1.tsp.Accuracy, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.MessageImprint = function(g2) {
  var c2 = KJUR, b2 = c2.asn1, a2 = b2.DERSequence, d2 = b2.DEROctetString, f2 = b2.x509, e2 = f2.AlgorithmIdentifier;
  b2.tsp.MessageImprint.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var k = this.params;
    var j2 = new e2({ name: k.alg });
    var h2 = new d2({ hex: k.hash });
    var i2 = new a2({ array: [j2, h2] });
    return i2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 !== void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.tsp.MessageImprint, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.TimeStampReq = function(c2) {
  var a2 = KJUR, f2 = a2.asn1, d2 = f2.DERSequence, e2 = f2.DERInteger, h2 = f2.DERBoolean;
  f2.ASN1Object;
  var i2 = f2.DERObjectIdentifier, g2 = f2.tsp, b2 = g2.MessageImprint;
  g2.TimeStampReq.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var m2 = this.params;
    var k = [];
    k.push(new e2({ "int": 1 }));
    if (m2.messageImprint instanceof KJUR.asn1.ASN1Object) {
      k.push(m2.messageImprint);
    } else {
      k.push(new b2(m2.messageImprint));
    }
    if (m2.policy != void 0) {
      k.push(new i2(m2.policy));
    }
    if (m2.nonce != void 0) {
      k.push(new e2(m2.nonce));
    }
    if (m2.certreq == true) {
      k.push(new h2());
    }
    var l2 = new d2({ array: k });
    return l2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (c2 != void 0) {
    this.setByParam(c2);
  }
};
extendClass(KJUR.asn1.tsp.TimeStampReq, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.TimeStampResp = function(g2) {
  var e2 = KJUR, d2 = e2.asn1, c2 = d2.DERSequence;
  d2.ASN1Object;
  var a2 = d2.tsp, b2 = a2.PKIStatusInfo;
  a2.TimeStampResp.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var j2 = this.params;
    var h2 = [];
    if (j2.econtent != void 0 || j2.tst != void 0) {
      if (j2.statusinfo != void 0) {
        h2.push(new b2(j2.statusinfo));
      } else {
        h2.push(new b2("granted"));
      }
      if (j2.econtent != void 0) {
        h2.push(new a2.TimeStampToken(j2).getContentInfo());
      } else {
        if (j2.tst instanceof d2.ASN1Object) {
          h2.push(j2.tst);
        } else {
          throw new Error("improper member tst value");
        }
      }
    } else {
      if (j2.statusinfo != void 0) {
        h2.push(new b2(j2.statusinfo));
      } else {
        throw new Error("parameter for token nor statusinfo not specified");
      }
    }
    var i2 = new c2({ array: h2 });
    return i2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 != void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.tsp.TimeStampResp, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIStatusInfo = function(d2) {
  var h2 = Error, a2 = KJUR, g2 = a2.asn1, e2 = g2.DERSequence, i2 = g2.tsp, f2 = i2.PKIStatus, c2 = i2.PKIFreeText, b2 = i2.PKIFailureInfo;
  i2.PKIStatusInfo.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var l2 = this.params;
    var j2 = [];
    if (typeof l2 == "string") {
      j2.push(new f2(l2));
    } else {
      if (l2.status == void 0) {
        throw new h2("property 'status' unspecified");
      }
      j2.push(new f2(l2.status));
      if (l2.statusstr != void 0) {
        j2.push(new c2(l2.statusstr));
      }
      if (l2.failinfo != void 0) {
        j2.push(new b2(l2.failinfo));
      }
    }
    var k = new e2({ array: j2 });
    return k.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (d2 != void 0) {
    this.setByParam(d2);
  }
};
extendClass(KJUR.asn1.tsp.PKIStatusInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIStatus = function(g2) {
  var e2 = Error, d2 = KJUR, c2 = d2.asn1, f2 = c2.DERInteger, b2 = c2.tsp;
  b2.PKIStatus.superclass.constructor.call(this);
  var a2 = { granted: 0, grantedWithMods: 1, rejection: 2, waiting: 3, revocationWarning: 4, revocationNotification: 5 };
  this.params = null;
  this.tohex = function() {
    var k = this.params;
    var j2;
    if (typeof k == "string") {
      try {
        j2 = a2[k];
      } catch (i2) {
        throw new e2("undefined name: " + k);
      }
    } else {
      if (typeof k == "number") {
        j2 = k;
      } else {
        throw new e2("unsupported params");
      }
    }
    return new f2({ "int": j2 }).tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 != void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.tsp.PKIStatus, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIFreeText = function(g2) {
  var f2 = Error, e2 = KJUR, d2 = e2.asn1, b2 = d2.DERSequence, c2 = d2.DERUTF8String, a2 = d2.tsp;
  a2.PKIFreeText.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var l2 = this.params;
    if (!l2 instanceof Array) {
      throw new f2("wrong params: not array");
    }
    var h2 = [];
    for (var k = 0; k < l2.length; k++) {
      h2.push(new c2({ str: l2[k] }));
    }
    var j2 = new b2({ array: h2 });
    return j2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 != void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.tsp.PKIFreeText, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIFailureInfo = function(h2) {
  var f2 = Error, e2 = KJUR, d2 = e2.asn1, g2 = d2.DERBitString, b2 = d2.tsp, c2 = b2.PKIFailureInfo;
  var a2 = { badAlg: 0, badRequest: 2, badDataFormat: 5, timeNotAvailable: 14, unacceptedPolicy: 15, unacceptedExtension: 16, addInfoNotAvailable: 17, systemFailure: 25 };
  c2.superclass.constructor.call(this);
  this.params = null;
  this.getBinValue = function() {
    var n2 = this.params;
    var m2 = 0;
    if (typeof n2 == "number" && 0 <= n2 && n2 <= 25) {
      m2 |= 1 << n2;
      var k = m2.toString(2);
      var l2 = "";
      for (var j2 = k.length - 1; j2 >= 0; j2--) {
        l2 += k[j2];
      }
      return l2;
    } else {
      if (typeof n2 == "string" && a2[n2] != void 0) {
        return namearraytobinstr([n2], a2);
      } else {
        if (typeof n2 == "object" && n2.length != void 0) {
          return namearraytobinstr(n2, a2);
        } else {
          throw new f2("wrong params");
        }
      }
    }
  };
  this.tohex = function() {
    this.params;
    var i2 = this.getBinValue();
    return new g2({ bin: i2 }).tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (h2 != void 0) {
    this.setByParam(h2);
  }
};
extendClass(KJUR.asn1.tsp.PKIFailureInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.AbstractTSAAdapter = function(a2) {
  this.getTSTHex = function(c2, b2) {
    throw "not implemented yet";
  };
};
KJUR.asn1.tsp.SimpleTSAAdapter = function(e2) {
  var d2 = KJUR, c2 = d2.asn1, a2 = c2.tsp, b2 = d2.crypto.Util.hashHex;
  a2.SimpleTSAAdapter.superclass.constructor.call(this);
  this.params = null;
  this.serial = 0;
  this.getTSTHex = function(g2, f2) {
    var i2 = b2(g2, f2);
    this.params.econtent.content.messageImprint = { alg: f2, hash: i2 };
    this.params.econtent.content.serial = { "int": this.serial++ };
    var h2 = Math.floor(Math.random() * 1e9);
    this.params.econtent.content.nonce = { "int": h2 };
    var j2 = new a2.TimeStampToken(this.params);
    return j2.getContentInfoEncodedHex();
  };
  if (e2 !== void 0) {
    this.params = e2;
  }
};
extendClass(KJUR.asn1.tsp.SimpleTSAAdapter, KJUR.asn1.tsp.AbstractTSAAdapter);
KJUR.asn1.tsp.FixedTSAAdapter = function(e2) {
  var d2 = KJUR, c2 = d2.asn1, a2 = c2.tsp, b2 = d2.crypto.Util.hashHex;
  a2.FixedTSAAdapter.superclass.constructor.call(this);
  this.params = null;
  this.getTSTHex = function(g2, f2) {
    var h2 = b2(g2, f2);
    this.params.econtent.content.messageImprint = { alg: f2, hash: h2 };
    var i2 = new a2.TimeStampToken(this.params);
    return i2.getContentInfoEncodedHex();
  };
  if (e2 !== void 0) {
    this.params = e2;
  }
};
extendClass(KJUR.asn1.tsp.FixedTSAAdapter, KJUR.asn1.tsp.AbstractTSAAdapter);
KJUR.asn1.tsp.TSPUtil = new function() {
}();
KJUR.asn1.tsp.TSPUtil.newTimeStampToken = function(a2) {
  return new KJUR.asn1.tsp.TimeStampToken(a2);
};
KJUR.asn1.tsp.TSPUtil.parseTimeStampReq = function(a2) {
  var b2 = new KJUR.asn1.tsp.TSPParser();
  return b2.getTimeStampReq(a2);
};
KJUR.asn1.tsp.TSPUtil.parseMessageImprint = function(a2) {
  var b2 = new KJUR.asn1.tsp.TSPParser();
  return b2.getMessageImprint(a2);
};
KJUR.asn1.tsp.TSPParser = function() {
  var a2 = X509, f2 = new a2(), k = ASN1HEX, g2 = k.getV, b2 = k.getTLV, d2 = k.getIdxbyList;
  k.getTLVbyListEx;
  var i2 = k.getChildIdx;
  var j2 = ["granted", "grantedWithMods", "rejection", "waiting", "revocationWarning", "revocationNotification"];
  var h2 = { 0: "badAlg", 2: "badRequest", 5: "badDataFormat", 14: "timeNotAvailable", 15: "unacceptedPolicy", 16: "unacceptedExtension", 17: "addInfoNotAvailable", 25: "systemFailure" };
  this.getResponse = function(n2) {
    var l2 = i2(n2, 0);
    if (l2.length == 1) {
      return this.getPKIStatusInfo(b2(n2, l2[0]));
    } else {
      if (l2.length > 1) {
        var o2 = this.getPKIStatusInfo(b2(n2, l2[0]));
        var m2 = b2(n2, l2[1]);
        var p2 = this.getToken(m2);
        p2.statusinfo = o2;
        return p2;
      }
    }
  };
  this.getToken = function(m2) {
    var l2 = new KJUR.asn1.cms.CMSParser();
    var n2 = l2.getCMSSignedData(m2);
    this.setTSTInfo(n2);
    return n2;
  };
  this.setTSTInfo = function(l2) {
    var o2 = l2.econtent;
    if (o2.type == "tstinfo") {
      var n2 = o2.content.hex;
      var m2 = this.getTSTInfo(n2);
      o2.content = m2;
    }
  };
  this.getTSTInfo = function(r2) {
    var x = {};
    var s2 = i2(r2, 0);
    var p2 = g2(r2, s2[1]);
    x.policy = hextooid(p2);
    var o2 = b2(r2, s2[2]);
    x.messageImprint = this.getMessageImprint(o2);
    var u2 = g2(r2, s2[3]);
    x.serial = { hex: u2 };
    var y2 = g2(r2, s2[4]);
    x.genTime = { str: hextoutf8(y2) };
    var q2 = 0;
    if (s2.length > 5 && r2.substr(s2[5], 2) == "30") {
      var v2 = b2(r2, s2[5]);
      x.accuracy = this.getAccuracy(v2);
      q2++;
    }
    if (s2.length > 5 + q2 && r2.substr(s2[5 + q2], 2) == "01") {
      var z2 = g2(r2, s2[5 + q2]);
      if (z2 == "ff") {
        x.ordering = true;
      }
      q2++;
    }
    if (s2.length > 5 + q2 && r2.substr(s2[5 + q2], 2) == "02") {
      var n2 = g2(r2, s2[5 + q2]);
      x.nonce = { hex: n2 };
      q2++;
    }
    if (s2.length > 5 + q2 && r2.substr(s2[5 + q2], 2) == "a0") {
      var m2 = b2(r2, s2[5 + q2]);
      m2 = "30" + m2.substr(2);
      pGeneralNames = f2.getGeneralNames(m2);
      var t2 = pGeneralNames[0].dn;
      x.tsa = t2;
      q2++;
    }
    if (s2.length > 5 + q2 && r2.substr(s2[5 + q2], 2) == "a1") {
      var l2 = b2(r2, s2[5 + q2]);
      l2 = "30" + l2.substr(2);
      var w2 = f2.getExtParamArray(l2);
      x.ext = w2;
      q2++;
    }
    return x;
  };
  this.getAccuracy = function(q2) {
    var r2 = {};
    var o2 = i2(q2, 0);
    for (var p2 = 0; p2 < o2.length; p2++) {
      var m2 = q2.substr(o2[p2], 2);
      var l2 = g2(q2, o2[p2]);
      var n2 = parseInt(l2, 16);
      if (m2 == "02") {
        r2.seconds = n2;
      } else {
        if (m2 == "80") {
          r2.millis = n2;
        } else {
          if (m2 == "81") {
            r2.micros = n2;
          }
        }
      }
    }
    return r2;
  };
  this.getMessageImprint = function(n2) {
    if (n2.substr(0, 2) != "30") {
      throw new Error("head of messageImprint hex shall be x30");
    }
    var s2 = {};
    i2(n2, 0);
    var t2 = d2(n2, 0, [0, 0]);
    var o2 = g2(n2, t2);
    var p2 = k.hextooidstr(o2);
    var r2 = KJUR.asn1.x509.OID.oid2name(p2);
    if (r2 == "") {
      throw new Error("hashAlg name undefined: " + p2);
    }
    var m2 = r2;
    var q2 = d2(n2, 0, [1]);
    s2.alg = m2;
    s2.hash = g2(n2, q2);
    return s2;
  };
  this.getPKIStatusInfo = function(o2) {
    var t2 = {};
    var r2 = i2(o2, 0);
    var n2 = 0;
    try {
      var l2 = g2(o2, r2[0]);
      var p2 = parseInt(l2, 16);
      t2.status = j2[p2];
    } catch (s2) {
    }
    if (r2.length > 1 && o2.substr(r2[1], 2) == "30") {
      var m2 = b2(o2, r2[1]);
      t2.statusstr = this.getPKIFreeText(m2);
      n2++;
    }
    if (r2.length > n2 && o2.substr(r2[1 + n2], 2) == "03") {
      var q2 = b2(o2, r2[1 + n2]);
      t2.failinfo = this.getPKIFailureInfo(q2);
    }
    return t2;
  };
  this.getPKIFreeText = function(n2) {
    var o2 = [];
    var l2 = i2(n2, 0);
    for (var m2 = 0; m2 < l2.length; m2++) {
      o2.push(k.getString(n2, l2[m2]));
    }
    return o2;
  };
  this.getPKIFailureInfo = function(l2) {
    var m2 = k.getInt(l2, 0);
    if (h2[m2] != void 0) {
      return h2[m2];
    } else {
      return m2;
    }
  };
  this.getTimeStampReq = function(q2) {
    var p2 = {};
    p2.certreq = false;
    var s2 = i2(q2, 0);
    if (s2.length < 2) {
      throw new Error("TimeStampReq must have at least 2 items");
    }
    var n2 = b2(q2, s2[1]);
    p2.messageImprint = KJUR.asn1.tsp.TSPUtil.parseMessageImprint(n2);
    for (var o2 = 2; o2 < s2.length; o2++) {
      var m2 = s2[o2];
      var l2 = q2.substr(m2, 2);
      if (l2 == "06") {
        var r2 = g2(q2, m2);
        p2.policy = k.hextooidstr(r2);
      }
      if (l2 == "02") {
        p2.nonce = g2(q2, m2);
      }
      if (l2 == "01") {
        p2.certreq = true;
      }
    }
    return p2;
  };
};
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.cades == "undefined" || !KJUR.asn1.cades) {
  KJUR.asn1.cades = {};
}
KJUR.asn1.cades.SignaturePolicyIdentifier = function(e2) {
  var c2 = KJUR, b2 = c2.asn1, a2 = b2.cades, d2 = a2.SignaturePolicyId;
  a2.SignaturePolicyIdentifier.superclass.constructor.call(this);
  this.typeOid = "1.2.840.113549.1.9.16.2.15";
  this.params = null;
  this.getValueArray = function() {
    return [new d2(this.params)];
  };
  this.setByParam = function(f2) {
    this.params = f2;
  };
  if (e2 != void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.cades.SignaturePolicyIdentifier, KJUR.asn1.cms.Attribute);
KJUR.asn1.cades.SignaturePolicyId = function(e2) {
  var a2 = KJUR, g2 = a2.asn1, f2 = g2.DERSequence, i2 = g2.DERObjectIdentifier, d2 = g2.x509;
  d2.AlgorithmIdentifier;
  var c2 = g2.cades, h2 = c2.SignaturePolicyId, b2 = c2.OtherHashAlgAndValue;
  h2.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var m2 = this.params;
    var k = [];
    k.push(new i2(m2.oid));
    k.push(new b2(m2));
    var l2 = new f2({ array: k });
    return l2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setByParam = function(k) {
    this.params = k;
  };
  if (e2 != void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.cades.SignaturePolicyId, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.OtherHashAlgAndValue = function(e2) {
  var h2 = Error, a2 = KJUR, g2 = a2.asn1, f2 = g2.DERSequence, i2 = g2.DEROctetString, d2 = g2.x509, j2 = d2.AlgorithmIdentifier, c2 = g2.cades, b2 = c2.OtherHashAlgAndValue;
  b2.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var o2 = this.params;
    if (o2.alg == void 0) {
      throw new h2("property 'alg' not specified");
    }
    if (o2.hash == void 0 && o2.cert == void 0) {
      throw new h2("property 'hash' nor 'cert' not specified");
    }
    var m2 = null;
    if (o2.hash != void 0) {
      m2 = o2.hash;
    } else {
      if (o2.cert != void 0) {
        if (typeof o2.cert != "string") {
          throw new h2("cert not string");
        }
        var n2 = o2.cert;
        if (o2.cert.indexOf("-----BEGIN") != -1) {
          n2 = pemtohex(o2.cert);
        }
        m2 = KJUR.crypto.Util.hashHex(n2, o2.alg);
      }
    }
    var k = [];
    k.push(new j2({ name: o2.alg }));
    k.push(new i2({ hex: m2 }));
    var l2 = new f2({ array: k });
    return l2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 != void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.cades.OtherHashAlgAndValue, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.OtherHashValue = function(g2) {
  KJUR.asn1.cades.OtherHashValue.superclass.constructor.call(this);
  var d2 = Error, c2 = KJUR;
  c2.lang.String.isHex;
  var b2 = c2.asn1, e2 = b2.DEROctetString;
  c2.crypto.Util.hashHex;
  this.params = null;
  this.tohex = function() {
    var j2 = this.params;
    if (j2.hash == void 0 && j2.cert == void 0) {
      throw new d2("hash or cert not specified");
    }
    var h2 = null;
    if (j2.hash != void 0) {
      h2 = j2.hash;
    } else {
      if (j2.cert != void 0) {
        if (typeof j2.cert != "string") {
          throw new d2("cert not string");
        }
        var i2 = j2.cert;
        if (j2.cert.indexOf("-----BEGIN") != -1) {
          i2 = pemtohex(j2.cert);
        }
        h2 = KJUR.crypto.Util.hashHex(i2, "sha1");
      }
    }
    return new e2({ hex: h2 }).tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 != void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.cades.OtherHashValue, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.SignatureTimeStamp = function(h2) {
  var d2 = Error, c2 = KJUR, f2 = c2.lang.String.isHex, b2 = c2.asn1, e2 = b2.ASN1Object;
  b2.x509;
  var a2 = b2.cades;
  a2.SignatureTimeStamp.superclass.constructor.call(this);
  this.typeOid = "1.2.840.113549.1.9.16.2.14";
  this.params = null;
  this.getValueArray = function() {
    var l2 = this.params;
    if (l2.tst != void 0) {
      if (f2(l2.tst)) {
        var j2 = new e2();
        j2.hTLV = l2.tst;
        return [j2];
      } else {
        if (l2.tst instanceof e2) {
          return [l2.tst];
        } else {
          throw new d2("params.tst has wrong value");
        }
      }
    } else {
      if (l2.res != void 0) {
        var k = l2.res;
        if (k instanceof e2) {
          k = k.tohex();
        }
        if (typeof k != "string" || !f2(k)) {
          throw new d2("params.res has wrong value");
        }
        ASN1HEX.getTLVbyList(k, 0, [1]);
        var j2 = new e2();
        j2.hTLV = l2.tst;
        return [j2];
      }
    }
  };
  if (h2 != null) {
    this.setByParam(h2);
  }
};
extendClass(KJUR.asn1.cades.SignatureTimeStamp, KJUR.asn1.cms.Attribute);
KJUR.asn1.cades.CompleteCertificateRefs = function(h2) {
  var f2 = Error, e2 = KJUR, d2 = e2.asn1, b2 = d2.DERSequence, c2 = d2.cades, a2 = c2.OtherCertID, g2 = e2.lang.String.isHex;
  c2.CompleteCertificateRefs.superclass.constructor.call(this);
  this.typeOid = "1.2.840.113549.1.9.16.2.21";
  this.params = null;
  this.getValueArray = function() {
    var o2 = this.params;
    var k = [];
    for (var m2 = 0; m2 < o2.array.length; m2++) {
      var n2 = o2.array[m2];
      if (typeof n2 == "string") {
        if (n2.indexOf("-----BEGIN") != -1) {
          n2 = { cert: n2 };
        } else {
          if (g2(n2)) {
            n2 = { hash: n2 };
          } else {
            throw new f2("unsupported value: " + n2);
          }
        }
      }
      if (o2.alg != void 0 && n2.alg == void 0) {
        n2.alg = o2.alg;
      }
      if (o2.hasis != void 0 && n2.hasis == void 0) {
        n2.hasis = o2.hasis;
      }
      var j2 = new a2(n2);
      k.push(j2);
    }
    var l2 = new b2({ array: k });
    return [l2];
  };
  if (h2 != void 0) {
    this.setByParam(h2);
  }
};
extendClass(KJUR.asn1.cades.CompleteCertificateRefs, KJUR.asn1.cms.Attribute);
KJUR.asn1.cades.OtherCertID = function(e2) {
  var a2 = KJUR, h2 = a2.asn1, f2 = h2.DERSequence, i2 = h2.cms, g2 = i2.IssuerSerial, c2 = h2.cades, d2 = c2.OtherHashValue, b2 = c2.OtherHashAlgAndValue;
  c2.OtherCertID.superclass.constructor.call(this);
  this.params = e2;
  this.tohex = function() {
    var n2 = this.params;
    if (typeof n2 == "string") {
      if (n2.indexOf("-----BEGIN") != -1) {
        n2 = { cert: n2 };
      } else {
        if (_isHex(n2)) {
          n2 = { hash: n2 };
        }
      }
    }
    var j2 = [];
    var m2 = null;
    if (n2.alg != void 0) {
      m2 = new b2(n2);
    } else {
      m2 = new d2(n2);
    }
    j2.push(m2);
    if (n2.cert != void 0 && n2.hasis == true || n2.issuer != void 0 && n2.serial != void 0) {
      var l2 = new g2(n2);
      j2.push(l2);
    }
    var k = new f2({ array: j2 });
    return k.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 != void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.cades.OtherCertID, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.OtherHash = function(g2) {
  var a2 = KJUR, h2 = a2.asn1;
  h2.cms;
  var c2 = h2.cades, b2 = c2.OtherHashAlgAndValue, e2 = c2.OtherHashValue;
  a2.crypto.Util.hashHex;
  var f2 = a2.lang.String.isHex;
  c2.OtherHash.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var l2 = this.params;
    if (typeof l2 == "string") {
      if (l2.indexOf("-----BEGIN") != -1) {
        l2 = { cert: l2 };
      } else {
        if (f2(l2)) {
          l2 = { hash: l2 };
        }
      }
    }
    var k = null;
    if (l2.alg != void 0) {
      k = new b2(l2);
    } else {
      k = new e2(l2);
    }
    return k.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 != void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.cades.OtherHash, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.CAdESUtil = new function() {
}();
KJUR.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned = function(a2) {
  var c2 = new KJUR.asn1.cms.CMSParser();
  var b2 = c2.getCMSSignedData(a2);
  return b2;
};
KJUR.asn1.cades.CAdESUtil.parseSignerInfoForAddingUnsigned = function(g2, q2, c2) {
  var p2 = ASN1HEX, s2 = p2.getChildIdx, a2 = p2.getTLV, l2 = p2.getV, v2 = KJUR, h2 = v2.asn1, n2 = h2.ASN1Object, j2 = h2.cms, k = j2.AttributeList, w2 = j2.SignerInfo;
  var o2 = {};
  var t2 = s2(g2, q2);
  if (t2.length != 6) {
    throw "not supported items for SignerInfo (!=6)";
  }
  var d2 = t2.shift();
  o2.version = a2(g2, d2);
  var e2 = t2.shift();
  o2.si = a2(g2, e2);
  var m2 = t2.shift();
  o2.digalg = a2(g2, m2);
  var f2 = t2.shift();
  o2.sattrs = a2(g2, f2);
  var i2 = t2.shift();
  o2.sigalg = a2(g2, i2);
  var b2 = t2.shift();
  o2.sig = a2(g2, b2);
  o2.sigval = l2(g2, b2);
  var u2 = null;
  o2.obj = new w2();
  u2 = new n2();
  u2.hTLV = o2.version;
  o2.obj.dCMSVersion = u2;
  u2 = new n2();
  u2.hTLV = o2.si;
  o2.obj.dSignerIdentifier = u2;
  u2 = new n2();
  u2.hTLV = o2.digalg;
  o2.obj.dDigestAlgorithm = u2;
  u2 = new n2();
  u2.hTLV = o2.sattrs;
  o2.obj.dSignedAttrs = u2;
  u2 = new n2();
  u2.hTLV = o2.sigalg;
  o2.obj.dSigAlg = u2;
  u2 = new n2();
  u2.hTLV = o2.sig;
  o2.obj.dSig = u2;
  o2.obj.dUnsignedAttrs = new k();
  return o2;
};
if (typeof KJUR.asn1.csr == "undefined" || !KJUR.asn1.csr) {
  KJUR.asn1.csr = {};
}
KJUR.asn1.csr.CertificationRequest = function(g2) {
  var d2 = KJUR, c2 = d2.asn1, e2 = c2.DERBitString, b2 = c2.DERSequence, a2 = c2.csr;
  c2.x509;
  var h2 = a2.CertificationRequestInfo;
  a2.CertificationRequest.superclass.constructor.call(this);
  this.setByParam = function(i2) {
    this.params = i2;
  };
  this.sign = function() {
    var j2 = new h2(this.params).tohex();
    var k = new KJUR.crypto.Signature({ alg: this.params.sigalg });
    k.init(this.params.sbjprvkey);
    k.updateHex(j2);
    var i2 = k.sign();
    this.params.sighex = i2;
  };
  this.getPEM = function() {
    return hextopem(this.tohex(), "CERTIFICATE REQUEST");
  };
  this.tohex = function() {
    var l2 = this.params;
    var j2 = new KJUR.asn1.csr.CertificationRequestInfo(this.params);
    var m2 = new KJUR.asn1.x509.AlgorithmIdentifier({ name: l2.sigalg });
    if (l2.sighex == void 0 && l2.sbjprvkey != void 0) {
      this.sign();
    }
    if (l2.sighex == void 0) {
      throw new Error("sighex or sbjprvkey parameter not defined");
    }
    var k = new e2({ hex: "00" + l2.sighex });
    var i2 = new b2({ array: [j2, m2, k] });
    return i2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (g2 !== void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.csr.CertificationRequest, KJUR.asn1.ASN1Object);
KJUR.asn1.csr.CertificationRequestInfo = function(f2) {
  var b2 = KJUR, j2 = b2.asn1;
  j2.DERBitString;
  var g2 = j2.DERSequence, i2 = j2.DERInteger, p2 = j2.DERUTF8String, d2 = j2.DERTaggedObject, h2 = j2.ASN1Util.newObject, n2 = j2.csr, e2 = j2.x509, a2 = e2.X500Name, l2 = e2.Extensions, o2 = e2.SubjectPublicKeyInfo;
  n2.AttributeList;
  n2.CertificationRequestInfo.superclass.constructor.call(this);
  this.params = null;
  this.setByParam = function(q2) {
    if (q2 != void 0) {
      this.params = q2;
    }
  };
  this.tohex = function() {
    var v2 = this.params;
    var r2 = [];
    r2.push(new i2({ "int": 0 }));
    r2.push(new a2(v2.subject));
    r2.push(new o2(KEYUTIL.getKey(v2.sbjpubkey)));
    if (v2.attrs != void 0) {
      var u2 = m2(v2.attrs);
      var t2 = h2({ tag: { tage: "a0", obj: u2 } });
      r2.push(t2);
    } else {
      if (v2.extreq != void 0) {
        var q2 = new l2(v2.extreq);
        var t2 = h2({ tag: { tage: "a0", obj: { seq: [{ oid: "1.2.840.113549.1.9.14" }, { set: [q2] }] } } });
        r2.push(t2);
      } else {
        r2.push(new d2({ tag: "a0", explicit: false, obj: new p2({ str: "" }) }));
      }
    }
    var s2 = new g2({ array: r2 });
    return s2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  function m2(s2) {
    var w2 = Error, v2 = KJUR.asn1.x509.Extensions;
    var y2 = [];
    for (var u2 = 0; u2 < s2.length; u2++) {
      var r2 = s2[u2];
      var x = r2.attr;
      if (x == "extensionRequest") {
        var t2 = new v2(r2.ext);
        var q2 = { seq: [{ oid: "1.2.840.113549.1.9.14" }, { set: [t2] }] };
        y2.push(q2);
      } else {
        if (x == "unstructuredName") {
          var q2 = { seq: [{ oid: "1.2.840.113549.1.9.2" }, { set: r2.names }] };
          y2.push(q2);
        } else {
          if (x == "challengePassword") {
            var q2 = { seq: [{ oid: "1.2.840.113549.1.9.7" }, { set: [{ utf8str: r2.password }] }] };
            y2.push(q2);
          } else {
            throw new w2("unknown CSR attribute");
          }
        }
      }
    }
    return { set: y2 };
  }
  if (f2 != void 0) {
    this.setByParam(f2);
  }
};
extendClass(KJUR.asn1.csr.CertificationRequestInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.csr.AttributeList = function(b2) {
};
extendClass(KJUR.asn1.csr.AttributeList, KJUR.asn1.ASN1Object);
KJUR.asn1.csr.CSRUtil = new function() {
}();
KJUR.asn1.csr.CSRUtil.newCSRPEM = function(e2) {
  var a2 = KJUR.asn1.csr;
  var c2 = new a2.CertificationRequest(e2);
  var d2 = c2.getPEM();
  return d2;
};
KJUR.asn1.csr.CSRUtil.getParam = function(d2, a2) {
  var m2 = ASN1HEX, i2 = m2.getV, j2 = m2.getIdxbyList, b2 = m2.getTLVbyList, o2 = m2.getTLVbyListEx, n2 = m2.getVbyListEx;
  var l2 = function(u2) {
    var t2 = j2(u2, 0, [0, 3, 0, 0], "06");
    if (i2(u2, t2) != "2a864886f70d01090e") {
      return null;
    }
    return b2(u2, 0, [0, 3, 0, 1, 0], "30");
  };
  var g2 = {};
  if (d2.indexOf("-----BEGIN CERTIFICATE REQUEST") == -1) {
    throw new Error("argument is not PEM file");
  }
  var e2 = pemtohex(d2, "CERTIFICATE REQUEST");
  if (a2) {
    g2.tbs = b2(e2, 0, [0]);
  }
  try {
    var p2 = o2(e2, 0, [0, 1]);
    if (p2 == "3000") {
      g2.subject = {};
    } else {
      var f2 = new X509();
      g2.subject = f2.getX500Name(p2);
    }
  } catch (q2) {
  }
  var k = o2(e2, 0, [0, 2]);
  var r2 = KEYUTIL.getKey(k, null, "pkcs8pub");
  g2.sbjpubkey = KEYUTIL.getPEM(r2, "PKCS8PUB");
  var c2 = l2(e2);
  var f2 = new X509();
  if (c2 != null) {
    g2.extreq = f2.getExtParamArray(c2);
  }
  try {
    var h2 = o2(e2, 0, [1], "30");
    var f2 = new X509();
    g2.sigalg = f2.getAlgorithmIdentifierName(h2);
  } catch (q2) {
  }
  try {
    var s2 = n2(e2, 0, [2]);
    g2.sighex = s2;
  } catch (q2) {
  }
  return g2;
};
KJUR.asn1.csr.CSRUtil.verifySignature = function(b2) {
  try {
    var c2 = null;
    if (typeof b2 == "string" && b2.indexOf("-----BEGIN CERTIFICATE REQUEST") != -1) {
      c2 = KJUR.asn1.csr.CSRUtil.getParam(b2, true);
    } else {
      if (typeof b2 == "object" && b2.sbjpubkey != void 0 && b2.sigalg != void 0 && b2.sighex != void 0 && b2.tbs != void 0) {
        c2 = b2;
      }
    }
    if (c2 == null) {
      return false;
    }
    var d2 = new KJUR.crypto.Signature({ alg: c2.sigalg });
    d2.init(c2.sbjpubkey);
    d2.updateHex(c2.tbs);
    return d2.verify(c2.sighex);
  } catch (a2) {
    alert(a2);
    return false;
  }
};
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.ocsp == "undefined" || !KJUR.asn1.ocsp) {
  KJUR.asn1.ocsp = {};
}
KJUR.asn1.ocsp.DEFAULT_HASH = "sha1";
KJUR.asn1.ocsp.OCSPResponse = function(e2) {
  KJUR.asn1.ocsp.OCSPResponse.superclass.constructor.call(this);
  KJUR.asn1.DEREnumerated;
  var b2 = KJUR.asn1.ASN1Util.newObject, c2 = KJUR.asn1.ocsp.ResponseBytes;
  var d2 = ["successful", "malformedRequest", "internalError", "tryLater", "_not_used_", "sigRequired", "unauthorized"];
  this.params = null;
  this._getStatusCode = function() {
    var f2 = this.params.resstatus;
    if (typeof f2 == "number") {
      return f2;
    }
    if (typeof f2 != "string") {
      return -1;
    }
    return d2.indexOf(f2);
  };
  this.setByParam = function(f2) {
    this.params = f2;
  };
  this.tohex = function() {
    var h2 = this.params;
    var g2 = this._getStatusCode();
    if (g2 == -1) {
      throw new Error("responseStatus not supported: " + h2.resstatus);
    }
    if (g2 != 0) {
      return b2({ seq: [{ "enum": { "int": g2 } }] }).tohex();
    }
    var f2 = new c2(h2);
    return b2({ seq: [{ "enum": { "int": 0 } }, { tag: { tag: "a0", explicit: true, obj: f2 } }] }).tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.ocsp.OCSPResponse, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.ResponseBytes = function(e2) {
  KJUR.asn1.ocsp.ResponseBytes.superclass.constructor.call(this);
  var b2 = KJUR.asn1, a2 = b2.DERSequence, f2 = b2.DERObjectIdentifier, c2 = b2.DEROctetString, d2 = b2.ocsp.BasicOCSPResponse;
  this.params = null;
  this.setByParam = function(g2) {
    this.params = g2;
  };
  this.tohex = function() {
    var j2 = this.params;
    if (j2.restype != "ocspBasic") {
      throw new Error("not supported responseType: " + j2.restype);
    }
    var i2 = new d2(j2);
    var g2 = [];
    g2.push(new f2({ name: "ocspBasic" }));
    g2.push(new c2({ hex: i2.tohex() }));
    var h2 = new a2({ array: g2 });
    return h2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.ocsp.ResponseBytes, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.BasicOCSPResponse = function(d2) {
  KJUR.asn1.ocsp.BasicOCSPResponse.superclass.constructor.call(this);
  var i2 = Error, g2 = KJUR.asn1, j2 = g2.ASN1Object, e2 = g2.DERSequence;
  g2.DERGeneralizedTime;
  var c2 = g2.DERTaggedObject, b2 = g2.DERBitString;
  g2.x509.Extensions;
  var k = g2.x509.AlgorithmIdentifier, l2 = g2.ocsp;
  l2.ResponderID;
  _SingleResponseList = l2.SingleResponseList, _ResponseData = l2.ResponseData;
  this.params = null;
  this.setByParam = function(m2) {
    this.params = m2;
  };
  this.sign = function() {
    var o2 = this.params;
    var m2 = o2.tbsresp.tohex();
    var n2 = new KJUR.crypto.Signature({ alg: o2.sigalg });
    n2.init(o2.reskey);
    n2.updateHex(m2);
    o2.sighex = n2.sign();
  };
  this.tohex = function() {
    var t2 = this.params;
    if (t2.tbsresp == void 0) {
      t2.tbsresp = new _ResponseData(t2);
    }
    if (t2.sighex == void 0 && t2.reskey != void 0) {
      this.sign();
    }
    var n2 = [];
    n2.push(t2.tbsresp);
    n2.push(new k({ name: t2.sigalg }));
    n2.push(new b2({ hex: "00" + t2.sighex }));
    if (t2.certs != void 0 && t2.certs.length != void 0) {
      var m2 = [];
      for (var q2 = 0; q2 < t2.certs.length; q2++) {
        var s2 = t2.certs[q2];
        var r2 = null;
        if (ASN1HEX.isASN1HEX(s2)) {
          r2 = s2;
        } else {
          if (s2.match(/-----BEGIN/)) {
            r2 = pemtohex(s2);
          } else {
            throw new i2("certs[" + q2 + "] not hex or PEM");
          }
        }
        m2.push(new j2({ tlv: r2 }));
      }
      var p2 = new e2({ array: m2 });
      n2.push(new c2({ tag: "a0", explicit: true, obj: p2 }));
    }
    var o2 = new e2({ array: n2 });
    return o2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (d2 !== void 0) {
    this.setByParam(d2);
  }
};
extendClass(KJUR.asn1.ocsp.BasicOCSPResponse, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.ResponseData = function(c2) {
  KJUR.asn1.ocsp.ResponseData.superclass.constructor.call(this);
  var f2 = KJUR.asn1, d2 = f2.DERSequence, e2 = f2.DERGeneralizedTime, b2 = f2.DERTaggedObject, g2 = f2.x509.Extensions, i2 = f2.ocsp, a2 = i2.ResponderID;
  _SingleResponseList = i2.SingleResponseList;
  this.params = null;
  this.tohex = function() {
    var m2 = this.params;
    if (m2.respid != void 0)
      ;
    if (m2.prodat != void 0)
      ;
    if (m2.array != void 0)
      ;
    var j2 = [];
    j2.push(new a2(m2.respid));
    j2.push(new e2(m2.prodat));
    j2.push(new _SingleResponseList(m2.array));
    if (m2.ext != void 0) {
      var l2 = new g2(m2.ext);
      j2.push(new b2({ tag: "a1", explicit: true, obj: l2 }));
    }
    var k = new d2({ array: j2 });
    return k.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setByParam = function(j2) {
    this.params = j2;
  };
  if (c2 !== void 0) {
    this.setByParam(c2);
  }
};
extendClass(KJUR.asn1.ocsp.ResponseData, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.ResponderID = function(g2) {
  KJUR.asn1.ocsp.ResponderID.superclass.constructor.call(this);
  var d2 = KJUR, c2 = d2.asn1, b2 = c2.ASN1Util.newObject, f2 = c2.x509.X500Name, e2 = d2.lang.String.isHex, a2 = Error;
  this.params = null;
  this.tohex = function() {
    var m2 = this.params;
    if (m2.key != void 0) {
      var l2 = null;
      if (typeof m2.key == "string") {
        if (e2(m2.key)) {
          l2 = m2.key;
        }
        if (m2.key.match(/-----BEGIN CERTIFICATE/)) {
          var h2 = new X509(m2.key);
          var k = h2.getExtSubjectKeyIdentifier();
          if (k != null) {
            l2 = k.kid.hex;
          }
        }
      } else {
        if (m2.key instanceof X509) {
          var k = m2.key.getExtSubjectKeyIdentifier();
          if (k != null) {
            l2 = k.kid.hex;
          }
        }
      }
      if (l2 == null) {
        throw new a2("wrong key member value");
      }
      var j2 = b2({ tag: { tag: "a2", explicit: true, obj: { octstr: { hex: l2 } } } });
      return j2.tohex();
    } else {
      if (m2.name != void 0) {
        var i2 = null;
        if (typeof m2.name == "string" && m2.name.match(/-----BEGIN CERTIFICATE/)) {
          var h2 = new X509(m2.name);
          i2 = h2.getSubject();
        } else {
          if (m2.name instanceof X509) {
            i2 = m2.name.getSubject();
          } else {
            if (typeof m2.name == "object" && (m2.name.array != void 0 || m2.name.str != void 0)) {
              i2 = m2.name;
            }
          }
        }
        if (i2 == null) {
          throw new a2("wrong name member value");
        }
        var j2 = b2({ tag: { tag: "a1", explicit: true, obj: new f2(i2) } });
        return j2.tohex();
      }
    }
    throw new a2("key or name not specified");
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setByParam = function(h2) {
    this.params = h2;
  };
  if (g2 !== void 0) {
    this.setByParam(g2);
  }
};
extendClass(KJUR.asn1.ocsp.ResponderID, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.SingleResponseList = function(d2) {
  KJUR.asn1.ocsp.SingleResponseList.superclass.constructor.call(this);
  var c2 = KJUR.asn1, b2 = c2.DERSequence, a2 = c2.ocsp.SingleResponse;
  this.params = null;
  this.tohex = function() {
    var h2 = this.params;
    if (typeof h2 != "object" || h2.length == void 0) {
      throw new Error("params not specified properly");
    }
    var e2 = [];
    for (var g2 = 0; g2 < h2.length; g2++) {
      e2.push(new a2(h2[g2]));
    }
    var f2 = new b2({ array: e2 });
    return f2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setByParam = function(e2) {
    this.params = e2;
  };
  if (d2 !== void 0) {
    this.setByParam(d2);
  }
};
extendClass(KJUR.asn1.ocsp.SingleResponseList, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.SingleResponse = function(e2) {
  var k = Error, a2 = KJUR, i2 = a2.asn1, f2 = i2.DERSequence, g2 = i2.DERGeneralizedTime, b2 = i2.DERTaggedObject, l2 = i2.ocsp, h2 = l2.CertID, c2 = l2.CertStatus, d2 = i2.x509, j2 = d2.Extensions;
  l2.SingleResponse.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var q2 = this.params;
    var n2 = [];
    if (q2.certid == void 0) {
      throw new k("certid unspecified");
    }
    if (q2.status == void 0) {
      throw new k("status unspecified");
    }
    if (q2.thisupdate == void 0) {
      throw new k("thisupdate unspecified");
    }
    n2.push(new h2(q2.certid));
    n2.push(new c2(q2.status));
    n2.push(new g2(q2.thisupdate));
    if (q2.nextupdate != void 0) {
      var m2 = new g2(q2.nextupdate);
      n2.push(new b2({ tag: "a0", explicit: true, obj: m2 }));
    }
    if (q2.ext != void 0) {
      var p2 = new j2(q2.ext);
      n2.push(new b2({ tag: "a1", explicit: true, obj: p2 }));
    }
    var o2 = new f2({ array: n2 });
    return o2.tohex();
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setByParam = function(m2) {
    this.params = m2;
  };
  if (e2 !== void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.ocsp.SingleResponse, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.CertID = function(e2) {
  var b2 = KJUR, i2 = b2.asn1, l2 = i2.DEROctetString, h2 = i2.DERInteger, f2 = i2.DERSequence, d2 = i2.x509, m2 = d2.AlgorithmIdentifier, n2 = i2.ocsp;
  n2.DEFAULT_HASH;
  var g2 = b2.crypto, c2 = g2.Util.hashHex, a2 = X509, o2 = ASN1HEX, j2 = o2.getVbyList;
  n2.CertID.superclass.constructor.call(this);
  this.DEFAULT_HASH = "sha1";
  this.params = null;
  this.setByValue = function(s2, r2, p2, q2) {
    if (q2 == void 0) {
      q2 = this.DEFAULT_HASH;
    }
    this.params = { alg: q2, issname: s2, isskey: r2, sbjsn: p2 };
  };
  this.setByCert = function(p2, q2, r2) {
    if (r2 == void 0) {
      r2 = this.DEFAULT_HASH;
    }
    this.params = { alg: r2, issuerCert: p2, subjectCert: q2 };
  };
  this.getParamByCerts = function(y2, x, t2) {
    if (t2 == void 0) {
      t2 = this.DEFAULT_HASH;
    }
    var q2 = new a2(y2);
    var v2 = new a2(x);
    var s2 = c2(q2.getSubjectHex(), t2);
    var u2 = q2.getPublicKeyHex();
    var p2 = c2(j2(u2, 0, [1], "03", true), t2);
    var w2 = v2.getSerialNumberHex();
    var r2 = { alg: t2, issname: s2, isskey: p2, sbjsn: w2 };
    return r2;
  };
  this.tohex = function() {
    if (typeof this.params != "object") {
      throw new Error("params not set");
    }
    var s2 = this.params;
    var u2, r2, y2, q2;
    if (s2.alg == void 0) {
      q2 = this.DEFAULT_HASH;
    } else {
      q2 = s2.alg;
    }
    if (s2.issuerCert != void 0 && s2.subjectCert != void 0) {
      var t2 = this.getParamByCerts(s2.issuerCert, s2.subjectCert, q2);
      u2 = t2.issname;
      r2 = t2.isskey;
      y2 = t2.sbjsn;
    } else {
      if (s2.issname != void 0 && s2.isskey != void 0 && s2.sbjsn != void 0) {
        u2 = s2.issname;
        r2 = s2.isskey;
        y2 = s2.sbjsn;
      } else {
        throw new Error("required param members not defined");
      }
    }
    var A2 = new m2({ name: q2 });
    var v2 = new l2({ hex: u2 });
    var x = new l2({ hex: r2 });
    var w2 = new h2({ hex: y2 });
    var z2 = new f2({ array: [A2, v2, x, w2] });
    this.hTLV = z2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    this.setByParam(e2);
  }
};
extendClass(KJUR.asn1.ocsp.CertID, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.CertStatus = function(a2) {
  KJUR.asn1.ocsp.CertStatus.superclass.constructor.call(this);
  this.params = null;
  this.tohex = function() {
    var d2 = this.params;
    if (d2.status == "good") {
      return "8000";
    }
    if (d2.status == "unknown") {
      return "8200";
    }
    if (d2.status == "revoked") {
      var c2 = [{ gentime: { str: d2.time } }];
      if (d2.reason != void 0) {
        c2.push({ tag: { tag: "a0", explicit: true, obj: { "enum": { "int": d2.reason } } } });
      }
      var b2 = { tag: "a1", explicit: false, obj: { seq: c2 } };
      return KJUR.asn1.ASN1Util.newObject({ tag: b2 }).tohex();
    }
    throw new Error("bad status");
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  this.setByParam = function(b2) {
    this.params = b2;
  };
  if (a2 !== void 0) {
    this.setByParam(a2);
  }
};
extendClass(KJUR.asn1.ocsp.CertStatus, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.Request = function(f2) {
  var c2 = KJUR, b2 = c2.asn1, a2 = b2.DERSequence, d2 = b2.ocsp;
  d2.Request.superclass.constructor.call(this);
  this.dReqCert = null;
  this.dExt = null;
  this.tohex = function() {
    var g2 = [];
    if (this.dReqCert === null) {
      throw "reqCert not set";
    }
    g2.push(this.dReqCert);
    var h2 = new a2({ array: g2 });
    this.hTLV = h2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (typeof f2 !== "undefined") {
    var e2 = new d2.CertID(f2);
    this.dReqCert = e2;
  }
};
extendClass(KJUR.asn1.ocsp.Request, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.TBSRequest = function(e2) {
  var c2 = KJUR, b2 = c2.asn1, a2 = b2.DERSequence, d2 = b2.ocsp;
  d2.TBSRequest.superclass.constructor.call(this);
  this.version = 0;
  this.dRequestorName = null;
  this.dRequestList = [];
  this.dRequestExt = null;
  this.setRequestListByParam = function(h2) {
    var f2 = [];
    for (var g2 = 0; g2 < h2.length; g2++) {
      var j2 = new d2.Request(h2[0]);
      f2.push(j2);
    }
    this.dRequestList = f2;
  };
  this.tohex = function() {
    var f2 = [];
    if (this.version !== 0) {
      throw "not supported version: " + this.version;
    }
    if (this.dRequestorName !== null) {
      throw "requestorName not supported";
    }
    var h2 = new a2({ array: this.dRequestList });
    f2.push(h2);
    if (this.dRequestExt !== null) {
      throw "requestExtensions not supported";
    }
    var g2 = new a2({ array: f2 });
    this.hTLV = g2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (e2 !== void 0) {
    if (e2.reqList !== void 0) {
      this.setRequestListByParam(e2.reqList);
    }
  }
};
extendClass(KJUR.asn1.ocsp.TBSRequest, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.OCSPRequest = function(f2) {
  var c2 = KJUR, b2 = c2.asn1, a2 = b2.DERSequence, d2 = b2.ocsp;
  d2.OCSPRequest.superclass.constructor.call(this);
  this.dTbsRequest = null;
  this.dOptionalSignature = null;
  this.tohex = function() {
    var g2 = [];
    if (this.dTbsRequest !== null) {
      g2.push(this.dTbsRequest);
    } else {
      throw "tbsRequest not set";
    }
    if (this.dOptionalSignature !== null) {
      throw "optionalSignature not supported";
    }
    var h2 = new a2({ array: g2 });
    this.hTLV = h2.tohex();
    return this.hTLV;
  };
  this.getEncodedHex = function() {
    return this.tohex();
  };
  if (f2 !== void 0) {
    if (f2.reqList !== void 0) {
      var e2 = new d2.TBSRequest(f2);
      this.dTbsRequest = e2;
    }
  }
};
extendClass(KJUR.asn1.ocsp.OCSPRequest, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.OCSPUtil = {};
KJUR.asn1.ocsp.OCSPUtil.getRequestHex = function(a2, b2, h2) {
  var d2 = KJUR, c2 = d2.asn1, e2 = c2.ocsp;
  if (h2 === void 0) {
    h2 = e2.DEFAULT_HASH;
  }
  var g2 = { alg: h2, issuerCert: a2, subjectCert: b2 };
  var f2 = new e2.OCSPRequest({ reqList: [g2] });
  return f2.tohex();
};
KJUR.asn1.ocsp.OCSPUtil.getOCSPResponseInfo = function(b2) {
  var m2 = ASN1HEX, c2 = m2.getVbyList, k = m2.getVbyListEx, e2 = m2.getIdxbyList;
  m2.getIdxbyListEx;
  var g2 = m2.getV;
  var n2 = {};
  try {
    var j2 = k(b2, 0, [0], "0a");
    n2.responseStatus = parseInt(j2, 16);
  } catch (f2) {
  }
  if (n2.responseStatus !== 0) {
    return n2;
  }
  try {
    var i2 = e2(b2, 0, [1, 0, 1, 0, 0, 2, 0, 1]);
    if (b2.substr(i2, 2) === "80") {
      n2.certStatus = "good";
    } else {
      if (b2.substr(i2, 2) === "a1") {
        n2.certStatus = "revoked";
        n2.revocationTime = hextoutf8(c2(b2, i2, [0]));
      } else {
        if (b2.substr(i2, 2) === "82") {
          n2.certStatus = "unknown";
        }
      }
    }
  } catch (f2) {
  }
  try {
    var a2 = e2(b2, 0, [1, 0, 1, 0, 0, 2, 0, 2]);
    n2.thisUpdate = hextoutf8(g2(b2, a2));
  } catch (f2) {
  }
  try {
    var l2 = e2(b2, 0, [1, 0, 1, 0, 0, 2, 0, 3]);
    if (b2.substr(l2, 2) === "a0") {
      n2.nextUpdate = hextoutf8(c2(b2, l2, [0]));
    }
  } catch (f2) {
  }
  return n2;
};
KJUR.asn1.ocsp.OCSPParser = function() {
  var g2 = Error, a2 = X509, h2 = new a2(), l2 = ASN1HEX, i2 = l2.getV, b2 = l2.getTLV, f2 = l2.getIdxbyList, e2 = l2.getVbyList, c2 = l2.getTLVbyList, k = l2.getVbyListEx, d2 = l2.getTLVbyListEx, j2 = l2.getChildIdx;
  this.getOCSPRequest = function(o2) {
    var n2 = j2(o2, 0);
    if (n2.length != 1 && n2.length != 2) {
      throw new g2("wrong number elements: " + n2.length);
    }
    var m2 = this.getTBSRequest(b2(o2, n2[0]));
    return m2;
  };
  this.getTBSRequest = function(o2) {
    var m2 = {};
    var n2 = d2(o2, 0, [0], "30");
    m2.array = this.getRequestList(n2);
    var p2 = d2(o2, 0, ["[2]", 0], "30");
    if (p2 != null) {
      m2.ext = h2.getExtParamArray(p2);
    }
    return m2;
  };
  this.getRequestList = function(p2) {
    var m2 = [];
    var n2 = j2(p2, 0);
    for (var o2 = 0; o2 < n2.length; o2++) {
      var p2 = b2(p2, n2[o2]);
      m2.push(this.getRequest(p2));
    }
    return m2;
  };
  this.getRequest = function(n2) {
    var m2 = j2(n2, 0);
    if (m2.length != 1 && m2.length != 2) {
      throw new g2("wrong number elements: " + m2.length);
    }
    var p2 = this.getCertID(b2(n2, m2[0]));
    if (m2.length == 2) {
      var o2 = f2(n2, 0, [1, 0]);
      p2.ext = h2.getExtParamArray(b2(n2, o2));
    }
    return p2;
  };
  this.getCertID = function(p2) {
    var o2 = j2(p2, 0);
    if (o2.length != 4) {
      throw new g2("wrong number elements: " + o2.length);
    }
    var n2 = new a2();
    var m2 = {};
    m2.alg = n2.getAlgorithmIdentifierName(b2(p2, o2[0]));
    m2.issname = i2(p2, o2[1]);
    m2.isskey = i2(p2, o2[2]);
    m2.sbjsn = i2(p2, o2[3]);
    return m2;
  };
  this.getOCSPResponse = function(r2) {
    var o2 = j2(r2, 0);
    var m2;
    var q2 = i2(r2, o2[0]);
    var p2 = parseInt(q2);
    if (o2.length == 1) {
      return { resstatus: p2 };
    }
    var n2 = c2(r2, 0, [1, 0]);
    m2 = this.getResponseBytes(n2);
    m2.resstatus = p2;
    return m2;
  };
  this.getResponseBytes = function(p2) {
    var o2 = j2(p2, 0);
    var n2;
    var q2 = c2(p2, 0, [1, 0]);
    n2 = this.getBasicOCSPResponse(q2);
    var m2 = i2(p2, o2[0]);
    n2.restype = KJUR.asn1.x509.OID.oid2name(hextooid(m2));
    return n2;
  };
  this.getBasicOCSPResponse = function(q2) {
    var t2 = j2(q2, 0);
    var v2;
    v2 = this.getResponseData(b2(q2, t2[0]));
    var u2 = new X509();
    v2.alg = u2.getAlgorithmIdentifierName(b2(q2, t2[1]));
    var n2 = i2(q2, t2[2]);
    v2.sighex = n2.substr(2);
    var m2 = k(q2, 0, ["[0]"]);
    if (m2 != null) {
      var r2 = j2(m2, 0);
      var o2 = [];
      for (var p2 = 0; p2 < r2.length; p2++) {
        var s2 = b2(m2, r2[p2]);
        o2.push(s2);
      }
      v2.certs = o2;
    }
    return v2;
  };
  this.getResponseData = function(q2) {
    var p2 = j2(q2, 0);
    var r2 = p2.length;
    var o2 = {};
    var n2 = 0;
    if (q2.substr(p2[0], 2) == "a0") {
      n2++;
    }
    o2.respid = this.getResponderID(b2(q2, p2[n2++]));
    var t2 = i2(q2, p2[n2++]);
    o2.prodat = hextoutf8(t2);
    o2.array = this.getSingleResponseList(b2(q2, p2[n2++]));
    if (q2.substr(p2[r2 - 1], 2) == "a1") {
      var s2 = c2(q2, p2[r2 - 1], [0]);
      var m2 = new X509();
      o2.ext = m2.getExtParamArray(s2);
    }
    return o2;
  };
  this.getResponderID = function(o2) {
    var n2 = {};
    if (o2.substr(0, 2) == "a2") {
      var p2 = e2(o2, 0, [0]);
      n2.key = p2;
    }
    if (o2.substr(0, 2) == "a1") {
      var q2 = c2(o2, 0, [0]);
      var m2 = new X509();
      n2.name = m2.getX500Name(q2);
    }
    return n2;
  };
  this.getSingleResponseList = function(q2) {
    var n2 = j2(q2, 0);
    var m2 = [];
    for (var o2 = 0; o2 < n2.length; o2++) {
      var r2 = this.getSingleResponse(b2(q2, n2[o2]));
      m2.push(r2);
    }
    return m2;
  };
  this.getSingleResponse = function(p2) {
    var t2 = j2(p2, 0);
    var v2 = {};
    var r2 = this.getCertID(b2(p2, t2[0]));
    v2.certid = r2;
    var u2 = this.getCertStatus(b2(p2, t2[1]));
    v2.status = u2;
    if (p2.substr(t2[2], 2) == "18") {
      var q2 = i2(p2, t2[2]);
      v2.thisupdate = hextoutf8(q2);
    }
    for (var o2 = 3; o2 < t2.length; o2++) {
      if (p2.substr(t2[o2], 2) == "a0") {
        var m2 = e2(p2, t2[o2], [0], "18");
        v2.nextupdate = hextoutf8(m2);
      }
      if (p2.substr(t2[o2], 2) == "a1") {
        var s2 = new X509();
        var n2 = c2(p2, 0, [o2, 0]);
        v2.ext = s2.getExtParamArray(n2);
      }
    }
    return v2;
  };
  this.getCertStatus = function(p2) {
    var m2 = {};
    if (p2 == "8000") {
      return { status: "good" };
    }
    if (p2 == "8200") {
      return { status: "unknown" };
    }
    if (p2.substr(0, 2) == "a1") {
      m2.status = "revoked";
      var o2 = e2(p2, 0, [0]);
      var n2 = hextoutf8(o2);
      m2.time = n2;
    }
    return m2;
  };
};
var KJUR;
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.lang == "undefined" || !KJUR.lang) {
  KJUR.lang = {};
}
KJUR.lang.String = function() {
};
function stoBA(d2) {
  var b2 = new Array();
  for (var c2 = 0; c2 < d2.length; c2++) {
    b2[c2] = d2.charCodeAt(c2);
  }
  return b2;
}
function BAtohex(b2) {
  var e2 = "";
  for (var d2 = 0; d2 < b2.length; d2++) {
    var c2 = b2[d2].toString(16);
    if (c2.length == 1) {
      c2 = "0" + c2;
    }
    e2 = e2 + c2;
  }
  return e2;
}
function stohex(a2) {
  return BAtohex(stoBA(a2));
}
function b64tob64u(a2) {
  a2 = a2.replace(/\=/g, "");
  a2 = a2.replace(/\+/g, "-");
  a2 = a2.replace(/\//g, "_");
  return a2;
}
function b64utob64(a2) {
  if (a2.length % 4 == 2) {
    a2 = a2 + "==";
  } else {
    if (a2.length % 4 == 3) {
      a2 = a2 + "=";
    }
  }
  a2 = a2.replace(/-/g, "+");
  a2 = a2.replace(/_/g, "/");
  return a2;
}
function hextob64u(a2) {
  if (a2.length % 2 == 1) {
    a2 = "0" + a2;
  }
  return b64tob64u(hex2b64(a2));
}
function b64utohex(a2) {
  return b64tohex(b64utob64(a2));
}
var utf8tob64u, b64utoutf8;
if (typeof Buffer === "function") {
  utf8tob64u = function(a2) {
    return b64tob64u(Buffer.from(a2, "utf8").toString("base64"));
  };
  b64utoutf8 = function(a2) {
    return Buffer.from(b64utob64(a2), "base64").toString("utf8");
  };
} else {
  utf8tob64u = function(a2) {
    return hextob64u(uricmptohex(encodeURIComponentAll(a2)));
  };
  b64utoutf8 = function(a2) {
    return decodeURIComponent(hextouricmp(b64utohex(a2)));
  };
}
function utf8tohex(a2) {
  return uricmptohex(encodeURIComponentAll(a2)).toLowerCase();
}
function hextoutf8(b2) {
  try {
    return decodeURIComponent(hextouricmp(b2));
  } catch (a2) {
    return null;
  }
}
function iso88591hextoutf8(a2) {
  return hextoutf8(iso88591hextoutf8hex(a2));
}
function iso88591hextoutf8hex(e2) {
  var c2 = e2.match(/.{1,2}/g);
  var b2 = [];
  for (var d2 = 0; d2 < c2.length; d2++) {
    var f2 = parseInt(c2[d2], 16);
    if (161 <= f2 && f2 <= 191) {
      b2.push("c2");
      b2.push(c2[d2]);
    } else {
      if (192 <= f2 && f2 <= 255) {
        b2.push("c3");
        b2.push((f2 - 64).toString(16));
      } else {
        b2.push(c2[d2]);
      }
    }
  }
  return b2.join("");
}
function hextorstr(c2) {
  var b2 = "";
  for (var a2 = 0; a2 < c2.length - 1; a2 += 2) {
    b2 += String.fromCharCode(parseInt(c2.substr(a2, 2), 16));
  }
  return b2;
}
function rstrtohex(c2) {
  var a2 = "";
  for (var b2 = 0; b2 < c2.length; b2++) {
    a2 += ("0" + c2.charCodeAt(b2).toString(16)).slice(-2);
  }
  return a2;
}
function hextob64(a2) {
  return hex2b64(a2);
}
function foldnl(a2, b2) {
  a2 = a2.replace(new RegExp("(.{" + b2 + "})", "g"), "$1\r\n");
  a2 = a2.replace(/\s+$/, "");
  return a2;
}
function b64nltohex(b2) {
  var a2 = b2.replace(/[^0-9A-Za-z\/+=]*/g, "");
  var c2 = b64tohex(a2);
  return c2;
}
function hextopem(a2, b2) {
  return "-----BEGIN " + b2 + "-----\r\n" + foldnl(hextob64(a2), 64) + "\r\n-----END " + b2 + "-----\r\n";
}
function pemtohex(a2, b2) {
  if (a2.indexOf("-----BEGIN ") == -1) {
    throw new Error("can't find PEM header");
  }
  if (b2 !== void 0) {
    a2 = a2.replace(new RegExp("^[^]*-----BEGIN " + b2 + "-----"), "");
    a2 = a2.replace(new RegExp("-----END " + b2 + "-----[^]*$"), "");
  } else {
    a2 = a2.replace(/^[^]*-----BEGIN [^-]+-----/, "");
    a2 = a2.replace(/-----END [^-]+-----[^]*$/, "");
  }
  return b64nltohex(a2);
}
function zulutomsec(n2) {
  var l2, j2, m2, e2, f2, i2, b2;
  var h2, g2, c2;
  n2 = timetogen(n2);
  c2 = n2.match(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/);
  if (c2) {
    l2 = parseInt(c2[1]);
    j2 = parseInt(c2[2]) - 1;
    m2 = parseInt(c2[3]);
    e2 = parseInt(c2[4]);
    f2 = parseInt(c2[5]);
    i2 = parseInt(c2[6]);
    b2 = 0;
    h2 = c2[7];
    if (h2 !== "") {
      g2 = (h2.substr(1) + "00").substr(0, 3);
      b2 = parseInt(g2);
    }
    return Date.UTC(l2, j2, m2, e2, f2, i2, b2);
  }
  throw new Error("unsupported zulu format: " + n2);
}
function zulutosec(a2) {
  return Math.round(zulutomsec(a2) / 1e3);
}
function timetogen(a2) {
  if (a2.match(/^[0-9]{12}Z$/) || a2.match(/^[0-9]{12}[.][0-9]*Z$/)) {
    return a2.match(/^[0-4]/) ? "20" + a2 : "19" + a2;
  }
  return a2;
}
function uricmptohex(a2) {
  return a2.replace(/%/g, "");
}
function hextouricmp(a2) {
  return a2.replace(/(..)/g, "%$1");
}
function ipv6tohex(g2) {
  var b2 = "malformed IPv6 address";
  if (!g2.match(/^[0-9A-Fa-f:]+$/)) {
    throw b2;
  }
  g2 = g2.toLowerCase();
  var d2 = g2.split(":").length - 1;
  if (d2 < 2) {
    throw b2;
  }
  var e2 = ":".repeat(7 - d2 + 2);
  g2 = g2.replace("::", e2);
  var c2 = g2.split(":");
  if (c2.length != 8) {
    throw b2;
  }
  for (var f2 = 0; f2 < 8; f2++) {
    c2[f2] = ("0000" + c2[f2]).slice(-4);
  }
  return c2.join("");
}
function hextoipv6(d2) {
  if (!d2.match(/^[0-9A-Fa-f]{32}$/)) {
    throw new Error("malformed IPv6 address: " + d2);
  }
  d2 = d2.toLowerCase();
  var b2 = d2.match(/.{1,4}/g);
  b2 = b2.map(function(a2) {
    return a2.replace(/^0+/, "");
  });
  b2 = b2.map(function(a2) {
    return a2 == "" ? "0" : a2;
  });
  d2 = ":" + b2.join(":") + ":";
  var c2 = d2.match(/:(0:){2,}/g);
  if (c2 == null) {
    return d2.slice(1, -1);
  }
  var e2 = c2.sort().slice(-1)[0];
  d2 = d2.replace(e2.substr(0, e2.length - 1), ":");
  if (d2.substr(0, 2) != "::") {
    d2 = d2.substr(1);
  }
  if (d2.substr(-2, 2) != "::") {
    d2 = d2.substr(0, d2.length - 1);
  }
  return d2;
}
function hextoip(b2) {
  var c2 = new Error("malformed hex value");
  if (!b2.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)) {
    throw c2;
  }
  if (b2.length == 8) {
    var d2;
    try {
      d2 = parseInt(b2.substr(0, 2), 16) + "." + parseInt(b2.substr(2, 2), 16) + "." + parseInt(b2.substr(4, 2), 16) + "." + parseInt(b2.substr(6, 2), 16);
      return d2;
    } catch (a2) {
      throw c2;
    }
  } else {
    if (b2.length == 16) {
      try {
        return hextoip(b2.substr(0, 8)) + "/" + ipprefixlen(b2.substr(8));
      } catch (a2) {
        throw c2;
      }
    } else {
      if (b2.length == 32) {
        return hextoipv6(b2);
      } else {
        if (b2.length == 64) {
          try {
            return hextoipv6(b2.substr(0, 32)) + "/" + ipprefixlen(b2.substr(32));
          } catch (a2) {
            throw c2;
          }
          return;
        } else {
          return b2;
        }
      }
    }
  }
}
function ipprefixlen(c2) {
  var d2 = new Error("malformed mask");
  var a2;
  try {
    a2 = new BigInteger(c2, 16).toString(2);
  } catch (b2) {
    throw d2;
  }
  if (!a2.match(/^1*0*$/)) {
    throw d2;
  }
  return a2.replace(/0+$/, "").length;
}
function iptohex(g2) {
  var j2 = new Error("malformed IP address");
  g2 = g2.toLowerCase(g2);
  if (!g2.match(/^[0-9a-f.:/]+$/)) {
    throw j2;
  }
  if (g2.match(/^[0-9.]+$/)) {
    var b2 = g2.split(".");
    if (b2.length !== 4) {
      throw j2;
    }
    var h2 = "";
    try {
      for (var f2 = 0; f2 < 4; f2++) {
        var k = parseInt(b2[f2]);
        h2 += ("0" + k.toString(16)).slice(-2);
      }
      return h2;
    } catch (e2) {
      throw j2;
    }
  } else {
    if (g2.match(/^[0-9.]+\/[0-9]+$/)) {
      var c2 = g2.split("/");
      return iptohex(c2[0]) + ipnetmask(parseInt(c2[1]), 32);
    } else {
      if (g2.match(/^[0-9a-f:]+$/) && g2.indexOf(":") !== -1) {
        return ipv6tohex(g2);
      } else {
        if (g2.match(/^[0-9a-f:]+\/[0-9]+$/) && g2.indexOf(":") !== -1) {
          var c2 = g2.split("/");
          return ipv6tohex(c2[0]) + ipnetmask(parseInt(c2[1]), 128);
        } else {
          throw j2;
        }
      }
    }
  }
}
function ipnetmask(d2, c2) {
  if (c2 == 32 && d2 == 0) {
    return "00000000";
  }
  if (c2 == 128 && d2 == 0) {
    return "00000000000000000000000000000000";
  }
  var a2 = Array(d2 + 1).join("1") + Array(c2 - d2 + 1).join("0");
  return new BigInteger(a2, 2).toString(16);
}
function ucs2hextoutf8(d2) {
  function e2(f2) {
    var h2 = parseInt(f2.substr(0, 2), 16);
    var a2 = parseInt(f2.substr(2), 16);
    if (h2 == 0 & a2 < 128) {
      return String.fromCharCode(a2);
    }
    if (h2 < 8) {
      var j2 = 192 | (h2 & 7) << 3 | (a2 & 192) >> 6;
      var i2 = 128 | a2 & 63;
      return hextoutf8(j2.toString(16) + i2.toString(16));
    }
    var j2 = 224 | (h2 & 240) >> 4;
    var i2 = 128 | (h2 & 15) << 2 | (a2 & 192) >> 6;
    var g2 = 128 | a2 & 63;
    return hextoutf8(j2.toString(16) + i2.toString(16) + g2.toString(16));
  }
  var c2 = d2.match(/.{4}/g);
  var b2 = c2.map(e2);
  return b2.join("");
}
function encodeURIComponentAll(a2) {
  var d2 = encodeURIComponent(a2);
  var b2 = "";
  for (var c2 = 0; c2 < d2.length; c2++) {
    if (d2[c2] == "%") {
      b2 = b2 + d2.substr(c2, 3);
      c2 = c2 + 2;
    } else {
      b2 = b2 + "%" + stohex(d2[c2]);
    }
  }
  return b2;
}
KJUR.lang.String.isInteger = function(a2) {
  if (a2.match(/^[0-9]+$/)) {
    return true;
  } else {
    if (a2.match(/^-[0-9]+$/)) {
      return true;
    } else {
      return false;
    }
  }
};
KJUR.lang.String.isHex = function(a2) {
  return ishex(a2);
};
function ishex(a2) {
  if (a2.length % 2 == 0 && (a2.match(/^[0-9a-f]+$/) || a2.match(/^[0-9A-F]+$/))) {
    return true;
  } else {
    return false;
  }
}
KJUR.lang.String.isBase64 = function(a2) {
  a2 = a2.replace(/\s+/g, "");
  if (a2.match(/^[0-9A-Za-z+\/]+={0,3}$/) && a2.length % 4 == 0) {
    return true;
  } else {
    return false;
  }
};
KJUR.lang.String.isBase64URL = function(a2) {
  if (a2.match(/[+/=]/)) {
    return false;
  }
  a2 = b64utob64(a2);
  return KJUR.lang.String.isBase64(a2);
};
function isBase64URLDot(a2) {
  if (a2.match(/^[0-9A-Za-z-_.]+$/)) {
    return true;
  }
  return false;
}
KJUR.lang.String.isIntegerArray = function(a2) {
  a2 = a2.replace(/\s+/g, "");
  if (a2.match(/^\[[0-9,]+\]$/)) {
    return true;
  } else {
    return false;
  }
};
KJUR.lang.String.isPrintable = function(a2) {
  if (a2.match(/^[0-9A-Za-z '()+,-./:=?]*$/) !== null) {
    return true;
  }
  return false;
};
KJUR.lang.String.isIA5 = function(a2) {
  if (a2.match(/^[\x20-\x21\x23-\x7f]*$/) !== null) {
    return true;
  }
  return false;
};
KJUR.lang.String.isMail = function(a2) {
  if (a2.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/) !== null) {
    return true;
  }
  return false;
};
function hextoposhex(a2) {
  if (a2.length % 2 == 1) {
    return "0" + a2;
  }
  if (a2.substr(0, 1) > "7") {
    return "00" + a2;
  }
  return a2;
}
function oidtohex(g2) {
  var f2 = function(a2) {
    var l2 = a2.toString(16);
    if (l2.length == 1) {
      l2 = "0" + l2;
    }
    return l2;
  };
  var e2 = function(p2) {
    var o2 = "";
    var l2 = parseInt(p2, 10);
    var a2 = l2.toString(2);
    var m2 = 7 - a2.length % 7;
    if (m2 == 7) {
      m2 = 0;
    }
    var r2 = "";
    for (var n2 = 0; n2 < m2; n2++) {
      r2 += "0";
    }
    a2 = r2 + a2;
    for (var n2 = 0; n2 < a2.length - 1; n2 += 7) {
      var q2 = a2.substr(n2, 7);
      if (n2 != a2.length - 7) {
        q2 = "1" + q2;
      }
      o2 += f2(parseInt(q2, 2));
    }
    return o2;
  };
  try {
    if (!g2.match(/^[0-9.]+$/)) {
      return null;
    }
    var j2 = "";
    var b2 = g2.split(".");
    var k = parseInt(b2[0], 10) * 40 + parseInt(b2[1], 10);
    j2 += f2(k);
    b2.splice(0, 2);
    for (var d2 = 0; d2 < b2.length; d2++) {
      j2 += e2(b2[d2]);
    }
    return j2;
  } catch (c2) {
    return null;
  }
}
function hextooid(g2) {
  if (!ishex(g2)) {
    return null;
  }
  try {
    var m2 = [];
    var p2 = g2.substr(0, 2);
    var e2 = parseInt(p2, 16);
    m2[0] = new String(Math.floor(e2 / 40));
    m2[1] = new String(e2 % 40);
    var n2 = g2.substr(2);
    var l2 = [];
    for (var f2 = 0; f2 < n2.length / 2; f2++) {
      l2.push(parseInt(n2.substr(f2 * 2, 2), 16));
    }
    var k = [];
    var d2 = "";
    for (var f2 = 0; f2 < l2.length; f2++) {
      if (l2[f2] & 128) {
        d2 = d2 + strpad((l2[f2] & 127).toString(2), 7);
      } else {
        d2 = d2 + strpad((l2[f2] & 127).toString(2), 7);
        k.push(new String(parseInt(d2, 2)));
        d2 = "";
      }
    }
    var o2 = m2.join(".");
    if (k.length > 0) {
      o2 = o2 + "." + k.join(".");
    }
    return o2;
  } catch (j2) {
    return null;
  }
}
function inttohex(b2) {
  var a2 = new BigInteger(String(b2), 10);
  return twoscompl(a2);
}
function twoscompl(b2) {
  var g2 = b2.toString(16);
  if (g2.substr(0, 1) != "-") {
    if (g2.length % 2 == 1) {
      g2 = "0" + g2;
    } else {
      if (!g2.match(/^[0-7]/)) {
        g2 = "00" + g2;
      }
    }
    return g2;
  }
  var a2 = g2.substr(1);
  var f2 = a2.length;
  if (f2 % 2 == 1) {
    f2 += 1;
  } else {
    if (!g2.match(/^[0-7]/)) {
      f2 += 2;
    }
  }
  var j2 = "";
  for (var e2 = 0; e2 < f2; e2++) {
    j2 += "f";
  }
  var d2 = new BigInteger(j2, 16);
  var c2 = d2.xor(b2).add(BigInteger.ONE);
  g2 = c2.toString(16).replace(/^-/, "");
  return g2;
}
var strpad = function(c2, b2, a2) {
  if (a2 == void 0) {
    a2 = "0";
  }
  if (c2.length >= b2) {
    return c2;
  }
  return new Array(b2 - c2.length + 1).join(a2) + c2;
};
function bitstrtoint(e2) {
  if (e2.length % 2 != 0) {
    return -1;
  }
  e2 = e2.toLowerCase();
  if (e2.match(/^[0-9a-f]+$/) == null) {
    return -1;
  }
  try {
    var a2 = e2.substr(0, 2);
    if (a2 == "00") {
      return parseInt(e2.substr(2), 16);
    }
    var b2 = parseInt(a2, 16);
    if (b2 > 7) {
      return -1;
    }
    var g2 = e2.substr(2);
    var d2 = parseInt(g2, 16).toString(2);
    if (d2 == "0") {
      d2 = "00000000";
    }
    d2 = d2.slice(0, 0 - b2);
    var f2 = parseInt(d2, 2);
    if (f2 == NaN) {
      return -1;
    }
    return f2;
  } catch (c2) {
    return -1;
  }
}
function bitstrtobinstr(g2) {
  if (typeof g2 != "string") {
    return null;
  }
  if (g2.length % 2 != 0) {
    return null;
  }
  if (!g2.match(/^[0-9a-f]+$/)) {
    return null;
  }
  try {
    var c2 = parseInt(g2.substr(0, 2), 16);
    if (c2 < 0 || 7 < c2) {
      return null;
    }
    var j2 = g2.substr(2);
    var f2 = "";
    for (var e2 = 0; e2 < j2.length; e2 += 2) {
      var b2 = j2.substr(e2, 2);
      var a2 = parseInt(b2, 16).toString(2);
      a2 = ("0000000" + a2).slice(-8);
      f2 += a2;
    }
    return f2.substr(0, f2.length - c2);
  } catch (d2) {
    return null;
  }
}
function namearraytobinstr(e2, g2) {
  var f2 = 0;
  for (var a2 = 0; a2 < e2.length; a2++) {
    f2 |= 1 << g2[e2[a2]];
  }
  var b2 = f2.toString(2);
  var c2 = "";
  for (var a2 = b2.length - 1; a2 >= 0; a2--) {
    c2 += b2[a2];
  }
  return c2;
}
function aryval(e2, c2, d2) {
  if (typeof e2 != "object") {
    return void 0;
  }
  var c2 = String(c2).split(".");
  for (var b2 = 0; b2 < c2.length && e2; b2++) {
    var a2 = c2[b2];
    if (a2.match(/^[0-9]+$/)) {
      a2 = parseInt(a2);
    }
    e2 = e2[a2];
  }
  return e2 || e2 === false ? e2 : d2;
}
function extendClass(c2, a2) {
  var b2 = function() {
  };
  b2.prototype = a2.prototype;
  c2.prototype = new b2();
  c2.prototype.constructor = c2;
  c2.superclass = a2.prototype;
  if (a2.prototype.constructor == Object.prototype.constructor) {
    a2.prototype.constructor = a2;
  }
}
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
  KJUR.crypto = {};
}
KJUR.crypto.Util = new function() {
  this.DIGESTINFOHEAD = { sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", ripemd160: "3021300906052b2403020105000414" };
  this.DEFAULTPROVIDER = { md5: "cryptojs", sha1: "cryptojs", sha224: "cryptojs", sha256: "cryptojs", sha384: "cryptojs", sha512: "cryptojs", ripemd160: "cryptojs", hmacmd5: "cryptojs", hmacsha1: "cryptojs", hmacsha224: "cryptojs", hmacsha256: "cryptojs", hmacsha384: "cryptojs", hmacsha512: "cryptojs", hmacripemd160: "cryptojs", MD5withRSA: "cryptojs/jsrsa", SHA1withRSA: "cryptojs/jsrsa", SHA224withRSA: "cryptojs/jsrsa", SHA256withRSA: "cryptojs/jsrsa", SHA384withRSA: "cryptojs/jsrsa", SHA512withRSA: "cryptojs/jsrsa", RIPEMD160withRSA: "cryptojs/jsrsa", MD5withECDSA: "cryptojs/jsrsa", SHA1withECDSA: "cryptojs/jsrsa", SHA224withECDSA: "cryptojs/jsrsa", SHA256withECDSA: "cryptojs/jsrsa", SHA384withECDSA: "cryptojs/jsrsa", SHA512withECDSA: "cryptojs/jsrsa", RIPEMD160withECDSA: "cryptojs/jsrsa", SHA1withDSA: "cryptojs/jsrsa", SHA224withDSA: "cryptojs/jsrsa", SHA256withDSA: "cryptojs/jsrsa", MD5withRSAandMGF1: "cryptojs/jsrsa", SHAwithRSAandMGF1: "cryptojs/jsrsa", SHA1withRSAandMGF1: "cryptojs/jsrsa", SHA224withRSAandMGF1: "cryptojs/jsrsa", SHA256withRSAandMGF1: "cryptojs/jsrsa", SHA384withRSAandMGF1: "cryptojs/jsrsa", SHA512withRSAandMGF1: "cryptojs/jsrsa", RIPEMD160withRSAandMGF1: "cryptojs/jsrsa" };
  this.CRYPTOJSMESSAGEDIGESTNAME = { md5: CryptoJS.algo.MD5, sha1: CryptoJS.algo.SHA1, sha224: CryptoJS.algo.SHA224, sha256: CryptoJS.algo.SHA256, sha384: CryptoJS.algo.SHA384, sha512: CryptoJS.algo.SHA512, ripemd160: CryptoJS.algo.RIPEMD160 };
  this.getDigestInfoHex = function(a2, b2) {
    if (typeof this.DIGESTINFOHEAD[b2] == "undefined") {
      throw "alg not supported in Util.DIGESTINFOHEAD: " + b2;
    }
    return this.DIGESTINFOHEAD[b2] + a2;
  };
  this.getPaddedDigestInfoHex = function(h2, a2, j2) {
    var c2 = this.getDigestInfoHex(h2, a2);
    var d2 = j2 / 4;
    if (c2.length + 22 > d2) {
      throw "key is too short for SigAlg: keylen=" + j2 + "," + a2;
    }
    var b2 = "0001";
    var k = "00" + c2;
    var g2 = "";
    var l2 = d2 - b2.length - k.length;
    for (var f2 = 0; f2 < l2; f2 += 2) {
      g2 += "ff";
    }
    var e2 = b2 + g2 + k;
    return e2;
  };
  this.hashString = function(a2, c2) {
    var b2 = new KJUR.crypto.MessageDigest({ alg: c2 });
    return b2.digestString(a2);
  };
  this.hashHex = function(b2, c2) {
    var a2 = new KJUR.crypto.MessageDigest({ alg: c2 });
    return a2.digestHex(b2);
  };
  this.sha1 = function(a2) {
    return this.hashString(a2, "sha1");
  };
  this.sha256 = function(a2) {
    return this.hashString(a2, "sha256");
  };
  this.sha256Hex = function(a2) {
    return this.hashHex(a2, "sha256");
  };
  this.sha512 = function(a2) {
    return this.hashString(a2, "sha512");
  };
  this.sha512Hex = function(a2) {
    return this.hashHex(a2, "sha512");
  };
  this.isKey = function(a2) {
    if (a2 instanceof RSAKey || a2 instanceof KJUR.crypto.DSA || a2 instanceof KJUR.crypto.ECDSA) {
      return true;
    } else {
      return false;
    }
  };
}();
KJUR.crypto.Util.md5 = function(a2) {
  var b2 = new KJUR.crypto.MessageDigest({ alg: "md5", prov: "cryptojs" });
  return b2.digestString(a2);
};
KJUR.crypto.Util.ripemd160 = function(a2) {
  var b2 = new KJUR.crypto.MessageDigest({ alg: "ripemd160", prov: "cryptojs" });
  return b2.digestString(a2);
};
KJUR.crypto.Util.SECURERANDOMGEN = new SecureRandom();
KJUR.crypto.Util.getRandomHexOfNbytes = function(b2) {
  var a2 = new Array(b2);
  KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(a2);
  return BAtohex(a2);
};
KJUR.crypto.Util.getRandomBigIntegerOfNbytes = function(a2) {
  return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbytes(a2), 16);
};
KJUR.crypto.Util.getRandomHexOfNbits = function(d2) {
  var c2 = d2 % 8;
  var a2 = (d2 - c2) / 8;
  var b2 = new Array(a2 + 1);
  KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(b2);
  b2[0] = (255 << c2 & 255 ^ 255) & b2[0];
  return BAtohex(b2);
};
KJUR.crypto.Util.getRandomBigIntegerOfNbits = function(a2) {
  return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbits(a2), 16);
};
KJUR.crypto.Util.getRandomBigIntegerZeroToMax = function(b2) {
  var a2 = b2.bitLength();
  while (1) {
    var c2 = KJUR.crypto.Util.getRandomBigIntegerOfNbits(a2);
    if (b2.compareTo(c2) != -1) {
      return c2;
    }
  }
};
KJUR.crypto.Util.getRandomBigIntegerMinToMax = function(e2, b2) {
  var c2 = e2.compareTo(b2);
  if (c2 == 1) {
    throw "biMin is greater than biMax";
  }
  if (c2 == 0) {
    return e2;
  }
  var a2 = b2.subtract(e2);
  var d2 = KJUR.crypto.Util.getRandomBigIntegerZeroToMax(a2);
  return d2.add(e2);
};
KJUR.crypto.MessageDigest = function(c2) {
  this.setAlgAndProvider = function(g2, f2) {
    g2 = KJUR.crypto.MessageDigest.getCanonicalAlgName(g2);
    if (g2 !== null && f2 === void 0) {
      f2 = KJUR.crypto.Util.DEFAULTPROVIDER[g2];
    }
    if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g2) != -1 && f2 == "cryptojs") {
      try {
        this.md = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g2].create();
      } catch (e2) {
        throw "setAlgAndProvider hash alg set fail alg=" + g2 + "/" + e2;
      }
      this.updateString = function(h2) {
        this.md.update(h2);
      };
      this.updateHex = function(h2) {
        var i2 = CryptoJS.enc.Hex.parse(h2);
        this.md.update(i2);
      };
      this.digest = function() {
        var h2 = this.md.finalize();
        return h2.toString(CryptoJS.enc.Hex);
      };
      this.digestString = function(h2) {
        this.updateString(h2);
        return this.digest();
      };
      this.digestHex = function(h2) {
        this.updateHex(h2);
        return this.digest();
      };
    }
    if (":sha256:".indexOf(g2) != -1 && f2 == "sjcl") {
      try {
        this.md = new sjcl.hash.sha256();
      } catch (e2) {
        throw "setAlgAndProvider hash alg set fail alg=" + g2 + "/" + e2;
      }
      this.updateString = function(h2) {
        this.md.update(h2);
      };
      this.updateHex = function(i2) {
        var h2 = sjcl.codec.hex.toBits(i2);
        this.md.update(h2);
      };
      this.digest = function() {
        var h2 = this.md.finalize();
        return sjcl.codec.hex.fromBits(h2);
      };
      this.digestString = function(h2) {
        this.updateString(h2);
        return this.digest();
      };
      this.digestHex = function(h2) {
        this.updateHex(h2);
        return this.digest();
      };
    }
  };
  this.updateString = function(e2) {
    throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  this.updateHex = function(e2) {
    throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  this.digest = function() {
    throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  this.digestString = function(e2) {
    throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  this.digestHex = function(e2) {
    throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  if (c2 !== void 0) {
    if (c2.alg !== void 0) {
      this.algName = c2.alg;
      if (c2.prov === void 0) {
        this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
      }
      this.setAlgAndProvider(this.algName, this.provName);
    }
  }
};
KJUR.crypto.MessageDigest.getCanonicalAlgName = function(a2) {
  if (typeof a2 === "string") {
    a2 = a2.toLowerCase();
    a2 = a2.replace(/-/, "");
  }
  return a2;
};
KJUR.crypto.MessageDigest.getHashLength = function(c2) {
  var b2 = KJUR.crypto.MessageDigest;
  var a2 = b2.getCanonicalAlgName(c2);
  if (b2.HASHLENGTH[a2] === void 0) {
    throw "not supported algorithm: " + c2;
  }
  return b2.HASHLENGTH[a2];
};
KJUR.crypto.MessageDigest.HASHLENGTH = { md5: 16, sha1: 20, sha224: 28, sha256: 32, sha384: 48, sha512: 64, ripemd160: 20 };
KJUR.crypto.Mac = function(d2) {
  this.setAlgAndProvider = function(k, i2) {
    k = k.toLowerCase();
    if (k == null) {
      k = "hmacsha1";
    }
    k = k.toLowerCase();
    if (k.substr(0, 4) != "hmac") {
      throw "setAlgAndProvider unsupported HMAC alg: " + k;
    }
    if (i2 === void 0) {
      i2 = KJUR.crypto.Util.DEFAULTPROVIDER[k];
    }
    this.algProv = k + "/" + i2;
    var g2 = k.substr(4);
    if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g2) != -1 && i2 == "cryptojs") {
      try {
        var j2 = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g2];
        this.mac = CryptoJS.algo.HMAC.create(j2, this.pass);
      } catch (h2) {
        throw "setAlgAndProvider hash alg set fail hashAlg=" + g2 + "/" + h2;
      }
      this.updateString = function(l2) {
        this.mac.update(l2);
      };
      this.updateHex = function(l2) {
        var m2 = CryptoJS.enc.Hex.parse(l2);
        this.mac.update(m2);
      };
      this.doFinal = function() {
        var l2 = this.mac.finalize();
        return l2.toString(CryptoJS.enc.Hex);
      };
      this.doFinalString = function(l2) {
        this.updateString(l2);
        return this.doFinal();
      };
      this.doFinalHex = function(l2) {
        this.updateHex(l2);
        return this.doFinal();
      };
    }
  };
  this.updateString = function(g2) {
    throw "updateString(str) not supported for this alg/prov: " + this.algProv;
  };
  this.updateHex = function(g2) {
    throw "updateHex(hex) not supported for this alg/prov: " + this.algProv;
  };
  this.doFinal = function() {
    throw "digest() not supported for this alg/prov: " + this.algProv;
  };
  this.doFinalString = function(g2) {
    throw "digestString(str) not supported for this alg/prov: " + this.algProv;
  };
  this.doFinalHex = function(g2) {
    throw "digestHex(hex) not supported for this alg/prov: " + this.algProv;
  };
  this.setPassword = function(h2) {
    if (typeof h2 == "string") {
      var g2 = h2;
      if (h2.length % 2 == 1 || !h2.match(/^[0-9A-Fa-f]+$/)) {
        g2 = rstrtohex(h2);
      }
      this.pass = CryptoJS.enc.Hex.parse(g2);
      return;
    }
    if (typeof h2 != "object") {
      throw "KJUR.crypto.Mac unsupported password type: " + h2;
    }
    var g2 = null;
    if (h2.hex !== void 0) {
      if (h2.hex.length % 2 != 0 || !h2.hex.match(/^[0-9A-Fa-f]+$/)) {
        throw "Mac: wrong hex password: " + h2.hex;
      }
      g2 = h2.hex;
    }
    if (h2.utf8 !== void 0) {
      g2 = utf8tohex(h2.utf8);
    }
    if (h2.rstr !== void 0) {
      g2 = rstrtohex(h2.rstr);
    }
    if (h2.b64 !== void 0) {
      g2 = b64tohex(h2.b64);
    }
    if (h2.b64u !== void 0) {
      g2 = b64utohex(h2.b64u);
    }
    if (g2 == null) {
      throw "KJUR.crypto.Mac unsupported password type: " + h2;
    }
    this.pass = CryptoJS.enc.Hex.parse(g2);
  };
  if (d2 !== void 0) {
    if (d2.pass !== void 0) {
      this.setPassword(d2.pass);
    }
    if (d2.alg !== void 0) {
      this.algName = d2.alg;
      if (d2.prov === void 0) {
        this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
      }
      this.setAlgAndProvider(this.algName, this.provName);
    }
  }
};
KJUR.crypto.Signature = function(o2) {
  var q2 = null;
  this._setAlgNames = function() {
    var s2 = this.algName.match(/^(.+)with(.+)$/);
    if (s2) {
      this.mdAlgName = s2[1].toLowerCase();
      this.pubkeyAlgName = s2[2].toLowerCase();
      if (this.pubkeyAlgName == "rsaandmgf1" && this.mdAlgName == "sha") {
        this.mdAlgName = "sha1";
      }
    }
  };
  this._zeroPaddingOfSignature = function(x, w2) {
    var v2 = "";
    var t2 = w2 / 4 - x.length;
    for (var u2 = 0; u2 < t2; u2++) {
      v2 = v2 + "0";
    }
    return v2 + x;
  };
  this.setAlgAndProvider = function(u2, t2) {
    this._setAlgNames();
    if (t2 != "cryptojs/jsrsa") {
      throw new Error("provider not supported: " + t2);
    }
    if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) {
      try {
        this.md = new KJUR.crypto.MessageDigest({ alg: this.mdAlgName });
      } catch (s2) {
        throw new Error("setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + s2);
      }
      this.init = function(w2, x) {
        var y2 = null;
        try {
          if (x === void 0) {
            y2 = KEYUTIL.getKey(w2);
          } else {
            y2 = KEYUTIL.getKey(w2, x);
          }
        } catch (v2) {
          throw "init failed:" + v2;
        }
        if (y2.isPrivate === true) {
          this.prvKey = y2;
          this.state = "SIGN";
        } else {
          if (y2.isPublic === true) {
            this.pubKey = y2;
            this.state = "VERIFY";
          } else {
            throw "init failed.:" + y2;
          }
        }
      };
      this.updateString = function(v2) {
        this.md.updateString(v2);
      };
      this.updateHex = function(v2) {
        this.md.updateHex(v2);
      };
      this.sign = function() {
        this.sHashHex = this.md.digest();
        if (this.prvKey === void 0 && this.ecprvhex !== void 0 && this.eccurvename !== void 0 && KJUR.crypto.ECDSA !== void 0) {
          this.prvKey = new KJUR.crypto.ECDSA({ curve: this.eccurvename, prv: this.ecprvhex });
        }
        if (this.prvKey instanceof RSAKey && this.pubkeyAlgName === "rsaandmgf1") {
          this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen);
        } else {
          if (this.prvKey instanceof RSAKey && this.pubkeyAlgName === "rsa") {
            this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName);
          } else {
            if (this.prvKey instanceof KJUR.crypto.ECDSA) {
              this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
            } else {
              if (this.prvKey instanceof KJUR.crypto.DSA) {
                this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
              } else {
                throw "Signature: unsupported private key alg: " + this.pubkeyAlgName;
              }
            }
          }
        }
        return this.hSign;
      };
      this.signString = function(v2) {
        this.updateString(v2);
        return this.sign();
      };
      this.signHex = function(v2) {
        this.updateHex(v2);
        return this.sign();
      };
      this.verify = function(v2) {
        this.sHashHex = this.md.digest();
        if (this.pubKey === void 0 && this.ecpubhex !== void 0 && this.eccurvename !== void 0 && KJUR.crypto.ECDSA !== void 0) {
          this.pubKey = new KJUR.crypto.ECDSA({ curve: this.eccurvename, pub: this.ecpubhex });
        }
        if (this.pubKey instanceof RSAKey && this.pubkeyAlgName === "rsaandmgf1") {
          return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, v2, this.mdAlgName, this.pssSaltLen);
        } else {
          if (this.pubKey instanceof RSAKey && this.pubkeyAlgName === "rsa") {
            return this.pubKey.verifyWithMessageHash(this.sHashHex, v2);
          } else {
            if (KJUR.crypto.ECDSA !== void 0 && this.pubKey instanceof KJUR.crypto.ECDSA) {
              return this.pubKey.verifyWithMessageHash(this.sHashHex, v2);
            } else {
              if (KJUR.crypto.DSA !== void 0 && this.pubKey instanceof KJUR.crypto.DSA) {
                return this.pubKey.verifyWithMessageHash(this.sHashHex, v2);
              } else {
                throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
              }
            }
          }
        }
      };
    }
  };
  this.init = function(s2, t2) {
    throw "init(key, pass) not supported for this alg:prov=" + this.algProvName;
  };
  this.updateString = function(s2) {
    throw "updateString(str) not supported for this alg:prov=" + this.algProvName;
  };
  this.updateHex = function(s2) {
    throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName;
  };
  this.sign = function() {
    throw "sign() not supported for this alg:prov=" + this.algProvName;
  };
  this.signString = function(s2) {
    throw "digestString(str) not supported for this alg:prov=" + this.algProvName;
  };
  this.signHex = function(s2) {
    throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName;
  };
  this.verify = function(s2) {
    throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName;
  };
  this.initParams = o2;
  if (o2 !== void 0) {
    if (o2.alg !== void 0) {
      this.algName = o2.alg;
      if (o2.prov === void 0) {
        this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
      } else {
        this.provName = o2.prov;
      }
      this.algProvName = this.algName + ":" + this.provName;
      this.setAlgAndProvider(this.algName, this.provName);
      this._setAlgNames();
    }
    if (o2.psssaltlen !== void 0) {
      this.pssSaltLen = o2.psssaltlen;
    }
    if (o2.prvkeypem !== void 0) {
      if (o2.prvkeypas !== void 0) {
        throw "both prvkeypem and prvkeypas parameters not supported";
      } else {
        try {
          var q2 = KEYUTIL.getKey(o2.prvkeypem);
          this.init(q2);
        } catch (m2) {
          throw "fatal error to load pem private key: " + m2;
        }
      }
    }
  }
};
KJUR.crypto.Cipher = function(a2) {
};
KJUR.crypto.Cipher.encrypt = function(j2, i2, b2, c2) {
  if (aryval(c2, "enclag") != void 0) {
    b2 = c2.encalg;
  }
  if (typeof b2 == "string" && b2.substr(-4) == "-CBC") {
    var g2 = i2;
    var e2 = j2;
    if (aryval(c2, "key") != void 0) {
      g2 = c2.key;
    }
    if (aryval(c2, "enc") != void 0) {
      hEnc = c2.enc;
    }
    var h2 = CryptoJS.enc.Hex.parse(g2);
    var a2 = CryptoJS.enc.Hex.parse(e2);
    var f2 = CryptoJS.enc.Hex.parse(c2.iv);
    var d2;
    if (b2 == "des-EDE3-CBC") {
      d2 = CryptoJS.TripleDES.encrypt(a2, h2, { iv: f2 });
    } else {
      if (b2 == "aes128-CBC" || b2 == "aes256-CBC") {
        d2 = CryptoJS.AES.encrypt(a2, h2, { iv: f2 });
      } else {
        throw new Error("unsupported algorithm: " + b2);
      }
    }
    return d2 + "";
  } else {
    throw new Error("Cipher.encrypt: unsupported key or algorithm");
  }
};
KJUR.crypto.Cipher.decrypt = function(c2, j2, a2, b2) {
  if (aryval(b2, "enclag") != void 0) {
    a2 = b2.encalg;
  }
  if (typeof a2 == "string" && a2.substr(-4) == "-CBC") {
    var h2 = j2;
    var e2 = c2;
    if (aryval(b2, "key") != void 0) {
      h2 = b2.key;
    }
    if (aryval(b2, "enc") != void 0) {
      e2 = b2.enc;
    }
    var i2 = CryptoJS.enc.Hex.parse(h2);
    var f2 = CryptoJS.enc.Hex.parse(e2);
    var g2 = CryptoJS.enc.Hex.parse(b2.iv);
    var d2;
    if (a2 == "des-EDE3-CBC") {
      d2 = CryptoJS.TripleDES.decrypt({ ciphertext: f2 }, i2, { iv: g2 });
    } else {
      if (a2 == "aes128-CBC" || a2 == "aes256-CBC") {
        d2 = CryptoJS.AES.decrypt({ ciphertext: f2 }, i2, { iv: g2 });
      } else {
        throw new Error("unsupported algorithm: " + a2);
      }
    }
    return CryptoJS.enc.Hex.stringify(d2);
  } else {
    throw new Error("Cipher.decrypt: unsupported key or algorithm");
  }
};
KJUR.crypto.OID = new function() {
  this.oidhex2name = { "2a864886f70d010101": "rsaEncryption", "2a8648ce3d0201": "ecPublicKey", "2a8648ce380401": "dsa", "2a8648ce3d030107": "secp256r1", "2b8104001f": "secp192k1", "2b81040021": "secp224r1", "2b8104000a": "secp256k1", "2b81040022": "secp384r1", "2b81040023": "secp521r1", "2a8648ce380403": "SHA1withDSA", "608648016503040301": "SHA224withDSA", "608648016503040302": "SHA256withDSA" };
}();
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
  KJUR.crypto = {};
}
KJUR.crypto.ECDSA = function(e2) {
  var g2 = "secp256r1";
  var j2 = Error, f2 = BigInteger, h2 = ECPointFp, m2 = KJUR.crypto.ECDSA, c2 = KJUR.crypto.ECParameterDB, d2 = m2.getName, q2 = ASN1HEX, n2 = q2.getVbyListEx, k = q2.isASN1HEX;
  var a2 = new SecureRandom();
  this.type = "EC";
  this.isPrivate = false;
  this.isPublic = false;
  this.getBigRandom = function(r2) {
    return new f2(r2.bitLength(), a2).mod(r2.subtract(f2.ONE)).add(f2.ONE);
  };
  this.setNamedCurve = function(r2) {
    this.ecparams = c2.getByName(r2);
    this.prvKeyHex = null;
    this.pubKeyHex = null;
    this.curveName = r2;
  };
  this.setPrivateKeyHex = function(r2) {
    this.isPrivate = true;
    this.prvKeyHex = r2;
  };
  this.setPublicKeyHex = function(r2) {
    this.isPublic = true;
    this.pubKeyHex = r2;
  };
  this.getPublicKeyXYHex = function() {
    var t2 = this.pubKeyHex;
    if (t2.substr(0, 2) !== "04") {
      throw "this method supports uncompressed format(04) only";
    }
    var s2 = this.ecparams.keycharlen;
    if (t2.length !== 2 + s2 * 2) {
      throw "malformed public key hex length";
    }
    var r2 = {};
    r2.x = t2.substr(2, s2);
    r2.y = t2.substr(2 + s2);
    return r2;
  };
  this.getShortNISTPCurveName = function() {
    var r2 = this.curveName;
    if (r2 === "secp256r1" || r2 === "NIST P-256" || r2 === "P-256" || r2 === "prime256v1") {
      return "P-256";
    }
    if (r2 === "secp384r1" || r2 === "NIST P-384" || r2 === "P-384") {
      return "P-384";
    }
    if (r2 === "secp521r1" || r2 === "NIST P-521" || r2 === "P-521") {
      return "P-521";
    }
    return null;
  };
  this.generateKeyPairHex = function() {
    var s2 = this.ecparams.n;
    var u2 = this.getBigRandom(s2);
    var r2 = this.ecparams.keycharlen;
    var t2 = ("0000000000" + u2.toString(16)).slice(-r2);
    this.setPrivateKeyHex(t2);
    var v2 = this.generatePublicKeyHex();
    return { ecprvhex: t2, ecpubhex: v2 };
  };
  this.generatePublicKeyHex = function() {
    var u2 = new f2(this.prvKeyHex, 16);
    var w2 = this.ecparams.G.multiply(u2);
    var t2 = w2.getX().toBigInteger();
    var s2 = w2.getY().toBigInteger();
    var r2 = this.ecparams.keycharlen;
    var y2 = ("0000000000" + t2.toString(16)).slice(-r2);
    var v2 = ("0000000000" + s2.toString(16)).slice(-r2);
    var x = "04" + y2 + v2;
    this.setPublicKeyHex(x);
    return x;
  };
  this.signWithMessageHash = function(r2) {
    return this.signHex(r2, this.prvKeyHex);
  };
  this.signHex = function(x, u2) {
    var A2 = new f2(u2, 16);
    var v2 = this.ecparams.n;
    var z2 = new f2(x.substring(0, this.ecparams.keycharlen), 16);
    do {
      var w2 = this.getBigRandom(v2);
      var B2 = this.ecparams.G;
      var y2 = B2.multiply(w2);
      var t2 = y2.getX().toBigInteger().mod(v2);
    } while (t2.compareTo(f2.ZERO) <= 0);
    var C2 = w2.modInverse(v2).multiply(z2.add(A2.multiply(t2))).mod(v2);
    return m2.biRSSigToASN1Sig(t2, C2);
  };
  this.sign = function(w2, B2) {
    var z2 = B2;
    var u2 = this.ecparams.n;
    var y2 = f2.fromByteArrayUnsigned(w2);
    do {
      var v2 = this.getBigRandom(u2);
      var A2 = this.ecparams.G;
      var x = A2.multiply(v2);
      var t2 = x.getX().toBigInteger().mod(u2);
    } while (t2.compareTo(BigInteger.ZERO) <= 0);
    var C2 = v2.modInverse(u2).multiply(y2.add(z2.multiply(t2))).mod(u2);
    return this.serializeSig(t2, C2);
  };
  this.verifyWithMessageHash = function(s2, r2) {
    return this.verifyHex(s2, r2, this.pubKeyHex);
  };
  this.verifyHex = function(v2, y2, u2) {
    try {
      var t2, B2;
      var w2 = m2.parseSigHex(y2);
      t2 = w2.r;
      B2 = w2.s;
      var x = h2.decodeFromHex(this.ecparams.curve, u2);
      var z2 = new f2(v2.substring(0, this.ecparams.keycharlen), 16);
      return this.verifyRaw(z2, t2, B2, x);
    } catch (A2) {
      return false;
    }
  };
  this.verify = function(z2, A2, u2) {
    var w2, t2;
    if (Bitcoin.Util.isArray(A2)) {
      var y2 = this.parseSig(A2);
      w2 = y2.r;
      t2 = y2.s;
    } else {
      if ("object" === typeof A2 && A2.r && A2.s) {
        w2 = A2.r;
        t2 = A2.s;
      } else {
        throw "Invalid value for signature";
      }
    }
    var v2;
    if (u2 instanceof ECPointFp) {
      v2 = u2;
    } else {
      if (Bitcoin.Util.isArray(u2)) {
        v2 = h2.decodeFrom(this.ecparams.curve, u2);
      } else {
        throw "Invalid format for pubkey value, must be byte array or ECPointFp";
      }
    }
    var x = f2.fromByteArrayUnsigned(z2);
    return this.verifyRaw(x, w2, t2, v2);
  };
  this.verifyRaw = function(z2, t2, E2, y2) {
    var x = this.ecparams.n;
    var D2 = this.ecparams.G;
    if (t2.compareTo(f2.ONE) < 0 || t2.compareTo(x) >= 0) {
      return false;
    }
    if (E2.compareTo(f2.ONE) < 0 || E2.compareTo(x) >= 0) {
      return false;
    }
    var A2 = E2.modInverse(x);
    var w2 = z2.multiply(A2).mod(x);
    var u2 = t2.multiply(A2).mod(x);
    var B2 = D2.multiply(w2).add(y2.multiply(u2));
    var C2 = B2.getX().toBigInteger().mod(x);
    return C2.equals(t2);
  };
  this.serializeSig = function(v2, u2) {
    var w2 = v2.toByteArraySigned();
    var t2 = u2.toByteArraySigned();
    var x = [];
    x.push(2);
    x.push(w2.length);
    x = x.concat(w2);
    x.push(2);
    x.push(t2.length);
    x = x.concat(t2);
    x.unshift(x.length);
    x.unshift(48);
    return x;
  };
  this.parseSig = function(y2) {
    var x;
    if (y2[0] != 48) {
      throw new Error("Signature not a valid DERSequence");
    }
    x = 2;
    if (y2[x] != 2) {
      throw new Error("First element in signature must be a DERInteger");
    }
    var w2 = y2.slice(x + 2, x + 2 + y2[x + 1]);
    x += 2 + y2[x + 1];
    if (y2[x] != 2) {
      throw new Error("Second element in signature must be a DERInteger");
    }
    var t2 = y2.slice(x + 2, x + 2 + y2[x + 1]);
    x += 2 + y2[x + 1];
    var v2 = f2.fromByteArrayUnsigned(w2);
    var u2 = f2.fromByteArrayUnsigned(t2);
    return { r: v2, s: u2 };
  };
  this.parseSigCompact = function(w2) {
    if (w2.length !== 65) {
      throw "Signature has the wrong length";
    }
    var t2 = w2[0] - 27;
    if (t2 < 0 || t2 > 7) {
      throw "Invalid signature type";
    }
    var x = this.ecparams.n;
    var v2 = f2.fromByteArrayUnsigned(w2.slice(1, 33)).mod(x);
    var u2 = f2.fromByteArrayUnsigned(w2.slice(33, 65)).mod(x);
    return { r: v2, s: u2, i: t2 };
  };
  this.readPKCS5PrvKeyHex = function(u2) {
    if (k(u2) === false) {
      throw new Error("not ASN.1 hex string");
    }
    var r2, t2, v2;
    try {
      r2 = n2(u2, 0, ["[0]", 0], "06");
      t2 = n2(u2, 0, [1], "04");
      try {
        v2 = n2(u2, 0, ["[1]", 0], "03");
      } catch (s2) {
      }
    } catch (s2) {
      throw new Error("malformed PKCS#1/5 plain ECC private key");
    }
    this.curveName = d2(r2);
    if (this.curveName === void 0) {
      throw "unsupported curve name";
    }
    this.setNamedCurve(this.curveName);
    this.setPublicKeyHex(v2);
    this.setPrivateKeyHex(t2);
    this.isPublic = false;
  };
  this.readPKCS8PrvKeyHex = function(v2) {
    if (k(v2) === false) {
      throw new j2("not ASN.1 hex string");
    }
    var t2, r2, u2, w2;
    try {
      t2 = n2(v2, 0, [1, 0], "06");
      r2 = n2(v2, 0, [1, 1], "06");
      u2 = n2(v2, 0, [2, 0, 1], "04");
      try {
        w2 = n2(v2, 0, [2, 0, "[1]", 0], "03");
      } catch (s2) {
      }
    } catch (s2) {
      throw new j2("malformed PKCS#8 plain ECC private key");
    }
    this.curveName = d2(r2);
    if (this.curveName === void 0) {
      throw new j2("unsupported curve name");
    }
    this.setNamedCurve(this.curveName);
    this.setPublicKeyHex(w2);
    this.setPrivateKeyHex(u2);
    this.isPublic = false;
  };
  this.readPKCS8PubKeyHex = function(u2) {
    if (k(u2) === false) {
      throw new j2("not ASN.1 hex string");
    }
    var t2, r2, v2;
    try {
      t2 = n2(u2, 0, [0, 0], "06");
      r2 = n2(u2, 0, [0, 1], "06");
      v2 = n2(u2, 0, [1], "03");
    } catch (s2) {
      throw new j2("malformed PKCS#8 ECC public key");
    }
    this.curveName = d2(r2);
    if (this.curveName === null) {
      throw new j2("unsupported curve name");
    }
    this.setNamedCurve(this.curveName);
    this.setPublicKeyHex(v2);
  };
  this.readCertPubKeyHex = function(t2, v2) {
    if (k(t2) === false) {
      throw new j2("not ASN.1 hex string");
    }
    var r2, u2;
    try {
      r2 = n2(t2, 0, [0, 5, 0, 1], "06");
      u2 = n2(t2, 0, [0, 5, 1], "03");
    } catch (s2) {
      throw new j2("malformed X.509 certificate ECC public key");
    }
    this.curveName = d2(r2);
    if (this.curveName === null) {
      throw new j2("unsupported curve name");
    }
    this.setNamedCurve(this.curveName);
    this.setPublicKeyHex(u2);
  };
  if (e2 !== void 0) {
    if (e2.curve !== void 0) {
      this.curveName = e2.curve;
    }
  }
  if (this.curveName === void 0) {
    this.curveName = g2;
  }
  this.setNamedCurve(this.curveName);
  if (e2 !== void 0) {
    if (e2.prv !== void 0) {
      this.setPrivateKeyHex(e2.prv);
    }
    if (e2.pub !== void 0) {
      this.setPublicKeyHex(e2.pub);
    }
  }
};
KJUR.crypto.ECDSA.parseSigHex = function(a2) {
  var b2 = KJUR.crypto.ECDSA.parseSigHexInHexRS(a2);
  var d2 = new BigInteger(b2.r, 16);
  var c2 = new BigInteger(b2.s, 16);
  return { r: d2, s: c2 };
};
KJUR.crypto.ECDSA.parseSigHexInHexRS = function(f2) {
  var j2 = ASN1HEX, i2 = j2.getChildIdx, g2 = j2.getV;
  j2.checkStrictDER(f2, 0);
  if (f2.substr(0, 2) != "30") {
    throw new Error("signature is not a ASN.1 sequence");
  }
  var h2 = i2(f2, 0);
  if (h2.length != 2) {
    throw new Error("signature shall have two elements");
  }
  var e2 = h2[0];
  var d2 = h2[1];
  if (f2.substr(e2, 2) != "02") {
    throw new Error("1st item not ASN.1 integer");
  }
  if (f2.substr(d2, 2) != "02") {
    throw new Error("2nd item not ASN.1 integer");
  }
  var c2 = g2(f2, e2);
  var b2 = g2(f2, d2);
  return { r: c2, s: b2 };
};
KJUR.crypto.ECDSA.asn1SigToConcatSig = function(d2) {
  var e2 = KJUR.crypto.ECDSA.parseSigHexInHexRS(d2);
  var b2 = e2.r;
  var a2 = e2.s;
  if (b2.length >= 130 && b2.length <= 134) {
    if (b2.length % 2 != 0) {
      throw Error("unknown ECDSA sig r length error");
    }
    if (a2.length % 2 != 0) {
      throw Error("unknown ECDSA sig s length error");
    }
    if (b2.substr(0, 2) == "00") {
      b2 = b2.substr(2);
    }
    if (a2.substr(0, 2) == "00") {
      a2 = a2.substr(2);
    }
    var c2 = Math.max(b2.length, a2.length);
    b2 = ("000000" + b2).slice(-c2);
    a2 = ("000000" + a2).slice(-c2);
    return b2 + a2;
  }
  if (b2.substr(0, 2) == "00" && b2.length % 32 == 2) {
    b2 = b2.substr(2);
  }
  if (a2.substr(0, 2) == "00" && a2.length % 32 == 2) {
    a2 = a2.substr(2);
  }
  if (b2.length % 32 == 30) {
    b2 = "00" + b2;
  }
  if (a2.length % 32 == 30) {
    a2 = "00" + a2;
  }
  if (b2.length % 32 != 0) {
    throw Error("unknown ECDSA sig r length error");
  }
  if (a2.length % 32 != 0) {
    throw Error("unknown ECDSA sig s length error");
  }
  return b2 + a2;
};
KJUR.crypto.ECDSA.concatSigToASN1Sig = function(a2) {
  if (a2.length % 4 != 0) {
    throw Error("unknown ECDSA concatinated r-s sig length error");
  }
  var c2 = a2.substr(0, a2.length / 2);
  var b2 = a2.substr(a2.length / 2);
  return KJUR.crypto.ECDSA.hexRSSigToASN1Sig(c2, b2);
};
KJUR.crypto.ECDSA.hexRSSigToASN1Sig = function(b2, a2) {
  var d2 = new BigInteger(b2, 16);
  var c2 = new BigInteger(a2, 16);
  return KJUR.crypto.ECDSA.biRSSigToASN1Sig(d2, c2);
};
KJUR.crypto.ECDSA.biRSSigToASN1Sig = function(f2, d2) {
  var c2 = KJUR.asn1;
  var b2 = new c2.DERInteger({ bigint: f2 });
  var a2 = new c2.DERInteger({ bigint: d2 });
  var e2 = new c2.DERSequence({ array: [b2, a2] });
  return e2.tohex();
};
KJUR.crypto.ECDSA.getName = function(a2) {
  if (a2 === "2b8104001f") {
    return "secp192k1";
  }
  if (a2 === "2a8648ce3d030107") {
    return "secp256r1";
  }
  if (a2 === "2b8104000a") {
    return "secp256k1";
  }
  if (a2 === "2b81040021") {
    return "secp224r1";
  }
  if (a2 === "2b81040022") {
    return "secp384r1";
  }
  if (a2 === "2b81040023") {
    return "secp521r1";
  }
  if ("|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(a2) !== -1) {
    return "secp256r1";
  }
  if ("|secp256k1|".indexOf(a2) !== -1) {
    return "secp256k1";
  }
  if ("|secp224r1|NIST P-224|P-224|".indexOf(a2) !== -1) {
    return "secp224r1";
  }
  if ("|secp384r1|NIST P-384|P-384|".indexOf(a2) !== -1) {
    return "secp384r1";
  }
  if ("|secp521r1|NIST P-521|P-521|".indexOf(a2) !== -1) {
    return "secp521r1";
  }
  return null;
};
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
  KJUR.crypto = {};
}
KJUR.crypto.ECParameterDB = new function() {
  var b2 = {};
  var c2 = {};
  function a2(d2) {
    return new BigInteger(d2, 16);
  }
  this.getByName = function(e2) {
    var d2 = e2;
    if (typeof c2[d2] != "undefined") {
      d2 = c2[e2];
    }
    if (typeof b2[d2] != "undefined") {
      return b2[d2];
    }
    throw "unregistered EC curve name: " + d2;
  };
  this.regist = function(A2, l2, o2, g2, m2, e2, j2, f2, k, u2, d2, x) {
    b2[A2] = {};
    var s2 = a2(o2);
    var z2 = a2(g2);
    var y2 = a2(m2);
    var t2 = a2(e2);
    var w2 = a2(j2);
    var r2 = new ECCurveFp(s2, z2, y2);
    var q2 = r2.decodePointHex("04" + f2 + k);
    b2[A2]["name"] = A2;
    b2[A2]["keylen"] = l2;
    b2[A2]["keycharlen"] = Math.ceil(l2 / 8) * 2;
    b2[A2]["curve"] = r2;
    b2[A2]["G"] = q2;
    b2[A2]["n"] = t2;
    b2[A2]["h"] = w2;
    b2[A2]["oid"] = d2;
    b2[A2]["info"] = x;
    for (var v2 = 0; v2 < u2.length; v2++) {
      c2[u2[v2]] = A2;
    }
  };
}();
KJUR.crypto.ECParameterDB.regist("secp128r1", 128, "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC", "E87579C11079F43DD824993C2CEE5ED3", "FFFFFFFE0000000075A30D1B9038A115", "1", "161FF7528B899B2D0C28607CA52C5B86", "CF5AC8395BAFEB13C02DA292DDED7A83", [], "", "secp128r1 : SECG curve over a 128 bit prime field");
KJUR.crypto.ECParameterDB.regist("secp160k1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73", "0", "7", "0100000000000000000001B8FA16DFAB9ACA16B6B3", "1", "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB", "938CF935318FDCED6BC28286531733C3F03C4FEE", [], "", "secp160k1 : SECG curve over a 160 bit prime field");
KJUR.crypto.ECParameterDB.regist("secp160r1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC", "1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45", "0100000000000000000001F4C8F927AED3CA752257", "1", "4A96B5688EF573284664698968C38BB913CBFC82", "23A628553168947D59DCC912042351377AC5FB32", [], "", "secp160r1 : SECG curve over a 160 bit prime field");
KJUR.crypto.ECParameterDB.regist("secp192k1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37", "0", "3", "FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D", "1", "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D", "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D", []);
KJUR.crypto.ECParameterDB.regist("secp192r1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC", "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1", "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831", "1", "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", []);
KJUR.crypto.ECParameterDB.regist("secp224r1", 224, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE", "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4", "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D", "1", "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21", "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34", []);
KJUR.crypto.ECParameterDB.regist("secp256k1", 256, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", "0", "7", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "1", "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", []);
KJUR.crypto.ECParameterDB.regist("secp256r1", 256, "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", "1", "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", ["NIST P-256", "P-256", "prime256v1"]);
KJUR.crypto.ECParameterDB.regist("secp384r1", 384, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC", "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973", "1", "AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7", "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f", ["NIST P-384", "P-384"]);
KJUR.crypto.ECParameterDB.regist("secp521r1", 521, "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC", "051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409", "1", "00C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66", "011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650", ["NIST P-521", "P-521"]);
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
  KJUR.crypto = {};
}
KJUR.crypto.DSA = function() {
  var b2 = ASN1HEX;
  b2.getVbyList;
  var d2 = b2.getVbyListEx, a2 = b2.isASN1HEX, c2 = BigInteger;
  this.p = null;
  this.q = null;
  this.g = null;
  this.y = null;
  this.x = null;
  this.type = "DSA";
  this.isPrivate = false;
  this.isPublic = false;
  this.setPrivate = function(j2, i2, h2, k, f2) {
    this.isPrivate = true;
    this.p = j2;
    this.q = i2;
    this.g = h2;
    this.y = k;
    this.x = f2;
  };
  this.setPrivateHex = function(i2, g2, k, n2, o2) {
    var h2, f2, j2, l2, m2;
    h2 = new BigInteger(i2, 16);
    f2 = new BigInteger(g2, 16);
    j2 = new BigInteger(k, 16);
    if (typeof n2 === "string" && n2.length > 1) {
      l2 = new BigInteger(n2, 16);
    } else {
      l2 = null;
    }
    m2 = new BigInteger(o2, 16);
    this.setPrivate(h2, f2, j2, l2, m2);
  };
  this.setPublic = function(i2, h2, f2, j2) {
    this.isPublic = true;
    this.p = i2;
    this.q = h2;
    this.g = f2;
    this.y = j2;
    this.x = null;
  };
  this.setPublicHex = function(k, j2, i2, l2) {
    var g2, f2, m2, h2;
    g2 = new BigInteger(k, 16);
    f2 = new BigInteger(j2, 16);
    m2 = new BigInteger(i2, 16);
    h2 = new BigInteger(l2, 16);
    this.setPublic(g2, f2, m2, h2);
  };
  this.signWithMessageHash = function(j2) {
    var i2 = this.p;
    var h2 = this.q;
    var m2 = this.g;
    this.y;
    var t2 = this.x;
    var l2 = KJUR.crypto.Util.getRandomBigIntegerMinToMax(BigInteger.ONE.add(BigInteger.ONE), h2.subtract(BigInteger.ONE));
    var u2 = j2.substr(0, h2.bitLength() / 4);
    var n2 = new BigInteger(u2, 16);
    var f2 = m2.modPow(l2, i2).mod(h2);
    var w2 = l2.modInverse(h2).multiply(n2.add(t2.multiply(f2))).mod(h2);
    var v2 = KJUR.asn1.ASN1Util.jsonToASN1HEX({ seq: [{ "int": { bigint: f2 } }, { "int": { bigint: w2 } }] });
    return v2;
  };
  this.verifyWithMessageHash = function(m2, l2) {
    var j2 = this.p;
    var h2 = this.q;
    var o2 = this.g;
    var u2 = this.y;
    var n2 = this.parseASN1Signature(l2);
    var f2 = n2[0];
    var C2 = n2[1];
    var B2 = m2.substr(0, h2.bitLength() / 4);
    var t2 = new BigInteger(B2, 16);
    if (BigInteger.ZERO.compareTo(f2) > 0 || f2.compareTo(h2) > 0) {
      throw "invalid DSA signature";
    }
    if (BigInteger.ZERO.compareTo(C2) >= 0 || C2.compareTo(h2) > 0) {
      throw "invalid DSA signature";
    }
    var x = C2.modInverse(h2);
    var k = t2.multiply(x).mod(h2);
    var i2 = f2.multiply(x).mod(h2);
    var A2 = o2.modPow(k, j2).multiply(u2.modPow(i2, j2)).mod(j2).mod(h2);
    return A2.compareTo(f2) == 0;
  };
  this.parseASN1Signature = function(f2) {
    try {
      var i2 = new c2(d2(f2, 0, [0], "02"), 16);
      var h2 = new c2(d2(f2, 0, [1], "02"), 16);
      return [i2, h2];
    } catch (g2) {
      throw new Error("malformed ASN.1 DSA signature");
    }
  };
  this.readPKCS5PrvKeyHex = function(j2) {
    var k, i2, g2, l2, m2;
    if (a2(j2) === false) {
      throw new Error("not ASN.1 hex string");
    }
    try {
      k = d2(j2, 0, [1], "02");
      i2 = d2(j2, 0, [2], "02");
      g2 = d2(j2, 0, [3], "02");
      l2 = d2(j2, 0, [4], "02");
      m2 = d2(j2, 0, [5], "02");
    } catch (f2) {
      throw new Error("malformed PKCS#1/5 plain DSA private key");
    }
    this.setPrivateHex(k, i2, g2, l2, m2);
  };
  this.readPKCS8PrvKeyHex = function(j2) {
    var k, i2, g2, l2;
    if (a2(j2) === false) {
      throw new Error("not ASN.1 hex string");
    }
    try {
      k = d2(j2, 0, [1, 1, 0], "02");
      i2 = d2(j2, 0, [1, 1, 1], "02");
      g2 = d2(j2, 0, [1, 1, 2], "02");
      l2 = d2(j2, 0, [2, 0], "02");
    } catch (f2) {
      throw new Error("malformed PKCS#8 plain DSA private key");
    }
    this.setPrivateHex(k, i2, g2, null, l2);
  };
  this.readPKCS8PubKeyHex = function(j2) {
    var k, i2, g2, l2;
    if (a2(j2) === false) {
      throw new Error("not ASN.1 hex string");
    }
    try {
      k = d2(j2, 0, [0, 1, 0], "02");
      i2 = d2(j2, 0, [0, 1, 1], "02");
      g2 = d2(j2, 0, [0, 1, 2], "02");
      l2 = d2(j2, 0, [1, 0], "02");
    } catch (f2) {
      throw new Error("malformed PKCS#8 DSA public key");
    }
    this.setPublicHex(k, i2, g2, l2);
  };
  this.readCertPubKeyHex = function(j2, m2) {
    var k, i2, g2, l2;
    if (a2(j2) === false) {
      throw new Error("not ASN.1 hex string");
    }
    try {
      k = d2(j2, 0, [0, 5, 0, 1, 0], "02");
      i2 = d2(j2, 0, [0, 5, 0, 1, 1], "02");
      g2 = d2(j2, 0, [0, 5, 0, 1, 2], "02");
      l2 = d2(j2, 0, [0, 5, 1, 0], "02");
    } catch (f2) {
      throw new Error("malformed X.509 certificate DSA public key");
    }
    this.setPublicHex(k, i2, g2, l2);
  };
};
var KEYUTIL = /* @__PURE__ */ function() {
  var d2 = function(p2, r2, q2) {
    return k(CryptoJS.AES, p2, r2, q2);
  };
  var e2 = function(p2, r2, q2) {
    return k(CryptoJS.TripleDES, p2, r2, q2);
  };
  var a2 = function(p2, r2, q2) {
    return k(CryptoJS.DES, p2, r2, q2);
  };
  var k = function(s2, x, u2, q2) {
    var r2 = CryptoJS.enc.Hex.parse(x);
    var w2 = CryptoJS.enc.Hex.parse(u2);
    var p2 = CryptoJS.enc.Hex.parse(q2);
    var t2 = {};
    t2.key = w2;
    t2.iv = p2;
    t2.ciphertext = r2;
    var v2 = s2.decrypt(t2, w2, { iv: p2 });
    return CryptoJS.enc.Hex.stringify(v2);
  };
  var l2 = function(p2, r2, q2) {
    return g2(CryptoJS.AES, p2, r2, q2);
  };
  var o2 = function(p2, r2, q2) {
    return g2(CryptoJS.TripleDES, p2, r2, q2);
  };
  var f2 = function(p2, r2, q2) {
    return g2(CryptoJS.DES, p2, r2, q2);
  };
  var g2 = function(t2, y2, v2, q2) {
    var s2 = CryptoJS.enc.Hex.parse(y2);
    var x = CryptoJS.enc.Hex.parse(v2);
    var p2 = CryptoJS.enc.Hex.parse(q2);
    var w2 = t2.encrypt(s2, x, { iv: p2 });
    var r2 = CryptoJS.enc.Hex.parse(w2.toString());
    var u2 = CryptoJS.enc.Base64.stringify(r2);
    return u2;
  };
  var i2 = { "AES-256-CBC": { proc: d2, eproc: l2, keylen: 32, ivlen: 16 }, "AES-192-CBC": { proc: d2, eproc: l2, keylen: 24, ivlen: 16 }, "AES-128-CBC": { proc: d2, eproc: l2, keylen: 16, ivlen: 16 }, "DES-EDE3-CBC": { proc: e2, eproc: o2, keylen: 24, ivlen: 8 }, "DES-CBC": { proc: a2, eproc: f2, keylen: 8, ivlen: 8 } };
  var m2 = function(p2) {
    var r2 = CryptoJS.lib.WordArray.random(p2);
    var q2 = CryptoJS.enc.Hex.stringify(r2);
    return q2;
  };
  var n2 = function(v2) {
    var w2 = {};
    var q2 = v2.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"));
    if (q2) {
      w2.cipher = q2[1];
      w2.ivsalt = q2[2];
    }
    var p2 = v2.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
    if (p2) {
      w2.type = p2[1];
    }
    var u2 = -1;
    var x = 0;
    if (v2.indexOf("\r\n\r\n") != -1) {
      u2 = v2.indexOf("\r\n\r\n");
      x = 2;
    }
    if (v2.indexOf("\n\n") != -1) {
      u2 = v2.indexOf("\n\n");
      x = 1;
    }
    var t2 = v2.indexOf("-----END");
    if (u2 != -1 && t2 != -1) {
      var r2 = v2.substring(u2 + x * 2, t2 - x);
      r2 = r2.replace(/\s+/g, "");
      w2.data = r2;
    }
    return w2;
  };
  var j2 = function(q2, y2, p2) {
    var v2 = p2.substring(0, 16);
    var t2 = CryptoJS.enc.Hex.parse(v2);
    var r2 = CryptoJS.enc.Utf8.parse(y2);
    var u2 = i2[q2]["keylen"] + i2[q2]["ivlen"];
    var x = "";
    var w2 = null;
    for (; ; ) {
      var s2 = CryptoJS.algo.MD5.create();
      if (w2 != null) {
        s2.update(w2);
      }
      s2.update(r2);
      s2.update(t2);
      w2 = s2.finalize();
      x = x + CryptoJS.enc.Hex.stringify(w2);
      if (x.length >= u2 * 2) {
        break;
      }
    }
    var z2 = {};
    z2.keyhex = x.substr(0, i2[q2]["keylen"] * 2);
    z2.ivhex = x.substr(i2[q2]["keylen"] * 2, i2[q2]["ivlen"] * 2);
    return z2;
  };
  var b2 = function(p2, v2, r2, w2) {
    var s2 = CryptoJS.enc.Base64.parse(p2);
    var q2 = CryptoJS.enc.Hex.stringify(s2);
    var u2 = i2[v2]["proc"];
    var t2 = u2(q2, r2, w2);
    return t2;
  };
  var h2 = function(p2, s2, q2, u2) {
    var r2 = i2[s2]["eproc"];
    var t2 = r2(p2, q2, u2);
    return t2;
  };
  return { version: "1.0.0", parsePKCS5PEM: function(p2) {
    return n2(p2);
  }, getKeyAndUnusedIvByPasscodeAndIvsalt: function(q2, p2, r2) {
    return j2(q2, p2, r2);
  }, decryptKeyB64: function(p2, r2, q2, s2) {
    return b2(p2, r2, q2, s2);
  }, getDecryptedKeyHex: function(y2, x) {
    var q2 = n2(y2);
    var r2 = q2.cipher;
    var p2 = q2.ivsalt;
    var s2 = q2.data;
    var w2 = j2(r2, x, p2);
    var v2 = w2.keyhex;
    var u2 = b2(s2, r2, v2, p2);
    return u2;
  }, getEncryptedPKCS5PEMFromPrvKeyHex: function(x, s2, A2, t2, r2) {
    var p2 = "";
    if (typeof t2 == "undefined" || t2 == null) {
      t2 = "AES-256-CBC";
    }
    if (typeof i2[t2] == "undefined") {
      throw new Error("KEYUTIL unsupported algorithm: " + t2);
    }
    if (typeof r2 == "undefined" || r2 == null) {
      var v2 = i2[t2]["ivlen"];
      var u2 = m2(v2);
      r2 = u2.toUpperCase();
    }
    var z2 = j2(t2, A2, r2);
    var y2 = z2.keyhex;
    var w2 = h2(s2, t2, y2, r2);
    var q2 = w2.replace(/(.{64})/g, "$1\r\n");
    var p2 = "-----BEGIN " + x + " PRIVATE KEY-----\r\n";
    p2 += "Proc-Type: 4,ENCRYPTED\r\n";
    p2 += "DEK-Info: " + t2 + "," + r2 + "\r\n";
    p2 += "\r\n";
    p2 += q2;
    p2 += "\r\n-----END " + x + " PRIVATE KEY-----\r\n";
    return p2;
  }, getEncryptedPKCS8PEM: function(r2, p2, s2) {
    var q2 = this.getEncryptedPKCS8Hex(r2, p2, s2);
    return hextopem(q2, "ENCRYPTED PRIVATE KEY");
  }, getEncryptedPKCS8Hex: function(r2, p2, t2) {
    var q2;
    if (t2 == void 0 || t2 == null) {
      q2 = {};
    } else {
      q2 = JSON.parse(JSON.stringify(t2));
    }
    q2.plain = r2;
    this.initPBES2Param(q2);
    this.encryptPBES2Param(q2, p2);
    var s2 = this.generatePBES2ASN1Param(q2);
    return KJUR.asn1.ASN1Util.newObject(s2).tohex();
  }, initPBES2Param: function(p2) {
    if (aryval(p2, "encalg") == void 0) {
      p2.encalg = "aes256-CBC";
    }
    if (aryval(p2, "iter") == void 0) {
      p2.iter = 2048;
    }
    if (aryval(p2, "prf") == void 0) {
      p2.prf = "hmacWithSHA256";
    }
    if (aryval(p2, "salt") == void 0) {
      p2.salt = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.random(8));
    }
    if (aryval(p2, "enciv") == void 0) {
      var q2;
      if (p2.encalg == "des-EDE3-CBC") {
        q2 = 8;
      }
      if (p2.encalg == "aes128-CBC") {
        q2 = 16;
      }
      if (p2.encalg == "aes256-CBC") {
        q2 = 16;
      }
      p2.enciv = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.random(q2));
    }
  }, encryptPBES2Param: function(p2, q2) {
    var t2 = KEYUTIL.getDKFromPBES2Param(p2, q2);
    try {
      var s2 = KJUR.crypto.Cipher.encrypt(p2.plain, t2, p2.encalg, { iv: p2.enciv });
    } catch (r2) {
      throw new Error("encrypt error: " + p2.plain + " " + t2 + " " + p2.encalg + " " + p2.enciv);
    }
    p2.enc = s2;
  }, generatePBES2ASN1Param: function(p2) {
    var q2 = { seq: [{ seq: [{ oid: "pkcs5PBES2" }, { seq: [{ seq: [{ oid: "pkcs5PBKDF2" }, { seq: [{ octstr: { hex: p2.salt } }, { "int": { hex: inttohex(p2.iter) } }] }] }, { seq: [{ oid: p2.encalg }, { octstr: { hex: p2.enciv } }] }] }] }, { octstr: { hex: p2.enc } }] };
    if (p2.prf != "hmacWithSHA1") {
      q2.seq[0].seq[1].seq[0].seq[1].seq.push({ seq: [{ oid: p2.prf }, { "null": "" }] });
    }
    return q2;
  }, parseHexOfEncryptedPKCS8: function(y2) {
    var B2 = ASN1HEX;
    var z2 = B2.getChildIdx;
    var w2 = B2.getV;
    var t2 = {};
    var r2 = z2(y2, 0);
    if (r2.length != 2) {
      throw new Error("malformed format: SEQUENCE(0).items != 2: " + r2.length);
    }
    t2.ciphertext = w2(y2, r2[1]);
    var A2 = z2(y2, r2[0]);
    if (A2.length != 2) {
      throw new Error("malformed format: SEQUENCE(0.0).items != 2: " + A2.length);
    }
    if (w2(y2, A2[0]) != "2a864886f70d01050d") {
      throw new Error("this only supports pkcs5PBES2");
    }
    var p2 = z2(y2, A2[1]);
    if (A2.length != 2) {
      throw new Error("malformed format: SEQUENCE(0.0.1).items != 2: " + p2.length);
    }
    var q2 = z2(y2, p2[1]);
    if (q2.length != 2) {
      throw new Error("malformed format: SEQUENCE(0.0.1.1).items != 2: " + q2.length);
    }
    if (w2(y2, q2[0]) != "2a864886f70d0307") {
      throw "this only supports TripleDES";
    }
    t2.encryptionSchemeAlg = "TripleDES";
    t2.encryptionSchemeIV = w2(y2, q2[1]);
    var s2 = z2(y2, p2[0]);
    if (s2.length != 2) {
      throw new Error("malformed format: SEQUENCE(0.0.1.0).items != 2: " + s2.length);
    }
    if (w2(y2, s2[0]) != "2a864886f70d01050c") {
      throw new Error("this only supports pkcs5PBKDF2");
    }
    var x = z2(y2, s2[1]);
    if (x.length < 2) {
      throw new Error("malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + x.length);
    }
    t2.pbkdf2Salt = w2(y2, x[0]);
    var u2 = w2(y2, x[1]);
    try {
      t2.pbkdf2Iter = parseInt(u2, 16);
    } catch (v2) {
      throw new Error("malformed format pbkdf2Iter: " + u2);
    }
    return t2;
  }, getPBKDF2KeyHexFromParam: function(u2, p2) {
    var t2 = CryptoJS.enc.Hex.parse(u2.pbkdf2Salt);
    var q2 = u2.pbkdf2Iter;
    var s2 = CryptoJS.PBKDF2(p2, t2, { keySize: 192 / 32, iterations: q2 });
    var r2 = CryptoJS.enc.Hex.stringify(s2);
    return r2;
  }, _getPlainPKCS8HexFromEncryptedPKCS8PEM: function(x, y2) {
    var r2 = pemtohex(x, "ENCRYPTED PRIVATE KEY");
    var p2 = this.parseHexOfEncryptedPKCS8(r2);
    var u2 = KEYUTIL.getPBKDF2KeyHexFromParam(p2, y2);
    var v2 = {};
    v2.ciphertext = CryptoJS.enc.Hex.parse(p2.ciphertext);
    var t2 = CryptoJS.enc.Hex.parse(u2);
    var s2 = CryptoJS.enc.Hex.parse(p2.encryptionSchemeIV);
    var w2 = CryptoJS.TripleDES.decrypt(v2, t2, { iv: s2 });
    var q2 = CryptoJS.enc.Hex.stringify(w2);
    return q2;
  }, parsePBES2: function(z2) {
    var v2 = ASN1HEX.parse(z2);
    if (aryval(v2, "seq.0.seq.0.oid") != "pkcs5PBES2" || aryval(v2, "seq.0.seq.1.seq.0.seq.0.oid") != "pkcs5PBKDF2") {
      throw new Error("not pkcs5PBES2 and pkcs5PBKDF2 used");
    }
    var y2 = aryval(v2, "seq.0.seq.1.seq.0.seq.1.seq");
    if (y2 == void 0) {
      throw new Error("PBKDF2 parameter not found");
    }
    var t2 = aryval(y2, "0.octstr.hex");
    var p2 = aryval(y2, "1.int.hex");
    var q2 = aryval(y2, "2.seq.0.oid", "hmacWithSHA1");
    var x = -1;
    try {
      x = parseInt(p2, 16);
    } catch (w2) {
      throw new Error("iter not proper value");
    }
    var u2 = aryval(v2, "seq.0.seq.1.seq.1.seq.0.oid");
    var s2 = aryval(v2, "seq.0.seq.1.seq.1.seq.1.octstr.hex");
    var r2 = aryval(v2, "seq.1.octstr.hex");
    if (u2 == void 0 || s2 == void 0 || r2 == void 0) {
      throw new Error("encalg, enciv or enc is undefined");
    }
    var A2 = { salt: t2, iter: x, prf: q2, encalg: u2, enciv: s2, enc: r2 };
    return A2;
  }, getDKFromPBES2Param: function(p2, w2) {
    var x = { hmacWithSHA1: CryptoJS.algo.SHA1, hmacWithSHA224: CryptoJS.algo.SHA224, hmacWithSHA256: CryptoJS.algo.SHA256, hmacWithSHA384: CryptoJS.algo.SHA384, hmacWithSHA512: CryptoJS.algo.SHA512 };
    var q2 = { "des-EDE3-CBC": 192 / 32, "aes128-CBC": 128 / 32, "aes256-CBC": 256 / 32 };
    var y2 = x[p2.prf];
    if (y2 == void 0) {
      throw new Error("unsupported prf");
    }
    var r2 = q2[p2.encalg];
    if (r2 == void 0) {
      throw new Error("unsupported encalg");
    }
    var s2 = CryptoJS.enc.Hex.parse(p2.salt);
    var u2 = p2.iter;
    try {
      var v2 = CryptoJS.PBKDF2(w2, s2, { keySize: r2, iterations: u2, hasher: y2 });
      return CryptoJS.enc.Hex.stringify(v2);
    } catch (t2) {
      throw new Error("PBKDF2 error: " + t2 + " " + JSON.stringify(p2) + " " + w2);
    }
  }, getPlainHexFromEncryptedPKCS8PEM: function(t2, q2) {
    if (t2.indexOf("BEGIN ENCRYPTED PRIVATE KEY") == -1) {
      throw new Error("not Encrypted PKCS#8 PEM string");
    }
    var u2 = pemtohex(t2);
    var p2;
    try {
      p2 = KEYUTIL.parsePBES2(u2);
    } catch (r2) {
      throw new Error("malformed PBES2 format: " + r2.message);
    }
    var s2 = KEYUTIL.getDKFromPBES2Param(p2, q2);
    return KJUR.crypto.Cipher.decrypt(p2.enc, s2, p2.encalg, { iv: p2.enciv });
  }, getKeyFromEncryptedPKCS8PEM: function(s2, q2) {
    var p2 = this.getPlainHexFromEncryptedPKCS8PEM(s2, q2);
    var r2 = this.getKeyFromPlainPrivatePKCS8Hex(p2);
    return r2;
  }, parsePlainPrivatePKCS8Hex: function(s2) {
    var v2 = ASN1HEX;
    var u2 = v2.getChildIdx;
    var t2 = v2.getV;
    var q2 = {};
    q2.algparam = null;
    if (s2.substr(0, 2) != "30") {
      throw new Error("malformed plain PKCS8 private key(code:001)");
    }
    var r2 = u2(s2, 0);
    if (r2.length < 3) {
      throw new Error("malformed plain PKCS8 private key(code:002)");
    }
    if (s2.substr(r2[1], 2) != "30") {
      throw new Error("malformed PKCS8 private key(code:003)");
    }
    var p2 = u2(s2, r2[1]);
    if (p2.length != 2) {
      throw new Error("malformed PKCS8 private key(code:004)");
    }
    if (s2.substr(p2[0], 2) != "06") {
      throw new Error("malformed PKCS8 private key(code:005)");
    }
    q2.algoid = t2(s2, p2[0]);
    if (s2.substr(p2[1], 2) == "06") {
      q2.algparam = t2(s2, p2[1]);
    }
    if (s2.substr(r2[2], 2) != "04") {
      throw new Error("malformed PKCS8 private key(code:006)");
    }
    q2.keyidx = v2.getVidx(s2, r2[2]);
    return q2;
  }, getKeyFromPlainPrivatePKCS8PEM: function(q2) {
    var p2 = pemtohex(q2, "PRIVATE KEY");
    var r2 = this.getKeyFromPlainPrivatePKCS8Hex(p2);
    return r2;
  }, getKeyFromPlainPrivatePKCS8Hex: function(p2) {
    var q2 = this.parsePlainPrivatePKCS8Hex(p2);
    var r2;
    if (q2.algoid == "2a864886f70d010101") {
      r2 = new RSAKey();
    } else {
      if (q2.algoid == "2a8648ce380401") {
        r2 = new KJUR.crypto.DSA();
      } else {
        if (q2.algoid == "2a8648ce3d0201") {
          r2 = new KJUR.crypto.ECDSA();
        } else {
          throw new Error("unsupported private key algorithm");
        }
      }
    }
    r2.readPKCS8PrvKeyHex(p2);
    return r2;
  }, _getKeyFromPublicPKCS8Hex: function(q2) {
    var p2;
    var r2 = ASN1HEX.getVbyList(q2, 0, [0, 0], "06");
    if (r2 === "2a864886f70d010101") {
      p2 = new RSAKey();
    } else {
      if (r2 === "2a8648ce380401") {
        p2 = new KJUR.crypto.DSA();
      } else {
        if (r2 === "2a8648ce3d0201") {
          p2 = new KJUR.crypto.ECDSA();
        } else {
          throw new Error("unsupported PKCS#8 public key hex");
        }
      }
    }
    p2.readPKCS8PubKeyHex(q2);
    return p2;
  }, parsePublicRawRSAKeyHex: function(r2) {
    var u2 = ASN1HEX;
    var t2 = u2.getChildIdx;
    var s2 = u2.getV;
    var p2 = {};
    if (r2.substr(0, 2) != "30") {
      throw new Error("malformed RSA key(code:001)");
    }
    var q2 = t2(r2, 0);
    if (q2.length != 2) {
      throw new Error("malformed RSA key(code:002)");
    }
    if (r2.substr(q2[0], 2) != "02") {
      throw new Error("malformed RSA key(code:003)");
    }
    p2.n = s2(r2, q2[0]);
    if (r2.substr(q2[1], 2) != "02") {
      throw new Error("malformed RSA key(code:004)");
    }
    p2.e = s2(r2, q2[1]);
    return p2;
  }, parsePublicPKCS8Hex: function(t2) {
    var v2 = ASN1HEX;
    var u2 = v2.getChildIdx;
    var s2 = v2.getV;
    var q2 = {};
    q2.algparam = null;
    var r2 = u2(t2, 0);
    if (r2.length != 2) {
      throw new Error("outer DERSequence shall have 2 elements: " + r2.length);
    }
    var w2 = r2[0];
    if (t2.substr(w2, 2) != "30") {
      throw new Error("malformed PKCS8 public key(code:001)");
    }
    var p2 = u2(t2, w2);
    if (p2.length != 2) {
      throw new Error("malformed PKCS8 public key(code:002)");
    }
    if (t2.substr(p2[0], 2) != "06") {
      throw new Error("malformed PKCS8 public key(code:003)");
    }
    q2.algoid = s2(t2, p2[0]);
    if (t2.substr(p2[1], 2) == "06") {
      q2.algparam = s2(t2, p2[1]);
    } else {
      if (t2.substr(p2[1], 2) == "30") {
        q2.algparam = {};
        q2.algparam.p = v2.getVbyList(t2, p2[1], [0], "02");
        q2.algparam.q = v2.getVbyList(t2, p2[1], [1], "02");
        q2.algparam.g = v2.getVbyList(t2, p2[1], [2], "02");
      }
    }
    if (t2.substr(r2[1], 2) != "03") {
      throw new Error("malformed PKCS8 public key(code:004)");
    }
    q2.key = s2(t2, r2[1]).substr(2);
    return q2;
  } };
}();
KEYUTIL.getKey = function(l2, k, n2) {
  var G2 = ASN1HEX, L2 = G2.getChildIdx;
  G2.getV;
  var d2 = G2.getVbyList, c2 = KJUR.crypto, i2 = c2.ECDSA, C2 = c2.DSA, w2 = RSAKey, M2 = pemtohex, F2 = KEYUTIL;
  if (typeof w2 != "undefined" && l2 instanceof w2) {
    return l2;
  }
  if (typeof i2 != "undefined" && l2 instanceof i2) {
    return l2;
  }
  if (typeof C2 != "undefined" && l2 instanceof C2) {
    return l2;
  }
  if (l2.curve !== void 0 && l2.xy !== void 0 && l2.d === void 0) {
    return new i2({ pub: l2.xy, curve: l2.curve });
  }
  if (l2.curve !== void 0 && l2.d !== void 0) {
    return new i2({ prv: l2.d, curve: l2.curve });
  }
  if (l2.kty === void 0 && l2.n !== void 0 && l2.e !== void 0 && l2.d === void 0) {
    var P2 = new w2();
    P2.setPublic(l2.n, l2.e);
    return P2;
  }
  if (l2.kty === void 0 && l2.n !== void 0 && l2.e !== void 0 && l2.d !== void 0 && l2.p !== void 0 && l2.q !== void 0 && l2.dp !== void 0 && l2.dq !== void 0 && l2.co !== void 0 && l2.qi === void 0) {
    var P2 = new w2();
    P2.setPrivateEx(l2.n, l2.e, l2.d, l2.p, l2.q, l2.dp, l2.dq, l2.co);
    return P2;
  }
  if (l2.kty === void 0 && l2.n !== void 0 && l2.e !== void 0 && l2.d !== void 0 && l2.p === void 0) {
    var P2 = new w2();
    P2.setPrivate(l2.n, l2.e, l2.d);
    return P2;
  }
  if (l2.p !== void 0 && l2.q !== void 0 && l2.g !== void 0 && l2.y !== void 0 && l2.x === void 0) {
    var P2 = new C2();
    P2.setPublic(l2.p, l2.q, l2.g, l2.y);
    return P2;
  }
  if (l2.p !== void 0 && l2.q !== void 0 && l2.g !== void 0 && l2.y !== void 0 && l2.x !== void 0) {
    var P2 = new C2();
    P2.setPrivate(l2.p, l2.q, l2.g, l2.y, l2.x);
    return P2;
  }
  if (l2.kty === "RSA" && l2.n !== void 0 && l2.e !== void 0 && l2.d === void 0) {
    var P2 = new w2();
    P2.setPublic(b64utohex(l2.n), b64utohex(l2.e));
    return P2;
  }
  if (l2.kty === "RSA" && l2.n !== void 0 && l2.e !== void 0 && l2.d !== void 0 && l2.p !== void 0 && l2.q !== void 0 && l2.dp !== void 0 && l2.dq !== void 0 && l2.qi !== void 0) {
    var P2 = new w2();
    P2.setPrivateEx(b64utohex(l2.n), b64utohex(l2.e), b64utohex(l2.d), b64utohex(l2.p), b64utohex(l2.q), b64utohex(l2.dp), b64utohex(l2.dq), b64utohex(l2.qi));
    return P2;
  }
  if (l2.kty === "RSA" && l2.n !== void 0 && l2.e !== void 0 && l2.d !== void 0) {
    var P2 = new w2();
    P2.setPrivate(b64utohex(l2.n), b64utohex(l2.e), b64utohex(l2.d));
    return P2;
  }
  if (l2.kty === "EC" && l2.crv !== void 0 && l2.x !== void 0 && l2.y !== void 0 && l2.d === void 0) {
    var j2 = new i2({ curve: l2.crv });
    var t2 = j2.ecparams.keycharlen;
    var B2 = ("0000000000" + b64utohex(l2.x)).slice(-t2);
    var z2 = ("0000000000" + b64utohex(l2.y)).slice(-t2);
    var u2 = "04" + B2 + z2;
    j2.setPublicKeyHex(u2);
    return j2;
  }
  if (l2.kty === "EC" && l2.crv !== void 0 && l2.x !== void 0 && l2.y !== void 0 && l2.d !== void 0) {
    var j2 = new i2({ curve: l2.crv });
    var t2 = j2.ecparams.keycharlen;
    var B2 = ("0000000000" + b64utohex(l2.x)).slice(-t2);
    var z2 = ("0000000000" + b64utohex(l2.y)).slice(-t2);
    var u2 = "04" + B2 + z2;
    var b2 = ("0000000000" + b64utohex(l2.d)).slice(-t2);
    j2.setPublicKeyHex(u2);
    j2.setPrivateKeyHex(b2);
    return j2;
  }
  if (n2 === "pkcs5prv") {
    var J2 = l2, G2 = ASN1HEX, N2, P2;
    N2 = L2(J2, 0);
    if (N2.length === 9) {
      P2 = new w2();
      P2.readPKCS5PrvKeyHex(J2);
    } else {
      if (N2.length === 6) {
        P2 = new C2();
        P2.readPKCS5PrvKeyHex(J2);
      } else {
        if (N2.length > 2 && J2.substr(N2[1], 2) === "04") {
          P2 = new i2();
          P2.readPKCS5PrvKeyHex(J2);
        } else {
          throw new Error("unsupported PKCS#1/5 hexadecimal key");
        }
      }
    }
    return P2;
  }
  if (n2 === "pkcs8prv") {
    var P2 = F2.getKeyFromPlainPrivatePKCS8Hex(l2);
    return P2;
  }
  if (n2 === "pkcs8pub") {
    return F2._getKeyFromPublicPKCS8Hex(l2);
  }
  if (n2 === "x509pub") {
    return X509.getPublicKeyFromCertHex(l2);
  }
  if (l2.indexOf("-END CERTIFICATE-", 0) != -1 || l2.indexOf("-END X509 CERTIFICATE-", 0) != -1 || l2.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) {
    return X509.getPublicKeyFromCertPEM(l2);
  }
  if (l2.indexOf("-END PUBLIC KEY-") != -1) {
    var O2 = pemtohex(l2, "PUBLIC KEY");
    return F2._getKeyFromPublicPKCS8Hex(O2);
  }
  if (l2.indexOf("-END RSA PRIVATE KEY-") != -1 && l2.indexOf("4,ENCRYPTED") == -1) {
    var m2 = M2(l2, "RSA PRIVATE KEY");
    return F2.getKey(m2, null, "pkcs5prv");
  }
  if (l2.indexOf("-END DSA PRIVATE KEY-") != -1 && l2.indexOf("4,ENCRYPTED") == -1) {
    var I2 = M2(l2, "DSA PRIVATE KEY");
    var E2 = d2(I2, 0, [1], "02");
    var D2 = d2(I2, 0, [2], "02");
    var K2 = d2(I2, 0, [3], "02");
    var r2 = d2(I2, 0, [4], "02");
    var s2 = d2(I2, 0, [5], "02");
    var P2 = new C2();
    P2.setPrivate(new BigInteger(E2, 16), new BigInteger(D2, 16), new BigInteger(K2, 16), new BigInteger(r2, 16), new BigInteger(s2, 16));
    return P2;
  }
  if (l2.indexOf("-END EC PRIVATE KEY-") != -1 && l2.indexOf("4,ENCRYPTED") == -1) {
    var m2 = M2(l2, "EC PRIVATE KEY");
    return F2.getKey(m2, null, "pkcs5prv");
  }
  if (l2.indexOf("-END PRIVATE KEY-") != -1) {
    return F2.getKeyFromPlainPrivatePKCS8PEM(l2);
  }
  if (l2.indexOf("-END RSA PRIVATE KEY-") != -1 && l2.indexOf("4,ENCRYPTED") != -1) {
    var o2 = F2.getDecryptedKeyHex(l2, k);
    var H2 = new RSAKey();
    H2.readPKCS5PrvKeyHex(o2);
    return H2;
  }
  if (l2.indexOf("-END EC PRIVATE KEY-") != -1 && l2.indexOf("4,ENCRYPTED") != -1) {
    var I2 = F2.getDecryptedKeyHex(l2, k);
    var P2 = d2(I2, 0, [1], "04");
    var f2 = d2(I2, 0, [2, 0], "06");
    var A2 = d2(I2, 0, [3, 0], "03").substr(2);
    var e2 = "";
    if (KJUR.crypto.OID.oidhex2name[f2] !== void 0) {
      e2 = KJUR.crypto.OID.oidhex2name[f2];
    } else {
      throw new Error("undefined OID(hex) in KJUR.crypto.OID: " + f2);
    }
    var j2 = new i2({ curve: e2 });
    j2.setPublicKeyHex(A2);
    j2.setPrivateKeyHex(P2);
    j2.isPublic = false;
    return j2;
  }
  if (l2.indexOf("-END DSA PRIVATE KEY-") != -1 && l2.indexOf("4,ENCRYPTED") != -1) {
    var I2 = F2.getDecryptedKeyHex(l2, k);
    var E2 = d2(I2, 0, [1], "02");
    var D2 = d2(I2, 0, [2], "02");
    var K2 = d2(I2, 0, [3], "02");
    var r2 = d2(I2, 0, [4], "02");
    var s2 = d2(I2, 0, [5], "02");
    var P2 = new C2();
    P2.setPrivate(new BigInteger(E2, 16), new BigInteger(D2, 16), new BigInteger(K2, 16), new BigInteger(r2, 16), new BigInteger(s2, 16));
    return P2;
  }
  if (l2.indexOf("-END ENCRYPTED PRIVATE KEY-") != -1) {
    return F2.getKeyFromEncryptedPKCS8PEM(l2, k);
  }
  throw new Error("not supported argument");
};
KEYUTIL.generateKeypair = function(a2, c2) {
  if (a2 == "RSA") {
    var b2 = c2;
    var h2 = new RSAKey();
    h2.generate(b2, "10001");
    h2.isPrivate = true;
    h2.isPublic = true;
    var f2 = new RSAKey();
    var e2 = h2.n.toString(16);
    var i2 = h2.e.toString(16);
    f2.setPublic(e2, i2);
    f2.isPrivate = false;
    f2.isPublic = true;
    var k = {};
    k.prvKeyObj = h2;
    k.pubKeyObj = f2;
    return k;
  } else {
    if (a2 == "EC") {
      var d2 = c2;
      var g2 = new KJUR.crypto.ECDSA({ curve: d2 });
      var j2 = g2.generateKeyPairHex();
      var h2 = new KJUR.crypto.ECDSA({ curve: d2 });
      h2.setPublicKeyHex(j2.ecpubhex);
      h2.setPrivateKeyHex(j2.ecprvhex);
      h2.isPrivate = true;
      h2.isPublic = false;
      var f2 = new KJUR.crypto.ECDSA({ curve: d2 });
      f2.setPublicKeyHex(j2.ecpubhex);
      f2.isPrivate = false;
      f2.isPublic = true;
      var k = {};
      k.prvKeyObj = h2;
      k.pubKeyObj = f2;
      return k;
    } else {
      throw new Error("unknown algorithm: " + a2);
    }
  }
};
KEYUTIL.getPEM = function(b2, C2, x, m2, p2, j2) {
  var E2 = KJUR, k = E2.asn1, y2 = k.DERObjectIdentifier, e2 = k.DERInteger, l2 = k.ASN1Util.newObject, a2 = k.x509, B2 = a2.SubjectPublicKeyInfo, d2 = E2.crypto, t2 = d2.DSA, q2 = d2.ECDSA, n2 = RSAKey;
  function z2(s2) {
    var G2 = l2({ seq: [{ "int": 0 }, { "int": { bigint: s2.n } }, { "int": s2.e }, { "int": { bigint: s2.d } }, { "int": { bigint: s2.p } }, { "int": { bigint: s2.q } }, { "int": { bigint: s2.dmp1 } }, { "int": { bigint: s2.dmq1 } }, { "int": { bigint: s2.coeff } }] });
    return G2;
  }
  function A2(G2) {
    var s2 = l2({ seq: [{ "int": 1 }, { octstr: { hex: G2.prvKeyHex } }, { tag: ["a0", true, { oid: { name: G2.curveName } }] }, { tag: ["a1", true, { bitstr: { hex: "00" + G2.pubKeyHex } }] }] });
    return s2;
  }
  function w2(s2) {
    var G2 = l2({ seq: [{ "int": 0 }, { "int": { bigint: s2.p } }, { "int": { bigint: s2.q } }, { "int": { bigint: s2.g } }, { "int": { bigint: s2.y } }, { "int": { bigint: s2.x } }] });
    return G2;
  }
  if ((n2 !== void 0 && b2 instanceof n2 || t2 !== void 0 && b2 instanceof t2 || q2 !== void 0 && b2 instanceof q2) && b2.isPublic == true && (C2 === void 0 || C2 == "PKCS8PUB")) {
    var D2 = new B2(b2);
    var v2 = D2.tohex();
    return hextopem(v2, "PUBLIC KEY");
  }
  if (C2 == "PKCS1PRV" && n2 !== void 0 && b2 instanceof n2 && (x === void 0 || x == null) && b2.isPrivate == true) {
    var D2 = z2(b2);
    var v2 = D2.tohex();
    return hextopem(v2, "RSA PRIVATE KEY");
  }
  if (C2 == "PKCS1PRV" && q2 !== void 0 && b2 instanceof q2 && (x === void 0 || x == null) && b2.isPrivate == true) {
    var i2 = new y2({ name: b2.curveName });
    var u2 = i2.tohex();
    var h2 = A2(b2);
    var r2 = h2.tohex();
    var o2 = "";
    o2 += hextopem(u2, "EC PARAMETERS");
    o2 += hextopem(r2, "EC PRIVATE KEY");
    return o2;
  }
  if (C2 == "PKCS1PRV" && t2 !== void 0 && b2 instanceof t2 && (x === void 0 || x == null) && b2.isPrivate == true) {
    var D2 = w2(b2);
    var v2 = D2.tohex();
    return hextopem(v2, "DSA PRIVATE KEY");
  }
  if (C2 == "PKCS5PRV" && n2 !== void 0 && b2 instanceof n2 && (x !== void 0 && x != null) && b2.isPrivate == true) {
    var D2 = z2(b2);
    var v2 = D2.tohex();
    if (m2 === void 0) {
      m2 = "DES-EDE3-CBC";
    }
    return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", v2, x, m2, j2);
  }
  if (C2 == "PKCS5PRV" && q2 !== void 0 && b2 instanceof q2 && (x !== void 0 && x != null) && b2.isPrivate == true) {
    var D2 = A2(b2);
    var v2 = D2.tohex();
    if (m2 === void 0) {
      m2 = "DES-EDE3-CBC";
    }
    return this.getEncryptedPKCS5PEMFromPrvKeyHex("EC", v2, x, m2, j2);
  }
  if (C2 == "PKCS5PRV" && t2 !== void 0 && b2 instanceof t2 && (x !== void 0 && x != null) && b2.isPrivate == true) {
    var D2 = w2(b2);
    var v2 = D2.tohex();
    if (m2 === void 0) {
      m2 = "DES-EDE3-CBC";
    }
    return this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA", v2, x, m2, j2);
  }
  var f2 = function(G2, H2) {
    if (typeof H2 == "string") {
      return KEYUTIL.getEncryptedPKCS8PEM(G2, H2);
    } else {
      if (typeof H2 == "object" && aryval(H2, "passcode") != void 0) {
        var I2 = JSON.parse(JSON.stringify(H2));
        var s2 = I2.passcode;
        delete I2.passcode;
        return KEYUTIL.getEncryptedPKCS8PEM(G2, s2, I2);
      }
    }
  };
  if (C2 == "PKCS8PRV" && n2 != void 0 && b2 instanceof n2 && b2.isPrivate == true) {
    var g2 = z2(b2);
    var c2 = g2.tohex();
    var D2 = l2({ seq: [{ "int": 0 }, { seq: [{ oid: { name: "rsaEncryption" } }, { "null": true }] }, { octstr: { hex: c2 } }] });
    var v2 = D2.tohex();
    if (x === void 0 || x == null) {
      return hextopem(v2, "PRIVATE KEY");
    } else {
      return f2(v2, x);
    }
  }
  if (C2 == "PKCS8PRV" && q2 !== void 0 && b2 instanceof q2 && b2.isPrivate == true) {
    var F2 = { seq: [{ "int": 1 }, { octstr: { hex: b2.prvKeyHex } }] };
    if (typeof b2.pubKeyHex == "string") {
      F2.seq.push({ tag: ["a1", true, { bitstr: { hex: "00" + b2.pubKeyHex } }] });
    }
    var g2 = new l2(F2);
    var c2 = g2.tohex();
    var D2 = l2({ seq: [{ "int": 0 }, { seq: [{ oid: { name: "ecPublicKey" } }, { oid: { name: b2.curveName } }] }, { octstr: { hex: c2 } }] });
    var v2 = D2.tohex();
    if (x === void 0 || x == null) {
      return hextopem(v2, "PRIVATE KEY");
    } else {
      return f2(v2, x);
    }
  }
  if (C2 == "PKCS8PRV" && t2 !== void 0 && b2 instanceof t2 && b2.isPrivate == true) {
    var g2 = new e2({ bigint: b2.x });
    var c2 = g2.tohex();
    var D2 = l2({ seq: [{ "int": 0 }, { seq: [{ oid: { name: "dsa" } }, { seq: [{ "int": { bigint: b2.p } }, { "int": { bigint: b2.q } }, { "int": { bigint: b2.g } }] }] }, { octstr: { hex: c2 } }] });
    var v2 = D2.tohex();
    if (x === void 0 || x == null) {
      return hextopem(v2, "PRIVATE KEY");
    } else {
      return f2(v2, x);
    }
  }
  throw new Error("unsupported object nor format");
};
KEYUTIL.getKeyFromCSRPEM = function(b2) {
  var a2 = pemtohex(b2, "CERTIFICATE REQUEST");
  var c2 = KEYUTIL.getKeyFromCSRHex(a2);
  return c2;
};
KEYUTIL.getKeyFromCSRHex = function(a2) {
  var c2 = KEYUTIL.parseCSRHex(a2);
  var b2 = KEYUTIL.getKey(c2.p8pubkeyhex, null, "pkcs8pub");
  return b2;
};
KEYUTIL.parseCSRHex = function(d2) {
  var i2 = ASN1HEX;
  var f2 = i2.getChildIdx;
  var c2 = i2.getTLV;
  var b2 = {};
  var g2 = d2;
  if (g2.substr(0, 2) != "30") {
    throw new Error("malformed CSR(code:001)");
  }
  var e2 = f2(g2, 0);
  if (e2.length < 1) {
    throw new Error("malformed CSR(code:002)");
  }
  if (g2.substr(e2[0], 2) != "30") {
    throw new Error("malformed CSR(code:003)");
  }
  var a2 = f2(g2, e2[0]);
  if (a2.length < 3) {
    throw new Error("malformed CSR(code:004)");
  }
  b2.p8pubkeyhex = c2(g2, a2[2]);
  return b2;
};
KEYUTIL.getKeyID = function(f2) {
  var c2 = KEYUTIL;
  var e2 = ASN1HEX;
  if (typeof f2 === "string" && f2.indexOf("BEGIN ") != -1) {
    f2 = c2.getKey(f2);
  }
  var d2 = pemtohex(c2.getPEM(f2));
  var b2 = e2.getIdxbyList(d2, 0, [1]);
  var a2 = e2.getV(d2, b2).substring(2);
  return KJUR.crypto.Util.hashHex(a2, "sha1");
};
KEYUTIL.getJWK = function(d2, h2, g2, b2, f2) {
  var i2;
  var k = {};
  var e2;
  var c2 = KJUR.crypto.Util.hashHex;
  if (typeof d2 == "string") {
    i2 = KEYUTIL.getKey(d2);
    if (d2.indexOf("CERTIFICATE") != -1) {
      e2 = pemtohex(d2);
    }
  } else {
    if (typeof d2 == "object") {
      if (d2 instanceof X509) {
        i2 = d2.getPublicKey();
        e2 = d2.hex;
      } else {
        i2 = d2;
      }
    } else {
      throw new Error("unsupported keyinfo type");
    }
  }
  if (i2 instanceof RSAKey && i2.isPrivate) {
    k.kty = "RSA";
    k.n = hextob64u(i2.n.toString(16));
    k.e = hextob64u(i2.e.toString(16));
    k.d = hextob64u(i2.d.toString(16));
    k.p = hextob64u(i2.p.toString(16));
    k.q = hextob64u(i2.q.toString(16));
    k.dp = hextob64u(i2.dmp1.toString(16));
    k.dq = hextob64u(i2.dmq1.toString(16));
    k.qi = hextob64u(i2.coeff.toString(16));
  } else {
    if (i2 instanceof RSAKey && i2.isPublic) {
      k.kty = "RSA";
      k.n = hextob64u(i2.n.toString(16));
      k.e = hextob64u(i2.e.toString(16));
    } else {
      if (i2 instanceof KJUR.crypto.ECDSA && i2.isPrivate) {
        var a2 = i2.getShortNISTPCurveName();
        if (a2 !== "P-256" && a2 !== "P-384" && a2 !== "P-521") {
          throw new Error("unsupported curve name for JWT: " + a2);
        }
        var j2 = i2.getPublicKeyXYHex();
        k.kty = "EC";
        k.crv = a2;
        k.x = hextob64u(j2.x);
        k.y = hextob64u(j2.y);
        k.d = hextob64u(i2.prvKeyHex);
      } else {
        if (i2 instanceof KJUR.crypto.ECDSA && i2.isPublic) {
          var a2 = i2.getShortNISTPCurveName();
          if (a2 !== "P-256" && a2 !== "P-384" && a2 !== "P-521") {
            throw new Error("unsupported curve name for JWT: " + a2);
          }
          var j2 = i2.getPublicKeyXYHex();
          k.kty = "EC";
          k.crv = a2;
          k.x = hextob64u(j2.x);
          k.y = hextob64u(j2.y);
        }
      }
    }
  }
  if (k.kty == void 0) {
    throw new Error("unsupported keyinfo");
  }
  if (!i2.isPrivate && h2 != true) {
    k.kid = KJUR.jws.JWS.getJWKthumbprint(k);
  }
  if (e2 != void 0 && g2 != true) {
    k.x5c = [hex2b64(e2)];
  }
  if (e2 != void 0 && b2 != true) {
    k.x5t = b64tob64u(hex2b64(c2(e2, "sha1")));
  }
  if (e2 != void 0 && f2 != true) {
    k["x5t#S256"] = b64tob64u(hex2b64(c2(e2, "sha256")));
  }
  return k;
};
KEYUTIL.getJWKFromKey = function(a2) {
  return KEYUTIL.getJWK(a2, true, true, true, true);
};
RSAKey.getPosArrayOfChildrenFromHex = function(a2) {
  return ASN1HEX.getChildIdx(a2, 0);
};
RSAKey.getHexValueArrayOfChildrenFromHex = function(f2) {
  var n2 = ASN1HEX;
  var i2 = n2.getV;
  var k = RSAKey.getPosArrayOfChildrenFromHex(f2);
  var e2 = i2(f2, k[0]);
  var j2 = i2(f2, k[1]);
  var b2 = i2(f2, k[2]);
  var c2 = i2(f2, k[3]);
  var h2 = i2(f2, k[4]);
  var g2 = i2(f2, k[5]);
  var m2 = i2(f2, k[6]);
  var l2 = i2(f2, k[7]);
  var d2 = i2(f2, k[8]);
  var k = new Array();
  k.push(e2, j2, b2, c2, h2, g2, m2, l2, d2);
  return k;
};
RSAKey.prototype.readPrivateKeyFromPEMString = function(d2) {
  var c2 = pemtohex(d2);
  var b2 = RSAKey.getHexValueArrayOfChildrenFromHex(c2);
  this.setPrivateEx(b2[1], b2[2], b2[3], b2[4], b2[5], b2[6], b2[7], b2[8]);
};
RSAKey.prototype.readPKCS5PrvKeyHex = function(c2) {
  var b2 = RSAKey.getHexValueArrayOfChildrenFromHex(c2);
  this.setPrivateEx(b2[1], b2[2], b2[3], b2[4], b2[5], b2[6], b2[7], b2[8]);
};
RSAKey.prototype.readPKCS8PrvKeyHex = function(e2) {
  var c2, i2, k, b2, a2, f2, d2, j2;
  var m2 = ASN1HEX;
  var l2 = m2.getVbyListEx;
  if (m2.isASN1HEX(e2) === false) {
    throw new Error("not ASN.1 hex string");
  }
  try {
    c2 = l2(e2, 0, [2, 0, 1], "02");
    i2 = l2(e2, 0, [2, 0, 2], "02");
    k = l2(e2, 0, [2, 0, 3], "02");
    b2 = l2(e2, 0, [2, 0, 4], "02");
    a2 = l2(e2, 0, [2, 0, 5], "02");
    f2 = l2(e2, 0, [2, 0, 6], "02");
    d2 = l2(e2, 0, [2, 0, 7], "02");
    j2 = l2(e2, 0, [2, 0, 8], "02");
  } catch (g2) {
    throw new Error("malformed PKCS#8 plain RSA private key");
  }
  this.setPrivateEx(c2, i2, k, b2, a2, f2, d2, j2);
};
RSAKey.prototype.readPKCS5PubKeyHex = function(c2) {
  var e2 = ASN1HEX;
  var b2 = e2.getV;
  if (e2.isASN1HEX(c2) === false) {
    throw new Error("keyHex is not ASN.1 hex string");
  }
  var a2 = e2.getChildIdx(c2, 0);
  if (a2.length !== 2 || c2.substr(a2[0], 2) !== "02" || c2.substr(a2[1], 2) !== "02") {
    throw new Error("wrong hex for PKCS#5 public key");
  }
  var f2 = b2(c2, a2[0]);
  var d2 = b2(c2, a2[1]);
  this.setPublic(f2, d2);
};
RSAKey.prototype.readPKCS8PubKeyHex = function(b2) {
  var c2 = ASN1HEX;
  if (c2.isASN1HEX(b2) === false) {
    throw new Error("not ASN.1 hex string");
  }
  if (c2.getTLVbyListEx(b2, 0, [0, 0]) !== "06092a864886f70d010101") {
    throw new Error("not PKCS8 RSA public key");
  }
  var a2 = c2.getTLVbyListEx(b2, 0, [1, 0]);
  this.readPKCS5PubKeyHex(a2);
};
RSAKey.prototype.readCertPubKeyHex = function(b2, d2) {
  var a2, c2;
  a2 = new X509();
  a2.readCertHex(b2);
  c2 = a2.getPublicKeyHex();
  this.readPKCS8PubKeyHex(c2);
};
function _zeroPaddingOfSignature(e2, d2) {
  var c2 = "";
  var a2 = d2 / 4 - e2.length;
  for (var b2 = 0; b2 < a2; b2++) {
    c2 = c2 + "0";
  }
  return c2 + e2;
}
RSAKey.prototype.sign = function(d2, a2) {
  var b2 = function(e2) {
    return KJUR.crypto.Util.hashString(e2, a2);
  };
  var c2 = b2(d2);
  return this.signWithMessageHash(c2, a2);
};
RSAKey.prototype.signWithMessageHash = function(e2, c2) {
  var f2 = KJUR.crypto.Util.getPaddedDigestInfoHex(e2, c2, this.n.bitLength());
  var b2 = parseBigInt(f2, 16);
  var d2 = this.doPrivate(b2);
  var a2 = d2.toString(16);
  return _zeroPaddingOfSignature(a2, this.n.bitLength());
};
function pss_mgf1_str(c2, a2, e2) {
  var b2 = "", d2 = 0;
  while (b2.length < a2) {
    b2 += hextorstr(e2(rstrtohex(c2 + String.fromCharCode.apply(String, [(d2 & 4278190080) >> 24, (d2 & 16711680) >> 16, (d2 & 65280) >> 8, d2 & 255]))));
    d2 += 1;
  }
  return b2;
}
RSAKey.prototype.signPSS = function(e2, a2, d2) {
  var c2 = function(f2) {
    return KJUR.crypto.Util.hashHex(f2, a2);
  };
  var b2 = c2(rstrtohex(e2));
  if (d2 === void 0) {
    d2 = -1;
  }
  return this.signWithMessageHashPSS(b2, a2, d2);
};
RSAKey.prototype.signWithMessageHashPSS = function(l2, a2, k) {
  var b2 = hextorstr(l2);
  var g2 = b2.length;
  var m2 = this.n.bitLength() - 1;
  var c2 = Math.ceil(m2 / 8);
  var d2;
  var o2 = function(i2) {
    return KJUR.crypto.Util.hashHex(i2, a2);
  };
  if (k === -1 || k === void 0) {
    k = g2;
  } else {
    if (k === -2) {
      k = c2 - g2 - 2;
    } else {
      if (k < -2) {
        throw new Error("invalid salt length");
      }
    }
  }
  if (c2 < g2 + k + 2) {
    throw new Error("data too long");
  }
  var f2 = "";
  if (k > 0) {
    f2 = new Array(k);
    new SecureRandom().nextBytes(f2);
    f2 = String.fromCharCode.apply(String, f2);
  }
  var n2 = hextorstr(o2(rstrtohex("\0\0\0\0\0\0\0\0" + b2 + f2)));
  var j2 = [];
  for (d2 = 0; d2 < c2 - k - g2 - 2; d2 += 1) {
    j2[d2] = 0;
  }
  var e2 = String.fromCharCode.apply(String, j2) + "" + f2;
  var h2 = pss_mgf1_str(n2, e2.length, o2);
  var q2 = [];
  for (d2 = 0; d2 < e2.length; d2 += 1) {
    q2[d2] = e2.charCodeAt(d2) ^ h2.charCodeAt(d2);
  }
  var p2 = 65280 >> 8 * c2 - m2 & 255;
  q2[0] &= ~p2;
  for (d2 = 0; d2 < g2; d2++) {
    q2.push(n2.charCodeAt(d2));
  }
  q2.push(188);
  return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(q2)).toString(16), this.n.bitLength());
};
function _rsasign_getAlgNameAndHashFromHexDisgestInfo(f2) {
  for (var e2 in KJUR.crypto.Util.DIGESTINFOHEAD) {
    var d2 = KJUR.crypto.Util.DIGESTINFOHEAD[e2];
    var b2 = d2.length;
    if (f2.substring(0, b2) == d2) {
      var c2 = [e2, f2.substring(b2)];
      return c2;
    }
  }
  return [];
}
RSAKey.prototype.verify = function(f2, l2) {
  l2 = l2.toLowerCase();
  if (l2.match(/^[0-9a-f]+$/) == null) {
    return false;
  }
  var b2 = parseBigInt(l2, 16);
  var k = this.n.bitLength();
  if (b2.bitLength() > k) {
    return false;
  }
  var j2 = this.doPublic(b2);
  var i2 = j2.toString(16);
  if (i2.length + 3 != k / 4) {
    return false;
  }
  var e2 = i2.replace(/^1f+00/, "");
  var g2 = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e2);
  if (g2.length == 0) {
    return false;
  }
  var d2 = g2[0];
  var h2 = g2[1];
  var a2 = function(m2) {
    return KJUR.crypto.Util.hashString(m2, d2);
  };
  var c2 = a2(f2);
  return h2 == c2;
};
RSAKey.prototype.verifyWithMessageHash = function(e2, a2) {
  if (a2.length != Math.ceil(this.n.bitLength() / 4)) {
    return false;
  }
  var b2 = parseBigInt(a2, 16);
  if (b2.bitLength() > this.n.bitLength()) {
    return 0;
  }
  var h2 = this.doPublic(b2);
  var g2 = h2.toString(16).replace(/^1f+00/, "");
  var c2 = _rsasign_getAlgNameAndHashFromHexDisgestInfo(g2);
  if (c2.length == 0) {
    return false;
  }
  c2[0];
  var f2 = c2[1];
  return f2 == e2;
};
RSAKey.prototype.verifyPSS = function(c2, b2, a2, f2) {
  var e2 = function(g2) {
    return KJUR.crypto.Util.hashHex(g2, a2);
  };
  var d2 = e2(rstrtohex(c2));
  if (f2 === void 0) {
    f2 = -1;
  }
  return this.verifyWithMessageHashPSS(d2, b2, a2, f2);
};
RSAKey.prototype.verifyWithMessageHashPSS = function(f2, s2, l2, c2) {
  if (s2.length != Math.ceil(this.n.bitLength() / 4)) {
    return false;
  }
  var k = new BigInteger(s2, 16);
  var r2 = function(i2) {
    return KJUR.crypto.Util.hashHex(i2, l2);
  };
  var j2 = hextorstr(f2);
  var h2 = j2.length;
  var g2 = this.n.bitLength() - 1;
  var m2 = Math.ceil(g2 / 8);
  var q2;
  if (c2 === -1 || c2 === void 0) {
    c2 = h2;
  } else {
    if (c2 === -2) {
      c2 = m2 - h2 - 2;
    } else {
      if (c2 < -2) {
        throw new Error("invalid salt length");
      }
    }
  }
  if (m2 < h2 + c2 + 2) {
    throw new Error("data too long");
  }
  var a2 = this.doPublic(k).toByteArray();
  for (q2 = 0; q2 < a2.length; q2 += 1) {
    a2[q2] &= 255;
  }
  while (a2.length < m2) {
    a2.unshift(0);
  }
  if (a2[m2 - 1] !== 188) {
    throw new Error("encoded message does not end in 0xbc");
  }
  a2 = String.fromCharCode.apply(String, a2);
  var d2 = a2.substr(0, m2 - h2 - 1);
  var e2 = a2.substr(d2.length, h2);
  var p2 = 65280 >> 8 * m2 - g2 & 255;
  if ((d2.charCodeAt(0) & p2) !== 0) {
    throw new Error("bits beyond keysize not zero");
  }
  var n2 = pss_mgf1_str(e2, d2.length, r2);
  var o2 = [];
  for (q2 = 0; q2 < d2.length; q2 += 1) {
    o2[q2] = d2.charCodeAt(q2) ^ n2.charCodeAt(q2);
  }
  o2[0] &= ~p2;
  var b2 = m2 - h2 - c2 - 2;
  for (q2 = 0; q2 < b2; q2 += 1) {
    if (o2[q2] !== 0) {
      throw new Error("leftmost octets not zero");
    }
  }
  if (o2[b2] !== 1) {
    throw new Error("0x01 marker not found");
  }
  return e2 === hextorstr(r2(rstrtohex("\0\0\0\0\0\0\0\0" + j2 + String.fromCharCode.apply(String, o2.slice(-c2)))));
};
RSAKey.SALT_LEN_HLEN = -1;
RSAKey.SALT_LEN_MAX = -2;
RSAKey.SALT_LEN_RECOVER = -2;
function X509(v2) {
  var o2 = ASN1HEX, s2 = o2.getChildIdx, k = o2.getV;
  o2.dump;
  var j2 = o2.parse, b2 = o2.getTLV, c2 = o2.getVbyList, p2 = o2.getVbyListEx, a2 = o2.getTLVbyList, q2 = o2.getTLVbyListEx, l2 = o2.getIdxbyList, f2 = o2.getIdxbyListEx, n2 = o2.getVidx, x = o2.getInt, u2 = o2.oidname, r2 = o2.hextooidstr, w2 = pemtohex, g2, m2 = Error;
  try {
    g2 = KJUR.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV;
  } catch (t2) {
  }
  this.HEX2STAG = { "0c": "utf8", "13": "prn", "16": "ia5", "1a": "vis", "1e": "bmp" };
  this.hex = null;
  this.version = 0;
  this.foffset = 0;
  this.aExtInfo = null;
  this.getVersion = function() {
    if (this.hex === null || this.version !== 0) {
      return this.version;
    }
    var A2 = a2(this.hex, 0, [0, 0]);
    if (A2.substr(0, 2) == "a0") {
      var B2 = a2(A2, 0, [0]);
      var z2 = x(B2, 0);
      if (z2 < 0 || 2 < z2) {
        throw new Error("malformed version field");
      }
      this.version = z2 + 1;
      return this.version;
    } else {
      this.version = 1;
      this.foffset = -1;
      return 1;
    }
  };
  this.getSerialNumberHex = function() {
    return p2(this.hex, 0, [0, 0], "02");
  };
  this.getSignatureAlgorithmField = function() {
    var z2 = q2(this.hex, 0, [0, 1]);
    return this.getAlgorithmIdentifierName(z2);
  };
  this.getAlgorithmIdentifierName = function(z2) {
    for (var A2 in g2) {
      if (z2 === g2[A2]) {
        return A2;
      }
    }
    return u2(p2(z2, 0, [0], "06"));
  };
  this.getIssuer = function(A2, z2) {
    return this.getX500Name(this.getIssuerHex(), A2, z2);
  };
  this.getIssuerHex = function() {
    return a2(this.hex, 0, [0, 3 + this.foffset], "30");
  };
  this.getIssuerString = function() {
    var z2 = this.getIssuer();
    return z2.str;
  };
  this.getSubject = function(A2, z2) {
    return this.getX500Name(this.getSubjectHex(), A2, z2);
  };
  this.getSubjectHex = function() {
    return a2(this.hex, 0, [0, 5 + this.foffset], "30");
  };
  this.getSubjectString = function() {
    var z2 = this.getSubject();
    return z2.str;
  };
  this.getNotBefore = function() {
    var z2 = c2(this.hex, 0, [0, 4 + this.foffset, 0]);
    z2 = z2.replace(/(..)/g, "%$1");
    z2 = decodeURIComponent(z2);
    return z2;
  };
  this.getNotAfter = function() {
    var z2 = c2(this.hex, 0, [0, 4 + this.foffset, 1]);
    z2 = z2.replace(/(..)/g, "%$1");
    z2 = decodeURIComponent(z2);
    return z2;
  };
  this.getPublicKeyHex = function() {
    return this.getSPKI();
  };
  this.getSPKI = function() {
    return a2(this.hex, 0, [0, 6 + this.foffset], "30");
  };
  this.getSPKIValue = function() {
    var z2 = this.getSPKI();
    if (z2 == null) {
      return null;
    }
    return c2(z2, 0, [1], "03", true);
  };
  this.getPublicKeyIdx = function() {
    return l2(this.hex, 0, [0, 6 + this.foffset], "30");
  };
  this.getPublicKeyContentIdx = function() {
    var z2 = this.getPublicKeyIdx();
    return l2(this.hex, z2, [1, 0], "30");
  };
  this.getPublicKey = function() {
    return KEYUTIL.getKey(this.getPublicKeyHex(), null, "pkcs8pub");
  };
  this.getSignatureAlgorithmName = function() {
    var z2 = a2(this.hex, 0, [1], "30");
    return this.getAlgorithmIdentifierName(z2);
  };
  this.getSignatureValueHex = function() {
    return c2(this.hex, 0, [2], "03", true);
  };
  this.verifySignature = function(B2) {
    var C2 = this.getSignatureAlgorithmField();
    var z2 = this.getSignatureValueHex();
    var A2 = a2(this.hex, 0, [0], "30");
    var D2 = new KJUR.crypto.Signature({ alg: C2 });
    D2.init(B2);
    D2.updateHex(A2);
    return D2.verify(z2);
  };
  this.parseExt = function(I2) {
    var B2, z2, D2;
    if (I2 === void 0) {
      D2 = this.hex;
      if (this.version !== 3) {
        return -1;
      }
      B2 = l2(D2, 0, [0, 7, 0], "30");
      z2 = s2(D2, B2);
    } else {
      D2 = pemtohex(I2);
      var E2 = l2(D2, 0, [0, 3, 0, 0], "06");
      if (k(D2, E2) != "2a864886f70d01090e") {
        this.aExtInfo = new Array();
        return;
      }
      B2 = l2(D2, 0, [0, 3, 0, 1, 0], "30");
      z2 = s2(D2, B2);
      this.hex = D2;
    }
    this.aExtInfo = new Array();
    for (var C2 = 0; C2 < z2.length; C2++) {
      var G2 = {};
      G2.critical = false;
      var F2 = s2(D2, z2[C2]);
      var A2 = 0;
      if (F2.length === 3) {
        G2.critical = true;
        A2 = 1;
      }
      G2.oid = o2.hextooidstr(c2(D2, z2[C2], [0], "06"));
      var H2 = l2(D2, z2[C2], [1 + A2]);
      G2.vidx = n2(D2, H2);
      this.aExtInfo.push(G2);
    }
  };
  this.getExtInfo = function(B2) {
    var z2 = this.aExtInfo;
    var C2 = B2;
    if (!B2.match(/^[0-9.]+$/)) {
      C2 = KJUR.asn1.x509.OID.name2oid(B2);
    }
    if (C2 === "") {
      return void 0;
    }
    for (var A2 = 0; A2 < z2.length; A2++) {
      if (z2[A2].oid === C2) {
        return z2[A2];
      }
    }
    return void 0;
  };
  this.getCriticalExtV = function(C2, z2, B2) {
    if (z2 != void 0) {
      return [z2, B2];
    }
    var A2 = this.getExtInfo(C2);
    if (A2 == void 0) {
      return [null, null];
    }
    return [b2(this.hex, A2.vidx), A2.critical];
  };
  this.getExtBasicConstraints = function(A2, E2) {
    if (A2 === void 0 && E2 === void 0) {
      var C2 = this.getExtInfo("basicConstraints");
      if (C2 === void 0) {
        return void 0;
      }
      A2 = b2(this.hex, C2.vidx);
      E2 = C2.critical;
    }
    var z2 = { extname: "basicConstraints" };
    if (E2) {
      z2.critical = true;
    }
    if (A2 === "3000") {
      return z2;
    }
    if (A2 === "30030101ff") {
      z2.cA = true;
      return z2;
    }
    if (A2.substr(0, 12) === "30060101ff02") {
      var D2 = k(A2, 10);
      var B2 = parseInt(D2, 16);
      z2.cA = true;
      z2.pathLen = B2;
      return z2;
    }
    throw new Error("hExtV parse error: " + A2);
  };
  this.getExtNameConstraints = function(I2, G2) {
    var A2 = this.getCriticalExtV("nameConstraints", I2, G2);
    I2 = A2[0];
    G2 = A2[1];
    if (I2 == null) {
      return void 0;
    }
    var K2 = { extname: "nameConstraints" };
    if (G2) {
      K2.critical = true;
    }
    var F2 = s2(I2, 0);
    for (var D2 = 0; D2 < F2.length; D2++) {
      var E2 = [];
      var B2 = s2(I2, F2[D2]);
      for (var C2 = 0; C2 < B2.length; C2++) {
        var H2 = b2(I2, B2[C2]);
        var z2 = this.getGeneralSubtree(H2);
        E2.push(z2);
      }
      var J2 = I2.substr(F2[D2], 2);
      if (J2 == "a0") {
        K2.permit = E2;
      } else {
        if (J2 == "a1") {
          K2.exclude = E2;
        }
      }
    }
    return K2;
  };
  this.getGeneralSubtree = function(F2) {
    var D2 = s2(F2, 0);
    var C2 = D2.length;
    if (C2 < 1 || 2 < C2) {
      throw new Error("wrong num elements");
    }
    var B2 = this.getGeneralName(b2(F2, D2[0]));
    for (var E2 = 1; E2 < C2; E2++) {
      var A2 = F2.substr(D2[E2], 2);
      var z2 = k(F2, D2[E2]);
      var G2 = parseInt(z2, 16);
      if (A2 == "80") {
        B2.min = G2;
      }
      if (A2 == "81") {
        B2.max = G2;
      }
    }
    return B2;
  };
  this.getExtKeyUsage = function(A2, C2) {
    var B2 = this.getCriticalExtV("keyUsage", A2, C2);
    A2 = B2[0];
    C2 = B2[1];
    if (A2 == null) {
      return void 0;
    }
    var z2 = { extname: "keyUsage" };
    if (C2) {
      z2.critical = true;
    }
    z2.names = this.getExtKeyUsageString(A2).split(",");
    return z2;
  };
  this.getExtKeyUsageBin = function(A2) {
    if (A2 === void 0) {
      var B2 = this.getExtInfo("keyUsage");
      if (B2 === void 0) {
        return "";
      }
      A2 = b2(this.hex, B2.vidx);
    }
    if (A2.length != 8 && A2.length != 10) {
      throw new Error("malformed key usage value: " + A2);
    }
    var z2 = "000000000000000" + parseInt(A2.substr(6), 16).toString(2);
    if (A2.length == 8) {
      z2 = z2.slice(-8);
    }
    if (A2.length == 10) {
      z2 = z2.slice(-16);
    }
    z2 = z2.replace(/0+$/, "");
    if (z2 == "") {
      z2 = "0";
    }
    return z2;
  };
  this.getExtKeyUsageString = function(B2) {
    var C2 = this.getExtKeyUsageBin(B2);
    var z2 = new Array();
    for (var A2 = 0; A2 < C2.length; A2++) {
      if (C2.substr(A2, 1) == "1") {
        z2.push(X509.KEYUSAGE_NAME[A2]);
      }
    }
    return z2.join(",");
  };
  this.getExtSubjectKeyIdentifier = function(B2, D2) {
    if (B2 === void 0 && D2 === void 0) {
      var C2 = this.getExtInfo("subjectKeyIdentifier");
      if (C2 === void 0) {
        return void 0;
      }
      B2 = b2(this.hex, C2.vidx);
      D2 = C2.critical;
    }
    var z2 = { extname: "subjectKeyIdentifier" };
    if (D2) {
      z2.critical = true;
    }
    var A2 = k(B2, 0);
    z2.kid = { hex: A2 };
    return z2;
  };
  this.getExtAuthorityKeyIdentifier = function(F2, D2) {
    if (F2 === void 0 && D2 === void 0) {
      var z2 = this.getExtInfo("authorityKeyIdentifier");
      if (z2 === void 0) {
        return void 0;
      }
      F2 = b2(this.hex, z2.vidx);
      D2 = z2.critical;
    }
    var G2 = { extname: "authorityKeyIdentifier" };
    if (D2) {
      G2.critical = true;
    }
    var E2 = s2(F2, 0);
    for (var A2 = 0; A2 < E2.length; A2++) {
      var H2 = F2.substr(E2[A2], 2);
      if (H2 === "80") {
        G2.kid = { hex: k(F2, E2[A2]) };
      }
      if (H2 === "a1") {
        var C2 = b2(F2, E2[A2]);
        var B2 = this.getGeneralNames(C2);
        G2.issuer = B2[0]["dn"];
      }
      if (H2 === "82") {
        G2.sn = { hex: k(F2, E2[A2]) };
      }
    }
    return G2;
  };
  this.getExtExtKeyUsage = function(C2, E2) {
    if (C2 === void 0 && E2 === void 0) {
      var D2 = this.getExtInfo("extKeyUsage");
      if (D2 === void 0) {
        return void 0;
      }
      C2 = b2(this.hex, D2.vidx);
      E2 = D2.critical;
    }
    var z2 = { extname: "extKeyUsage", array: [] };
    if (E2) {
      z2.critical = true;
    }
    var A2 = s2(C2, 0);
    for (var B2 = 0; B2 < A2.length; B2++) {
      z2.array.push(u2(k(C2, A2[B2])));
    }
    return z2;
  };
  this.getExtExtKeyUsageName = function() {
    var D2 = this.getExtInfo("extKeyUsage");
    if (D2 === void 0) {
      return D2;
    }
    var z2 = new Array();
    var C2 = b2(this.hex, D2.vidx);
    if (C2 === "") {
      return z2;
    }
    var A2 = s2(C2, 0);
    for (var B2 = 0; B2 < A2.length; B2++) {
      z2.push(u2(k(C2, A2[B2])));
    }
    return z2;
  };
  this.getExtSubjectAltName = function(A2, C2) {
    if (A2 === void 0 && C2 === void 0) {
      var B2 = this.getExtInfo("subjectAltName");
      if (B2 === void 0) {
        return void 0;
      }
      A2 = b2(this.hex, B2.vidx);
      C2 = B2.critical;
    }
    var z2 = { extname: "subjectAltName", array: [] };
    if (C2) {
      z2.critical = true;
    }
    z2.array = this.getGeneralNames(A2);
    return z2;
  };
  this.getExtIssuerAltName = function(A2, C2) {
    if (A2 === void 0 && C2 === void 0) {
      var B2 = this.getExtInfo("issuerAltName");
      if (B2 === void 0) {
        return void 0;
      }
      A2 = b2(this.hex, B2.vidx);
      C2 = B2.critical;
    }
    var z2 = { extname: "issuerAltName", array: [] };
    if (C2) {
      z2.critical = true;
    }
    z2.array = this.getGeneralNames(A2);
    return z2;
  };
  this.getGeneralNames = function(D2) {
    var B2 = s2(D2, 0);
    var z2 = [];
    for (var C2 = 0; C2 < B2.length; C2++) {
      var A2 = this.getGeneralName(b2(D2, B2[C2]));
      if (A2 !== void 0) {
        z2.push(A2);
      }
    }
    return z2;
  };
  this.getGeneralName = function(A2) {
    var z2 = A2.substr(0, 2);
    var C2 = k(A2, 0);
    var B2 = hextorstr(C2);
    if (z2 == "81") {
      return { rfc822: B2 };
    }
    if (z2 == "82") {
      return { dns: B2 };
    }
    if (z2 == "86") {
      return { uri: B2 };
    }
    if (z2 == "87") {
      return { ip: hextoip(C2) };
    }
    if (z2 == "a4") {
      return { dn: this.getX500Name(C2) };
    }
    if (z2 == "a0") {
      return { other: this.getOtherName(A2) };
    }
    return void 0;
  };
  this.getExtSubjectAltName2 = function() {
    var D2, G2, F2;
    var E2 = this.getExtInfo("subjectAltName");
    if (E2 === void 0) {
      return E2;
    }
    var z2 = new Array();
    var C2 = b2(this.hex, E2.vidx);
    var A2 = s2(C2, 0);
    for (var B2 = 0; B2 < A2.length; B2++) {
      F2 = C2.substr(A2[B2], 2);
      D2 = k(C2, A2[B2]);
      if (F2 === "81") {
        G2 = hextoutf8(D2);
        z2.push(["MAIL", G2]);
      }
      if (F2 === "82") {
        G2 = hextoutf8(D2);
        z2.push(["DNS", G2]);
      }
      if (F2 === "84") {
        G2 = X509.hex2dn(D2, 0);
        z2.push(["DN", G2]);
      }
      if (F2 === "86") {
        G2 = hextoutf8(D2);
        z2.push(["URI", G2]);
      }
      if (F2 === "87") {
        G2 = hextoip(D2);
        z2.push(["IP", G2]);
      }
    }
    return z2;
  };
  this.getExtCRLDistributionPoints = function(D2, F2) {
    if (D2 === void 0 && F2 === void 0) {
      var E2 = this.getExtInfo("cRLDistributionPoints");
      if (E2 === void 0) {
        return void 0;
      }
      D2 = b2(this.hex, E2.vidx);
      F2 = E2.critical;
    }
    var A2 = { extname: "cRLDistributionPoints", array: [] };
    if (F2) {
      A2.critical = true;
    }
    var B2 = s2(D2, 0);
    for (var C2 = 0; C2 < B2.length; C2++) {
      var z2 = b2(D2, B2[C2]);
      A2.array.push(this.getDistributionPoint(z2));
    }
    return A2;
  };
  this.getDistributionPoint = function(E2) {
    var B2 = {};
    var C2 = s2(E2, 0);
    for (var D2 = 0; D2 < C2.length; D2++) {
      var A2 = E2.substr(C2[D2], 2);
      var z2 = b2(E2, C2[D2]);
      if (A2 == "a0") {
        B2.dpname = this.getDistributionPointName(z2);
      }
    }
    return B2;
  };
  this.getDistributionPointName = function(E2) {
    var B2 = {};
    var C2 = s2(E2, 0);
    for (var D2 = 0; D2 < C2.length; D2++) {
      var A2 = E2.substr(C2[D2], 2);
      var z2 = b2(E2, C2[D2]);
      if (A2 == "a0") {
        B2.full = this.getGeneralNames(z2);
      }
    }
    return B2;
  };
  this.getExtCRLDistributionPointsURI = function() {
    var D2 = this.getExtCRLDistributionPoints();
    if (D2 == void 0) {
      return D2;
    }
    var A2 = D2.array;
    var z2 = [];
    for (var C2 = 0; C2 < A2.length; C2++) {
      try {
        if (A2[C2].dpname.full[0].uri != void 0) {
          z2.push(A2[C2].dpname.full[0].uri);
        }
      } catch (B2) {
      }
    }
    return z2;
  };
  this.getExtAIAInfo = function() {
    var D2 = this.getExtInfo("authorityInfoAccess");
    if (D2 === void 0) {
      return D2;
    }
    var z2 = { ocsp: [], caissuer: [] };
    var A2 = s2(this.hex, D2.vidx);
    for (var B2 = 0; B2 < A2.length; B2++) {
      var E2 = c2(this.hex, A2[B2], [0], "06");
      var C2 = c2(this.hex, A2[B2], [1], "86");
      if (E2 === "2b06010505073001") {
        z2.ocsp.push(hextoutf8(C2));
      }
      if (E2 === "2b06010505073002") {
        z2.caissuer.push(hextoutf8(C2));
      }
    }
    return z2;
  };
  this.getExtAuthorityInfoAccess = function(G2, E2) {
    if (G2 === void 0 && E2 === void 0) {
      var z2 = this.getExtInfo("authorityInfoAccess");
      if (z2 === void 0) {
        return void 0;
      }
      G2 = b2(this.hex, z2.vidx);
      E2 = z2.critical;
    }
    var H2 = { extname: "authorityInfoAccess", array: [] };
    if (E2) {
      H2.critical = true;
    }
    var F2 = s2(G2, 0);
    for (var A2 = 0; A2 < F2.length; A2++) {
      var D2 = p2(G2, F2[A2], [0], "06");
      var B2 = c2(G2, F2[A2], [1], "86");
      var C2 = hextoutf8(B2);
      if (D2 == "2b06010505073001") {
        H2.array.push({ ocsp: C2 });
      } else {
        if (D2 == "2b06010505073002") {
          H2.array.push({ caissuer: C2 });
        } else {
          throw new Error("unknown method: " + D2);
        }
      }
    }
    return H2;
  };
  this.getExtCertificatePolicies = function(D2, G2) {
    if (D2 === void 0 && G2 === void 0) {
      var F2 = this.getExtInfo("certificatePolicies");
      if (F2 === void 0) {
        return void 0;
      }
      D2 = b2(this.hex, F2.vidx);
      G2 = F2.critical;
    }
    var z2 = { extname: "certificatePolicies", array: [] };
    if (G2) {
      z2.critical = true;
    }
    var A2 = s2(D2, 0);
    for (var B2 = 0; B2 < A2.length; B2++) {
      var E2 = b2(D2, A2[B2]);
      var C2 = this.getPolicyInformation(E2);
      z2.array.push(C2);
    }
    return z2;
  };
  this.getPolicyInformation = function(D2) {
    var z2 = {};
    var F2 = c2(D2, 0, [0], "06");
    z2.policyoid = u2(F2);
    var G2 = f2(D2, 0, [1], "30");
    if (G2 != -1) {
      z2.array = [];
      var A2 = s2(D2, G2);
      for (var B2 = 0; B2 < A2.length; B2++) {
        var E2 = b2(D2, A2[B2]);
        var C2 = this.getPolicyQualifierInfo(E2);
        z2.array.push(C2);
      }
    }
    return z2;
  };
  this.getOtherName = function(B2) {
    var z2 = {};
    var A2 = s2(B2, 0);
    var D2 = c2(B2, A2[0], [], "06");
    var C2 = c2(B2, A2[1], []);
    z2.oid = u2(D2);
    z2.value = j2(C2);
    return z2;
  };
  this.getPolicyQualifierInfo = function(A2) {
    var z2 = {};
    var B2 = c2(A2, 0, [0], "06");
    if (B2 === "2b06010505070201") {
      var D2 = p2(A2, 0, [1], "16");
      z2.cps = hextorstr(D2);
    } else {
      if (B2 === "2b06010505070202") {
        var C2 = a2(A2, 0, [1], "30");
        z2.unotice = this.getUserNotice(C2);
      }
    }
    return z2;
  };
  this.getUserNotice = function(B2) {
    var D2 = null;
    try {
      D2 = o2.parse(B2);
      var C2 = this._asn1ToUnotice(D2);
      return C2;
    } catch (A2) {
      return void 0;
    }
  };
  this._asn1ToUnotice = function(E2) {
    try {
      var z2 = {};
      var A2 = aryval(E2, "seq");
      for (var C2 = 0; C2 < A2.length; C2++) {
        var D2 = this._asn1ToNoticeRef(A2[C2]);
        if (D2 != void 0) {
          z2.noticeref = D2;
        }
        var F2 = this.asn1ToDisplayText(A2[C2]);
        if (F2 != void 0) {
          z2.exptext = F2;
        }
      }
      if (Object.keys(z2).length > 0) {
        return z2;
      }
      return void 0;
    } catch (B2) {
      return void 0;
    }
  };
  this._asn1ToNoticeRef = function(F2) {
    try {
      var A2 = {};
      var B2 = aryval(F2, "seq");
      for (var D2 = 0; D2 < B2.length; D2++) {
        var E2 = this._asn1ToNoticeNum(B2[D2]);
        if (E2 != void 0) {
          A2.noticenum = E2;
        }
        var z2 = this.asn1ToDisplayText(B2[D2]);
        if (z2 != void 0) {
          A2.org = z2;
        }
      }
      if (Object.keys(A2).length > 0) {
        return A2;
      }
      return void 0;
    } catch (C2) {
      return void 0;
    }
  };
  this._asn1ToNoticeNum = function(E2) {
    try {
      var A2 = aryval(E2, "seq");
      var z2 = [];
      for (var C2 = 0; C2 < A2.length; C2++) {
        var D2 = A2[C2];
        z2.push(parseInt(aryval(D2, "int.hex"), 16));
      }
      return z2;
    } catch (B2) {
      return void 0;
    }
  };
  this.getDisplayText = function(A2) {
    var B2 = { "0c": "utf8", "16": "ia5", "1a": "vis", "1e": "bmp" };
    var z2 = {};
    z2.type = B2[A2.substr(0, 2)];
    z2.str = hextorstr(k(A2, 0));
    return z2;
  };
  this.asn1ToDisplayText = function(z2) {
    if (z2.utf8str != void 0) {
      return { type: "utf8", str: z2.utf8str.str };
    }
    if (z2.ia5str != void 0) {
      return { type: "ia5", str: z2.ia5str.str };
    }
    if (z2.visstr != void 0) {
      return { type: "vis", str: z2.visstr.str };
    }
    if (z2.bmpstr != void 0) {
      return { type: "bmp", str: z2.bmpstr.str };
    }
    if (z2.prnstr != void 0) {
      return { type: "prn", str: z2.prnstr.str };
    }
    return void 0;
  };
  this.getExtPolicyMappings = function(G2, E2) {
    var z2 = this.getCriticalExtV("policyMappings", G2, E2);
    G2 = z2[0];
    E2 = z2[1];
    if (G2 == null) {
      return void 0;
    }
    var I2 = { extname: "policyMappings" };
    if (E2) {
      I2.critical = true;
    }
    try {
      var A2 = j2(G2);
      var B2 = A2.seq;
      var F2 = [];
      for (var C2 = 0; C2 < B2.length; C2++) {
        var H2 = B2[C2].seq;
        F2.push([H2[0].oid, H2[1].oid]);
      }
      I2.array = F2;
    } catch (D2) {
      throw new m2("malformed policyMappings");
    }
    return I2;
  };
  this.getExtPolicyConstraints = function(G2, D2) {
    var z2 = this.getCriticalExtV("policyConstraints", G2, D2);
    G2 = z2[0];
    D2 = z2[1];
    if (G2 == null) {
      return void 0;
    }
    var H2 = { extname: "policyConstraints" };
    if (D2) {
      H2.critical = true;
    }
    var A2 = j2(G2);
    try {
      var F2 = A2.seq;
      for (var B2 = 0; B2 < F2.length; B2++) {
        var E2 = F2[B2].tag;
        if (E2.explicit != false) {
          continue;
        }
        if (E2.tag == "80") {
          H2.reqexp = parseInt(E2.hex, 16);
        }
        if (E2.tag == "81") {
          H2.inhibit = parseInt(E2.hex, 16);
        }
      }
    } catch (C2) {
      return new m2("malformed policyConstraints value");
    }
    return H2;
  };
  this.getExtInhibitAnyPolicy = function(A2, D2) {
    var C2 = this.getCriticalExtV("inhibitAnyPolicy", A2, D2);
    A2 = C2[0];
    D2 = C2[1];
    if (A2 == null) {
      return void 0;
    }
    var z2 = { extname: "inhibitAnyPolicy" };
    if (D2) {
      z2.critical = true;
    }
    var B2 = x(A2, 0);
    if (B2 == -1) {
      return new m2("wrong value");
    }
    z2.skip = B2;
    return z2;
  };
  this.getExtCRLNumber = function(A2, B2) {
    var z2 = { extname: "cRLNumber" };
    if (B2) {
      z2.critical = true;
    }
    if (A2.substr(0, 2) == "02") {
      z2.num = { hex: k(A2, 0) };
      return z2;
    }
    throw new m2("hExtV parse error: " + A2);
  };
  this.getExtCRLReason = function(A2, B2) {
    var z2 = { extname: "cRLReason" };
    if (B2) {
      z2.critical = true;
    }
    if (A2.substr(0, 2) == "0a") {
      z2.code = parseInt(k(A2, 0), 16);
      return z2;
    }
    throw new Error("hExtV parse error: " + A2);
  };
  this.getExtOcspNonce = function(A2, C2) {
    var z2 = { extname: "ocspNonce" };
    if (C2) {
      z2.critical = true;
    }
    var B2 = k(A2, 0);
    z2.hex = B2;
    return z2;
  };
  this.getExtOcspNoCheck = function(A2, B2) {
    var z2 = { extname: "ocspNoCheck" };
    if (B2) {
      z2.critical = true;
    }
    return z2;
  };
  this.getExtAdobeTimeStamp = function(C2, F2) {
    if (C2 === void 0 && F2 === void 0) {
      var E2 = this.getExtInfo("adobeTimeStamp");
      if (E2 === void 0) {
        return void 0;
      }
      C2 = b2(this.hex, E2.vidx);
      F2 = E2.critical;
    }
    var z2 = { extname: "adobeTimeStamp" };
    if (F2) {
      z2.critical = true;
    }
    var B2 = s2(C2, 0);
    if (B2.length > 1) {
      var G2 = b2(C2, B2[1]);
      var A2 = this.getGeneralName(G2);
      if (A2.uri != void 0) {
        z2.uri = A2.uri;
      }
    }
    if (B2.length > 2) {
      var D2 = b2(C2, B2[2]);
      if (D2 == "0101ff") {
        z2.reqauth = true;
      }
      if (D2 == "010100") {
        z2.reqauth = false;
      }
    }
    return z2;
  };
  this.getExtSubjectDirectoryAttributes = function(I2, H2) {
    if (I2 === void 0 && H2 === void 0) {
      var B2 = this.getExtInfo("subjectDirectoryAttributes");
      if (B2 === void 0) {
        return void 0;
      }
      I2 = b2(this.hex, B2.vidx);
      H2 = B2.critical;
    }
    var J2 = { extname: "subjectDirectoryAttributes" };
    if (H2) {
      J2.critical = true;
    }
    try {
      var z2 = j2(I2);
      var D2 = [];
      for (var E2 = 0; E2 < z2.seq.length; E2++) {
        var A2 = z2.seq[E2];
        var C2 = aryval(A2, "seq.0.oid");
        var F2 = aryval(A2, "seq.1.set");
        if (C2 == void 0 || F2 == void 0) {
          throw "error";
        }
        D2.push({ attr: C2, array: F2 });
      }
      J2.array = D2;
      return J2;
    } catch (G2) {
      throw new Error("malformed subjectDirectoryAttributes extension value");
    }
  };
  var e2 = function(E2) {
    var z2 = {};
    try {
      var B2 = E2.seq[0].oid;
      var D2 = KJUR.asn1.x509.OID.name2oid(B2);
      z2.type = KJUR.asn1.x509.OID.oid2atype(D2);
      var A2 = E2.seq[1];
      if (A2.utf8str != void 0) {
        z2.ds = "utf8";
        z2.value = A2.utf8str.str;
      } else {
        if (A2.numstr != void 0) {
          z2.ds = "num";
          z2.value = A2.numstr.str;
        } else {
          if (A2.telstr != void 0) {
            z2.ds = "tel";
            z2.value = A2.telstr.str;
          } else {
            if (A2.prnstr != void 0) {
              z2.ds = "prn";
              z2.value = A2.prnstr.str;
            } else {
              if (A2.ia5str != void 0) {
                z2.ds = "ia5";
                z2.value = A2.ia5str.str;
              } else {
                if (A2.visstr != void 0) {
                  z2.ds = "vis";
                  z2.value = A2.visstr.str;
                } else {
                  if (A2.bmpstr != void 0) {
                    z2.ds = "bmp";
                    z2.value = A2.bmpstr.str;
                  } else {
                    throw "error";
                  }
                }
              }
            }
          }
        }
      }
      return z2;
    } catch (C2) {
      throw new Erorr("improper ASN.1 parsed AttrTypeAndValue");
    }
  };
  var i2 = function(A2) {
    try {
      return A2.set.map(function(B2) {
        return e2(B2);
      });
    } catch (z2) {
      throw new Error("improper ASN.1 parsed RDN: " + z2);
    }
  };
  var h2 = function(A2) {
    try {
      return A2.seq.map(function(B2) {
        return i2(B2);
      });
    } catch (z2) {
      throw new Error("improper ASN.1 parsed X500Name: " + z2);
    }
  };
  this.getX500NameRule = function(z2) {
    var M2 = null;
    var H2 = [];
    for (var C2 = 0; C2 < z2.length; C2++) {
      var E2 = z2[C2];
      for (var B2 = 0; B2 < E2.length; B2++) {
        H2.push(E2[B2]);
      }
    }
    for (var C2 = 0; C2 < H2.length; C2++) {
      var L2 = H2[C2];
      var N2 = L2.ds;
      var I2 = L2.value;
      var F2 = L2.type;
      if (N2 != "prn" && N2 != "utf8" && N2 != "ia5") {
        return "mixed";
      }
      if (N2 == "ia5") {
        if (F2 != "CN") {
          return "mixed";
        } else {
          if (!KJUR.lang.String.isMail(I2)) {
            return "mixed";
          } else {
            continue;
          }
        }
      }
      if (F2 == "C") {
        if (N2 == "prn") {
          continue;
        } else {
          return "mixed";
        }
      }
      if (M2 == null) {
        M2 = N2;
      } else {
        if (M2 !== N2) {
          return "mixed";
        }
      }
    }
    if (M2 == null) {
      return "prn";
    } else {
      return M2;
    }
  };
  this.getAttrTypeAndValue = function(z2) {
    var A2 = j2(z2);
    return e2(A2);
  };
  this.getRDN = function(z2) {
    var A2 = j2(z2);
    return i2(A2);
  };
  this.getX500NameArray = function(z2) {
    var A2 = j2(z2);
    return h2(A2);
  };
  this.getX500Name = function(C2, E2, D2) {
    var A2 = this.getX500NameArray(C2);
    var B2 = this.dnarraytostr(A2);
    var z2 = { str: B2 };
    z2.array = A2;
    if (D2 == true) {
      z2.hex = C2;
    }
    if (E2 == true) {
      z2.canon = this.c14nRDNArray(A2);
    }
    return z2;
  };
  this.readCertPEM = function(z2) {
    this.readCertHex(w2(z2));
  };
  this.readCertHex = function(z2) {
    this.hex = z2;
    this.getVersion();
    try {
      l2(this.hex, 0, [0, 7], "a3");
      this.parseExt();
    } catch (A2) {
    }
  };
  this.getParam = function(A2) {
    var z2 = {};
    if (A2 == void 0) {
      A2 = {};
    }
    z2.version = this.getVersion();
    z2.serial = { hex: this.getSerialNumberHex() };
    z2.sigalg = this.getSignatureAlgorithmField();
    z2.issuer = this.getIssuer(A2.dncanon, A2.dnhex);
    z2.notbefore = this.getNotBefore();
    z2.notafter = this.getNotAfter();
    z2.subject = this.getSubject(A2.dncanon, A2.dnhex);
    z2.sbjpubkey = hextopem(this.getPublicKeyHex(), "PUBLIC KEY");
    if (this.aExtInfo != void 0 && this.aExtInfo.length > 0) {
      z2.ext = this.getExtParamArray();
    }
    z2.sighex = this.getSignatureValueHex();
    if (A2.tbshex == true) {
      z2.tbshex = a2(this.hex, 0, [0]);
    }
    if (A2.nodnarray == true) {
      delete z2.issuer.array;
      delete z2.subject.array;
    }
    return z2;
  };
  this.getExtParamArray = function(A2) {
    if (A2 == void 0) {
      var C2 = f2(this.hex, 0, [0, "[3]"]);
      if (C2 != -1) {
        A2 = q2(this.hex, 0, [0, "[3]", 0], "30");
      }
    }
    var z2 = [];
    var B2 = s2(A2, 0);
    for (var D2 = 0; D2 < B2.length; D2++) {
      var F2 = b2(A2, B2[D2]);
      var E2 = this.getExtParam(F2);
      if (E2 != null) {
        z2.push(E2);
      }
    }
    return z2;
  };
  this.getExtParam = function(A2) {
    var C2 = s2(A2, 0);
    var E2 = C2.length;
    if (E2 != 2 && E2 != 3) {
      throw new Error("wrong number elements in Extension: " + E2 + " " + A2);
    }
    var B2 = r2(c2(A2, 0, [0], "06"));
    var G2 = false;
    if (E2 == 3 && a2(A2, 0, [1]) == "0101ff") {
      G2 = true;
    }
    var H2 = a2(A2, 0, [E2 - 1, 0]);
    var F2 = void 0;
    if (B2 == "2.5.29.14") {
      F2 = this.getExtSubjectKeyIdentifier(H2, G2);
    } else {
      if (B2 == "2.5.29.15") {
        F2 = this.getExtKeyUsage(H2, G2);
      } else {
        if (B2 == "2.5.29.17") {
          F2 = this.getExtSubjectAltName(H2, G2);
        } else {
          if (B2 == "2.5.29.18") {
            F2 = this.getExtIssuerAltName(H2, G2);
          } else {
            if (B2 == "2.5.29.19") {
              F2 = this.getExtBasicConstraints(H2, G2);
            } else {
              if (B2 == "2.5.29.30") {
                F2 = this.getExtNameConstraints(H2, G2);
              } else {
                if (B2 == "2.5.29.31") {
                  F2 = this.getExtCRLDistributionPoints(H2, G2);
                } else {
                  if (B2 == "2.5.29.32") {
                    F2 = this.getExtCertificatePolicies(H2, G2);
                  } else {
                    if (B2 == "2.5.29.33") {
                      F2 = this.getExtPolicyMappings(H2, G2);
                    } else {
                      if (B2 == "2.5.29.35") {
                        F2 = this.getExtAuthorityKeyIdentifier(H2, G2);
                      } else {
                        if (B2 == "2.5.29.36") {
                          F2 = this.getExtPolicyConstraints(H2, G2);
                        } else {
                          if (B2 == "2.5.29.37") {
                            F2 = this.getExtExtKeyUsage(H2, G2);
                          } else {
                            if (B2 == "2.5.29.54") {
                              F2 = this.getExtInhibitAnyPolicy(H2, G2);
                            } else {
                              if (B2 == "1.3.6.1.5.5.7.1.1") {
                                F2 = this.getExtAuthorityInfoAccess(H2, G2);
                              } else {
                                if (B2 == "2.5.29.20") {
                                  F2 = this.getExtCRLNumber(H2, G2);
                                } else {
                                  if (B2 == "2.5.29.21") {
                                    F2 = this.getExtCRLReason(H2, G2);
                                  } else {
                                    if (B2 == "2.5.29.9") {
                                      F2 = this.getExtSubjectDirectoryAttributes(H2, G2);
                                    } else {
                                      if (B2 == "1.3.6.1.5.5.7.48.1.2") {
                                        F2 = this.getExtOcspNonce(H2, G2);
                                      } else {
                                        if (B2 == "1.3.6.1.5.5.7.48.1.5") {
                                          F2 = this.getExtOcspNoCheck(H2, G2);
                                        } else {
                                          if (B2 == "1.2.840.113583.1.1.9.1") {
                                            F2 = this.getExtAdobeTimeStamp(H2, G2);
                                          } else {
                                            if (X509.EXT_PARSER[B2] != void 0) {
                                              F2 = X509.EXT_PARSER[B2](B2, G2, H2);
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (F2 != void 0) {
      return F2;
    }
    var z2 = { extname: B2, extn: H2 };
    try {
      z2.extn = j2(H2);
    } catch (D2) {
    }
    if (G2) {
      z2.critical = true;
    }
    return z2;
  };
  this.findExt = function(A2, B2) {
    for (var z2 = 0; z2 < A2.length; z2++) {
      if (A2[z2].extname == B2) {
        return A2[z2];
      }
    }
    return null;
  };
  this.updateExtCDPFullURI = function(D2, z2) {
    var C2 = this.findExt(D2, "cRLDistributionPoints");
    if (C2 == null) {
      return;
    }
    if (C2.array == void 0) {
      return;
    }
    var F2 = C2.array;
    for (var B2 = 0; B2 < F2.length; B2++) {
      if (F2[B2].dpname == void 0) {
        continue;
      }
      if (F2[B2].dpname.full == void 0) {
        continue;
      }
      var G2 = F2[B2].dpname.full;
      for (var A2 = 0; A2 < G2.length; A2++) {
        var E2 = G2[B2];
        if (E2.uri == void 0) {
          continue;
        }
        E2.uri = z2;
      }
    }
  };
  this.updateExtAIAOCSP = function(D2, A2) {
    var C2 = this.findExt(D2, "authorityInfoAccess");
    if (C2 == null) {
      return;
    }
    if (C2.array == void 0) {
      return;
    }
    var z2 = C2.array;
    for (var B2 = 0; B2 < z2.length; B2++) {
      if (z2[B2].ocsp != void 0) {
        z2[B2].ocsp = A2;
      }
    }
  };
  this.updateExtAIACAIssuer = function(D2, A2) {
    var C2 = this.findExt(D2, "authorityInfoAccess");
    if (C2 == null) {
      return;
    }
    if (C2.array == void 0) {
      return;
    }
    var z2 = C2.array;
    for (var B2 = 0; B2 < z2.length; B2++) {
      if (z2[B2].caissuer != void 0) {
        z2[B2].caissuer = A2;
      }
    }
  };
  this.dnarraytostr = function(B2) {
    function z2(C2) {
      return C2.map(function(D2) {
        return A2(D2).replace(/\+/, "\\+");
      }).join("+");
    }
    function A2(C2) {
      return C2.type + "=" + C2.value;
    }
    return "/" + B2.map(function(C2) {
      return z2(C2).replace(/\//, "\\/");
    }).join("/");
  };
  this.setCanonicalizedDN = function(A2) {
    var C2;
    if (A2.str != void 0 && A2.array == void 0) {
      var B2 = new KJUR.asn1.x509.X500Name({ str: A2.str });
      var z2 = B2.tohex();
      C2 = this.getX500NameArray(z2);
    } else {
      C2 = A2.array;
    }
    if (A2.canon == void 0) {
      A2.canon = this.c14nRDNArray(C2);
    }
  };
  this.c14nRDNArray = function(G2) {
    var A2 = [];
    for (var C2 = 0; C2 < G2.length; C2++) {
      var E2 = G2[C2];
      var z2 = [];
      for (var B2 = 0; B2 < E2.length; B2++) {
        var D2 = E2[B2];
        var F2 = D2.value;
        F2 = F2.replace(/^\s*/, "");
        F2 = F2.replace(/\s*$/, "");
        F2 = F2.replace(/\s+/g, " ");
        F2 = F2.toLowerCase();
        z2.push(D2.type.toLowerCase() + "=" + F2);
      }
      A2.push(z2.join("+"));
    }
    return "/" + A2.join("/");
  };
  this.getInfo = function() {
    var A2 = function(W2) {
      var ac = "";
      var U2 = "    ";
      var Y2 = "\n";
      var Z2 = W2.array;
      for (var X2 = 0; X2 < Z2.length; X2++) {
        var V2 = Z2[X2];
        if (V2.dn != void 0) {
          ac += U2 + "dn: " + V2.dn.str + Y2;
        }
        if (V2.ip != void 0) {
          ac += U2 + "ip: " + V2.ip + Y2;
        }
        if (V2.rfc822 != void 0) {
          ac += U2 + "rfc822: " + V2.rfc822 + Y2;
        }
        if (V2.dns != void 0) {
          ac += U2 + "dns: " + V2.dns + Y2;
        }
        if (V2.uri != void 0) {
          ac += U2 + "uri: " + V2.uri + Y2;
        }
        if (V2.other != void 0) {
          var ab = V2.other.oid;
          var aa = JSON.stringify(V2.other.value).replace(/\"/g, "");
          ac += U2 + "other: " + ab + "=" + aa + Y2;
        }
      }
      ac = ac.replace(/\n$/, "");
      return ac;
    };
    var H2 = function(aa) {
      var Y2 = "";
      var U2 = aa.array;
      for (var X2 = 0; X2 < U2.length; X2++) {
        var Z2 = U2[X2];
        Y2 += "    policy oid: " + Z2.policyoid + "\n";
        if (Z2.array === void 0) {
          continue;
        }
        for (var W2 = 0; W2 < Z2.array.length; W2++) {
          var V2 = Z2.array[W2];
          if (V2.cps !== void 0) {
            Y2 += "    cps: " + V2.cps + "\n";
          }
        }
      }
      return Y2;
    };
    var K2 = function(Y2) {
      var X2 = "";
      var U2 = Y2.array;
      for (var W2 = 0; W2 < U2.length; W2++) {
        var Z2 = U2[W2];
        try {
          if (Z2.dpname.full[0].uri !== void 0) {
            X2 += "    " + Z2.dpname.full[0].uri + "\n";
          }
        } catch (V2) {
        }
        try {
          if (Z2.dname.full[0].dn.hex !== void 0) {
            X2 += "    " + X509.hex2dn(Z2.dpname.full[0].dn.hex) + "\n";
          }
        } catch (V2) {
        }
      }
      return X2;
    };
    var I2 = function(Y2) {
      var X2 = "";
      var U2 = Y2.array;
      for (var V2 = 0; V2 < U2.length; V2++) {
        var W2 = U2[V2];
        if (W2.caissuer !== void 0) {
          X2 += "    caissuer: " + W2.caissuer + "\n";
        }
        if (W2.ocsp !== void 0) {
          X2 += "    ocsp: " + W2.ocsp + "\n";
        }
      }
      return X2;
    };
    var M2, L2, T2;
    M2 = "Basic Fields\n";
    M2 += "  serial number: " + this.getSerialNumberHex() + "\n";
    M2 += "  signature algorithm: " + this.getSignatureAlgorithmField() + "\n";
    M2 += "  issuer: " + this.getIssuerString() + "\n";
    M2 += "  notBefore: " + this.getNotBefore() + "\n";
    M2 += "  notAfter: " + this.getNotAfter() + "\n";
    M2 += "  subject: " + this.getSubjectString() + "\n";
    M2 += "  subject public key info: \n";
    L2 = this.getPublicKey();
    M2 += "    key algorithm: " + L2.type + "\n";
    if (L2.type === "RSA") {
      M2 += "    n=" + hextoposhex(L2.n.toString(16)).substr(0, 16) + "...\n";
      M2 += "    e=" + hextoposhex(L2.e.toString(16)) + "\n";
    }
    T2 = this.aExtInfo;
    if (T2 !== void 0 && T2 !== null) {
      M2 += "X509v3 Extensions:\n";
      for (var P2 = 0; P2 < T2.length; P2++) {
        var R2 = T2[P2];
        var z2 = KJUR.asn1.x509.OID.oid2name(R2.oid);
        if (z2 === "") {
          z2 = R2.oid;
        }
        var O2 = "";
        if (R2.critical === true) {
          O2 = "CRITICAL";
        }
        M2 += "  " + z2 + " " + O2 + ":\n";
        if (z2 === "basicConstraints") {
          var C2 = this.getExtBasicConstraints();
          if (C2.cA === void 0) {
            M2 += "    {}\n";
          } else {
            M2 += "    cA=true";
            if (C2.pathLen !== void 0) {
              M2 += ", pathLen=" + C2.pathLen;
            }
            M2 += "\n";
          }
        } else {
          if (z2 == "policyMappings") {
            var S2 = this.getExtPolicyMappings().array;
            var G2 = S2.map(function(U2) {
              var V2 = U2;
              return V2[0] + ":" + V2[1];
            }).join(", ");
            M2 += "    " + G2 + "\n";
          } else {
            if (z2 == "policyConstraints") {
              var N2 = this.getExtPolicyConstraints();
              M2 += "    ";
              if (N2.reqexp != void 0) {
                M2 += " reqexp=" + N2.reqexp;
              }
              if (N2.inhibit != void 0) {
                M2 += " inhibit=" + N2.inhibit;
              }
              M2 += "\n";
            } else {
              if (z2 == "inhibitAnyPolicy") {
                var N2 = this.getExtInhibitAnyPolicy();
                M2 += "    skip=" + N2.skip + "\n";
              } else {
                if (z2 == "keyUsage") {
                  M2 += "    " + this.getExtKeyUsageString() + "\n";
                } else {
                  if (z2 == "subjectKeyIdentifier") {
                    M2 += "    " + this.getExtSubjectKeyIdentifier().kid.hex + "\n";
                  } else {
                    if (z2 == "authorityKeyIdentifier") {
                      var D2 = this.getExtAuthorityKeyIdentifier();
                      if (D2.kid !== void 0) {
                        M2 += "    kid=" + D2.kid.hex + "\n";
                      }
                    } else {
                      if (z2 == "extKeyUsage") {
                        var Q2 = this.getExtExtKeyUsage().array;
                        M2 += "    " + Q2.join(", ") + "\n";
                      } else {
                        if (z2 == "subjectAltName") {
                          var E2 = A2(this.getExtSubjectAltName());
                          M2 += E2 + "\n";
                        } else {
                          if (z2 == "cRLDistributionPoints") {
                            var J2 = this.getExtCRLDistributionPoints();
                            M2 += K2(J2);
                          } else {
                            if (z2 == "authorityInfoAccess") {
                              var F2 = this.getExtAuthorityInfoAccess();
                              M2 += I2(F2);
                            } else {
                              if (z2 == "certificatePolicies") {
                                M2 += H2(this.getExtCertificatePolicies());
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    M2 += "signature algorithm: " + this.getSignatureAlgorithmName() + "\n";
    M2 += "signature: " + this.getSignatureValueHex().substr(0, 16) + "...\n";
    return M2;
  };
  if (typeof v2 == "string") {
    if (v2.indexOf("-----BEGIN") != -1) {
      this.readCertPEM(v2);
    } else {
      if (KJUR.lang.String.isHex(v2)) {
        this.readCertHex(v2);
      }
    }
  }
}
X509.EXT_PARSER = {};
X509.registExtParser = function(b2, a2) {
  X509.EXT_PARSER[b2] = a2;
};
X509.hex2dn = function(e2, b2) {
  if (b2 === void 0) {
    b2 = 0;
  }
  var a2 = new X509();
  ASN1HEX.getTLV(e2, b2);
  var d2 = a2.getX500Name(e2);
  return d2.str;
};
X509.hex2rdn = function(f2, b2) {
  if (b2 === void 0) {
    b2 = 0;
  }
  if (f2.substr(b2, 2) !== "31") {
    throw new Error("malformed RDN");
  }
  var c2 = new Array();
  var d2 = ASN1HEX.getChildIdx(f2, b2);
  for (var e2 = 0; e2 < d2.length; e2++) {
    c2.push(X509.hex2attrTypeValue(f2, d2[e2]));
  }
  c2 = c2.map(function(a2) {
    return a2.replace("+", "\\+");
  });
  return c2.join("+");
};
X509.hex2attrTypeValue = function(d2, i2) {
  var j2 = ASN1HEX;
  var h2 = j2.getV;
  if (i2 === void 0) {
    i2 = 0;
  }
  if (d2.substr(i2, 2) !== "30") {
    throw new Error("malformed attribute type and value");
  }
  var g2 = j2.getChildIdx(d2, i2);
  if (g2.length !== 2 || d2.substr(g2[0], 2) !== "06")
    ;
  var b2 = h2(d2, g2[0]);
  var f2 = KJUR.asn1.ASN1Util.oidHexToInt(b2);
  var e2 = KJUR.asn1.x509.OID.oid2atype(f2);
  var a2 = h2(d2, g2[1]);
  var c2 = hextorstr(a2);
  return e2 + "=" + c2;
};
X509.getPublicKeyFromCertHex = function(b2) {
  var a2 = new X509();
  a2.readCertHex(b2);
  return a2.getPublicKey();
};
X509.getPublicKeyFromCertPEM = function(b2) {
  var a2 = new X509();
  a2.readCertPEM(b2);
  return a2.getPublicKey();
};
X509.getPublicKeyInfoPropOfCertPEM = function(c2) {
  var e2 = ASN1HEX;
  var g2 = e2.getVbyList;
  var b2 = {};
  var a2, f2;
  b2.algparam = null;
  a2 = new X509();
  a2.readCertPEM(c2);
  f2 = a2.getPublicKeyHex();
  b2.keyhex = g2(f2, 0, [1], "03").substr(2);
  b2.algoid = g2(f2, 0, [0, 0], "06");
  if (b2.algoid === "2a8648ce3d0201") {
    b2.algparam = g2(f2, 0, [0, 1], "06");
  }
  return b2;
};
X509.KEYUSAGE_NAME = ["digitalSignature", "nonRepudiation", "keyEncipherment", "dataEncipherment", "keyAgreement", "keyCertSign", "cRLSign", "encipherOnly", "decipherOnly"];
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.jws == "undefined" || !KJUR.jws) {
  KJUR.jws = {};
}
KJUR.jws.JWS = function() {
  var b2 = KJUR, a2 = b2.jws.JWS, c2 = a2.isSafeJSONString;
  this.parseJWS = function(g2, j2) {
    if (this.parsedJWS !== void 0 && (j2 || this.parsedJWS.sigvalH !== void 0)) {
      return;
    }
    var i2 = g2.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);
    if (i2 == null) {
      throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
    }
    var k = i2[1];
    var e2 = i2[2];
    var l2 = i2[3];
    var n2 = k + "." + e2;
    this.parsedJWS = {};
    this.parsedJWS.headB64U = k;
    this.parsedJWS.payloadB64U = e2;
    this.parsedJWS.sigvalB64U = l2;
    this.parsedJWS.si = n2;
    if (!j2) {
      var h2 = b64utohex(l2);
      var f2 = parseBigInt(h2, 16);
      this.parsedJWS.sigvalH = h2;
      this.parsedJWS.sigvalBI = f2;
    }
    var d2 = b64utoutf8(k);
    var m2 = b64utoutf8(e2);
    this.parsedJWS.headS = d2;
    this.parsedJWS.payloadS = m2;
    if (!c2(d2, this.parsedJWS, "headP")) {
      throw "malformed JSON string for JWS Head: " + d2;
    }
  };
};
KJUR.jws.JWS.sign = function(j2, w2, z2, A2, a2) {
  var x = KJUR, n2 = x.jws, r2 = n2.JWS, h2 = r2.readSafeJSONString, q2 = r2.isSafeJSONString, d2 = x.crypto;
  d2.ECDSA;
  var p2 = d2.Mac, c2 = d2.Signature, u2 = JSON;
  var t2, k, o2;
  if (typeof w2 != "string" && typeof w2 != "object") {
    throw "spHeader must be JSON string or object: " + w2;
  }
  if (typeof w2 == "object") {
    k = w2;
    t2 = u2.stringify(k);
  }
  if (typeof w2 == "string") {
    t2 = w2;
    if (!q2(t2)) {
      throw "JWS Head is not safe JSON string: " + t2;
    }
    k = h2(t2);
  }
  o2 = z2;
  if (typeof z2 == "object") {
    o2 = u2.stringify(z2);
  }
  if ((j2 == "" || j2 == null) && k.alg !== void 0) {
    j2 = k.alg;
  }
  if (j2 != "" && j2 != null && k.alg === void 0) {
    k.alg = j2;
    t2 = u2.stringify(k);
  }
  if (j2 !== k.alg) {
    throw "alg and sHeader.alg doesn't match: " + j2 + "!=" + k.alg;
  }
  var s2 = null;
  if (r2.jwsalg2sigalg[j2] === void 0) {
    throw "unsupported alg name: " + j2;
  } else {
    s2 = r2.jwsalg2sigalg[j2];
  }
  var e2 = utf8tob64u(t2);
  var m2 = utf8tob64u(o2);
  var b2 = e2 + "." + m2;
  var y2 = "";
  if (s2.substr(0, 4) == "Hmac") {
    if (A2 === void 0) {
      throw "mac key shall be specified for HS* alg";
    }
    var i2 = new p2({ alg: s2, prov: "cryptojs", pass: A2 });
    i2.updateString(b2);
    y2 = i2.doFinal();
  } else {
    if (s2.indexOf("withECDSA") != -1) {
      var f2 = new c2({ alg: s2 });
      f2.init(A2, a2);
      f2.updateString(b2);
      var g2 = f2.sign();
      y2 = KJUR.crypto.ECDSA.asn1SigToConcatSig(g2);
    } else {
      if (s2 != "none") {
        var f2 = new c2({ alg: s2 });
        f2.init(A2, a2);
        f2.updateString(b2);
        y2 = f2.sign();
      }
    }
  }
  var v2 = hextob64u(y2);
  return b2 + "." + v2;
};
KJUR.jws.JWS.verify = function(w2, B2, n2) {
  var x = KJUR, q2 = x.jws, t2 = q2.JWS, i2 = t2.readSafeJSONString, e2 = x.crypto, p2 = e2.ECDSA, s2 = e2.Mac, d2 = e2.Signature, m2;
  if (typeof RSAKey !== void 0) {
    m2 = RSAKey;
  }
  if (!isBase64URLDot(w2)) {
    return false;
  }
  var y2 = w2.split(".");
  if (y2.length !== 3) {
    return false;
  }
  var f2 = y2[0];
  var r2 = y2[1];
  var c2 = f2 + "." + r2;
  var A2 = b64utohex(y2[2]);
  var l2 = i2(b64utoutf8(y2[0]));
  var k = null;
  var z2 = null;
  if (l2.alg === void 0) {
    throw "algorithm not specified in header";
  } else {
    k = l2.alg;
    z2 = k.substr(0, 2);
  }
  if (n2 != null && Object.prototype.toString.call(n2) === "[object Array]" && n2.length > 0) {
    var b2 = ":" + n2.join(":") + ":";
    if (b2.indexOf(":" + k + ":") == -1) {
      throw "algorithm '" + k + "' not accepted in the list";
    }
  }
  if (k != "none" && B2 === null) {
    throw "key shall be specified to verify.";
  }
  if (typeof B2 == "string" && B2.indexOf("-----BEGIN ") != -1) {
    B2 = KEYUTIL.getKey(B2);
  }
  if (z2 == "RS" || z2 == "PS") {
    if (!(B2 instanceof m2)) {
      throw "key shall be a RSAKey obj for RS* and PS* algs";
    }
  }
  if (z2 == "ES") {
    if (!(B2 instanceof p2)) {
      throw "key shall be a ECDSA obj for ES* algs";
    }
  }
  var u2 = null;
  if (t2.jwsalg2sigalg[l2.alg] === void 0) {
    throw "unsupported alg name: " + k;
  } else {
    u2 = t2.jwsalg2sigalg[k];
  }
  if (u2 == "none") {
    throw "not supported";
  } else {
    if (u2.substr(0, 4) == "Hmac") {
      var o2 = null;
      if (B2 === void 0) {
        throw "hexadecimal key shall be specified for HMAC";
      }
      var j2 = new s2({ alg: u2, pass: B2 });
      j2.updateString(c2);
      o2 = j2.doFinal();
      return A2 == o2;
    } else {
      if (u2.indexOf("withECDSA") != -1) {
        var h2 = null;
        try {
          h2 = p2.concatSigToASN1Sig(A2);
        } catch (v2) {
          return false;
        }
        var g2 = new d2({ alg: u2 });
        g2.init(B2);
        g2.updateString(c2);
        return g2.verify(h2);
      } else {
        var g2 = new d2({ alg: u2 });
        g2.init(B2);
        g2.updateString(c2);
        return g2.verify(A2);
      }
    }
  }
};
KJUR.jws.JWS.parse = function(g2) {
  var c2 = g2.split(".");
  var b2 = {};
  var f2, e2, d2;
  if (c2.length != 2 && c2.length != 3) {
    throw "malformed sJWS: wrong number of '.' splitted elements";
  }
  f2 = c2[0];
  e2 = c2[1];
  if (c2.length == 3) {
    d2 = c2[2];
  }
  b2.headerObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(f2));
  b2.payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(e2));
  b2.headerPP = JSON.stringify(b2.headerObj, null, "  ");
  if (b2.payloadObj == null) {
    b2.payloadPP = b64utoutf8(e2);
  } else {
    b2.payloadPP = JSON.stringify(b2.payloadObj, null, "  ");
  }
  if (d2 !== void 0) {
    b2.sigHex = b64utohex(d2);
  }
  return b2;
};
KJUR.jws.JWS.verifyJWT = function(e2, l2, r2) {
  var d2 = KJUR, j2 = d2.jws, o2 = j2.JWS, n2 = o2.readSafeJSONString, p2 = o2.inArray, f2 = o2.includedArray;
  if (!isBase64URLDot(e2)) {
    return false;
  }
  var k = e2.split(".");
  if (k.length != 3) {
    return false;
  }
  var c2 = k[0];
  var i2 = k[1];
  b64utohex(k[2]);
  var h2 = n2(b64utoutf8(c2));
  var g2 = n2(b64utoutf8(i2));
  if (h2.alg === void 0) {
    return false;
  }
  if (r2.alg === void 0) {
    throw "acceptField.alg shall be specified";
  }
  if (!p2(h2.alg, r2.alg)) {
    return false;
  }
  if (g2.iss !== void 0 && typeof r2.iss === "object") {
    if (!p2(g2.iss, r2.iss)) {
      return false;
    }
  }
  if (g2.sub !== void 0 && typeof r2.sub === "object") {
    if (!p2(g2.sub, r2.sub)) {
      return false;
    }
  }
  if (g2.aud !== void 0 && typeof r2.aud === "object") {
    if (typeof g2.aud == "string") {
      if (!p2(g2.aud, r2.aud)) {
        return false;
      }
    } else {
      if (typeof g2.aud == "object") {
        if (!f2(g2.aud, r2.aud)) {
          return false;
        }
      }
    }
  }
  var b2 = j2.IntDate.getNow();
  if (r2.verifyAt !== void 0 && typeof r2.verifyAt === "number") {
    b2 = r2.verifyAt;
  }
  if (r2.gracePeriod === void 0 || typeof r2.gracePeriod !== "number") {
    r2.gracePeriod = 0;
  }
  if (g2.exp !== void 0 && typeof g2.exp == "number") {
    if (g2.exp + r2.gracePeriod < b2) {
      return false;
    }
  }
  if (g2.nbf !== void 0 && typeof g2.nbf == "number") {
    if (b2 < g2.nbf - r2.gracePeriod) {
      return false;
    }
  }
  if (g2.iat !== void 0 && typeof g2.iat == "number") {
    if (b2 < g2.iat - r2.gracePeriod) {
      return false;
    }
  }
  if (g2.jti !== void 0 && r2.jti !== void 0) {
    if (g2.jti !== r2.jti) {
      return false;
    }
  }
  if (!o2.verify(e2, l2, r2.alg)) {
    return false;
  }
  return true;
};
KJUR.jws.JWS.includedArray = function(b2, a2) {
  var c2 = KJUR.jws.JWS.inArray;
  if (b2 === null) {
    return false;
  }
  if (typeof b2 !== "object") {
    return false;
  }
  if (typeof b2.length !== "number") {
    return false;
  }
  for (var d2 = 0; d2 < b2.length; d2++) {
    if (!c2(b2[d2], a2)) {
      return false;
    }
  }
  return true;
};
KJUR.jws.JWS.inArray = function(d2, b2) {
  if (b2 === null) {
    return false;
  }
  if (typeof b2 !== "object") {
    return false;
  }
  if (typeof b2.length !== "number") {
    return false;
  }
  for (var c2 = 0; c2 < b2.length; c2++) {
    if (b2[c2] == d2) {
      return true;
    }
  }
  return false;
};
KJUR.jws.JWS.jwsalg2sigalg = { HS256: "HmacSHA256", HS384: "HmacSHA384", HS512: "HmacSHA512", RS256: "SHA256withRSA", RS384: "SHA384withRSA", RS512: "SHA512withRSA", ES256: "SHA256withECDSA", ES384: "SHA384withECDSA", ES512: "SHA512withECDSA", PS256: "SHA256withRSAandMGF1", PS384: "SHA384withRSAandMGF1", PS512: "SHA512withRSAandMGF1", none: "none" };
KJUR.jws.JWS.isSafeJSONString = function(c2, b2, d2) {
  var e2 = null;
  try {
    e2 = jsonParse(c2);
    if (typeof e2 != "object") {
      return 0;
    }
    if (e2.constructor === Array) {
      return 0;
    }
    if (b2) {
      b2[d2] = e2;
    }
    return 1;
  } catch (a2) {
    return 0;
  }
};
KJUR.jws.JWS.readSafeJSONString = function(b2) {
  var c2 = null;
  try {
    c2 = jsonParse(b2);
    if (typeof c2 != "object") {
      return null;
    }
    if (c2.constructor === Array) {
      return null;
    }
    return c2;
  } catch (a2) {
    return null;
  }
};
KJUR.jws.JWS.getEncodedSignatureValueFromJWS = function(b2) {
  var a2 = b2.match(/^[^.]+\.[^.]+\.([^.]+)$/);
  if (a2 == null) {
    throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
  }
  return a2[1];
};
KJUR.jws.JWS.getJWKthumbprint = function(d2) {
  if (d2.kty !== "RSA" && d2.kty !== "EC" && d2.kty !== "oct") {
    throw "unsupported algorithm for JWK Thumprint";
  }
  var a2 = "{";
  if (d2.kty === "RSA") {
    if (typeof d2.n != "string" || typeof d2.e != "string") {
      throw "wrong n and e value for RSA key";
    }
    a2 += '"e":"' + d2.e + '",';
    a2 += '"kty":"' + d2.kty + '",';
    a2 += '"n":"' + d2.n + '"}';
  } else {
    if (d2.kty === "EC") {
      if (typeof d2.crv != "string" || typeof d2.x != "string" || typeof d2.y != "string") {
        throw "wrong crv, x and y value for EC key";
      }
      a2 += '"crv":"' + d2.crv + '",';
      a2 += '"kty":"' + d2.kty + '",';
      a2 += '"x":"' + d2.x + '",';
      a2 += '"y":"' + d2.y + '"}';
    } else {
      if (d2.kty === "oct") {
        if (typeof d2.k != "string") {
          throw "wrong k value for oct(symmetric) key";
        }
        a2 += '"kty":"' + d2.kty + '",';
        a2 += '"k":"' + d2.k + '"}';
      }
    }
  }
  var b2 = rstrtohex(a2);
  var c2 = KJUR.crypto.Util.hashHex(b2, "sha256");
  var e2 = hextob64u(c2);
  return e2;
};
KJUR.jws.IntDate = {};
KJUR.jws.IntDate.get = function(c2) {
  var b2 = KJUR.jws.IntDate, d2 = b2.getNow, a2 = b2.getZulu;
  if (c2 == "now") {
    return d2();
  } else {
    if (c2 == "now + 1hour") {
      return d2() + 60 * 60;
    } else {
      if (c2 == "now + 1day") {
        return d2() + 60 * 60 * 24;
      } else {
        if (c2 == "now + 1month") {
          return d2() + 60 * 60 * 24 * 30;
        } else {
          if (c2 == "now + 1year") {
            return d2() + 60 * 60 * 24 * 365;
          } else {
            if (c2.match(/Z$/)) {
              return a2(c2);
            } else {
              if (c2.match(/^[0-9]+$/)) {
                return parseInt(c2);
              }
            }
          }
        }
      }
    }
  }
  throw "unsupported format: " + c2;
};
KJUR.jws.IntDate.getZulu = function(a2) {
  return zulutosec(a2);
};
KJUR.jws.IntDate.getNow = function() {
  var a2 = ~~(/* @__PURE__ */ new Date() / 1e3);
  return a2;
};
KJUR.jws.IntDate.intDate2UTCString = function(a2) {
  var b2 = new Date(a2 * 1e3);
  return b2.toUTCString();
};
KJUR.jws.IntDate.intDate2Zulu = function(e2) {
  var i2 = new Date(e2 * 1e3), h2 = ("0000" + i2.getUTCFullYear()).slice(-4), g2 = ("00" + (i2.getUTCMonth() + 1)).slice(-2), b2 = ("00" + i2.getUTCDate()).slice(-2), a2 = ("00" + i2.getUTCHours()).slice(-2), c2 = ("00" + i2.getUTCMinutes()).slice(-2), f2 = ("00" + i2.getUTCSeconds()).slice(-2);
  return h2 + g2 + b2 + a2 + c2 + f2 + "Z";
};
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.jws == "undefined" || !KJUR.jws) {
  KJUR.jws = {};
}
KJUR.jws.JWSJS = function() {
  var c2 = KJUR, b2 = c2.jws, a2 = b2.JWS, d2 = a2.readSafeJSONString;
  this.aHeader = [];
  this.sPayload = "";
  this.aSignature = [];
  this.init = function() {
    this.aHeader = [];
    this.sPayload = void 0;
    this.aSignature = [];
  };
  this.initWithJWS = function(f2) {
    this.init();
    var e2 = f2.split(".");
    if (e2.length != 3) {
      throw "malformed input JWS";
    }
    this.aHeader.push(e2[0]);
    this.sPayload = e2[1];
    this.aSignature.push(e2[2]);
  };
  this.addSignature = function(e2, h2, m2, k) {
    if (this.sPayload === void 0 || this.sPayload === null) {
      throw "there's no JSON-JS signature to add.";
    }
    var l2 = this.aHeader.length;
    if (this.aHeader.length != this.aSignature.length) {
      throw "aHeader.length != aSignature.length";
    }
    try {
      var f2 = KJUR.jws.JWS.sign(e2, h2, this.sPayload, m2, k);
      var j2 = f2.split(".");
      var n2 = j2[0];
      var g2 = j2[2];
      this.aHeader.push(j2[0]);
      this.aSignature.push(j2[2]);
    } catch (i2) {
      if (this.aHeader.length > l2) {
        this.aHeader.pop();
      }
      if (this.aSignature.length > l2) {
        this.aSignature.pop();
      }
      throw "addSignature failed: " + i2;
    }
  };
  this.verifyAll = function(h2) {
    if (this.aHeader.length !== h2.length || this.aSignature.length !== h2.length) {
      return false;
    }
    for (var g2 = 0; g2 < h2.length; g2++) {
      var f2 = h2[g2];
      if (f2.length !== 2) {
        return false;
      }
      var e2 = this.verifyNth(g2, f2[0], f2[1]);
      if (e2 === false) {
        return false;
      }
    }
    return true;
  };
  this.verifyNth = function(f2, j2, g2) {
    if (this.aHeader.length <= f2 || this.aSignature.length <= f2) {
      return false;
    }
    var h2 = this.aHeader[f2];
    var k = this.aSignature[f2];
    var l2 = h2 + "." + this.sPayload + "." + k;
    var e2 = false;
    try {
      e2 = a2.verify(l2, j2, g2);
    } catch (i2) {
      return false;
    }
    return e2;
  };
  this.readJWSJS = function(g2) {
    if (typeof g2 === "string") {
      var f2 = d2(g2);
      if (f2 == null) {
        throw "argument is not safe JSON object string";
      }
      this.aHeader = f2.headers;
      this.sPayload = f2.payload;
      this.aSignature = f2.signatures;
    } else {
      try {
        if (g2.headers.length > 0) {
          this.aHeader = g2.headers;
        } else {
          throw "malformed header";
        }
        if (typeof g2.payload === "string") {
          this.sPayload = g2.payload;
        } else {
          throw "malformed signatures";
        }
        if (g2.signatures.length > 0) {
          this.aSignature = g2.signatures;
        } else {
          throw "malformed signatures";
        }
      } catch (e2) {
        throw "malformed JWS-JS JSON object: " + e2;
      }
    }
  };
  this.getJSON = function() {
    return { headers: this.aHeader, payload: this.sPayload, signatures: this.aSignature };
  };
  this.isEmpty = function() {
    if (this.aHeader.length == 0) {
      return 1;
    }
    return 0;
  };
};
KJUR.crypto.ECDSA;
KJUR.crypto.DSA;
KJUR.crypto.Signature;
KJUR.crypto.MessageDigest;
KJUR.crypto.Mac;
KJUR.crypto;
KJUR.asn1;
KJUR.jws;
KJUR.lang;
const pages = [
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "登录"
    }
  },
  {
    path: "pages/home/home",
    style: {
      navigationBarTitleText: "首页"
    }
  },
  {
    path: "pages/user/user",
    style: {
      navigationBarTitleText: "个人中心"
    }
  },
  {
    path: "pages/orders/orders",
    style: {
      navigationBarTitleText: "我的订单"
    }
  }
];
const subPackages = [
  {
    root: "pageB",
    pages: [
      {
        path: "addOrders/addOrders",
        style: {
          navigationBarTitleText: "新增订单"
        }
      },
      {
        path: "Registration/Registration",
        style: {
          navigationBarTitleText: "注册中心"
        }
      },
      {
        path: "changeUser/changeUser",
        style: {
          navigationBarTitleText: "个人中心"
        }
      }
    ]
  }
];
const tabBar = {
  list: [
    {
      pagePath: "pages/home/home",
      iconPath: "/static/nav1.png",
      selectedIconPath: "/static/nav1_on.png",
      text: "首页"
    },
    {
      pagePath: "pages/orders/orders",
      text: "我的订单",
      iconPath: "/static/nav2.png",
      selectedIconPath: "/static/nav2_on.png"
    },
    {
      pagePath: "pages/user/user",
      text: "个人中心",
      iconPath: "/static/nav3.png",
      selectedIconPath: "/static/nav3_on.png"
    }
  ]
};
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "登录",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8"
};
const uniIdRouter = {};
const lazyCodeLoading = "requiredComponents";
const e = {
  pages,
  subPackages,
  tabBar,
  globalStyle,
  uniIdRouter,
  lazyCodeLoading
};
var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
function t(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function n(e2, t2, n2) {
  return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(null == t3 && n2.path);
  } }, n2.exports), n2.exports;
}
var s = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || /* @__PURE__ */ function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c2).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var i3 = 0; i3 < r3; i3++) {
          var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
          t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
        }
      else
        for (i3 = 0; i3 < r3; i3 += 4)
          t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s3 = [], r3 = function(t5) {
        t5 = t5;
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, i3 = 0; i3 < t4; i3 += 4) {
        var a3 = r3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new o2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new o2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(i3));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new o2.init(n4, t4);
    } }, h2 = a2.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u2.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u2.parse(unescape(encodeURIComponent(e4)));
    } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
      this._data = new o2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
      if (c3) {
        for (var h3 = 0; h3 < c3; h3 += i3)
          this._doProcessBlock(s3, h3);
        var l3 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new o2.init(l3, u3);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      l2.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d2.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d2 = s2.algo = {};
    return s2;
  }(Math), n2);
}), r = s, i = (n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c2 = o2.MD5 = i2.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, r3 = e4[s3];
        e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], A2 = e4[t4 + 14], C2 = e4[t4 + 15], P2 = i3[0], T2 = i3[1], x2 = i3[2], O2 = i3[3];
      P2 = u2(P2, T2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, P2, T2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, P2, T2, p2, 17, a2[2]), T2 = u2(T2, x2, O2, P2, f2, 22, a2[3]), P2 = u2(P2, T2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, P2, T2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, P2, T2, y2, 17, a2[6]), T2 = u2(T2, x2, O2, P2, _2, 22, a2[7]), P2 = u2(P2, T2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, P2, T2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, P2, T2, I2, 17, a2[10]), T2 = u2(T2, x2, O2, P2, S2, 22, a2[11]), P2 = u2(P2, T2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, P2, T2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, P2, T2, A2, 17, a2[14]), P2 = h2(P2, T2 = u2(T2, x2, O2, P2, C2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = h2(O2, P2, T2, x2, y2, 9, a2[17]), x2 = h2(x2, O2, P2, T2, S2, 14, a2[18]), T2 = h2(T2, x2, O2, P2, o3, 20, a2[19]), P2 = h2(P2, T2, x2, O2, m2, 5, a2[20]), O2 = h2(O2, P2, T2, x2, I2, 9, a2[21]), x2 = h2(x2, O2, P2, T2, C2, 14, a2[22]), T2 = h2(T2, x2, O2, P2, g2, 20, a2[23]), P2 = h2(P2, T2, x2, O2, v2, 5, a2[24]), O2 = h2(O2, P2, T2, x2, A2, 9, a2[25]), x2 = h2(x2, O2, P2, T2, f2, 14, a2[26]), T2 = h2(T2, x2, O2, P2, w2, 20, a2[27]), P2 = h2(P2, T2, x2, O2, k2, 5, a2[28]), O2 = h2(O2, P2, T2, x2, p2, 9, a2[29]), x2 = h2(x2, O2, P2, T2, _2, 14, a2[30]), P2 = l2(P2, T2 = h2(T2, x2, O2, P2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = l2(O2, P2, T2, x2, w2, 11, a2[33]), x2 = l2(x2, O2, P2, T2, S2, 16, a2[34]), T2 = l2(T2, x2, O2, P2, A2, 23, a2[35]), P2 = l2(P2, T2, x2, O2, c3, 4, a2[36]), O2 = l2(O2, P2, T2, x2, g2, 11, a2[37]), x2 = l2(x2, O2, P2, T2, _2, 16, a2[38]), T2 = l2(T2, x2, O2, P2, I2, 23, a2[39]), P2 = l2(P2, T2, x2, O2, k2, 4, a2[40]), O2 = l2(O2, P2, T2, x2, o3, 11, a2[41]), x2 = l2(x2, O2, P2, T2, f2, 16, a2[42]), T2 = l2(T2, x2, O2, P2, y2, 23, a2[43]), P2 = l2(P2, T2, x2, O2, v2, 4, a2[44]), O2 = l2(O2, P2, T2, x2, b2, 11, a2[45]), x2 = l2(x2, O2, P2, T2, C2, 16, a2[46]), P2 = d2(P2, T2 = l2(T2, x2, O2, P2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, P2, T2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, P2, T2, A2, 15, a2[50]), T2 = d2(T2, x2, O2, P2, m2, 21, a2[51]), P2 = d2(P2, T2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, P2, T2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, P2, T2, I2, 15, a2[54]), T2 = d2(T2, x2, O2, P2, c3, 21, a2[55]), P2 = d2(P2, T2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, P2, T2, x2, C2, 10, a2[57]), x2 = d2(x2, O2, P2, T2, y2, 15, a2[58]), T2 = d2(T2, x2, O2, P2, k2, 21, a2[59]), P2 = d2(P2, T2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, P2, T2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, P2, T2, p2, 15, a2[62]), T2 = d2(T2, x2, O2, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + T2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var i3 = e3.floor(s3 / 4294967296), o3 = s3;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var h3 = c3[u3];
        c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function h2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function l2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function d2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, void function() {
    var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
    e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
      e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
      var n3 = e4.blockSize, r2 = 4 * n3;
      t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
      for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
        a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
      i2.sigBytes = o2.sigBytes = r2, this.reset();
    }, reset: function() {
      var e4 = this._hasher;
      e4.reset(), e4.update(this._iKey);
    }, update: function(e4) {
      return this._hasher.update(e4), this;
    }, finalize: function(e4) {
      var t4 = this._hasher, n3 = t4.finalize(e4);
      return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
    } });
  }());
}), n(function(e2, t2) {
  e2.exports = r.HmacMD5;
})), o = n(function(e2, t2) {
  e2.exports = r.enc.Utf8;
}), a = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function() {
    var e3 = n2, t3 = e3.lib.WordArray;
    function s2(e4, n3, s3) {
      for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
        if (o2 % 4) {
          var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
          r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
        }
      return t3.create(r2, i2);
    }
    e3.enc.Base64 = { stringify: function(e4) {
      var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
      e4.clamp();
      for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
        for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
          r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
      var c2 = s3.charAt(64);
      if (c2)
        for (; r2.length % 4; )
          r2.push(c2);
      return r2.join("");
    }, parse: function(e4) {
      var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
      if (!r2) {
        r2 = this._reverseMap = [];
        for (var i2 = 0; i2 < n3.length; i2++)
          r2[n3.charCodeAt(i2)] = i2;
      }
      var o2 = n3.charAt(64);
      if (o2) {
        var a2 = e4.indexOf(o2);
        -1 !== a2 && (t4 = a2);
      }
      return s2(e4, t4, r2);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
  }(), n2.enc.Base64);
});
const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
function f(e2) {
  return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
}
function g(e2) {
  return "object" === f(e2);
}
function m(e2) {
  return "function" == typeof e2;
}
function y(e2) {
  return function() {
    try {
      return e2.apply(e2, arguments);
    } catch (e3) {
      console.error(e3);
    }
  };
}
const _ = "REJECTED", w = "NOT_PENDING";
class v {
  constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
    this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
  }
  get needRetry() {
    if (!this.status)
      return true;
    switch (this.retryRule) {
      case _:
        return this.status === p;
      case w:
        return this.status !== l;
    }
  }
  exec() {
    return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
  }
}
function I(e2) {
  return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
}
const S = true, b = "mp-weixin", A = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), C = b, P = I(""), T = I("[]") || [];
let O = "";
try {
  O = "__UNI__051B1C3";
} catch (e2) {
}
let E = {};
function L(e2, t2 = {}) {
  var n2, s2;
  return n2 = E, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (E[e2] = t2), E[e2];
}
const R = ["invoke", "success", "fail", "complete"], U = L("_globalUniCloudInterceptor");
function N(e2, t2) {
  U[e2] || (U[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
    R.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s2 = U[e3][t3];
      s2 || (s2 = U[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
    }(e2, n2, t2[n2]);
  });
}
function D(e2, t2) {
  U[e2] || (U[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
    R.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s2 = U[e3][t3];
      if (!s2)
        return;
      const r2 = s2.indexOf(n3);
      r2 > -1 && s2.splice(r2, 1);
    }(e2, n2, t2[n2]);
  }) : delete U[e2];
}
function M(e2, t2) {
  return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function q(e2, t2) {
  return U[e2] && U[e2][t2] || [];
}
function F(e2) {
  N("callObject", e2);
}
const K = L("_globalUniCloudListener"), j = "response", $ = "needLogin", B = "refreshToken", W = "clientdb", H = "cloudfunction", z = "cloudobject";
function J(e2) {
  return K[e2] || (K[e2] = []), K[e2];
}
function V(e2, t2) {
  const n2 = J(e2);
  n2.includes(t2) || n2.push(t2);
}
function G(e2, t2) {
  const n2 = J(e2), s2 = n2.indexOf(t2);
  -1 !== s2 && n2.splice(s2, 1);
}
function Y(e2, t2) {
  const n2 = J(e2);
  for (let e3 = 0; e3 < n2.length; e3++) {
    (0, n2[e3])(t2);
  }
}
let Q, X = false;
function Z() {
  return Q || (Q = new Promise((e2) => {
    X && e2(), function t2() {
      if ("function" == typeof getCurrentPages) {
        const t3 = getCurrentPages();
        t3 && t3[0] && (X = true, e2());
      }
      X || setTimeout(() => {
        t2();
      }, 30);
    }();
  }), Q);
}
function ee(e2) {
  const t2 = {};
  for (const n2 in e2) {
    const s2 = e2[n2];
    m(s2) && (t2[n2] = y(s2));
  }
  return t2;
}
class te extends Error {
  constructor(e2) {
    super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
  }
  toJson(e2 = 0) {
    if (!(e2 >= 10))
      return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
  }
}
var ne = { request: (e2) => index.request(e2), uploadFile: (e2) => index.uploadFile(e2), setStorageSync: (e2, t2) => index.setStorageSync(e2, t2), getStorageSync: (e2) => index.getStorageSync(e2), removeStorageSync: (e2) => index.removeStorageSync(e2), clearStorageSync: () => index.clearStorageSync(), connectSocket: (e2) => index.connectSocket(e2) };
function se(e2) {
  return e2 && se(e2.__v_raw) || e2;
}
function re() {
  return { token: ne.getStorageSync("uni_id_token") || ne.getStorageSync("uniIdToken"), tokenExpired: ne.getStorageSync("uni_id_token_expired") };
}
function ie({ token: e2, tokenExpired: t2 } = {}) {
  e2 && ne.setStorageSync("uni_id_token", e2), t2 && ne.setStorageSync("uni_id_token_expired", t2);
}
let oe, ae;
function ce() {
  return oe || (oe = index.getSystemInfoSync()), oe;
}
function ue() {
  let e2, t2;
  try {
    if (index.getLaunchOptionsSync) {
      if (index.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
        return;
      const { scene: n2, channel: s2 } = index.getLaunchOptionsSync();
      e2 = s2, t2 = n2;
    }
  } catch (e3) {
  }
  return { channel: e2, scene: t2 };
}
let he = {};
function le() {
  const e2 = index.getLocale && index.getLocale() || "en";
  if (ae)
    return { ...he, ...ae, locale: e2, LOCALE: e2 };
  const t2 = ce(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
  for (const e3 in t2)
    Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
  return ae = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...ue(), ...t2 }, { ...he, ...ae, locale: e2, LOCALE: e2 };
}
var de = { sign: function(e2, t2) {
  let n2 = "";
  return Object.keys(e2).sort().forEach(function(t3) {
    e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
  }), n2 = n2.slice(1), i(n2, t2).toString();
}, wrappedRequest: function(e2, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e2, { complete(e3) {
      e3 || (e3 = {});
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400) {
        const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
        return s2(new te({ code: n3, message: r3, requestId: t3 }));
      }
      const r2 = e3.data;
      if (r2.error)
        return s2(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
}, toBase64: function(e2) {
  return a.stringify(o.parse(e2));
} };
var pe = class {
  constructor(e2) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
      if (!e3.result || !e3.result.accessToken)
        throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
      this.setAccessToken(e3.result.accessToken);
    }), retryRule: w });
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e2) {
    this.accessToken = e2;
  }
  requestWrapped(e2) {
    return de.wrappedRequest(e2, this.adapter.request);
  }
  requestAuth(e2) {
    return this.requestWrapped(e2);
  }
  request(e2, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
      !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e2);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e2);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e2) {
    const t2 = Object.assign({}, e2);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = de.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    return this._getAccessTokenPromiseHub.exec();
  }
  async authorize() {
    await this.getAccessToken();
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request(this.setupRequest(t2));
  }
  getOSSUploadOptionsFromPath(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
    if ("string" !== f(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const o2 = i2 && i2.envType || this.config.envType;
    if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
      throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
    const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
    if (u2 && (_2["x-oss-security-token"] = u2), y2) {
      const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
      _2.callback = de.toBase64(e3);
    }
    const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
    if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
      return { success: true, filePath: e2, fileID: c2 };
    if ((await this.reportOSSUpload({ id: g2 })).success)
      return { success: true, filePath: e2, fileID: c2 };
    throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
  }
  getTempFileURL({ fileList: e2 } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e2) && 0 !== e2.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
  async getFileInfo({ fileList: e2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
    return { fileList: (await this.request(this.setupRequest(t2))).result };
  }
};
var fe = { init(e2) {
  const t2 = new pe(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const ge = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var me;
!function(e2) {
  e2.local = "local", e2.none = "none", e2.session = "session";
}(me || (me = {}));
var ye = function() {
}, _e = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
    !function() {
      function t4(t5) {
        for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
          if (!(t5 % s4))
            return false;
        return true;
      }
      function n3(e4) {
        return 4294967296 * (e4 - (0 | e4)) | 0;
      }
      for (var s3 = 2, r3 = 0; r3 < 64; )
        t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
    }();
    var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
      this._hash = new r2.init(a2.slice(0));
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
        if (p2 < 16)
          u2[p2] = 0 | e4[t4 + p2];
        else {
          var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
          u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
        }
        var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
        d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
      }
      n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
  }(Math), n2.SHA256);
}), we = _e, ve = n(function(e2, t2) {
  e2.exports = r.HmacSHA256;
});
const Ie = () => {
  let e2;
  if (!Promise) {
    e2 = () => {
    }, e2.promise = {};
    const t3 = () => {
      throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
    };
    return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
  }
  const t2 = new Promise((t3, n2) => {
    e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
  });
  return e2.promise = t2, e2;
};
function Se(e2) {
  return void 0 === e2;
}
function be(e2) {
  return "[object Null]" === Object.prototype.toString.call(e2);
}
var ke;
function Ae(e2) {
  const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
  var n2;
  for (const e3 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e2) {
  e2.WEB = "web", e2.WX_MP = "wx_mp";
}(ke || (ke = {}));
const Ce = { adapter: null, runtime: void 0 }, Pe = ["anonymousUuidKey"];
class Te extends ye {
  constructor() {
    super(), Ce.adapter.root.tcbObject || (Ce.adapter.root.tcbObject = {});
  }
  setItem(e2, t2) {
    Ce.adapter.root.tcbObject[e2] = t2;
  }
  getItem(e2) {
    return Ce.adapter.root.tcbObject[e2];
  }
  removeItem(e2) {
    delete Ce.adapter.root.tcbObject[e2];
  }
  clear() {
    delete Ce.adapter.root.tcbObject;
  }
}
function xe(e2, t2) {
  switch (e2) {
    case "local":
      return t2.localStorage || new Te();
    case "none":
      return new Te();
    default:
      return t2.sessionStorage || new Te();
  }
}
class Oe {
  constructor(e2) {
    if (!this._storage) {
      this._persistence = Ce.adapter.primaryStorage || e2.persistence, this._storage = xe(this._persistence, Ce.adapter);
      const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = `user_info_${e2.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
    }
  }
  updatePersistence(e2) {
    if (e2 === this._persistence)
      return;
    const t2 = "local" === this._persistence;
    this._persistence = e2;
    const n2 = xe(e2, Ce.adapter);
    for (const e3 in this.keys) {
      const s2 = this.keys[e3];
      if (t2 && Pe.includes(e3))
        continue;
      const r2 = this._storage.getItem(s2);
      Se(r2) || be(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e2, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e2, r2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e2, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e2);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e2) {
    this._storage.removeItem(e2);
  }
}
const Ee = {}, Le = {};
function Re(e2) {
  return Ee[e2];
}
class Ue {
  constructor(e2, t2) {
    this.data = t2 || null, this.name = e2;
  }
}
class Ne extends Ue {
  constructor(e2, t2) {
    super("error", { error: e2, data: t2 }), this.error = e2;
  }
}
const De = new class {
  constructor() {
    this._listeners = {};
  }
  on(e2, t2) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e2, t2, this._listeners), this;
  }
  off(e2, t2) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s2 = n2[e3].indexOf(t3);
        -1 !== s2 && n2[e3].splice(s2, 1);
      }
    }(e2, t2, this._listeners), this;
  }
  fire(e2, t2) {
    if (e2 instanceof Ne)
      return console.error(e2.error), this;
    const n2 = "string" == typeof e2 ? new Ue(e2, t2 || {}) : e2;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e2) {
    return this._listeners[e2] && this._listeners[e2].length > 0;
  }
}();
function Me(e2, t2) {
  De.on(e2, t2);
}
function qe(e2, t2 = {}) {
  De.fire(e2, t2);
}
function Fe(e2, t2) {
  De.off(e2, t2);
}
const Ke = "loginStateChanged", je = "loginStateExpire", $e = "loginTypeChanged", Be = "anonymousConverted", We = "refreshAccessToken";
var He;
!function(e2) {
  e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
}(He || (He = {}));
const ze = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Je = { "X-SDK-Version": "1.3.5" };
function Ve(e2, t2, n2) {
  const s2 = e2[t2];
  e2[t2] = function(t3) {
    const r2 = {}, i2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: o3 } = n3.call(e2, t3);
      Object.assign(r2, s3), Object.assign(i2, o3);
    });
    const o2 = t3.data;
    return o2 && (() => {
      var e3;
      if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
        t3.data = { ...o2, ...r2 };
      else
        for (const e4 in r2)
          o2.append(e4, r2[e4]);
    })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
  };
}
function Ge() {
  const e2 = Math.random().toString(16).slice(2);
  return { data: { seqId: e2 }, headers: { ...Je, "x-seqid": e2 } };
}
class Ye {
  constructor(e2 = {}) {
    var t2;
    this.config = e2, this._reqClass = new Ce.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Re(this.config.env), this._localCache = (t2 = this.config.env, Le[t2]), Ve(this._reqClass, "post", [Ge]), Ve(this._reqClass, "upload", [Ge]), Ve(this._reqClass, "download", [Ge]);
  }
  async post(e2) {
    return await this._reqClass.post(e2);
  }
  async upload(e2) {
    return await this._reqClass.upload(e2);
  }
  async download(e2) {
    return await this._reqClass.download(e2);
  }
  async refreshAccessToken() {
    let e2, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e2 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t2 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e2;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e2), this._cache.removeStore(t2);
    let i2 = this._cache.getStore(n2);
    if (!i2)
      throw new te({ message: "未登录CloudBase" });
    const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
    if (a2.data.code) {
      const { code: e3 } = a2.data;
      if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
        if (this._cache.getStore(s2) === He.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
          const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        qe(je), this._cache.removeStore(n2);
      }
      throw new te({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
    }
    if (a2.data.access_token)
      return qe(We), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new te({ message: "refresh token不存在，登录状态异常" });
    let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
  }
  async request(e2, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
    if (-1 === ze.indexOf(e2)) {
      const { refreshTokenKey: e3 } = this._cache.keys;
      this._cache.getStore(e3) && (i2.access_token = (await this.getAccessToken()).accessToken);
    }
    let o2;
    if ("storage.uploadFile" === e2) {
      o2 = new FormData();
      for (let e3 in o2)
        o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", o2 = {};
      for (let e3 in i2)
        void 0 !== i2[e3] && (o2[e3] = i2[e3]);
    }
    let a2 = { headers: { "content-type": r2 } };
    n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: h2, search: l2 } = t2;
    let d2 = { env: this.config.env };
    u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
    let p2 = function(e3, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let r3 = "";
      for (let e4 in n3)
        "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
    }(ge, "//tcb-api.tencentcloudapi.com/web", d2);
    l2 && (p2 += l2);
    const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
    if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
      throw new te({ code: "NETWORK_ERROR", message: "network request error" });
    return f2;
  }
  async send(e2, t2 = {}) {
    const n2 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
    if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === ze.indexOf(e2)) {
      await this.refreshAccessToken();
      const n3 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
      if (n3.data.code)
        throw new te({ code: n3.data.code, message: n3.data.message });
      return n3.data;
    }
    if (n2.data.code)
      throw new te({ code: n2.data.code, message: n2.data.message });
    return n2.data;
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
}
const Qe = {};
function Xe(e2) {
  return Qe[e2];
}
class Ze {
  constructor(e2) {
    this.config = e2, this._cache = Re(e2.env), this._request = Xe(e2.env);
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
  setAccessToken(e2, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2);
  }
}
class et {
  constructor(e2) {
    if (!e2)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._envId = e2, this._cache = Re(this._envId), this._request = Xe(this._envId), this.setUserInfo();
  }
  linkWithTicket(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
    return this._request.send("auth.linkWithTicket", { ticket: e2 });
  }
  linkWithRedirect(e2) {
    e2.signInWithRedirect();
  }
  updatePassword(e2, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
  }
  updateEmail(e2) {
    return this._request.send("auth.updateEmail", { newEmail: e2 });
  }
  updateUsername(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    return this._request.send("auth.updateUsername", { username: e2 });
  }
  async getLinkedUidList() {
    const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e2;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e2) {
    return this._request.send("auth.setPrimaryUid", { uid: e2 });
  }
  unlink(e2) {
    return this._request.send("auth.unlink", { platform: e2 });
  }
  async update(e2) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setUserInfo() {
    const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t2[e3];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2), this.setUserInfo();
  }
}
class tt {
  constructor(e2) {
    if (!e2)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._cache = Re(e2);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
    this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new et(e2);
  }
  get isAnonymousAuth() {
    return this.loginType === He.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === He.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === He.WECHAT || this.loginType === He.WECHAT_OPEN || this.loginType === He.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class nt extends Ze {
  async signIn() {
    this._cache.updatePersistence("local");
    const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
    if (r2.uuid && r2.refresh_token) {
      this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), qe(Ke), qe($e, { env: this.config.env, loginType: He.ANONYMOUS, persistence: "local" });
      const e3 = new tt(this.config.env);
      return await e3.user.refresh(), e3;
    }
    throw new te({ message: "匿名登录失败" });
  }
  async linkAndRetrieveDataWithTicket(e2) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
    if (i2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), qe(Be, { env: this.config.env }), qe($e, { loginType: He.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
    throw new te({ message: "匿名转化失败" });
  }
  _setAnonymousUUID(e2) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, He.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class st extends Ze {
  async signIn(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), qe(Ke), qe($e, { env: this.config.env, loginType: He.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new tt(this.config.env);
    throw new te({ message: "自定义登录失败" });
  }
}
class rt extends Ze {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), qe(Ke), qe($e, { env: this.config.env, loginType: He.EMAIL, persistence: this.config.persistence }), new tt(this.config.env);
    throw s2.code ? new te({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new te({ message: "邮箱登录失败" });
  }
  async activate(e2) {
    return this._request.send("auth.activateEndUserMail", { token: e2 });
  }
  async resetPasswordWithToken(e2, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
  }
}
class it extends Ze {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: He.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), qe(Ke), qe($e, { env: this.config.env, loginType: He.USERNAME, persistence: this.config.persistence }), new tt(this.config.env);
    throw s2.code ? new te({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new te({ message: "用户名密码登录失败" });
  }
}
class ot {
  constructor(e2) {
    this.config = e2, this._cache = Re(e2.env), this._request = Xe(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Me($e, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e2 = this.hasLoginState();
    return e2 && e2.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new nt(this.config);
  }
  customAuthProvider() {
    return new st(this.config);
  }
  emailAuthProvider() {
    return new rt(this.config);
  }
  usernameAuthProvider() {
    return new it(this.config);
  }
  async signInAnonymously() {
    return new nt(this.config).signIn();
  }
  async signInWithEmailAndPassword(e2, t2) {
    return new rt(this.config).signIn(e2, t2);
  }
  signInWithUsernameAndPassword(e2, t2) {
    return new it(this.config).signIn(e2, t2);
  }
  async linkAndRetrieveDataWithTicket(e2) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new nt(this.config)), Me(Be, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
  }
  async signOut() {
    if (this.loginType === He.ANONYMOUS)
      throw new te({ message: "匿名用户不支持登出操作" });
    const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
    if (!s2)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), qe(Ke), qe($e, { env: this.config.env, loginType: He.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e2, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
  }
  async sendPasswordResetEmail(e2) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
  }
  onLoginStateChanged(e2) {
    Me(Ke, () => {
      const t3 = this.hasLoginState();
      e2.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e2.call(this, t2);
  }
  onLoginStateExpired(e2) {
    Me(je, e2.bind(this));
  }
  onAccessTokenRefreshed(e2) {
    Me(We, e2.bind(this));
  }
  onAnonymousConverted(e2) {
    Me(Be, e2.bind(this));
  }
  onLoginTypeChanged(e2) {
    Me($e, () => {
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { refreshTokenKey: e2 } = this._cache.keys;
    return this._cache.getStore(e2) ? new tt(this.config.env) : null;
  }
  async isUsernameRegistered(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e2) {
    return new st(this.config).signIn(e2);
  }
  shouldRefreshAccessToken(e2) {
    this._request._shouldRefreshAccessTokenHook = e2.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
  }
  getAuthHeader() {
    const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e2) {
    const { env: t2 } = e2.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e2) {
    const { loginType: t2, persistence: n2, env: s2 } = e2.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const at = function(e2, t2) {
  t2 = t2 || Ie();
  const n2 = Xe(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
      201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
    }).catch((e4) => {
      t2(e4);
    });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ct = function(e2, t2) {
  t2 = t2 || Ie();
  const n2 = Xe(this.config.env), { cloudPath: s2 } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    t2(null, e3);
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ut = function({ fileList: e2 }, t2) {
  if (t2 = t2 || Ie(), !e2 || !Array.isArray(e2))
    return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
  for (let t3 of e2)
    if (!t3 || "string" != typeof t3)
      return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
  const n2 = { fileid_list: e2 };
  return Xe(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ht = function({ fileList: e2 }, t2) {
  t2 = t2 || Ie(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
  let n2 = [];
  for (let s3 of e2)
    "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
  const s2 = { file_list: n2 };
  return Xe(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, lt = async function({ fileID: e2 }, t2) {
  const n2 = (await ht.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
  if ("SUCCESS" !== n2.code)
    return t2 ? t2(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s2 = Xe(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t2)
    return s2.download({ url: r2 });
  t2(await s2.download({ url: r2 }));
}, dt = function({ name: e2, data: t2, query: n2, parse: s2, search: r2 }, i2) {
  const o2 = i2 || Ie();
  let a2;
  try {
    a2 = t2 ? JSON.stringify(t2) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e2)
    return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
  const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: a2 };
  return Xe(this.config.env).send("functions.invokeFunction", c2).then((e3) => {
    if (e3.code)
      o2(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s2)
        o2(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), o2(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          o2(new te({ message: "response data must be json" }));
        }
    }
    return o2.promise;
  }).catch((e3) => {
    o2(e3);
  }), o2.promise;
}, pt = { timeout: 15e3, persistence: "session" }, ft = {};
class gt {
  constructor(e2) {
    this.config = e2 || this.config, this.authObj = void 0;
  }
  init(e2) {
    switch (Ce.adapter || (this.requestClient = new Ce.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...pt, ...e2 }, true) {
      case this.config.timeout > 6e5:
        console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
        break;
      case this.config.timeout < 100:
        console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
    }
    return new gt(this.config);
  }
  auth({ persistence: e2 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e2 || Ce.adapter.primaryStorage || pt.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
      const { env: t3 } = e3;
      Ee[t3] = new Oe(e3), Le[t3] = new Oe({ ...e3, persistence: "local" });
    }(this.config), n2 = this.config, Qe[n2.env] = new Ye(n2), this.authObj = new ot(this.config), this.authObj;
  }
  on(e2, t2) {
    return Me.apply(this, [e2, t2]);
  }
  off(e2, t2) {
    return Fe.apply(this, [e2, t2]);
  }
  callFunction(e2, t2) {
    return dt.apply(this, [e2, t2]);
  }
  deleteFile(e2, t2) {
    return ut.apply(this, [e2, t2]);
  }
  getTempFileURL(e2, t2) {
    return ht.apply(this, [e2, t2]);
  }
  downloadFile(e2, t2) {
    return lt.apply(this, [e2, t2]);
  }
  uploadFile(e2, t2) {
    return at.apply(this, [e2, t2]);
  }
  getUploadMetadata(e2, t2) {
    return ct.apply(this, [e2, t2]);
  }
  registerExtension(e2) {
    ft[e2.name] = e2;
  }
  async invokeExtension(e2, t2) {
    const n2 = ft[e2];
    if (!n2)
      throw new te({ message: `扩展${e2} 必须先注册` });
    return await n2.invoke(t2, this);
  }
  useAdapters(e2) {
    const { adapter: t2, runtime: n2 } = Ae(e2) || {};
    t2 && (Ce.adapter = t2), n2 && (Ce.runtime = n2);
  }
}
var mt = new gt();
function yt(e2, t2, n2) {
  void 0 === n2 && (n2 = {});
  var s2 = /\?/.test(t2), r2 = "";
  for (var i2 in n2)
    "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
  return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
}
class _t {
  post(e2) {
    const { url: t2, data: n2, headers: s2 } = e2;
    return new Promise((e3, r2) => {
      ne.request({ url: yt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
        e3(t3);
      }, fail(e4) {
        r2(e4);
      } });
    });
  }
  upload(e2) {
    return new Promise((t2, n2) => {
      const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = ne.uploadFile({ url: yt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
      }, fail(e3) {
        n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
        e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const wt = { setItem(e2, t2) {
  ne.setStorageSync(e2, t2);
}, getItem: (e2) => ne.getStorageSync(e2), removeItem(e2) {
  ne.removeStorageSync(e2);
}, clear() {
  ne.clearStorageSync();
} };
var vt = { genAdapter: function() {
  return { root: {}, reqClass: _t, localStorage: wt, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
mt.useAdapters(vt);
const It = mt, St = It.init;
It.init = function(e2) {
  e2.env = e2.spaceId;
  const t2 = St.call(this, e2);
  t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      var n3;
      t3[e4] = (n3 = t3[e4], function(e5) {
        e5 = e5 || {};
        const { success: t4, fail: s2, complete: r2 } = ee(e5);
        if (!(t4 || s2 || r2))
          return n3.call(this, e5);
        n3.call(this, e5).then((e6) => {
          t4 && t4(e6), r2 && r2(e6);
        }, (e6) => {
          s2 && s2(e6), r2 && r2(e6);
        });
      }).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var bt = It;
var kt = class extends pe {
  getAccessToken() {
    return new Promise((e2, t2) => {
      const n2 = "Anonymous_Access_token";
      this.setAccessToken(n2), e2(n2);
    });
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret);
    const r2 = le();
    s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
    const { token: i2 } = re();
    return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
    let r2;
    return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
      const { url: i2, formData: o2, name: a2 } = t3.result;
      r2 = t3.result.fileUrl;
      const c2 = { url: i2, formData: o2, name: a2, filePath: e2, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2)).then((e3) => {
      if (e3.success)
        return e3.result;
      throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
    });
  }
  getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
    return this.request(this.setupRequest(n2)).then((e3) => {
      if (e3.success)
        return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
      throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
    });
  }
};
var At = { init(e2) {
  const t2 = new kt(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} }, Ct = n(function(e2, t2) {
  e2.exports = r.enc.Hex;
});
function Pt() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
    var t2 = 16 * Math.random() | 0;
    return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
  });
}
function Tt(e2 = "", t2 = {}) {
  const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = Date.now(), u2 = Pt(), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
    const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = we(e3.body).toString(Ct), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = we(r3).toString(Ct), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = ve(o3, e3.secretKey).toString(Ct);
    return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
  }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
  return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
}
function xt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {} }) {
  return new Promise((r2, i2) => {
    ne.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", complete: (e3 = {}) => {
      const t3 = s2["x-trace-id"] || "";
      if (!e3.statusCode || e3.statusCode >= 400) {
        const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
        return i2(new te({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
      }
      r2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
    } });
  });
}
function Ot(e2, t2) {
  const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Tt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
  return xt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
    const t3 = e3.data || {};
    if (!t3.success)
      throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    return t3.data || {};
  }).catch((e3) => {
    throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
  });
}
function Et(e2 = "") {
  const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
  if (n2 <= 0)
    throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
  const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
  return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
}
function Lt(e2 = "") {
  return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
}
class Rt {
  constructor(e2) {
    this.config = e2;
  }
  signedURL(e2, t2 = {}) {
    const n2 = `/ws/function/${e2}`, s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Pt(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
      return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
    }).filter(Boolean).join("&"), `host:${s2}`].join("\n"), o2 = ["HMAC-SHA256", we(i2).toString(Ct)].join("\n"), a2 = ve(o2, this.config.secretKey).toString(Ct), c2 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
    return `${this.config.wsEndpoint}${n2}?${c2}&signature=${a2}`;
  }
}
var Ut = class {
  constructor(e2) {
    if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), e2.endpoint) {
      if ("string" != typeof e2.endpoint)
        throw new Error("endpoint must be string");
      if (!/^https:\/\//.test(e2.endpoint))
        throw new Error("endpoint must start with https://");
      e2.endpoint = e2.endpoint.replace(/\/$/, "");
    }
    this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e2.wsEndpoint || `wss://${e2.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new Rt(this.config);
  }
  callFunction(e2) {
    return function(e3, t2) {
      const { name: n2, data: s2, async: r2 = false } = e3, i2 = "POST", o2 = { "x-to-function-name": n2 };
      r2 && (o2["x-function-invoke-type"] = "async");
      const { url: a2, headers: c2 } = Tt("/functions/invokeFunction", { functionName: n2, data: s2, method: i2, headers: o2, signHeaderKeys: ["x-to-function-name"], config: t2 });
      return xt({ url: a2, data: s2, method: i2, headers: c2 }).then((e4) => {
        let t3 = 0;
        if (r2) {
          const n3 = e4.data || {};
          t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
        }
        if (0 !== t3)
          throw new te({ code: t3, message: e4.errMsg, requestId: e4.requestId });
        return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
      }).catch((e4) => {
        throw new te({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
      });
    }(e2, this.config);
  }
  uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
    return new Promise((i2, o2) => {
      const a2 = ne.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        o2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
        r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
    if ("string" !== f(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const r2 = await Ot({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
    return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
  }
  async getTempFileURL({ fileList: e2 }) {
    return new Promise((t2, n2) => {
      (!e2 || e2.length < 0) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList不能为空数组" })), e2.length > 50 && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList数组长度不能超过50" }));
      const s2 = [];
      for (const t3 of e2) {
        "string" !== f(t3) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList的元素必须是非空的字符串" }));
        const e3 = Et.call(this, t3);
        s2.push({ file_id: e3, expire: 600 });
      }
      Ot({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
        const { file_list: n3 = [] } = e3;
        t2({ fileList: n3.map((e4) => ({ fileID: Lt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
      }).catch((e3) => n2(e3));
    });
  }
  async connectWebSocket(e2) {
    const { name: t2, query: n2 } = e2;
    return ne.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
    } });
  }
};
var Nt = { init: (e2) => {
  e2.provider = "alipay";
  const t2 = new Ut(e2);
  return t2.auth = function() {
    return { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(true);
    } };
  }, t2;
} };
function Dt({ data: e2 }) {
  let t2;
  t2 = le();
  const n2 = JSON.parse(JSON.stringify(e2 || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e3 } = re();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
async function Mt({ name: e2, data: t2 } = {}) {
  await this.__dev__.initLocalNetwork();
  const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e2}`;
  return new Promise((t3, n3) => {
    ne.request({ method: "POST", url: o2, data: { name: e2, platform: C, provider: r2, spaceId: i2 }, timeout: 3e3, success(e3) {
      t3(e3);
    }, fail() {
      t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
    } });
  }).then(({ data: e3 } = {}) => {
    const { code: t3, message: n3 } = e3 || {};
    return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
  }).then(({ code: n3, message: s3 }) => {
    if (0 !== n3) {
      switch (n3) {
        case "MODULE_ENCRYPTED":
          console.error(`此云函数（${e2}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "FUNCTION_ENCRYPTED":
          console.error(`此云函数（${e2}）已加密不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "ACTION_ENCRYPTED":
          console.error(s3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
          break;
        case "NETWORK_ERROR":
          console.error(s3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
          break;
        case "SWITCH_TO_CLOUD":
          break;
        default: {
          const e3 = `检测本地调试服务出现错误：${s3}，请检查网络环境或重启客户端再试`;
          throw console.error(e3), new Error(e3);
        }
      }
      return this._callCloudFunction({ name: e2, data: t2 });
    }
    return new Promise((e3, n4) => {
      const s4 = Dt.call(this, { data: t2 });
      ne.request({ method: "POST", url: a2, data: { provider: r2, platform: C, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new te({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e3({ result: s5 }), fail(e4) {
        n4(new te({ code: e4.code || e4.errCode || "SYS_ERR", message: e4.message || e4.errMsg || "request:fail" }));
      } });
    });
  });
}
const qt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
var Ft = /[\\^$.*+?()[\]{}|]/g, Kt = RegExp(Ft.source);
function jt(e2, t2, n2) {
  return e2.replace(new RegExp((s2 = t2) && Kt.test(s2) ? s2.replace(Ft, "\\$&") : s2, "g"), n2);
  var s2;
}
const Bt = "request", Wt = "response", Ht = "both";
const Tn = { code: 2e4, message: "System error" }, xn = { code: 20101, message: "Invalid client" };
function Ln(e2) {
  const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
  return new te({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || Tn.code, message: r2 || o2, cause: a2 });
}
let Un;
function Fn({ secretType: e2 } = {}) {
  return e2 === Bt || e2 === Wt || e2 === Ht;
}
function Kn({ name: e2, data: t2 = {} } = {}) {
  return "app" === C;
}
function jn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
  const { appId: s2, uniPlatform: r2, osName: i2 } = ce();
  let o2 = r2;
  "app" === r2 && (o2 = i2);
  const a2 = function({ provider: e3, spaceId: t3 } = {}) {
    const n3 = A;
    if (!n3)
      return {};
    e3 = /* @__PURE__ */ function(e4) {
      return "tencent" === e4 ? "tcb" : e4;
    }(e3);
    const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
    return s3 && s3.config;
  }({ provider: e2, spaceId: t2 });
  if (!a2 || !a2.accessControl || !a2.accessControl.enable)
    return false;
  const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
  if (0 === u2.length)
    return true;
  const h2 = function(e3, t3) {
    let n3, s3, r3;
    for (let i3 = 0; i3 < e3.length; i3++) {
      const o3 = e3[i3];
      o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
    }
    return n3 || s3 || r3;
  }(u2, n2);
  if (!h2)
    return false;
  if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
    return true;
  throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), Ln(xn);
}
function $n({ functionName: e2, result: t2, logPvd: n2 }) {
  if (this.__dev__.debugLog && t2 && t2.requestId) {
    const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
    console.log(`[${n2}-request]${s2}[/${n2}-request]`);
  }
}
function Bn(e2) {
  const t2 = e2.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = Dt.call(e2, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay" }[this.config.provider], i2 = Fn(n3), o2 = Kn(n3), a2 = i2 || o2;
    return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && $n.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && $n.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
        if (!a3)
          continue;
        let c2 = i3;
        for (let e5 = 1; e5 < a3.length; e5++)
          c2 = jt(c2, `{$${e5}}`, a3[e5]);
        for (const e5 in t3)
          c2 = jt(c2, `{${e5}}`, t3[e5]);
        return "replace" === o3 ? c2 : e4 + c2;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: qt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
  };
  e2.callFunction = function(t3) {
    const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
    let o2, a2;
    if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && T ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Mt), o2 = Mt) : o2 = n2, o2 = o2.bind(e2), Kn(t3))
      ;
    else if (function({ name: e3, data: t4 = {} }) {
      return "uni-id-co" === e3 && "secureNetworkHandshakeByWeixin" === t4.method;
    }(t3))
      a2 = o2.call(e2, t3);
    else if (Fn(t3)) {
      a2 = new Un({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
    } else if (jn({ provider: s2, spaceId: r2, functionName: i2 })) {
      a2 = new Un({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
    } else
      a2 = o2(t3);
    return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && (e3.result = new UTSJSONObject(e3.result)), e3));
  };
}
Un = class {
  constructor() {
    throw Ln({ message: `Platform ${C} is not enabled, please check whether secure network module is enabled in your manifest.json` });
  }
};
const Wn = Symbol("CLIENT_DB_INTERNAL");
function Hn(e2, t2) {
  return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Wn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
    if ("_uniClient" === n2)
      return null;
    if ("symbol" == typeof n2)
      return e3[n2];
    if (n2 in e3 || "string" != typeof n2) {
      const t3 = e3[n2];
      return "function" == typeof t3 ? t3.bind(e3) : t3;
    }
    return t2.get(e3, n2, s2);
  } });
}
function zn(e2) {
  return { on: (t2, n2) => {
    e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
  }, off: (t2, n2) => {
    e2[t2] = e2[t2] || [];
    const s2 = e2[t2].indexOf(n2);
    -1 !== s2 && e2[t2].splice(s2, 1);
  } };
}
const Jn = ["db.Geo", "db.command", "command.aggregate"];
function Vn(e2, t2) {
  return Jn.indexOf(`${e2}.${t2}`) > -1;
}
function Gn(e2) {
  switch (f(e2 = se(e2))) {
    case "array":
      return e2.map((e3) => Gn(e3));
    case "object":
      return e2._internalType === Wn || Object.keys(e2).forEach((t2) => {
        e2[t2] = Gn(e2[t2]);
      }), e2;
    case "regexp":
      return { $regexp: { source: e2.source, flags: e2.flags } };
    case "date":
      return { $date: e2.toISOString() };
    default:
      return e2;
  }
}
function Yn(e2) {
  return e2 && e2.content && e2.content.$method;
}
class Qn {
  constructor(e2, t2, n2) {
    this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e2 = this;
    const t2 = [e2.content];
    for (; e2.prevStage; )
      e2 = e2.prevStage, t2.push(e2.content);
    return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: Gn(e3.$param) })) };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  getAction() {
    const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
    return e2 && e2.$param && e2.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
  }
  get isAggregate() {
    let e2 = this;
    for (; e2; ) {
      const t2 = Yn(e2), n2 = Yn(e2.prevStage);
      if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isCommand() {
    let e2 = this;
    for (; e2; ) {
      if ("command" === Yn(e2))
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isAggregateCommand() {
    let e2 = this;
    for (; e2; ) {
      const t2 = Yn(e2), n2 = Yn(e2.prevStage);
      if ("aggregate" === t2 && "command" === n2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  getNextStageFn(e2) {
    const t2 = this;
    return function() {
      return Xn({ $method: e2, $param: Gn(Array.from(arguments)) }, t2, t2._database);
    };
  }
  get count() {
    return this.isAggregate ? this.getNextStageFn("count") : function() {
      return this._send("count", Array.from(arguments));
    };
  }
  get remove() {
    return this.isCommand ? this.getNextStageFn("remove") : function() {
      return this._send("remove", Array.from(arguments));
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  get add() {
    return this.isCommand ? this.getNextStageFn("add") : function() {
      return this._send("add", Array.from(arguments));
    };
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  get set() {
    return this.isCommand ? this.getNextStageFn("set") : function() {
      throw new Error("JQL禁止使用set方法");
    };
  }
  _send(e2, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e2, $param: Gn(t2) }), S) {
      const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
      t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
    }
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function Xn(e2, t2, n2) {
  return Hn(new Qn(e2, t2, n2), { get(e3, t3) {
    let s2 = "db";
    return e3 && e3.content && (s2 = e3.content.$method), Vn(s2, t3) ? Xn({ $method: t3 }, e3, n2) : function() {
      return Xn({ $method: t3, $param: Gn(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function Zn({ path: e2, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
  };
}
function es(e2, t2 = {}) {
  return Hn(new e2(t2), { get: (e3, t3) => Vn("db", t3) ? Xn({ $method: t3 }, null, e3) : function() {
    return Xn({ $method: t3, $param: Gn(Array.from(arguments)) }, null, e3);
  } });
}
class ts extends class {
  constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
    this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = L("_globalUniCloudDatabaseCallback")), t2 || (this.auth = zn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, zn(this._dbCallBacks)), this.env = Hn({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = Hn({}, { get: (e3, t3) => Zn({ path: ["Geo"], method: t3 }) }), this.serverDate = Zn({ path: [], method: "serverDate" }), this.RegExp = Zn({ path: [], method: "RegExp" });
  }
  getCloudEnv(e2) {
    if ("string" != typeof e2 || !e2.trim())
      throw new Error("getCloudEnv参数错误");
    return { $env: e2.replace("$cloudEnv_", "") };
  }
  _callback(e2, t2) {
    const n2 = this._dbCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  _callbackAuth(e2, t2) {
    const n2 = this._authCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  multiSend() {
    const e2 = Array.from(arguments), t2 = e2.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
        throw new Error("multiSend只支持子命令内使用getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
  }
} {
  _parseResult(e2) {
    return this._isJQL ? e2.result : e2;
  }
  _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
    function r2(e3, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const r3 = s2[n3];
          r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
    function a2(e3) {
      return i2._callback("error", [e3]), M(q(o2, "fail"), e3).then(() => M(q(o2, "complete"), e3)).then(() => (r2(null, e3), Y(j, { type: W, content: e3 }), Promise.reject(e3)));
    }
    const c2 = M(q(o2, "invoke")), u2 = this._uniClient;
    return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
      if (u3)
        for (let e4 = 0; e4 < u3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console[t4] || console.log;
          let i3 = "[System Info]" + n4;
          s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
        }
      if (t3) {
        return a2(new te({ code: t3, message: n3, requestId: e3.requestId }));
      }
      e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ie({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(B, { token: s3, tokenExpired: c3 }));
      const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
      for (let t4 = 0; t4 < h2.length; t4++) {
        const { prop: n4, tips: s4 } = h2[t4];
        if (n4 in e3.result) {
          const t5 = e3.result[n4];
          Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
        }
      }
      return function(e4) {
        return M(q(o2, "success"), e4).then(() => M(q(o2, "complete"), e4)).then(() => {
          r2(e4, null);
          const t4 = i2._parseResult(e4);
          return Y(j, { type: W, content: t4 }), Promise.resolve(t4);
        });
      }(e3);
    }, (e3) => {
      /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
      return a2(new te({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
    });
  }
}
const ns = "token无效，跳转登录页面", ss = "token过期，跳转登录页面", rs = { TOKEN_INVALID_TOKEN_EXPIRED: ss, TOKEN_INVALID_INVALID_CLIENTID: ns, TOKEN_INVALID: ns, TOKEN_INVALID_WRONG_TOKEN: ns, TOKEN_INVALID_ANONYMOUS_USER: ns }, is = { "uni-id-token-expired": ss, "uni-id-check-token-failed": ns, "uni-id-token-not-exist": ns, "uni-id-check-device-feature-failed": ns };
function os(e2, t2) {
  let n2 = "";
  return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
}
function as(e2 = [], t2 = "") {
  const n2 = [], s2 = [];
  return e2.forEach((e3) => {
    true === e3.needLogin ? n2.push(os(t2, e3.path)) : false === e3.needLogin && s2.push(os(t2, e3.path));
  }), { needLoginPage: n2, notNeedLoginPage: s2 };
}
function cs(e2) {
  return e2.split("?")[0].replace(/^\//, "");
}
function us() {
  return function(e2) {
    let t2 = e2 && e2.$page && e2.$page.fullPath || "";
    return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
  }(function() {
    const e2 = getCurrentPages();
    return e2[e2.length - 1];
  }());
}
function hs() {
  return cs(us());
}
function ls(e2 = "", t2 = {}) {
  if (!e2)
    return false;
  if (!(t2 && t2.list && t2.list.length))
    return false;
  const n2 = t2.list, s2 = cs(e2);
  return n2.some((e3) => e3.pagePath === s2);
}
const ds = !!e.uniIdRouter;
const { loginPage: ps, routerNeedLogin: fs, resToLogin: gs, needLoginPage: ms, notNeedLoginPage: ys, loginPageInTabBar: _s } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
  const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = as(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
    const t3 = [], n3 = [];
    return e2.forEach((e3) => {
      const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = as(r3, s3);
      t3.push(...i3), n3.push(...o3);
    }), { needLoginPage: t3, notNeedLoginPage: n3 };
  }(n2);
  return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: ls(i2, r2) };
}();
if (ms.indexOf(ps) > -1)
  throw new Error(`Login page [${ps}] should not be "needLogin", please check your pages.json`);
function ws(e2) {
  const t2 = hs();
  if ("/" === e2.charAt(0))
    return e2;
  const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
  i2.pop();
  for (let e3 = 0; e3 < r2.length; e3++) {
    const t3 = r2[e3];
    ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
  }
  return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
}
function vs(e2) {
  const t2 = cs(ws(e2));
  return !(ys.indexOf(t2) > -1) && (ms.indexOf(t2) > -1 || fs.some((t3) => function(e3, t4) {
    return new RegExp(t4).test(e3);
  }(e2, t3)));
}
function Is({ redirect: e2 }) {
  const t2 = cs(e2), n2 = cs(ps);
  return hs() !== n2 && t2 !== n2;
}
function Ss({ api: e2, redirect: t2 } = {}) {
  if (!t2 || !Is({ redirect: t2 }))
    return;
  const n2 = function(e3, t3) {
    return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
  }(ps, t2);
  _s ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
  const s2 = { navigateTo: index.navigateTo, redirectTo: index.redirectTo, switchTab: index.switchTab, reLaunch: index.reLaunch };
  setTimeout(() => {
    s2[e2]({ url: n2 });
  }, 0);
}
function bs({ url: e2 } = {}) {
  const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
    const { token: e3, tokenExpired: t3 } = re();
    let n3;
    if (e3) {
      if (t3 < Date.now()) {
        const e4 = "uni-id-token-expired";
        n3 = { errCode: e4, errMsg: is[e4] };
      }
    } else {
      const e4 = "uni-id-check-token-failed";
      n3 = { errCode: e4, errMsg: is[e4] };
    }
    return n3;
  }();
  if (vs(e2) && n2) {
    n2.uniIdRedirectUrl = e2;
    if (J($).length > 0)
      return setTimeout(() => {
        Y($, n2);
      }, 0), t2.abortLoginPageJump = true, t2;
    t2.autoToLoginPage = true;
  }
  return t2;
}
function ks() {
  !function() {
    const e3 = us(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = bs({ url: e3 });
    t2 || n2 && Ss({ api: "redirectTo", redirect: e3 });
  }();
  const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  for (let t2 = 0; t2 < e2.length; t2++) {
    const n2 = e2[t2];
    index.addInterceptor(n2, { invoke(e3) {
      const { abortLoginPageJump: t3, autoToLoginPage: s2 } = bs({ url: e3.url });
      return t3 ? e3 : s2 ? (Ss({ api: n2, redirect: ws(e3.url) }), false) : e3;
    } });
  }
}
function As() {
  this.onResponse((e2) => {
    const { type: t2, content: n2 } = e2;
    let s2 = false;
    switch (t2) {
      case "cloudobject":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in is;
        }(n2);
        break;
      case "clientdb":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in rs;
        }(n2);
    }
    s2 && function(e3 = {}) {
      const t3 = J($);
      Z().then(() => {
        const n3 = us();
        if (n3 && Is({ redirect: n3 }))
          return t3.length > 0 ? Y($, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (ps && Ss({ api: "navigateTo", redirect: n3 }));
      });
    }(n2);
  });
}
function Cs(e2) {
  !function(e3) {
    e3.onResponse = function(e4) {
      V(j, e4);
    }, e3.offResponse = function(e4) {
      G(j, e4);
    };
  }(e2), function(e3) {
    e3.onNeedLogin = function(e4) {
      V($, e4);
    }, e3.offNeedLogin = function(e4) {
      G($, e4);
    }, ds && (L("_globalUniCloudStatus").needLoginInit || (L("_globalUniCloudStatus").needLoginInit = true, Z().then(() => {
      ks.call(e3);
    }), gs && As.call(e3)));
  }(e2), function(e3) {
    e3.onRefreshToken = function(e4) {
      V(B, e4);
    }, e3.offRefreshToken = function(e4) {
      G(B, e4);
    };
  }(e2);
}
let Ps;
const Ts = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", xs = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function Os() {
  const e2 = re().token || "", t2 = e2.split(".");
  if (!e2 || 3 !== t2.length)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Ps(s2).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
Ps = "function" != typeof atob ? function(e2) {
  if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !xs.test(e2))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e2 += "==".slice(2 - (3 & e2.length));
  for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
    t2 = Ts.indexOf(e2.charAt(i2++)) << 18 | Ts.indexOf(e2.charAt(i2++)) << 12 | (n2 = Ts.indexOf(e2.charAt(i2++))) << 6 | (s2 = Ts.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return r2;
} : atob;
var Es = n(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function r2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
    return t3.then((e4) => {
      if (s3) {
        const t4 = s3(e4);
        if (void 0 !== t4)
          return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
      }
      return e4;
    }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const i3 = t5.tempFiles, o2 = i3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= o2)
            return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u2 = i3[s5];
          e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
          } }).then((e5) => {
            u2.url = e5.fileID, s5 < o2 && c2();
          }).catch((e5) => {
            u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
          });
        }
      });
    }(e3, t4, 5, r3));
  }
  t2.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return "image" === t3.type ? i2(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
        return new Promise((e5, a2) => {
          index.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
            e5(r2(t5, "image"));
          }, fail(e6) {
            a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
        return new Promise((e5, c2) => {
          index.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
            e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : i2(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, i3) => {
          let o2 = index.chooseFile;
          if ("undefined" != typeof wx$1 && "function" == typeof wx$1.chooseMessageFile && (o2 = wx$1.chooseMessageFile), "function" != typeof o2)
            return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
          o2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(r2(t5));
          }, fail(e6) {
            i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}), Ls = t(Es);
const Rs = "manual";
function Us(e2) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e3.push(this[t2]);
      }), e3;
    }, (e3, t2) => {
      if (this.loadtime === Rs)
        return;
      let n2 = false;
      const s2 = [];
      for (let r2 = 2; r2 < e3.length; r2++)
        e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
      e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t2) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = i2, t2 && t2(i2);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2;
    t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const r2 = t2.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const i2 = t2.where || this.where;
    i2 && Object.keys(i2).length && (n2 = n2.where(i2));
    const o2 = t2.field || this.field;
    o2 && (n2 = n2.field(o2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
    const h2 = t2.orderby || this.orderby;
    h2 && (n2 = n2.orderBy(h2));
    const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
    return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
  } } };
}
function Ns(e2) {
  return function(t2, n2 = {}) {
    n2 = function(e3, t3 = {}) {
      return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
    }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
    return new Proxy({}, { get(s3, c2) {
      switch (c2) {
        case "toString":
          return "[object UniCloudObject]";
        case "toJSON":
          return {};
      }
      return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await M(q(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await M(q(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e4) {
            throw o3 = e4, await M(q(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await M(q(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...h2) {
        let l2;
        a2 && index.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
        "object" == typeof n2.secretMethods && function(e3, t3) {
          const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let p2 = false;
        try {
          l2 = await e2.callFunction(d2);
        } catch (e3) {
          p2 = true, l2 = { result: new te(e3) };
        }
        const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
        if (a2 && index.hideLoading(), y2 && y2.token && y2.tokenExpired && (ie(y2), Y(B, { ...y2 })), g2) {
          let e3 = m2;
          if (p2 && o2) {
            e3 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              index.showToast({ title: e3, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    index.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                      i3(e5);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                if (i2.retry && t3)
                  return s4(...h2);
              }
            }
          const n3 = new te({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
          throw n3.detail = l2.result, Y(j, { type: z, content: n3 }), n3;
        }
        return Y(j, { type: z, content: l2.result }), l2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
        return { objectName: t2, methodName: c2, params: e3 };
      } });
    } });
  };
}
function Ds(e2) {
  return L("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
}
async function Ms({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
  const n2 = Ds(this);
  if (e2 && t2)
    throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");
  if (e2)
    return n2.mpWeixinOpenid = e2, {};
  const s2 = await new Promise((e3, t3) => {
    index.login({ success(t4) {
      e3(t4.code);
    }, fail(e4) {
      t3(new Error(e4.errMsg));
    } });
  }), r2 = this.importObject("uni-id-co", { customUI: true });
  return await r2.secureNetworkHandshakeByWeixin({ code: s2, callLoginByWeixin: t2 }), n2.mpWeixinCode = s2, { code: s2 };
}
async function qs(e2) {
  const t2 = Ds(this);
  return t2.initPromise || (t2.initPromise = Ms.call(this, e2).then((e3) => e3).catch((e3) => {
    throw delete t2.initPromise, e3;
  })), t2.initPromise;
}
function Fs(e2) {
  return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
    return qs.call(e2, { openid: t2, callLoginByWeixin: n2 });
  };
}
function Ks(e2) {
  !function(e3) {
    he = e3;
  }(e2);
}
function js(e2) {
  const t2 = { getSystemInfo: index.getSystemInfo, getPushClientId: index.getPushClientId };
  return function(n2) {
    return new Promise((s2, r2) => {
      t2[e2]({ ...n2, success(e3) {
        s2(e3);
      }, fail(e3) {
        r2(e3);
      } });
    });
  };
}
class $s extends class {
  constructor() {
    this._callback = {};
  }
  addListener(e2, t2) {
    this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
  }
  on(e2, t2) {
    return this.addListener(e2, t2);
  }
  removeListener(e2, t2) {
    if (!t2)
      throw new Error('The "listener" argument must be of type function. Received undefined');
    const n2 = this._callback[e2];
    if (!n2)
      return;
    const s2 = function(e3, t3) {
      for (let n3 = e3.length - 1; n3 >= 0; n3--)
        if (e3[n3] === t3)
          return n3;
      return -1;
    }(n2, t2);
    n2.splice(s2, 1);
  }
  off(e2, t2) {
    return this.removeListener(e2, t2);
  }
  removeAllListener(e2) {
    delete this._callback[e2];
  }
  emit(e2, ...t2) {
    const n2 = this._callback[e2];
    if (n2)
      for (let e3 = 0; e3 < n2.length; e3++)
        n2[e3](...t2);
  }
} {
  constructor() {
    super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
  }
  init() {
    return Promise.all([js("getSystemInfo")(), js("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
      if (!e2)
        throw new Error("Invalid appId, please check the manifest.json file");
      if (!t2)
        throw new Error("Invalid push client id");
      this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
    }, (e2) => {
      throw this.emit("error", e2), this.close(), e2;
    });
  }
  async open() {
    return this.init();
  }
  _isUniCloudSSE(e2) {
    if ("receive" !== e2.type)
      return false;
    const t2 = e2 && e2.data && e2.data.payload;
    return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
  }
  _receivePushMessage(e2) {
    if (!this._isUniCloudSSE(e2))
      return;
    const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
    this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
  }
  _consumMessage() {
    for (; ; ) {
      const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
      if (!e2)
        break;
      this._currentMessageId++, this._parseMessagePayload(e2);
    }
  }
  _parseMessagePayload(e2) {
    const { action: t2, messageId: n2, message: s2 } = e2;
    "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
  }
  _appendMessage({ messageId: e2, message: t2 } = {}) {
    this.emit("message", t2);
  }
  _end({ messageId: e2, message: t2 } = {}) {
    this.emit("end", t2), this.close();
  }
  _initMessageListener() {
    index.onPushMessage(this._uniPushMessageCallback);
  }
  _destroy() {
    index.offPushMessage(this._uniPushMessageCallback);
  }
  toJSON() {
    return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
  }
  close() {
    this._destroy(), this.emit("close");
  }
}
async function Bs(e2, t2) {
  const n2 = `http://${e2}:${t2}/system/ping`;
  try {
    const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      ne.request({ ...s2, success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } });
    }));
    return !(!e3.data || 0 !== e3.data.code);
  } catch (e3) {
    return false;
  }
  var s2;
}
async function Ws(e2) {
  const t2 = e2.__dev__;
  if (!t2.debugInfo)
    return;
  const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await async function(e3, t3) {
    let n3;
    for (let s3 = 0; s3 < e3.length; s3++) {
      const r3 = e3[s3];
      if (await Bs(r3, t3)) {
        n3 = r3;
        break;
      }
    }
    return { address: n3, port: t3 };
  }(n2, s2);
  if (r2)
    return t2.localAddress = r2, void (t2.localPort = s2);
  const i2 = console["warn"];
  let o2 = "";
  if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === C.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
    throw new Error(o2);
  i2(o2);
}
function Hs(e2) {
  e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e3) => {
      setTimeout(() => {
        e3();
      }, n2);
    });
    const s2 = e2.auth();
    return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
  } }));
}
const zs = { tcb: bt, tencent: bt, aliyun: fe, private: At, alipay: Nt };
let Js = new class {
  init(e2) {
    let t2 = {};
    const n2 = zs[e2.provider];
    if (!n2)
      throw new Error("未提供正确的provider参数");
    t2 = n2.init(e2), function(e3) {
      const t3 = {};
      e3.__dev__ = t3, t3.debugLog = "app" === C;
      const n3 = P;
      n3 && !n3.code && (t3.debugInfo = n3);
      const s2 = new v({ createPromise: function() {
        return Ws(e3);
      } });
      t3.initLocalNetwork = function() {
        return s2.exec();
      };
    }(t2), Hs(t2), Bn(t2), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t2), function(e3) {
      e3.database = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).database();
        if (this._database)
          return this._database;
        const n3 = es(ts, { uniClient: e3 });
        return this._database = n3, n3;
      }, e3.databaseForJQL = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).databaseForJQL();
        if (this._databaseForJQL)
          return this._databaseForJQL;
        const n3 = es(ts, { uniClient: e3, isJQL: true });
        return this._databaseForJQL = n3, n3;
      };
    }(t2), function(e3) {
      e3.getCurrentUserInfo = Os, e3.chooseAndUploadFile = Ls.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
        return Us(e3);
      } }), e3.SSEChannel = $s, e3.initSecureNetworkByWeixin = Fs(e3), e3.setCustomClientInfo = Ks, e3.importObject = Ns(e3);
    }(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t2[e3])
        return;
      const n3 = t2[e3];
      t2[e3] = function() {
        return n3.apply(t2, Array.from(arguments));
      }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
        return function(n4) {
          let s2 = false;
          if ("callFunction" === t3) {
            const e5 = n4 && n4.type || c;
            s2 = e5 !== c;
          }
          const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
          n4 = n4 || {};
          const { success: o2, fail: a2, complete: u2 } = ee(n4), h2 = i2.then(() => s2 ? Promise.resolve() : M(q(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : M(q(t3, "success"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (r2 && Y(j, { type: H, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : M(q(t3, "fail"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (Y(j, { type: H, content: e5 }), Promise.reject(e5))));
          if (!(o2 || a2 || u2))
            return h2;
          h2.then((e5) => {
            o2 && o2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
          }, (e5) => {
            a2 && a2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
          });
        };
      }(t2[e3], e3)).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  const e2 = T;
  let t2 = {};
  if (e2 && 1 === e2.length)
    t2 = e2[0], Js = Js.init(t2), Js._isDefault = true;
  else {
    const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
    let n2;
    n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
      Js[e3] = function() {
        return console.error(n2), Promise.reject(new te({ code: "SYS_ERR", message: n2 }));
      };
    });
  }
  Object.assign(Js, { get mixinDatacom() {
    return Us(Js);
  } }), Cs(Js), Js.addInterceptor = N, Js.removeInterceptor = D, Js.interceptObject = F;
})();
var Vs = Js;
exports.Request = Request;
exports.Vs = Vs;
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.e = e$1;
exports.f = f$1;
exports.index = index;
exports.n = n$1;
exports.o = o$1;
exports.p = p$1;
exports.resolveComponent = resolveComponent;
exports.s = s$1;
exports.t = t$2;
exports.wx$1 = wx$1;
