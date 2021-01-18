// pages/edit/edit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    icon_page: 1,
    zhfont_page: 1,
    enfont_page: 1,
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
    filePath:'',
    enfontcolor: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('....', options);
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
    });
    console.log(this.data.rgb);
  },

  bindinputzh(e) {
    this.setData({
      sname: e.detail.value
    });
  },

  chengeName() {
    tt.showLoading({
      title: '生成中...'
    });
    let that = this;
    tt.request({
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
          tt.showModal({
            content: '因相关法律和要求，相关搜索结果不予展示'
          });
          tt.hideLoading();
        } else {
          that.setData({
            name: that.data.sname ? that.data.sname : that.data.name
          });
        }
      }

    });
  },

  chengeEnName() {
    tt.showLoading({
      title: '生成中...'
    });
    let that = this;
    tt.request({
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
          tt.showModal({
            content: '因相关法律和要求，相关搜索结果不予展示'
          });
          tt.hideLoading();
        } else {
          that.setData({
            enname: that.data.senname ? that.data.senname : that.data.enname
          });
        }
      }

    });
  },

  bindinputen(e) {
    this.setData({
      senname: e.detail.value
    });
  },

  bindloads() {
    console.log('....bindloads...');
    tt.hideLoading();
  },

  downs(e) {
    var url = e.target.dataset.id;
    let that = this
    tt.showLoading({
      title: '下载中...'
    });
    tt.downloadFile({
      url: url,
      //下载资源的地址网络
      success: function (res) {
        // console.log(res)
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          that.setData({
            filePath: res.tempFilePath
          });
        } // 保存图片到本地


        tt.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            // console.log(data);
            tt.showModal({
              title: '下载成功',
              content: 'LOGO图片已经保存至您的手机'
            });
            tt.hideLoading();
          }
        });
      }
    });
  },

  metalFn() {
    this.setData({
      fontListFlag: false,
      metalFlag: false
    });
  },

  metalEnFn() {
    this.setData({
      fontListEnFlag: false,
      metalEnFlag: false
    });
  },

  showZhFontList() {
    console.log('.showZhFontList..');
    tt.showLoading({
      title: '加载中...'
    });
    this.setData({
      listArr: [],
      fontListFlag: true,
      metalFlag: true
    });
    let that = this;
    tt.request({
      url: getApp().globalData.apis + 'list_zhfont.php?page=1',
      method: 'get',
      dataType: 'json',

      success(res) {
        console.log('....res.data.result...', res.data.result);
        that.setData({
          listArr: res.data.result
        });
        tt.hideLoading();
      }

    });
  },

  showEnFontList() {
    console.log('.showEnFontList..');
    tt.showLoading({
      title: '加载中...'
    });
    this.setData({
      fontListEnFlag: true,
      metalEnFlag: true
    });
    let that = this;
    tt.request({
      url: getApp().globalData.apis + 'list_enfont.php?page=1',
      method: 'get',
      dataType: 'json',

      success(res) {
        console.log('....res.data.result.en..', res.data.result);
        that.setData({
          listEnArr: res.data.result
        });
        tt.hideLoading();
      }

    });
  },

  fontListSelect(e) {
    tt.showLoading({
      title: '生成中...'
    });
    this.setData({
      zhfont: e.target.dataset.downpath
    });
  },

  fontListEnSelect(e) {
    tt.showLoading({
      title: '生成中...'
    });
    this.setData({
      enfont: e.target.dataset.downpath
    });
  },

  toPick: function () {
    this.setData({
      pick: true
    });
  },
  toPickEn: function () {
    this.setData({
      pickEn: true
    });
  },
  toPickBg: function () {
    this.setData({
      pickBg: true
    });
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
    tt.showLoading({
      title: '生成中...'
    });
    this.setData({
      bgcolor: this.colorRGB2Hex(e.detail.color),
      bgrgb: e.detail.color
    });
  },

  pickColor(e) {
    tt.showLoading({
      title: '生成中...'
    });
    this.setData({
      zhfontcolor: this.colorRGB2Hex(e.detail.color),
      rgb: e.detail.color
    });
  },

  pickEnColor(e) {
    tt.showLoading({
      title: '生成中...'
    });
    this.setData({
      enfontcolor: this.colorRGB2Hex(e.detail.color),
      enrgb: e.detail.color
    });
  },

  showIconList() {
    tt.showLoading({
      title: '加载中...'
    });
    this.setData({
      fontListIconFlag: true,
      metalIconFlag: true
    });
    let that = this;
    tt.request({
      url: getApp().globalData.apis + 'list_icon.php?page=1',
      method: 'get',
      dataType: 'json',

      success(res) {
        console.log('....res.data.result.en..', res.data.result);
        that.setData({
          listIconArr: res.data.result
        });
        tt.hideLoading();
      }

    });
  },

  fontListIconSelect(e) {
    tt.showLoading({
      title: '生成中...'
    });
    this.setData({
      icon: e.target.dataset.icon
    });
  },

  metalIconFn() {
    this.setData({
      fontListIconFlag: false,
      metalIconFlag: false
    });
  },

  scrolltolowerLoadIconData(e) {
    tt.showLoading({
      title: '加载中'
    });
    let that = this;
    this.setData({
      icon_page: that.data.icon_page + 1
    });
    tt.request({
      url: getApp().globalData.apis + 'list_icon.php?page=' + that.data.icon_page,
      method: 'GET',
      dataType: 'json',
      success: json => {
        let _arr = this.data.listIconArr;
        _arr = _arr.concat(json.data.result);
        console.log('__arr__', _arr);
        that.setData({
          listIconArr: _arr
        });
        tt.hideLoading();
      }
    });
  },

  scrolltolowerLoadZhfontData(e) {
    tt.showLoading({
      title: '加载中'
    });
    let that = this;
    this.setData({
      zhfont_page: that.data.zhfont_page + 1
    });
    tt.request({
      url: getApp().globalData.apis + 'list_zhfont.php?page=' + that.data.zhfont_page,
      method: 'GET',
      dataType: 'json',
      success: json => {
        let _arr = this.data.listArr;
        _arr = _arr.concat(json.data.result);
        console.log('__arr__', _arr);
        that.setData({
          listArr: _arr
        });
        tt.hideLoading();
      }
    });
  },

  scrolltolowerLoadEnfontData(e) {
    tt.showLoading({
      title: '加载中'
    });
    let that = this;
    this.setData({
      enfont_page: that.data.enfont_page + 1
    });
    tt.request({
      url: getApp().globalData.apis + 'list_enfont.php?page=' + that.data.enfont_page,
      method: 'GET',
      dataType: 'json',
      success: json => {
        let _arr = this.data.listEnArr;
        _arr = _arr.concat(json.data.result);
        console.log('__arr__', _arr);
        that.setData({
          listEnArr: _arr
        });
        tt.hideLoading();
      }
    });
  }

});