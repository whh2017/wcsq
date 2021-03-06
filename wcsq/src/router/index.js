import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import WcIndex from '@/page/index'
import WcLogin from '@/page/login'
import WcBbs from '@/page/bbs'
import WcSale from '@/page/sale'
import WcCenter from '@/page/center'
import SaleDetail from '@/page/saleDetail'
import ShopCar from '@/page/shopCarOrder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WcIndex',
      component: WcIndex
    },
    {
      path: '/test',
      name: HelloWorld,
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'WcLogin',
      component: WcLogin
    },
    {
      path: '/bbs',
      name: 'WcBbs',
      component: WcBbs
    },
    {
      path: '/sale',
      name: 'WcSale',
      component: WcSale
    },
    {
      path: '/center',
      name: 'WcCenter',
      component: WcCenter
    },
    {
      path: '/goods',
      name: 'SaleDetail',
      component: SaleDetail
    },
    {
      path: '/shopcar',
      name: 'ShopCar',
      component: ShopCar
    }

  ]
})
