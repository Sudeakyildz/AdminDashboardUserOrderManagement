import { useMemo, useState, useEffect } from 'react'

function normalize(value) {
  return String(value ?? '')
    .toLocaleLowerCase('tr-TR')
    .trim()
}

/**
 * Arama + sıralama + sayfalama mantığı (liste sayfaları için ortak).
 * @param {Array} items - Ham liste
 * @param {Object} options
 * @param {string[]} options.searchKeys - Aramada bakılacak alanlar
 * @param {{key: string, dir: 'asc'|'desc'}} options.initialSort
 * @param {number} options.pageSize
 */
export function useTableData(items, { searchKeys, initialSort, pageSize = 8 }) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(initialSort)
  const [page, setPage] = useState(1)

  const searched = useMemo(() => {
    const q = normalize(search)
    if (!q) return items
    return items.filter(item =>
      searchKeys.some(key => normalize(item[key]).includes(q))
    )
  }, [items, search, searchKeys])

  const sorted = useMemo(() => {
    if (!sort?.key) return searched
    const factor = sort.dir === 'asc' ? 1 : -1
    return [...searched].sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      if (typeof av === 'number' && typeof bv === 'number') {
        return (av - bv) * factor
      }
      return (
        String(av).localeCompare(String(bv), 'tr', { numeric: true }) * factor
      )
    })
  }, [searched, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))

  // Filtre/arama değişince sayfa taşmasın
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const pageItems = useMemo(
    () => sorted.slice((page - 1) * pageSize, page * pageSize),
    [sorted, page, pageSize]
  )

  const updateSearch = value => {
    setSearch(value)
    setPage(1)
  }

  // Aynı sütuna tekrar tıklanınca yön değişir
  const toggleSort = key => {
    setSort(prev =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' }
    )
    setPage(1)
  }

  return {
    search,
    setSearch: updateSearch,
    sort,
    setSort: value => {
      setSort(value)
      setPage(1)
    },
    toggleSort,
    page,
    setPage,
    totalPages,
    pageItems,
    totalCount: sorted.length
  }
}
