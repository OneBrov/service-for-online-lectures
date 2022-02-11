import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { WebRTCContext } from '../../../providers/WebRTCProvider'
import { UserVideo } from '../CameraList/UserVideo'
import { OvVideo } from '../CameraList/UserVideo/OvVideo'

export const ScreenSharing = () => {
  const rtc = React.useContext(WebRTCContext)
  const screenSharingManager = rtc?.screenPublisher
  const screenSharingSub = rtc?.subscribers?.find(sub => sub.stream.connection.data === 'screenPublisher')

  return (
    <Box display='flex' flexDirection={'column'} flex='1 1 1px' maxWidth={'100%'}  >
      {screenSharingManager 
        ? <OvVideo 
          muted={true} 
          aspectRatio='16/9'
          isFullscreen={true}
          streamManager={screenSharingManager }
        />
        : screenSharingSub &&
        <OvVideo 
          aspectRatio='16/9'
          isFullscreen={true}
          streamManager={screenSharingSub}
        />
      }
    </Box>
  )
}
