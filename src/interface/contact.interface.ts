import { IMessage } from './message.interface'

export interface IMessageRequest {
  chatId: string
  message: string
}

export interface IMessageResponse {
  idMessage: string
}
export interface IMessageNotification {
  receiptId: string
  body: any
}
export interface IDeleteMessageNotification {
  result: boolean
}

export interface IContacts {
  phone: string
  messages: IMessage[]
}
