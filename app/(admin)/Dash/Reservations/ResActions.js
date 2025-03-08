"use server"
import clientPromise from "@/lib/mongo/mongodb"
import { ObjectId } from "mongodb";

export async function GetReservations(param) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
   

    if(!param){
      const data = await db.collection('Reservation').find({}).toArray(); 
      const formattedReservations = data.map(Reservation => ({
        ...Reservation,
        _id: Reservation._id.toString(), // Convert ObjectId to string
      }));
      return formattedReservations
    }else{
        const data = await db.collection('Reservation').find({userId: { $regex: param, $options: 'i' }}).toArray();
        const formattedReservations = data.map(Reservation => ({
            ...Reservation,
            _id: Reservation._id.toString(), // Convert ObjectId to string
          })); 
        return formattedReservations
    }
    
}



export async function DeletingReservations(Ids) {
    const client = await clientPromise; // Connect to MongoDB client
    const db = client.db(process.env.MONGODB_DB); // Get the database instance

    try {

        const ObjectIds = Ids.map(id => new ObjectId(id));
        // Perform the deletion
        const result = await db.collection('Reservation').deleteMany({
           _id: { $in: ObjectIds } // Match documents where email is in the emails array
        });

       return result.acknowledged
        
    } catch (error) {
        console.error("Error deleting Reservation:", error);
        return false 
    } 
}