import Vue from 'vue'
import Router from 'vue-router'
import Client from '@/components/Client'
import Screen from '@/components/Screen'
import Teams from '@/components/Teams'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Client',
      component: Client
    },
    {
      path: '/:session/screen',
      name: 'Screen',
      component: Screen
    },
    {
      path: '/:session/teams',
      name: 'Teams',
      component: Teams
    }
  ]
})
