import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.less'
import api from './api' // 导入api接口
// 公共函數
import validate from './utils/validate'
Vue.use(validate)
// 引入 vue-kikindeditor 需要的文件
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'
// 注册 vue-kikindeditor plugin
Vue.use(VueKindEditor)
import {
  Container,
  Button,
  Select,
  Option,
  Input,
  Form,
  FormItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Header,
  Aside,
  Main,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar,
  Message,
  Tabs,
  TabPane,
  Radio,
  RadioGroup,
  DatePicker,
  Pagination,
  Link,
  Dialog,
  Upload,
  Loading,
  Tooltip,
  MessageBox
} from 'element-ui'
Vue.config.productionTip = false

Vue.use(Container)
  .use(Button)
  .use(Select)
  .use(Option)
  .use(Input)
  .use(Form)
  .use(FormItem)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Table)
  .use(TableColumn)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Scrollbar)
  .use(Tabs)
  .use(TabPane)
  .use(Radio)
  .use(RadioGroup)
  .use(DatePicker)
  .use(Pagination)
  .use(Link)
  .use(Dialog)
  .use(Upload)
  .use(Loading)
  .use(Tooltip)

// 全局公共分頁組件
import '@/components/Pagination'
import '@/components/ComDialog'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
