import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch' //在mpvue中使用vue-router兼容的路由写法(https://www.npmjs.com/package/mpvue-router-patch)
import WXP from 'minapp-api-promise'//引入插件，使微信api支持promise
import fly from './utils/fly'
import store from './store' //全局注册vuex
import App from './App'
import globalFn from '@/utils'

Vue.use(MpvueRouterPatch)

Vue.prototype.$wx   = WXP  //请求微信提供的api（支持promise）
Vue.prototype.$http = fly  //请求项目提供的api（支持promise）

Vue.config.productionTip = false
Object.keys(globalFn).forEach(key => {
  Vue.prototype['$' + key] = globalFn[key]
})
new Vue({
  mpType: 'app',
  store,
  ...App
}).$mount()
