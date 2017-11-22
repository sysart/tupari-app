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
    join: firebaseAction(({}, name) => {
      return userRef().then(ref => {
        return ref.set({
          name
        })
      })
    }),
    updateScore: firebaseAction((context, {game, score}) => {
      return userRef().then(ref => {
        ref.child(`games/${game}`).set(score)
      })
    })
  },
  getters: {

  }
})
