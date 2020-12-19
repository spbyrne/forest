import * as React from 'react'

export const Scene = ({ children }) => {
  return (
    <>
      <div className="scene">{children}</div>
      <style>{`
        @keyframes slide {
          0% {
            transform: translate3d(-100px, 0, 0);
          }
          100% {
            transform: translate3d(100px, 0, 0);
          }
        }
        
        .scene {
          transform-style: preserve-3d;
          position: relative;
          display: block;
          left: -100px;
          width: calc(100% + 200px);
          height: 100%;
          top: 0;
          background: linear-gradient(
            to bottom,
            hsl(187, 54%, 78%),
            hsl(166, 50%, 80%) 27%,
            hsl(166, 15%, 75%) 29%,
            hsl(133, 23%, 48%) 50%,
            hsl(166, 47%, 27%) 80%,
            hsl(177, 70%, 18%)
          );

          animation-name: slide;
          animation-duration: 4s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
      `}</style>
    </>
  )
}
