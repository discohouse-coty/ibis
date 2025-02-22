// src/middleware.ts

/*
protectedRoutes: An array of the routes that require authentication.   
path: The current route being accessed.
onAuthStateChanged: This Firebase function listens for changes in the user's authentication state.   
Redirect: If the user is not authenticated, they are redirected to the /login page.
NextResponse.next(): If the user is authenticated, the request continues to the protected route.   
config.matcher: This tells Next.js which routes the middleware should run on. Using wildcards like /:path* ensures that all sub-routes of /dashboard, /profile, and /teachers are also protected.
*/

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export async function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard', '/profile', '/teachers']; // Add your protected routes here
  const path = request.nextUrl.pathname;

  if (protectedRoutes.includes(path)) {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          resolve(NextResponse.redirect(new URL('/login', request.url)));
        } else {
          resolve(NextResponse.next());
        }
      });
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/teachers/:path*'], // Routes to run middleware on
};

