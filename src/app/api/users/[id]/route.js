import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// PUT: Update user (Admin only)
export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const data = await request.json();
    const updateData = {};

    if (data.name) updateData.name = data.name.trim();
    if (data.email) updateData.email = data.email.toLowerCase().trim();
    if (data.role) updateData.role = data.role;

    // If password is being changed, hash it
    if (data.password && data.password.length >= 6) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    // Reset lockout if requested
    if (data.resetLockout === true) {
      updateData.loginAttempts = 0;
      updateData.lockedUntil = null;
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        loginAttempts: true,
        lockedUntil: true
      }
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error("Update User Error:", error);
    return NextResponse.json({ error: 'Erro ao atualizar usuário' }, { status: 500 });
  }
}

// DELETE: Remove user (Admin only)
export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete User Error:", error);
    return NextResponse.json({ error: 'Erro ao deletar usuário' }, { status: 500 });
  }
}
