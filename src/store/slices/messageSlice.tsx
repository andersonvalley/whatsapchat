import { createSlice } from '@reduxjs/toolkit'
import { IMessage } from '../../interface/message.interface'
import { RootState } from '../store'

interface IProps {
  messages: IMessage[]
}

const initialState: IProps = {
  messages: [],
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload)
    },
  },
})

export const { addMessage } = messageSlice.actions
export const selectMessage = (state: RootState) => state.message
export default messageSlice.reducer
