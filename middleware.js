import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "./lib/session";

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;

  if (!cookie) {
    // If no session cookie exists, redirect to login if trying to access Dash or admin routes
    if (path.includes('/Dash')) {  // Check if path includes '/Dash'
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    return NextResponse.next();
  }

  // Decrypt session cookie and get user data
  const session = await decrypt(cookie);

  if (!session || !session.userId) {
    // If session is invalid or expired, redirect to login if trying to access Dash
    if (path.includes('/Dash')) {  // Check if path includes '/Dash'
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    return NextResponse.next();
  }


  // Check if the user has the 'admin' role for Dash and related routes
  if (path.includes('/Dash') && session.userRole !== 'admin') {  // Check if path includes '/Dash'
    // If the user is not an admin, redirect to unauthorized page
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Redirect users who are logged in but trying to access login or sign-up pages
  if ((path.includes('login') && session?.userId) || (path.includes('Sign-Up') && session?.userId)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
