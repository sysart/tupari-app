import firebase from 'firebase'
import { Observable } from 'rxjs'
import { session$, join } from './session'

window.firebase = firebase

export const db = firebase.initializeApp({
  apiKey: 'AIzaSyCS6Uc837o3JrF3sbla3JAyAVrk5il_ePY',
  authDomain: 'tuparit-d92b6.firebaseapp.com',
  databaseURL: 'https://tuparit-d92b6.firebaseio.com',
  projectId: 'tuparit-d92b6',
  storageBucket: 'tuparit-d92b6.appspot.com',
  messagingSenderId: '886633615657'
}).database()

export const todosRef = db.ref('todos')

const user$ = Observable.fromPromise(firebase.auth().signInAnonymously())

export const userRef$ = Observable.combineLatest(user$, session$)
  .map(([user, session]) => {
    if (user && session) {
      return db.ref(`${session}/users/${user.uid}`)
    } else {
      return null
    }
  })
  .publishReplay(1)
  .refCount()

export const userRef = () => {
  return userRef$.first().toPromise()
}

export const joinSession = (session) => {
  join(session)
  return userRef()
}

export const leaveSession = () => {
  join(null)
}
