import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'

export const MainLayout:React.FC = ({
  children
}) => {
  return (
    <Box display='flex' flexDirection={'column'} height={'100%'}>
      <Navbar />
      <Box sx={{padding:4}}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
