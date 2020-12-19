import * as React from 'react'
import * as _ from 'underscore'
import { mix } from '@/util'

export const Player = ({}) => {
  return (
    <>
      <div className="playerWrapper">
        <div className="player"></div>
      </div>
      <style jsx>{`
        .playerWrapper {
          display: block;
          transform: translate3d(0, 30vh, 45px);
          position: absolute;
          top: 0;
          left: 50%;
        }

        .player {
          display: block;
          transform-origin: 50% 100%;
          transform: translate3d(-50%, -100%, 0) scale3d(0.1, 0.1, 1);
          width: 100px;
          height: 200px;
          border-radius: 100% 100% 0 0;
          background: black;
        }
      `}</style>
    </>
  )
}
