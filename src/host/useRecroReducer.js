import { useReducer, useMemo } from 'react'

import bindDispatch from './utils/bindDispatch'

import { ROOT_SUBSCRIBER } from '../core/constants'

const TYPES = {
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  CHANGE_SIZE: 'CHANGE_SIZE',
  SET_LOADED: 'SET_LOADED',
  SET_MODAL_MODE: 'SET_MODAL_MODE',
}

const initialState = new Map([[ROOT_SUBSCRIBER, { window }]])

function reducer(state, action) {
  const newState = new Map(state)
  const { name, window, origin, size, isModalMode } = action.payload

  switch (action.type) {
    case TYPES.SUBSCRIBE: {
      newState.set(name, { window, origin })
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
    case TYPES.SET_LOADED: {
      const subscriber = newState.get(name)
      newState.set(name, { ...subscriber, isLoaded: true })
      return newState
    }
    case TYPES.SET_MODAL_MODE: {
      const subscriber = newState.get(name)
      newState.set(name, { ...subscriber, isModalMode, size })
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
  setLoaded(name) {
    return {
      type: TYPES.SET_LOADED,
      payload: { name },
    }
  },
  setModalMode(name, isModalMode) {
    return {
      type: TYPES.SET_MODAL_MODE,
      payload: { name, isModalMode },
    }
  },
}

export default function useRecroReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const bindActions = useMemo(() => bindDispatch(actions, dispatch), [dispatch])
  return [state, bindActions]
}
