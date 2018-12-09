var app = getApp();

Page({
  data: {
    bookList: [],
    imgUrls: [],
    SearchType: '',
    selectStr: '',

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
  }
});