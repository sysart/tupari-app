import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import Wrapper from './components/Wrapper'

sync(store, router)

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.component('Wrapper', Wrapper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
