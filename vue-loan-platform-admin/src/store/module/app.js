const state = {
  opened: sessionStorage.getItem('open')
    ? sessionStorage.getItem('open')
    : 'false'
}

const actions = {}

const mutations = {
  SET_OPENED(state, val) {
    state.opened = String(val)
    sessionStorage.setItem('open', val)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
