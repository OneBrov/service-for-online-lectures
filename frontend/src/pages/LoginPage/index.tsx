import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { AuthContext } from '../../App'
import { BasicTabs } from '../../components/BasicTabs'
import AuthService, { SuccessAuthResponse } from '../../utils/api/services/AuthService'

interface TemplateAuthProps  {
    isRegistration: boolean
}

export const TemplateAuth:React.FC<TemplateAuthProps> = ({
  isRegistration
}) => {

  const authContext = React.useContext(AuthContext)

  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [fullName, setFullName] = React.useState<string>('')
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [successMessage, setSuccessMessage] = React.useState<string>('')

  const commit = async () => {
    try {
      setErrorMessage('')
      setSuccessMessage('')

      const { data } = isRegistration 
        ? await AuthService.registration(username, fullName, password)
        : await AuthService.login(username, password)

      const access_token = data.access_token
      localStorage.setItem('token', access_token)

      authContext.setIsAuth(true)
      
      setSuccessMessage(
        isRegistration 
          ? 'Вы успешно зарегистрированы' 
          : 'Вы успешно авторизированы'
      )
    } catch (e: any) {
      setErrorMessage(e?.response?.data.message || 'Сервер не отвечает!' )
    }
  }

  return (
    <Box 
      sx={{ 'p': 1, }} 
    >
      <DialogTitle> {isRegistration ? 'Регистрация' : 'Авторизация'} </DialogTitle>
      <DialogContent sx={{minHeight: 250}} >
        <DialogContentText>
          { isRegistration 
            ? 'Если у вас нет аккаунта, то вы можете зарегистрироваться здесь' 
            : 'Если у вас уже есть аккаунт, вы можете авторизироваться'
          }
        </DialogContentText>

        {isRegistration &&
          <TextField
            value={fullName}
            onChange={(e)=> setFullName(e.target.value)}
            autoFocus={isRegistration}
            margin="dense"
            id="fullName"
            name='fullName'
            autoComplete='name'
            label="Введите ваши имя и фамилию,"
            type="text"
            fullWidth
            variant="standard"
          />
        }

        <TextField
          autoFocus={!isRegistration}
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          margin="dense"
          id="name"
          label="Ваш логин"
          type="text"
          fullWidth
          variant="standard"
        />
        
        <TextField
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          margin="dense"
          id="password"
          label="Ваш пароль"
          type="password"
          fullWidth
          variant="standard"
        />
        <DialogContentText color={'error'}>{errorMessage}</DialogContentText>
        <DialogContentText color={'success.main'}>{successMessage} </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={commit}> 
          { isRegistration 
            ? 'Зарегистрироваться' 
            : 'Авторизироваться'
          }
        </Button>
      </DialogActions>
    </Box>
  )
}


const Registration = () => {
  return (
    <TemplateAuth 
      isRegistration
    />
  )
}

const Login = () => {
  return (
    <TemplateAuth 
      isRegistration={false}
    />
  )
}

interface LoginProps {
  open: boolean
  handleClose: ()=>void
}

export const LoginPage:React.FC<LoginProps> = ({
  open, handleClose
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth='xs'
    >
      <BasicTabs content={[
        {name: 'Авторизация', content: <Login />},
        {name: 'Регистрация', content: <Registration />},
      ]} />
    </Dialog>
  )
}
