import * as React from 'react'
import * as _ from 'underscore'
import { mix, easeOutQuad } from '@/util'

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
        <div className="shadow">
          <span className="shadowTrunk"></span>
          <span className="shadowCrown"></span>
        </div>
      </div>
      <style jsx>{`
        .tree {
          --offset: ${left};
          --depth: ${depth};
          --shadow-opacity: ${Math.round(
            Math.max(mix(1, -0.5, depth), 0) * 100
          ) / 100};
          transform: translate3d(0, 0, ${zIndex});
        }

        .trunk {
          background: ${`hsl(22, ` +
            mix(45, 10, depth) +
            `%, ` +
            mix(18, 78, depth) +
            `%)`};
          box-shadow: inset -8px calc(var(--crown-height) / 2 + 8px) 8px ${`hsla(310, ` + mix(62, 35, depth) + `%, ` + mix(12, 35, depth) + `%, ` + (1 - easeOutQuad(depth)) + `)`};
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
      `}</style>
      <style jsx>{`
        .tree {
          --trunk-height: ${trunkHeight};
          --shadow-trunk-height: calc(
            var(--trunk-height) * calc(1 - var(--depth))
          );
          --trunk-width: ${trunkWidth};
          --crown-width: ${crownWidth};
          --crown-height: ${crownHeight};

          position: absolute;
          transform-origin: 50% 100%;
          top: var(--scene-horizon);
          transform-style: preserve-3d;
          left: calc(100% * var(--offset));
          backface-visibility: hidden;
        }

        .trunk {
          --clip-offset: calc(100% - 2px);

          position: absolute;
          display: block;
          width: var(--trunk-width);
          height: calc(var(--trunk-height) + calc(var(--crown-height) / 2));
          clip-path: polygon(
            15% 0%,
            85% 0%,
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
          --shadow-trunk-height: calc(var(--trunk-height) / 2);
          --shadow-color: ${`hsla(` +
            mix(200, 140, easeOutQuad(depth)) +
            `, ` +
            mix(75, 30, easeOutQuad(depth)) +
            `%, ` +
            mix(10, 45, easeOutQuad(depth)) +
            `%, 1)`};
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

          position: absolute;
          transform-style: preserve-3d;
          bottom: 2px;
          left: 50%;
          width: var(--crown-width);
          height: calc(var(--crown-height) + var(--shadow-trunk-height));
          transform-origin: 50% 100%;
          transform: scale3d(1, calc(1 - var(--depth)), 1)
            skew(var(--shadow-skew)) translate3d(-50%, 100%, -1px);
          z-index: -2;
          opacity: ${1 - easeOutQuad(depth)};
          mask-image: radial-gradient(
            farthest-corner at 50% 0,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0)
          );
        }

        .shadowTrunk {
          --clip-offset: calc(100% - 2px);

          position: absolute;
          display: block;
          width: var(--trunk-width);
          transform-origin: 50% 0;
          height: calc(
            var(--shadow-trunk-height) + calc(var(--crown-height) / 2)
          );
          top: 0;
          left: 50%;
          transform: translate3d(-50%, 0, 0px);
          backface-visibility: hidden;
          background: var(--shadow-color);
        }

        .shadowCrown {
          display: block;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform-origin: 50% calc(var(--shadow-trunk-height) * -1);
          width: var(--crown-width);
          height: var(--crown-height);
          border-radius: 100%;
          transform: translate3d(-50%, 0, 0);
          background: var(--shadow-color);
        }
      `}</style>
    </>
  )
}
