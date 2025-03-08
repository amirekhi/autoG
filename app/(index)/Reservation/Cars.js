"use server"

import clientPromise from "@/lib/mongo/mongodb"



export async function GetCarsByCat(Cat)  {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
    
        // Fetch blogs without a projection, so `_id` is included
        const Cars = await db.collection('Cars').find({ "Categorie": Cat }).toArray();
    
        // Convert `_id` to a string while keeping its name as `_id`
        const formattedCars = Cars.map(Car => ({
          ...Car,
          _id: Car._id.toString(), // Convert ObjectId to string
        }));
    
        return formattedCars;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch blogs');
      }
    
}