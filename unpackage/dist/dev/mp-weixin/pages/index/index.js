"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        userName: "",
        password: "",
        captchaId: "",
        captcha: ""
      },
      picPath: ""
    };
  },
  onLoad() {
    this.getVerification();
  },
  methods: {
    // 跳转到用户注册页面
    toAddUser() {
      common_vendor.index.navigateTo({
        url: "/pageB/Registration/Registration"
      });
    },
    // 获取验证码
    getVerification() {
      utils_http.http.request({
        url: "base/captcha",
        method: "POST"
      }).then((res) => {
        this.picPath = res.data.data.picPath;
        this.formData.captchaId = res.data.data.captchaId;
      });
    },
    // 表单登录校验
    validateForm() {
      if (!this.isUserNameValid(this.formData.userName)) {
        common_vendor.index.showToast({
          title: "用户名需要7位",
          icon: "error"
        });
        this.getVerification();
        return false;
      }
      if (!this.isPasswordValid(this.formData.password)) {
        common_vendor.index.showToast({
          title: "密码至少需要6位",
          icon: "error"
        });
        this.getVerification();
        return false;
      }
      common_vendor.index.showLoading({
        title: "登录中..."
      });
      utils_http.http.request({
        url: "/base/login",
        method: "POST",
        data: {
          ...this.formData
        }
      }).then((res) => {
        if (res.data.code === 0) {
          common_vendor.index.setStorageSync("user", res.data.data);
          common_vendor.index.switchTab({
            url: "/pages/home/home"
          });
          common_vendor.index.showToast({
            title: res.data.msg
          });
        } else {
          common_vendor.index.showModal({
            title: res.data.msg
          });
        }
      });
      common_vendor.index.hideLoading();
    },
    // 验证用户名是否合规
    isUserNameValid(userName) {
      return userName.length > 6;
    },
    // 验证密码是否合规
    isPasswordValid(password) {
      return password.length >= 6;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.formData.userName,
    b: common_vendor.o(($event) => $data.formData.userName = $event.detail.value),
    c: $data.formData.password,
    d: common_vendor.o(($event) => $data.formData.password = $event.detail.value),
    e: $data.formData.captcha,
    f: common_vendor.o(($event) => $data.formData.captcha = $event.detail.value),
    g: common_vendor.o((...args) => $options.getVerification && $options.getVerification(...args)),
    h: $data.picPath,
    i: common_vendor.o((...args) => $options.toAddUser && $options.toAddUser(...args)),
    j: common_vendor.o((...args) => $options.validateForm && $options.validateForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
