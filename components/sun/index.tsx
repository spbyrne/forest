import * as React from 'react'
import { mix } from '@/util'

export const Sun = ({ left = 0.3 }) => {
  const { top } = React.useMemo(() => {
    const top = Math.round(mix(-70, -10, Math.random())) + `%`

    return { top }
  }, [])

  return (
    <>
      <div className="sun"></div>
      <style>{`
        .sun {
          --offset: var(--sun-offset,${left});

          display: block;
          position: absolute;
          top: ${top};
          left: calc(-100% + calc(300% * var(--offset)));
          width: calc(8vh + 8vw);
          height: calc(8vh + 8vw);
          box-shadow: 0 0 300px 200px hsla(50,100%,100%,0.5), 0 0 1200px 600px hsla(50,100%,90%,0.3);
          transform: translate3d(-50%,-50%,-1000px) scale3d(2,2,1);
          background: radial-gradient(circle, hsl(50,100%,95%),hsl(50,100%,90%));
          opacity: 1;
          filter: blur(3px);
          border-radius: 100%;
          backface-visibility: hidden;
        }
      `}</style>
    </>
  )
}
