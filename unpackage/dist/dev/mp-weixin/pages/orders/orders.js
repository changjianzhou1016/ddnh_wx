"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_DetectionToken = require("../../utils/DetectionToken.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
  },
  onShow() {
    utils_DetectionToken.DetectionToken(common_vendor.wx$1.getStorageSync("user").token);
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
