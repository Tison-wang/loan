import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import qs from 'qs'
import { Toast } from 'vant'
import store from '@/store'
// 在全局请求和响应拦截器中添加请求状态
// let loading = null;

Vue.prototype.$http = axios // 并发请求

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({
    type: 'warning',
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//   router.replace({
//     name: "login",
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   });
// };

const errorHandle = (status, other) => {
  // 状态码判断

  switch (status) {
    case 30001:
      // tip(other);
      router.push({ name: 'notFound' })
      break
    case 30002:
      // tip(other);
      router.push({ name: 'notExist' })
      break
    case 10001:
      tip('用户名或密码错误')
      store.commit('user/DEL_NAME')
      break
    // 10002: 未登录状态，跳转登录页
    case 10002:
      // tip("登录过期，请重新登录");
      store.commit('user/DEL_NAME')
      setTimeout(() => {
        router.push({
          name: 'login'
        })
      }, 1000)
      break
    case undefined:
      break
    default:
      tip(other)
  }
}
axios.defaults.withCredentials = true
const path = document.location.hostname
// 创建service实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    domain: path
  }
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (config.method.toLocaleLowerCase() === 'post') {
      // 如果是上載文件的話，不格式化
      if (!config.url.includes('upload')) {
        config.data = qs.stringify(config.data)
      }
    }
    config.headers.accessToken = store.getters.token || ''
    // config.headers.token = getToken(); // 让每个請求携带token-- ['X-Token']为自定义key 請根据实际情况自行修改
    // if (token) {
    //   config.headers.Authorization = token; // 请求头部添加token
    // }
    return config
  },
  error => {
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
    //     Toast({
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
        Toast.fail('请求超时！请检查网络是否正常')
      } else {
        Toast.fail('请求失败，请检查网络是否已连接')
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
