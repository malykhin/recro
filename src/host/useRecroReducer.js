import { useReducer, useMemo } from 'react'

import bindDispatch from './utils/bindDispatch'

import { ROOT_SUBSCRIBER } from '../core/constants'

const TYPES = {
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  CHANGE_SIZE: 'CHANGE_SIZE',
}

const initialState = new Map([[ROOT_SUBSCRIBER, { window }]])

function reducer(state, action) {
  const newState = new Map(state)
  const { name, window, origin, size } = action.payload

  switch (action.type) {
    case TYPES.SUBSCRIBE: {
      newState.set(name, { window, origin })
      if (newState.has(name)) {
        return newState
      }
      return newState
    }
    case TYPES.UNSUBSCRIBE: {
      newState.delete(name)
      return newState
    }
    case TYPES.CHANGE_SIZE: {
      const subscriber = newState.get(name)
      newState.set(name, { ...subscriber, size })
      return newState
    }
    default:
      return state
  }
}

export const actions = {
  subscribe(name, window, origin) {
    return {
      type: TYPES.SUBSCRIBE,
      payload: { name, window, origin },
    }
  },
  unsubscribe(name) {
    return {
      type: TYPES.UNSUBSCRIBE,
      payload: { name },
    }
  },
  changeSize(name, size) {
    return {
      type: TYPES.CHANGE_SIZE,
      payload: { name, size },
    }
  },
}

export default function useRecroReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const bindActions = useMemo(() => bindDispatch(actions, dispatch), [dispatch])

  return [state, bindActions]
}
