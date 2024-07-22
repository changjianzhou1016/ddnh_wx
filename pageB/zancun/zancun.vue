<template>
	<view style="width: 100%;">
		新增订单

		<view style="width: 100%;text-align: center;">
			<text>
				-----------------------------------------------------------
			</text>
		</view>
		<view class="picker_row">
			<picker mode="multiSelector" class="selectSty" :range="processedData" :value='value' :range-key="marketName"
				@columnchange="changeBooth" @change="change">
				<view>
					{{value[0] == null? '请先选择市场' : marketList[0][value[0]].marketName}}--{{value[1] == null? '请先选择档口' :marketList[1][value[1]].stall}}
				</view>
			</picker>
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
				value: [null, null],
				user: '',
				marketList: [
					[],
					[]
				],
				selected: [0, 0],
				processedData: [
					[],
					[]
				]
			}
		},
		onLoad: async function() {
			this.user = wx.getStorageSync('user')

			await this.getMarketList().then(res => {
				this.marketList[0] = res.data.data.list
				this.getBooth(this.marketList[0][0].ID)
				// console.log(this.marketList);

			})
		},
		methods: {
			change(e) {

				// console.log(e.detail.value[0], e.detail.value[1])
				// console.log(this.marketList[0][e.detail.value[0]]);
				if (e.detail.value[1] == null) {
					console.log(e);
				} else {

					// console.log(this.marketList[1][e.detail.value[1]]);
				}
			},
			changeTitle() {
				this.processedData = [
					[],
					[]
				]
				this.processedData[0] = this.marketList[0].map(item =>
						item.marketName), // 第一级显示marketName
					this.processedData[1] = this.marketList[1].map(item => item.stall)
				// this.marketList[1].map(item => this.processedData[1].marketName = item.stall) // 第二级显示stall

				console.log(this.processedData);
			},
			// 通过选择器变化的值转化内容
			changeBooth(e) {
				// console.log(this.value);
				if (e.detail.column === 0) {
					this.value[0] = e.detail.value
					this.getBooth(this.marketList[0][e.target.value].ID)
				} else if (e.detail.column === 1) {
					console.log(e.detail.value);
					this.value[e.detail.column] = e.detail.value
				}
			},
			// 获取市场列表
			async getMarketList(res) {
				res = await http.request({
					url: 'market/getMarketList',
					method: 'GET',
					data: {
						page: 1,
						pageSize: 100000
					},
					header: {
						'x-token': this.user.token
					}
				})
				return res
			},
			// 根据对应市场获取档口   默认第一个市场
			async getBooth(e) {
				http.request({
					url: 'stall/getStallList',
					method: 'GET',
					data: {
						page: 1,
						pageSize: 10000000000,
						marketId: e
					},
					header: {
						'x-token': this.user.token
					}
				}).then(res => {
					this.marketList[1] = res.data.data.list
					this.changeTitle()
					// console.log(this.marketList);
				})
			}
		}
	}
</script>

<style>
	.selectSty {
		border: 1rpx solid #00007f;
		text-align: center;
		width: 100%;
		height: 80rpx;
		font-size: 30rpx;
		font-weight: 700;
		line-height: 80rpx;
		background-color: pink;
		border-radius: 30rpx;
		margin: 20rpx;
	}

	.picker_row {
		/* padding: 20rpx 200rpx 20rpx 20rpx; */
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
	}
</style>