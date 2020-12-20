import { Player } from 'components'
import * as React from 'react'

export const Scene = ({ children }) => {
  return (
    <>
      <div className="scene">
        {children}
        <div className="sun"></div>
        <div className="fog"></div>
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

          transform: translate3d(0, 200px,-200px);
        }

        .sun {
          display: block;
          position: absolute;
          top: -40%;
          left: 40%;
          width: 200px;
          height:200px;
          box-shadow: 0 0 2000px 500px hsla(47,10%,85%,0.3);
          transform: translate3d(-50%,-50%,-700px) scale3d(2,2,1);
          background: hsl(50,85%,94%);
          opacity: 0.8;
          border-radius: 100%;
          backface-visibility: hidden;
        }

        .ground {
          display: block;
          position: absolute;
          top:33%;
          left:50%;
          width:140%;
          height:80%;
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

        .fog {
          display: block;
          position: absolute;
          top:28%;
          left:50%;
          width:60%;
          height:25%;
          transform-origin: 50% 100%;
          transform: translate3d(-50%,-100%,300px) scale3d(2,2,1);
          backface-visibility: hidden;
          background: linear-gradient(
            to bottom,
            hsla(120, 20%, 86%,0),
            hsla(180, 20%, 86%,0.1),
            hsla(50, 30%, 86%,0.2) 78%,
            hsla(50, 30%, 86%,0.3) 84%,
            hsla(80, 20%, 86%,0.1) 94%,
            hsla(120, 20%, 86%,0)
          );
        }
      `}</style>
    </>
  )
}
