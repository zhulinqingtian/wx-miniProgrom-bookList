
/**
 * ********* 密码框 *************
 * 
 * 本身每个格子内的内容为小黑点，默认隐藏，输入密码时显示小黑点，数据由js控制，并不是密码输入框
 * 
 * 密码清空的情况：每次打开小键盘时 ||  输入六位错误密码后
 */

var app = getApp();

Page({
  data: {
    payCode: '', // 输入的密码
    showKeyBoard: true, // 默认隐藏键盘
    pay_type: '', // 支付方式
    password: 123456, // 设置的密码 这里写死 实际开发中后台专门设置一个表存储用户设置的密码
  },

  // 监听页面加载
  onLoad: function (options) {

  },

  // 选择支付方式
  pay(e) {
    var pay_type = e.currentTarget.dataset.pay_type; // 你选择的支付方式
    if (pay_type == 'weipay') {
      // 微信支付的话，调用微信支付接口是有自己的小键盘的
      // 因为小程序没有内部键盘,所以有时候商城内部 需要零钱支付 ,会员卡支付,输入密码就需要自己做一个小键盘了。

      // 此处写入微信支付需要执行的代码不做过多介绍
      app.showConfirmModal('即将跳转到微信支付...');

    } else {
      // 内部支付 打开键盘
      this.operateKeyboard();
    }
  },

  // 输入密码
  enterPassword(e) {
    // 键盘输入的密码 赋值给 payCode
    this.data.payCode = this.data.payCode + e.currentTarget.dataset.key;

    this.setData({
      payCode: this.data.payCode
    });

    // 输入6位密码时，验证密码
    if (this.data.payCode.length == 6) {

      if (this.data.password == this.data.payCode) {
        // 当输入密码正确时，关闭小键盘， 提示成功，之后跳到列表页
        this.operateKeyboard(); // 关闭小键盘
        app.showToast('支付成功');

        setTimeout(function () {
          wx.navigateBack({
            delta: 2 // delta = 1: 输入密码页面
          })
        }, 2000);

      } else {
        // 当输入密码错误时  提示错误，把输入的密码清空
        app.showConfirmModal('提示', '密码输入错误');
        this.setData({ payCode: '' });
      }
    }
  },

  // 显示 | 隐藏键盘
  operateKeyboard() {
    this.setData({
      showKeyBoard: !this.data.showKeyBoard  //取反 打开关闭小键盘
    });

    this.setData({ payCode: ''});
  },

  // 删除输入错误的密码 回退键功能
  clear() {
    var len = this.data.payCode.length;
    if (len > 0) {
      var payCode = this.data.payCode.substr(0, len - 1);
      this.setData({ payCode: payCode});
    }
  }
})
