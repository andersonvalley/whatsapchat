import { useEffect, useMemo } from 'react'
import { fetchCheckAccountStatus } from '../store/slices/authSlice'
import { useAppDispatch } from './useRedux'

export const useCheckAuth = () => {
  const dispatch = useAppDispatch()
  const data = useMemo(() => {
    const api = localStorage.getItem('api')
    const id = localStorage.getItem('id')

    return {
      id: id ? id : '',
      api: api ? api : '',
    }
  }, [])

  useEffect(() => {
    if (!data.id && !data.api) return

    dispatch(fetchCheckAccountStatus(data))
  }, [dispatch, data])
}
