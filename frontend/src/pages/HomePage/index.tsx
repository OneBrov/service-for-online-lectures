import { Box, Typography } from '@mui/material'
import React from 'react'
import { MainLayout } from '../../components/MainLayout'


export const HomePage = () => {
  return (
    <main>
      <Box >
        <Typography variant='h4' textAlign={'center'}>
            Classroom — сервис для проведения онлайн лекций.
        </Typography>
        <Box display={'flex'} justifyContent={'center'} marginTop={5}>
          <img src='/svg/illustrations/call.svg' />
        </Box>
      </Box>
    </main>
  )
}
