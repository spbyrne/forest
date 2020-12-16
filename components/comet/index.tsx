import React from 'react'

export interface CometProps {
  vector: { speed: number; direction: number }
  color?: string
}

export const defaultComet: CometProps = {
  vector: {
    speed: 0,
    direction: 0,
  },
  color: '#FAF3DD',
}

export const Comet = ({
  vector = defaultComet.vector,
  color = defaultComet.color,
}: CometProps) => {
  const { speed, direction } = vector

  return (
    <>
      <div className="cometWrapper">
        <span className="comet"></span>
      </div>
      <style jsx>{`
        .cometWrapper {
          --transition-time: 0ms;

          display: block;
          position: relative;
          width: 150px;
          overflow: visible;
        }

        .comet {
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          padding-bottom: 100%;
          height: 0;
          color: ${color};
          overflow: visible;
          transition: all var(--transition-time) ease-in-out;
          filter: drop-shadow(0 0 48px #433f7d);

          &:before {
            content: '';
            top: 1px;
            left: 0;
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #f2ead1, #68649d);
            background-size: 100% 200%;
            clip-path: polygon(0 00%, 100% 0%, 100% 50%, 0 50%);
            border-radius: 100%;
            transform: scale3d(1, 1, 1);
            transition: all var(--transition-time) ease-in-out;
            box-shadow: inset 0 4.5rem 2rem -3rem #f2edde;
          }

          &:after {
            content: '';
            top: -40%;
            left: 0;
            position: absolute;
            display: block;
            width: 100%;
            height: 180%;
            background: linear-gradient(to bottom, #f2ead1, #68649d);
            background-size: 100% 200%;
            clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
            border-radius: 100%;
            transform: scale3d(1, 0.5555, 1);
            transition: all var(--transition-time) ease-in-out;
          }
        }
      `}</style>
      <style jsx>{`
        .comet {
          /* transform: scale3d(1 - 0.75, 1, 1); */
          transform: scale3d(${mix(1, 0.6, easeInOutQuad(speed))}, 1, 1)
            rotate(${direction - 90}deg);

          &:before,
          &:after {
            /* background-size: 100% 100%-200%; */
            background-size: 100% ${mix(200, 100, easeInOutQuad(speed)) + `%`};
          }

          &:before {
            /* transform: scale3d(1, 0.5555-1, 1); */
            transform: scale3d(1, ${mix(1, 1.1, easeInOutQuad(speed))}, 1);
          }

          &:after {
            /* transform: scale3d(1, 0.5555-1, 1); */
            transform: scale3d(1, ${mix(0.5555, 2, easeInOutQuad(speed))}, 1);
          }
        }
      `}</style>
    </>
  )
}

const mix = (stationary, moving, mix) => {
  const difference = moving - stationary
  const current = stationary + difference * mix
  return current
}

const easeInOutQuad = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
