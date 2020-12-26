// pages/list/list.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		baseUrl: getApp().globalData.apis,
		name: '',
		enname: '',
		listArr: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showLoading({
			title: '加载中...'
		});
		let that = this
		this.setData({
			name: options.name,
			enname: options.enname
		})
		wx.request({
			url: getApp().globalData.apis + 'list.php',
			method: 'get',
			dataType: 'json',
			success(res) {
				that.setData({
					listArr: res.data.result
				})
				wx.hideLoading()
			}
		})
	},
	edits(e) {
		console.log('....e....', e.target.dataset.id)
		wx.navigateTo({
			url: '/pages/edit/edit' + e.target.dataset.id
		})
	},
	downs(e) {
		var url = e.target.dataset.id
		wx.downloadFile({
			url: url, //下载资源的地址网络
			success: function (res) {
				console.log(res)
				// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
				if (res.statusCode === 200) {
					wx.playVoice({
						filePath: res.tempFilePath
					})
				}
				// 保存图片到本地
				wx.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success: function (data) {
						//console.log(data);
						wx.showModal({
							title: '下载成功',
							content: 'LOGO图片已经保存至您的手机',
						})
					},
				})
			}
		})

	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})