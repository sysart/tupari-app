import { ReplaySubject } from 'rxjs'

export default (key) => {
  const stream$ = new ReplaySubject(1)

  const getFn = () => {
    return stream$.first().toPromise()
  }

  if (localStorage.getItem(key)) {
    stream$.next(localStorage.getItem(key))
  }

  stream$.subscribe(value => {
    localStorage.setItem(key, value)
  })

  getFn.stream = stream$.asObservable()

  getFn.set = (value) => {
    stream$.next(value)
  }

  return getFn
}
