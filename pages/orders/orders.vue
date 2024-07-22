<template>
	<view>

	</view>
</template>

<script>
	import {
		DetectionToken
	} from '../../utils/DetectionToken';
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// DetectionToken()
			// DetectionToken(wx.getStorageSync('user').token)
			// console.log();
		},
		onShow() {
			// this.user = wx.getStorageSync('user').user
			DetectionToken(wx.getStorageSync('user').token)
		},
		methods: {

		}
	}
</script>

<style>

</style>