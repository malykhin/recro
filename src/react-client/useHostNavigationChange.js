import { useEffect } from 'react'

import { BROADCAST_CONSUMER, CHANNELS } from '../core/constants'

export default function useHostNavigationChange(useHistory) {
  const history = useHistory()

  useEffect(() => {
    function handleEvent(event) {
      const isNotConsumerOfMessage = event.data.consumer !== window.name && event.data.consumer !== BROADCAST_CONSUMER
      if (isNotConsumerOfMessage) {
        return
      }
      if (event.data.channel === CHANNELS.NAVIGATION_CHANGE) {
        const data = JSON.parse(event.data.payload)
        history.push(data.pathname)
      }
    }

    window.addEventListener('message', handleEvent, false)

    return () => window.removeEventListener('message', handleEvent)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
