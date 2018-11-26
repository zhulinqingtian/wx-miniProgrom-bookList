var app = getApp();

Page({
  data: {
    totalAmount: 0,
    cartData: app.globalData.listData,
    toBuyList: [],
    colorMap: {}
  },
  onLoad() {
    this.createIcon();
  },
  countAmount(e) {
    var id = e.target.dataset.id; // 当前元素的id 或者 data-id 属性
    var value = e.detail.value; // input的值
    if (value <= 0) {
      return wx.showToast({
        title: '数量不能低于0',
        icon: 'warn',
        duration: 1000
      });
    }
  },
  changeStatus(e) {
    var dataset = e.target.dataset;
    var id = dataset.id;
    var status = dataset.status;
  },
  addCollection(e) {
    var id = e.target.dataset.id; // 当前元素的id 或者 data-id 属性
    var value = e.detail.value; // input的值

    app.globalData.listData.forEach(function(v, i) {
      if (v.id == id) {
        var addNumber = app.globalData.listData[i].addNumber;
        app.globalData.listData[i].addNumber = addNumber + 1;
        return;
      }
    });

    this.setData({cartData: app.globalData.listData});
  },
  reduceCollection(e) {
    var id = e.target.dataset.id; // 当前元素的id 或者 data-id 属性
    var value = e.detail.value; // input的值

    app.globalData.listData.forEach(function (v, i) {
      if (v.id == id) {
        var addNumber = app.globalData.listData[i].addNumber;
        if (addNumber) {
          app.globalData.listData[i].addNumber = addNumber - 1;
        }
        return;
      }
    });

    this.setData({ cartData: app.globalData.listData });
  },
  addToBuyList(e) {
    var index = e.target.dataset.index;
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    var price = e.target.dataset.price;
    var addNumber = e.target.dataset.addNumber;
    var color = e.target.dataset.color;

    if (color == '#666') {
      color = '#3596fc';
    } else {
      color = '#666'
    }
    this.updateIcon(index, color);

    var arr = this.data.toBuyList;

    this.setData({ toBuyList: []});

    arr.push({id, name, price, addNumber});

    this.setData({ toBuyList: arr });
    this.countTotalAmount();
  },
  countTotalAmount() {
    var total = 0;
    if (!this.data.toBuyList.length) {
      return total = 0;
    }
    this.data.toBuyList.forEach(function(v) {
      total = total + (v.price * v.addNumber);
    });

    this.setData({ totalAmount: total});
  },
  createIcon() {
    var _this = this;
    this.data.cartData.forEach(function(v, i) {
      _this.data.colorMap[i] = '#666'
    });
  },
  updateIcon(index, color) {
    this.setData({ 'colorMap[index]': color});
  }
});