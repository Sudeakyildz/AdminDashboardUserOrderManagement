import './ui.css'

export function Loading({ text = 'Yükleniyor...' }) {
  return (
    <div className="state-box" role="status">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-box error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Tekrar dene
        </button>
      )}
    </div>
  )
}

export function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="search-box">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  )
}

export function Pagination({ page, totalPages, onChange, totalCount }) {
  if (totalCount === 0) return null
  return (
    <div className="pagination">
      <span className="pagination-info">
        {totalCount} kayıt · Sayfa {page}/{totalPages}
      </span>
      <div className="pagination-buttons">
        <button disabled={page <= 1} onClick={() => onChange(page - 1)}>
          ‹ Önceki
        </button>
        <button disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
          Sonraki ›
        </button>
      </div>
    </div>
  )
}
