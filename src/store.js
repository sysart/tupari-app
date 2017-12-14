import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { addMessage, findUserByCode, clear } from '@/firebase'
import { getScore, MESSAGE_TYPES } from '@/stuff'
import _ from 'lodash'

Vue.use(Vuex)

const refs = {}

const createMessage = (state, type, data) => {
  const sessionRef = refs.user.parent.parent.parent.parent
  addMessage(sessionRef, type, {
    ...data,
    user: state.user.name,
    team: state.team.name
  })
}

export default new Vuex.Store({
  state: {
    user: null,
    team: null,
    teams: [],
    session: null,
    messages: []
  },
  mutations: {
    clear (state, key) {
      if (state[key] && state[key].length) {
        state[key] = []
      } else {
        state[key] = null
      }
    },
    ...firebaseMutations
  },
  actions: {
    setRef ({ commit }, { key, ref }) {
      refs[key] = ref
    },

    unsetRef ({ commit }, key) {
      delete refs[key]
    },

    bindRef: firebaseAction(({ commit, bindFirebaseRef }, { key, ref }) => {
      refs[key] = ref
      bindFirebaseRef(key, ref)
    }),

    unbindRef: firebaseAction(({ unbindFirebaseRef, commit }, key) => {
      delete refs[key]
      unbindFirebaseRef(key)
      commit('clear', key)
    }),

    updateResult: firebaseAction(({ state }, { game, result, otherUser }) => {
      const gameRef = refs['user'].child(`games/${game.id}`)
      const computedScore = getScore(game.id, result)
      const score = computedScore !== null ? computedScore : result

      if (game.id === 'meet') {
        createMessage(state, MESSAGE_TYPES.MEET, {
          otherName: otherUser.name,
          game: game.name
        })
      } else if (game.score === undefined || score > game.score) {
        createMessage(state, MESSAGE_TYPES.RESULT, {
          ...game.result && {
            prevResult: game.result
          },
          ...game.score && {
            prevScore: game.score
          },
          result,
          score,
          game: game.name
        })
      }

      return gameRef.set({
        score,
        result
      })
    }),

    meet: firebaseAction(({ state }, code) => {
      const existingCodes = Object.values(state.user.meets || {}).map(u => u.code)

      if (existingCodes.indexOf(code) !== -1) {
        return Promise.reject(new Error('VILPPIÄ! Olet jo syöttänyt tämän henkilön numeron.'))
      }

      const userRef = refs['user']
      return findUserByCode(userRef, code)
        .then((otherUser) => {
          return userRef.child('meets').push(otherUser)
            .then(() => {
              return {
                otherUser,
                result: Math.min(6, _.get(state.user, 'games.meet.result', 0) + 1)
              }
            })
        })
    }),

    send: ({ state }, message) => {
      createMessage(state, MESSAGE_TYPES.CHAT, {
        message
      })
    },

    updateTeam: firebaseAction((context, team) => {
      const teamRef = refs['teams'].child(team['.key'])
      teamRef.child('name').set(team.name)
    }),

    removeTeam: firebaseAction((context, team) => {
      refs['teams'].child(team['.key']).remove()
    }),

    createTeam: firebaseAction((context, name) => {
      refs['teams'].push({
        name
      })
    }),

    clear: firebaseAction((context) => {
      clear(refs['teams'].parent)
    })
  },
  getters: {

  }
})
