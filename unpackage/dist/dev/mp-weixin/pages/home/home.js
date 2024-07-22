"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_DetectionToken = require("../../utils/DetectionToken.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      imgUrls: [
        "../../static/swiper0.png",
        "http://47.120.78.41:8080/api/uploads/file/3ff69e70141f70c6101410a36af2b70a_20240620064453.png",
        "../../static/swpier2.png"
      ],
      indicatorDots: false,
      //是否显示面板指示点
      autoplay: true,
      //是否自动切换
      current: 0,
      interval: 3e3,
      //自动切换时间间隔
      duration: 500
      //滑动动画时长
    };
  },
  onLoad() {
  },
  onShow() {
    utils_DetectionToken.DetectionToken(common_vendor.wx$1.getStorageSync("user").token);
  },
  methods: {
    toAddOrders() {
      common_vendor.index.navigateTo({
        url: "/pageB/addOrders/addOrders"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.imgUrls, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: $data.indicatorDots,
    c: $data.current,
    d: $data.autoplay,
    e: $data.interval,
    f: $data.duration,
    g: common_assets._imports_0,
    h: common_vendor.o((...args) => $options.toAddOrders && $options.toAddOrders(...args)),
    i: common_assets._imports_0,
    j: common_vendor.o((...args) => $options.toAddOrders && $options.toAddOrders(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
