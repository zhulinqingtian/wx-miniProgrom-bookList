var app = getApp();

Page({
  data: {
    addressListData: [],
    manageAddressList: false,
    selectedIds: '' // 从buy页面跳转过来，修改地址，selectedIds： 已经选中的商品
  },
  onLoad(options) {
    this.getAddressList();

    // 从buy页面跳转过来，修改收货地址，selectedIds： 已经选中的商品
    if (options.selectedIds) {
      this.setData({ selectedIds: options.selectedIds });
    }
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
    app.showToast(title);
  },
  // 管理地址
  manageList() {
    var flag = this.data.manageAddressList;
    this.setData({ manageAddressList: !flag});
  },
  // 删除地址
  delOneItem(e) {
    var id = e.target.dataset.id;
    var data = app.globalData.addressList;

    data.forEach(function(v, i) {
      if (v.id == id) {
        data.splice(i, 1);
      }
    });

    app.globalData.addressList = data;
    this.setData({ addressListData: data});
    app.showToast('删除成功');
  },
  // 编辑地址
  updateItem(e) {
    wx.navigateTo({
      url: '../addAddress/addAddress?id=' + e.target.dataset.id,
    })
  }
});