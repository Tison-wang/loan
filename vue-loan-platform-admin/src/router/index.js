import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import { Message } from "element-ui";
Vue.use(VueRouter)
/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */
// export const currencyRoutes = [
//   {
//     path: "/login",
//     name: "login",
//     hidden: true,
//     meta: { title: "登录页" },
//     component: () => import(/* webpackChunkName: "login" */ "@/views/login")
//   }
// ];

export const routes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: { title: '登录页' },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  },
  {
    path: '/',
    // redirect: "/home",
    component: () =>
      import(/* webpackChunkName: "layouts" */ '@/layouts/BasicLayout'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: { title: '管理首页', icon: 'el-icon-s-home', rquireAuth: true },
        component: () => import(/* webpackChunkName: "home" */ '@/views/home')
      }
    ]
  },
  {
    path: '/system',
    // redirect: "/system",
    component: () =>
      import(/* webpackChunkName: "layouts" */ '@/layouts/BasicLayout'),
    children: [
      {
        path: '',
        name: 'systemManagement',
        meta: { title: '系统设置', icon: 'el-icon-s-tools', rquireAuth: true },
        component: () =>
          import(/* webpackChunkName: "system" */ '@/views/systemManagement')
      }
    ]
  },
  {
    path: '/manager',
    // redirect: "/manager",
    type: true,
    component: () =>
      import(/* webpackChunkName: "layouts" */ '@/layouts/BasicLayout'),
    children: [
      {
        path: '',
        name: 'manager',
        meta: {
          title: '网站管理员',
          icon: 'el-icon-user-solid',
          rquireAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "manager" */ '@/views/manager')
      }
    ]
  },
  {
    path: '/siteManagement',
    type: true,
    component: () =>
      import(/* webpackChunkName: "layouts" */ '@/layouts/BasicLayout'),
    children: [
      {
        path: '',
        name: 'siteManagement',
        meta: {
          title: '站点管理',
          icon: 'el-icon-s-promotion',
          rquireAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "siteManagement" */ '@/views/siteManagement'
          )
      }
    ]
  },
  {
    path: '/free',
    // redirect: "/free",
    component: () =>
      import(/* webpackChunkName: "layouts" */ '@/layouts/BasicLayout'),
    children: [
      {
        path: '',
        name: 'free',
        meta: {
          title: '常见问题管理',
          icon: 'el-icon-s-management',
          rquireAuth: true
        },
        component: () => import(/* webpackChunkName: "free" */ '@/views/free')
      }
    ]
  },
  {
    path: '/userManagement',
    // redirect: "/userManagement",
    component: () =>
      import(/* webpackChunkName: "layouts" */ '@/layouts/BasicLayout'),
    children: [
      {
        path: '',
        name: 'UserManagement',
        meta: { title: '用户管理', icon: 'el-icon-s-custom', rquireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "userManagement" */ '@/views/userManagement'
          )
      }
    ]
  },
  {
    path: '/loanManagement',
    // redirect: "/loanManagement",
    component: () =>
      import(/* webpackChunkName: "layouts" */ '@/layouts/BasicLayout'),
    children: [
      {
        path: '',
        name: 'LoanManagement',
        meta: { title: '借款列表', icon: 'el-icon-s-data', rquireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "loanManagement" */ '@/views/loanManagement'
          )
      }
    ]
  },
  {
    path: '/contractManagement',
    // redirect: "/contractManagement",
    component: () =>
      import(/* webpackChunkName: "layouts" */ '@/layouts/BasicLayout'),
    children: [
      {
        path: '',
        name: 'ContractManagement',
        meta: { title: '合同管理', icon: 'el-icon-s-order', rquireAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "ContractManagement" */ '@/views/contractManagement'
          )
      }
    ]
  },
  // 404页面放最后，不然放前面会跳到404页面
  {
    path: '/404',
    name: 'notFound',
    meta: { title: '404' },
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "notFound" */ '@/views/notFound.vue')
  },
  {
    path: '*',
    name: '*notFound',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/admin/' : '',
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  if (to.meta.rquireAuth) {
    if (store.getters.type) {
      if (store.getters.routes.length === 0) {
        await store.dispatch('permission/getAsyncRoutes')
      }
      next()
    } else {
      next({
        path: '/login',
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
