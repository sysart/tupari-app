import { ReplaySubject } from 'rxjs'

export const session$ = new ReplaySubject(1)

export const join = (session) => {
  session$.next(session)
}

session$.subscribe(session => {
  if (session) {
    localStorage.setItem('session', session)
  } else {
    localStorage.removeItem('session')
  }
})

const lastSession = localStorage.getItem('session')
if (lastSession) {
  session$.next(lastSession)
}
