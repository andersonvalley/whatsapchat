import { FC } from 'react'
import { GrAdd } from 'react-icons/gr'

interface Props {
  sendMessageHandler: (e: React.FormEvent) => void
  messageValue: string
  setMessageValue: (type: string) => void
}

export const SendMessage: FC<Props> = ({ sendMessageHandler, messageValue, setMessageValue }) => {
  return (
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
  )
}
