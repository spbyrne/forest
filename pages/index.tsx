import * as React from 'react'
import * as _ from 'underscore'
import { useInterval } from '@/util'
import { Forest } from '../components'

function Index(props) {
  return (
    <>
      <div className="scene">
        <Forest />
      </div>
      <style>{`
        .scene {
          display: block;
          perspective: 50px;
          perspective-origin: 50% 28%;
          transform-style: preserve-3d;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          opacity: 1;
        }
      `}</style>
    </>
  )
}

export default Index
