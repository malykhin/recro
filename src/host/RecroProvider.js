import React, { useEffect, useMemo } from 'react'
import isString from 'lodash/isString'

import RecroContext from './RecroContext'
import useRecroReducer from './useRecroReducer'
import messagingService from '../core/messagingService'
import messageProcessor from '../core/messageProcessor'

import { CHANNELS } from '../core/constants'

export default function RecroProvider({
  children,
  useLocation = () => ({ pathname: null }),
  useHistory = () => ({ history: null }),
}) {
  const [state, actions] = useRecroReducer()
  const { pathname } = useLocation()
  const { history } = useHistory()

  useMemo(() => messagingService.setSubscribers(state), [state])

  useEffect(() => {
    messagingService.publish({ pathname }, CHANNELS.NAVIGATION_CHANGE)
  }, [pathname])

  useEffect(() => {
    function listener(event) {
      if (!isString(event.data)) {
        return
      }
      try {
        messageProcessor
          .addHandler(CHANNELS.SIZE_CHANGE, ({ sender, payload }) => actions.changeSize(sender, payload))
          .addHandler(CHANNELS.NAVIGATION_CHANGE, ({ payload: { pathname } }) => history.push(pathname))
          .addHandler(CHANNELS.APP_LOADED, ({ sender }) => {
            messagingService.publish({ pathname }, CHANNELS.NAVIGATION_CHANGE, sender)
            actions.setLoaded(sender)
          })
          .addHandler(CHANNELS.SET_MODAL_MODE, ({ sender, payload }) =>
            actions.setModalMode(sender, payload.isOnModalMode),
          )
          .process(JSON.parse(event.data))
      } catch (error) {}
    }

    window.addEventListener('message', listener, false)
    return () => window.removeEventListener('message', listener)
  }, [actions, history, pathname])

  return <RecroContext.Provider value={{ messagingService, actions, state }}>{children}</RecroContext.Provider>
}
