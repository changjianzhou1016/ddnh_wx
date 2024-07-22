const DetectionToken = function(token) {
	if (token == undefined) {
		console.log('没有token');
		uni.navigateTo({
			url: '/pages/index/index'
		})
	}
}
export {
	DetectionToken
}