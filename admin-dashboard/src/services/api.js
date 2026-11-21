// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const TOKEN_KEY = 'authToken'
const USER_KEY = 'authUser'

// --- Oturum (token) yönetimi ---

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

function saveSession(token, user) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    // localStorage kapalıysa oturum sayfa yenileyince kaybolur, sorun değil
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    // yoksay
  }
}

// Backend 401 dönerse App bu olayı dinleyip kullanıcıyı çıkışa yönlendirir
export const UNAUTHORIZED_EVENT = 'auth:unauthorized'

/**
 * Token'lı GET isteği. 401'de oturumu temizler ve olay yayınlar.
 * Ağ hatası (backend kapalı) TypeError olarak yukarı fırlar.
 */
async function authGet(path, errorMessage) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${getToken() || ''}` }
  })
  if (response.status === 401) {
    clearSession()
    window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
    throw new Error('Oturum süresi doldu')
  }
  if (!response.ok) {
    throw new Error(errorMessage)
  }
  return response.json()
}

// Backend'e hiç ulaşılamadığında (ağ hatası) yerel veriye düşülür.
// Sunucu hata dönerse (401, 500...) düşülmez; kullanıcıya hata gösterilir.
function isNetworkError(error) {
  return error instanceof TypeError
}

/**
 * Kullanıcıları API'den getirir
 * @returns {Promise<Array>} Kullanıcı listesi
 */
export async function fetchUsers() {
  try {
    return await authGet('/users', 'Kullanıcılar yüklenemedi')
  } catch (error) {
    if (!isNetworkError(error)) throw error
    console.error('API Error (fetchUsers):', error)
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
    return await authGet('/orders', 'Siparişler yüklenemedi')
  } catch (error) {
    if (!isNetworkError(error)) throw error
    console.error('API Error (fetchOrders):', error)
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
    return await authGet(`/orders/${status}`, 'Siparişler filtrelenemedi')
  } catch (error) {
    if (!isNetworkError(error)) throw error
    console.error('API Error (fetchOrdersByStatus):', error)
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
    return await authGet('/stats', 'İstatistikler yüklenemedi')
  } catch (error) {
    if (!isNetworkError(error)) throw error
    console.error('API Error (fetchStats):', error)
    const { fakeOrders } = await import('../utils/data')
    const { calculateTotalRevenue } = await import('../utils/helpers')
    return {
      totalRevenue: calculateTotalRevenue(fakeOrders),
      totalOrders: fakeOrders.length,
      activeOrders: fakeOrders.filter(o => o.status === 'active').length,
      pendingOrders: fakeOrders.filter(o => o.status === 'pending').length,
      cancelledOrders: fakeOrders.filter(o => o.status === 'cancelled').length
    }
  }
}

/**
 * Login API çağrısı. Başarılıysa token'ı saklar.
 * @param {string} email - E-posta adresi
 * @param {string} password - Şifre
 * @returns {Promise<Object>} Login response
 */
export async function login(email, password) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
  } catch {
    throw new Error('Sunucuya ulaşılamadı. Backend çalışıyor mu?')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || 'Giriş başarısız')
  }

  saveSession(data.token, data.user)
  return data
}
