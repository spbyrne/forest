import * as React from 'react'

export const Scene = ({ children }) => {
  return (
    <>
      <div className="scene">
        {children}
        <div className="sun"></div>
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
          width: 400px;
          height:400px;
          box-shadow: 0 0 2000px 500px hsla(47,10%,85%,0.3);
          transform: translate3d(-50%,-50%,-500px);
          background: hsl(50,75%,90%);
          border-radius: 100%;
        }

        .ground {
          display: block;
          position: fixed;
          top:-60%;
          left:-60%;
          width:220%;
          height:220%;
          z-index: -1;
          background: linear-gradient(
            to bottom,
            transparent 38%,
            hsla(186, 20%, 86%,0.5) 40%,
            hsl(166, 15%, 75%) 42%,
            hsl(133, 23%, 48%) 55%,
            hsl(150, 47%, 27%) 75%,
            hsl(197, 70%, 18%) 86%,
            hsl(210, 80%, 10%)
          );
        }
      `}</style>
    </>
  )
}
