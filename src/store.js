import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { join, leaveSession, addMessage as addFirebaseMessage } from '@/firebase'
import { getScore } from '@/stuff'

Vue.use(Vuex)

const refs = {}

const addMessage = (state, message) => {
  message = message.replace('USER', state.user.name)
  addFirebaseMessage(message, {
    ...state.team.emoji && {
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

      if (game.score === undefined) {
        if (computedScore) {
          addMessage(state, `USER pelasi ${game.name} peliä ja sai tuloksen ${result}, jolla ansaitsi joukkueelleen ${score} pistettä`)
        } else {
          addMessage(state, `USER pelasi ${game.name} peliä ja sai ${score} pistettä`)
        }
      } else if (score > game.score) {
        if (computedScore) {
          addMessage(state, `USER pelasi ${game.name} peliä taas ja sai paremman tuloksen ${result}, jolla ansaitsi joukkueelleen ${score - game.score} lisäpistettä`)
        } else {
          addMessage(state, `USER pelasi ${game.name} peliät taas ja sai ${score - game.score} lisäpistettä`)
        }
      }

      return gameRef.set({
        score,
        ...computedScore && {
          result
        }
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
