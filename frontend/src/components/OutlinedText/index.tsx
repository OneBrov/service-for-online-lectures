import { Box, Typography } from '@mui/material'
import React from 'react'

interface OutlinedTextProps {
  color?: 'default' | 'active'
}

const colors = {
  'default': '#9BA7DE',
  'active' : '#9BDEA2',
}

export const OutlinedText:React.FC<OutlinedTextProps> = ({
  children,
  color = 'default'
}) => {
  return (
    <Box 
      sx={{
        border: `1px solid ${colors[color]}`, 
        borderRadius: '7px', 
        paddingX: '10px', 
        marginRight: '10px'
      }}
    >
      <Typography variant='body2'>
        {children}
      </Typography>
    </Box>
  )
}
