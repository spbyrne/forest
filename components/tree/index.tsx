import * as React from 'react'
import * as _ from 'underscore'
import {
  mix,
  easeOutQuad,
  easeInQuad,
  easeInSin,
  easeOutExpo,
  easeInOutQuad,
} from '@/util'

export const Tree = ({
  position = { left: '50%', zIndex: 50 },
  blur = 0,
  depth = 0,
}) => {
  const {
    trunkHeight,
    trunkWidth,
    crownHeight,
    crownWidth,
  } = React.useMemo(() => {
    const trunkHeight = Math.round(mix(30, 120, Math.random())) + `px`
    const trunkWidth = Math.round(mix(20, 60, Math.random())) + `px`
    const crownHeight = Math.round(mix(120, 300, Math.random())) + `px`
    const crownWidth = Math.round(mix(80, 300, Math.random())) + `px`

    return { trunkHeight, trunkWidth, crownHeight, crownWidth }
  }, [])

  return (
    <>
      <div className="tree">
        <span className="trunk"></span>
        <span className="crown"></span>
      </div>
      <style jsx>{`
        .tree {
          --trunk-height: ${trunkHeight};
          --trunk-width: ${trunkWidth};
          --crown-width: ${crownWidth};
          --crown-height: ${crownHeight};
          --blur: ${blur};
          --depth: ${depth};

          position: absolute;
          transform: translate3d(0, 30vh, ${position.zIndex})
            scale3d(0.4, 0.4, 1);
          transform-origin: 50% 100%;
          left: ${position.left};
          transform-style: preserve-3d;
          filter: blur(var(--blur));

          /* Shadow */
          &:before {
            content: '';
            display: ${depth < 0.6 ? 'block' : 'none'};
            position: absolute;
            transform-origin: 50% 90%;
            bottom: 0;
            left: 0;
            width: var(--crown-width);
            height: calc(var(--crown-height) / 10);
            transform: translate3d(-50%, 0, 0) rotate3d(-1, 0, 0, 90deg);
            border-radius: 100%;
            background: radial-gradient(
              farthest-side at 50% 80%,
              hsla(274, 62, 17, 0.3),
              hsla(274, 62, 17, 0.1),
              hsla(274, 62, 17, 0)
            );
            filter: blur(2px);
            opacity: ${1 - easeOutQuad(depth)};
          }
        }

        .trunk {
          position: absolute;
          display: block;
          width: var(--trunk-width);
          height: calc(var(--trunk-height) + calc(var(--crown-height) / 2));
          clip-path: polygon(10% 0%, 90% 0%, 100% 97%, 50% 100%, 0% 97%);
          background: ${`hsl(22, ` +
            mix(53, 20, easeOutQuad(depth)) +
            `%, ` +
            mix(20, 75, easeOutQuad(depth)) +
            `%)`};
          box-shadow: inset -0.75rem calc(var(--crown-height) / 2 + 0.5rem) 1rem
            ${`hsla(310, 62%, ` +
              mix(12, 30, depth) +
              `%, ` +
              (1 - easeOutQuad(depth)) +
              `)`};
          bottom: 0;
          left: 0;
          transform: translate3d(-50%, 0, 0);
        }

        .crown {
          position: absolute;
          background: ${`hsl(` +
            mix(100, 80, depth) +
            `, ` +
            mix(60, 20, depth) +
            `%, ` +
            mix(18, 76, easeOutQuad(depth)) +
            `%)`};
          box-shadow: inset -1rem -1.5rem 2rem
            ${`hsla(176, 66%, ` +
              mix(14, 24, depth) +
              `%, ` +
              (1 - easeOutQuad(depth)) +
              `)`};
          width: var(--crown-width);
          height: var(--crown-height);
          bottom: var(--trunk-height);
          border-radius: 100%;
          transform: translate3d(-50%, 0, 0);
        }
      `}</style>
    </>
  )
}
