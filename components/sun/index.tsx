import * as React from 'react'

export const Sun = ({}) => {
  return (
    <>
      <div className="sun"></div>
      <style>{`
        .sun {
          display: block;
          position: absolute;
          top: -30%;
          left: -10%;
          width: calc(8vh + 8vw);
          height: calc(8vh + 8vw);
          box-shadow:  0 0 200px 100px hsla(47,30%,98%,0.2), 0 0 2500px 400px hsla(47,30%,94%,0.2);
          transform: translate3d(-50%,-50%,-1000px) scale3d(2,2,1);
          background: radial-gradient(hsla(50,60%,96%,1),hsla(50,85%,88%,0.8));
          opacity: 0.8;
          border-radius: 100%;
          backface-visibility: hidden;
        }
      `}</style>
    </>
  )
}
