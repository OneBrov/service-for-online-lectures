import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { WebRTCContext } from '../../../providers/WebRTCProvider'
import { OvMedia } from '../../../../../components/OvMedia'
import styles from './ScreenSharing.module.scss'

export const ScreenSharing = () => {
  const rtc = React.useContext(WebRTCContext)
  const screenSharingManager = rtc?.screenPublisher
  const screenSharingSub = rtc?.subscribers?.find(sub => sub.stream.connection.data === 'screenPublisher')

  return (
    <Box display='flex' flexDirection={'column'} flex='1 1 1px' maxWidth={'100%'}  >
      {screenSharingManager 
        ? <OvMedia 
          muted={true} 
          aspectRatio='16/9'
          streamManager={screenSharingManager }
          className={styles.screenShare}
        />
        : screenSharingSub &&
        <OvMedia 
          aspectRatio='16/9'
          streamManager={screenSharingSub}
          className={styles.screenShare}
        />
      }
    </Box>
  )
}
