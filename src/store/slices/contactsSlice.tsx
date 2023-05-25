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
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    addMessage(state, { payload }) {
      const find = state.contacts.find(item => item.phone === payload.phone)
      console.log(find)
      if (find) {
        state.contacts.filter(item => item.phone === find.phone && item.messages.push(payload.message))
        localStorage.setItem('contacts', JSON.stringify(state.contacts))
      }
    },
  },
})

export const { addContact, addMessage } = contactSlice.actions
export const selectContact = (state: RootState) => state.contact
export default contactSlice.reducer
