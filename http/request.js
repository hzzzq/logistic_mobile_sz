let baseUrl = 'http://43.139.85.16:8089'

// import store from '../store/index.js'
let methods = {
	get(url, params) {
		uni.showLoading({
			title: '加载中...'
		})
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: "GET",
				data: params,
				header: {
				    //返回数据类型
				    // "content-type":" application/json; charset=utf-8",
				    //设置用户访问的token信息
				    "token": uni.getStorageSync('token'),
				},
				success: (res) => {
					if (res.data.code != 200) {
						uni.hideLoading()
						// uni.showToast({
						// 	title: res.data.data.err,
						// 	icon: 'none',
						// 	duration:1000
						// })
					}
					uni.hideLoading()
					resolve(res)
				},
				fail: (err) => {
					uni.hideLoading()
					reject(err)
				}
			})
		})
	},
	post(url, params) {
		uni.showLoading({
			title: '加载中...'
		})
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: 'POST',
				data: params,
				header: {
				    //设置用户访问的token信息
				    "token": uni.getStorageSync('token'),
				},
				success: (res) => {
					if (res.data.code != 200) {
						uni.hideLoading();
						// uni.showToast({
						// 	title: res.data.data.err,
						// 	icon: 'none'
						// })
					}
					uni.hideLoading();
					resolve(res)
				},
				fail: (err) => {
					console.log(err)
					uni.hideLoading();
					reject(err)
				}
			})
		})
	},
	put(url, params) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: 'PUT',
				data: params,
				header: {
				    //返回数据类型
				    "content-type":" application/json; charset=utf-8",
				    //设置用户访问的token信息
				    "token": uni.getStorageSync('token'),
				},
				success: (res) => {
					if (res.data.code != 200) {
						// uni.showToast({
						// 	title: res.data.extend.err,
						// 	icon: 'none'
						// })
					}
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	},
	delete(url, params) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: 'DELETE',
				data: params,
				header: {
				    //返回数据类型
				    "content-type":" application/json; charset=utf-8",
				    //设置用户访问的token信息
				    "token": uni.getStorageSync('token'),
				},
				success: (res) => {
					if (res.data.code != 200) {
						// uni.showToast({
						// 	title: res.data.extend.err,
						// 	icon: 'none'
						// })
					}
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
}

export default methods
