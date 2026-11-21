import { formatCurrency } from '../utils/helpers'
import './Charts.css'

/**
 * Günlük gelir çubuk grafiği (saf SVG, ek kütüphane yok).
 * @param {{label: string, value: number}[]} data
 */
export function BarChart({ data }) {
  const width = 560
  const height = 240
  const pad = { top: 16, right: 12, bottom: 32, left: 12 }
  const max = Math.max(...data.map(d => d.value), 1)
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom
  const slot = innerW / Math.max(data.length, 1)
  const barW = Math.min(44, slot * 0.6)

  return (
    <svg
      className="chart-svg"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Günlük gelir grafiği"
    >
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <line
        x1={pad.left}
        x2={width - pad.right}
        y1={height - pad.bottom}
        y2={height - pad.bottom}
        stroke="var(--border-color)"
      />
      {data.map((d, i) => {
        const h = (d.value / max) * innerH
        const x = pad.left + slot * i + (slot - barW) / 2
        const y = height - pad.bottom - h
        return (
          <g key={d.label}>
            <title>{`${d.label}: ${formatCurrency(d.value)}`}</title>
            <rect x={x} y={y} width={barW} height={h} rx="6" fill="url(#barGrad)" />
            {d.value > 0 && (
              <text x={x + barW / 2} y={y - 5} textAnchor="middle" className="chart-value">
                {formatCurrency(d.value)}
              </text>
            )}
            <text
              x={x + barW / 2}
              y={height - 10}
              textAnchor="middle"
              className="chart-label"
            >
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/**
 * Sipariş durumu halka grafiği.
 * @param {{label: string, value: number, color: string}[]} segments
 */
export function DonutChart({ segments }) {
  const total = segments.reduce((s, x) => s + x.value, 0)
  const r = 60
  const c = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="donut-wrap">
      <svg
        className="donut-svg"
        viewBox="0 0 160 160"
        role="img"
        aria-label="Sipariş durumu dağılımı"
      >
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--border-color)" strokeWidth="22" />
        {total > 0 &&
          segments.map(seg => {
            const len = (seg.value / total) * c
            const circle = (
              <circle
                key={seg.label}
                cx="80"
                cy="80"
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="22"
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 80 80)"
              />
            )
            offset += len
            return circle
          })}
        <text x="80" y="78" textAnchor="middle" className="donut-total">
          {total}
        </text>
        <text x="80" y="96" textAnchor="middle" className="chart-label">
          sipariş
        </text>
      </svg>
      <ul className="legend">
        {segments.map(seg => (
          <li key={seg.label}>
            <span className="legend-dot" style={{ background: seg.color }} />
            {seg.label}
            <strong>{seg.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
