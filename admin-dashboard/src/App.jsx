import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { useTheme } from './hooks/useTheme'
import {
  getToken,
  getStoredUser,
  clearSession,
  UNAUTHORIZED_EVENT
} from './services/api'
import './App.css'

function App() {
  // Oturum: backend'in verdiği token'ın varlığına göre belirlenir
  const [user, setUser] = useState(() => (getToken() ? getStoredUser() || {} : null))
  const { theme, toggleTheme } = useTheme()

  // API 401 dönerse (token süresi dolmuş vb.) otomatik çıkış
  useEffect(() => {
    const onUnauthorized = () => setUser(null)
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
  }, [])

  const handleLogin = loggedInUser => setUser(loggedInUser)

  const handleLogout = () => {
    clearSession()
    setUser(null)
  }

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
    </div>
  )
}

export default App
