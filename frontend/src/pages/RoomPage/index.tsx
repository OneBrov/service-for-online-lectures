import { Box } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { addMessage } from '../../store/chatSlice'
import { MessageType } from '../../utils/types/MessageType'
import { GuestAuthPage } from '../GuestAuthPage'
import { WebSocketProvider, WebSocketContext } from './providers/WebSocketProvider'
import { Chat } from './components/Chat'
import { MainContent } from './components/MainContent'
import styles from './RoomPage.module.css'
import { WebRTCProvider } from './providers/WebRTCProvider'
import { RoomProvider } from './providers/RoomProvider'
import RoomsService from '../../utils/api/services/RoomsService'
import { useParams } from 'react-router-dom'
import { NotFoundPage } from '../NotFoundPage'

export const RoomPage:React.FC = () => {
  const [userIsAuth, setUserIsAuth] = React.useState(false)
  const [isRoomExist, setIsRoomExist] = React.useState<boolean>(true)
  const { roomId } = useParams()

  React.useEffect(() => {
    checkRoomExist()
  }, [])

  const checkRoomExist = async () => {
    try {
      const { data } = await RoomsService.getOneRoom(roomId || '22')
      if (!data)  {
        setIsRoomExist(false) 
      }

    } catch (e:any) {
     
      setIsRoomExist(false)
    }
  }

  if (!isRoomExist) {
    return <NotFoundPage />
  }

  if (!userIsAuth) {
    return <GuestAuthPage setCompleted={setUserIsAuth}/>
  }

  return (
    <RoomProvider>
      <Box display="flex" height="100vh" width={'100vw'} overflow={'hidden'} >
        <Box 
          className={styles.backgroundLogo}
          overflow={'auto'} 
          display={'flex'} 
          flexDirection={'column'} 
          flex='1 1 1px'  
          padding='20px'
        >
          <MainContent />
        </Box>
        <Box display='flex' flexDirection={'column'} flex='0 0 1px' minWidth='350px'>
          <Chat />
        </Box>      
      </Box>
    </RoomProvider>
  )
}
