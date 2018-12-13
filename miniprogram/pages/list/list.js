var app = getApp();

Page({
  data: {
    bookList: [],
    imgUrls: [],
    SearchType: '',
    selectStr: '',
    minPrice: '',
    maxPrice: '',
    targetDate: +new Date() - 86400000 * 30,
    setPriceRange: false, // 设置价格区间
    displayRange: '',

    // 书籍类型状态
    statusTextMap: {
      1: '儿童文学',
      2: '历史',
      3: '小说',
      4: '科幻',
      5: '哲学',
      6: '工具',
      7: '计算机与互联网',
      8: '文学'
    },

    colorTextMap: {
      1: '#666',
      2: '#666',
      3: '#666',
      4: '#666',
      5: '#666',
      6: '#666',
      7: '#666',
      8: '#666'
    },

    // 书籍分类
    typeList: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  onLoad() {
    this.getAllBookList();
  },

  // 获取书籍列表
  getAllBookList(e) {
    var _this = this;

    if (!e || !e.target.dataset.type) {

      if (!this.data.SearchType) {
        // 初始化页面
        this.setData({ bookList: app.globalData.listData });
      } else {
        // 刷新页面
        var data = this.getListByType(type);
        this.setData({ bookList: data });

        app.showToast('刷新成功');
      }

    } else {

      // 点击标签查询
      var 
          dataset = e.target.dataset,
          type = dataset.type,
          index = dataset.index,
          color = dataset.color;

      var data = []; // 保存查询结果

      if (color == '#1AAD16') {
        // 取消标签选择
        if (this.data.selectStr) {

          data = this.selectByKeyWord(this.data.selectStr);
          this.setData({ SearchType: '' });

        } else {

          data = app.globalData.listData;
          this.setData({ SearchType: type });
        }

      } else {
        // 标签查询
        data = this.getListByType(type);
      }

      this.setData({ bookList: data });
    }

    _this.changeLabelStatus(color, index);
  },

  // 获取某类型的书籍列表
  getListByType(type) {
    var arr = [];
    var list = app.globalData.listData;

    if (!type) {
      arr = list;
    } else {

      arr = list.filter(function (v) {
        return v.type == type;
      });
    }

    return arr;
  },

  // 根据名称查询书籍
  selectByName(e) {
    var str = e.target.dataset.name;
    this.setData({selectStr: str}); // 关键字赋值

    if (!str)  {
      // 关键字为空时，使用默认列表
      this.setData({ bookList: app.globalData.listData});
    } else {

      var filterArr = this.selectByKeyWord(str);
      this.setData({ bookList: filterArr });
    }
  },

  selectByKeyWord(keyWord) {
    var data = app.globalData.listData;
    var _this = this;

    if (!keyWord) {
      return data;
    }

    // 过滤出包含关键字的书籍列表
    var filterArr = data.filter(function (v, i) {
      return v.name.indexOf(keyWord) > -1;
    });

    if (filterArr.length) {
      filterArr.forEach(function (v, i) {
        // 选中商品所在类型
        _this.updateCurrentBookStatus(v.type);
      });
    }

    return filterArr;
  },

  // 回车 | blur 更新查询关键字 查询
  resetKeyWord(e) {
    var value = e.detail.value, data = [];

    if (value) {
      this.setData({ selectStr: value });
      
    } else {
      this.setData({ selectStr: '' });
    }

    var data = this.selectByKeyWord(this.data.selectStr);
    this.setData({ bookList: data });
  },

  // 根据 名称 & 类型 查询
  filterBookList() {
    var originData = app.globalData.listData;
    var data = []; // 保存过滤结果

    if (!originData.length ) {
      data = [];
    }

    var
      type = this.data.SearchType,
      keyword = this.data.selectStr;

    if (!type && !keyword) {
      data = originData;
    }

    if (originData.length) {
      var arr1 = [], arr2 = [];

      // 过滤
      if (type) {
        arr1 = this.getListByType(type);
      }

      if (keyword) {
        arr2 = originData.filter(function (v, i) {
          return v.name.indexOf(keyword) > -1;
        });
      }

      var arr3 = arr1.filter(function(b) {
        return arr2.indexOf(n) != -1;
      });
      console.log('arr3:', arr3);
      data = arr3;
    }
    // 赋值
    this.setData({ bookList: data });
  },

  // 更新当前查询出来的书籍的类型标签
  updateCurrentBookStatus(type) {
    var obj = this.data.colorTextMap;

    for (var i in obj) {
      if (i == type) {
        obj[i] = '#1AAD16';  // 当前标签置为选中
      } else {
        obj[i] = '#666';
      }
    }

    this.setData({ colorTextMap: obj });
  },

  // 点击改变标签选中状态 ( 选中 | 未选中 )
  changeLabelStatus(color, index) {

    var obj = this.data.colorTextMap;

    for (var i in obj) {
      obj[i] = '#666';
    }

    if (!color || color == '#666') { 
      obj[index+1] = '#1AAD16';
    } else {
      obj[index+1] = '#666';
    }

    this.setData({ colorTextMap: obj});
  },

  // 获取所有图片的链接
  getAllImgUrls() {
    var _this = this;
    // _this.data.imgUrls = this.bookList.forEach(function (v) {
    //   _this.data.imgUrls.push(v.src);
    // });
  },
  // 查看预览图片
  viewPreviewImage(e) {
    var imgSrc = e.target.dataset.src;
    wx.previewImage({
      current: imgSrc,
      urls: this.data.imgUrls
    });
  },
  // 查看书籍详情
  viewDetail(e) {
    var b_id = e.target.dataset.id;
    wx.switchTab({
      url: 'book-detail/book-detail?id='+b_id
    });
  },

  // 筛选价格
  displayPriceBlock() {
    var flag = this.data.setPriceRange;
    this.setData({ setPriceRange: !flag});
  },
  setMinPrice(e) {
    // 不管值是否符合条件，先赋值，在最后查询的时候也要判断是否符合条件
    var value = Number(e.detail.value);
    var _this = this;
    var formatFlag = this.checkPriceFormat(value);

    // 格式判断
    if (!formatFlag) {
      app.showConfirmModal('请输入正确的价格');
    }

    // 有最大值时判断
    if (_this.data.maxPrice) {
      if (value > _this.data.maxPrice) {
        app.showToast('后者价格不能小于前者价格');
      }
    }

    this.setData({ minPrice: e.detail.value });
  },
  setMaxPrice(e) {
    // 不管值是否符合条件，先赋值，在最后查询的时候也要判断是否符合条件
    var value = Number(e.detail.value);
    var _this = this;
    var formatFlag = this.checkPriceFormat(value);

    // 格式判断
    if (!formatFlag) {
      app.showConfirmModal('请输入正确的价格');
    }

    if (this.data.minPrice > +value) {
      app.showToast('后者价格不能小于前者价格');
    }

    this.setData({ maxPrice: value });
  },

  // 检查价格格式
  checkPriceFormat(value) {
    var flag = true;

    if (!/^\d+(\.\d+)?$/.test(value)) {
      flag = false;
    }

    return flag;
  },
  checkPriceRange() {
    var data = this.data;
    var flag = true; // 符合情况
    if (data.maxPrice) {
      if (data.minPrice > data.maxPrice) {
        flag = false;
      }
    }
    return flag;
  },

  // 重置价格
  resetPrice() {
    this.setData({ maxPrice: '', minPrice: '' });
  },

  // 完成设置
  completePriceSet() {
    var data = this.data;

    // 格式判断
    var flag = true;
    if (data.minPrice) {
      var minFlag = this.checkPriceFormat(data.minPrice);
      if (!minFlag) {
        flag = false;
        return app.showConfirmModal('请输入正确的价格');
      }
    }
    if (data.maxPrice) {
      flag = false;
      var maxFlag = this.checkPriceFormat(data.maxPrice);
      if (!maxFlag) {
        return app.showConfirmModal('请输入正确的价格');
      }
    }
    
    // 格式正确后，判断范围是否正确
    if (flag) {
      var checkFlag = this.checkPriceRange(); // 判断价格是否符合条件
      var showFlag = data.setPriceRange;

      if (checkFlag) {
        // 符合条件时，关闭筛选窗口
        this.setData({ setPriceRange: !showFlag });
        this.setData({ displayRange: data.minPrice + ' - ' + data.maxPrice});
      } else {
        this.setData({ displayRange: '' });
        return app.showToast('后者价格不能小于前者价格');
      }
    }
  }
});