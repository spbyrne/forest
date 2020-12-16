import * as React from 'react'
import * as _ from 'underscore'
import { Scene, Comet } from '../components'

function Index(props) {
  const [mousePosition, setMousePosition] = React.useState({ x: null, y: null })
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  })
  const [vector, setVector] = React.useState({ speed: 0, direction: 0 })

  const updateMousePosition = _.throttle(ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY })
  }, 10)

  const updateWindowSize = _.throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, 10)

  const updateVector = _.throttle(() => {
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

    setVector({ speed, direction })
  }, 10)

  React.useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('resize', updateWindowSize)

    updateWindowSize()

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('resize', updateWindowSize)
    }
  }, [])

  React.useEffect(() => {
    updateVector()
  }, [windowSize, mousePosition])

  React.useEffect(() => {
    // console.log(vector)
  }, [vector])

  return (
    <Scene vector={vector}>
      <Comet vector={vector} />
    </Scene>
  )
}

export default Index
