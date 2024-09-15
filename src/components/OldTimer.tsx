'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import { TimerMode, useTimerStore } from '@store/index'

//NOTE - refatorar
const POMODORO_STATUS = {
  default: 0,
  start: 1,
  pause: 2
}

const POMODORO = 'pomodoro'
const BREAK = 'break'
const LONGBREAK = 'longBreak'

export const OldTimer: React.FC = ({}) => {
  const {
    minutes,
    seconds,
    timerMode,
    updateMinutes,
    updateSeconds,
    updateTimerMode
  } = useTimerStore((state) => state)

  const [status, setStatus] = useState<number>()

  const intervalRef = useRef<NodeJS.Timeout>()
  const timerMinutes = String(minutes).padStart(2, '0')
  const timerSeconds = String(seconds).padStart(2, '0')

  const start = () => setStatus(POMODORO_STATUS.start)
  const pause = () => setStatus(POMODORO_STATUS.pause)
  const stop = () => setStatus(POMODORO_STATUS.default)

  const handleTimerMode = useCallback(
    (timerMode: TimerMode) => {
      setStatus(POMODORO_STATUS.default)
      if (timerMode === POMODORO) {
        clearInterval(intervalRef.current)
        updateTimerMode(POMODORO)
        updateMinutes(25)
        updateSeconds(0)
      }
      if (timerMode === BREAK) {
        clearInterval(intervalRef.current)
        updateTimerMode(BREAK)
        updateMinutes(5)
        updateSeconds(0)
      }
      if (timerMode === LONGBREAK) {
        clearInterval(intervalRef.current)
        updateTimerMode(LONGBREAK)
        updateMinutes(15)
        updateSeconds(0)
      }
    },
    [updateMinutes, updateSeconds, updateTimerMode]
  )

  //NOTE - primeira func pra componentizar
  const countDown = useCallback(() => {
    if (seconds === 0) {
      if (minutes !== 0) {
        updateSeconds(59)
        updateMinutes(minutes - 1)
        //reduz 1min e seta segundo para 59
      } else {
        alert('acabou a contagem')
      }
    } else {
      updateSeconds(seconds - 1)
      // diminui segundo a segundo
    }
  }, [minutes, seconds, updateMinutes, updateSeconds])

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
      handleTimerMode(timerMode)
    }
    // reset clock
  }, [countDown, handleTimerMode, status, timerMode])

  return (
    <main>
      {/* //NOTE - pode virar um componente com .map para exibir  */}
      <Grid container margin={5}>
        <Button variant="outlined" onClick={() => handleTimerMode(POMODORO)}>
          Pomodoro
        </Button>
        <Button variant="outlined" onClick={() => handleTimerMode(BREAK)}>
          Short Break
        </Button>
        <Button variant="outlined" onClick={() => handleTimerMode(LONGBREAK)}>
          Long Break
        </Button>
      </Grid>

      <div style={{ fontSize: '60px', margin: '2rem' }}>
        {timerMinutes}:{timerSeconds}
      </div>

      <Button variant="contained" onClick={start}>
        Start
      </Button>
      <Button variant="contained" onClick={pause}>
        Pause
      </Button>
      {/* <Button variant="contained" onClick={stop}>
        Reset
      </Button> */}
    </main>
  )
}
