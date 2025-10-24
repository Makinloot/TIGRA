import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import { CopartLocationsProvider } from './context/copartLocationsContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CopartLocationsProvider>
      <App />
    </CopartLocationsProvider>
  </StrictMode>,
)
