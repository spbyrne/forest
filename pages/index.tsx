import * as React from 'react'
import { Forest, Ground, Camera, Scene, Sun, Fog } from '../components'

function Index(props) {
  return (
    <>
      <Camera>
        <Scene>
          <Sun />
          <Fog />
          <Forest />
          <Ground />
        </Scene>
      </Camera>
      <div className="overlay"></div>
      <style>{`
        .overlay {
          transform-style: flat;
          position: absolute;
          left: -25%;
          top: -25%;
          width: 150%;
          height: 150%;
          background: radial-gradient(ellipse,transparent,transparent,hsl(205,86%,18%));
          pointer-events: none;
        }
      `}</style>
    </>
  )
}

export default Index
