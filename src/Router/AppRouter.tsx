import { Route, Routes } from 'react-router-dom'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { useAppSelector } from '../hooks/useRedux'
import { privateRoutes, publicRoutes } from './Routes'

export const AppRouter = () => {
  const { statusInstance, loading } = useAppSelector(store => store.auth)
  useCheckAuth()
  const isAuth = statusInstance === 'offline' || statusInstance === 'online'

  if (loading) {
    return (
      <div className="loading">
        <p className="loading__text">Загрузка...</p>
      </div>
    )
  }

  return (
    <Routes>
      {isAuth
        ? privateRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element}></Route>
          ))
        : publicRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element}></Route>
          ))}
    </Routes>
  )
}
