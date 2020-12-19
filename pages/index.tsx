import * as React from 'react'
import { Forest, Player, Scene } from '../components'

function Index(props) {
  return (
    <>
      <div className="camera">
        <Scene>
          <Forest />
        </Scene>
      </div>
      <div className="overlay"></div>
      <style>{`
        .camera {
          display: block;
          position: absolute;
          perspective: 500px;
          perspective-origin: 50% 28%;
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .overlay {
          transform-style: flat;
          position: absolute;
          left: -25%;
          top: -25%;
          width: 150%;
          height: 150%;
          background: radial-gradient(ellipse,transparent,transparent,hsl(205,86%,18%));
        }
      `}</style>
    </>
  )
}

export default Index
