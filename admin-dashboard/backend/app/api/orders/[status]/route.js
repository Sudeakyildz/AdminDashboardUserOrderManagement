import { orders } from '@/lib/data'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const status = params.status
  if (status === 'all') {
    return NextResponse.json(orders)
  }
  const filtered = orders.filter((order) => order.status === status)
  return NextResponse.json(filtered)
}
