import './Sidebar.css'

function Sidebar({ activePage, setActivePage, open }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activePage === 'overview' ? 'active' : ''}`}
          onClick={() => setActivePage('overview')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
          </svg>
          <span>Genel Bakış</span>
        </button>

        <button
          className={`nav-item ${activePage === 'orders' ? 'active' : ''}`}
          onClick={() => setActivePage('orders')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          <span>Siparişler</span>
        </button>

        <button
          className={`nav-item ${activePage === 'users' ? 'active' : ''}`}
          onClick={() => setActivePage('users')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
          <span>Kullanıcılar</span>
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
