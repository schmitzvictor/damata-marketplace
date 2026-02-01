import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
        orderBy: { date: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Transaction: Create Order and Update Stock
    const order = await prisma.$transaction(async (tx) => {
        // 1. Create Order
        const newOrder = await tx.order.create({
            data: {
                customer: data.customer,
                total: parseFloat(data.total),
                items: parseInt(data.items),
                status: data.status || "Pendente",
                // Address Info
                addressZip: data.address?.zip,
                addressStreet: data.address?.street,
                addressNumber: data.address?.number,
                addressComplement: data.address?.complement,
                addressDistrict: data.address?.district,
                addressCity: data.address?.city,
                addressState: data.address?.state,
                addressReference: data.address?.reference
            }
        });

        // 2. Decrement Stock and Create Order Items
        if (data.cartItems && Array.isArray(data.cartItems)) {
            for (const item of data.cartItems) {
                // item: { id (productId), size, quantity, price, name, ... }
                
                // Create OrderItem (Snapshot)
                await tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: parseInt(item.id),
                        productName: item.name,
                        price: parseFloat(item.price),
                        quantity: parseInt(item.quantity),
                        size: item.size
                    }
                });

                // Find the variant to decrement stock
                const variant = await tx.productVariant.findFirst({
                    where: { 
                        productId: parseInt(item.id),
                        size: item.size
                    }
                });

                if (variant) {
                    await tx.productVariant.update({
                        where: { id: variant.id },
                        data: {
                            stock: {
                                decrement: parseInt(item.quantity)
                            }
                        }
                    });
                }
            }
        }

        return newOrder;
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order Create Error", error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
