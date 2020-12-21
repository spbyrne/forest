import * as React from 'react'
import { mix } from '@/util'

export const Sun = ({ left = 0.3 }) => {
  return (
    <>
      <div className="sun"></div>
      <style>{`
        .sun {
          --offset: var(--sun-offset,${left});

          display: block;
          position: absolute;
          top: -30%;
          left: calc(-100% + calc(300% * var(--offset)));
          width: calc(8vh + 8vw);
          height: calc(8vh + 8vw);
          box-shadow: 0 0 6px 3px hsl(50,60%,96%),  0 0 200px 100px hsla(47,30%,98%,0.2), 0 0 2500px 400px hsla(47,30%,94%,0.2);
          transform: translate3d(-50%,-50%,-1000px) scale3d(2,2,1);
          background: radial-gradient(circle, hsl(50,60%,96%),hsl(50,85%,88%));
          opacity: 0.8;
          border-radius: 100%;
          backface-visibility: hidden;
        }
      `}</style>
    </>
  )
}
