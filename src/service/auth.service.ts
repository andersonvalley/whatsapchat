import { instance } from '../api'
import { IAuth, IStatusAccount } from '../interface/auth.interface'

export class authService {
  static async checkStatusAccountAndLogin(authData: IAuth) {
    const { data } = await instance<IStatusAccount>(
      `/waInstance${authData.id}/getStatusInstance/${authData.api}`
    )
    return data
  }
}
