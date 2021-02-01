import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import 'lib-flexible/flexible'
import './assets/css/reset.css'
import './assets/css/border.css'
import routers from '@/utils/routers'
import apiAjax from '@/utils/http'
import {
  Button,
  NavBar,
  Search,
  Row,
  Col,
  Icon,
  Tabbar,
  TabbarItem,
  Divider,
  Popup,
  Area,
  PullRefresh,
  Field,
  CellGroup,
  Cell,
  DropdownMenu,
  DropdownItem,
  AddressEdit,
  RadioGroup,
  Radio,
  Form,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Tab,
  Tabs,
  ActionSheet,
  Picker,
  DatetimePicker,
  Grid,
  GridItem,
  Skeleton,
  Toast,
  List,
  Dialog,
  Step,
  Steps,
  Sticky,
  Checkbox,
} from 'vant'
Vue.use(Button)
  .use(NavBar)
  .use(Search)
  .use(Row)
  .use(Col)
  .use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Divider)
  .use(VanImage)
  .use(Popup)
  .use(Area)
  .use(PullRefresh)
  .use(Field)
  .use(CellGroup)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(AddressEdit)
  .use(RadioGroup)
  .use(Radio)
  .use(Form)
  .use(Cell)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(ActionSheet)
  .use(Picker)
  .use(DatetimePicker)
  .use(Grid)
  .use(GridItem)
  .use(Skeleton)
  .use(Toast)
  .use(List)
  .use(Dialog)
  .use(Step)
  .use(Steps)
  .use(Sticky)
  .use(Checkbox)

Vue.config.productionTip = false
Vue.prototype.$token = routers
Vue.prototype.$http = apiAjax

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    // console.log('需要登录')
    // alert(localStorage.token)
    if (sessionStorage.token) {
      // 判断当前的token是否存在 ； 登录存入的token
      next()
    } else {
      if (from.path === '/' && !sessionStorage.token) {
        Dialog({ message: '您是未登录状态，无法操作' })
        return
      }
      next({
        path: '/',
        // query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
