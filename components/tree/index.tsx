import * as React from 'react'
import * as _ from 'underscore'
import {
  mix,
  easeOutQuad,
  easeInSin,
  easeInQuad,
  randBias,
  easeOutExpo,
  easeInExpo,
  easeInCubic,
} from '@/util'

export const Tree = ({ left, top }) => {
  const {
    trunkHeight,
    trunkWidth,
    crownHeight,
    crownWidth,
    skew,
    zIndex,
    depth,
    blur,
  } = React.useMemo(() => {
    const trunkHeight =
      randBias({
        min: 8,
        max: 160,
        bias: randBias({ min: 10, max: 80, bias: 60, wholeNumber: true }),
        wholeNumber: true,
        easingFunction: easeInExpo,
      }) + `px`
    const trunkWidth =
      randBias({ min: 8, max: 24, bias: 18, wholeNumber: true }) + `px`
    const crownHeight =
      randBias({ min: 40, max: 180, bias: 100, wholeNumber: true }) + `px`
    const crownWidth =
      randBias({ min: 32, max: 120, bias: 80, wholeNumber: true }) + `px`
    const skew =
      Math.round(
        randBias({ min: -10, max: 10, bias: 0, easingFunction: easeInExpo }) *
          100
      ) /
        100 +
      `deg`
    const zIndex = Math.round(mix(-200, 520, top) * 1000) / 1000 + 'px'
    const depth = Math.round((1 - top) * 100) / 100
    const blur =
      Math.round(mix(0, 4, easeInCubic(1 - depth)) * 100) / 100 + 'px'

    return {
      trunkHeight,
      trunkWidth,
      crownHeight,
      crownWidth,
      skew,
      zIndex,
      depth,
      blur,
    }
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
          --trunk-height: ${trunkHeight};
          --shadow-trunk-height: calc(
            var(--trunk-height) * calc(1 - var(--depth))
          );
          --trunk-width: ${trunkWidth};
          --crown-width: ${crownWidth};
          --crown-height: ${crownHeight};
          --blur: ${blur};
          --offset: ${left};
          --depth: ${depth};
          --shadow-opacity: ${Math.round(
            Math.max(mix(1, -0.5, depth), 0) * 100
          ) / 100};
          --skew: ${skew};

          transform: translate3d(0, 0, ${zIndex}) skew(var(--skew));
          filter: blur(var(--blur));
          position: absolute;
          transform-origin: 50% 100%;
          top: var(--scene-horizon);
          transform-style: preserve-3d;
          left: calc(100% * var(--offset));
          backface-visibility: hidden;
        }

        .trunk {
          --clip-offset: calc(100% - 2px);
          --highlight-opacity: 0.5;
          --highlight-color: ${`hsla(` +
            mix(10, 90, depth) +
            `, ` +
            mix(20, 8, depth) +
            `%, ` +
            mix(35, 80, depth) +
            `%, var(--highlight-opacity))`};
          --highlight-offset: calc(
            calc(var(--trunk-width) * -0.8) *
              calc(var(--sun-offset) - var(--offset))
          );

          background: ${`hsl(` +
            mix(-20, 40, depth) +
            `, ` +
            mix(30, 15, depth) +
            `%, ` +
            mix(14, 80, depth) +
            `%)`};
          box-shadow: inset
              calc(var(--highlight-offset) + calc(var(--trunk-width) * 0.2)) 0
              calc(var(--trunk-width) * 0.4) calc(var(--trunk-width) * -0.1)
              var(--highlight-color),
            inset calc(var(--highlight-offset) - calc(var(--trunk-width) * 0.2))
              0 calc(var(--trunk-width) * 0.4) calc(var(--trunk-width) * -0.1)
              var(--highlight-color);
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
          --shadow-offset: calc(
            calc(var(--crown-height) / -3) +
              calc(
                calc(var(--crown-height) / 1.5) *
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

          background: linear-gradient(
            to bottom,
            ${`hsl(` +
              mix(130, 60, depth) +
              `, ` +
              mix(90, 10, depth) +
              `%, ` +
              mix(15, 92, easeInSin(depth)) +
              `%)`},
            ${`hsl(` +
              mix(180, 120, depth) +
              `, ` +
              mix(65, 10, depth) +
              `%, ` +
              mix(20, 80, easeInSin(depth)) +
              `%)`}
          );
          box-shadow: inset var(--shadow-offset)
              calc(var(--crown-height) / -3.5) calc(var(--crown-height) / 3) 0
              ${`hsla(` +
                mix(200, 170, depth) +
                `, ` +
                mix(90, 40, easeInQuad(depth)) +
                `%, ` +
                mix(10, 55, easeInSin(depth)) +
                `%, ` +
                (0.9 - easeInSin(depth)) +
                `)`},
            inset calc(-1 * var(--shadow-offset)) calc(var(--crown-height) / 2)
              calc(var(--crown-height) / 3) calc(var(--crown-height) / -3)
              ${`hsla(50, 70%, 90%, ` + Math.max(depth - 0.4, 0.4) + `)`};
          position: absolute;
          width: var(--crown-width);
          height: var(--crown-height);
          bottom: var(--trunk-height);
          border-radius: 100%;
          transform: translate3d(-50%, 0, 1px);
          backface-visibility: hidden;
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 1) 80%,
            rgba(0, 0, 0, 0.85) 100%
          );
        }

        .shadow {
          --shadow-trunk-height: calc(var(--trunk-height) / 2);
          --shadow-color: ${`hsla(` +
            mix(230, 180, easeOutQuad(depth)) +
            `, ` +
            mix(75, 30, easeOutQuad(depth)) +
            `%, ` +
            mix(6, 40, easeOutQuad(depth)) +
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
          opacity: ${0.8 - depth * 0.7};
          mask-image: radial-gradient(
            farthest-corner at 50% 0,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0.6),
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
          background: radial-gradient(
            farthest-corner at 50% 0%,
            var(--shadow-color),
            rgba(255, 255, 255, 0)
          );
          background-size: 100% 100%;
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
          background: radial-gradient(
            farthest-corner at 50% 30%,
            var(--shadow-color),
            rgba(255, 255, 255, 0)
          );
          background-size: 100% 100%;
        }
      `}</style>
    </>
  )
}
