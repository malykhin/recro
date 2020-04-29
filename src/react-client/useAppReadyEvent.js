import { useEffect } from 'react'

import { ready } from '../core/clientMessages'

export default function useAppReadyEvent() {
  useEffect(() => {
    ready()
  }, [])
}
