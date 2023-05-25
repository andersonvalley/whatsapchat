export interface IAuth {
  id: string
  api: string
}

export interface IStatusAccount {
  statusInstance: 'online' | 'offline' | null
}
