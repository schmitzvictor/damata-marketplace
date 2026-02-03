import { NextResponse } from 'next/server';

export function proxy(request) {
  const sessionCookie = request.cookies.get('admin_session');
  const pathname = request.nextUrl.pathname;

  // Parse session data
  let session = null;
  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      session = { role: 'legacy' }; // Old format compatibility
    }
  }

  // 1. Protect Admin Pages
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Must be logged in
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Must be admin role
    if (session.role !== 'admin' && session.role !== 'legacy') {
      // User is logged in but not an admin
      return NextResponse.redirect(new URL('/?error=access_denied', request.url));
    }
  }

  // 2. Protect API Routes
  
  // Users API: Admin Only
  if (pathname.startsWith('/api/users')) {
    if (!session || (session.role !== 'admin' && session.role !== 'legacy')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Orders: GET is Admin Only. POST is Public (Checkout).
  if (pathname.startsWith('/api/orders')) {
    if (request.method === 'GET' && !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Allow POST (Public Checkout)
  }

  // Products: Mutation is Admin Only. GET is Public.
  if (pathname.startsWith('/api/products')) {
    if (['POST', 'PUT', 'DELETE'].includes(request.method) && !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Blog: Mutation is Admin Only. GET is Public.
  if (pathname.startsWith('/api/blog')) {
    if (['POST', 'DELETE'].includes(request.method) && !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Settings: Mutation is Admin Only. GET is Public.
  if (pathname.startsWith('/api/settings')) {
    if (request.method === 'POST' && !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
