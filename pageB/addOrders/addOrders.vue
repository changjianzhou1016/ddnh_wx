<template>
	<view>
		<view class="hander">
			<view class="selectMark">
				<view class="selectMark_text">
					请选择市场
				</view>
				<view class="selectMark_select">
					<uni-data-select label="请选择市场" @change="changeOfMarket" :text='value' v-model="value"
						:localdata="marketList"></uni-data-select>
				</view>
			</view>
			<view class="selectMark">
				<view class="selectMark_text">
					请选择档口
				</view>
				<view class="selectMark_select">
					<uni-data-select label="请选择档口" @change="getStall" v-model="stall_value"
						:localdata="stalls"></uni-data-select>
				</view>
			</view>
			<view class="takegoodsNumber">
				<view style="font-size: 30rpx;font-weight: 700;margin-right: 20rpx; width: 150rpx;">
					拿货件数
				</view>
				<view>
					<uni-number-box :max="999999999999" v-model="formData.takeGoodNum"></uni-number-box>
					<!-- <input v-model="formData.takeGoodNum" placeholder="请输入拿货件数" type="number"
						class="takegoodsNumber"></input> -->
				</view>
			</view>
			<view class="selectMark">
				<view class="selectMark_text" style="width: 30%;">
					是否加急
				</view>
				<view class="iswitch">
					<switch :checked="urgent" @change="switchChange" />
				</view>
			</view>
		</view>
		<view class="selectMark" style="width: 100%;">
			<view style="width: 150rpx; margin-left: 10rpx;">留言：</view>
			<view style="width: 80%;">
				<textarea style="border: 1rpx solid #eee; padding: 10rpx 20rpx; border-radius: 20rpx;  width: 80%;"
					type="text" />
			</view>
		</view>
		<!-- 没有找到对应的市场档口 -->
		<view class="selectMark messageBox">
			<view class="isMessage">
				<view style="margin:150rpx 0 30rpx 0;">没有找到市场档口？</view>
				<view>
					<button>手动输入市场档口</button>
				</view>
			</view>
		</view>
		<!-- 底部提交按钮 -->
		<view class="subButtom">
			<view>
				<text>金额：</text>
				<text>{{price}}元</text>
			</view>
			<view>
				<button @click="subMit" style="margin-top: 5rpx;">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import KJUR from 'jsrsasign';
	import {
		getCode,
		http,
		wxPay
	} from '../../utils/http'
	export default {
		data() {
			return {
				marketList: [],
				formData: {
					urgent: false,
					takeGoodNum: 0,
					remarks: '',
					images: [],
					stall: {}
				},
				value: 0,
				stall_value: 0,
				stalls: [],
				urgent: false,
				price: 15,
				marketId: 0
			}
		},
		onLoad() {
			this.getMarkerList(wx.getStorageSync('user').token)
		},
		onShow() {
			this.getMarkerList(wx.getStorageSync('user').token)
		},
		methods: {
			//提交
			subMit() {
				if (this.formData.stall.ID === undefined) {
					return uni.showToast({
						title: '请选择档口'
					})
				}
				if (this.formData.takeGoodNum === 0) {
					return uni.showToast({
						title: '请输入拿货件数'
					})
				}
				this.formData.images = JSON.stringify(this.formData.images)
				http.request({
					url: 'gb/createGoodBill',
					method: 'POST',
					header: {
						"x-token": wx.getStorageSync('user').token
					},
					data: {
						...this.formData
					}
				}).then(res => {
					if (res.data.code === 0) {
						uni.switchTab({
							url: '/pages/home/home'
						})
					}
				})
			},
			// 加急？
			switchChange(e) {
				this.urgent = e.detail.value
			},
			getStall(e) {
				http.request({
					url: 'stall/getStallList',
					method: 'GET',
					params: {
						page: 1,
						pageSize: 10,
						stallNumber: e,
						marketId: this.marketId
					},
					header: {
						"x-token": wx.getStorageSync('user').token
					}
				}).then(res => {
					this.formData.stall = res.data.data.list[0]
				})
			},
			// 通过选择市场获取对应的档口
			changeOfMarket(e) {
				this.marketId = e
				http.request({
					url: 'stall/getStallList',
					method: 'GET',
					data: {
						page: 1,
						pageSize: 10000,
						marketId: e
					},
					header: {
						"x-token": wx.getStorageSync('user').token
					}
				}).then(res => {
					this.stalls = res.data.data.list.map(item => ({
						text: item.stall,
						value: item.stallNumber
					}));
				})
			},
			// 获取市场列表
			getMarkerList(token) {
				http.request({
					url: '/market/getMarketList',
					method: 'GET',
					data: {
						page: 1,
						pageSize: 10000,
					},
					header: {
						"x-token": token
					}
				}).then(res => {
					this.marketList = res.data.data.list.map(item => ({
						text: item.marketName,
						value: item.ID
					}));
				}).catch(err => {
					console.log(err, '失败');
				})
			},
		}
	}
</script>

<style lang="scss">
	.takegoodsNumber {
		height: 100rpx;
		display: flex;
		padding: 20rpx 50rpx;
	}

	.iswitch {
		width: 70%;
		height: 120rpx;
		padding-top: 10rpx;
	}

	.subButtom {
		width: 80%;
		height: 80rpx;
		padding: 0 80rpx 20rpx 80rpx;
		background-color: #55aa00;
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 0;
		line-height: 80rpx;
		z-index: 10;

		view {
			margin-top: 15rpx;
			align-self: center;

			text:last-child {
				color: red;
				font-size: 40rpx;
				font-weight: 700;
				line-height: 90rpx;
			}

		}


	}

	.messageBox {
		width: 80%;
		margin-top: 80rpx;

		.isMessage {
			justify-content: center;
			width: 100%;
			padding-left: 30rpx;
			text-align: center;
		}
	}

	.selectMark {
		padding: 20rpx 50rpx;
		display: flex;
		height: 100rpx;
	}

	.hander {
		margin: 10rpx;
	}

	.selectMark_select {
		flex: 1;
		height: 80rpx;
		align-self: center;
		margin: 0 0 0 20rpx;

		uni-data-select {
			font-size: 40rpx;
			height: 80rpx;
		}
	}

	.selectMark_text {
		line-height: 90rpx;
		width: 150rpx;
		// margin-bottom: 30rpx;
		font-size: 30rpx;
		font-weight: 700;
		// color: #ffaa00;
	}
</style>