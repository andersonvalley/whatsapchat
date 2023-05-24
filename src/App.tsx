import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router/AppRouter'

import './styles/index.scss'

function App() {
  return (
    <BrowserRouter>
      <main className="main">
        <div className="container">
          <AppRouter />
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App
