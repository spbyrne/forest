import * as React from 'react'
import * as _ from 'underscore'
import { bias, mix, easeInSin, easeInQuad, easeOutQuad } from '@/util'
import { Tree } from 'components/tree'

export const Forest = ({}) => {
  const generateTree = () => {
    let offsetTop = Math.random()
    let top = Math.round(mix(0.3, 1, offsetTop) * 1000) / 10 + `%`
    top = `30%`
    let left = Math.round(Math.random() * 1000) / 10 + `%`
    let zIndex =
      Math.round(mix(0, 50, easeInSin(offsetTop)) * 1000) / 1000 + 'px'
    let blur = Math.round(mix(0, 15, offsetTop - 0.5) * 100) / 100 + `px`
    let depth = Math.round((1 - easeOutQuad(offsetTop)) * 100) / 100

    return {
      position: {
        top: top,
        left: left,
        zIndex: zIndex,
      },
      blur: blur,
      depth: depth,
    }
  }

  const generateTrees = numberOfTrees => {
    let trees = []

    for (let treeIndex = 0; treeIndex < numberOfTrees; treeIndex++) {
      trees.push(generateTree())
    }

    return trees
  }

  const trees = React.useMemo(() => {
    return generateTrees(150)
  }, [])

  return (
    <>
      <div className="forest">
        {trees.map((tree, index) => (
          <Tree position={tree.position} blur={tree.blur} depth={tree.depth} />
        ))}
      </div>
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translate3d(-100px, 0, 0);
          }
          100% {
            transform: translate3d(100px, 0, 0);
          }
        }

        .forest {
          transform-style: preserve-3d;
          transform: translateZ(-100px);
          transform-style: preserve-3d;
          position: absolute;
          top: 0;
          left: -100px;
          width: calc(100% + 200px);
          height: 100%;
          background: linear-gradient(
            to bottom,
            hsl(187, 54%, 78%),
            hsl(166, 40%, 85%) 27%,
            hsl(166, 15%, 75%) 29%,
            hsl(133, 23%, 48%) 50%,
            hsl(166, 47%, 27%) 80%,
            hsl(177, 70%, 18%)
          );

          animation-name: slide;
          animation-duration: 4s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
      `}</style>
    </>
  )
}
