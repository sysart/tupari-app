import Vue from 'vue'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.css'

import App from './App'
import store from './store'
import router from './router'

// Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
