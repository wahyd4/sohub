# SoHub
**WEBSITE**

[Sohub](http://sohub.herokuapp.com/)

**Travis CI status:**

[![Build Status](https://travis-ci.org/wahyd4/sohub.png?branch=master)](https://travis-ci.org/wahyd4/sohub)

A aggregater of all kinds of social messages and other streams



##安装指南##

+ 设置导出系统参数

    export ACCESS_ID=

    export ACCESS_KEY=

    export BUCKET=

    export IMAGE_BASE_URL=
+ 运行 npm install
+ 开启服务器
  ```bash

  sails lift

  ```

##使用指南##

+ 使用微信帐号发布消息，请添加微信帐号go_serv

##Todo List##
 + <del>通过微信发送文本消息</del>
 + <del>通过微信发布图片消息</del>
 + 通过微信发送通知消息
 + 抓取Weibo状态进行显示
 + 同步Google Calendar显示



##更新日志##
+ 2013.7.1 将图片和文本信息合并到一个容器中显示，并添加了进度条，这样用户可以大概知道当前信息还会显示多长时间
