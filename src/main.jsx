import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './scenes/HomePage.jsx'

createRoot(document.getElementById('body')).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
