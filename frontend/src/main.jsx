import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { ContentProvider } from './Context/ContentContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
