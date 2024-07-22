<!-- 用户登录页面 -->
<template>
	<view class="container">
		<image src="http://47.120.78.41:8080/api/uploads/file/d56b699830e77ba53855679cb1d252da_20240619110243.png"
			mode="scaleToFill">
		</image>
		<view class="pic">
			<view class="title">
				用户登录
			</view>

			<!-- form表单 -->
			<view>
				<form ref="formRef" @submit="validateForm">
					<view class="form">
						<text>用户名：</text>
						<input placeholder="请输入用户名" v-model="formData.userName" name="formData.userName"
							class="formInput" type="text" />
					</view>
					<view class="form">
						<text>密码：</text>
						<input placeholder="请输入密码" v-model="formData.password" name="formData.password" required
							class="formInput" password />
					</view>
					<view class="form">
						<view class="form_Verification">验证码：</view>
						<view class="Verification">
							<input placeholder="请输入验证码" v-model="formData.captcha" class="formInput" type="text" />
							<image @click="getVerification" :src="picPath" mode=" aspectFill"></image>
						</view>
					</view>
					<view class="submitSty">
						<button type="primary" form-type="submit">提交</button>
						<button type="warn" @click="toAddUser">注册账号</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		http
	} from '../../utils/http';
	export default {
		data() {
			return {
				formData: {
					userName: '',
					password: '',
					captchaId: '',
					captcha: ''
				},
				picPath: ''

			}
		},
		onLoad() {
			this.getVerification()
		},
		methods: {
			// 跳转到用户注册页面
			toAddUser() {
				uni.navigateTo({
					url: '/pageB/Registration/Registration'
				})

			},
			// 获取验证码
			getVerification() {
				http.request({
					url: 'base/captcha',
					method: 'POST'
				}).then(res => {
					this.picPath = res.data.data.picPath
					this.formData.captchaId = res.data.data.captchaId
				})
			},
			// 表单登录校验
			validateForm() {
				if (!this.isUserNameValid(this.formData.userName)) {
					uni.showToast({
						title: '用户名需要7位',
						icon: 'error'
					});
					this.getVerification()
					return false;
				}
				if (!this.isPasswordValid(this.formData.password)) {
					uni.showToast({
						title: '密码至少需要6位',
						icon: 'error'
					});
					this.getVerification()
					return false;
				}
				uni.showLoading({
					title: '登录中...'
				})
				http.request({
					url: '/base/login',
					method: 'POST',
					data: {
						...this.formData
					}
				}).then(res => {
					if (res.data.code === 0) {
						uni.setStorageSync('user', res.data.data)
						uni.switchTab({
							url: '/pages/home/home'
						})
						uni.showToast({
							title: res.data.msg
						})
					} else {
						uni.showModal({
							title: res.data.msg
						})
					}

				})
				uni.hideLoading();
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
</script>

<style lang="less">
	page {
		background-color: #eee;
	}

	.container {
		position: relative;

		image {
			width: 100%;
			height: 500rpx;
			position: absolute;
		}
	}

	.submitSty {
		display: flex;
		margin-left: 90rpx;
		justify-content: space-evenly;

		button {
			margin-top: 80rpx;
			width: 250rpx;
			height: 100rpx;
			line-height: 100rpx;
		}
	}

	.form_Verification {
		width: 150rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: right;
	}

	.Verification {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		// margin-left: 20rpx;

		input {
			width: 200rpx;
			height: 80rpx;
		}

		image {
			margin-left: 230rpx;
			width: 200rpx;
			height: 80rpx;
		}
	}

	.form {
		display: flex;
		width: 100%;
		height: 80rpx;
		padding: 0 20rpx;
		margin: 0 0 40rpx 100rpx;
		left: 20rpx;

		text {
			width: 150rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: right;
		}
	}

	.formInput {
		height: 80rpx;
		width: 380rpx;
		// width: calc(100% - 220rpx); // 动态计算宽度
		border: 1rpx solid #ffaa00;
		border-radius: 20rpx;
		padding-left: 10rpx;
	}

	.title {
		margin: -100rpx 0 200rpx 80rpx;
		font-size: 80rpx;
		color: #ffffff;
		font-family: Georgia, 'Gill Sans', Times, serif;

	}

	.pic {
		position: absolute;
		top: 300rpx;
	}
</style>