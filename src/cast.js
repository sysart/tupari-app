const isAvailable = new Promise((resolve, reject) => {
  console.log('kikkeli')
  window['__onGCastApiAvailable'] = (value) => {
    if (value) {
      resolve()
    } else {
      reject(new Error('failure'))
    }
  }
})

let receiver = false
let sender = false

export const initReceiver = () => {
  if (!receiver) {
    cast.framework.CastReceiverContext.getInstance().start() // eslint-disable-line no-undef
    receiver = true
  }
}

export const initSender = () => {
  if (!sender) {
    isAvailable.then(() => {
      cast.framework.CastContext.getInstance().setOptions({ // eslint-disable-line no-undef
        receiverApplicationId: '3BCD22C3',
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED // eslint-disable-line no-undef
      })
    })
    sender = true
  }
}
