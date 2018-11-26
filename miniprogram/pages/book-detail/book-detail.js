var app = getApp();

Page({
  data: {
    httpLink: 'http://www.cread.com/catalog/246037.html',
    currentId: '',
    currentBook: {},
    listData: app.globalData.listData,
    collectBtnType: 'default',
    btnType: ['default', 'success', 'warn']
  },
  // 页面登陆事件
  onLoad(option) {
    var id = option.id; // 当前书籍的id
    this.setData({
      currentId: id
    });

    var _this = this;
    if (this.data.listData.length) {
      this.data.listData.forEach(function (v) {
        if (v.id === _this.data.currentId) {
          _this.setData({currentBook: v});
          return;
        }
      });
    }
  },
  addCart() {
    // 改变全局变量
    // 改变currentBook.addNumber
    var _this = this;
    var currentBook = _this.data.currentBook;
    var title = '', typeIcon = '';

    if (!app.globalData.cartData || !app.globalData.cartData.length) {

      this.setData({'currentBook.addNumber': 1});

      // 空购物车
      app.globalData.cartData = [this.data.currentBook];

      title = '添加成功';
      typeIcon = 'success';

    } else {
      var flag = app.globalData.cartData.some(function (v) {
        return v.id == currentBook.id;
      });

      if (flag) {
        // 已经添加过
        app.globalData.cartData.forEach(function (v, i) {
          if (currentBook.id == v.id) {
            var oldNumber = app.globalData.cartData[i].addNumber || 0;
            app.globalData.cartData[i].addNumber = oldNumber++;
            _this.setData({ 'currentBook.addNumber': oldNumber++});
          }
        });

        title = '成功修改该商品数量';
        typeIcon = 'success';

      } else {
        // 未添加过
        this.setData({ 'currentBook.addNumber': 1 });
        app.globalData.cartData[app.globalData.cartData.length] = this.data.currentBook;

        title = '添加成功';
        typeIcon = 'success';
      }
    }

    this.showToast(title, typeIcon);
  },
  addCollection() {
    var _this = this;
    app.globalData.listData.forEach(function (v, i) {
      if (_this.data.currentBook.id == v.id) {
        if (!app.globalData.listData[i].collected) {
          _this.setData({ 'collectBtnType': 'primary'});
        } else {
          _this.setData({ 'collectBtnType': 'default' });
        }
        app.globalData.listData[i].collected = !app.globalData.listData[i].collected;
      }
    });
  },
  showToast(title, type) {
    wx.showToast({
      title: title,
      icon: type,
      duration: 1000,
      mask: true
    });
  }
});