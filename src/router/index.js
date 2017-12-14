import Vue from 'vue'
import Router from 'vue-router'
import Client from '@/components/Client'
import Start from '@/components/Start'
import Screen from '@/components/Screen'
import Teams from '@/components/Teams'
import Game from '@/components/Game'
import Home from '@/components/Home'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/:session/screen',
      name: 'screen',
      component: Screen
    },
    {
      path: '/:session/teams',
      name: 'teams',
      component: Teams
    },
    {
      path: '/:session',
      component: Client,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'chat',
          name: 'chat',
          component: Chat
        },
        {
          path: ':game',
          name: 'game',
          component: Game
        }
      ]
    }
  ]
})
