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

export const Forest = ({ numberOfTrees = 150 }) => {
  const generateTree = () => {
    let offsetTop = Math.random()
    let left = Math.round(mix(-0.4, 1.4, Math.random()) * 1000) / 10 + `%`
    let zIndex = Math.round(mix(0, 700, offsetTop) * 1000) / 1000 + 'px'
    let depth = Math.round((1 - easeOutQuad(offsetTop)) * 100) / 100

    return {
      left: left,
      zIndex: zIndex,
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
        <Tree {...tree} key={index} />
      ))}
    </>
  )
}
