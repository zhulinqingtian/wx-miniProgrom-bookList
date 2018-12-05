var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    HarvestInfo: { // 收货人信息
      HarvestAddress: '', // 收获地址，没有选择地址时，默认显示默认地址，没有默认地址时，显示第一个地址
      HarvestName: '',
      HarvestTel: ''
    },
    addr_id: '', // 已经选择的地址id
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
    var totalCommodity = options.totalCommodity,
      totalAmount = options.totalAmount,
      selectedIds = options.ids || options.selectedIds,
      addr_id = options.addr_id;

    if (totalCommodity !== '' && totalCommodity !== 'undefined' && totalCommodity !== undefined) {
      this.setData({ totalCommodity});
    }
    if (totalAmount !== '' && totalAmount !== 'undefined' && totalAmount !== undefined) {
      this.setData({ totalAmount });
    }

    if (selectedIds !== '' && selectedIds !== 'undefined' && selectedIds !== undefined) {
      this.setData({ selectedIds });
    }

    if (addr_id !== '' && addr_id !== 'undefined' && addr_id !== undefined) {
      this.setData({ addr_id });
    }

    this.setData({ realPay: parseFloat(this.data.totalAmount) + parseFloat(this.data.carriage)});

    this.getHarvestInfo();
    this.getBuyList(selectedIds);
  },


  /**
   * 获取收货地址
   */
  getHarvestInfo() {
    var _this = this,
      list = app.globalData.addressList,
      item = {};

    if (!list.length) {
      return;
    }

    var addr_id = this.data.addr_id;
    if (addr_id) { // 已经选择了地址
      list.forEach(function (v) {
        if (v.id == addr_id) {
          item = v;
          return;
        }
      });

    } else {
      // 没有选择地址时，有默认地址时使用默认地址，没有默认地址时使用地址列表中第一个地址

      list.forEach(function (v) {
        if (v.isDefault) { // 有默认地址
          item = v;
        }
      });

      // 没有默认地址
      if (JSON.stringify(item) == '{}') {
        item = list[0];
      }
    }

    this.setData({ 'HarvestInfo.HarvestAddress': item.province + '-' + item.city + '-' + item.area + ' ' + item.address_details});
    this.setData({ 'HarvestInfo.HarvestName': item.consigneeName });
    this.setData({ 'HarvestInfo.HarvestTel': item.tel });
  },

  /**
   * 去地址列表页选取地址
   */

  toAddressPage() {
    wx.navigateTo({
      url: '../address/address?selectedIds=' + this.data.selectedIds,
    })
  },
  /**
   * 获取购买列表
   */
  getBuyList(ids) {
    if (!ids) {
      return;
    }
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