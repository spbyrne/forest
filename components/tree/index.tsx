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
    const trunkHeight = Math.round(mix(8, 48, Math.random())) + `px`
    const trunkWidth = Math.round(mix(8, 24, Math.random())) + `px`
    const crownHeight = Math.round(mix(48, 140, Math.random())) + `px`
    const crownWidth = Math.round(mix(32, 120, Math.random())) + `px`

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
          --shadow-opacity: ${Math.round(Math.max(mix(1, -1, depth), 0) * 100) /
            100};
          transform: translate3d(
            calc(-1px * var(--player-position)),
            0,
            ${zIndex}
          );
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
          background: linear-gradient(
            to bottom,
            ${`hsl(` +
              mix(110, 50, easeOutQuad(depth)) +
              `, ` +
              mix(60, 30, easeOutQuad(depth)) +
              `%, ` +
              mix(15, 70, easeOutQuad(depth)) +
              `%)`},
            ${`hsl(` +
              mix(130, 130, easeOutQuad(depth)) +
              `, ` +
              mix(60, 24, easeOutQuad(depth)) +
              `%, ` +
              mix(15, 65, easeOutQuad(depth)) +
              `%)`}
          );
          box-shadow: inset 0 -4rem 3rem -2rem
              ${`hsla(176, ` +
                mix(88, 50, depth) +
                `%, ` +
                mix(5, 24, depth) +
                `%, ` +
                (1 - easeOutQuad(depth)) +
                `)`},
            inset 0 3rem 4rem -2rem ${`hsla(58, 60%, 93%, ` + easeOutQuad(depth - 0.3) + `)`};
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
          transform: translate3d(-50%, 0, -1px);
          backface-visibility: hidden;
        }

        .crown {
          position: absolute;
          width: var(--crown-width);
          height: var(--crown-height);
          bottom: var(--trunk-height);
          border-radius: 100%;
          transform: translate3d(-50%, 0, 1px);
          backface-visibility: hidden;
        }

        .shadow {
          position: absolute;
          transform-origin: 50% 95%;
          bottom: 0;
          left: 0;
          width: calc(var(--crown-width) * 0.75);
          transform: translate3d(-50%, 0, 0px) rotate3d(-1, 0, 0, 90deg)
            scale3d(2, 2, 1);
          border-radius: 100%;
          opacity: var(--shadow-opacity);
        }
      `}</style>
    </>
  )
}
