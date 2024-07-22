"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_DetectionToken = require("../../utils/DetectionToken.js");
const _sfc_main = {
  data() {
    return {
      backgroundColor: "#55aa00",
      user: {},
      userList: [
        {
          id: 1,
          name: "修改密码",
          color: "#55aa00"
        },
        {
          id: 2,
          name: "修改手机号",
          color: "#55aa00"
        },
        {
          id: 3,
          name: "修改邮箱",
          color: "#55aa00"
        },
        {
          id: 4,
          name: "退出登录",
          color: "#55aa00"
        }
      ]
    };
  },
  onLoad() {
    this.user = common_vendor.wx$1.getStorageSync("user").user;
  },
  onShow() {
    this.user = common_vendor.wx$1.getStorageSync("user").user;
    utils_DetectionToken.DetectionToken(common_vendor.wx$1.getStorageSync("user").token);
  },
  methods: {
    // 手指松开事件
    backColor(e) {
      this.userList[e - 1].color = "#55aa00";
      if (e != 4) {
        common_vendor.index.navigateTo({
          url: `/pageB/changeUser/changeUser?id=${e}`
        });
      } else {
        common_vendor.wx$1.showModal({
          title: "确定退出登录吗",
          success(res) {
            if (res.confirm) {
              common_vendor.index.clearStorageSync();
              common_vendor.index.redirectTo({
                url: "/pages/index/index"
              });
              common_vendor.wx$1.showToast({
                title: "已退出登录"
              });
            } else if (res.cancel) {
              common_vendor.index.showToast({
                title: "已取消"
              });
            }
          }
        });
      }
    },
    // 手指按压事件
    changeColor(e) {
      this.userList[e - 1].color = "lightblue";
    }
  }
};
if (!Array) {
  const _component_texr = common_vendor.resolveComponent("texr");
  _component_texr();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.user.nickName),
    b: common_vendor.t($data.user.phone),
    c: common_vendor.f($data.userList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.backColor(item.id), item.id),
        c: common_vendor.o(($event) => $options.changeColor(item.id), item.id),
        d: common_vendor.s("background-color: " + item.color + ";"),
        e: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
