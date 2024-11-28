'use client'
import React, { useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import { useMinutesStore } from '@store/minutes'
import { useSessionStore } from '@store/sessions'

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`
}

export const Timer: React.FC = () => {
  const { minutes } = useMinutesStore()
  const { sessions } = useSessionStore()

  const [timeLeft, setTimeLeft] = useState(minutes * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const startTimeRef = useRef(0)
  const pausedTimeRef = useRef(0)
  const animationFrameRef = useRef(0)

  useEffect(() => {
    document.title = formatTime(timeLeft)
    if (isRunning && timeLeft > 0) {
      // check if the timer is running & has time left

      startTimeRef.current = Date.now() - (minutes * 60 - timeLeft) * 1000
      // Aqui, o Date.now() retorna o tempo atual em milissegundos. Subtrai-se a diferença entre o tempo total (minutes minutos, ou seja, 25 * 60 segundos) e o tempo restante (timeLeft), convertendo isso para milissegundos. Isso é armazenado em startTimeRef.current para acompanhar o tempo que já passou.

      const updateTimer = () => {
        const elapsedTime = Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        )
        // Calcula o tempo que se passou desde que o temporizador começou (elapsedTime).

        const newTimeLeft = Math.max(minutes * 60 - elapsedTime, 0)
        // Calcula o novo tempo restante (newTimeLeft) subtraindo o tempo decorrido do tempo total inicial de 25 minutos
        setTimeLeft(newTimeLeft)
        // Atualiza o estado timeLeft com o novo valor.
        if (newTimeLeft > 0) {
          animationFrameRef.current = requestAnimationFrame(updateTimer)
          // Se ainda houver tempo restante (newTimeLeft > 0), a função continua sendo chamada repetidamente usando requestAnimationFrame:
          // O requestAnimationFrame solicita que o navegador chame a função updateTimer na próxima vez que ele for desenhar a tela, permitindo que o temporizador continue a ser atualizado com alta precisão.
        } else {
          setIsRunning(false)
          setIsFinished(true)
          // Se o tempo restante for 0, o temporizador para de rodar:
          // Isso interrompe o temporizador e define o estado isFinished como true, indicando que o ciclo terminou.
        }
      }
      animationFrameRef.current = requestAnimationFrame(updateTimer)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRunning, minutes, timeLeft])

  useEffect(() => {
    // Atualiza timeLeft quando o valor de minutes muda no store
    setTimeLeft(minutes * 60)
  }, [minutes])

  const handleStart = () => {
    setIsRunning(true)
    setIsFinished(false)
  }

  const handlePause = () => {
    if (isRunning) {
      cancelAnimationFrame(animationFrameRef.current)
      pausedTimeRef.current = timeLeft
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    cancelAnimationFrame(animationFrameRef.current)
    setIsRunning(false)
    setTimeLeft(minutes * 60)
    setIsFinished(false)
    startTimeRef.current = 0
    pausedTimeRef.current = 0
  }

  return (
    <section>
      <div style={{ fontSize: '40px', margin: '2rem' }}>
        {formatTime(timeLeft)}
      </div>

      <div>
        <Button variant="contained" onClick={handleStart}>
          Start
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" onClick={handlePause}>
          Pause
        </Button>

        <p>SESSAO : {sessions}</p>
      </div>
    </section>
  )
}
