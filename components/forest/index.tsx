import * as React from 'react'
import * as _ from 'underscore'
import {
  bias,
  mix,
  easeInSin,
  easeInOutQuad,
  easeOutQuad,
  easeInQuad,
  easeInExpo,
} from '@/util'
import { Tree } from 'components/tree'

export const Forest = ({ numberOfTrees = 50 }) => {
  const generateTree = () => {
    let offsetTop = Math.random()
    let left = Math.round(Math.random() * 1000) / 10 + `%`
    let zIndex =
      Math.round(mix(0, 300, easeInOutQuad(offsetTop)) * 1000) / 1000 + 'px'
    let blur = Math.round(mix(0, 5, easeInExpo(offsetTop))) + `px`
    let depth = Math.round((1 - easeOutQuad(offsetTop)) * 100) / 100

    return {
      position: {
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
    return generateTrees(numberOfTrees)
  }, [numberOfTrees])

  return (
    <>
      {trees.map((tree, index) => (
        <Tree position={tree.position} blur={tree.blur} depth={tree.depth} />
      ))}
    </>
  )
}
