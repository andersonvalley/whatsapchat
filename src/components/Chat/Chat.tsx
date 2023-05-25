import React, { useState } from 'react'

import { useFormatNumber } from '../../hooks/useFormatPhone'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNotification } from '../../hooks/useNotification'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { logout } from '../../store/slices/authSlice'
import { addContact, addMessage, fetchSendMessage } from '../../store/slices/contactsSlice'
import { Contact } from '../Contact/Contact'
import { AddContact } from '../UI/Form/AddContact'
import { SendMessage } from '../UI/Form/SendMessage'
import { Modal } from '../UI/Modal/Modal'

import { BiLogOut } from 'react-icons/bi'
import { GrAdd } from 'react-icons/gr'
import defaultAvatar from '../../assets/defaultAvatar.jpg'

import './Chat.scss'

export const Chat = () => {
  const dispatch = useAppDispatch()
  const { contacts } = useAppSelector(store => store.contact)
  const [inputAddNumberValue, setInputAddNumberValue] = useState('')
  const [messageValue, setMessageValue] = useState('')
  const [selectedContact, setSelectedContact] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const formatNumber = useFormatNumber()
  useLocalStorage()
  useNotification(5000)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /[^0-9,-,+]/g
    e.preventDefault()
    setInputAddNumberValue(e.target.value.replace(reg, ''))
  }

  const addContactHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const contactData = {
      phone: inputAddNumberValue,
      messages: [],
    }
    dispatch(addContact(contactData))
    setInputAddNumberValue('')
    setOpenModal(false)
  }

  const selectContact = (phone: string) => {
    setSelectedContact(phone)
  }

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      chatId: selectedContact.slice(1) + '@c.us',
      message: messageValue,
    }

    dispatch(fetchSendMessage(data))

    const dataMessage = {
      message: {
        message: messageValue,
        replay: false,
      },
      phone: selectedContact,
    }
    dispatch(addMessage(dataMessage))
    setMessageValue('')
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
            <button onClick={() => setOpenModal(true)} className="btn chat__btn chat__btn-mobile">
              <GrAdd />
            </button>
          </div>

          <Modal setOpenModal={setOpenModal} openModal={openModal}>
            <AddContact
              addContactHandler={addContactHandler}
              inputAddNumberValue={inputAddNumberValue}
              inputChangeHandler={inputChangeHandler}
            />
          </Modal>

          <div className="contacts">
            <ul className="contacts__list">
              {!contacts.length && (
                <li className="contacts__empty contacts__empty-mob">Контактов нет, добавьте один</li>
              )}
              {contacts.map(contact => {
                return <Contact key={contact.phone} selectContact={selectContact} contact={contact} />
              })}
            </ul>
          </div>
        </div>

        <div className="chat__conversation">
          <div
            className={
              selectedContact
                ? 'chat__controls chat__conversation-controls'
                : 'chat__controls chat__conversation-controls chat__controls-end'
            }
          >
            {selectedContact && (
              <div className="flex">
                <div className="chat__avatar avatar">
                  <img src={defaultAvatar} alt="avatar" />
                </div>
                <div className="chat__phone">{formatNumber(selectedContact)}</div>
              </div>
            )}

            <button onClick={() => dispatch(logout())} className="logout btn chat__btn">
              <BiLogOut />
            </button>
          </div>

          <div className="conversation">
            <ul className="conversation__message">
              {!contacts.length && <li className="contacts__empty conversation__empty">Сообщений еще нет</li>}
              {selectedContact &&
                contacts[contacts.findIndex(item => item.phone === selectedContact)].messages.map(
                  (message, index) => {
                    return (
                      <li key={index} className={message.replay ? 'message message__replay' : 'message'}>
                        {message.message}
                      </li>
                    )
                  }
                )}
            </ul>
            {selectedContact && (
              <div className="chat__controls conversation__controls">
                <SendMessage
                  sendMessageHandler={sendMessageHandler}
                  messageValue={messageValue}
                  setMessageValue={setMessageValue}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
