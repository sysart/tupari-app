import firebase from 'firebase'

export const db = firebase.initializeApp({
  databaseURL: 'https://tuparit-d92b6.firebaseio.com/'
}).database()

export const todosRef = db.ref('todos')
