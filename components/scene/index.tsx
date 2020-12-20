import { Fog, Sun, Ground } from 'components'
import * as React from 'react'

export const Scene = ({ children }) => {
  return (
    <>
      <div className="scene">
        {children}
        <Sun />
        <Fog />
        <Ground />
      </div>
      <style>{`
        @keyframes intro- {
          0% {
            transform: translate3d(0, 200px,-200px);
          }
          100% {
            transform: translate3d(0, 30px, 0);  
          }
        }
      
        .scene {
          --scene-horizon: 30%;

          transform-style: preserve-3d;
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          transform: translate3d(0, 0, 0);  
          overflow: visible;
          backface-visibility: hidden;

          animation-name: intro;
          animation-duration: 10s;
          animation-timing-function: cubic-bezier(0.420, 0.000, 0.580, 1.000);
          animation-iteration-count: 1;
          animation-fill-mode: both;
          animation-delay: 5s;

          transform: translate3d(0, 200px,-150px);
        }
      `}</style>
    </>
  )
}
