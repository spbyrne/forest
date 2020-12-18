import React from 'react'
import { mix, easeInOutQuad } from '@/util'

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
        <span className="comet">
          <span className="nucleus"></span>
          <span className="tail"></span>
        </span>
      </div>
      <style jsx>{`
        .cometWrapper {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-75px, -75px, 0);
          z-index: 10;
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
          overflow: visible;
          filter: drop-shadow(0 0 48px #433f7d);
        }

        .nucleus {
          position: absolute;
          top: 12px;
          left: 12px;
          width: calc(100% - 24px);
          height: calc(100% - 24px);
          transform-origin: 50% 50%;
          border-radius: 100%;
          background: linear-gradient(to bottom, #b7b3a5, #eeedea);
          box-shadow: inset 0 0 32px #8e839a;
          z-index: 5;

          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 30%;
            left: 15%;
            width: 30%;
            height: 30%;
            border-radius: 100%;
            background: radial-gradient(
              circle,
              transparent,
              rgba(0, 0, 0, 0.01) 50%,
              rgba(0, 0, 0, 0.1)
            );
          }

          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 70%;
            left: 50%;
            width: 20%;
            height: 20%;
            border-radius: 100%;
            background: radial-gradient(
              circle,
              transparent,
              rgba(0, 0, 0, 0.01) 50%,
              rgba(0, 0, 0, 0.1)
            );
          }
        }

        .tail {
          display: block;
          width: 100%;
          height: 100%;
          opacity: 0.8;
          overflow: visible;

          &:before {
            content: '';
            top: 1px;
            left: 0;
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #f5d45d, #f5a25d, #e35555);
            background-size: 100% 200%;
            clip-path: polygon(0 00%, 100% 0%, 100% 50%, 0 50%);
            border-radius: 100%;
            transform: scale3d(1, 1, 1);
            box-shadow: inset 0 4.5rem 2rem -3rem #f5d45d;
            z-index: 10;
          }

          &:after {
            content: '';
            top: -50%;
            left: 0;
            position: absolute;
            display: block;
            width: 100%;
            height: 200%;
            background: linear-gradient(to bottom, #f5d45d, #f5a25d, #e35555);
            background-size: 100% 200%;
            clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
            border-radius: 100%;
            transform: scale3d(1, 0.5, 1);
            z-index: 10;
            mask-image: linear-gradient(to top, transparent, black 40%);
          }
        }
      `}</style>
      <style jsx>{`
        .comet {
          transform: rotate(${direction - 90}deg)
            scale3d(${mix(1, 0.8, easeInOutQuad(speed))}, 1, 1);
        }

        .tail {
          opacity: ${mix(0, 0.7, easeInOutQuad(speed))};

          &:before,
          &:after {
            background-size: 100% ${mix(200, 100, easeInOutQuad(speed)) + `%`};
          }

          &:before {
            transform: scale3d(1, ${mix(1, 1.1, easeInOutQuad(speed))}, 1);
          }

          &:after {
            transform: scale3d(1, ${mix(0.5555, 2.5, easeInOutQuad(speed))}, 1);
          }
        }

        .nucleus {
          transform: translate3d(
            0,
            ${mix(0, -10, easeInOutQuad(speed)) + `px`},
            0
          );
        }
      `}</style>
    </>
  )
}
