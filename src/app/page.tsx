'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'

type PomodoroType = 'pomodoro' | 'break' | 'longBreak'

const POMODORO_STATUS = {
  default: 0, // back to begin
  start: 1,
  pause: 2
}

const Home: React.FC = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [status, setStatus] = useState(POMODORO_STATUS.default)
  const [type, setType] = useState<PomodoroType>()

  const intervalRef = useRef<NodeJS.Timeout>()

  const timerMinutes = String(minutes).padStart(2, '0')
  const timerSeconds = String(seconds).padStart(2, '0')

  // clock actions
  const start = () => setStatus(POMODORO_STATUS.start)
  const pause = () => setStatus(POMODORO_STATUS.pause)
  const stop = () => setStatus(POMODORO_STATUS.default)

  const countDown = useCallback(() => {
    if (seconds === 0) {
      if (minutes !== 0) {
        setSeconds(59)
        setMinutes(minutes - 1)
        //reduz 1min e seta segundo para 59
      } else {
        console.log('acabou o timer')
      }
    } else {
      setSeconds(seconds - 1) // diminui segundo a segundo
    }
  }, [minutes, seconds, setMinutes, setSeconds])

  useEffect(() => {
    if (status === POMODORO_STATUS.start) {
      intervalRef.current = setInterval(() => {
        clearInterval(intervalRef.current)
        return countDown()
      }, 1000)
      //starts clock
    } else if (status === POMODORO_STATUS.pause) {
      clearInterval(intervalRef.current)
    }
    //pause clock
    else {
      clearInterval(intervalRef.current)
      setMinutes(25)
      setSeconds(0)
    }
    // reset clock
  }, [countDown, status])

  //NOTE - COMECAR AQUI
  // const handlePomodoroType = useCallback(() => {
  //   if (type === 'pomodoro') {
  //     setMinutes(25)
  //     setSeconds(0)
  //   }
  //   if (type === 'break') {
  //     console.log('entrei')
  //     setMinutes(5)
  //     setSeconds(0)
  //   } else {
  //     setMinutes(15)
  //     setSeconds(0)
  //   }
  // }, [type])

  return (
    <main>
      <header>CABECALHO / CONFIGURACOES</header>
      <Grid container margin={5}>
        <Button variant="outlined" onClick={() => setType('pomodoro')}>
          Pomodoro
        </Button>
        <Button variant="outlined" onClick={() => setType('break')}>
          Short Break
        </Button>
        <Button variant="outlined" onClick={() => setType('longBreak')}>
          Long Break
        </Button>
      </Grid>

      <div style={{ fontSize: '40px', margin: '2rem' }}>
        {timerMinutes}:{timerSeconds}
      </div>

      <Button variant="contained" onClick={start}>
        Start
      </Button>
      <Button variant="contained" onClick={pause}>
        Pause
      </Button>
      <Button variant="contained" onClick={stop}>
        Reset
      </Button>
    </main>
  )
}

export default Home
