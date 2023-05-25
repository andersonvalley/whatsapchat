import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import contactSlice from './slices/contactsSlice'
import messageSlice from './slices/messageSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    contact: contactSlice,
    message: messageSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
