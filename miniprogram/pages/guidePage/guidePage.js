Page({
  data: {},
  onShow() {
    setTimeout(function() {
      wx.navigateTo({
        url: '../index/index',
      })
    }, 3000);
  }
});