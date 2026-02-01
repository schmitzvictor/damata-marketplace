import { NextResponse } from 'next/server';

export function proxy(request) {
  const adminSession = request.cookies.get('admin_session');
  const pathname = request.nextUrl.pathname;

  // 1. Protect Admin Pages
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin/login') {
        // If already logged in, redirect to dashboard? Optional.
        return NextResponse.next();
    }
    
    if (!adminSession) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 2. Protect API Routes
  
  // Orders: GET is Admin Only. POST is Public (Checkout).
  if (pathname.startsWith('/api/orders')) {
    if (request.method === 'GET' && !adminSession) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Allow POST (Public Checkout)
  }

  // Products: Mutation is Admin Only. GET is Public.
  if (pathname.startsWith('/api/products')) {
    if (['POST', 'PUT', 'DELETE'].includes(request.method) && !adminSession) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Blog: Mutation is Admin Only. GET is Public.
  if (pathname.startsWith('/api/blog')) {
      if (['POST', 'DELETE'].includes(request.method) && !adminSession) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  }

  // Settings: Mutation is Admin Only. GET is Public.
  if (pathname.startsWith('/api/settings')) {
      if (request.method === 'POST' && !adminSession) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
