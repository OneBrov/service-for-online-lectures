import { Box, CircularProgress, Grid } from '@mui/material'
import { height } from '@mui/system'
import { StreamManager } from 'openvidu-browser'
import React, { useRef } from 'react'
import styles from './OvVideo.module.scss'


interface OvVideoProps {
    streamManager: StreamManager
    muted?: boolean,
    aspectRatio?: string,
    isFullscreen? : boolean
}

export const OvVideo:React.FC<OvVideoProps> = ({
  streamManager, muted, aspectRatio = '4/3', isFullscreen = false
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(()=>{
    if (videoRef.current) {
      streamManager.addVideoElement(videoRef.current)
      videoRef.current.controls = true
      videoRef.current.poster='/svg/illustrations/cameraLoadingSceleton.svg'
    }
  },[videoRef])

  return <Box 
    display={'flex'} 
    flex='1 1 1px' 
    justifyContent={'center'}   
    maxWidth={'100%'} 
    maxHeight={'100%'}  
    sx={{
      background: '#202020'
    }}
  >
    <video 
      muted={muted || false}
      controls
      id='screenSharing'
      height={'100%'}
      autoPlay={true} 
      ref={videoRef}
      className={styles.screenSharingControls}
      style={{
        display: 'flex',
        aspectRatio: aspectRatio, 
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        background: '#202020',
      }} 
    >
    </video>

  </Box>
}
