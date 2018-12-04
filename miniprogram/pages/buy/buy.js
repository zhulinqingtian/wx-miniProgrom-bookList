var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    HarvestAddress: '', // 收获地址，默认显示默认地址，没有默认地址时，显示第一个地址
    HarvestName: '',
    HarvestTel: '',
    totalCommodity: 0,
    totalAmount: 0,
    selectedIds: '',
    carriage: 5.00,
    realPay: 0,
    buyList: [],
    listData: app.globalData.listData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      totalCommodity: options.totalCommodity || 0,
      totalAmount: options.totalAmount || 0,
      selectedIds: options.ids
    });
    this.setData({ realPay: parseFloat(this.data.totalAmount) + parseFloat(this.data.carriage)});

    this.getHarvestAddress();
    this.getBuyList(options.ids);
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
   * 获取购买列表
   */
  getBuyList(ids) {
    if (ids) {
      ids = ids.split(',');
    }

    var data = this.data.listData;

    var selectedData = data.filter(function (v) {
      return ids.indexOf(v.id) > -1;
    });

    this.setData({ buyList: selectedData});
  },

  /**
   * 查看详情
   */
  toViewDetail(e) {
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../book-detail/book-detail?id=' + id,
    })
  },

  /**
   * 去支付
   */
  toPay() {
    wx.navigateTo({
      url: '../payMethod/payMethod',
    })
  }
})