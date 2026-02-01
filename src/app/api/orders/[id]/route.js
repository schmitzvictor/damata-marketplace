import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: { orderItems: true }
    });
    
    if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching order' }, { status: 500 });
  }
}
