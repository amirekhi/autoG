import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo/mongodb";



export  async function DELETE(req , res) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    

    const result = await db.collection('Deleted_Cars').deleteMany({});
    return NextResponse.json(result , {status :201 })
    
}