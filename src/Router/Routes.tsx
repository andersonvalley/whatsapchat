import { Navigate } from 'react-router-dom'
import { ChatPage } from '../pages/ChatPage/ChatPage'
import { MainPage } from '../pages/MainPage/MainPage'

export const publicRoutes = [
  { path: '/', element: <MainPage /> },
  { path: '*', element: <Navigate to="/" /> },
]

export const privateRoutes = [
  { path: '/chat', element: <ChatPage /> },
  { path: '*', element: <Navigate to="/chat" /> },
]
