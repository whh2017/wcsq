// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* 引入 Element 組件 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* 引入Mock模拟插件 */
import mock from './api/mock'
mock();

/* 引入Vuex */
import store from './store/index'

/* 引入浏览器缓存封装插件 */
import { getStore,removeStore } from './utils/utils'

/* 路由卫士 */
router.beforeEach((to, from, next) => {
  let user = JSON.parse(getStore('data'));
  // if (!user && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
  next()
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})