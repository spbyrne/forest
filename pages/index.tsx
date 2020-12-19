import * as React from 'react'
import { Forest, Scene } from '../components'

function Index(props) {
  return (
    <>
      <div className="camera">
        <Scene>
          <Forest />
        </Scene>
      </div>
      <style>{`
        .camera {
          display: block;
          position: absolute;
          perspective: 50px;
          perspective-origin: 50% 28%;
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
          top: 0;
        }
      `}</style>
    </>
  )
}

export default Index
