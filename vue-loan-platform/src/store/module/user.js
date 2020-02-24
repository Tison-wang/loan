import common from '@/api/common'
import { Toast } from 'vant'
import router from '@/router'
const state = {
  name: sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '',
  token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
}

const actions = {
  _login({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      common
        .login(formdatas)
        .then(res => {
          if (res.code === 200) {
            Toast.success('登录成功')
            commit('SET_NAME', res.data.userName)
            commit('SET_TOKEN', res.extendData.accessToken)
            resolve(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  _loginOut({ commit }) {
    common.loginOut().then(() => {
      commit('DEL_NAME')
      router.push({
        name: 'login'
      })
    })
  }
}

const mutations = {
  SET_NAME(state, payload) {
    state.name = payload
    sessionStorage.setItem('name', payload)
  },
  SET_TOKEN(state, payload) {
    state.token = payload
    sessionStorage.setItem('token', payload)
  },
  DEL_NAME(state) {
    state.name = ''
    state.token = ''
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('token')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
