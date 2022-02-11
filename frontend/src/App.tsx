import React from 'react'
import { AppRouter } from './router'
import { Provider } from 'react-redux'
import store from './store'
import AuthService from './utils/api/services/AuthService'
import jwtDecode from 'jwt-decode'

interface AuthContextProps {
  isAuth: boolean
  setIsAuth: (value: boolean) => void,
  username: string
}

export const AuthContext = React.createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: () => console.log('setIsAuth not implemented!'),
  username: ''
})

export const App = () => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')

  React.useEffect(()=>{
    const token = localStorage.getItem('token')
    if (!token) return
    refreshOldToken()
  },[])

  React.useEffect(()=>{
    if (isAuth) {
      const token = localStorage.getItem('token')
      if (!token) return
      const { username } = jwtDecode(token) as any
      setName(username)
    } else if (name) {
      localStorage.removeItem('token')
      setName('')
    }
  },[isAuth])

  const refreshOldToken = async () => {
    console.log(localStorage.getItem('token'))

    const { data } = await AuthService.refresh()
    console.log(data);
    localStorage.setItem('token', data.access_token)
    setIsAuth(true)
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        username: name
      }}>
        <AppRouter />
      </AuthContext.Provider>
    </Provider>
  )
}