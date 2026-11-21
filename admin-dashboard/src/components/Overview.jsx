import { useMemo } from 'react'
import { fetchOrders } from '../services/api'
import { useApi } from '../hooks/useApi'
import { formatCurrency, formatDate, getStatusLabel } from '../utils/helpers'
import { calculateTotalRevenue } from '../utils/helpers'
import { BarChart, DonutChart } from './Charts'
import { Loading, ErrorState } from './ui'
import './Overview.css'

const STATUS_COLORS = {
  active: '#10b981',
  pending: '#f59e0b',
  cancelled: '#ef4444'
}

function Overview() {
  const { data, loading, error, reload } = useApi(fetchOrders)

  const view = useMemo(() => {
    const orders = data || []

    // Günlük gelir (yalnızca aktif siparişler), tarihe göre sıralı
    const byDay = new Map()
    orders
      .filter(o => o.status === 'active')
      .forEach(o => {
        const day = o.orderDate.slice(0, 10)
        byDay.set(day, (byDay.get(day) || 0) + o.amount)
      })
    const daily = [...byDay.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, value]) => ({
        label: formatDate(day).slice(0, 5), // gg.aa
        value
      }))

    const segments = ['active', 'pending', 'cancelled'].map(status => ({
      label: getStatusLabel(status),
      value: orders.filter(o => o.status === status).length,
      color: STATUS_COLORS[status]
    }))

    const recent = [...orders]
      .sort((a, b) => b.orderDate.localeCompare(a.orderDate))
      .slice(0, 5)

    return {
      revenue: calculateTotalRevenue(orders),
      count: orders.length,
      average: orders.length
        ? Math.round(orders.reduce((s, o) => s + o.amount, 0) / orders.length)
        : 0,
      daily,
      segments,
      recent
    }
  }, [data])

  return (
    <div className="overview-page">
      <div className="page-header">
        <h1>Genel Bakış</h1>
        <p>Satış ve sipariş özeti</p>
      </div>

      {loading && <Loading />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && (
        <>
          <div className="kpi-grid">
            <div className="kpi-card">
              <span>Toplam gelir</span>
              <strong>{formatCurrency(view.revenue)}</strong>
            </div>
            <div className="kpi-card">
              <span>Toplam sipariş</span>
              <strong>{view.count}</strong>
            </div>
            <div className="kpi-card">
              <span>Ortalama sipariş tutarı</span>
              <strong>{formatCurrency(view.average)}</strong>
            </div>
          </div>

          <div className="chart-grid">
            <section className="panel">
              <h2>Günlük gelir (aktif siparişler)</h2>
              <BarChart data={view.daily} />
            </section>
            <section className="panel">
              <h2>Sipariş durumu</h2>
              <DonutChart segments={view.segments} />
            </section>
          </div>

          <section className="panel">
            <h2>Son siparişler</h2>
            <ul className="recent-list">
              {view.recent.map(o => (
                <li key={o.id}>
                  <div>
                    <strong>{o.product}</strong>
                    <span>
                      {o.customerName} · {formatDate(o.orderDate, true)}
                    </span>
                  </div>
                  <div className="recent-amount">{formatCurrency(o.amount)}</div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  )
}

export default Overview
