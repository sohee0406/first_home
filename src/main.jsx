import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import { AuthProvider } from './context/AuthContext'
import { HouseProvider } from './features/house/context/HouseContext'
import { ChecklistProvider } from './features/checklist/context/ChecklistContext'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HouseProvider>
        <ChecklistProvider>
          <App />
        </ChecklistProvider>
      </HouseProvider>
    </AuthProvider>
  </StrictMode>,
)
