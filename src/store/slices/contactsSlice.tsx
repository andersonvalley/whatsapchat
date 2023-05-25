import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IContacts, IMessageRequest } from '../../interface/contact.interface'
import { messageService } from '../../service/message.service'
import { RootState } from '../store'

interface IProps {
  contacts: IContacts[]
  receiptId: string
}

const initialState: IProps = {
  contacts: [],
  receiptId: '',
}

export const fetchMessageNotification = createAsyncThunk('message/notification', async () => {
  const response = await messageService.notificationMessage()
  return response
})

export const fetchSendMessage = createAsyncThunk('message/send', async (data: IMessageRequest) => {
  const response = await messageService.sendMessage(data)
  return response
})

export const fetchDeleteNotificationMessage = createAsyncThunk(
  'message/deleteNotification',
  async (receiptId: string) => {
    const response = await messageService.deleteNotificationMessage(receiptId)
    return response
  }
)

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
      const find = state.contacts.find(item => item.phone === payload?.phone)
      if (find) {
        state.contacts.filter(item => item.phone === find.phone && item.messages.push(payload.message))
        localStorage.setItem('contacts', JSON.stringify(state.contacts))
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMessageNotification.fulfilled, (state, { payload }) => {
        if (!payload) return

        state.receiptId = payload?.receiptId

        if (!payload?.body.senderData) return

        const phone = '+' + payload?.body.senderData?.chatId.split('@')[0]

        if (!payload?.body?.messageData) return

        const messageRecive = payload?.body?.messageData?.textMessageData?.textMessage

        if (!messageRecive) return

        const message = {
          message: messageRecive,
          replay: true,
        }

        state.contacts = state.contacts.map(item => {
          if (item.phone === phone) {
            item.messages.push(message)
          } else {
            const obj = {
              phone: phone,
              messages: [message],
            }

            state.contacts.push(obj)
          }

          return item
        })

        localStorage.setItem('contacts', JSON.stringify(state.contacts))
      })

      .addCase(fetchDeleteNotificationMessage.fulfilled, state => {
        state.receiptId = ''
        localStorage.setItem('contacts', JSON.stringify(state.contacts))
      })
  },
})

export const { addContact, addMessage } = contactSlice.actions
export const selectContact = (state: RootState) => state.contact
export default contactSlice.reducer
