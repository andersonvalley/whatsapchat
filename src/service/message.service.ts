import { instance } from '../api'
import { IMessageRequest, IMessageResponse } from '../interface/contact.interface'

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
}
