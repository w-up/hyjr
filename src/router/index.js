import Vue from 'vue'
import Router from 'vue-router'
import LoginFirst from '@/components/loginFirst' //登录
import Wrap from '@/components/wrap' //总的布局
// import LoginMarket from '@/components/loginMarket' //登录行情
// import LoginSuccessAlert from '@/components/loginSuccessAlert' //登录行情成功弹窗
// import NavTop from '@/components/navTop' //头部导航栏
// import LoginDisclaimer from '@/components/loginDisclaimer' //免责声明
// import AboutUs from '@/components/aboutUs' //关于我们
// import DrawOrder from '@/components/drawOrder' // 画线下单
// import WinClose from '@/components/winClose' //关闭窗口
// import DepotNumClose from '@/components/depotNumClose' //持仓右键平仓弹窗
// import InfoChangePriceAlert from '@/components/infoChangePriceAlert' //委托改价
// import DepotNumSet from '@/components/depotNumSet' // 止盈止损设置
// import AddPrepaid from '@/components/addPrepaid' //添加预埋单
// import AddCondition from '@/components/addCondition' //添加条件单
// import AddLoss from '@/components/addLoss' //止损开仓

// import OutTranFace from '@/components/outTranFace' //外盘交易面板


import InfoFace from '@/components/infoFace' //头部下面的信息面板
import InfoFaceChild1 from '@/components/infoFaceChild1' //自选F1
import InfoFaceChild2 from '@/components/infoFaceChild2' //报价F2
import InfoFaceChild3 from '@/components/infoFaceChild3' //分时F3
import InfoFaceChild4 from '@/components/infoFaceChild4' //K线F4

// const LoginFirst = () => import('@/components/loginFirst.vue') //登录
// const Wrap = () => import('@/components/wrap.vue') //总的布局
// const InfoFace = () => import('@/components/infoFace.vue') //头部下面的信息面板
// const InfoFaceChild1 = () => import('@/components/infoFaceChild1.vue') //自选F1
// const InfoFaceChild2 = () => import('@/components/infoFaceChild2.vue') //报价F2
// const InfoFaceChild3 = () => import('@/components/infoFaceChild3.vue') //分时F3
// const InfoFaceChild4 = () => import('@/components/infoFaceChild4.vue') //K线F4


Vue.use(Router)

export default new Router({
  routes: [
    { //登录
      path: '/',
      name: 'LoginFirst',
      component: LoginFirst
    },
    // { //登录行情
    //   path: '/loginMarket',
    //   name: 'LoginMarket',
    //   component: LoginMarket
    // },
    // { //登录行情成功弹窗
    //   path: '/loginSuccessAlert',
    //   name: 'LoginSuccessAlert',
    //   component: LoginSuccessAlert
    // },
    // { //头部导航栏
    //   path: '/navTop',
    //   name: 'NavTop',
    //   component: NavTop
    // },
    // { //免责声明
    //   path: '/loginDisclaimer',
    //   name: 'LoginDisclaimer',
    //   component: LoginDisclaimer
    // },
    // { //关于我们
    //   path: '/aboutUs',
    //   name: 'AboutUs',
    //   component: AboutUs
    // },
    // { //关闭窗口
    //   path: '/winClose',
    //   name: 'WinClose',
    //   component: WinClose
    // },
    // { //画线下单
    //   path: '/drawOrder',
    //   name: 'DrawOrder',
    //   component: DrawOrder
    // },
    // { //持仓右键平仓弹窗
    //   path: '/depotNumClose',
    //   name: 'DepotNumClose',
    //   component: DepotNumClose
    // },
    // { //委托改价
    //   path: '/infoChangePriceAlert',
    //   name: 'InfoChangePriceAlert',
    //   component: InfoChangePriceAlert
    // },
    // { //止盈止损设置
    //   path: '/depotNumSet',
    //   name: 'DepotNumSet',
    //   component: DepotNumSet
    // },
    // { //添加预埋单
    //   path: '/addPrepaid',
    //   name: 'AddPrepaid',
    //   component: AddPrepaid
    // },
    // { //添加条件单
    //   path: '/addCondition',
    //   name: 'AddCondition',
    //   component: AddCondition
    // },
    // { //止损开仓
    //   path: '/addLoss',
    //   name: 'AddLoss',
    //   component: AddLoss
    // },
    { //头部下面的信息面板
      path: '/wrap',
      name: 'Wrap',
      component: Wrap,
      children:[
        { //上面信息面板    //二级路由
          path: '/wrap', //二级的默认路由（此path指向上一级，即path:'/wrap'）
          name: 'InfoFace',
          component: InfoFace,
          redirect: '/wrap/infoFace/infoFaceChild2', //重定向默认路由
          children: [{ //三级路由
              path: "/wrap/infoFace/infoFaceChild1",
              name: "InfoFaceChild1",
              component: InfoFaceChild1,
            },
            {
              path: '/wrap/infoFace/infoFaceChild2',
              name: "InfoFaceChild2",
              component: InfoFaceChild2,
            },
            {
              path: '/wrap/infoFace/infoFaceChild3',
              name: "InfoFaceChild3",
              component: InfoFaceChild3,
            },
            {
              path: '/wrap/infoFace/infoFaceChild4',
              name: "InfoFaceChild4",
              component: InfoFaceChild4,
            },
            // {
            //   path: '/wrap/infoFace/infoFaceChild5',
            //   name: "InfoFaceChild5",
            //   component: InfoFaceChild5,
            // },
          ]
        },
      ]
    },
    // { //外盘交易面板
    //   path: '/outTranFace',
    //   name: 'OutTranFace',
    //   component: OutTranFace
    // },
  ]
})
