import firebase from 'firebase'

window.firebase = firebase

export const db = firebase.initializeApp({
  apiKey: 'AIzaSyCS6Uc837o3JrF3sbla3JAyAVrk5il_ePY',
  authDomain: 'tuparit-d92b6.firebaseapp.com',
  databaseURL: 'https://tuparit-d92b6.firebaseio.com',
  projectId: 'tuparit-d92b6',
  storageBucket: 'tuparit-d92b6.appspot.com',
  messagingSenderId: '886633615657'
}).database()

window.db = db

export const todosRef = db.ref('todos')

export const userRef = () => {
  return firebase.auth().signInAnonymously()
    .then(user => {
      return db.ref(`users/${user.uid}`)
    })
}
