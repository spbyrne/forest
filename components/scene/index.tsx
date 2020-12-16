import * as React from 'react'
import * as _ from 'underscore'

export const Scene = ({ vector, children }) => {
  const [cursor, setCursor] = React.useState('none')

  const updateCursor = _.throttle(() => {
    let newCursor = ''
    if (vector.direction > 67.5 && vector.direction < 112.5) {
      newCursor = 'n-resize'
    }
    if (vector.direction > 112.5 && vector.direction < 157.5) {
      newCursor = 'ne-resize'
    }
    if (vector.direction > 157.5 && vector.direction < 202.5) {
      newCursor = 'e-resize'
    }
    if (vector.direction > 202.5 && vector.direction < 247.5) {
      newCursor = 'se-resize'
    }
    if (vector.direction > 247.5 && vector.direction < 292.5) {
      newCursor = 's-resize'
    }
    if (vector.direction > 292.5 && vector.direction < 337.5) {
      newCursor = 'sw-resize'
    }
    if (vector.direction > 337.5 || vector.direction < 22.5) {
      newCursor = 'w-resize'
    }
    if (vector.direction > 22.5 && vector.direction < 67.5) {
      newCursor = 'nw-resize'
    }
    setCursor(newCursor)
  }, 10)

  React.useEffect(() => {
    if (vector && vector.direction) updateCursor(vector)
  }, [vector])

  return (
    <>
      <div className="scene">{children}</div>
      <style jsx>{`
        .scene {
          cursor: ${cursor};
        }
      `}</style>
      <style jsx>{`
        .scene {
          display: flex;
          height: 100%;
          width: 100%;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
