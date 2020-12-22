import * as React from 'react'
import * as _ from 'underscore'
import {
  mix,
  easeOutQuad,
  easeOutExpo,
  randBias,
  randomFromArray,
} from '@/util'

export const Cloud = ({}) => {
  const {
    numberOfPuffs,
    puffOneHeight,
    puffTwoHeight,
    puffThreeHeight,
    puffOneWidth,
    puffTwoWidth,
    puffThreeWidth,
    cloudSkew,
    width,
    height,
    depth,
    offset,
    leftOffset,
    zIndex,
  } = React.useMemo(() => {
    let numberOfPuffs = randomFromArray([3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 2, 1])
    let zIndex =
      randBias({ min: -2000, max: -400, bias: 200, wholeNumber: true }) + 'px'
    let offsetTop = randBias({
      min: 0,
      max: 1,
      bias: Math.random(),
      easingFunction: easeOutQuad,
    })
    let depth = Math.round((1 - offsetTop) * 100) / 100
    let leftOffset = Math.round(mix(-2, 3, Math.random()) * 100) + `%`
    let offset = Math.round(mix(-1.75, 1, offsetTop) * 100) / 100
    let puffOneHeight = mix(1.5, 2, Math.random())
    let puffTwoHeight = mix(0.75, puffOneHeight, Math.random())
    let puffThreeHeight = mix(0.75, puffOneHeight, Math.random())
    let puffOneWidth = mix(1, 2, Math.random())
    let puffTwoWidth = mix(1, 2, Math.random())
    let puffThreeWidth = mix(1, 2, Math.random())
    let cloudSkew =
      randBias({
        min: -30,
        max: 30,
        bias: 20,
        easingFunction: easeOutQuad,
      }) + `deg`
    let height = randBias({ min: 0.5, max: 3, bias: 1 })
    let width = randBias({ min: 1, max: 3, bias: 2 })

    // leftOffset = '50%'
    // offsetTop = 0.9
    // zIndex = '-2000px'

    return {
      numberOfPuffs,
      puffOneHeight,
      puffTwoHeight,
      puffThreeHeight,
      puffOneWidth,
      puffTwoWidth,
      puffThreeWidth,
      cloudSkew,
      width,
      height,
      depth,
      offset,
      leftOffset,
      zIndex,
    }
  }, [])

  return (
    <>
      <div className="cloud">
        <div className="puff puff--center"></div>
        {numberOfPuffs > 1 && <div className="puff puff--left"></div>}
        {numberOfPuffs > 2 && <div className="puff puff--right"></div>}
      </div>
      <style jsx>{`
        .cloud {
          --offset: ${offset};
          --left-offset: ${leftOffset};
          --z-index: ${zIndex};
          --cloud-skew: ${cloudSkew};

          transform-origin: 50%, 100%;
          transform: scale3d(${width}, ${height}, 1)
            translate3d(0, 0, var(--z-index));
          position: absolute;
          top: calc(var(--scene-horizon) * var(--offset));
          left: var(--left-offset);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          display: block;
          width: 300px;
          height: 300px;
        }

        .puff {
          position: absolute;
          top: 0;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 500px;
          background: radial-gradient(
              farthest-side at 50% 15%,
              hsla(58, 90%, 97%, 0.8),
              transparent 50%
            ),
            linear-gradient(
              to top,
              hsla(210, 60%, 40%, 0) 30%,
              hsla(210, 70%, 88%, 0.8) 50%,
              hsla(210, 70%, 88%, 0.7) 70%,
              hsla(58, 90%, 97%, 0.3) 100%
            );
          background-size: 300% 100%;
          background-position: center top;
          transform-origin: 50% 0%;
          clip-path: inset(0 0 30% 0);
        }

        .puff--center {
          transform: scale3d(${puffOneWidth}, ${puffOneHeight}, 1)
            skew(var(--cloud-skew)) translate3d(-50%, -70%, 0);
          background: radial-gradient(
              farthest-side at 50% 15%,
              hsla(58, 90%, 97%, 0.9),
              transparent 50%
            ),
            linear-gradient(
              to top,
              hsla(210, 60%, 40%, 0) 30%,
              hsla(210, 70%, 88%, 0.8) 40%,
              hsla(210, 70%, 88%, 0.7) 50%,
              hsla(58, 90%, 97%, 0.3) 100%
            );
          background-size: 300% 100%;
          background-position: center top;
        }

        .puff--left {
          transform: scale3d(${puffTwoWidth}, ${puffTwoHeight}, 1)
            skew(var(--cloud-skew)) translate3d(calc(-50% - 150px), -70%, 0);
          mask-image: linear-gradient(
            to right,
            hsla(0, 0, 0, 1) 60%,
            hsla(0, 0, 0, 0) 95%
          );
        }

        .puff--right {
          transform: scale3d(${puffThreeWidth}, ${puffThreeHeight}, 1)
            skew(var(--cloud-skew)) translate3d(calc(-50% + 150px), -70%, 0);
          mask-image: linear-gradient(
            to left,
            hsla(0, 0, 0, 1) 60%,
            hsla(0, 0, 0, 0) 95%
          );
        }
      `}</style>
    </>
  )
}
