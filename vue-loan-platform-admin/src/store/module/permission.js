import { routes } from '@/router'
const state = {
  route: []
}

const actions = {
  getAsyncRoutes({ commit, rootGetters }) {
    return new Promise(resolve => {
      let route = []
      if (+rootGetters.type === 2) {
        route = [...routes]
      } else {
        route = routes.filter(el => !el.type)
      }
      commit('SET_ROUTES', route)
      resolve(route)
    })
  }
}

const mutations = {
  SET_ROUTES(state, val) {
    state.route = [...val]
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
