import Vue from 'vue'
import Router from 'vue-router'
import Client from '@/components/Client'
import Screen from '@/components/Screen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Client',
      component: Client
    },
    {
      path: '/screen',
      name: 'Screen',
      component: Screen
    }
  ]
})
