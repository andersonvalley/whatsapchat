import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { IAuth } from '../../interface/auth.interface'
import { fetchCheckAccountStatus } from '../../store/slices/authSlice'
import './Auth.scss'

export const AuthForm = () => {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(store => store.auth)

  const [values, setValues] = useState<IAuth>({
    id: '1101824481',
    api: 'e6da1302feb149be846102c7bff73397c8de51496e3f4c21ae',
  })
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(fetchCheckAccountStatus(values))

    localStorage.setItem('id', values.id)
    localStorage.setItem('api', values.api)
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
              required
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
              required
            />
          </label>
        </div>
        <button className="auth__btn">{loading ? 'Загрузка...' : 'Войти'}</button>

        <span className="auth__error">{error && 'Ошибка в данных авторизации'}</span>
      </form>
    </div>
  )
}
