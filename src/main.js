import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import Wrapper from './components/Wrapper'

sync(store, router)

Vue.use(VueMaterial)
Vue.use(VueChatScroll)

Vue.config.productionTip = false

Vue.component('Wrapper', Wrapper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
