var app = getApp();

Page({
  data: {
    addressListData: []
  },
  onLoad() {
    this.getAddressList();
  },
  getAddressList() {
    var data = app.globalData.addressList;
    this.setData({ addressListData: data});
  },
  // 设置默认地址
  selectedAddress(e) {
    var dataset = e.target.dataset;
    var id = dataset.id;
    var isDefault = dataset.isdefault;
    var data = this.data.addressListData;
    var title = '';

    if (!data.length) {
      return;
    }

    // 当前地址要设置默认时，先全部变为false， 再给当前设置为true
    if (!isDefault) {
      data.forEach(function (v) {
        v.isDefault = false;
      });
    }

    data.forEach(function (v) {
      if (v.id == id) {
        if (isDefault) {
          title = '取消成功';
        } else{
          title = '设置成功';
        }
        v.isDefault = !v.isDefault;
      }
    });

    this.setData({ addressListData: data});
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 1000
    })
  }
});