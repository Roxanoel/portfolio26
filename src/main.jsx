import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/open-sauce-two/400.css'
import '@fontsource/open-sauce-two/600.css'
import '@fontsource/open-sauce-two/700.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
