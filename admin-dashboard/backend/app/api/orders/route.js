import { orders } from '@/lib/data'
import { requireAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const denied = requireAuth(request)
  if (denied) return denied
  return NextResponse.json(orders)
}
