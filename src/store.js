import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { userRef, join, leaveSession } from '@/firebase'
import { getScore } from '@/stuff'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    teams: null,
    session: null
  },
  mutations: {
    clear (state, key) {
      state[key] = null
    },
    ...firebaseMutations
  },
  actions: {
    bindRef: firebaseAction(({ commit, bindFirebaseRef }, { key, ref }) => {
      console.log('höhö', key, ref)
      bindFirebaseRef(key, ref)
    }),
    unbindRef: firebaseAction(({ unbindFirebaseRef, commit }, key) => {
      unbindFirebaseRef(key)
      commit('clear', key)
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
    }
  },
  getters: {

  }
})
