import { Grid, Button } from '@mui/material'
import { TimerType, useTimerStore } from '@store/index'
import React from 'react'

export const TimerSelector: React.FC = () => {
  const { setTimerType, updateMinutes } = useTimerStore()

  function handleTimerMode(timerType: TimerType) {
    setTimerType(timerType)
  }

  return (
    <Grid container margin={5}>
      <Button variant="outlined" onClick={() => handleTimerMode('pomodoro')}>
        Pomodoro
      </Button>
      <Button variant="outlined" onClick={() => handleTimerMode('break')}>
        Short Break
      </Button>
      <Button variant="outlined" onClick={() => handleTimerMode('longBreak')}>
        Long Break
      </Button>
      <Button variant="outlined" onClick={() => updateMinutes(30)}>
        CONFIG
      </Button>
    </Grid>
  )
}
