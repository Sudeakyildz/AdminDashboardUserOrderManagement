import { orders } from '@/lib/data'
import { requireAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const denied = requireAuth(request)
  if (denied) return denied
  const activeOrders = orders.filter((o) => o.status === 'active')
  const totalRevenue = activeOrders.reduce((sum, o) => sum + o.amount, 0)
  return NextResponse.json({
    totalRevenue,
    totalOrders: orders.length,
    activeOrders: activeOrders.length,
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
    cancelledOrders: orders.filter((o) => o.status === 'cancelled').length,
  })
}
