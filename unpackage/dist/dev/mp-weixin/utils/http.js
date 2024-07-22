"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://127.0.0.1:8888/";
const http = new common_vendor.Request({
  baseURL
});
new common_vendor.Request({
  baseURL: "https://api.mch.weixin.qq.com/"
});
new common_vendor.Request({
  baseURL: "https://api.weixin.qq.com/"
});
exports.http = http;
