import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Verify credentials (Mock for now, but server-side).
    // In production, these should be env vars or DB lookups.
    if (username === "admin" && password === "da-mata") {
      
      const response = NextResponse.json({ success: true });
      
      // Set HttpOnly Cookie
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated', // In real app, use a JWT or session ID
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
