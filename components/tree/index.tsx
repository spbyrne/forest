import * as React from 'react'
import * as _ from 'underscore'
import { mix, easeOutQuad, easeInSin, easeInQuad, randBias } from '@/util'

export const Tree = ({ depth, zIndex, left }) => {
  const {
    trunkHeight,
    trunkWidth,
    crownHeight,
    crownWidth,
  } = React.useMemo(() => {
    const trunkHeight =
      randBias({ min: 8, max: 78, bias: 50, wholeNumber: true }) + `px`
    const trunkWidth =
      randBias({ min: 8, max: 24, bias: 18, wholeNumber: true }) + `px`
    const crownHeight =
      randBias({ min: 40, max: 180, bias: 100, wholeNumber: true }) + `px`
    const crownWidth =
      randBias({ min: 32, max: 120, bias: 80, wholeNumber: true }) + `px`

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
          background: ${`hsl(32, ` +
            mix(35, 10, depth) +
            `%, ` +
            mix(18, 78, depth) +
            `%)`};
          box-shadow: inset calc(var(--trunk-width) / -3)
            calc(var(--crown-height) / 2 + 8px) 8px
            ${`hsla(310, ` +
              mix(62, 35, depth) +
              `%, ` +
              mix(12, 35, depth) +
              `%, ` +
              (1 - easeOutQuad(depth)) +
              `)`};
        }

        .crown {
          background: linear-gradient(
            to bottom,
            ${`hsl(` +
              mix(130, 60, depth) +
              `, ` +
              mix(90, 20, depth) +
              `%, ` +
              mix(15, 88, easeInSin(depth)) +
              `%)`},
            ${`hsl(` +
              mix(200, 130, depth) +
              `, ` +
              mix(65, 20, depth) +
              `%, ` +
              mix(15, 65, easeInSin(depth)) +
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
            inset 0 2rem 3rem -1rem ${`hsla(58, 60%, 93%, ` + Math.max(depth - 0.3, 0.3) + `)`};
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
