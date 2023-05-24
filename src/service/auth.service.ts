import { instance } from '../api'
import { authInterface } from '../interface/auth.interface'

export class authService {
  static async login(data: authInterface) {
    const response = await instance(`/waInstance${data.id}/getStatusInstance/${data.api}`)
    console.log(response)
  }
}
