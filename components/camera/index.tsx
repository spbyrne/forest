import * as React from 'react'

export const Camera = ({ children }) => {
  return (
    <>
      <div className="camera">{children}</div>
      <style jsx>{`
        .camera {
          display: block;
          position: absolute;
          perspective: 500px;
          perspective-origin: 50% 33%;
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      `}</style>
    </>
  )
}
