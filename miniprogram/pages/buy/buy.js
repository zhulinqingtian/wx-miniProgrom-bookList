var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    HarvestAddress: '', // 收获地址，默认显示默认地址，没有默认地址时，显示第一个地址
    HarvestName: '',
    HarvestTel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHarvestAddress();
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
   * 获取收货地址
   */
  getHarvestAddress() {
    var _this = this,
      list = app.globalData.addressList,
      item = {};

    if (!list.length) {
      return;
    }

    list.forEach(function (v) {
      if (v.isDefault) {
        // 有默认地址
        item = v;
      }
    });

    // 没有默认地址
    if (JSON.stringify(item) == '{}') {
      item = list[0];
    }

    _this.setData({ HarvestAddress: item.province + '-' + item.city + '-' + item.area + ' ' + item.address_details, HarvestName: item.consigneeName, HarvestTel: item.tel});
  },

  /**
   * 去地址列表页选取地址
   */

  toAddressPage() {
    wx.navigateTo({
      url: '../address/address',
    })
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