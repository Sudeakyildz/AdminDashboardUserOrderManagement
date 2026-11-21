import { useState } from 'react'
import { login } from '../services/api'
import './Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // E-posta formatı kontrolü
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Şifre kuralları kontrolü
  const validatePassword = (password) => {
    // En az 8 karakter, en az bir büyük harf, bir küçük harf ve bir rakam
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
      errors: {
        minLength: !minLength,
        hasUpperCase: !hasUpperCase,
        hasLowerCase: !hasLowerCase,
        hasNumber: !hasNumber
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError('')

    // E-posta validasyonu
    if (!email.trim()) {
      setError('Lütfen e-posta adresinizi girin')
      return
    }

    if (!validateEmail(email)) {
      setError('Lütfen geçerli bir e-posta adresi girin (örn: kullanici@example.com)')
      return
    }

    // Şifre validasyonu
    if (!password.trim()) {
      setError('Lütfen şifrenizi girin')
      return
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      const errors = passwordValidation.errors
      const errorMessages = []
      
      if (errors.minLength) errorMessages.push('en az 8 karakter')
      if (errors.hasUpperCase) errorMessages.push('en az bir büyük harf')
      if (errors.hasLowerCase) errorMessages.push('en az bir küçük harf')
      if (errors.hasNumber) errorMessages.push('en az bir rakam')
      
      setError(`Şifre gereksinimleri: ${errorMessages.join(', ')} içermelidir`)
      return
    }

    // Tüm validasyonlar geçti, backend'e giriş isteği gönder
    setLoading(true)
    try {
      const data = await login(email.trim(), password)
      onLogin(data.user)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Dashboard</h1>
          <p>Kullanıcı & Sipariş Yönetimi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              E-posta Adresi
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="ornek@email.com"
              className={email && !validateEmail(email) ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Şifre
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Şifrenizi girin"
                className={password && !validatePassword(password).isValid ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {password && (
              <div className="password-requirements">
                <div className={`requirement ${password.length >= 8 ? 'valid' : ''}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {password.length >= 8 ? (
                      <polyline points="20 6 9 17 4 12" />
                    ) : (
                      <circle cx="12" cy="12" r="10" />
                    )}
                  </svg>
                  En az 8 karakter
                </div>
                <div className={`requirement ${/[A-Z]/.test(password) ? 'valid' : ''}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/[A-Z]/.test(password) ? (
                      <polyline points="20 6 9 17 4 12" />
                    ) : (
                      <circle cx="12" cy="12" r="10" />
                    )}
                  </svg>
                  Büyük harf (A-Z)
                </div>
                <div className={`requirement ${/[a-z]/.test(password) ? 'valid' : ''}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/[a-z]/.test(password) ? (
                      <polyline points="20 6 9 17 4 12" />
                    ) : (
                      <circle cx="12" cy="12" r="10" />
                    )}
                  </svg>
                  Küçük harf (a-z)
                </div>
                <div className={`requirement ${/[0-9]/.test(password) ? 'valid' : ''}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/[0-9]/.test(password) ? (
                      <polyline points="20 6 9 17 4 12" />
                    ) : (
                      <circle cx="12" cy="12" r="10" />
                    )}
                  </svg>
                  Rakam (0-9)
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            <span>{loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>
        <p className="login-hint">Demo hesap: admin@example.com / Admin1234</p>
      </div>
    </div>
  )
}

export default Login
