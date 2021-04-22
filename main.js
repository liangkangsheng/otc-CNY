import Vue from 'vue'
import App from './App'
import { TOAST,CONFIRM,SET_STORAGE,GET_STORAGE,REMOVE_STORAGE } from '@/common/globalConfig.js'
import noMsg from '@/components/noMsg/no-msg.vue'//暂无更多数据
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
Vue.config.productionTip = false

Vue.component("no-msg",noMsg)
Vue.component("uni-load-more",uniLoadMore)


Vue.prototype.$alert=TOAST
Vue.prototype.$confirm=CONFIRM
Vue.prototype.$setStrg=SET_STORAGE
Vue.prototype.$getStrg=GET_STORAGE
Vue.prototype.$remStrg=REMOVE_STORAGE
App.mpType = 'app'

import i18n from './lang/index' 
Vue.prototype._i18n = i18n
const app = new Vue({
    i18n,
    ...App
})
app.$mount()
