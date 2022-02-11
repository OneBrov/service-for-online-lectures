import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <Box marginTop={'auto'} marginBottom={2} component='footer'>
   
      <Box display='flex' justifyContent={'center'}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <Typography variant='caption'>
              Автор работы:
            <Typography color={'primary'} variant='caption' component={'span'} >
              {''} Данил Евдокимов
            </Typography>
          </Typography>
        </Box>
        <Button 
          sx={{textTransform: 'none', marginLeft: 3}}  
          startIcon={<img src='/svg/github.svg'/>} 
          href='https://github.com/OneBrov' 
          variant='text'
        >
          <Typography color={'primary'} variant='caption' >
              Источник кода
          </Typography>
        </Button>

      </Box> 
      
    </Box>
  )
}
