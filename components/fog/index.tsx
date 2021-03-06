import * as React from 'react'
import { easeInQuad, mix } from '@/util'

export const Fog = ({
  density = Math.round(mix(0.1, 0.3, Math.random()) * 100) / 100,
}) => {
  return (
    <>
      <div className="fog layer-one"></div>
      <div className="fog layer-two"></div>
      <div className="fog layer-three"></div>
      <div className="fog layer-four"></div>
      <div className="fog layer-five"></div>
      <div className="fog layer-six"></div>
      <style>{`
        .fog {
          --fog-density: ${easeInQuad(density)};

          display: block;
          position: absolute;
          top: var(--scene-horizon);
          left:50%;
          width:100%;
          height:50%;
          pointer-events: none;
          transform-origin: 50% 100%;
          transform: translate3d(-50%,-100%,100px) scale3d(2,2,1);
          backface-visibility: hidden;
          background: linear-gradient(
            to bottom,
            hsla(120, 8%, 80%,0),
            hsla(180, 8%, 80%,calc(var(--fog-density) * 0.3)) 20%,
            hsla(50, 8%, 80%,calc(var(--fog-density) * 0.7)) 60%,
            hsla(50, 8%, 80%,calc(var(--fog-density) * 0.9)) 82%,
            hsla(80, 8%, 80%,calc(var(--fog-density) * 0.7)) 92%,
            hsla(120, 8%, 80%,0)
          );
        }
        
        .layer-one {
          transform: translate3d(-50%,-100%,40px) scale3d(2,2,1);
        }

        .layer-two {
          transform: translate3d(-50%,-100%,130px) scale3d(2,2,1);
        }

        .layer-three {
          transform: translate3d(-50%,-100%,220px) scale3d(2,2,1);
        }

        .layer-four {
          transform: translate3d(-50%,-100%,340px) scale3d(2,2,1);
        }

        .layer-five {
          transform: translate3d(-50%,-100%,450px) scale3d(2,2,1);
        }

        .layer-six {
          transform: translate3d(-50%,-100%,520px) scale3d(2,2,1);
        }
      `}</style>
    </>
  )
}
