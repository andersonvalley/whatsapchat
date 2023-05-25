import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import contactSlice from './slices/contactsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    contact: contactSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
