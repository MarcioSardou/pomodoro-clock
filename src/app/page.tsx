'use client'

import React from 'react'
import Button from '@mui/material/Button'
import { useTimerStore } from '@store/index'

const Home: React.FC = () => {
  const timer = useTimerStore((state) => state.type)

  const HandleClick = () => {
    console.log(timer)
  }

  return (
    <main>
      <header>CABECALHO / CONFIGURACOES</header>

      <section>
        POMODORO CARD
        <Button variant="contained" onClick={HandleClick}>
          Hello worldss
        </Button>
        ;
      </section>
    </main>
  )
}

export default Home
