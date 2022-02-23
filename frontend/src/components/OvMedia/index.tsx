import { Box, CircularProgress, Grid } from '@mui/material'
import { height } from '@mui/system'
import { StreamManager } from 'openvidu-browser'
import React, { useRef } from 'react'
import styles from './OvMedia.module.scss'


interface OvMediaProps {
    streamManager: StreamManager
    muted?: boolean,
    aspectRatio?: string,
    className?: string
}

export const OvMedia:React.FC<OvMediaProps> = ({
  streamManager, muted, aspectRatio = '4/3', className = ''
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(()=>{
    if (videoRef.current) {
      streamManager.addVideoElement(videoRef.current)
      videoRef.current.controls = true
    }
  },[videoRef])



  return <Box 
    display={'flex'} 
    position={'relative'}
    flexDirection='row'
    justifyContent={'center'}  
    width='100%' 
    height={'100%'}
    flex='1 1'
    sx={{
      background: '#202020'
    }}
  >
    <video 
      muted={muted || false}
      controls
      id='screenSharing'
      width={'100%'}
      autoPlay={true} 
      ref={videoRef}

      className={`
        ${styles.screenSharingControls} ${className}
      `}
      style={{
        height: '100%',
        width:  '100%',
        objectFit: 'contain',
        aspectRatio: aspectRatio, 
        background: '#202020',
      }} 
    >
    </video>

  </Box>
}
