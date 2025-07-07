import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NoticiasProvider } from './Context/NoticiasContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NoticiasProvider>
      <App />
    </NoticiasProvider>
  </StrictMode>,
)
