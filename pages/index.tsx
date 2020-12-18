import * as React from 'react'
import * as _ from 'underscore'
import { useInterval } from '@/util'
import { Comet, Starfield } from '../components'

function Index(props) {
  const animationTiming = 50
  const [mousePosition, setMousePosition] = React.useState({ x: null, y: null })
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  })
  const [targetVector, setTargetVector] = React.useState({
    speed: 0,
    direction: 0,
  })
  const [vector, setVector] = React.useState({ speed: 0, direction: 0 })

  const updateMousePosition = _.throttle(ev => {
    setMousePosition({ x: Math.round(ev.clientX), y: Math.round(ev.clientY) })
  }, animationTiming)

  const updateWindowSize = _.throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, 100)

  const updateTargetVector = _.throttle(() => {
    const midpoint = { x: windowSize.width / 2, y: windowSize.height / 2 }

    const direction = Math.round(
      (Math.atan2(mousePosition.y - midpoint.y, mousePosition.x - midpoint.x) *
        180) /
        Math.PI +
        180
    )

    const speedX = Math.abs(mousePosition.x - midpoint.x) / midpoint.x
    const speedY = Math.abs(mousePosition.y - midpoint.y) / midpoint.y
    const speed = Math.round(Math.max(speedX, speedY) * 100) / 100

    setTargetVector({ speed, direction })
  }, animationTiming)

  const animationFrame = () => {
    if (vector == targetVector) return

    let deltaSpeed = Math.round((targetVector.speed - vector.speed) * 100) / 100
    let deltaDirection = targetVector.direction - vector.direction

    let speed = vector.speed + deltaSpeed / 8
    let direction = vector.direction + deltaDirection / 8

    setVector({ speed, direction })
  }

  React.useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('resize', updateWindowSize)

    updateWindowSize()

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('resize', updateWindowSize)
    }
  }, [])

  useInterval(() => {
    animationFrame()
    updateTargetVector()
  }, animationTiming)

  return (
    <>
      <Comet vector={vector} />
      <Starfield windowSize={windowSize} vector={vector} />
    </>
  )
}

export default Index
