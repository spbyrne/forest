import * as React from 'react'
import * as _ from 'underscore'
import { mix, easeOutQuad, randomFromArray, easeInSin } from '@/util'
import { Tree, Rock } from 'components'

export const Forest = () => {
  const [numberOfObjects, setNumberOfObject] = React.useState(0)
  const [output, setOutput] = React.useState(null)
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  })

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  React.useEffect(() => {
    window.addEventListener('resize', updateWindowSize)

    updateWindowSize()

    return () => {
      window.removeEventListener('resize', updateWindowSize)
    }
  }, [])

  React.useEffect(() => {
    if (!windowSize) return
    setNumberOfObject(Math.min(windowSize.width / 8, 1000))
  }, [windowSize])

  const objectOptions = [Tree, Tree, Tree, Rock]

  const objects = React.useMemo(() => {
    return generateObjects({ numberOfObjects, objectOptions })
  }, [numberOfObjects])

  React.useEffect(() => {
    if (!objects) return
    setOutput(
      objects.map((object, index) => {
        return <object.Component {...object.props} key={index} />
      })
    )
  }, [objects])

  return <>{output}</>
}

const generateObject = ({ objectOptions }) => {
  const offsetTop = Math.random()
  const left = mix(-0.4, 1.4, Math.random())
  const zIndex =
    Math.round(mix(-200, 520, easeInSin(offsetTop)) * 1000) / 1000 + 'px'
  const depth = Math.round((1 - offsetTop) * 100) / 100
  const Component = randomFromArray(objectOptions)

  return {
    Component: Component,
    props: {
      left: left,
      zIndex: zIndex,
      depth: depth,
    },
  }
}

const generateObjects = ({ numberOfObjects, objectOptions }) => {
  let objects = []

  for (let objectIndex = 0; objectIndex < numberOfObjects; objectIndex++) {
    objects.push(generateObject({ objectOptions }))
  }

  return objects
}
