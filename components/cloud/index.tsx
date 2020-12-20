import * as React from 'react'
import * as _ from 'underscore'
import { mix, easeOutQuad, easeOutExpo } from '@/util'

export const Cloud = ({ depth, zIndex, left }) => {
  const { cloudWidth, cloudHeight } = React.useMemo(() => {
    const cloudWidth = Math.round(mix(0.5, 2, Math.random()) * 100) / 100
    const cloudHeight = Math.round(mix(0.75, 1.25, Math.random()) * 100) / 100

    return { cloudWidth, cloudHeight }
  }, [])

  return (
    <>
      <div className="cloud"></div>
      <style jsx>{`
        .cloud {
          --depth: ${depth};
          --shadow-opacity: ${Math.round(Math.max(mix(1, -1, depth), 0) * 100) /
            100};
          transform: translate3d(
              calc(-1px * var(--player-position)),
              -100%,
              ${zIndex}
            )
            scale3d(${cloudWidth}, ${cloudHeight}, 1);
          left: ${left};
          position: absolute;
          transform-origin: 50% 100%;
          top: var(--scene-horizon);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          display: block;
          width: 50px;
          height: 25px;
          border-radius: 500px 500px 0 0;
          background: ${`hsl(22, ` +
            mix(4, 12, depth) +
            `%, ` +
            mix(14, 73, easeOutQuad(depth)) +
            `%)`};
          box-shadow: inset 0 1rem 1.5rem -1rem ${`hsl(30, 12%, ` + mix(35, 90, easeOutExpo(depth)) + `%)`};
          transform-origin: 50% 100%;
        }
      `}</style>
    </>
  )
}
