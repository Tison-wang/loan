import common from '@/api/common'
const state = {
  home: sessionStorage.getItem('home')
    ? JSON.parse(sessionStorage.getItem('home'))
    : ''
}

const actions = {
  _home({ commit }) {
    return new Promise((resolve, reject) => {
      common
        .home()
        .then(res => {
          if (res.code === 200) {
            commit('SET_HOME', res.data)
            resolve(res.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const mutations = {
  SET_HOME(state, payload) {
    state.home = payload
    sessionStorage.setItem('home', JSON.stringify(payload))
  },
  SET_USER_STATUS(state, payload) {
    state.userStatus = payload
    sessionStorage.setItem('userStatus', JSON.stringify(payload))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
