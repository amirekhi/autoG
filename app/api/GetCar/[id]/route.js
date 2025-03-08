// pages/api/delete.js

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo/mongodb";
import { ObjectId } from "mongodb";

export  async function GET(_ , {params}) {
    const { id } = await params
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const result = await db.collection('Cars').findOne({ _id: new ObjectId(id) } , {projection :  {_id:0 }} );
    return NextResponse.json(result , {status :201 })
 
};
