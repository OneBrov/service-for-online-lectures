import { Paper } from '@mui/material'
import React from 'react'
import { BasicTabs } from '../../../../components/BasicTabs'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { MessageType } from '../../../../utils/types/MessageType'
import { WebSocketContext } from '../../providers/WebSocketProvider'
import styles from './Chat.module.scss'
import { Messages } from './Messages'
import { Participants } from './Participants'


interface ChatProps {
    className?: string
}

export const Chat:React.FC<ChatProps> =() => {
  const WS = React.useContext(WebSocketContext)
  const users = useAppSelector(state => state.users.users)
  const messages = useAppSelector(state=>state.chat.messages)

  return (
    <Paper sx={{
      width: '350px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
    }}>
      <BasicTabs content={[
        { 
          name: 'Чат', 
          content: <Messages messages={messages} onSendMessage={WS.sendMessage} /> 
        },
        { 
          name: 'Участники', 
          content: <Participants users={users} /> 
        },
      ]} />
    </Paper>   
  )
}


