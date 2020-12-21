import * as React from 'react'
import * as _ from 'underscore'

export const Player = ({}) => {
  return (
    <>
      <div className="player">
        <div className="head"></div>
        <div className="body"></div>
        <div className="shadow"></div>
      </div>
      <style jsx>{`
        .player {
          --player-size: 35px;

          display: block;
          transform: translate3d(0, 0, 420px);
          position: absolute;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          top: 32%;
          left: 50%;
        }

        .body {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: 50% 100%;
          transform: translate3d(-50%, -100%, 0);
          width: calc(var(--player-size) * 0.8);
          height: var(--player-size);
          border-radius: 100px 100px 0 0;
          background: hsl(31, 60, 20);
          box-shadow: inset 0 0.75rem 1rem -0.5rem hsl(31, 30, 40);
        }

        .head {
          --head-size: 22px;

          display: block;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 100%;
          transform: translate3d(
            -11px,
            calc(-1 * var(--player-size) + -0.5 * var(--head-size)),
            0.1px
          );
          width: var(--head-size);
          height: var(--head-size);
          background: hsl(31, 60, 20);
          box-shadow: inset 0 2px 10px -2px hsl(31, 30, 40),
            0 7px 5px -5px hsl(20, 60, 18);

          &:before,
          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 50%;
            width: calc(var(--head-size) / 3.5);
            height: calc(var(--head-size) / 3.5);
            border-radius: 100% 100% 0 0;
            mask-image: linear-gradient(
              to bottom,
              white,
              white 80%,
              rgba(255, 255, 255, 0)
            );
            background: hsl(31, 60, 20);
            box-shadow: inset 0 2px 4px -1px hsl(31, 30, 40);
          }

          &:before {
            transform: translate3d(-9px, 0, -0.1px);
          }

          &:after {
            transform: translate3d(3px, 0, -0.1px);
          }
        }

        .shadow {
          transform: translate3d(-50%, -100%, 0) rotate3d(-1, 0, 0, 90deg)
            scale3d(1, 1, 1);
          left: 0;
          bottom: 1px;
          background: linear-gradient(
            to top,
            ${`hsla(274, 62%, 17%, 0.4)`},
            ${`hsla(274, 62%, 17%, 0.15)`},
            ${`hsla(274, 62%, 17%, 0)`}
          );
          transform-origin: 50% 100%;
          transform-style: preserve-3d;
          display: block;
          width: calc(var(--player-size) * 0.8);
          height: 25px;
          border-radius: 500px 500px 0 0;
          opacity: 1;
        }
      `}</style>
    </>
  )
}
