import { useState } from 'react'
import './Topbar.css'

function Topbar({ onLogout }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <h3>Admin Panel</h3>
        </div>
        
        <div className="topbar-right">
          <div className="user-menu">
            <button 
              className="user-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className="user-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span>Admin</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className={showMenu ? 'rotate' : ''}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showMenu && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={onLogout}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
