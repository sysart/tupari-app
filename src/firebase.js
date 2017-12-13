import { MESSAGE_TYPES } from './stuff'
import _ from 'lodash'
import firebase from 'firebase'

export const db = firebase.initializeApp({
  apiKey: 'AIzaSyCS6Uc837o3JrF3sbla3JAyAVrk5il_ePY',
  authDomain: 'tuparit-d92b6.firebaseapp.com',
  databaseURL: 'https://tuparit-d92b6.firebaseio.com',
  projectId: 'tuparit-d92b6',
  storageBucket: 'tuparit-d92b6.appspot.com',
  messagingSenderId: '886633615657'
}).database()

const getUser = () => firebase.auth().signInAnonymously()

export const getTeamsRef = (sessionId) => {
  return db.ref(`${sessionId}/teams`)
}

export const getSessionRef = (sessionId) => {
  return db.ref(`${sessionId}`)
}

export const attach = (sessionId) => {
  return getUser().then(user => {
    const sessionRef = getSessionRef(sessionId)
    return getSession(sessionRef)
      .then(session => {
        const teamId = findUsersTeam(session, user.uid)

        if (!teamId) {
          throw new Error('user not joined')
        }

        const teamRef = sessionRef.child(`teams/${teamId}`)
        const userRef = teamRef.child(`members/${user.uid}`)

        return teamRef.child('name').once('value').then(ds => ds.toJSON())
          .then((name) => {
            return {
              userRef,
              teamRef
            }
          })
      })
  })
}

export const getSession = (sessionRef) => {
  return sessionRef.once('value')
    .then(ds => ds.toJSON())
    .then(session => {
      if (session === null || !session.teams) {
        throw new Error('session not found')
      }
      return session
    })
}

export const findUsersTeam = (session, userId) => {
  return _.findKey(session.teams, (team) => {
    return team.members && team.members[userId]
  })
}

export const join = (sessionId, name) => {
  return getUser()
    .then((user) => {
      const sessionRef = getSessionRef(sessionId)

      return getSession(sessionRef)
        .then(session => {
          const teamId = findUsersTeam(session, user.uid)
          if (!teamId) {
            const team = joinTeam(sessionRef, session, user.uid)
            addMessage(sessionRef, MESSAGE_TYPES.JOIN_TEAM, {
              team: team.name,
              user: name
            })
            return team.id
          } else {
            return teamId
          }
        })
        .then((teamId) => {
          const userRef = sessionRef.child(`teams/${teamId}/members/${user.uid}`)
          userRef.child('name').set(name)
          userRef.child('code').set(1000 + Math.floor(Math.random() * 9000))
        })
    })
}

export const joinTeam = (sessionRef, session, userId) => {
  const team = _.sample(
    _(session.teams)
      .map((team, key) => {
        return {
          ...team,
          id: key,
          members: team.members ? Object.keys(team.members).length : 0
        }
      })
      .groupBy(t => t.members)
      .map(v => v)
      .first()
  )

  if (!team) {
    throw new Error('Team not found')
  }

  return team
}

export const addMessage = (sessionRef, type, data = {}) => {
  sessionRef.child('messages').push({
    createdAt: Date.now(),
    type: type,
    ...data
  })
}

export const findUserByCode = (userRef, code) => {
  const userId = userRef.key
  const teamsRef = userRef.parent.parent.parent

  return teamsRef.once('value').then(ds => ds.toJSON())
    .then(teams => {
      const members = _.reduce(teams, (all, team) => {
        return {
          ...all,
          ...(team.members || {})
        }
      }, {})

      const otherUser = _.find(members, (member, memberId) => {
        return memberId !== userId && member.code === code
      })

      if (!otherUser) {
        throw new Error('*** HENKILÖÄ EI LÖYDY ***') // TODO
      }

      return {
        name: otherUser.name,
        code: otherUser.code
      }
    })
}
