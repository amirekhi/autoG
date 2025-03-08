"use server"
import clientPromise from "@/lib/mongo/mongodb"

export async function GetUsers(param) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);


    if(!param){
        const data = await db.collection('Users').find({}, {projection :  {_id:0 , password: 0}}).toArray(); 
        return data
    }else{
        const data = await db.collection('Users').find({username: { $regex: param, $options: 'i' }}, {projection :  {_id:0 , password: 0}}).toArray(); 
        return data
    }
    
}



export async function DeletingUsers(emails) {
    const client = await clientPromise; // Connect to MongoDB client
    const db = client.db(process.env.MONGODB_DB); // Get the database instance

    try {
        // Perform the deletion
        const result = await db.collection('Users').deleteMany({
            email: { $in: emails } // Match documents where email is in the emails array
        });

       return result.acknowledged 
        
    } catch (error) {
        console.error("Error deleting users:", error);
        return false 
    } 
}