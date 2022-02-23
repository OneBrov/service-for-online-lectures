import { Box, Typography } from '@mui/material'
import React from 'react'

interface NameInCircleProps {
    name: string
}

export const NameInCircle:React.FC<NameInCircleProps> = ({
  name
}) => {
  const [nameAbbreviation, setNameAbbreviation] = React.useState<string>('')

  React.useEffect(() => {
    const firstLetters = name.split(' ').map(n => n[0]).join('').toUpperCase()  
    setNameAbbreviation(firstLetters)
  }, [name]);
  return (
    <Box 
      height={'100px'} 
      width={'100px'} 
      borderRadius='50px'
      display='flex'
      justifyContent={'center'}
      alignItems='center'
      sx={{
        bgcolor: 'primary.main'
      }}
    >
      <Typography variant='h2'>
        {nameAbbreviation}
      </Typography>
    </Box>
  )}
