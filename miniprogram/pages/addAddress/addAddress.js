Page({
  data: {
    region: ["北京市", "北京市", "东城区"], // 选择的省市区数组 [省， 市， 区]
    customItem: '-请选择-', // 为省市区统一添加自定义选项
    name: '',
    tel: ''
  },
  onLoad() {

  },
  // 选择地址
  setAddress(e) {
    // e.detail.value ["北京市", "北京市", "东城区"]
    // e.detail.code  ["110000", "110100", "110101"]'
    // e.detail.postcode  "100010"

    this.setData({
      region: e.detail.value
    })
  },
  showToast(title) {
    return wx.showToast({
      title: title,
      icon: 'warn',
      duration: 500
    });
  },
  addOneItem() {
    var title = '';
    if (!this.data.name) {
      title = '请输入收货人姓名';
      this.showToast(title);
    }
    if (!this.data.tel) {
      title = '请输入联系方式';
      this.showToast(title);
    }
  }
});