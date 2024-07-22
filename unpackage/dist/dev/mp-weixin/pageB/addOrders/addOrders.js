"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
const _sfc_main = {
  data() {
    return {
      marketList: [],
      formData: {
        urgent: false,
        takeGoodNum: 0,
        remarks: "",
        images: [],
        stall: {}
      },
      value: 0,
      stall_value: 0,
      stalls: [],
      urgent: false,
      price: 15,
      marketId: 0
    };
  },
  onLoad() {
    this.getMarkerList(common_vendor.wx$1.getStorageSync("user").token);
  },
  onShow() {
    this.getMarkerList(common_vendor.wx$1.getStorageSync("user").token);
  },
  methods: {
    //提交
    subMit() {
      if (this.formData.stall.ID === void 0) {
        return common_vendor.index.showToast({
          title: "请选择档口"
        });
      }
      if (this.formData.takeGoodNum === 0) {
        return common_vendor.index.showToast({
          title: "请输入拿货件数"
        });
      }
      this.formData.images = JSON.stringify(this.formData.images);
      utils_http.http.request({
        url: "gb/createGoodBill",
        method: "POST",
        header: {
          "x-token": common_vendor.wx$1.getStorageSync("user").token
        },
        data: {
          ...this.formData
        }
      }).then((res) => {
        if (res.data.code === 0) {
          common_vendor.index.switchTab({
            url: "/pages/home/home"
          });
        }
      });
    },
    // 加急？
    switchChange(e) {
      this.urgent = e.detail.value;
    },
    getStall(e) {
      utils_http.http.request({
        url: "stall/getStallList",
        method: "GET",
        params: {
          page: 1,
          pageSize: 10,
          stallNumber: e,
          marketId: this.marketId
        },
        header: {
          "x-token": common_vendor.wx$1.getStorageSync("user").token
        }
      }).then((res) => {
        this.formData.stall = res.data.data.list[0];
      });
    },
    // 通过选择市场获取对应的档口
    changeOfMarket(e) {
      this.marketId = e;
      utils_http.http.request({
        url: "stall/getStallList",
        method: "GET",
        data: {
          page: 1,
          pageSize: 1e4,
          marketId: e
        },
        header: {
          "x-token": common_vendor.wx$1.getStorageSync("user").token
        }
      }).then((res) => {
        this.stalls = res.data.data.list.map((item) => ({
          text: item.stall,
          value: item.stallNumber
        }));
      });
    },
    // 获取市场列表
    getMarkerList(token) {
      utils_http.http.request({
        url: "/market/getMarketList",
        method: "GET",
        data: {
          page: 1,
          pageSize: 1e4
        },
        header: {
          "x-token": token
        }
      }).then((res) => {
        this.marketList = res.data.data.list.map((item) => ({
          text: item.marketName,
          value: item.ID
        }));
      }).catch((err) => {
        console.log(err, "失败");
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  (_easycom_uni_data_select2 + _easycom_uni_number_box2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_number_box)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.changeOfMarket),
    b: common_vendor.o(($event) => $data.value = $event),
    c: common_vendor.p({
      label: "请选择市场",
      text: $data.value,
      localdata: $data.marketList,
      modelValue: $data.value
    }),
    d: common_vendor.o($options.getStall),
    e: common_vendor.o(($event) => $data.stall_value = $event),
    f: common_vendor.p({
      label: "请选择档口",
      localdata: $data.stalls,
      modelValue: $data.stall_value
    }),
    g: common_vendor.o(($event) => $data.formData.takeGoodNum = $event),
    h: common_vendor.p({
      max: 999999999999,
      modelValue: $data.formData.takeGoodNum
    }),
    i: $data.urgent,
    j: common_vendor.o((...args) => $options.switchChange && $options.switchChange(...args)),
    k: common_vendor.t($data.price),
    l: common_vendor.o((...args) => $options.subMit && $options.subMit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
