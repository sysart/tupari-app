import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { userRef, join, leaveSession } from '@/firebase'
import { getScore } from '@/stuff'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    teams: []
  },
  mutations: {
    clearUser (state) {
      state.user = null
    },
    ...firebaseMutations
  },
  actions: {
    bindRef: firebaseAction(({ commit, bindFirebaseRef }, pair) => {
      bindFirebaseRef(pair.key, pair.ref)
    }),
    unbindRef: firebaseAction(({ unbindFirebaseRef }, key) => {
      unbindFirebaseRef(key)
    }),
    join: firebaseAction((context, { name, session }) => {
      return join(session).then(ref => {
        return ref.child('name').set(name)
      }).catch(error => console.error(error))
    }),
    updateResult: firebaseAction((context, { game, result }) => {
      const computedScore = getScore(game, result)

      return userRef().then(ref => {
        ref.child(`games/${game}`).set({
          score: computedScore || result,
          ...computedScore && {
            result
          }
        })
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
