import * as React from 'react'
import * as _ from 'underscore'
import { bias, mix, easeInSin, easeInOutQuad, easeOutQuad } from '@/util'
import { Tree } from 'components/tree'

export const Forest = ({}) => {
  const generateTree = () => {
    let offsetTop = Math.random()
    let left = Math.round(mix(0.1, 0.9, Math.random()) * 1000) / 10 + `%`
    let zIndex =
      Math.round(mix(0, 55, easeInOutQuad(offsetTop)) * 1000) / 1000 + 'px'
    let blur = Math.round(mix(0, 8, bias(offsetTop, 0.3)) * 100) / 100 + `px`
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
    return generateTrees(100)
  }, [])

  return (
    <>
      {trees.map((tree, index) => (
        <Tree position={tree.position} blur={tree.blur} depth={tree.depth} />
      ))}
    </>
  )
}
