Page({
  data: {},
  onLoad() {
    setTimeout(function() {
      wx.navigateTo({
        url: '../index/index',
      })
    }, 3000);
  }
});