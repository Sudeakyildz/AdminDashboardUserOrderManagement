import { NextResponse } from 'next/server'
import { checkCredentials, createToken } from '@/lib/auth'

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

    if (!checkCredentials(email, password)) {
      return NextResponse.json(
        { success: false, message: 'E-posta veya şifre hatalı' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      token: createToken(email),
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
