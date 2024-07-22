// import Request from "luch-request"

// const http = new Request({
// 	baseURL: 'http://47.120.78.41:8888'
// })
// export http

import Request from "luch-request"
export const baseURL = 'http://127.0.0.1:8888/'
const http = new Request({
	baseURL: baseURL

})
const wxPay = new Request({
	baseURL: 'https://api.mch.weixin.qq.com/'
})

const getCode = new Request({
	baseURL: 'https://api.weixin.qq.com/'
})
export {
	http,
	wxPay,
	getCode
}