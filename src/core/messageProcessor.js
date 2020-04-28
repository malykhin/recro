export default {
  addHandler(name, cb) {
    if (!this.hasOwnProperty(name)) {
      this[name] = []
    }
    const handlers = this[name]
    handlers.push(cb)
    return this
  },

  removeHandler(name, cb) {
    const handlers = this[name]
    if (Array.isArray(handlers) && handlers.length) {
      const index = handlers.findIndex((handler) => handler === cb)
      if (index !== -1) {
        handlers.splice(index, 1)
      }
    }
    return this
  },

  process(message) {
    const handlers = this[message.chanel]
    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => handler(message))
    }
    return this
  },
}
