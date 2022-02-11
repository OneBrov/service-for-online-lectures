import { Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'
import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <Box 
      alignItems='center' 
      justifyContent='center' 
      display='flex' 
      flexDirection={'column'}  
      sx={{mt: 5}}
    >
      <Box>
        <img src='/svg/illustrations/404Page.svg'/>
      </Box>
      <Typography>
        <Typography component={'span'} variant='body1' color='primary'>
            404
        </Typography>
        <Typography component={'span'} >
          {' '}Страница не найдена
        </Typography>
      </Typography>
      <Typography variant='h6'>
        <Link to='/home'>На главную</Link>
      </Typography>
    </Box>
  )
}
