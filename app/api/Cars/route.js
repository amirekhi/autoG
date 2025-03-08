import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo/mongodb";
import { headers } from "next/headers";

export const revalidate = 0


export  async function GET(req, res)  {
  const headersData = await headers();
  const type = headersData.get('type'); 
  // res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  // res.setHeader('Pragma', 'no-cache');
  // res.setHeader('Expires', '0');
  // res.setHeader('Surrogate-Control', 'no-store');

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);



 if(type == 'HotCars'){
  const data = await db.collection('Cars').find({Hot : true}).limit(20).toArray(); 
  return NextResponse.json(data , {status:200})

 }else{
  const data = await db.collection('Cars').find({}).limit(20).toArray(); 
  return NextResponse.json(data , {status:200})
 }


  

 
};

