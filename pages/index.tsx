import * as React from 'react'
import { useKeyboardShortcuts } from 'use-keyboard-shortcuts'
import { Forest, Player, Scene } from '../components'
import { useInterval } from '@/util'

function Index(props) {
  var [playerPosition, setPlayerPosition] = React.useState(0)
  var [playerSpeed, setPlayerSpeed] = React.useState(0)
  var [moving, setMoving] = React.useState('false')

  const moveRight = () => {
    setMoving('right')
  }

  const moveLeft = () => {
    setMoving('left')
  }

  const gameLoop = () => {
    setPlayerPosition(playerPosition + playerSpeed)
    if (playerSpeed > 0) {
      setPlayerSpeed(Math.min(0, playerSpeed - 0.1))
    }
    if (playerSpeed < 0) {
      setPlayerSpeed(Math.max(0, playerSpeed + 0.1))
    }
  }

  useKeyboardShortcuts([
    { keys: ['ArrowRight'], onEvent: moveRight },
    { keys: ['ArrowLeft'], onEvent: moveLeft },
  ])

  useInterval(() => {
    gameLoop()
  }, '50ms')

  return (
    <>
      <div className="camera">
        <Scene>
          <Forest />
        </Scene>
      </div>
      <div className="overlay"></div>
      <style>{`
        .camera {
          --player-position: ${playerPosition};

          transition: all 1s ease-out;
        }
      `}</style>
      <style>{`
        .camera {
          display: block;
          position: absolute;
          perspective: 500px;
          perspective-origin: 40% 25%;
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .overlay {
          transform-style: flat;
          position: absolute;
          left: -25%;
          top: -25%;
          width: 150%;
          height: 150%;
          background: radial-gradient(ellipse,transparent,transparent,hsl(205,86%,18%));
          pointer-events: none;
        }
      `}</style>
    </>
  )
}

export default Index
