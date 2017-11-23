import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { userRef } from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    setUserRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('user', ref)
    }),
    join: firebaseAction((context, name) => {
      return userRef().then(ref => {
        return ref.set({
          name
        })
      })
    }),
    updateResult: firebaseAction((context, { game, result }) => {
      return userRef().then(ref => {
        ref.child(`games/${game}`).set(result)
      })
    })
  },
  getters: {

  }
})
