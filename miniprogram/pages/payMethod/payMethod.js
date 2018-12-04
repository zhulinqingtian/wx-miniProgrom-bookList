var app = getApp();

Page({
  data: {
    inputPassword: '', // 输入的密码
    showKeyBoard: true, // 默认隐藏键盘
    pay_type: '', // 支付方式
    password: 123456, // 设置的密码 这里写死 实际开发中后台专门设置一个表存储用户设置的密码
  },

  // 监听页面加载
  onLoad: function (options) {

  },

  // 支付方式
  pay(e) {
    var pay_type = e.currentTarget.dataset.pay_type; // 你选择的支付方式
    if (pay_type == 'weipay') {
      // 此处写入微信支付需要执行的代码不做过多介绍

    } else {
      // 内部支付 打开键盘
      this.operateKeyboard();
    }
  },


  inputPassword(e) {
    // 键盘输入的密码 赋值给inputPassword
    this.data.inputPassword = this.data.inputPassword + e.currentTarget.dataset.key;
    this.setData({
      inputPassword: this.data.inputPassword
    });

    // 当输入密码正确时   
    if (this.data.inputPassword.length == 6 && this.data.password == this.data.inputPassword) {

      this.operateKeyboard();//关闭小键盘
      app.showToast('支付成功');
      
      setTimeout(function() {
        wx.switchTab({
          url: '../list/list',
        });
      }, 2000);
    }
    // 当输入密码错误时  给个提示 并且把输入的密码清零
    if (this.data.inputPassword.length == 6 && this.data.password != this.data.inputPassword) {
      app.showConfirmModal('提示', '密码输入错误');

      this.setData({
        inputPassword: ''
      });
    }
  },

  operateKeyboard() {
    this.setData({
      showKeyBoard: !this.data.showKeyBoard  //取反 打开关闭小键盘
    });

    this.setData({inputPassword: ''});
  },

  // 删除输入错误的密码
  clear() {
    var index = this.data.inputPassword.length;
    if (index > 0) {
      var inputPassword = this.data.inputPassword.substr(0, index - 1);
      this.setData({inputPassword: inputPassword});
    }
  },

})
