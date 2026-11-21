import { orders } from '@/lib/data'
import { requireAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const denied = requireAuth(request)
  if (denied) return denied
  const status = params.status
  if (status === 'all') {
    return NextResponse.json(orders)
  }
  const filtered = orders.filter((order) => order.status === status)
  return NextResponse.json(filtered)
}
