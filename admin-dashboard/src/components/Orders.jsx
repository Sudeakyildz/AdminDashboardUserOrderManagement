import { useState, useMemo } from 'react'
import { fetchOrders } from '../services/api'
import { useApi } from '../hooks/useApi'
import { useTableData } from '../hooks/useTableData'
import { Loading, ErrorState, SearchBox, Pagination } from './ui'
import { 
  filterOrdersByStatus, 
  calculateTotalRevenue, 
  formatDate, 
  formatCurrency,
  getStatusColor,
  getStatusLabel
} from '../utils/helpers'
import './Orders.css'

const SEARCH_KEYS = ['id', 'customerName', 'customerEmail', 'product']

const SORT_OPTIONS = [
  { value: 'orderDate:desc', label: 'Tarih (yeni → eski)' },
  { value: 'orderDate:asc', label: 'Tarih (eski → yeni)' },
  { value: 'amount:desc', label: 'Tutar (yüksek → düşük)' },
  { value: 'amount:asc', label: 'Tutar (düşük → yüksek)' },
  { value: 'customerName:asc', label: 'Müşteri (A → Z)' }
]

const EMPTY = []

function Orders() {
  const { data, loading, error, reload } = useApi(fetchOrders)
  const orders = data || EMPTY
  const [filterStatus, setFilterStatus] = useState('all')

  // Siparişleri duruma göre filtreleme fonksiyonu kullanılıyor
  const filteredOrders = useMemo(() => {
    return filterOrdersByStatus(orders, filterStatus)
  }, [orders, filterStatus])

  const table = useTableData(filteredOrders, {
    searchKeys: SEARCH_KEYS,
    initialSort: { key: 'orderDate', dir: 'desc' },
    pageSize: 6
  })

  // Toplam gelir hesaplama fonksiyonu kullanılıyor
  const totalRevenue = useMemo(() => {
    return calculateTotalRevenue(orders)
  }, [orders])

  // Durum istatistikleri
  const statusStats = useMemo(() => {
    return {
      all: orders.length,
      active: orders.filter(o => o.status === 'active').length,
      pending: orders.filter(o => o.status === 'pending').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    }
  }, [orders])

  if (loading) {
    return (
      <div className="orders-page">
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="orders-page">
        <ErrorState message={error} onRetry={reload} />
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Sipariş Yönetimi</h1>
        <p>Toplam {orders.length} sipariş</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Toplam Gelir</p>
            <p className="stat-value">{formatCurrency(totalRevenue)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Aktif Siparişler</p>
            <p className="stat-value">{statusStats.active}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Bekleyen Siparişler</p>
            <p className="stat-value">{statusStats.pending}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cancelled">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">İptal Edilen</p>
            <p className="stat-value">{statusStats.cancelled}</p>
          </div>
        </div>
      </div>

      {/* Filtre Butonları */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          Tümü ({statusStats.all})
        </button>
        <button
          className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
          onClick={() => setFilterStatus('active')}
        >
          Aktif ({statusStats.active})
        </button>
        <button
          className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
          onClick={() => setFilterStatus('pending')}
        >
          Beklemede ({statusStats.pending})
        </button>
        <button
          className={`filter-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilterStatus('cancelled')}
        >
          İptal ({statusStats.cancelled})
        </button>
      </div>

      {/* Arama ve sıralama */}
      <div className="toolbar">
        <SearchBox
          value={table.search}
          onChange={table.setSearch}
          placeholder="Sipariş no, müşteri veya ürün ara..."
        />
        <select
          className="select-control"
          value={`${table.sort.key}:${table.sort.dir}`}
          onChange={e => {
            const [key, dir] = e.target.value.split(':')
            table.setSort({ key, dir })
          }}
          aria-label="Sırala"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sipariş Listesi - Kart Görünümü */}
      <div className="orders-grid">
        {table.pageItems.length > 0 ? (
          table.pageItems.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">{order.id}</span>
                <span 
                  className="order-status"
                  style={{ 
                    backgroundColor: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status)
                  }}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>
              
              <div className="order-body">
                <div className="order-info">
                  <h3 className="order-product">{order.product}</h3>
                  <p className="order-customer">{order.customerName}</p>
                  <p className="order-email">{order.customerEmail}</p>
                </div>
                
                <div className="order-details">
                  <div className="order-amount">
                    <span className="amount-label">Tutar</span>
                    <span className="amount-value">{formatCurrency(order.amount)}</span>
                  </div>
                  <div className="order-date">
                    <span className="date-label">Tarih</span>
                    <span className="date-value">{formatDate(order.orderDate, true)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Bu kriterlere uyan sipariş bulunmamaktadır.</p>
          </div>
        )}
      </div>

      <Pagination
        page={table.page}
        totalPages={table.totalPages}
        totalCount={table.totalCount}
        onChange={table.setPage}
      />
    </div>
  )
}

export default Orders
