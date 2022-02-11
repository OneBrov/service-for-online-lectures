import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { useAppSelector } from '../hooks/reduxHooks'
import { MessageType } from '../utils/types/MessageType'
import { UserType } from '../utils/types/UserType'



interface UsersState {
  users: UserType[],
}

const initialState: UsersState = {
  users: []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState, 
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.users = [...state.users, action.payload]
    },  
    removeUser: (state, action: PayloadAction<UserType>) => {
      state.users = [
        ...state.users.filter(user => user.socketId!=action.payload.socketId )
      ]
    },
    setIsSpeak: (state, action: PayloadAction<{RTCId: string, isSpeak: boolean}>) => {
      state.users = state.users.map(user=> {
        if (user.RTCId === action.payload.RTCId) {
          user.isSpeak = action.payload.isSpeak
          return user
        }
        return user
      })
    }, 
    changeUserRTCProperty: (state, action: PayloadAction<{
      propertyName: 'isSpeak' | 'isMicroOn'| 'isCameraOn', 
      RTCId: string, 
      isTrue: boolean
    }>) => {
      state.users = state.users.map(user=> {  
        if (user.RTCId === action.payload.RTCId) {
          user[action.payload.propertyName] = action.payload.isTrue
          return user
        }
        return user
      })
    },
  },
})

//actions
export const { addUser, removeUser, setIsSpeak, changeUserRTCProperty } = usersSlice.actions
//selectors
export const selectUsers = (state: RootState) => state.users

export const selectMe = () => useAppSelector(state => state.users.users.find(user=> user.isMe))

export default usersSlice.reducer