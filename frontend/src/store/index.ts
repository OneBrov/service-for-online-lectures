import { AnyAction, applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
import  chatSlice  from './chatSlice'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import usersSlice from './usersSlice'

const store = configureStore({
  reducer: {
    chat: chatSlice,
    users: usersSlice
  },
  middleware: [thunkMiddleware],
}) 

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
