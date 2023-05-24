import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router/AppRouter'

import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles/index.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className="main">
          <div className="container">
            <AppRouter />
          </div>
        </main>
      </BrowserRouter>
    </Provider>
  )
}

export default App
