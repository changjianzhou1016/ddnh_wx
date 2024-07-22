<!-- 用户注册 -->
<template>
	<view class="formSty">
		<view>
			<form ref="formRef" @submit="registrationForm">
				<!-- 昵称 -->
				<view class="form_row">
					<text>昵称:</text>
					<input placeholder="请输入昵称" name="nickName" type="text" />
				</view>
				<!-- 用户名 -->
				<view class="form_row">
					<text>用户名:</text>
					<input placeholder="请输入用户名, 建议使用手机号码" name="userName" type="text" />
				</view>
				<!-- 手机号码 -->
				<view class="form_row">
					<text>手机号码:</text>
					<input placeholder="请输入手机号码" name="phone" type="text" />
				</view>
				<!-- 密码 -->
				<view class="form_row">
					<text>密码:</text>
					<input placeholder="请输入密码" name="password" password />
				</view>
				<view class="form_row">
					<text>重复密码:</text>
					<input placeholder="请重复输入密码" name="repeatPassword" password />
				</view>
				<!-- 验证码 -->
				<view class="form_row">
					<text>验证码:</text>
					<view class="baseInpimg">
						<input placeholder="请输入验证码" name="captcha" type="text" />
						<image @click="getVerification" :src="picPath" mode=""></image>
					</view>
				</view>
				<view class="form_row">
					<button form-type="submit" type="primary">提交</button>
					<button form-type="reset" type="warn">重置</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		http
	} from '../../utils/http'
	export default {
		data() {
			return {
				formData: {
					userName: '',
					nickName: '',
					password: '',
					phone: '',
					authorityId: 666,
					authorityIds: [666]
				},
				objList: {
					userName: 'admin',
					password: '123456',
					captchaId: '',
					captcha: '' // 验证码
				},
				picPath: '',
				repeatPassword: ''
			}
		},
		onLoad() {
			this.getVerification()
		},
		methods: {
			getVerification() {
				http.request({
					url: 'base/captcha',
					method: 'POST'
				}).then(res => {
					this.picPath = res.data.data.picPath
					this.objList.captchaId = res.data.data.captchaId
					// console.log(this.objList);
				})
			},
			// 提交表单
			registrationForm(e) {
				// console.log(e.detail.value);
				this.formData.nickName = e.detail.value.nickName
				this.formData.userName = e.detail.value.userName
				this.formData.phone = e.detail.value.phone
				this.formData.password = e.detail.value.password
				this.repeatPassword = e.detail.value.repeatPassword
				this.objList.captcha = e.detail.value.captcha
				// 校验昵称
				if (!this.isUserNameValid(this.formData.userName)) {
					uni.showModal({
						title: '用户名需要至少需要7个字符',
					});
					this.getVerification()
					return false;
				}
				// 校验用户名
				if (!this.isNickNameValid(this.formData.nickName)) {
					uni.showModal({
						title: '昵称需要至少需要2个字符',
					});
					this.getVerification()
					return false;
				}
				// 校验手机号码
				if (!this.isPhoneValid(this.formData.phone)) {
					uni.showModal({
						title: '手机号码格式不正确',
					});
					this.getVerification()
					return false;
				}
				// 校验密码
				if (!this.isPasswordValid(this.formData.password)) {
					uni.showModal({
						title: '密码长度应大于6位',
					});
					this.getVerification()
					return false;
				}
				// 校验重复密码
				if (!this.isRepeatPasswordValid(this.formData.password, this.repeatPassword)) {
					uni.showModal({
						title: '两次密码不一致',
					});
					this.getVerification()
					return false;
				}
				// 校验验证码
				if (!this.isCaptchaValid(this.objList.captcha)) {
					uni.showModal({
						title: '验证码不正确',
					});
					this.getVerification()
					return false;
				}
				http.request({
					url: '/base/login',
					method: 'POST',
					data: {
						...this.objList
					}
				}).then(res => {
					const token = res.data.data.token
					http.request({
						url: '/user/admin_register',
						method: 'POST',
						data: {
							...this.formData
						},
						header: {
							'X-token': token
						}
					}).then(res => {
						// 返回上一页
						uni.navigateBack({
							delta: 1
						})
						uni.showToast({
							title: res.data.msg
						})
					})

				})

			},
			// 校验昵称
			isNickNameValid(nickName) {
				return nickName.length >= 2
			},
			// 校验用户名
			isUserNameValid(userName) {
				return userName.length >= 7
			},
			// 校验手机号码
			isPhoneValid(phone) {
				const reg = /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(16[2,5,6,7])|(17[0-8])|(18[0-9])|(19[0-9]))\d{8}$/
				return reg.test(phone)
			},
			// 校验密码
			isPasswordValid(password) {
				return password.length >= 6
			},
			// 校验重复密码
			isRepeatPasswordValid(password, repeatPassword) {
				return password === repeatPassword
			},
			// 校验验证码
			isCaptchaValid(captcha) {
				return captcha.length >= 6
			},
		}
	}
</script>

<style lang="less" scoped>
	.formSty {
		padding: 200rpx 0 0 0;
	}

	.form_row {
		display: flex;
		width: 100%;
		margin-top: 40rpx;

		button {
			margin-top: 100rpx;
			width: 250rpx;
			height: 100rpx;
			line-height: 100rpx;
		}

		text {
			width: 180rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: right;
			margin-right: 20rpx;
		}

		input {
			border: 1rpx solid #ffaa00;
			width: 500rpx;
			height: 80rpx;
			border-radius: 20rpx;
			padding-left: 10rpx;
		}

	}

	.baseInpimg {
		width: 500rpx;
		height: 80rpx;
		display: flex;

		input {
			width: 250rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}

		image {
			width: 250rpx;
			height: 80rpx;
			border-radius: 20rpx;
			background-color: #fffbc6;
		}
	}
</style>