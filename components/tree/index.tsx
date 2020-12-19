import * as React from 'react'
import * as _ from 'underscore'
import { mix, easeOutQuad, easeInQuad, easeInSin, easeOutExpo } from '@/util'

export const Tree = ({
  position = { top: '50%', left: '50%', zIndex: 50 },
  blur = 0,
  depth = 0,
}) => {
  const {
    trunkHeight,
    trunkWidth,
    crownHeight,
    crownWidth,
  } = React.useMemo(() => {
    const trunkHeight = Math.round(mix(20, 80, Math.random())) + `px`
    const trunkWidth = Math.round(mix(15, 35, Math.random())) + `px`
    const crownHeight = Math.round(mix(80, 200, Math.random())) + `px`
    const crownWidth = Math.round(mix(60, 180, Math.random())) + `px`

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
          top: 0%;
          left: ${position.left};
          filter: blur(var(--blur));

          /* Shadow */
          &:before {
            content: '';
            display: block;
            position: absolute;
            bottom: calc(var(--trunk-height) * -0.5);
            left: calc(var(--trunk-height) * 0.3);
            width: var(--crown-width);
            height: calc(var(--crown-width) * 0.3);
            transform: translate3d(0, 0, 0);
            border-radius: 100%;
            background: hsla(274, 62, 17, 0.2);
            filter: blur(10px);
            opacity: calc(1 - ${easeOutQuad(depth)});
            opacity: ${1 - easeOutQuad(depth)};
          }

          /* Trunk Shadow */
          &:after {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            transform: translate3d(0, 100%, 0) rotate(-80deg);
            width: var(--trunk-width);
            height: var(--trunk-height);
            transform-origin: 0 0;
            z-index: -1;
            filter: blur(1px);
            background: linear-gradient(
              to right,
              hsla(310, 62%, 17%, 0.7),
              hsla(310, 62%, 17%, 0.3),
              transparent
            );
            mask-image: linear-gradient(to bottom, white, transparent);
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
            mix(39, 85, easeOutQuad(depth)) +
            `%)`};
          box-shadow: inset -0.75rem calc(var(--crown-height) / 2 + 0.5rem) 1rem
            ${`hsla(310, 62%, 17%, ` + (1 - easeOutQuad(depth)) + `)`};
          bottom: 0;
          left: 0;
          transform: translate3d(-50%, 0, 0);
        }

        .crown {
          position: absolute;
          background: ${`hsl(88, ` +
            mix(60, 20, depth) +
            `%, ` +
            mix(30, 80, depth) +
            `%)`};
          box-shadow: inset -1rem -1.5rem 2rem
            ${`hsla(176, 66%, 22%, ` + (1 - easeOutQuad(depth)) + `)`};
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
