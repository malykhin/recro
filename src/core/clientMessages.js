import { ROOT_SUBSCRIBER, CHANNELS } from './constants'

const defaultMessage = {
  source: ROOT_SUBSCRIBER,
  sender: window.name,
}

function postMessage(message) {
  const origin = '*'
  window.parent.postMessage(JSON.stringify(message), origin)
}

export function resize(width, height) {
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

export function ready() {
  const message = {
    ...defaultMessage,
    chanel: CHANNELS.APP_LOADED,
  }
  postMessage(message)
}

export function modalMode(isModalMode, width = null, height = null) {
  const message = {
    ...defaultMessage,
    chanel: CHANNELS.SET_MODAL_MODE,
    payload: {
      isModalMode,
      width,
      height,
    },
  }
  postMessage(message)
}

export default {
  resize,
  ready,
  modalMode,
}
