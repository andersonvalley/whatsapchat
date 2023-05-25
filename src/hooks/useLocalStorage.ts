import { useEffect } from 'react'
import { IContacts } from '../interface/contact.interface'
import { addContact } from '../store/slices/contactsSlice'
import { useAppDispatch } from './useRedux'

export const useLocalStorage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getContacts = localStorage.getItem('contacts')
    const contacts: IContacts[] = getContacts ? JSON.parse(getContacts) : []

    contacts.forEach(contact => {
      if (!contact) return
      dispatch(addContact(contact))
    })
  }, [dispatch])
}
