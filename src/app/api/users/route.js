import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET: List all users (Admin only - middleware protected)
export async function GET(request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        loginAttempts: true,
        lockedUntil: true,
        createdAt: true
        // Exclude password!
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
  }
}

// POST: Create new user (Admin only)
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

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        password: hashedPassword,
        name: data.name.trim(),
        role: data.role || 'user'
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
    console.error("Create User Error:", error);
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 });
  }
}
