var app = getApp();

Page({
  data: {
    todoData: [],
    editIds: null
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const year = this.data.currentYear;
    const month = this.data.currentMonth;
    const day = this.data.currentDay;
    this.setData({
      currentDateStr: +new Date(year + '-' + month + '-' + day + ' 00:00:00')
    });

  },
  onLoad(options) {
    this.getTodoList();

    // 从edit页面跳转过来
    if (options.editIds) {
      this.setData({ editIds: options.editIds });
    }
  },
  getTodoList() {
    var data = app.globalData.todoList;
    this.setData({ todoData: data});
  },
  // 删除待办
  delOneItem(e) {
    var id = e.target.dataset.id;
    var data = app.globalData.todoList;

    data.forEach(function(v, i) {
      if (v.id == id) {
        data.splice(i, 1);
      }
    });

    app.globalData.todoList = data;
    this.setData({ todoData: data});
    app.showToast('删除成功');
  },
  // 编辑待办
  updateItem(e) {
    wx.navigateTo({
      url: '../addTodo/addTodo?id=' + e.target.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(res) {},

  /**
   * 页面相关事件处理函数--监听用户上拉动作
   */
  onReachBottom() {},

  /**
   * 监听页面滚动
   */
  onPageScroll: function(e) {}
});