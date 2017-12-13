export const isAvailable = new Promise((resolve, reject) => {
  window['__onGCastApiAvailable'] = (value) => {
    if (value) {
      resolve()
    } else {
      reject(new Error('failure'))
    }
  }
})
