import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'E-posta ve şifre gerekli' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      token: 'fake-jwt-token-' + Date.now(),
      user: {
        email,
        name: 'Admin User',
        role: 'admin',
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Geçersiz istek' },
      { status: 400 }
    )
  }
}
