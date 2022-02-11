import React, { createContext } from 'react'
import { useParams } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { addMessage } from '../../../store/chatSlice'
import { addUser, removeUser } from '../../../store/usersSlice'
import { SocketUser, User } from '../../../utils/types/UserType'


const WebSocketContext = createContext<WSActions>({
  sendMessage: (m:string) => console.log('Send message not implemented!'),
  sendJoin: undefined
})

export { WebSocketContext }

interface WSActions {
  sendMessage: (m: string) => void
  sendJoin?: (WRtcId: string) => void
}

//maybe WebsocketChatProvider will be better
export const WebSocketProvider:React.FC = ({ children }) => {
  const { roomId } = useParams()
  const username = localStorage.getItem('username') || 'guest'

  const dispatch = useAppDispatch()
  //   const [socket, setSocket] = React.useState<Socket>()
  const [socket, setSocket] = React.useState<Socket>()

  // WS CONNECTION
  React.useEffect(()=>{
    setSocket(
      io(process.env.REACT_APP_WS_URL as string, { query: {username: username} })
    )
    return () => {socket?.disconnect()}
  },[])

  React.useEffect(()=>{
    if (socket && roomId !== undefined) {

      //WS EVENT LISTENERS
      socket.on('message', (msg) => {
        dispatch(addMessage(msg))
      })

      // Получение первоначального списка пользователей в комнате
      socket.on('sendUserList', (data: {users: SocketUser[]}) => {
        const { users } = data
        users.forEach(user => 
          dispatch(addUser(
            new User(user.username, user.socketId, user.RTCId)
          ))
        )
      })

      // Добавление нового пользователя, при его входе
      socket.on('enterTheRoom', (user: SocketUser) => {
        const enteredUser = new User(user.username, user.socketId, user.RTCId)
        dispatch(addUser(enteredUser))
      })

      socket.on('leftTheRoom', (user: SocketUser) => {
        const removedUser = new User(user.username, user.socketId)
        dispatch(removeUser(removedUser))
      })
      
    }
  },[socket, roomId])

  // WS ACTION CREATORS
  const sendMessage = (message: string) => {
    socket?.emit('msgToServer', message)
  }

  const sendJoin= (WRtcId: string) => {
    if (socket) {
      socket.emit('joinRoom', {roomId: roomId, RTCId: WRtcId})
      const me = new User(username, socket.id, WRtcId, true)
      dispatch(addUser(me))
    }
  }

  const ws: WSActions = {
    sendMessage: sendMessage,
    sendJoin: sendJoin
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}

