import * as React from 'react'
import * as _ from 'underscore'
import { mix, easeInOutQuad, easeInQuad, useInterval } from '@/util'

export const Star = ({ vector, windowSize }) => {
  const { speed, direction } = vector

  const [position, setPosition] = React.useState({
    top: Math.random(),
    left: Math.random(),
  })

  const [positionOffset, setPositionOffset] = React.useState({
    top: 0,
    left: 0,
  })

  const size = React.useMemo(() => {
    return Math.random()
  }, [])

  const updatePositionOffset = _.throttle(() => {
    if (positionOffset.top > windowSize.height + 1000) {
      setPositionOffset({
        top: -1 * windowSize.height,
        left: -1 * positionOffset.left,
      })
      return
    }

    if (positionOffset.top < -1 * windowSize.height - 1000) {
      setPositionOffset({
        top: windowSize.height,
        left: -1 * positionOffset.left,
      })
      return
    }

    if (positionOffset.left > windowSize.width + 1000) {
      setPositionOffset({
        top: -1 * positionOffset.top,
        left: -1 * windowSize.width,
      })
      return
    }

    if (positionOffset.left < -1 * windowSize.width - 1000) {
      setPositionOffset({
        top: -1 * positionOffset.top,
        left: windowSize.width,
      })
      return
    }

    let localSpeed = mix(0, 50, easeInQuad(speed))
    let rad = direction * (Math.PI / 180)
    let left = Math.round(positionOffset.left + localSpeed * Math.cos(rad))
    let top = Math.round(positionOffset.top + localSpeed * Math.sin(rad))
    setPositionOffset({ top, left })
  }, 50)

  useInterval(() => {
    updatePositionOffset()
  }, 50)

  const transformation = {
    transform:
      `translate3d(` +
      positionOffset.left +
      `px, ` +
      positionOffset.top +
      `px, var(--translate-z)) rotate3d(0, 0, 1,` +
      (direction + 90) +
      `deg)`,
  }

  return (
    <>
      <div className="star" style={transformation}></div>
      <style jsx>{`
        .star {
          &:before {
            opacity: ${mix(0, 1, easeInOutQuad(speed))};
            transform: translate3d(-50%, calc(var(--diameter) / -2), 0)
              scale3d(1, ${mix(0, 1, easeInQuad(speed))}, 1);
          }

          &:after {
            opacity: ${mix(1, 0, easeInOutQuad(speed))};
          }
        }
      `}</style>
      <style jsx>{`
        .star {
          top: ${position.top * 100 + `%`};
          left: ${position.left * 100 + `%`};
        }
      `}</style>
      <style jsx>{`
        .star {
          --diameter: 20px;
          --border-radius: 40px;
          --translate-y: 0;
          --translate-x: 0;
          --translate-z: ${mix(200, -200, size) + `px`};

          position: absolute;
          transform-origin: calc(var(--diameter) / 2) calc(var(--diameter) / 2);

          /* Light smear */
          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: calc(var(--diameter) / 2)
              calc(var(--diameter) / 2);
            transform: translate3d(-50%, calc(var(--diameter) / -2), 0);
            width: var(--diameter);
            height: 800px;

            min-height: var(--diameter);
            border-radius: var(--border-radius);
            background: linear-gradient(
              to bottom,
              rgba(231, 230, 246, 0.7),
              rgba(231, 230, 246, 0.8) var(--diameter),
              rgba(169, 165, 219, 0.6),
              rgba(169, 165, 219, 0)
            );
            background-size: 100%;
          }

          /* Light sphere */
          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            transform: translate3d(-50%, -50%, 0);
            background: white;
            box-shadow: 0 0 16px 8px rgba(255, 255, 255, 0.4);
            opacity: 0.5;
            border-radius: var(--border-radius);
            width: var(--diameter);
            height: var(--diameter);
          }
        }
      `}</style>
    </>
  )
}

export const Starfield = ({ vector, windowSize }) => {
  const { speed, direction } = vector
  const [cursor, setCursor] = React.useState('none')

  const updateCursor = _.throttle(() => {
    let newCursor = ''
    if (direction > 67.5 && direction < 112.5) {
      newCursor = 'n-resize'
    }
    if (direction > 112.5 && direction < 157.5) {
      newCursor = 'ne-resize'
    }
    if (direction > 157.5 && direction < 202.5) {
      newCursor = 'e-resize'
    }
    if (direction > 202.5 && direction < 247.5) {
      newCursor = 'se-resize'
    }
    if (direction > 247.5 && direction < 292.5) {
      newCursor = 's-resize'
    }
    if (direction > 292.5 && direction < 337.5) {
      newCursor = 'sw-resize'
    }
    if (direction > 337.5 || direction < 22.5) {
      newCursor = 'w-resize'
    }
    if (direction > 22.5 && direction < 67.5) {
      newCursor = 'nw-resize'
    }
    setCursor(newCursor)
  }, 10)

  React.useEffect(() => {
    if (vector) updateCursor(vector)
  }, [vector])

  return (
    <>
      <div className="starfield">
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
        <Star vector={vector} windowSize={windowSize} />
      </div>
      <style jsx>{`
        .starfield {
          cursor: ${cursor};
          transform: translate3d(-50%, -50%, 0);
        }
      `}</style>
      <style jsx>{`
        .starfield {
          background: radial-gradient(#1c1948, #090722 50vw);
          position: absolute;
          top: 50%;
          left: 50%;
          width: calc(100vh + 100vw);
          height: calc(100vh + 100vw);
          transform-origin: 50% 50%;
          transform: translate3d(-50%, -50%, 0);
          z-index: 0;
          perspective: 100px;
          transform-style: preserve-3d;
        }
      `}</style>
    </>
  )
}
