<template>
	<view>
		<view class="formUserSty" v-if="Number(id) === 1">
			<form ref="formRef" @submit="ischange">
				<view class="changePassword">
					<view class="input_box">
						<text class="icon">*</text>
						<view class="text"><text>原密码</text></view>
					</view>
					<input v-model="passworld.oldPassworld" :password="!oldPassworld" name="oldPassworld"
						placeholder="请输入旧密码" type="text" />
					<image :src="oldPassworld ? '/static/eye-open.png' : '/static/eye-close.png'" mode="aspectFit"
						class="eye-icon" @tap="showOldPassworld" />
				</view>
				<view class="changePassword">
					<view class="input_box">
						<text class="icon">*</text>
						<view class="text"><text>新密码</text></view>
					</view>
					<input v-model="passworld.newPassworld" :password="!newPassworld" name="newPassworld"
						placeholder="请输入新密码" type="text" />
					<image :src="newPassworld ? '/static/eye-open.png' : '/static/eye-close.png'" mode="aspectFit"
						class="eye-icon" @tap="showNewPassworld" />
				</view>
				<view class="changePassword">
					<view class="input_box">
						<text class="icon">*</text>
						<view class="text"><text>重复密码</text></view>
					</view>
					<input v-model="passworld.repeatPassworld" :password="!repeatPassworld" name="repeatPassworld"
						placeholder="请再次输入密码" type="text" />
					<image :src="repeatPassworld ? '/static/eye-open.png' : '/static/eye-close.png'" mode="aspectFit"
						class="eye-icon" @tap="showRepeatPassworld()" />
				</view>
				<view class="userSubmitSty">
					<button type="primary" form-type="submit">提交</button>
					<button type="warn" form-type="reset" @click="resetForm">重置</button>
				</view>
			</form>
		</view>
		<view v-else>
			<view>
				<view class="commonality commonality_row">
					<text class="text">{{text}}</text>
					<input :placeholder="title" v-model="phone" type="text" />
				</view>
				<view class="userSubmitSty">
					<button @click="ischange" type="primary">提交</button>
				</view>
			</view>
		</view>
		<!-- <view v-if="Number(id) === 3">
			修改邮箱
		</view> -->
	</view>
</template>

