<template>
	<view>
		<!-- 头部 -->
		<view class="top">
			<view class="user_hander">
				<image
					src="http://47.120.78.41:8080/api/uploads/file/75688e8553a4d2452f6200ed9faf7f75_20240620114013.png"
					mode=""></image>
				<view class="user_nickname">
					<view class="user_nickname_row">
						<texr class="nickname">昵称：</texr>
						<text class="user_text">
							{{ user.nickName}}
						</text>
					</view>
					<view class="user_nickname_row">
						<text class="nickname">手机号码：</text>
						<text class="user_text">
							{{ user.phone}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部信息修改 -->
		<view class="bottom">
			<view @touchend="backColor(item.id)" @touchstart="changeColor(item.id)"
				:style="'background-color: ' +item.color+';'" class="userToChange" v-for="item in userList"
				:key="item.id">
				<view>{{ item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		DetectionToken
	} from '../../utils/DetectionToken'
	export default {
		data() {
			return {
				backgroundColor: '#55aa00',
				user: {},
				userList: [{
						id: 1,
						name: '修改密码',
						color: '#55aa00'
					},
					{
						id: 2,
						name: '修改手机号',
						color: '#55aa00'
					},
					{
						id: 3,
						name: '修改邮箱',
						color: '#55aa00'
					},
					{
						id: 4,
						name: '退出登录',
						color: '#55aa00'
					}
				]
			}
		},
		onLoad() {
			this.user = wx.getStorageSync('user').user
			// DetectionToken(wx.getStorageSync('user').token)
			// console.log(wx.getStorageSync('user'));
		},
		onShow() {
			this.user = wx.getStorageSync('user').user
			DetectionToken(wx.getStorageSync('user').token)
		},

		methods: {
			// 手指松开事件
			backColor(e) {
				this.userList[e - 1].color = '#55aa00'
				if (e != 4) {

					uni.navigateTo({
						url: `/pageB/changeUser/changeUser?id=${e}`
					})
				} else {
					wx.showModal({
						title: '确定退出登录吗',
						success(res) {
							if (res.confirm) {
								uni.clearStorageSync();

								uni.redirectTo({
									url: '/pages/index/index'
								})
								wx.showToast({
									title: '已退出登录'
								})

							} else if (res.cancel) {
								uni.showToast({
									title: '已取消'
								})
							}
						}
					})
					// uni.clearStorageSync();
					// uni.redirectTo({
					// 	url: '/pages/index/index'
					// })
				}
			},
			// 手指按压事件
			changeColor(e) {
				this.userList[e - 1].color = 'lightblue'
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #eee;
	}

	.user_hander {
		margin: 0 20rpx 0 20rpx;
		display: flex;

		image {
			width: 150rpx;
			height: 150rpx;
			margin-right: 30rpx;
			border-radius: 50%;
		}
	}

	.bottom {
		margin-top: 50rpx;
	}

	.top {
		padding: 40rpx 0 50rpx 0;
		border-bottom: 1rpx solid #ffaa00;
	}

	.nickname {
		display: block;
		width: 160rpx;
		font-size: 30rpx;
		line-height: 75rpx;
		text-align: right;
		font-weight: 700;
		color: #000000;
		margin-right: 20rpx;
	}

	.user_text {
		height: 75rpx;
		line-height: 75rpx;
		font-size: 40rpx;
		color: #7ac8ed;
		letter-spacing: 5rpx;
	}

	.user_nickname_row {
		height: 75rpx;
		display: flex;
	}

	.user_nickname {
		width: auto;
		height: 150rpx;
	}

	.userToChange {
		padding: 20rpx 0;
		text-align: right;
		padding-right: 30rpx;
		height: 100rpx;

		margin: 20rpx 10rpx;
		line-height: 100rpx;
		// background-color: #55aa00;
		border-radius: 20rpx;
	}
</style>