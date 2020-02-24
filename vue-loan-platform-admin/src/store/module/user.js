import { login, loginOut } from '@/api/user'
import { Message } from 'element-ui'
import router from '@/router'
const state = {
  type: sessionStorage.getItem('type') ? sessionStorage.getItem('type') : '', // 认证凭证'
  userName: sessionStorage.getItem('userName')
    ? sessionStorage.getItem('userName')
    : '',
  userId: sessionStorage.getItem('userId')
    ? sessionStorage.getItem('userId')
    : '',
  accessToken: sessionStorage.getItem('accessToken')
    ? sessionStorage.getItem('accessToken')
    : ''
}

const actions = {
  _login({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then(res => {
          if (res.code === 200) {
            Message.success('登录成功')
            commit('SET_NAME', res.data.userName)
            commit('SET_TYPE', res.data.type)
            commit('SET_ID', res.data.id)
            commit('SET_TOKEN', res.extendData.accessToken)
            resolve(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loginOut({ commit }) {
    loginOut().then(() => {
      commit('DEL_TOKEN')
      router.push({
        path: '/login',
        query: {
          redirect: '/'
        }
      })
    })
  }
}

const mutations = {
  SET_TYPE(state, val) {
    state.type = val
    sessionStorage.setItem('type', val)
  },
  SET_NAME(state, payload) {
    state.userName = payload
    sessionStorage.setItem('userName', payload)
  },
  SET_ID(state, payload) {
    state.userId = payload
    sessionStorage.setItem('userId', payload)
  },
  SET_TOKEN(state, payload) {
    state.accessToken = payload
    sessionStorage.setItem('accessToken', payload)
  },
  DEL_TOKEN(state) {
    state.type = ''
    state.userName = ''
    state.userId = ''
    state.accessToken = ''
    sessionStorage.removeItem('type')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('accessToken')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
