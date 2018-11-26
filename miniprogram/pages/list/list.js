var app = getApp();

Page({
  data: {
    bookList: app.globalData.listData,
    imgUrls: []
  },
  onLoad() {
    
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