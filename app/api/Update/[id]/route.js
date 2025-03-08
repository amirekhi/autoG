import clientPromise from "@/lib/mongo/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export  async function PUT(req , {params}) {
      const { id } = await params
      const Data=  await req.json()
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      const result = await db.collection('Cars').updateOne(
        { _id: new ObjectId(id) },
        { $set: Data }
      );
      return NextResponse.json(result , {status :201 })
  
  };