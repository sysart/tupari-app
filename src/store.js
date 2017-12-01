import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { join, leaveSession } from '@/firebase'
import { getScore } from '@/stuff'

Vue.use(Vuex)

const refs = {}

export default new Vuex.Store({
  state: {
    user: null,
    teams: [],
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
      refs[key] = ref
      bindFirebaseRef(key, ref)
    }),
    unbindRef: firebaseAction(({ unbindFirebaseRef, commit }, key) => {
      delete refs[key]
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

      return refs['user'].child(`games/${game}`).set({
        score: computedScore || result,
        ...computedScore && {
          result
        }
      })
    }),
    updateTeam: firebaseAction((context, team) => {
      refs['teams'].child(team['.key']).child('name').set(team.name)
    }),
    removeTeam: firebaseAction((context, team) => {
      refs['teams'].child(team['.key']).remove()
    }),
    createTeam: firebaseAction((context, name) => {
      refs['teams'].push({
        name
      })
    }),
    leaveSession () {
      leaveSession()
    }
  },
  getters: {

  }
})
