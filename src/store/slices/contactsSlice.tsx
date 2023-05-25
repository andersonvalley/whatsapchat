import { createSlice } from '@reduxjs/toolkit'

import { IContacts } from '../../interface/contact.interface'
import { RootState } from '../store'

interface IProps {
  contacts: IContacts[]
}

const initialState: IProps = {
  contacts: [],
}

export const contactSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addContact(state, { payload }) {
      if (state.contacts.find(item => item.phone === payload.phone)) return
      state.contacts.push(payload)
    },
  },
})

export const { addContact } = contactSlice.actions
export const selectContact = (state: RootState) => state.contact
export default contactSlice.reducer
