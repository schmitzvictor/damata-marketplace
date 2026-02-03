import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const data = await request.json(); // Expected: { name, price, ..., variants: [{size, stock}, ...] }

    // Transaction: Update Product fields, Replace Variants
    const product = await prisma.$transaction(async (tx) => {
        // 1. Update basic fields
        await tx.product.update({
            where: { id: parseInt(id) },
            data: {
                name: data.name,
                price: parseFloat(data.price),
                image: data.image,
                category: data.category,
                featured: data.featured,
            }
        });

        // 2. Handle Variants: Delete all old ones, create new ones
        await tx.productVariant.deleteMany({
            where: { productId: parseInt(id) }
        });

        if (data.variants && data.variants.length > 0) {
            // Using Promise.all for robustness across different DB providers.
            await Promise.all(
                data.variants.map(v => 
                    tx.productVariant.create({
                        data: {
                            productId: parseInt(id),
                            size: v.size,
                            stock: parseInt(v.stock)
                        }
                    })
                )
            );
        }

        // Return updated product with variants
        const updatedProduct = await tx.product.findUnique({
            where: { id: parseInt(id) },
            include: { variants: true }
        });

        // Compute total stock for consistency with GET /api/products
        if (updatedProduct) {
            updatedProduct.stock = updatedProduct.variants.reduce((acc, v) => acc + v.stock, 0);
        }
        
        return updatedProduct;
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Update Product Error:", error); // Log for debugging on server only
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}
