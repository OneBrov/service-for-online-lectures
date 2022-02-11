import React from 'react'
import { WebSocketContext, WebSocketProvider } from '../WebSocketProvider'
import { WebRTCContext, WebRTCProvider } from '../WebRTCProvider'
import { selectMe } from '../../../../store/usersSlice'

const AddMe = () => {
  const rtc = React.useContext(WebRTCContext)
  const ws  = React.useContext(WebSocketContext)
  const me = selectMe()
  React.useEffect(()=>{

    if (ws.sendJoin && rtc?.session && !me) {
      ws.sendJoin(rtc.session.connection.connectionId)      
    }
    
  },[ws.sendJoin, rtc?.session])
  return <></>
}
  

export const RoomProvider:React.FC = ({
  children
}) => {
  return (
    <WebRTCProvider>
      <WebSocketProvider 
      >
        <AddMe />
        {children}
      </WebSocketProvider>
    </WebRTCProvider>)
}

