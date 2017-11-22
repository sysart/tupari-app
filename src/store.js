import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { todosRef } from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    setTodosRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('todos', ref)
    }),
    addTodo () {
      todosRef.push({
        title: Math.random().toString(36).slice(2)
      })
    }
  },
  getters: {

  }
})
