import * as React from 'react'
import * as _ from 'underscore'
import { mix, easeInOutQuad, easeInQuad } from '@/util'

export const Star = ({ vector }) => {
  const { speed, direction } = vector
  const offset = React.useMemo(() => {
    return Math.random() * 100
  }, [])

  const animationOffset = React.useMemo(() => {
    return Math.random() * 1000
  }, [])

  const depthMod = React.useMemo(() => {
    return Math.random() * 0.75 + 0.625
  }, [])

  return (
    <>
      <div className="star"></div>
      <style jsx>{`
        .star {
          --transform: ${mix(1, 3, easeInQuad(speed))};
          height: ${mix(depthMod * 20, 200, easeInQuad(speed)) + `px`};
          animation-duration: ${mix(
            10,
            3 - depthMod * depthMod,
            easeInOutQuad(speed)
          ) + `s`};
          animation-delay: ${animationOffset *
            mix(10, 1, easeInOutQuad(speed)) +
            `ms`};
        }
      `}</style>
      <style jsx>{`
        @keyframes slide {
          from {
            transform: scale3d(1, var(--transform), 1) translate3d(0, 0, 0);
          }

          to {
            transform: scale3d(1, var(--transform), 1)
              translate3d(0, calc(100vh + 100vw), 0);
          }
        }

        .star {
          --transform: 1;

          position: absolute;
          top: 0;
          left: ${offset + `%`};
          width: ${depthMod * 20}px;
          border-radius: 40px;
          opacity: 0.7;
          background: linear-gradient(
            to top,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.2)
          );
          background-size: 100%;
          animation: slide 1s linear infinite;
          animation-duration: 1s;
          animation-delay: ${animationOffset + `ms`};
        }
      `}</style>
    </>
  )
}

export const Starfield = ({ vector, children }) => {
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
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
        <Star vector={vector} />
      </div>
      <style jsx>{`
        .starfield {
          cursor: ${cursor};
          transform: translate3d(-50%, -50%, 0) rotate(${direction - 90}deg);
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
        }
      `}</style>
    </>
  )
}
