import * as React from 'react'
import * as _ from 'underscore'
import { mix, randomFromArray } from '@/util'
import { Cloud } from 'components'

export const Clouds = () => {
  const [numberOfClouds, setNumberOfCloud] = React.useState(0)
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
    setNumberOfCloud(
      Math.max(Math.round(windowSize.width / mix(100, 200, Math.random())), 4)
    )
  }, [windowSize])

  const CloudOptions = [Cloud]

  const Clouds = React.useMemo(() => {
    return generateClouds({ numberOfClouds, CloudOptions })
  }, [numberOfClouds])

  React.useEffect(() => {
    if (!Clouds) return
    setOutput(
      Clouds.map((Cloud, index) => {
        return <Cloud.Component {...Cloud.props} key={index} />
      })
    )
  }, [Clouds])

  return <>{output}</>
}

const generateCloud = ({ CloudOptions }) => {
  const Component = randomFromArray(CloudOptions)

  return {
    Component: Component,
    props: {},
  }
}

const generateClouds = ({ numberOfClouds, CloudOptions }) => {
  let Clouds = []

  for (let CloudIndex = 0; CloudIndex < numberOfClouds; CloudIndex++) {
    Clouds.push(generateCloud({ CloudOptions }))
  }

  return Clouds
}
