import React, { useState } from 'react'
import { authInterface } from '../../interface/auth.interface'
import { authService } from '../../service/auth.service'
import './Auth.scss'

export const AuthForm = () => {
  const [values, setValues] = useState<authInterface>({
    id: '',
    api: '',
  })
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()

    await authService.login(values)
  }

  return (
    <div className="auth">
      <form onSubmit={submitHandler} className="auth__form">
        <h1 className="auth__title">Вход</h1>
        <div className="auth__group">
          <label>
            <input
              value={values.id}
              onChange={e => setValues({ ...values, id: e.target.value })}
              className="auth__input"
              type="text"
              placeholder="Введите idInstance"
            />
          </label>
        </div>
        <div className="input__group">
          <label>
            <input
              value={values.api}
              onChange={e => setValues({ ...values, api: e.target.value })}
              className="auth__input"
              type="text"
              placeholder="Введите apiTokenInstance"
            />
          </label>
        </div>
        <button className="auth__btn">Войти</button>
      </form>
    </div>
  )
}
