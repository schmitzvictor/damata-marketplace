import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// POST: Public registration endpoint
export async function POST(request) {
  try {
    const data = await request.json();

    // Validation
    if (!data.email || !data.password || !data.name) {
      return NextResponse.json({ error: 'Email, senha e nome são obrigatórios' }, { status: 400 });
    }

    if (data.password.length < 6) {
      return NextResponse.json({ error: 'Senha deve ter no mínimo 6 caracteres' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase().trim() }
    });

    if (existing) {
      return NextResponse.json({ error: 'Este email já está cadastrado' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user (default role: user)
    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        password: hashedPassword,
        name: data.name.trim(),
        role: 'user' // Always create as regular user, not admin
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error("Register User Error:", error);
    return NextResponse.json({ error: 'Erro ao criar conta' }, { status: 500 });
  }
}
