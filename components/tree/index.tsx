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

export const Tree = ({ depth, zIndex, left }) => {
  const {
    trunkHeight,
    trunkWidth,
    crownHeight,
    crownWidth,
  } = React.useMemo(() => {
    const trunkHeight = Math.round(mix(20, 120, Math.random())) + `px`
    const trunkWidth = Math.round(mix(20, 60, Math.random())) + `px`
    const crownHeight = Math.round(mix(120, 350, Math.random())) + `px`
    const crownWidth = Math.round(mix(80, 300, Math.random())) + `px`

    return { trunkHeight, trunkWidth, crownHeight, crownWidth }
  }, [])

  return (
    <>
      <div className="tree">
        <span className="trunk"></span>
        <span className="crown"></span>
        {depth < 0.5 && <div className="shadow"></div>}
      </div>
      <style jsx>{`
        .tree {
          --depth: ${depth};
          --shadow-opacity: ${Math.max(mix(1, -1, depth), 0)};
          transform: translate3d(0, 0, ${zIndex}) scale3d(0.4, 0.4, 1);
          left: ${left};
        }

        .trunk {
          background: ${`hsl(22, ` +
            mix(53, 20, easeOutQuad(depth)) +
            `%, ` +
            mix(16, 73, easeOutQuad(depth)) +
            `%)`};
          box-shadow: inset -0.75rem calc(var(--crown-height) / 2 + 0.5rem) 1rem
            ${`hsla(310, 62%, ` +
              mix(12, 30, depth) +
              `%, ` +
              (1 - easeOutQuad(depth)) +
              `)`};
        }

        .crown {
          background: ${`hsl(` +
            mix(100, 80, depth) +
            `, ` +
            mix(56, 20, depth) +
            `%, ` +
            mix(12, 74, easeOutQuad(depth)) +
            `%)`};
          box-shadow: inset 0 -4rem 3rem -2rem
              ${`hsla(176, 66%, ` +
                mix(12, 24, depth) +
                `%, ` +
                (1 - easeOutQuad(depth)) +
                `)`},
            inset 0 1.5rem 5rem -2rem ${`hsla(58, 66%, 93%, ` + easeOutQuad(depth - 0.2) + `)`};
        }

        .shadow {
          height: calc(var(--crown-height) / ${mix(1, 8, depth)});
          background: radial-gradient(
            farthest-side at 50% 80%,
            ${`hsla(274, 62%, ` + mix(17, 33, depth) + `%, 0.4)`},
            ${`hsla(274, 62%, ` + mix(17, 33, depth) + `%, 0.15)`},
            ${`hsla(274, 62%, ` + mix(17, 33, depth) + `%, 0)`}
          );
        }
      `}</style>
      <style jsx>{`
        .tree {
          --trunk-height: ${trunkHeight};
          --trunk-width: ${trunkWidth};
          --crown-width: ${crownWidth};
          --crown-height: ${crownHeight};

          position: absolute;
          transform-origin: 50% 100%;
          top: 32%;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .trunk {
          --clip-offset: calc(100% - 2px);

          position: absolute;
          display: block;
          width: var(--trunk-width);
          height: calc(var(--trunk-height) + calc(var(--crown-height) / 2));
          clip-path: polygon(
            10% 0%,
            90% 0%,
            100% var(--clip-offset),
            50% 100%,
            0% var(--clip-offset)
          );
          bottom: 0;
          left: 0;
          transform: translate3d(-50%, 0, 0);
          backface-visibility: hidden;
        }

        .crown {
          position: absolute;
          width: var(--crown-width);
          height: var(--crown-height);
          bottom: var(--trunk-height);
          border-radius: 100%;
          transform: translate3d(-50%, 0, 0);
          backface-visibility: hidden;
        }

        .shadow {
          position: absolute;
          transform-origin: 50% 97%;
          bottom: 0;
          left: 0;
          width: calc(var(--crown-width) * 1.5);
          transform: translate3d(-50%, 0, 0px) rotate3d(-1, 0, 0, 90deg);
          border-radius: 100%;
          opacity: var(--shadow-opacity);
        }
      `}</style>
    </>
  )
}
