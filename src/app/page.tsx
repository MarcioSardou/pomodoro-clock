'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'

type PomodoroType = 'pomodoro' | 'break' | 'longBreak'

const POMODORO_TYPE = {
  POMODORO: 'pomodoro',
  BREAK: 'break',
  LONGBREAK: 'longBreak'
}

const POMODORO_STATUS = {
  default: 0,
  start: 1,
  pause: 2
}

const Home: React.FC = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [status, setStatus] = useState<number>()
  const [type, setType] = useState<PomodoroType>('pomodoro')

  const intervalRef = useRef<NodeJS.Timeout>()
  const timerMinutes = String(minutes).padStart(2, '0')
  const timerSeconds = String(seconds).padStart(2, '0')

  const start = () => setStatus(POMODORO_STATUS.start)
  const pause = () => setStatus(POMODORO_STATUS.pause)
  const stop = () => setStatus(POMODORO_STATUS.default)

  const handlePomodoroType = (pomodoroType: PomodoroType) => {
    setStatus(POMODORO_STATUS.default)
    if (pomodoroType === POMODORO_TYPE.POMODORO) {
      clearInterval(intervalRef.current)
      setType(POMODORO_TYPE.POMODORO)
      setMinutes(25)
      setSeconds(0)
    }
    if (pomodoroType === POMODORO_TYPE.BREAK) {
      clearInterval(intervalRef.current)
      setType(POMODORO_TYPE.BREAK)
      setMinutes(5)
      setSeconds(0)
    }
    if (pomodoroType === POMODORO_TYPE.LONGBREAK) {
      clearInterval(intervalRef.current)
      setType(POMODORO_TYPE.LONGBREAK)
      setMinutes(15)
      setSeconds(0)
    }
  }

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
      setSeconds(seconds - 1)
      // diminui segundo a segundo
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
      //pause clock
    } else if (status === POMODORO_STATUS.default) {
      clearInterval(intervalRef.current)
      handlePomodoroType(type)
    }
    // reset clock
  }, [countDown, status, type])

  return (
    <main>
      <Grid container margin={5}>
        <Button
          variant="outlined"
          onClick={() => handlePomodoroType('pomodoro')}
        >
          Pomodoro
        </Button>
        <Button variant="outlined" onClick={() => handlePomodoroType('break')}>
          Short Break
        </Button>
        <Button
          variant="outlined"
          onClick={() => handlePomodoroType('longBreak')}
        >
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
