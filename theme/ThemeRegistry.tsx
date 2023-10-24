'use client'

import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { Roboto } from 'next/font/google'
import { NextAppDirEmotionCacheProvider } from './EmotionCache'
import { colors } from '@mui/material'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

const themeOptions: ThemeOptions = {
  typography: {
    fontSize: 12,
    fontFamily: roboto.style.fontFamily
  },
  palette: {
    primary: {
      main: '#f90c53'
    },
    secondary: {
      main: '#78f5f3'
    },
    background: {
      default: colors.grey[500]
    },
    text: {
      primary: colors.common.white
    }
  }
}

const theme = createTheme(themeOptions)

export default function ThemeRegistry({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
