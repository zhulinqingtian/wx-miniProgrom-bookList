# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

###组件

1. button 的属性的有效值

size :  default    mini
=======================================================================

type : primary(绿色)    default（白色）   warn（红色）

======================================================================

form-type ： submit(提交表单)    reset（重置表单）

=========================================================================

open-type ： 

| 值 | 说明 |
|:-|:-|
|  contact |  打开客服会话，如果用户在会话中点击消息卡片后返回小程序，可以从 bindcontact 回调中获得具体信息 |
| share	 |  触发用户转发 |
|  getUserInfo |  获取用户信息，可以从bindgetuserinfo回调中获取到用户信息 |
|  getPhoneNumber | 	获取用户手机号，可以从bindgetphonenumber回调中获取到用户信息 |
|  launchApp |  打开APP，可以通过app-parameter属性设定向APP传的参数 |
|  openSetting  |  打开授权设置页 |
|  feedback |  打开“意见反馈”页面，用户可提交反馈内容并上传日志，开发者可以登录小程序管理后台后进入左侧菜单“客服反馈”页面获取到反馈内容 |
 
===========================================================================

###2.wx:for
```

wx:for   循环

wx:for-item=‘变量名（随便起的）’   指定循环数据当前的变量名，可以通过  {{变量名.属性}} 展示数组的元素。

wx:for-index=‘变量名（随便起）’，指向当前元素的下标名，可以在其他事件中定义自定义事件（data-xxx='{{变量名}}'，，该自定义属性可以在参数e下面打印出来）获取该下标。

wx:key="{{变量名.属性}}"
```

###页面跳转方法
```
在tab中的页面使用open-type时，用 open-type="switchTab",
其他页面用  open-type="navigate"
==============================================================================================

//只能跳转到tabBar配置页面（要跳转的位置位于TabBar中，要使用wx.switchTab 来跳转界面）
wx.switchTab({
  url: '/pages/index/index',
});
 
//返回上一级页面（delta：返回的页面数，如果 delta 大于现有页面数，则返回到首页，默认值为1）
wx.navigateBack({
  delta: 2
})
 
//关闭当前页面，跳转到应用内的某个页面
wx.redirectTo({
  url: '/pages/index/index',
});
 
//保留当前页面，跳转到应用内的某个页面
wx.navigateTo({
  url: '/pages/index/index',
});
 
// 关闭所有页面，打开到应用内的某个页面
wx.reLaunch({
  url: '/pages/index/index',
});
==============================================================================================
```

###改变radio的大小
```
radio {
  transform:scale(0.5);
}
```

###引用iconfont

注意： 选择base64, ttf
[iconfont图标转化成base64存储的转化地址](https://transfonter.org/)


###todo

列表页
详情页
购物车
地址管理
支付
数据统计（图表）
评价
历史订单
连接数据库
