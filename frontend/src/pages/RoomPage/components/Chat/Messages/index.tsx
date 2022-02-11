import { Stack, Divider, Paper, Typography, TextField, Button, Box } from '@mui/material'
import React from 'react'
import { MessageType } from '../../../../../utils/types/MessageType'

import styles from './Messages.module.scss' 

interface MessagesProps {
  messages: MessageType[] 
  onSendMessage: (m: string)=>void
}

export const Messages:React.FC<MessagesProps> = ({
  messages, 
  onSendMessage
}) => {
  const [message, setMessage] = React.useState<string>('')
  const lastMessage = React.useRef<null | HTMLDivElement>(null)
  
  //when last message appears, scroll into it
  React.useEffect(()=>{ 
    if (lastMessage.current ) {
      lastMessage.current.scrollIntoView({block: 'end', behavior: 'smooth'})
    }
  },[messages.length])

  const handleSendMessage = () => {
    onSendMessage(message)
    setMessage('')
  } 

  const handlePressEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }
 
  return (
    <Box sx={{ minHeight: '0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Stack
        height='100%'
        display="flex"
        flex="1"
        overflow="auto"
        direction="column"
        alignItems="stretch"
        divider={<Divider  flexItem />}
      >
        {messages?.map( ({name, text}, it) => 
          <Paper 
            className={styles.message} 
            ref={(it===(messages.length - 1)) ? lastMessage : null} 
            key={it} //Add id to messages
            sx={{ lineHeight: '1.2' }} 
          >
            <Typography 
              sx={{ wordBreak: 'break-word' }} 
              lineHeight="1.2" 
              color="primary"  
              variant="caption" 
              display="inline" 
            >
              {`${name}: `}
            </Typography>
            <Typography 
              lineHeight="1" 
              sx={{ wordBreak: 'break-word' }} 
              variant="caption" 
              display="inline"
            >
              {text}
            </Typography>
          </Paper>
        )}
      </Stack>
      <Paper className={styles.inputBox} elevation={5}  >
        <TextField 
          onKeyDown={handlePressEnter}
          onChange={(e)=>setMessage(e.target.value)} 
          onSubmit={handleSendMessage}
          value={message} 
          margin="dense" 
          label="Cообщение"
        /> 
        <Button 
          sx={{
            marginY: '15px'
          }}
          size="small"
          variant="contained" 
          onClick={handleSendMessage}
        >
          Отправить
        </Button>
      </Paper>
    </Box>
  )
}








