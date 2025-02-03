'use client'
import React, { useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import { useMinutesStore } from '@store/minutes'
import { useSessionStore } from '@store/sessions'
import { formatTime } from '../utils/format'

export const Timer: React.FC = () => {
  const { minutes, restMinutes } = useMinutesStore()
  const { sessions, updateSession, resetSession } = useSessionStore()

  const [currentTimer, setCurrentTimer] = useState<'work' | 'rest'>('work')
  const [timeLeft, setTimeLeft] = useState(minutes * 60)
  const [isRunning, setIsRunning] = useState(false)

  const startTimeRef = useRef(0)
  const pausedTimeRef = useRef(0)
  const animationFrameRef = useRef(0)

  useEffect(() => {
    if (currentTimer === 'work') {
      setTimeLeft(minutes * 60) // Tempo de trabalho
    } else {
      setTimeLeft(restMinutes * 60) // Tempo de descanso
    }
  }, [currentTimer, minutes, restMinutes])

  useEffect(() => {
    document.title = formatTime(timeLeft)

    // Se o temporizador está rodando (isRunning) e ainda há tempo restante (timeLeft > 0):
    if (isRunning && timeLeft > 0) {
      const updateTimer = () => {
        // Calcula o tempo decorrido desde o início do temporizador
        const elapsedTime = Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        )
        // Determina o tempo total para a fase atual (trabalho ou descanso)
        const phaseTime =
          currentTimer === 'work' ? minutes * 60 : restMinutes * 60
        // Calcula o novo tempo restante, garantindo que ele nunca seja negativo
        const newTimeLeft = Math.max(phaseTime - elapsedTime, 0)
        // Atualiza o estado com o novo tempo restante
        setTimeLeft(newTimeLeft)

        // Se ainda há tempo restante, solicita ao navegador para rodar `updateTimer` no próximo frame
        if (newTimeLeft > 0) {
          animationFrameRef.current = requestAnimationFrame(updateTimer)
        } else {
          // Caso contrário, o temporizador para e `isRunning` é definido como `false`
          setIsRunning(false)
          if (currentTimer === 'work') {
            // Atualiza para o modo "descanso" automaticamente ao término do trabalho
            setCurrentTimer('rest')
            setTimeLeft(restMinutes * 60) // Reinicia com o tempo de descanso
          } else if (currentTimer === 'rest') {
            // Atualiza para o modo "trabalho" automaticamente ao término do descanso
            setCurrentTimer('work')
            setTimeLeft(minutes * 60) // Reinicia com o tempo de trabalho
            updateSession() // Incrementa a sessão ao voltar para o trabalho
          }
        }
      }

      // Define o tempo de início ajustado, levando em conta o tempo decorrido
      startTimeRef.current =
        Date.now() -
        (currentTimer === 'work'
          ? minutes * 60 - timeLeft
          : restMinutes * 60 - timeLeft) *
          1000

      // Inicia o loop de atualização do temporizador
      animationFrameRef.current = requestAnimationFrame(updateTimer)
    }

    // Cleanup: Cancela qualquer frame pendente ao desmontar o componente ou reiniciar o timer
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRunning, timeLeft, currentTimer, minutes, restMinutes, updateSession])

  const handleStart = () => {
    if (isRunning) {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current)
      setIsRunning(false)
    } else {
      setIsRunning(true)
    }
  }

  const handleReset = () => {
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current)
    setIsRunning(false)
    setTimeLeft(currentTimer === 'work' ? minutes * 60 : restMinutes * 60)
    resetSession()
  }

  const handleSkipButton = () => {
    if (currentTimer === 'work') {
      setCurrentTimer('rest')
      setIsRunning(false)
    } else {
      setCurrentTimer('work')
      updateSession()
      // Incrementa a sessão ao voltar para o trabalh
      setIsRunning(false)
    }
    setTimeLeft(currentTimer === 'work' ? restMinutes * 60 : minutes * 60) // Atualiza o tempo
  }

  return (
    <section>
      <div style={{ fontSize: '40px', margin: '2rem' }}>
        {formatTime(timeLeft)}
      </div>

      <div>
        <Button variant="contained" onClick={handleStart}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        {isRunning && (
          <>
            <Button variant="contained" onClick={handleSkipButton}>
              skip
            </Button>
            <Button variant="contained" onClick={handleReset}>
              Reset Session
            </Button>
          </>
        )}
        <p>
          SESSAO : {sessions} | CurrentTimer : {currentTimer}
        </p>
      </div>
    </section>
  )
}