<script>
	import {
		http
	} from '../../utils/http';
	export default {
		data() {
			return {
				text: '',
				title: '',
				oldPassworld: false,
				newPassworld: false,
				repeatPassworld: false,
				id: 1,
				passworld: {
					oldPassworld: '', // 旧密码
					newPassworld: '', // 新密码
					repeatPassworld: '' // 重复密码
				},
				phone: Number,
				email: '',
				user: {}
			}
		},
		onLoad(options) {
			this.user = wx.getStorageSync('user')
			this.id = options.id;
			this.changeTit()
		},
		onShow() {},
		methods: {
			// 表单提交
			ischange(e) {
				if (Number(this.id) === 1) {
					this.passworld = e.target.value
					if (!this.isOldPassworld(this.passworld.oldPassworld)) {
						uni.showModal({
							title: '旧密码长度应大于6位',
						});
						return false;
					}
					if (!this.isNewPassworld(this.passworld.newPassworld)) {
						uni.showModal({
							title: '新密码长度应大于6位',
						});
						return false;
					}
					if (!this.isRepeatPassworld(this.passworld.newPassworld, this.passworld.repeatPassworld)) {
						uni.showModal({
							title: '两次密码输入不一致',
						});
						return false;
					}
					http.request({
						url: 'user/changePassword',
						method: 'POST',
						data: {
							password: e.target.value.oldPassworld,
							newPassword: e.target.value.newPassworld
						},
						header: {
							'x-token': this.user.token
						}
					}).then(res => {
						e.target.value = ''
						this.passworld = {
							oldPassworld: '',
							newPassworld: '',
							repeatPassworld: ''
						}
						if (res.data.code == 0) {
							uni.navigateBack(1)
							this.resetForm()
							wx.showToast({
								title: res.data.msg
							})
						} else {
							wx.showModal({
								title: res.data.msg,
								icon: 'error'
							})
						}
					})
				}
				if (Number(this.id) === 2) {

					if (!this.isPhoneValid(this.phone)) {
						uni.showModal({
							title: '手机号码格式不正确',
						});
						return false;
					}
					http.request({
						url: 'user/setSelfInfo',
						method: 'PUT',
						data: {
							phone: this.phone
						},
						header: {
							'x-token': this.user.token
						}
					}).then(res => {
						if (res.data.code === 0) {
							this.user.user.phone = this.phone
							this.resetForm()
							uni.setStorageSync('user', this.user)
							wx.navigateBack(1)
							wx.showToast({
								title: res.data.msg
							})
						} else {
							wx.showModal({
								title: res.data.msg
							})
						}
					})
				}
				if (Number(this.id) === 3) {
					if (!this.isEmailValid(this.phone)) {
						uni.showModal({
							title: '邮箱格式不正确',
						});
						return false;
					}
					http.request({
						url: 'user/setSelfInfo',
						method: 'PUT',
						data: {
							email: this.phone
						},
						header: {
							'x-token': this.user.token
						}
					}).then(res => {
						if (res.data.code === 0) {
							this.user.user.email = this.phone
							this.resetForm()
							uni.setStorageSync('user', this.user)
							wx.navigateBack(1)
							wx.showToast({
								title: res.data.msg
							})
						} else {
							wx.showModal({
								title: res.data.msg
							})
						}
					})
				}
			},
			// 

			changeTit() {
				if (Number(this.id) === 2) {
					this.text = '手机号码：'
					this.title = '请输入手机号码'
				} else if (Number(this.id) === 3) {
					this.text = '邮箱：'
					this.title = '请输入邮箱'
				}
			},
			// 重置表单
			resetForm() {
				this.passworld = {
					oldPassworld: '',
					newPassworld: '',
					repeatPassworld: ''
				};
				this.phone = ''
				this.oldPassworld = false;
				this.newPassworld = false;
				this.repeatPassworld = false;
			},

			// 控制密码显示隐藏
			showNewPassworld() {
				this.newPassworld = !this.newPassworld
			},
			showRepeatPassworld() {
				this.repeatPassworld = !this.repeatPassworld
			},
			showOldPassworld() {
				this.oldPassworld = !this.oldPassworld
			},
			isOldPassworld(oldPassworld) {
				return oldPassworld.length >= 6
			},
			isNewPassworld(newPassworld) {
				return newPassworld.length >= 6
			},
			isRepeatPassworld(newPassworld, repeatPassworld) {
				return newPassworld === repeatPassworld
			},
			isPhoneValid(phone) {
				const reg = /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(16[2,5,6,7])|(17[0-8])|(18[0-9])|(19[0-9]))\d{8}$/
				return reg.test(phone)
			},
			isEmailValid(email) {
				const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
				return reg.test(email)
			}
		}
	}
</script>

<style lang="less">
	.changePassword {
		display: flex;
		padding: 10rpx 20rpx;
		margin-bottom: 20rpx;
		position: relative;


		input {
			height: 80rpx;
			flex: 1;
			border: 1rpx solid #55ff00;
			margin-left: 30rpx;
			padding: 0 90rpx 0 10rpx;
			border-radius: 20rpx;
		}
	}

	.input_box {
		display: flex;
		margin-left: 20rpx;
		width: 190rpx;

	}

	.icon {
		color: red;
		line-height: 70rpx;
	}

	.text {
		width: 180rpx;
		line-height: 80rpx;
	}

	.userSubmitSty {
		display: flex;
		margin-top: 100rpx;

		button {
			width: 200rpx;
			font-size: 40rpx;
		}
	}

	.formUserSty {
		margin-top: 200rpx;
	}

	.eye-icon {
		position: absolute;
		top: 50%;
		right: 15px;
		transform: translateY(-50%);
		width: 30px;
		height: 30px;
	}

	.commonality_row {
		margin-top: 200rpx;
	}

	.commonality {
		display: flex;
		height: 60rpx;
		margin-left: 30rpx;

		input {
			border: 1rpx solid #55ff00;
			height: 60rpx;
			width: 60%;
			border-radius: 20rpx;
		}

		text {
			text-align: right;
			line-height: 60rpx;
		}
	}
</style>