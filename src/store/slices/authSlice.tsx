import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IAuth, IStatusAccount } from '../../interface/auth.interface'
import { authService } from '../../service/auth.service'
import { RootState } from '../store'

interface IState extends IStatusAccount {
  loading: boolean
  error: string | undefined
}

const initialState: IState = {
  statusInstance: null,
  error: '',
  loading: false,
}

export const fetchCheckAccountStatus = createAsyncThunk('auth/checkAccount', async (data: IAuth) => {
  const response = await authService.checkStatusAccountAndLogin(data)
  return response
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.statusInstance = null

      localStorage.removeItem('api')
      localStorage.removeItem('id')
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCheckAccountStatus.pending, state => {
        state.error = ''
        state.loading = true
      })
      .addCase(fetchCheckAccountStatus.fulfilled, (state, { payload }) => {
        state.statusInstance = payload?.statusInstance
        state.loading = false
      })
      .addCase(fetchCheckAccountStatus.rejected, (state, { error }) => {
        state.error = error?.message
        state.loading = false
      })
  },
})

export const { logout } = authSlice.actions
export const selectStatusAccount = (state: RootState) => state.auth
export default authSlice.reducer
