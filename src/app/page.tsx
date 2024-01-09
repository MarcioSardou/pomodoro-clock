'use client'
import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { useTimerStore } from '@store/index'
import { Grid } from '@mui/material'

const Home: React.FC = () => {
  const { minutes, seconds, updateMinutes, updateSeconds } = useTimerStore(
    (state) => state
  )

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval) //test without later

      if (seconds === 0) {
        if (minutes !== 0) {
          // diminui 1min e seta o segundo pra 59
          updateSeconds(59)
          updateMinutes(minutes - 1)
        } else {
          console.log('acabou o timer')
        }
      } else {
        updateSeconds(seconds - 1) // diminui segundo a segundo
      }
    }, 1000)
  }, [minutes, seconds, updateMinutes, updateSeconds])

  return (
    <main>
      <header>CABECALHO / CONFIGURACOES</header>
      <Grid container margin={5}>
        <Button variant="outlined">Pomodoro</Button>
        <Button variant="outlined">Short Break</Button>
        <Button variant="outlined">Long Break</Button>
      </Grid>

      <div style={{ fontSize: '40px', margin: '2rem' }}>
        {timerMinutes}:{timerSeconds}
      </div>

      <Button variant="contained">Start</Button>
      <Button variant="contained">Stop</Button>
    </main>
  )
}

export default Home
