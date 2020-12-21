import * as React from 'react'
import { randomFromArray } from '@/util'

export const Scene = ({
  sunOffset = randomFromArray([0.3, 0.7, 0.25, 0.5, 0.75, 0.2, 0.4, 0.6, 0.8]),
  children,
}) => {
  return (
    <>
      <div className="scene animated-scene">{children}</div>
      <style>{`
      
        .scene {
          --scene-horizon: 33%;
          --sun-offset: ${sunOffset};

          transform-style: preserve-3d;
          position: absolute;
          left: 50%;
          display: block;
          width: 100%;
          height: 100%;
          transform: translate3d(-50%,150px,-150px);
          overflow: visible;
          backface-visibility: hidden;
        }

        @keyframes animatedScene- {
          0% {
            transform: translate3d(-50%,50px,200px);
          }
          100% {
            transform: translate3d(-50%, 450px, -400px);  
          }
        }

        @keyframes animatedScene- {
          0% {
            transform: translate3d(-50%,0px,-150px);
          }
          100% {
            transform: translate3d(-50%,600px,-150px);
          }
        }

        .animated-scene {
          animation-name: animatedScene;
          animation-duration: 10s;
          animation-timing-function: cubic-bezier(0.420, 0.000, 0.580, 1.000);
          animation-iteration-count: 1;
          animation-fill-mode: both;
          animation-delay: 0s;
        }
      `}</style>
    </>
  )
}
