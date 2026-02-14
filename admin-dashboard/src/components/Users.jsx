import { useState } from 'react'
import { fakeUsers } from '../utils/data'
import { formatDate } from '../utils/helpers'
import './Users.css'

function Users() {
  const [users] = useState(fakeUsers)

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Kullanıcı Yönetimi</h1>
        <p>Toplam {users.length} kullanıcı</p>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad Soyad</th>
              <th>E-posta</th>
              <th>Telefon</th>
              <th>Kayıt Tarihi</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td className="user-name">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{formatDate(user.joinDate)}</td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
