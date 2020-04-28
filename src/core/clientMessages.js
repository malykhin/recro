import { ROOT_SUBSCRIBER, CHANNELS } from './constants'

const defaultMessage = {
  source: ROOT_SUBSCRIBER,
  sender: window.name,
}

function postMessage(message) {
  const origin = '*'
  window.parent.postMessage(JSON.stringify(message), origin)
}

export function generateResizeMessage(width, height) {
  const message = {
    ...defaultMessage,
    chanel: CHANNELS.SIZE_CHANGE,
    payload: {
      width,
      height,
    },
  }
  postMessage(message)
}

export function generateReady() {
  const message = {
    ...defaultMessage,
    chanel: CHANNELS.APP_LOADED,
  }
  postMessage(message)
}

export default {
  generateResizeMessage,
  generateReady,
}
