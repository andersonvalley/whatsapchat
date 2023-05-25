import { useEffect } from 'react'
import { fetchDeleteNotificationMessage, fetchMessageNotification } from '../store/slices/contactsSlice'
import { useAppDispatch, useAppSelector } from './useRedux'

export const useNotification = (ms: number) => {
  const dispatch = useAppDispatch()
  const { receiptId } = useAppSelector(store => store.contact)

  useEffect(() => {
    setInterval(() => {
      dispatch(fetchMessageNotification())
    }, ms)
  }, [dispatch, ms])

  useEffect(() => {
    if (receiptId) {
      dispatch(fetchDeleteNotificationMessage(receiptId))
    }
  }, [dispatch, receiptId])
}
