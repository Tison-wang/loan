import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import { Toast } from "vant";
Vue.use(VueRouter)

/**
 * navHeader 是否显示头部的导航 true 为不显示
 * navFooter 是否显示底部的导航 true 为显示
 * rquireAuth true 为必须登录
 */
const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login')
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: '注册' },
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/login/register')
  },
  {
    path: '/forget-pwd',
    name: 'forgetPwd',
    meta: { title: '找回密码' },
    component: () =>
      import(/* webpackChunkName: "forgetPwd" */ '@/views/login/forgetPwd')
  },
  {
    path: '/',
    name: 'home',
    meta: { title: '首页', navHeader: true },
    component: () => import(/* webpackChunkName: "applyMoney" */ '@/views/Home')
  },
  {
    path: '/apply-money',
    name: 'applyMoney',
    meta: { title: '首页', navHeader: true, navFooter: true },
    component: () =>
      import(/* webpackChunkName: "applyMoney" */ '@/views/applyMoney')
  },
  {
    path: '/gold',
    name: 'gold',
    meta: { navHeader: true, navFooter: true, rquireAuth: true },
    component: () => import(/* webpackChunkName: "gold" */ '@/views/gold')
  },
  {
    path: '/my-center',
    name: 'myCenter',
    meta: {
      navHeader: true,
      navFooter: true,
      title: '个人中心',
      rquireAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "myCenter" */ '@/views/myCenter')
  },
  {
    path: '/my-info',
    name: 'myInfo',
    meta: { title: '我的资料', rquireAuth: true },
    component: () =>
      import(/* webpackChunkName: "myInfo" */ '@/views/myCenter/myInfo')
  },
  {
    path: '/id-info',
    name: 'idInfo',
    meta: { title: '基本信息', rquireAuth: true },
    component: () =>
      import(/* webpackChunkName: "idInfo" */ '@/views/myCenter/myInfo/idInfo')
  },
  {
    path: '/person-info',
    name: 'personInfo',
    meta: { title: '资料信息', rquireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "personInfo" */ '@/views/myCenter/myInfo/personInfo'
      )
  },
  {
    path: '/bank-card',
    name: 'bankCard',
    meta: { title: '收款银行卡', rquireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "bankCard" */ '@/views/myCenter/myInfo/bankCard'
      )
  },
  // {
  //   path: "/apply-money",
  //   name: "applyMoney",
  //   meta: { navHeader: true, rquireAuth: true },
  //   component: () =>
  //     import(/* webpackChunkName: "applyMoney" */ "@/views/applyMoney")
  // },
  {
    path: '/apply-comfirm',
    name: 'applyComfirm',
    meta: { title: '申请借款', rquireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "applyComfirm" */ '@/views/applyMoney/applyComfirm'
      )
  },
  {
    path: '/apply-cash',
    name: 'applyCash',
    meta: { title: '申请提现', rquireAuth: true },
    component: () =>
      import(/* webpackChunkName: "applyCash" */ '@/views/gold/applyCash')
  },
  {
    path: '/pay-cash',
    name: 'payCash',
    meta: { title: '申请提现', rquireAuth: true },
    component: () =>
      import(/* webpackChunkName: "payCash" */ '@/views/gold/payCash')
  },

  {
    path: '/contract',
    name: 'contract',
    meta: { title: '合同管理', rquireAuth: true },
    component: () =>
      import(/* webpackChunkName: "contract" */ '@/views/myCenter/contract')
  },
  {
    path: '/my-loan',
    name: 'myLoan',
    meta: { title: '我的借款', rquireAuth: true },
    component: () =>
      import(/* webpackChunkName: "myLoan" */ '@/views/myCenter/myLoan')
  },
  {
    path: '/loan-detail',
    name: 'loanDetail',
    meta: { title: '我的借款', rquireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "loanDetail" */ '@/views/myCenter/myLoan/detail'
      )
  },
  {
    path: '/my-question',
    name: 'myQuestion',
    meta: { title: '客服', rquireAuth: true },
    component: () =>
      import(/* webpackChunkName: "myQuestion" */ '@/views/myCenter/myQuestion')
  },
  // {
  //   path: "/my-question/:number",
  //   name: "myQuestion",
  //   meta: { title: "借款说明", rquireAuth: true },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "myQuestion" */ "@/views/myCenter/myQuestion/loanInstruction"
  //     )
  // },
  {
    path: '/my-repay',
    name: 'myRepay',
    meta: { title: '我的还款', rquireAuth: true },
    component: () =>
      import(/* webpackChunkName: "myRepay" */ '@/views/myCenter/myRepay')
  },
  {
    path: '/edit-pwd',
    name: 'editPwd',
    meta: { title: '修改密码', rquireAuth: true },
    component: () =>
      import(/* webpackChunkName: "editPwd" */ '@/views/myCenter/editPwd')
  },
  {
    path: '/not',
    name: 'notExist',
    meta: { navHeader: true, title: '站点不存在' },
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "notExist" */ '@/views/notExist.vue')
  },
  // 404页面放最后，不然放前面会跳到404页面
  {
    path: '/404',
    name: 'notFound',
    meta: { navHeader: true, title: '404' },
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "notFound" */ '@/views/notFound.vue')
  },
  {
    path: '*',
    hidden: true,
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.NODE_ENV === "production" ? "/dist/" : "",
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.rquireAuth) {
    if (store.getters.name) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
