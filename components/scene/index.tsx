import { Fog, Sun } from 'components'
import * as React from 'react'

export const Scene = ({ children }) => {
  return (
    <>
      <div className="scene">
        {children}
        <Sun />
        <Fog />
        <div className="ground"></div>
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

        .ground {
          display: block;
          position: absolute;
          top:33%;
          left:50%;
          width:140%;
          height:75%;
          transform-origin: 50% 0;
          transform: translate3d(-50%,0,-500px) scale3d(2,2,1);
          backface-visibility: hidden;
          background: linear-gradient(
            to bottom,
            hsla(186, 20%, 86%,0.5) ,
            hsl(166, 15%, 75%) 3%,
            hsl(133, 23%, 48%) 25%,
            hsl(150, 47%, 27%) 60%,
            hsl(197, 70%, 18%) 80%,
            hsl(210, 80%, 10%)
          );
        }
        }
      `}</style>
    </>
  )
}
