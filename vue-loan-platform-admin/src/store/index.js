import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
const path = require('path')
Vue.use(Vuex)

const files = require.context('./module', false, /\.js$/)
// console.log("filse:", files.keys());
let modules = {}
files.keys().forEach(key => {
  let name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})

export default new Vuex.Store({
  getters,
  modules
})
