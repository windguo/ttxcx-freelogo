// pages/edit/edit.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		rgb: 'rgb(16, 104, 172)',
		enrgb: 'rgb(16, 104, 172)',
		bgrgb: 'rgb(255, 255, 255)',
		pick: false,
		pickEn: false,
		pickBg: false,
		metalFlag: false,
		fontListFlag: false,
		metalEnFlag: false,
		fontListEnFlag: false,
		listArr: [],
		listIconArr: [],
		listEnArr: [],
		baseUrl: getApp().globalData.apis,
		root_apis: getApp().globalData.root_apis,
		sname: '',
		id: '',
		name: '',
		enname: '',
		icon: '',
		bgcolor: '',
		zhfont: '',
		enfont: '',
		zhfontcolor: '',
		enfontcolor: ''
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log('....', options)
		this.setData({
			id: options.id,
			name: options.name ? options.name : '品牌名称',
			icon: options.icon,
			enname: options.enname,
			icon: options.icon,
			zhfont: options.zhfont,
			enfont: options.enfont,
			bgcolor: options.bgcolor,
			zhfontcolor: options.zhfontcolor,
			rgb: this.hexToRgba('#' + options.zhfontcolor),
			enrgb: this.hexToRgba('#' + options.enfontcolor),
			enfontcolor: options.enfontcolor
		})
		console.log(this.data.rgb)
	},
	bindinputzh(e) {
		this.setData({
			sname: e.detail.value
		});
	},
	chengeName() {
		wx.showLoading({
			title: '生成中...',
		})
		let that = this
		wx.request({
			url: getApp().globalData.apis + 'checkProb.php',
			method: 'POST',
			dataType: 'json',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			data: {
				name: this.data.sname
			},
			success(res) {
				if (res.data === 1) {
					wx.showModal({
						content: '因相关法律和要求，相关搜索结果不予展示',
					})
					wx.hideLoading()
				} else {
					that.setData({
						name: that.data.sname ? that.data.sname : that.data.name
					});
				}
			}
		})

	},
	chengeEnName() {
		wx.showLoading({
			title: '生成中...',
		})
		let that = this
		wx.request({
			url: getApp().globalData.apis + 'checkProb.php',
			method: 'POST',
			dataType: 'json',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			data: {
				name: this.data.senname
			},
			success(res) {
				if (res.data === 1) {
					wx.showModal({
						content: '因相关法律和要求，相关搜索结果不予展示',
					})
					wx.hideLoading()
				} else {
					that.setData({
						enname: that.data.senname ? that.data.senname : that.data.enname
					});
				}
			}
		})

	},
	bindinputen(e) {
		this.setData({
			senname: e.detail.value
		});
	},
	bindloads() {
		console.log('....bindloads...')
		wx.hideLoading()
	},
	downs(e) {
		var url = e.target.dataset.id
		wx.showLoading({
			title: '下载中...',
		})
		wx.downloadFile({
			url: url, //下载资源的地址网络
			success: function (res) {
				// console.log(res)
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
							content: 'LOGO图片已经保存至您的手机'
						})
						wx.hideLoading()
					},
				})
			}
		})
	},
	metalFn() {
		this.setData({
			fontListFlag: false,
			metalFlag: false
		})
	},
	metalEnFn() {
		this.setData({
			fontListEnFlag: false,
			metalEnFlag: false
		})
	},
	showZhFontList() {
		console.log('.showZhFontList..')
		wx.showLoading({
			title: '加载中...',
		})
		this.setData({
			listArr: [],
			fontListFlag: true,
			metalFlag: true
		})
		let that = this
		wx.request({
			url: getApp().globalData.apis + 'zhfontlist.php',
			method: 'get',
			dataType: 'json',
			success(res) {
				console.log('....res.data.result...', res.data.result)
				that.setData({
					listArr: res.data.result
				})
				wx.hideLoading()
			}
		})
	},
	showEnFontList() {
		console.log('.showEnFontList..')
		wx.showLoading({
			title: '加载中...',
		})
		this.setData({
			fontListEnFlag: true,
			metalEnFlag: true
		})
		let that = this
		wx.request({
			url: getApp().globalData.apis + 'enfontlist.php',
			method: 'get',
			dataType: 'json',
			success(res) {
				console.log('....res.data.result.en..', res.data.result)
				that.setData({
					listEnArr: res.data.result
				})
				wx.hideLoading()
			}
		})
	},
	fontListSelect(e) {
		wx.showLoading({
			title: '生成中...',
		})
		this.setData({
			zhfont: e.target.dataset.downpath
		})
	},
	fontListEnSelect(e) {
		wx.showLoading({
			title: '生成中...',
		})
		this.setData({
			enfont: e.target.dataset.downpath
		})
	},
	toPick: function () {
		this.setData({
			pick: true
		})
	},
	toPickEn: function () {
		this.setData({
			pickEn: true
		})
	},
	toPickBg: function () {
		this.setData({
			pickBg: true
		})
	},
	colorRGB2Hex(color) {
		var rgb = color.split(',');
		var r = parseInt(rgb[0].split('(')[1]);
		var g = parseInt(rgb[1]);
		var b = parseInt(rgb[2].split(')')[0]);

		var hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		return hex;
	},
	hexToRgba: function (hex) {
		return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + ")";
	},
	pickBgColor(e) {
		wx.showLoading({
			title: '生成中...',
		})
		this.setData({
			bgcolor: this.colorRGB2Hex(e.detail.color),
			bgrgb: e.detail.color
		})
	},
	pickColor(e) {
		wx.showLoading({
			title: '生成中...',
		})
		this.setData({
			zhfontcolor: this.colorRGB2Hex(e.detail.color),
			rgb: e.detail.color
		})
	},
	pickEnColor(e) {
		wx.showLoading({
			title: '生成中...',
		})
		this.setData({
			enfontcolor: this.colorRGB2Hex(e.detail.color),
			enrgb: e.detail.color
		})
	},
	showIconList() {
		wx.showLoading({
			title: '加载中...',
		})
		this.setData({
			fontListIconFlag: true,
			metalIconFlag: true
		})
		let that = this
		wx.request({
			url: getApp().globalData.apis + 'icon.php',
			method: 'get',
			dataType: 'json',
			success(res) {
				console.log('....res.data.result.en..', res.data.result)
				that.setData({
					listIconArr: res.data.result
				})
				wx.hideLoading()
			}
		})
	},
	fontListIconSelect(e) {
		wx.showLoading({
			title: '生成中...',
		})
		this.setData({
			icon: e.target.dataset.icon
		})
	},
	metalIconFn() {
		this.setData({
			fontListIconFlag: false,
			metalIconFlag: false
		})
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})