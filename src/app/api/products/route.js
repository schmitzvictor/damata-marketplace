import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
        orderBy: { id: 'desc' },
        include: { variants: true }
    });
    // Calculate total stock for list view convenience
    const productsWithStock = products.map(p => ({
        ...p,
        stock: p.variants.reduce((acc, v) => acc + v.stock, 0),
        // Deprecated fields for compatibility if needed, else frontend should adapt
        sizes: p.variants.map(v => v.size)
    }));
    return NextResponse.json(productsWithStock);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    // data.variants should be array of { size, stock }
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        date: data.date, 
        image: data.image,
        category: data.category,
        featured: data.featured || false,
        variants: {
            create: data.variants || [] 
        }
      },
      include: { variants: true }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}
