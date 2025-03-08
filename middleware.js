import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "./lib/session";





export default async function middleware(req) {

  const path = req.nextUrl.pathname;
  

 

 
  const cookieStore = await cookies()
  const cookie =  cookieStore.get("session")?.value;
  const session = await decrypt(cookie);
  
  
  

  if ( path.includes('Dash') && !session?.userId ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  
  

  

  if ((path.includes('login') &&  session?.userId ) || ( path.includes('Sign-Up') && session?.userId)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

 
  return NextResponse.next();
}
