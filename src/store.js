import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { userRef, joinSession, leaveSession } from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    clearUser (state) {
      state.user = null
    },
    ...firebaseMutations
  },
  actions: {
    setUserRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('user', ref)
    }),
    unsetUserRef: firebaseAction(({ unbindFirebaseRef }) => {
      unbindFirebaseRef('user')
    }),
    join: firebaseAction((context, { name, session }) => {
      return joinSession(session).then(ref => {
        return ref.child('name').set(name)
      })
    }),
    updateResult: firebaseAction((context, { game, result }) => {
      return userRef().then(ref => {
        ref.child(`games/${game}`).set(result)
      })
    }),
    leaveSession () {
      leaveSession()
      this.commit('clearUser')
    }
  },
  getters: {

  }
})
