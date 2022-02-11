import { Box } from '@mui/system'
import React from 'react'
import { TopMenu } from './TopMenu'
import { SpeakersList } from './SpeakersList'
import { ScreenSharing } from './ScreenSharing'
import { CameraList } from './CameraList/indet'

export const MainContent = () => {
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', flex: '1 1 1px'}}>  
      <Box flex='0 0 1px'>
        <TopMenu />
      </Box>
      <Box flex='0 0 1px'>
        <SpeakersList />
      </Box>
      <Box display='flex' flexDirection={'column'}  flex='1 1 1px'>
        <ScreenSharing />
      </Box>
      <Box display='flex' flexDirection={'column'} flex='0 1 1px' >
        <CameraList />
      </Box>

    </Box>
  )
}
