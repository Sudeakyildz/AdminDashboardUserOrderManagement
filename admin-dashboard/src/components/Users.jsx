import { useState, useMemo } from 'react'
import { fetchUsers } from '../services/api'
import { useApi } from '../hooks/useApi'
import { useTableData } from '../hooks/useTableData'
import { formatDate } from '../utils/helpers'
import { Loading, ErrorState, SearchBox, Pagination } from './ui'
import './Users.css'

const SEARCH_KEYS = ['name', 'email', 'phone']

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Ad Soyad' },
  { key: 'email', label: 'E-posta' },
  { key: 'phone', label: 'Telefon' },
  { key: 'joinDate', label: 'Kayıt Tarihi' },
  { key: 'status', label: 'Durum' }
]

function Users() {
  const { data, loading, error, reload } = useApi(fetchUsers)
  const [statusFilter, setStatusFilter] = useState('all')

  const users = useMemo(() => {
    const all = data || []
    return statusFilter === 'all' ? all : all.filter(u => u.status === statusFilter)
  }, [data, statusFilter])

  const table = useTableData(users, {
    searchKeys: SEARCH_KEYS,
    initialSort: { key: 'id', dir: 'asc' },
    pageSize: 6
  })

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Kullanıcı Yönetimi</h1>
        <p>Toplam {data ? data.length : 0} kullanıcı</p>
      </div>

      {loading && <Loading />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && (
        <>
          <div className="toolbar">
            <SearchBox
              value={table.search}
              onChange={table.setSearch}
              placeholder="İsim, e-posta veya telefon ara..."
            />
            <select
              className="select-control"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              aria-label="Duruma göre filtrele"
            >
              <option value="all">Tüm durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>

          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  {COLUMNS.map(col => {
                    const active = table.sort.key === col.key
                    return (
                      <th
                        key={col.key}
                        className="sortable"
                        aria-sort={
                          active
                            ? table.sort.dir === 'asc'
                              ? 'ascending'
                              : 'descending'
                            : 'none'
                        }
                      >
                        <button onClick={() => table.toggleSort(col.key)}>
                          {col.label}
                          <span className="sort-arrow">
                            {active ? (table.sort.dir === 'asc' ? '▲' : '▼') : ''}
                          </span>
                        </button>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {table.pageItems.map(user => (
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
                {table.totalCount === 0 && (
                  <tr>
                    <td colSpan={COLUMNS.length} className="empty-cell">
                      Aramanızla eşleşen kullanıcı bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={table.page}
            totalPages={table.totalPages}
            totalCount={table.totalCount}
            onChange={table.setPage}
          />
        </>
      )}
    </div>
  )
}

export default Users
