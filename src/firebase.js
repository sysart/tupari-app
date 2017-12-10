import { MESSAGE_TYPES } from './stuff'
import * as _ from 'lodash'
import storedValue from '@/utils/storedValue'
import firebase from 'firebase'
import { Observable } from 'rxjs'

const storedSession = storedValue('session')
const storedTeam = storedValue('joukkueenimi')

export const db = firebase.initializeApp({
  apiKey: 'AIzaSyCS6Uc837o3JrF3sbla3JAyAVrk5il_ePY',
  authDomain: 'tuparit-d92b6.firebaseapp.com',
  databaseURL: 'https://tuparit-d92b6.firebaseio.com',
  projectId: 'tuparit-d92b6',
  storageBucket: 'tuparit-d92b6.appspot.com',
  messagingSenderId: '886633615657'
}).database()

export const scoreboard = db.ref('sysart')

const user$ = Observable.fromPromise(firebase.auth().signInAnonymously())

export const sessionRef$ = storedSession.stream
  .map(session => {
    if (session) {
      return db.ref(`${session}`)
    } else {
      return null
    }
  })
  .publishReplay(1)
  .refCount()

export const teamRef$ = Observable.combineLatest(sessionRef$, storedTeam.stream)
  .map(([sessionRef, team]) => {
    if (sessionRef && team) {
      return sessionRef.child(`teams/${team}`)
    } else {
      return null
    }
  })
  .publishReplay(1)
  .refCount()

export const userRef$ = Observable.combineLatest(user$, teamRef$)
  .map(([user, teamRef]) => {
    if (user && teamRef) {
      return teamRef.child(`members/${user.uid}`)
    } else {
      return null
    }
  })
  .publishReplay(1)
  .refCount()

export const teamsRef$ = sessionRef$
  .map(sessionRef => {
    if (sessionRef) {
      return sessionRef.child('teams')
    } else {
      return null
    }
  })

export const sessionRef = () => {
  return sessionRef$.first().toPromise()
}

export const userRef = () => {
  return userRef$.first().toPromise()
}

export const teamsRef = (session) => {
  return teamsRef$.first().toPromise()
}

export const getSessionRef = (session) => {
  return db.ref(`${session}`)
}

export const getTeamsRef = (session) => {
  return db.ref(`${session}/teams`)
}

export const leaveSession = () => {
  storedSession.set(null)
}

export const joinTeam = () => {
  return teamsRef()
    .then(teamsRef => {
      return teamsRef.once('value').then(ds => ds.val())
    })
    .then(teams => {
      return _(teams)
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
    })
    .then(teams => {
      return _.sample(teams)
    })
    .then(team => {
      if (!team) {
        throw new Error('Team not found')
      }
      storedTeam.set(team.id)
      return team
    })
}

export const join = (session, name) => {
  storedSession.set(session)
  return joinTeam()
    .then((team) => {
      return Promise.all([team, userRef()])
    })
    .then(([team, userRef]) => {
      userRef.child('name').set(name)
      return Promise.all([
        team,
        userRef.once('value')
          .then(v => ({
            ...v.toJSON(),
            id: userRef.key
          }))
      ])
    })
    .then(([team, user]) => {
      addMessage(MESSAGE_TYPES.JOIN_TEAM, {
        team,
        user
      })
    })
}

export const addMessage = (type, data = {}) => {
  sessionRef$.filter(v => v).first().toPromise().then(sessionRef => {
    sessionRef.child('messages').push({
      createdAt: Date.now(),
      type: type,
      ...data
    })
  })
}
