import { Alert, fabClasses, IconButton, Link, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'

import { ActionButton } from '../../../../../components/buttons/ActionButton'
import { WebRTCContext } from '../../../providers/WebRTCProvider'




export const TopMenu = () => {
  const [steamEnabled, setStreamEnabled] = React.useState<boolean>(false)
  const [microphoneEnabled, setMicrophoneEnabled] = React.useState<boolean>(false)
  const [cameraEnabled, setCameraEnabled] = React.useState<boolean>(false)

  const rtc = React.useContext(WebRTCContext)
  const publisher = rtc?.publisher || undefined

  const toggleMicro = () => {
    if (publisher) {
      publisher.publishAudio(!microphoneEnabled)
      setMicrophoneEnabled(prev => !prev)
    }
  }

  const toggleCamera = () => {
    if (publisher) {
      publisher.publishVideo(!cameraEnabled)
      setCameraEnabled(prev => !prev)
    }
  }

  const toggleStream = () => {
    const streamAlreadyRun = rtc.subscribers.find(user=>user.stream.connection.data === 'screenPublisher')
    if (streamAlreadyRun && !steamEnabled) {
      alert('В данный момент кто-то уже ведет трансляюцию экрана')
    }

    if (rtc?.toggleScreenSharing) {
      rtc?.toggleScreenSharing(!steamEnabled)
      setStreamEnabled(prev => !prev)
    }
   
  }

  const ToggleButtons = [
    {
      activeTooltip: 'Завершить показ экрана',
      notActiveTooltip: 'Начать показ экрана',
      activeSrc: '/svg/disableStream.svg',
      notActiveSrc: '/svg/enableStream.svg',
      onClick: toggleStream,
      isActive: steamEnabled
    },
    {
      activeTooltip: 'Выключить веб-камеру',
      notActiveTooltip: 'Включить веб-камеру',
      activeSrc: '/svg/disableCamera.svg',
      notActiveSrc: '/svg/enableCamera.svg',
      onClick: toggleCamera,
      isActive: cameraEnabled
    },
    {
      activeTooltip: 'Выключить микрофон',
      notActiveTooltip: 'Включить микрофон',
      activeSrc: '/svg/disableMicrophone.svg',
      notActiveSrc: '/svg/enableMicrophone.svg',
      onClick: toggleMicro,
      isActive: microphoneEnabled
    }
  ]

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
     
      <Link href='/rooms'>
        <Tooltip title='Вернуться на страницу со списком комнат'>
          <IconButton >
            <img src='/svg/back.svg' width={48} height={48} alt='Return to main menu'/>     
          </IconButton>
        </Tooltip>
      </Link>
      <Box sx={{display: 'flex'}}>
        {ToggleButtons.map((b) => 
          <ActionButton 
            key={b.activeTooltip}
            activeTooltip={b.activeTooltip}
            notActiveTooltip={b.notActiveTooltip}
            activeSrc={b.activeSrc}
            notActiveSrc={b.notActiveSrc}
            onClick={b.onClick}
            isActive={b.isActive}
          />
        )}
      </Box>
    </Box>
  )
}
