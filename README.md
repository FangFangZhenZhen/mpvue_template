# 小程序模板（mpvue+vant+flyio）

## Build Setup

``` bash
# 安装依赖
npm install

# 开发时构建
npm run dev

# 打包构建
npm run build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm run dev:wx
npm run dev:swan
npm run dev:tt
npm run dev:my

# 指定平台的打包构建
npm run build:wx
npm run build:swan
npm run build:tt
npm run build:my

# 生成 bundle 分析报告
npm run build --report
```

------

## 项目说明

mpvue小程序框架，在[mpvue-quickstart](https://github.com/mpvue/mpvue-quickstart)基础上引入

[mpvue-entry](https://github.com/F-loat/mpvue-entry)

[mpvue-router-patch](https://github.com/F-loat/mpvue-router-patch)

[minapp-api-promise](https://github.com/bigmeow/minapp-api-promise)

全局vuex、less、[flyio](https://github.com/wendux/fly)

自动按需导入[wux-weapp](https://github.com/wux-weapp/wux-weapp)组件（根据usingComponents自动引入）

实现更像vue的开发结构

## 注意事项

1. 模板中不支持复杂运算 不支持使用methods中的方法
2. 不支持filters建议在获得数据时先处理好
3. 组件中不支持scoped
