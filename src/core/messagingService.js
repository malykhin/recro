import isPlainObject from 'lodash/isPlainObject'

import { ROOT_SUBSCRIBER, DEFAULT_CHANNEL, BROADCAST_CONSUMER } from './constants'

class MessagingService {
  setSubscribers(subscribers) {
    this.subscribers = subscribers
  }

  publish = (payload, channel = DEFAULT_CHANNEL, consumer = BROADCAST_CONSUMER, sender = ROOT_SUBSCRIBER) => {
    this.subscribers.forEach(({ window, origin }, name) => {
      if (sender !== name) {
        window.postMessage(
          {
            source: ROOT_SUBSCRIBER,
            sender,
            consumer,
            payload: isPlainObject(payload) ? JSON.stringify(payload) : payload,
            channel,
          },
          origin,
        )
      }
    })
  }
}

export default new MessagingService()
