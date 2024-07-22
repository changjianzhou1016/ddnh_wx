"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
const _sfc_main = {
  data() {
    return {
      text: "",
      title: "",
      oldPassworld: false,
      newPassworld: false,
      repeatPassworld: false,
      id: 1,
      passworld: {
        oldPassworld: "",
        // 旧密码
        newPassworld: "",
        // 新密码
        repeatPassworld: ""
        // 重复密码
      },
      phone: Number,
      email: "",
      user: {}
    };
  },
  onLoad(options) {
    this.user = common_vendor.wx$1.getStorageSync("user");
    this.id = options.id;
    this.changeTit();
  },
  onShow() {
  },
  methods: {
    // 表单提交
    ischange(e) {
      if (Number(this.id) === 1) {
        this.passworld = e.target.value;
        if (!this.isOldPassworld(this.passworld.oldPassworld)) {
          common_vendor.index.showModal({
            title: "旧密码长度应大于6位"
          });
          return false;
        }
        if (!this.isNewPassworld(this.passworld.newPassworld)) {
          common_vendor.index.showModal({
            title: "新密码长度应大于6位"
          });
          return false;
        }
        if (!this.isRepeatPassworld(this.passworld.newPassworld, this.passworld.repeatPassworld)) {
          common_vendor.index.showModal({
            title: "两次密码输入不一致"
          });
          return false;
        }
        utils_http.http.request({
          url: "user/changePassword",
          method: "POST",
          data: {
            password: e.target.value.oldPassworld,
            newPassword: e.target.value.newPassworld
          },
          header: {
            "x-token": this.user.token
          }
        }).then((res) => {
          e.target.value = "";
          this.passworld = {
            oldPassworld: "",
            newPassworld: "",
            repeatPassworld: ""
          };
          if (res.data.code == 0) {
            common_vendor.index.navigateBack(1);
            this.resetForm();
            common_vendor.wx$1.showToast({
              title: res.data.msg
            });
          } else {
            common_vendor.wx$1.showModal({
              title: res.data.msg,
              icon: "error"
            });
          }
        });
      }
      if (Number(this.id) === 2) {
        if (!this.isPhoneValid(this.phone)) {
          common_vendor.index.showModal({
            title: "手机号码格式不正确"
          });
          return false;
        }
        utils_http.http.request({
          url: "user/setSelfInfo",
          method: "PUT",
          data: {
            phone: this.phone
          },
          header: {
            "x-token": this.user.token
          }
        }).then((res) => {
          if (res.data.code === 0) {
            this.user.user.phone = this.phone;
            this.resetForm();
            common_vendor.index.setStorageSync("user", this.user);
            common_vendor.wx$1.navigateBack(1);
            common_vendor.wx$1.showToast({
              title: res.data.msg
            });
          } else {
            common_vendor.wx$1.showModal({
              title: res.data.msg
            });
          }
        });
      }
      if (Number(this.id) === 3) {
        if (!this.isEmailValid(this.phone)) {
          common_vendor.index.showModal({
            title: "邮箱格式不正确"
          });
          return false;
        }
        utils_http.http.request({
          url: "user/setSelfInfo",
          method: "PUT",
          data: {
            email: this.phone
          },
          header: {
            "x-token": this.user.token
          }
        }).then((res) => {
          if (res.data.code === 0) {
            this.user.user.email = this.phone;
            this.resetForm();
            common_vendor.index.setStorageSync("user", this.user);
            common_vendor.wx$1.navigateBack(1);
            common_vendor.wx$1.showToast({
              title: res.data.msg
            });
          } else {
            common_vendor.wx$1.showModal({
              title: res.data.msg
            });
          }
        });
      }
    },
    // 
    changeTit() {
      if (Number(this.id) === 2) {
        this.text = "手机号码：";
        this.title = "请输入手机号码";
      } else if (Number(this.id) === 3) {
        this.text = "邮箱：";
        this.title = "请输入邮箱";
      }
    },
    // 重置表单
    resetForm() {
      this.passworld = {
        oldPassworld: "",
        newPassworld: "",
        repeatPassworld: ""
      };
      this.phone = "";
      this.oldPassworld = false;
      this.newPassworld = false;
      this.repeatPassworld = false;
    },
    // 控制密码显示隐藏
    showNewPassworld() {
      this.newPassworld = !this.newPassworld;
    },
    showRepeatPassworld() {
      this.repeatPassworld = !this.repeatPassworld;
    },
    showOldPassworld() {
      this.oldPassworld = !this.oldPassworld;
    },
    isOldPassworld(oldPassworld) {
      return oldPassworld.length >= 6;
    },
    isNewPassworld(newPassworld) {
      return newPassworld.length >= 6;
    },
    isRepeatPassworld(newPassworld, repeatPassworld) {
      return newPassworld === repeatPassworld;
    },
    isPhoneValid(phone) {
      const reg = /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(16[2,5,6,7])|(17[0-8])|(18[0-9])|(19[0-9]))\d{8}$/;
      return reg.test(phone);
    },
    isEmailValid(email) {
      const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return reg.test(email);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: Number($data.id) === 1
  }, Number($data.id) === 1 ? {
    b: !$data.oldPassworld,
    c: $data.passworld.oldPassworld,
    d: common_vendor.o(($event) => $data.passworld.oldPassworld = $event.detail.value),
    e: $data.oldPassworld ? "/static/eye-open.png" : "/static/eye-close.png",
    f: common_vendor.o((...args) => $options.showOldPassworld && $options.showOldPassworld(...args)),
    g: !$data.newPassworld,
    h: $data.passworld.newPassworld,
    i: common_vendor.o(($event) => $data.passworld.newPassworld = $event.detail.value),
    j: $data.newPassworld ? "/static/eye-open.png" : "/static/eye-close.png",
    k: common_vendor.o((...args) => $options.showNewPassworld && $options.showNewPassworld(...args)),
    l: !$data.repeatPassworld,
    m: $data.passworld.repeatPassworld,
    n: common_vendor.o(($event) => $data.passworld.repeatPassworld = $event.detail.value),
    o: $data.repeatPassworld ? "/static/eye-open.png" : "/static/eye-close.png",
    p: common_vendor.o(($event) => $options.showRepeatPassworld()),
    q: common_vendor.o((...args) => $options.resetForm && $options.resetForm(...args)),
    r: common_vendor.o((...args) => $options.ischange && $options.ischange(...args))
  } : {
    s: common_vendor.t($data.text),
    t: $data.title,
    v: $data.phone,
    w: common_vendor.o(($event) => $data.phone = $event.detail.value),
    x: common_vendor.o((...args) => $options.ischange && $options.ischange(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
