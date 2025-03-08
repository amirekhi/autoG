// pages/api/delete.js

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo/mongodb";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";

export  async function DELETE(req , {params}) {
    const headersData = await headers();
    const type = headersData.get('deletetype'); 
    
    
    const { id } = await params
    const car = await req.json()
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
  

    if(type == 'deleted') {
        
        const result = await db.collection('Deleted_Cars').deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(result , {status :201 })
    }else{
        const result = await db.collection('Cars').deleteOne({ _id: new ObjectId(id) });
        if(result.acknowledged == true) {
            
            const result_deleted = await db.collection('Deleted_Cars').insertOne(car)
        }
        return NextResponse.json(result , {status :201 })
    }

    
    
    
 
};
