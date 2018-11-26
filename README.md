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
|：-|：-|
|  contact |  打开客服会话，如果用户在会话中点击消息卡片后返回小程序，可以从 bindcontact 回调中获得具体信息 |
| share	 |  触发用户转发 |
|  getUserInfo |  获取用户信息，可以从bindgetuserinfo回调中获取到用户信息 |
|  getPhoneNumber | 	获取用户手机号，可以从bindgetphonenumber回调中获取到用户信息 |
|  launchApp |  打开APP，可以通过app-parameter属性设定向APP传的参数 |
|  openSetting  |  打开授权设置页 |
|  feedback |  打开“意见反馈”页面，用户可提交反馈内容并上传日志，开发者可以登录小程序管理后台后进入左侧菜单“客服反馈”页面获取到反馈内容 |
 
===========================================================================