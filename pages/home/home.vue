<template>
	<view>
		<!-- // 首页 -->
		<!-- 轮播图 -->
		<view class="lunboimg">
			<swiper :indicator-dots="indicatorDots" loop circular :current="current" :autoplay="autoplay"
				:interval="interval" :duration="duration" indicator-color="#fed79c">
				<swiper-item v-for="(item , index) in imgUrls" :key="index">
					<image :src="item" class="slide-image" mode="scaleToFill" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 创建订单 -->
		<view class="hander">
			<view>创建订单</view>
		</view>
		<view class="addOrders">
			<view>
				<button @click="toAddOrders" class="ordersBtn">
					<view>
						<image class="imageType" src="../../static/type0.png" mode=" scaleToFill"></image>
					</view>
					<view class="textSize">帮我拿货</view>
				</button>
			</view>
			<view>
				<button @click="toAddOrders" class="ordersBtn">
					<view>
						<image class="imageType" src="../../static/type0.png" mode=" scaleToFill"></image>
					</view>
					<view class="textSize">帮我送货</view>
				</button>
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
				imgUrls: [
					'../../static/swiper0.png',
					'http://47.120.78.41:8080/api/uploads/file/3ff69e70141f70c6101410a36af2b70a_20240620064453.png',
					'../../static/swpier2.png'
				],
				indicatorDots: false, //是否显示面板指示点
				autoplay: true, //是否自动切换
				current: 0,
				interval: 3000, //自动切换时间间隔
				duration: 500, //滑动动画时长
			}
		},
		onLoad() {
			// DetectionToken(wx.getStorageSync('user').token)
		},
		onShow() {
			// this.user = wx.getStorageSync('user').user
			DetectionToken(wx.getStorageSync('user').token)
		},

		methods: {
			toAddOrders() {
				uni.navigateTo({
					url: '/pageB/addOrders/addOrders'
				})
			},

		}
	}
</script>

<style lang="less">
	.hander {
		padding-top: 20rpx;
		margin-left: 43%;
	}

	.textSize {
		margin-top: -40rpx;
		font-size: 24rpx
	}

	.ordersBtn {
		width: 200rpx;
		height: 150rpx;
	}

	.lunboimg {
		padding: 0 0 18rpx 18rpx;
		border-radius: 15px;
	}

	.addOrders {
		position: absolute;
		display: flex;
		justify-content: space-around;
		top: 500rpx;
		width: 100%;
		margin: 40rpx 20rpx 0 20rpx;
	}

	.imageType {
		width: 80rpx;
		height: 80rpx;
		margin: 10rpx 0 0 0;
	}

	.lunboimg swiper {
		width: 100%;
		width: 720rpx;
		height: 400rpx;
		border-radius: 15px;
	}

	.slide-image {
		width: 100%;
		height: 100%;
		border-radius: 15px;
	}
</style>