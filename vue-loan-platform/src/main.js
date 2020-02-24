import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.less'
import './assets/css/font/font.css'
import 'lib-flexible/flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import api from './api' // 导入api接口
import { globalLoanPath } from '@/mixins'
Vue.mixin(globalLoanPath)
Vue.use(Vant)
Vue.config.productionTip = false

Vue.prototype.$api = api
// if (store.getters.home.closeStatus) {
//   // this.closedTips
//   this.$toast({
//     type: "warning",
//     message: store.getters.home.closedTips
//   });
//   router.push({ name: "404" });
// }
new Vue({
  router,
  store,
  created() {
    if (this.loan_path) {
      this.getData()
    }
  },
  methods: {
    async getData() {
      const data = await store.dispatch('home/_home')
      document.title = data.siteTitle || ''
      const kMeta = document.createElement('meta')
      kMeta.content = data.siteKeyword || ''
      kMeta.name = 'keywords'
      document.getElementsByTagName('head')[0].appendChild(kMeta)
      const sMeta = document.createElement('meta')
      sMeta.content = data.siteDesc || ''
      sMeta.name = 'description'
      document.getElementsByTagName('head')[0].appendChild(sMeta)
      let regJs = ''
      if (data.statisticalCode) {
        data.statisticalCode.replace(
          /<script.*?>([\s\S]+?)<\/script>/gim,
          function(_, js) {
            regJs = js
          }
        )
        new Function(regJs)()
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
