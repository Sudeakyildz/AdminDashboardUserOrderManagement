import crypto from 'crypto'
import { NextResponse } from 'next/server'

// Demo hesabı. Gerçek kullanımda ortam değişkenleriyle değiştirin:
// ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin1234'
const SECRET = process.env.AUTH_SECRET || 'dev-only-secret-change-me'
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000 // 8 saat

function sign(payload) {
  return crypto.createHmac('sha256', SECRET).update(payload).digest('base64url')
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb)
}

export function checkCredentials(email, password) {
  // İki karşılaştırma da her zaman çalışsın (zamanlama farkı olmasın)
  const emailOk = safeEqual(String(email).trim().toLowerCase(), ADMIN_EMAIL.toLowerCase())
  const passOk = safeEqual(password, ADMIN_PASSWORD)
  return emailOk && passOk
}

export function createToken(email) {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + TOKEN_TTL_MS })
  ).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return data.exp > Date.now() ? data : null
  } catch {
    return null
  }
}

/**
 * Route handler'larda kullanılır. Yetkisizse 401 Response döner, yetkiliyse null.
 */
export function requireAuth(request) {
  const header = request.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!verifyToken(token)) {
    return NextResponse.json(
      { success: false, message: 'Oturum geçersiz veya süresi dolmuş' },
      { status: 401 }
    )
  }
  return null
}
