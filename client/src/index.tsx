import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { RoomProvider } from './context/RoomContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <RoomProvider>
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </RoomProvider>
  </BrowserRouter>
)
