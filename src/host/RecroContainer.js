import React from 'react'

import useRecro from './useRecro'

export default function RecroContainer({ name, src = '', isListenToAppDimensions, width, height }) {
  const {
    ref,
    state: { width: appWith, height: appHeight },
  } = useRecro(name, src, isListenToAppDimensions)

  const dimensions = {}
  if (width && height) {
    dimensions.width = width
    dimensions.height = height
  }
  if (isListenToAppDimensions) {
    dimensions.width = appWith
    dimensions.height = appHeight
  }
  return <iframe ref={ref} title={name} name={name} src={src} style={{ ...dimensions }} />
}
