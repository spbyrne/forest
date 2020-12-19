import * as React from 'react'

export const Scene = ({ children }) => {
  return (
    <>
      <div className="scene">{children}</div>
      <div className="background"></div>
      <style>{`
        @keyframes slide {
          0% {
            transform: translate3d(-300px, 0, 0);
          }
          100% {
            transform: translate3d(300px, 0, 0);
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
          animation-direction: alternate;
        }

        .background {
          display: block;
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index: -1;
          background: linear-gradient(
            to bottom,
            hsl(197, 84%, 70%),
            hsl(197, 64%, 78%) 17%,
            hsl(197, 64%, 88%) 27%,
            hsl(166, 15%, 75%) 30%,
            hsl(133, 23%, 48%) 45%,
            hsl(150, 47%, 27%) 75%,
            hsl(197, 70%, 18%)
          );
        }
      `}</style>
    </>
  )
}
