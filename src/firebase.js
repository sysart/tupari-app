import * as _ from 'lodash'
import storedValue from '@/utils/storedValue'
import firebase from 'firebase'
import { Observable } from 'rxjs'

const storedSession = storedValue('session')
const storedTeam = storedValue('team')

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

export const userRef$ = Observable.combineLatest(user$, storedSession.stream, storedTeam.stream)
  .map(([user, session, team]) => {
    if (user && session && team) {
      return db.ref(`${session}/teams/${team}/members/${user.uid}`)
    } else {
      return null
    }
  })
  .publishReplay(1)
  .refCount()

export const teamsRef$ = storedSession.stream
  .map(session => {
    if (session) {
      return db.ref(`${session}/teams`)
    } else {
      return null
    }
  })

export const userRef = () => {
  return userRef$.first().toPromise()
}

export const teamsRef = () => {
  return teamsRef$.first().toPromise()
}

export const leaveSession = () => {
  storedSession.set(null)
}

export const joinTeam = () => {
  return teamsRef()
    .then(teamRef => {
      return teamRef.once('value')
    })
    .then(ds => ds.toJSON())
    .then(teams => {
      return _(teams)
        .map((team, teamId) => {
          return {
            id: teamId,
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
      storedTeam.set(team.id)
      return team.id
    })
}

export const join = (session) => {
  storedSession.set(session)
  return joinTeam().then(() => userRef())
}
