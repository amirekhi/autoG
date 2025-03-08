import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";






const secretKey = 'secret';
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId , phoneNumber , email) {
  const cookieStore = await cookies()
  const expiresAt = new Date(Date.now() +  30 * 60 * 1000);
  const session = await encrypt({ userId, phoneNumber , email});

   cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}


export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session");
}



export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify D session");
  }
}



// export const gettingSession = async () => {

//   const cookieStore = await cookies()
//   const cookie =  cookieStore.get("session")?.value;
//   const session = await decrypt(cookie);
//   if(!session?.userId){
//     return(null)
//   }else{
//     return(session)
//   }
  
// }

export const gettingSession = async () => {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const session = await decrypt(cookie);

    // If session or userId is invalid, return null
    if (!session?.userId) return null;

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};
