import { useContext } from 'react'
import RecroContext from './RecroContext'

export default function useRecroContext() {
  return useContext(RecroContext)
}
