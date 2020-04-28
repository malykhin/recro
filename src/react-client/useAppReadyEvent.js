import { useEffect } from 'react'

import { generateReady } from '../core/clientMessages'

export default function useAppReadyEvent() {
  useEffect(() => {
    generateReady()
  }, [])
}
