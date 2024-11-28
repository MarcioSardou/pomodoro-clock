import { Grid, Button } from '@mui/material'
import { useMinutesStore } from '@store/minutes'
import React from 'react'

export const TimerSelector: React.FC = () => {
  const { updateMinutes } = useMinutesStore()

  return (
    <Grid container margin={5}>
      <Button variant="outlined" onClick={() => updateMinutes(30)}>
        CONFIG
      </Button>
    </Grid>
  )
}
