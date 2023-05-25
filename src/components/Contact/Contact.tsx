import { FC } from 'react'
import defaultAvatar from '../../assets/defaultAvatar.jpg'
import { useFormatNumber } from '../../hooks/useFormatPhone'
import { IContacts } from '../../interface/contact.interface'

interface Props {
  contact: IContacts
  selectContact: (type: string) => void
}

export const Contact: FC<Props> = ({ contact, selectContact }) => {
  const formatNumber = useFormatNumber()

  return (
    <li onClick={() => selectContact(contact.phone)} key={contact.phone} className="contacts__item">
      <div className="contacts__avatar avatar">
        <img className="contacts__avatar-img" src={defaultAvatar} alt="avatar" />
      </div>
      <div className="contacts__inner">
        <div className="contacts__title">{formatNumber(contact.phone)}</div>
        <p className="contacts__lastMessage">{contact?.messages.at(-1)?.message}</p>
      </div>
    </li>
  )
}
