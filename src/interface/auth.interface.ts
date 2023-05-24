export interface IAuth {
  id: string | null
  api: string | null
}

export interface IStatusAccount {
  statusInstance: null | undefined | 'online' | 'offline'
}
