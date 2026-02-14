/**
 * Siparişleri duruma göre filtreler
 * @param {Array} orders - Sipariş listesi
 * @param {string} status - Filtrelenecek durum ('all', 'active', 'pending', 'cancelled')
 * @returns {Array} Filtrelenmiş sipariş listesi
 */
export function filterOrdersByStatus(orders, status) {
  if (status === 'all') {
    return orders
  }
  return orders.filter(order => order.status === status)
}

/**
 * Toplam geliri hesaplar (sadece aktif siparişler için)
 * @param {Array} orders - Sipariş listesi
 * @returns {number} Toplam gelir
 */
export function calculateTotalRevenue(orders) {
  // Sadece aktif (active) siparişlerin toplamını hesapla
  const activeOrders = orders.filter(order => order.status === 'active')
  return activeOrders.reduce((total, order) => total + order.amount, 0)
}

/**
 * Tarihi Türkçe formatında formatlar
 * @param {string|Date} date - Formatlanacak tarih
 * @param {boolean} includeTime - Saat bilgisi dahil edilsin mi?
 * @returns {string} Formatlanmış tarih
 */
export function formatDate(date, includeTime = false) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Tarih geçerli mi kontrol et
  if (isNaN(dateObj.getTime())) {
    return 'Geçersiz tarih'
  }

  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const year = dateObj.getFullYear()

  let formatted = `${day}.${month}.${year}`

  if (includeTime) {
    const hours = String(dateObj.getHours()).padStart(2, '0')
    const minutes = String(dateObj.getMinutes()).padStart(2, '0')
    formatted += ` ${hours}:${minutes}`
  }

  return formatted
}

/**
 * Para formatını Türk Lirası olarak formatlar
 * @param {number} amount - Formatlanacak tutar
 * @returns {string} Formatlanmış tutar
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Sipariş durumuna göre renk döndürür
 * @param {string} status - Sipariş durumu
 * @returns {string} Durum rengi
 */
export function getStatusColor(status) {
  const statusColors = {
    active: 'var(--success-color)',
    pending: 'var(--warning-color)',
    cancelled: 'var(--danger-color)'
  }
  return statusColors[status] || 'var(--text-secondary)'
}

/**
 * Sipariş durumuna göre Türkçe etiket döndürür
 * @param {string} status - Sipariş durumu
 * @returns {string} Türkçe durum etiketi
 */
export function getStatusLabel(status) {
  const statusLabels = {
    active: 'Aktif',
    pending: 'Beklemede',
    cancelled: 'İptal'
  }
  return statusLabels[status] || status
}
