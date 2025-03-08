"use server";

import { cookies } from "next/headers"; // Import the cookies API
import { redirect } from "next/navigation"; // Import redirect for navigation
import clientPromise from "@/lib/mongo/mongodb";
import { ObjectId } from "mongodb";
import { decrypt } from "@/lib/session";


export async function handlerRgistration(CarId) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;; // Replace with your session cookie name

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const Car = await db.collection('Cars').findOne({ _id: new ObjectId(CarId) } , {projection :  {_id:0 }} );
  
 
  if(Car.acknowledged == false){
    return {error : 'no such Car exist'}
  }

   
  if (sessionCookie) {
    const session = await decrypt(sessionCookie)
    const reservation = {userId : session.userId , userEmail : session.email , userPhoneNumber : session.phoneNumber , ...Car}
    const result = await db.collection('Reservation').insertOne({...reservation});
    return {error : 'file_added'}
 
  } else {
    // If the session doesn't exist, redirect the user
    return {error : 'no_session'}
 // Replace with your form page path
  }
}


export async function handlerUnkownRgistration(CarId , userData) {

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const Car = await db.collection('Cars').findOne({ _id: new ObjectId(CarId) } , {projection :  {_id:0 }} );

  if(Car.acknowledged == false){
    return {error : 'no such Car exist'}
  }

  const reservation = { ...userData , ...Car}
  const result = await db.collection('Reservation').insertOne({...reservation});
  return {error : 'file_added'}
  
}