//index.js
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage(option) {
    return {
      title: '一键免费生成高端LOGO',
      desc: '免费的LOGO在线设计制作工具',
      imageUrl: '/images/index.jpg'
    }
  },
  onShareTimeline: () => {
    return {
      title: '一键免费生成高端LOGO',
      query: "",
      imageUrl: '/images/index.jpg'
    }
  },
  onLoad: function () {
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeLine']
    })
  },
  formSubmit(e) {
    if (e.detail.value.name == '') {
      wx.showModal({
        content: '请输入品牌的中文名称',
        confirmColor: 'orangered'
      })
    } else if (e.detail.value.enname == '') {
      wx.showModal({
        content: '请输入品牌的英文简称',
        confirmColor: 'orangered'
      })
    } else {
      wx.showLoading({
        title: '加载中...'
      });
      wx.request({
        url: getApp().globalData.apis + 'checkProb.php',
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          name: e.detail.value.name,
          enname: e.detail.value.enname
        },
        success(res) {
          console.log('---res---', res.data, res.data === 1)
          if (res.data === 1) {
            wx.showModal({
              content: '因相关法律和要求，相关搜索结果不予展示',
            })
            wx.hideLoading()
          } else {
            wx.navigateTo({
              url: '/pages/list/list?name=' + e.detail.value.name + '&enname=' + e.detail.value.enname
            })
          }
        }
      })

    }
  }
})