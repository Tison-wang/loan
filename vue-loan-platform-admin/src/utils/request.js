import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
// 在全局请求和响应拦截器中添加请求状态
// let loading = null;
Vue.prototype.$http = axios // 并发请求

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Message({
    type: 'warning',
    message: msg,
    duration: 2000,
    forbidClick: true
  })
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

const errorHandle = (status, msg) => {
  // 状态码判断
  switch (status) {
    case 10001:
      tip(msg)
      store.commit('user/DEL_TOKEN')
      break
    // 10002: 未登录状态，跳转登录页
    case 10002:
      tip(msg)
      store.commit('user/DEL_TOKEN')
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    default:
      tip(msg)
  }
}

axios.defaults.withCredentials = true
const path = document.location.hostname

// 创建service实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 60000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    domain: path
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // loading = Loading.service({ text: "拼命加载中" });
    // config.method = "post";

    if (config.method.toLocaleLowerCase() === 'post') {
      // 如果是上載文件的話，不格式化
      if (!config.url.includes('upload')) {
        config.data = qs.stringify(config.data)
      }
    }
    config.headers.accessToken = store.getters.accessToken || '' // 让每个請求携带token-- ['X-Token']为自定义key 請根据实际情况自行修改
    // if (token) {
    //   config.headers.Authorization = token; // 请求头部添加token
    // }
    return config
  },
  error => {
    // console.log(error); // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    // if (loading) {
    //   loading.close();
    // }
    /**
     * 下面的註释为通过response自定义code来标示請求狀態，当code返回如下情况为权限有问题，登出并返回到登录頁
     * 如通过xmlhttprequest 狀態码标识 逻辑可写在下面error中
     */
    const code = response.status
    // 每次响应後更新token
    // if (res.token) {
    //   // setToken(res.token);
    //   store.commit("SET_TOKEN", res.token);
    // }
    // 请求成功返回response.data
    if (code === 200) {
      if (response.data.code !== 200) {
        errorHandle(response.data.code, response.data.msg)
      }
      // console.log(response);
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }

    // if (code !== 200) {
    //   // 300: 登錄超時
    //   // 400: 無權限
    //   // 501: 賬號或密碼不正確
    //   // 1001: 賬號不存在
    //   // 1002：密碼錯誤
    //   // 刷新頁面，跳轉回登錄界面
    //   const ERROR_CODE = [300, 301, 1001];
    //   if (ERROR_CODE.includes(code)) {
    //     Message({
    //       message: res.msg,
    //       type: "error",
    //       duration: 1500,
    //       onClose() {
    //         store.dispatch("FedLogOut");
    //       }
    //     });
    //   }
    //   // return res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    //   return Promise.reject(res);
    // }

    // return res;
  },
  error => {
    // console.log("err", error); // for debug
    // if (loading) {
    //   loading.close();
    // }
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.data.code, response.data.msg)
    } else {
      if (error.message.includes('timeout')) {
        Message.error('请求超时！请检查网络是否正常')
      } else {
        Message.error('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(response)
  }
)

// service.all = axios.all;

export default service
// get，post请求方法
// export default {
//   post(url, data) {
//     return service({
//       method: "post",
//       url,
//       data: qs.stringify(data),
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
//       }
//     });
//   },
//   get(url, params) {
//     return service({
//       method: "get",
//       url,
//       params
//     });
//   }
// };
