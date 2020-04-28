import { useEffect } from 'react'

import { generateReady } from '../core/constants'

export default function useAppReadyEvent() {
  useEffect(() => {
    generateReady()
  }, [])
}
