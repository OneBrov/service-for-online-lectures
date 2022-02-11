import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import React, { ChangeEventHandler } from 'react'
import UsersService from '../../../../../utils/api/services/RoomsService'
import { ModalRoomLink } from './ModalRoomLink'

interface ModalRoomCreationProps {
    onClose: () => void,
    isOpen: boolean
}





export const ModalRoomCreation:React.FC<ModalRoomCreationProps> = ({
  onClose, isOpen
}) => {

  const [roomName, setRoomName] = React.useState<string>('')
  const [subject, setSubject] = React.useState<string>('')
  const [submitMessage, setSubmitMessage] = React.useState<string>('')
  const [roomId, setRoomId] = React.useState<string>('')
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  React.useEffect(() => {
    if (errorMessage.length > 0) {
      setErrorMessage('')
    }
  }, [roomName])

  const changeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value)
  }

  const changeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const { data } = await UsersService.createRoom(roomName, subject)
      setSubmitMessage('Комната создана!')
      console.log(data)
  
      setRoomId(data)
    } catch (e:any) {
      setErrorMessage(e?.response?.data.message || 'Сервер не отвечает!' )
    }
   
  }

  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogTitle>
            Создание комнаты
      </DialogTitle>
      <DialogContent dividers={true} >

        <div>
          <DialogContentText>
            Введите имя комнаты. С его помощью люди смогут найти вашу комнату
          </DialogContentText>
          <TextField 
            value={roomName}
            onChange={changeRoomName}
            autoFocus
            label='Имя комнаты'
            fullWidth
            required
            margin='dense'
            error={errorMessage.length !== 0}
            helperText={errorMessage}
          />
        </div>
        <div>
          <DialogContentText>
            Введите название основного предмета, на тему которого будет проводиться собрание
          </DialogContentText>
          <TextField 
            value={subject}
            onChange={changeSubject}
            margin='dense'
            label='Название предмета'
            required
            fullWidth
          />
        </div>

        <ModalRoomLink 
          isOpen={!!roomId} 
          roomId={roomId}
        />

      </DialogContent>
      <DialogActions>
        <Typography>
          { submitMessage }
        </Typography>
        <Button onClick={handleSubmit}>
            Создать 
        </Button>
      </DialogActions>
    </Dialog>
  )
}
