import { useEffect, useMemo } from 'react'
import { fetchCheckAccountStatus } from '../store/slices/authSlice'
import { useAppDispatch } from './useRedux'

export const useCheckAuth = () => {
  const dispatch = useAppDispatch()
  const data = useMemo(() => {
    return { id: localStorage.getItem('id'), api: localStorage.getItem('api') }
  }, [])

  useEffect(() => {
    if (!data.id && !data.api) return

    dispatch(fetchCheckAccountStatus(data))
  }, [dispatch, data])
}
