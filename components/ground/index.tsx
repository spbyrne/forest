import * as React from 'react'

export const Ground = ({}) => {
  return (
    <>
      <div className="ground"></div>
      <style>{`
        .ground {
          display: block;
          position: absolute;
          top:30%;
          left:50%;
          width:140%;
          height:80%;
          transform-origin: 50% 0;
          transform: translate3d(-50%,0,-300px) scale3d(2,2,1);
          backface-visibility: hidden;
          background: linear-gradient(
            to bottom,
            hsla(65, 20%, 86%,0),
            hsl(100, 15%, 80%) 2%,
            hsl(133, 23%, 48%) 25%,
            hsl(150, 47%, 27%) 50%,
            hsl(197, 70%, 18%) 80%,
            hsl(210, 80%, 10%)
          );
        }
      `}</style>
    </>
  )
}
