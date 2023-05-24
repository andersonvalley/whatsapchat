import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './Routes'

export const AppRouter = () => {
  const isAuth = false

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
