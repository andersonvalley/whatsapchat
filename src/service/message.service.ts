import { instance } from '../api'
import {
  IDeleteMessageNotification,
  IMessageNotification,
  IMessageRequest,
  IMessageResponse,
} from '../interface/contact.interface'

export class messageService {
  static async sendMessage(mesageData: IMessageRequest) {
    const api = localStorage.getItem('api')
    const id = localStorage.getItem('id')

    const { data } = await instance<IMessageResponse>(`/waInstance${id}/sendMessage/${api}`, {
      method: 'POST',
      data: mesageData,
    })
    return data
  }

  static async notificationMessage() {
    const api = localStorage.getItem('api')
    const id = localStorage.getItem('id')

    const { data } = await instance<IMessageNotification>(`/waInstance${id}/receiveNotification/${api}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    return data
  }

  static async deleteNotificationMessage(receiptId: string) {
    const api = localStorage.getItem('api')
    const id = localStorage.getItem('id')

    const { data } = await instance<IDeleteMessageNotification>(
      `/waInstance${id}/deleteNotification/${api}/${receiptId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
    return data
  }
}
