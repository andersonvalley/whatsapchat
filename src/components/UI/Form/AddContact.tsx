import { FC } from 'react'
import { GrAdd } from 'react-icons/gr'

interface IProps {
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputAddNumberValue: string
  addContactHandler: (e: React.FormEvent) => void
}

export const AddContact: FC<IProps> = ({ addContactHandler, inputAddNumberValue, inputChangeHandler }) => {
  return (
    <form onSubmit={addContactHandler} className="chat__add">
      <input
        value={inputAddNumberValue}
        onChange={inputChangeHandler}
        className="chat__input auth__input"
        type="text"
        placeholder="Начните новый чат"
        required
        minLength={8}
        maxLength={18}
      />
      <button className="btn chat__btn">
        <GrAdd />
      </button>
    </form>
  )
}
