import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Overview from './Overview'
import Users from './Users'
import Orders from './Orders'
import './Dashboard.css'

const PAGES = {
  overview: Overview,
  orders: Orders,
  users: Users
}

function Dashboard({ user, onLogout, theme, onToggleTheme }) {
  const [activePage, setActivePage] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false) // mobil menü

  const Page = PAGES[activePage] || Overview

  const handleNavigate = page => {
    setActivePage(page)
    setSidebarOpen(false)
  }

  return (
    <div className="dashboard">
      <Sidebar
        activePage={activePage}
        setActivePage={handleNavigate}
        open={sidebarOpen}
      />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="dashboard-main">
        <Topbar
          user={user}
          onLogout={onLogout}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onMenuClick={() => setSidebarOpen(o => !o)}
        />
        <div className="dashboard-content">
          <Page />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
