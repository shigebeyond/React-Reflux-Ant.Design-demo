# React-Reflux-Ant.Design-demo

##What is it

Evolved from [react-antd-admin](https://github.com/fireyy/react-antd-admin), there are following changes:

####1. Import reflux

state is maintained by reflux

####2. Complement ui

add more ui: login form / register form / menu / multiple tags / list / pagination / form / form validation ...

##Special coding conventions / Advices

I come up with a coding conventions:

####1. Simple Action + Heavy Store

Action is a simple interface to called by Component and listened by Store, and do no logic work. Just keep it simple.

Store is a handler which listens to Action, and do all logic work, e.g. sending request / calculate new data. Just keep it heavy.

Don't write the logic code in Action by using [`Actions.load.listen(() => { ... }) `](https://github.com/reflux/refluxjs#creating-actions), write it in Store.

####2. Multiple Action and Store

Don't keep everything in a single Store, different usages lead to different Action and Store.

One Store responses to one Action. 

Keep it simple, small, clean and effective.

####3. Store keeps common state + Component keeps unique state

If some state is rendered and updated(Action will trigger update) by single Component, just keep it in this Component, don't pollute Store.

####4. Update Store's state and Component's state separately

In the situation of asynchronous request, you may want to update state in both Store and Component, use [reflux-promise](https://github.com/reflux/reflux-promise) to handle it.

```
UserActions.login(data.user, data.password) // update Store's state
	.then((user) => {
      this.setState({user}); // update Component's state
	})
```

####5. Component care about part of Store's state
use [reflux-partial](https://github.com/shigebeyond/reflux-partial) to connect part of state from Store to Component.

## Features

- [react](https://facebook.github.io/react/)
- [reflux](https://github.com/reflux/refluxjs)
- [reflux-promise](https://github.com/reflux/reflux-promise)
- [reflux-partial](https://github.com/shigebeyond/reflux-partial)
- [ant.Design](http://ant.design/)
- [react-antd-admin](https://github.com/fireyy/react-antd-admin)

## Getting Started

Just clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/shigebeyond/React-Reflux-Ant.Design-demo
$ cd React-Reflux-Ant.Design-demo
$ npm install
$ npm start
```
# Chinese Readme 中文说明

##是什么

从 [react-antd-admin](https://github.com/fireyy/react-antd-admin) 演变而来, 有以下更改:

####1. 引入 reflux

由reflux来维护状态

####2. 完善UI组件

添加更多的UI组件: 登陆 / 注册 / 菜单 / 多页签 / 列表 / 分页 / 表单 / 表单校验 ...

##特有的代码规范 / 编码建议

通过这个例子我梳理出一个代码规范:

####1. 简单 Action + 厚重 Store

Action 只是一个被组件调用 + 被Store监听的简单接口, 不做业务处理. 请保持他的简单.

Store 是一个监听Action的处理器, 做所有的业务处理, 例如发送请求 / 计算新数据. 请保持他的厚重.

请不要通过 [`Actions.load.listen(() => { ... }) `](https://github.com/reflux/refluxjs#creating-actions) 来在 Action 中编写业务逻辑的代码, 请在 Store 中编写.

####2. 多个Action + 多个Store

请不要将所有东西都放到一个Store中, 不同的用途请给出不同 Action 和 Store.

一个 Store 对一个 Action 负责. 

请让他保持简单, 短小, 清爽与有效.

####3. Store 保存公共状态 + 组件保存特有状态

如果某个状态只在一个组件内渲染与更新(Action 会触发状态更新), 那么请将该状态放在该组件内, 不要放在 Store 中.

####4. 分开更新 Store 与组件的状态

在异步请求的情况下, 你可以需要同时更新 Store 和组件的状态, 请使用 [reflux-promise](https://github.com/reflux/reflux-promise) 来处理.

```
UserActions.login(data.user, data.password) // 更新 Store 状态
	.then((user) => {
      this.setState({user}); // 更新组件状态
	})
```

####5. 组件只关心 Store 中的部分状态的变化
请使用 [reflux-partial](https://github.com/shigebeyond/reflux-partial) 来将 Store 中的部分状态绑定到组件中

## 用到的库

- [react](https://facebook.github.io/react/)
- [reflux](https://github.com/reflux/refluxjs)
- [reflux-promise](https://github.com/reflux/reflux-promise)
- [reflux-partial](https://github.com/shigebeyond/reflux-partial)
- [ant.Design](http://ant.design/)
- [react-antd-admin](https://github.com/fireyy/react-antd-admin)

## 开始吧

克隆仓库, 并安装相应的库:

```shell
$ git clone https://github.com/shigebeyond/React-Reflux-Ant.Design-demo
$ cd React-Reflux-Ant.Design-demo
$ npm install
$ npm start
```


