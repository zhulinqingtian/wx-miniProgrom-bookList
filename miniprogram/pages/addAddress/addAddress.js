// 添加地址 & 编辑地址页面

var app = getApp();

Page({
  data: {
    currentItem: {
      region: ["北京市", "北京市", "东城区"], // 选择的省市区数组 [省， 市， 区]
      customItem: '-请选择-', // 为省市区统一添加自定义选项
      consigneeName: '',
      tel: '',
      address_details: '',
      isDefault: 0
    },
    editId: '' // 编辑地址的id
  },
  onLoad(option) {
    if (option && option.id) {
      this.setData({ editId: option.id });
      this.getCurrentItemInfo(option.id);
    }
  },
  // 编辑地址部分
  getCurrentItemInfo(id) {
    var list = app.globalData.addressList,
        _this = this;
    
    if (list.length) {
      list.forEach(function(v) {
        if (v.id == id) {
          _this.setData({ currentItem: v});
          _this.setData({ 'currentItem.region': v.province +  '-' + v.city + '-' + v.area});
          console.log(v);
        }
      });
    }
    
  },


  // 添加地址部分
  // 选择地址
  setAddress(e) {
    // e.detail.value ["北京市", "北京市", "东城区"]
    // e.detail.code  ["110000", "110100", "110101"]'
    // e.detail.postcode  "100010"

    this.setData({
      'currentItem.region': e.detail.value
    })
  },

  // 失去焦点时处理
  setName(e) {
    var consigneeName = e.detail.value;
    this.setData({ 'currentItem.consigneeName': consigneeName });
  },
  setMobile(e) {
    var tel = e.detail.value;
    this.setData({ 'currentItem.tel': tel });
  },
  setDetailAddress(e) {
    var address_details = e.detail.value;
    this.setData({ 'currentItem.address_details': address_details });
  },
  defaultChange(e) {
    this.setData({ 'currentItem.isDefault': e.detail.value});
  },

  // 验证
  // 验证手机号码
  checkMobile(callback) {
    var tel = this.data.currentItem.tel;
    var flag = true; // 正确的
    if (tel.trim() == '') {
      flag = false;
      app.showConfirmModal("手机号码不能为空");
      return flag;
    } else {
      if (!this.checkTel(tel)) {
        flag = false;
        app.showConfirmModal('请输入正确的电话号码！');
        return flag;
      }
    }
    return flag;
  },
  checkTel(tel) {
    //手机或固定电话
    var mobileReg = /^1[0-9]{10}$/, phoneReg = /^0\d{2,3}-?\d{7,8}$/;
    return mobileReg.test(tel) || phoneReg.test(tel);
  },

  // 验证收货人姓名
  checkName() {
    var name = this.data.currentItem.consigneeName;
    var flag = true; // 正确的
    if (!name) {
      flag = false;
      app.showConfirmModal('请输入收货人姓名');
    }
    return flag;
  },
  checkAddress() {
    var address_details = this.data.currentItem.address_details;
    var flag = true; // 正确的
    if (!address_details) {
      flag = false;
      app.showConfirmModal('请输入详细地址');
    }
    return flag;
  },

  // 验证信息
  checkOneItem() {
    var checkName = this.checkName();
    if (checkName) {
      var checkMobile = this.checkMobile();
      if (checkMobile) {
        var checkAddress = this.checkAddress();
        if (checkAddress) {
          app.showToast('添加成功');
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/address/address',
            });
          }, 1000);
        }
      }
    }

    if (this.data.editId) {
      // 编辑
      this.updateOneItem();

    } else {
      // 添加
      this.addOneItem();
    }
  },
  addOneItem() {
    var data = this.data.currentItem;
    var addressList = app.globalData.addressList;
    var item = {
      id: (addressList[addressList.length - 1].id) + 1 || 1,
      consigneeName: data.consigneeName,
      tel: data.tel,
      address_details: data.address_details,
      province: data.region[0],
      city: data.region[1],
      area: data.region[2],
      isDefault: data.isDefault
    };

    if (item.isDefault) {
      addressList.forEach(function(v) {
        v.isDefault = false;
      });
    }
    addressList.push(item);
    app.globalData.addressList = addressList;
  },
  updateOneItem() {
    var 
        addressList = app.globalData.addressList,
        _this = this,
        data = this.data.currentItem;;

    var item = {
      id: _this.data.editId,
      consigneeName: data.consigneeName,
      tel: data.tel,
      address_details: data.address_details,
      province: data.province,
      city: data.city,
      area: data.area,
      isDefault: data.isDefault
    };

    // 修改为默认地址
    if (item.isDefault) {
      addressList.forEach(function (v) {
        v.isDefault = false;
      });
    }

    addressList.forEach(function(v, i) {
      if (v.id == _this.data.editId) {
        app.globalData.addressList[i] = item;
      }
    });
  }
});