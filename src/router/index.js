import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home.vue'
import Prove from '../views/prove/prove.vue'
import Rights from '../views/rights/rights.vue'
import Pension from '../views/pension/pension.vue'
import Card from '../views/info/card.vue'
import Bill from '../views/bill/bill.vue'
import Billlist from '../views/bill/bill-list.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '广西人社服务',
    },
  },
  {
    path: '/info',
    name: 'Info',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/info/info.vue'),
    meta: {
      title: '基本信息查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/prove',
    name: 'Prove',
    component: Prove,
    meta: {
      title: '社保证明查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/provePdf',
    name: 'ProvePdf',
    component: () => import('../views/prove/prove-pdf.vue'),
    meta: {
      title: '个人社保证明详情',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/rights',
    name: 'Rights',
    component: Rights,
    meta: {
      title: '个人权益单',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/rightsPdf',
    name: 'Rightspdf',
    component: () => import('../views/rights/rights-pdf.vue'),
    meta: {
      title: '个人权益单详情',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/pension',
    name: 'Pension',
    component: Pension,
    meta: {
      title: '城镇职工养老信息查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/card',
    name: 'Card',
    component: Card,
    meta: {
      title: '社会保障卡应用状态查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/pace',
    name: 'Pace',
    component: () => import('../views/pace/pace.vue'),
    meta: {
      title: '社会保障卡进度查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/paceDetails',
    name: 'PaceDetails',
    component: () => import('../views/pace/pace-show.vue'),
    meta: {
      title: '社会保障卡进度详情',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/licensePdf',
    name: 'LicensePdf',
    component: () => import('../views/pdf/license-pdf.vue'),
    meta: {
      title: '职业技能证书查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/titlePdf',
    name: 'TitlePdf',
    component: () => import('../views/pdf/title-pdf.vue'),
    meta: {
      title: '职称电子证书查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/Insured',
    name: 'Insured',
    component: () => import('../views/Insured/Insured.vue'),
    meta: {
      title: '参保信息列表',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/Ins-show',
    name: 'InsShow',
    component: () => import('../views/Insured/ins-show.vue'),
    meta: {
      title: '参保信息详情',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: () => import('../views/transfer/index.vue'),
    meta: {
      title: '转移综合查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/transfeDetailsr',
    name: 'TransfeDetailsr',
    component: () => import('../views/transfer/details.vue'),
    meta: {
      title: '转移综合查询详情',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/bill',
    name: 'Bill',
    component: Bill,
    meta: {
      title: '电子票据查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/bill-list',
    name: 'Billlist',
    component: Billlist,
    meta: {
      title: '电子票据列表',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/bill-pdf',
    name: 'Billpdf',
    component: () => import('../views/bill/bill-pdf.vue'),
    meta: {
      title: '电子票据详情',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/progress',
    name: 'Progress',
    component: () => import('../views/progress/list.vue'),
    meta: {
      title: '办事进度',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/progress-details',
    name: 'ProgressDetails',
    component: () => import('../views/progress/details.vue'),
    meta: {
      title: '办事进度详情',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/progress-pdf',
    name: 'ProgressPdf',
    component: () => import('../views/progress/pdf.vue'),
    meta: {
      title: '办事进度结果',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/paymentDetails',
    name: 'PaymentDetails',
    component: () => import('../views/shebao/payment-details.vue'),
    meta: {
      title: '城镇职工养老待遇支付信息查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/pensionInfo',
    name: 'PensionInfo',
    component: () => import('../views/shebao/pension-info.vue'),
    meta: {
      title: '机关养老账户信息查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/pensionPay',
    name: 'PensionPay',
    component: () => import('../views/shebao/pension-pay.vue'),
    meta: {
      title: '机关养老缴费信息查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/treatmentPay',
    name: 'TreatmentPay',
    component: () => import('../views/shebao/treatment-pay.vue'),
    meta: {
      title: '失业保险待遇支付查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/cognizance',
    name: 'Cognizance',
    component: () => import('../views/shebao/cognizance.vue'),
    meta: {
      title: '工伤认定查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/unemploymentPay',
    name: 'UnemploymentPay',
    component: () => import('../views/shebao/unemployment-pay.vue'),
    meta: {
      title: '工伤保险待遇支付查询',
      requireAuth: true, // 判断是否需要登录
    },
  },
  {
    path: '/pay-query',
    name: 'PayQuery',
    component: () => import('../views/pay/pay-query.vue'),
    meta: {
      title: '缴费信息查询',
    },
  },
  {
    path: '/pay-list',
    name: 'PayList',
    component: () => import('../views/pay/pay-list.vue'),
    meta: {
      title: '缴费信息列表',
    },
  },
  {
    path: '/pay-details',
    name: 'PayDetails',
    component: () => import('../views/pay/pay-details.vue'),
    meta: {
      title: '缴费信息详情',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
