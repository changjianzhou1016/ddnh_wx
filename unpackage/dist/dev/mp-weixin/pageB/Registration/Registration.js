"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        userName: "",
        nickName: "",
        password: "",
        phone: "",
        authorityId: 666,
        authorityIds: [666]
      },
      objList: {
        userName: "admin",
        password: "123456",
        captchaId: "",
        captcha: ""
        // 验证码
      },
      picPath: "",
      repeatPassword: ""
    };
  },
  onLoad() {
    this.getVerification();
  },
  methods: {
    getVerification() {
      utils_http.http.request({
        url: "base/captcha",
        method: "POST"
      }).then((res) => {
        this.picPath = res.data.data.picPath;
        this.objList.captchaId = res.data.data.captchaId;
      });
    },
    // 提交表单
    registrationForm(e) {
      this.formData.nickName = e.detail.value.nickName;
      this.formData.userName = e.detail.value.userName;
      this.formData.phone = e.detail.value.phone;
      this.formData.password = e.detail.value.password;
      this.repeatPassword = e.detail.value.repeatPassword;
      this.objList.captcha = e.detail.value.captcha;
      if (!this.isUserNameValid(this.formData.userName)) {
        common_vendor.index.showModal({
          title: "用户名需要至少需要7个字符"
        });
        this.getVerification();
        return false;
      }
      if (!this.isNickNameValid(this.formData.nickName)) {
        common_vendor.index.showModal({
          title: "昵称需要至少需要2个字符"
        });
        this.getVerification();
        return false;
      }
      if (!this.isPhoneValid(this.formData.phone)) {
        common_vendor.index.showModal({
          title: "手机号码格式不正确"
        });
        this.getVerification();
        return false;
      }
      if (!this.isPasswordValid(this.formData.password)) {
        common_vendor.index.showModal({
          title: "密码长度应大于6位"
        });
        this.getVerification();
        return false;
      }
      if (!this.isRepeatPasswordValid(this.formData.password, this.repeatPassword)) {
        common_vendor.index.showModal({
          title: "两次密码不一致"
        });
        this.getVerification();
        return false;
      }
      if (!this.isCaptchaValid(this.objList.captcha)) {
        common_vendor.index.showModal({
          title: "验证码不正确"
        });
        this.getVerification();
        return false;
      }
      utils_http.http.request({
        url: "/base/login",
        method: "POST",
        data: {
          ...this.objList
        }
      }).then((res) => {
        const token = res.data.data.token;
        utils_http.http.request({
          url: "/user/admin_register",
          method: "POST",
          data: {
            ...this.formData
          },
          header: {
            "X-token": token
          }
        }).then((res2) => {
          common_vendor.index.navigateBack({
            delta: 1
          });
          common_vendor.index.showToast({
            title: res2.data.msg
          });
        });
      });
    },
    // 校验昵称
    isNickNameValid(nickName) {
      return nickName.length >= 2;
    },
    // 校验用户名
    isUserNameValid(userName) {
      return userName.length >= 7;
    },
    // 校验手机号码
    isPhoneValid(phone) {
      const reg = /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(16[2,5,6,7])|(17[0-8])|(18[0-9])|(19[0-9]))\d{8}$/;
      return reg.test(phone);
    },
    // 校验密码
    isPasswordValid(password) {
      return password.length >= 6;
    },
    // 校验重复密码
    isRepeatPasswordValid(password, repeatPassword) {
      return password === repeatPassword;
    },
    // 校验验证码
    isCaptchaValid(captcha) {
      return captcha.length >= 6;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.getVerification && $options.getVerification(...args)),
    b: $data.picPath,
    c: common_vendor.o((...args) => $options.registrationForm && $options.registrationForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-21f74e2f"]]);
wx.createPage(MiniProgramPage);
