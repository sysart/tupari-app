import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { join, leaveSession, addMessage } from '@/firebase'
import { getScore, MESSAGE_TYPES } from '@/stuff'

Vue.use(Vuex)

const refs = {}

const createMessage = (state, type, data) => {
  addMessage(type, {
    ...data,
    user: {
      id: state.user['.key'],
      name: state.user.name
    },
    team: {
      id: state.team['.key'],
      name: state.team.name,
      emoji: state.team.emoji
    }
  })
}

export default new Vuex.Store({
  state: {
    user: null,
    team: null,
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
      return join(session, name)
    }),
    updateResult: firebaseAction(({ state }, { game, result }) => {
      const gameRef = refs['user'].child(`games/${game.id}`)
      const computedScore = getScore(game.id, result)
      const score = computedScore || result

      if (game.score === undefined || score > game.score) {
        createMessage(state, MESSAGE_TYPES.RESULT, {
          ...game.result && {
            prevResult: game.result
          },
          ...game.score && {
            prevScore: game.score
          },
          result,
          score
        })
      }

      return gameRef.set({
        score,
        result
      })
    }),
    updateTeam: firebaseAction((context, team) => {
      const teamRef = refs['teams'].child(team['.key'])
      teamRef.child('name').set(team.name)
      teamRef.child('emoji').set(team.emoji)
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
