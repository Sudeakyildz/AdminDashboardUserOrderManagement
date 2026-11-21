import { useState, useEffect, useCallback } from 'react'

/**
 * Bir API fonksiyonunu çağırır ve yükleniyor / hata / veri durumlarını yönetir.
 * @param {Function} fetcher - Promise döndüren fonksiyon
 * @returns {{data: any, loading: boolean, error: string, reload: Function}}
 */
export function useApi(fetcher) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    fetcher()
      .then(result => {
        if (!cancelled) setData(result)
      })
      .catch(err => {
        if (!cancelled) setError(err.message || 'Bir hata oluştu')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // fetcher modül seviyesinde sabit bir fonksiyon; tick ile yeniden yüklenir
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  const reload = useCallback(() => setTick(t => t + 1), [])

  return { data, loading, error, reload }
}
