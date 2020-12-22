import * as React from 'react'
import { Forest, Ground, Cloud, Camera, Scene, Sun, Fog } from '../components'

function Index(props) {
  return (
    <>
      <Camera>
        <Scene>
          <Cloud />
          <Cloud />
          <Cloud />
          <Cloud />
          <Cloud />
          <Cloud />
          <Cloud />
          <Cloud />
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
          background: radial-gradient(ellipse,hsla(205,86%,18%,0),hsla(205,86%,18%,0),hsl(205,86%,18%));
          pointer-events: none;
        }
      `}</style>
    </>
  )
}

export default Index
