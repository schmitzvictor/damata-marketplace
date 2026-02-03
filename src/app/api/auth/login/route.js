import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    // Check if account is locked
    if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
      const remainingMinutes = Math.ceil((new Date(user.lockedUntil) - new Date()) / 60000);
      return NextResponse.json({
        error: `Conta bloqueada. Tente novamente em ${remainingMinutes} minuto(s).`
      }, { status: 423 }); // 423 Locked
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      // Increment login attempts
      const newAttempts = user.loginAttempts + 1;
      const updateData = { loginAttempts: newAttempts };

      if (newAttempts >= MAX_ATTEMPTS) {
        updateData.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
        updateData.loginAttempts = 0; // Reset attempts counter

        await prisma.user.update({
          where: { id: user.id },
          data: updateData
        });

        return NextResponse.json({
          error: 'Conta bloqueada por muitas tentativas incorretas. Tente novamente em 15 minutos ou entre em contato com o administrador.'
        }, { status: 423 });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: updateData
      });

      const remaining = MAX_ATTEMPTS - newAttempts;
      return NextResponse.json({
        error: `Credenciais inválidas. ${remaining} tentativa(s) restante(s).`
      }, { status: 401 });
    }

    // Success! Reset login attempts
    await prisma.user.update({
      where: { id: user.id },
      data: { loginAttempts: 0, lockedUntil: null }
    });

    // Create response with secure cookie
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

    // Set session cookie with user role
    response.cookies.set({
      name: 'admin_session',
      value: JSON.stringify({ userId: user.id, role: user.role }),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
