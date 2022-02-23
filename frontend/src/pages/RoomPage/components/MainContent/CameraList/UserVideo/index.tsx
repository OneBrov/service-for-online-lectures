import { Box, Typography } from '@mui/material'
import { StreamManager } from 'openvidu-browser'
import { type } from 'os'
import React from 'react'
import { useAppSelector } from '../../../../../../hooks/reduxHooks'
import { selectMe } from '../../../../../../store/usersSlice'
import { UserType } from '../../../../../../utils/types/UserType'
import { NameInCircle } from './NameInCircle'
import { OvMedia } from '../../../../../../components/OvMedia'

//add 
interface UserVideoProps {
    streamManager: StreamManager
    user: UserType | undefined
}

export const UserVideo:React.FC<UserVideoProps> = ({
  streamManager, user
}) => {
  const hasAudio = streamManager.stream.audioActive
  const hasVideo = streamManager.stream.videoActive
  const Icons = [
    hasAudio  && '/svg/enableMicrophone.svg' || '/svg/disableMicrophone.svg',
    hasVideo && '/svg/enableCamera.svg'     || '/svg/disableCamera.svg'
  ]

  return (
    <Box 
      display='flex' 
      flexDirection={'column'} 
      position={'relative'} 
    >
      <Box 
        position={'absolute'} 
        right={0}
        padding='5px'
        display={'flex'}
      >
        {Icons.map(icon => 
          <Box key={icon} 
            sx={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              backdropFilter: 'blur(4px)',
              padding: 0.5, 
              marginLeft: '5px',
              borderRadius: '4px'
            }}
          >
            <img width={24} height={24} src={icon}/>
          </Box>  
        )}
      </Box>
  
      <OvMedia streamManager={streamManager} />
     
      {!hasVideo &&
         <Box sx={{
           position: 'absolute',
           left: '50%',
           top: '50%', 
           marginRight: '-50%',                       
           transform: 'translate(-50%, -50%)'
         }}>
           <NameInCircle name={user?.username || 'unknown'} />
         </Box>
      }
      
      <Box position={'absolute'} 
        component={'span'}
        sx={{  
          bottom: '0',  
          background: 'rgba(0, 0, 0, 0.5)',
          padding: 0.5,
          borderRadius: '4px 4px 0 0'
        }} 
      >
        <Typography>
          {user?.username || 'error'}
        </Typography>
      </Box>
    </Box>
  )}
