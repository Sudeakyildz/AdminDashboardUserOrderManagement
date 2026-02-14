// API Base URL
const API_BASE_URL = 'http://localhost:3001/api'

// API Helper Functions

/**
 * Kullanıcıları API'den getirir
 * @returns {Promise<Array>} Kullanıcı listesi
 */
export async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
      throw new Error('Kullanıcılar yüklenemedi')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error (fetchUsers):', error)
    // Fallback: Local data kullan (backend çalışmıyorsa)
    const { fakeUsers } = await import('../utils/data')
    return fakeUsers
  }
}

/**
 * Siparişleri API'den getirir
 * @returns {Promise<Array>} Sipariş listesi
 */
export async function fetchOrders() {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`)
    if (!response.ok) {
      throw new Error('Siparişler yüklenemedi')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error (fetchOrders):', error)
    // Fallback: Local data kullan
    const { fakeOrders } = await import('../utils/data')
    return fakeOrders
  }
}

/**
 * Duruma göre siparişleri filtreler (API'den)
 * @param {string} status - Filtre durumu ('all', 'active', 'pending', 'cancelled')
 * @returns {Promise<Array>} Filtrelenmiş sipariş listesi
 */
export async function fetchOrdersByStatus(status) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${status}`)
    if (!response.ok) {
      throw new Error('Siparişler filtrelenemedi')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error (fetchOrdersByStatus):', error)
    // Fallback: Local data kullan ve client-side filtreleme yap
    const { fakeOrders } = await import('../utils/data')
    const { filterOrdersByStatus } = await import('../utils/helpers')
    return filterOrdersByStatus(fakeOrders, status)
  }
}

/**
 * İstatistikleri API'den getirir
 * @returns {Promise<Object>} İstatistik objesi
 */
export async function fetchStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`)
    if (!response.ok) {
      throw new Error('İstatistikler yüklenemedi')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error (fetchStats):', error)
    // Fallback: Local data ile hesapla
    const { fakeOrders } = await import('../utils/data')
    const { calculateTotalRevenue } = await import('../utils/helpers')
    const totalRevenue = calculateTotalRevenue(fakeOrders)
    return {
      totalRevenue,
      totalOrders: fakeOrders.length,
      activeOrders: fakeOrders.filter(o => o.status === 'active').length,
      pendingOrders: fakeOrders.filter(o => o.status === 'pending').length,
      cancelledOrders: fakeOrders.filter(o => o.status === 'cancelled').length
    }
  }
}

/**
 * Login API çağrısı
 * @param {string} email - E-posta adresi
 * @param {string} password - Şifre
 * @returns {Promise<Object>} Login response
 */
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Giriş başarısız')
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error (login):', error)
    throw error
  }
}
