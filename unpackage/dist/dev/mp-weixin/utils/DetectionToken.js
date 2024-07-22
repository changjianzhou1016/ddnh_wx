"use strict";
const common_vendor = require("../common/vendor.js");
const DetectionToken = function(token) {
  if (token == void 0) {
    console.log("没有token");
    common_vendor.index.navigateTo({
      url: "/pages/index/index"
    });
  }
};
exports.DetectionToken = DetectionToken;
