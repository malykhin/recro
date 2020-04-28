import { useContext, useEffect, useRef } from 'react'
import RecroContext from './RecroContext'
import get from 'lodash/get'

export default function useRecro(name, src, isListenToAppDimensions) {
  const context = useContext(RecroContext)
  const ref = useRef(null)

  const { origin } = src ? new URL(src) : window.location
  const { subscribe, unsubscribe } = context.actions

  useEffect(() => {
    const cw = get(ref, 'current.contentWindow')
    if (cw) {
      subscribe(name, cw, origin)
    }
    return () => unsubscribe(name)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, origin])

  if (isListenToAppDimensions) {
    const state = context.state.get(name)
    return { context, ref, state: get(state, 'size', { width: 0, height: 0 }) }
  }

  return { context, ref, state: {} }
}
