//index.js
//获取应用实例
const app = getApp();
Page({
  onShareAppMessage(option) {
    return {
      title: '一键免费生成高端LOGO',
      desc: '免费的LOGO在线设计制作工具',
      imageUrl: '/images/index.jpg'
    };
  },

  onShareTimeline: () => {
    return {
      title: '一键免费生成高端LOGO',
      query: "",
      imageUrl: '/images/index.jpg'
    };
  },
  onLoad: function () {
    tt.showLoading({
      title: '加载中...'
    });
    this.getListData();
    tt.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeLine']
    });
  },

  formSubmit(e) {
    if (e.detail.value.name == '') {
      tt.showModal({
        content: '请输入品牌的中文名称',
        confirmColor: 'orangered'
      });
    } else if (e.detail.value.enname == '') {
      tt.showModal({
        content: '请输入品牌的英文简称',
        confirmColor: 'orangered'
      });
    } else {
      tt.showLoading({
        title: '加载中...'
      });
      tt.request({
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
          console.log('---res---', res.data, res.data === 1);

          if (res.data === 1) {
            tt.showModal({
              content: '因相关法律和要求，相关搜索结果不予展示'
            });
            tt.hideLoading();
          } else {
            tt.navigateTo({
              url: '/pages/list/list?name=' + e.detail.value.name + '&enname=' + e.detail.value.enname
            });
          }
        }

      });
    }
  },

  getListData: function () {
    let that = this;
    tt.request({
      url: getApp().globalData.aishouxie_apiRoot + 'wx61c437bbdea20c24/list.php?getJson=shopindexlist',
      method: 'GET',
      dataType: 'json',
      success: json => {
        if (json.data.status == 1) {
          that.setData({
            newArray: json.data.result
          });
          tt.hideLoading();
        }
      }
    });
  }
});