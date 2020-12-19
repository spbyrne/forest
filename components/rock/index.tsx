import * as React from 'react'
import * as _ from 'underscore'
import { mix, easeOutQuad, easeOutExpo } from '@/util'

export const Rock = ({ depth, zIndex, left }) => {
  const { rockWidth, rockHeight } = React.useMemo(() => {
    const rockWidth = Math.round(mix(0.5, 2, Math.random()) * 100) / 100
    const rockHeight = Math.round(mix(0.75, 1.25, Math.random()) * 100) / 100

    return { rockWidth, rockHeight }
  }, [])

  return (
    <>
      <div className="rock">
        <div className="shadow"></div>
      </div>
      <style jsx>{`
        .rock {
          --depth: ${depth};
          --shadow-opacity: ${Math.round(Math.max(mix(1, -1, depth), 0) * 100) /
            100};
          transform: translate3d(-50%, -100%, ${zIndex})
            scale3d(${rockWidth}, ${rockHeight}, 1);
          left: ${left};
          position: absolute;
          transform-origin: 50% 100%;
          top: 32%;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          display: block;
          width: 50px;
          height: 25px;
          border-radius: 500px 500px 0 0;
          background: ${`hsl(22, ` +
            mix(4, 12, depth) +
            `%, ` +
            mix(20, 73, easeOutQuad(depth)) +
            `%)`};
          box-shadow: inset 0 1rem 1.5rem -1rem ${`hsl(30, 12%, ` + mix(40, 90, easeOutExpo(depth)) + `%)`};
          transform-origin: 50% 100%;
        }

        .shadow {
          transform: translate3d(0%, 0, 0) rotate3d(-1, 0, 0, 90deg)
            scale3d(1, 1, 1);
          left: 0;
          bottom: 1px;
          background: linear-gradient(
            to top,
            ${`hsla(274, 62%, ` + mix(17, 33, depth) + `%, 0.4)`},
            ${`hsla(274, 62%, ` + mix(17, 33, depth) + `%, 0.15)`},
            ${`hsla(274, 62%, ` + mix(17, 33, depth) + `%, 0)`}
          );
          transform-origin: 50% 100%;
          transform-style: preserve-3d;
          display: block;
          width: 50px;
          height: 25px;
          border-radius: 500px 500px 0 0;
          opacity: ${1 - depth};
        }
      `}</style>
    </>
  )
}
