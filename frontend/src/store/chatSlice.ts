import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { MessageType } from '../utils/types/MessageType'

interface ChatState {
  messages: MessageType[]
}

const initialState: ChatState = {
  messages: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState, 
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages = [...state.messages, action.payload]
    }
  }
})

//actions
export const { addMessage } = chatSlice.actions
//selectors
export const selectMessages = (state: RootState) => state.chat.messages

export default chatSlice.reducer