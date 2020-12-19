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
        @keyframes slide {
          0% {
            transform: translate3d(-300px, 0, 0);
          }
          33% {
            transform: translate3d(0, 200px, -300px);
          }
          66% {
            transform: translate3d(300px, 0, 0);
          }
          100% {
            transform: translate3d(-300px, 0, 0);
          }
        }
        
        .scene {
          transform-style: preserve-3d;
          position: relative;
          display: block;
          left: -300px;
          width: calc(100% + 600px);
          height: 100%;
          top: 0;
          overflow: visible;
          backface-visibility: hidden;

          animation-name: slide;
          animation-duration: 20s;
          animation-timing-function: cubic-bezier(0.420, 0.000, 0.580, 1.000);
          animation-iteration-count: infinite;
        }

        .sun {
          display: block;
          position: fixed;
          top: -40%;
          left: 40%;
          width: 200px;
          height:200px;
          box-shadow: 0 0 2000px 500px hsla(47,10%,85%,0.3);
          transform: translate3d(-50%,-50%,-700px) scale3d(2,2,1);
          background: hsl(50,75%,90%);
          border-radius: 100%;
          backface-visibility: hidden;
        }

        .ground {
          display: block;
          position: fixed;
          top:33%;
          left:50%;
          width:100%;
          height:100%;
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
          position: fixed;
          top:28%;
          left:50%;
          width:40%;
          height:20%;
          transform: translate3d(-50%,-100%,300px) scale3d(2,2,1);
          backface-visibility: hidden;
          background: linear-gradient(
            to bottom,
            hsla(186, 20%, 86%,0),
            hsla(186, 20%, 86%,0.1),
            hsla(186, 20%, 86%,0.3) 82%,
            hsla(186, 20%, 86%,0.1) 90%,
            hsla(186, 20%, 86%,0)
          );
        }
      `}</style>
    </>
  )
}
