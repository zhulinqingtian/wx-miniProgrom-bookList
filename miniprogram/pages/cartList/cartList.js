var app = getApp();

Page({
  data: {
    totalAmount: 0,
    totalCommodity: 0,
    cartData: app.globalData.listData,
    colorArr: [], // 保存列表每一项icon的颜色状态
    tempData: [] // 临时存储  保存所有列表项 selected属性表示选中情况
  },
  onLoad() {
    this.createIcon();
    this.initData(); // 初始化tempData
  },
  // 未使用 手动修改数量
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
  // init 临时变量 数量发生变化时更新变量
  initData() {
    var data = this.data.tempData || [];
    app.globalData.cartData.forEach(function (v, i) {
      data.push({
        id: v.id,
        name: v.name,
        author: v. author,
        src: v.src,
        price: v.price,
        addNumber: v.addNumber,
        selected: false
      });
    });
    this.setData({tempData: data});
  },
  // 更新tempData
  updateTempData(opt, id, str) {
    var temp = this.data.tempData;
    // 是否购买触发
    if (str && str == 'change') {
      temp.forEach(function (v, i) {
        if (v.id == id) {
          temp[i].selected = !temp[i].selected;
        }
      });

    } else {
      // 改变数量触发
      var flag = opt == 'add' ? 1 : opt == 'del' ? -1 : 0;
      temp.forEach(function (v, i) {
        if (v.id == id) {
          var addNumber = temp[i].addNumber || 0;
          temp[i].addNumber = addNumber + flag;
        }
      });

    }

    this.setData({ tempData: temp });
    this.countTotalAmount();
  },
  // 增加数量
  addCollection(e) {
    var id = e.target.dataset.id; // 当前元素的id 或者 data-id 属性
    this.updateTempData('add', id);
  },
  // 减少数量
  reduceCollection(e) {
    var id = e.target.dataset.id; // 当前元素的id 或者 data-id 属性
    this.updateTempData('del', id);
  },
  // 加入/删除 购买列表
  addToBuyList(e) {
    var index = e.target.dataset.index;
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    var price = e.target.dataset.price;
    var addNumber = e.target.dataset.addNumber;
    var color = e.target.dataset.color; // data-color属性
    var opt = 'add';

    if (!color || color == '#666') {
      color = '#3596fc';
      opt = 'add';
    } else if (color == '#3596fc'){
      color = '#666'
      opt = 'del';
    } else {
      color = '#666'
      opt = 'del';
    }
    this.updateIcon(index, color);

    this.updateTempData('other', id, 'change');
    this.countTotalAmount();
  },
  // 计算商品数和总价
  countTotalAmount() {
    var total = 0;

    // 选中列表
    var selectedData = this.data.tempData.filter(function(v) {
      return v.selected;
    });

    if (!selectedData.length) {
      total = 0;
    } else {
      selectedData.forEach(function (v) {
        total = total + (v.price * (v.addNumber || 0));
      });
    }

    this.setData({ totalAmount: total, totalCommodity: selectedData.length});
  },
  // 创建购买icon
  createIcon() {
    var _this = this;
    this.data.cartData.forEach(function(v, i) {
      var data = _this.data.colorArr;
      data.push({ id: v.id, color: '#666' });
      _this.setData({ 'colorArr': data});
    });

  },
  // 更新购买icon状态
  updateIcon(index, color) {
    var data = this.data.colorArr;
    data[index].color = color;
    this.setData({ 'colorArr': data });
  },

  // 清空选中
  toClear() {
    var list = this.data.tempData,
        colorArr = this.data.colorArr;

    list.forEach(function(v) {
      v.addNumber = 0;
      v.selected = false;
    });
    this.setData({ tempData: list});

    colorArr.forEach(function (v) {
      v.color = '#666';
    });

    this.setData({ colorArr: colorArr, totalCommodity: 0, totalAmount: 0});
  },
  // 去购买
  toBuyPage() {
    wx.navigateTo({
      url: '../buy/buy',
    })
  }
});