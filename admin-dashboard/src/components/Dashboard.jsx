import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Users from './Users'
import Orders from './Orders'
import './Dashboard.css'

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('orders') // 'users' veya 'orders'

  return (
    <div className="dashboard">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="dashboard-main">
        <Topbar onLogout={onLogout} />
        <div className="dashboard-content">
          {activePage === 'users' ? <Users /> : <Orders />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
