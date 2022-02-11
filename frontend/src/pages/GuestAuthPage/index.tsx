import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface GuestAuthProps {
  setCompleted: (b:boolean) => void
} 

export const GuestAuthPage:React.FC<GuestAuthProps> = ({
  setCompleted
}) => {
  const [username, setUsername] = React.useState<string>('')
  React.useEffect(() => {
    const storedName = localStorage.getItem('username')
    if (storedName) {
      setUsername(storedName)
    }
  },[])

  const handleCommit = () => {
    localStorage.setItem('username', username)
    setCompleted(true)
  }

  return (
    <Box 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        flex: '1 1 100%', 
        margin: 'auto'}}
    >
      <Dialog open={true}>
        <DialogTitle> Ваши имя и фамилия </DialogTitle>
        <DialogContent>
          <DialogContentText>
              Введите ваши имя и фамилию, которые будут отображаться другим пользователям
          </DialogContentText>
          <TextField
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Ваше имя и фамилия"
            type="full name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCommit}>Подтвердить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
