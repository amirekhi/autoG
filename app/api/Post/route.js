// pages/api/create.js
import clientPromise from "@/lib/mongo/mongodb";
import { NextResponse } from "next/server";

export  async function POST(req) {
    
    const data = await req.json()
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const result = await db.collection('Cars').insertOne(data);
    return NextResponse.json(result , {status :201 })
  
   
  
};
