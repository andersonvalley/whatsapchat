import React, { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { GrAdd } from 'react-icons/gr'
import defaultAvatar from '../../assets/defaultAvatar.jpg'
import { useFormatNumber } from '../../hooks/useFormatPhone'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { messageService } from '../../service/message.service'
import { logout } from '../../store/slices/authSlice'
import { addContact } from '../../store/slices/contactsSlice'
import { AddContact } from '../UI/Form/AddContact'
import { Modal } from '../UI/Modal/Modal'
import './Chat.scss'

export const Chat = () => {
  const dispatch = useAppDispatch()
  const { contacts } = useAppSelector(store => store.contact)
  const { messages } = useAppSelector(store => store.message)
  const formatNumber = useFormatNumber()
  const [inputAddNumberValue, setInputAddNumberValue] = useState('')
  const [messageValue, setMessageValue] = useState('')
  const [selectedContact, setSelectedContact] = useState('')

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /[^0-9,-,+]/g
    e.preventDefault()
    setInputAddNumberValue(e.target.value.replace(reg, ''))
  }

  const addContactHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const contactData = {
      phone: inputAddNumberValue,
      message: '',
    }
    dispatch(addContact(contactData))
    setInputAddNumberValue('')
  }

  const selectContact = (phone: string) => {
    setSelectedContact(phone)
  }

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      chatId: '79992123679@c.us',
      message: 'yes',
    }
    messageService.sendMessage(data)
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className="chat">
      <div className="chat__inner">
        <div className="chat__contacts">
          <div className="chat__controls chat__contacts-controls">
            <AddContact
              addContactHandler={addContactHandler}
              inputAddNumberValue={inputAddNumberValue}
              inputChangeHandler={inputChangeHandler}
            />
          </div>

          <div className="mobile">
            <button className="btn chat__btn chat__btn-mobile">
              <GrAdd />
            </button>
          </div>

          <Modal>
            <AddContact
              addContactHandler={addContactHandler}
              inputAddNumberValue={inputAddNumberValue}
              inputChangeHandler={inputChangeHandler}
            />
          </Modal>

          <div className="contacts">
            <ul className="contacts__list">
              {!contacts.length && <li className="contacts__empty">Контактов нет, добавьте один</li>}
              {contacts.map(contact => {
                return (
                  <li
                    onClick={() => selectContact(contact.phone)}
                    key={contact.phone}
                    className="contacts__item"
                  >
                    <div className="contacts__avatar avatar">
                      <img className="contacts__avatar-img" src={defaultAvatar} alt="avatar" />
                    </div>
                    <div className="contacts__inner">
                      <div className="contacts__title">{contact.phone}</div>
                      <p className="contacts__lastMessage">{contact.message}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="chat__conversation">
          <div className="chat__controls chat__conversation-controls">
            {selectedContact && (
              <div className="flex">
                <div className="chat__avatar avatar">
                  <img src={defaultAvatar} alt="avatar" />
                </div>
                <div className="chat__phone">{formatNumber('+' + selectedContact)}</div>
              </div>
            )}

            <button onClick={logoutHandler} className="logout btn chat__btn">
              <BiLogOut />
            </button>
          </div>

          <div className="conversation">
            <ul className="conversation__message">
              {!messages.length && <li className="contacts__empty">Сообщений еще нет</li>}
              {messages.map(message => {
                return (
                  <li key={message.message} className="message">
                    fsfsf
                  </li>
                )
              })}
            </ul>
            <div className="chat__controls conversation__controls">
              <form onSubmit={sendMessageHandler} className="chat__add">
                <input
                  value={messageValue}
                  onChange={e => setMessageValue(e.target.value)}
                  className="chat__input auth__input"
                  type="text"
                  placeholder="Напишите сообщение"
                  required
                />
                <button className="btn chat__btn">
                  <GrAdd />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
