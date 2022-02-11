import { Button, ButtonBase, ButtonUnstyled, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

interface RoomItemProps {
    name: string
    subject: string
    adminName: string
    userCount: number
    roomId?: string
}

export const RoomItem:React.FC<RoomItemProps> = ({
  name, subject, adminName, userCount, roomId
}) => {
    
  const description: [string, string][] =  [
    ['Предмет', subject],
    ['Организатор', adminName], 
    ['Участники', '' + userCount]
  ]
  return (
    <Button  style={{textDecoration: 'none', textTransform: 'none'}}>
      <Link style={{ textDecoration: 'none' }} to={`${roomId}`} >
        <Box borderRadius={'2px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width='300px' height='200px' sx={{p: 2, backgroundColor: '#556CD6'}}>
          <Typography color='secondary' variant='h5'>
            {name}
          </Typography>
          <Box>
            {description.map((field, index) => 
              <Box key={index} display={'flex'} justifyContent={'space-between'}>
                <Typography  sx={{color: '#CCD3F3'}}>{field[0]}</Typography>
                <Typography color='secondary'>{field[1]}</Typography>
              </Box>)
            }
          </Box>
        </Box>
      </Link>
    </Button>
    
  )
}
