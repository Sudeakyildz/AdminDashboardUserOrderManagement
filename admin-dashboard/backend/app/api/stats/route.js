import { orders } from '@/lib/data'
import { NextResponse } from 'next/server'

export async function GET() {
  const activeOrders = orders.filter((o) => o.status === 'active')
  const totalRevenue = activeOrders.reduce((sum, o) => sum + o.amount, 0)
  return NextResponse.json({
    totalRevenue,
    totalOrders: orders.length,
    activeOrders: orders.filter((o) => o.status === 'active').length,
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
    cancelledOrders: orders.filter((o) => o.status === 'cancelled').length,
  })
}
