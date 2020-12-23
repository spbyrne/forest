import * as React from 'react'
import * as _ from 'underscore'
import { mix, easeOutQuad, easeOutExpo } from '@/util'

export const Rock = ({ depth, zIndex, left, blur }) => {
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
          --blur: ${blur};
          --depth: ${depth};
          --offset: ${left};
          --shadow-opacity: ${Math.round(Math.max(mix(1, -1, depth), 0) * 100) /
            100};
          transform: translate3d(0, -100%, ${zIndex})
            scale3d(${rockWidth}, ${rockHeight}, 1);
          left: calc(100% * var(--offset));
          position: absolute;
          transform-origin: 50% 100%;
          top: var(--scene-horizon);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          display: block;
          width: 50px;
          height: 25px;
          filter: blur(var(--blur));
          border-radius: 500px 500px 0 0;
          background: ${`hsl(22, ` +
            mix(4, 12, depth) +
            `%, ` +
            mix(14, 73, easeOutQuad(depth)) +
            `%)`};
          box-shadow: inset 0 1rem 1.5rem -1rem ${`hsl(30, 12%, ` + mix(35, 90, easeOutExpo(depth)) + `%)`};
          transform-origin: 50% 100%;
        }

        .shadow {
          --shadow-skew: calc(
            85deg -
              calc(
                170deg *
                  max(
                    min(
                      calc(
                        calc(calc(var(--sun-offset) - var(--offset)) + 1) / 2
                      ),
                      1
                    ),
                    0
                  )
              )
          );
          --shadow-color: ${`hsla(` +
            mix(200, 180, easeOutQuad(depth)) +
            `, ` +
            mix(75, 30, easeOutQuad(depth)) +
            `%, ` +
            mix(8, 40, easeOutQuad(depth)) +
            `%, 1)`};

          position: absolute;
          left: 0;
          bottom: 0;
          background: var(--shadow-color);
          transform-origin: 50% 0%;
          transform-style: preserve-3d;
          transform: translate3d(0%, 100%, 0) skew(var(--shadow-skew))
            scale3d(1, calc(1.5 - calc(var(--depth) * 1.5)), 1);
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 0 0 500px 500px;
          opacity: ${1 - easeOutQuad(depth)};
          mask-image: radial-gradient(
            farthest-corner at 50% 0,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0)
          );
        }
      `}</style>
    </>
  )
}
