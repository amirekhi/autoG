"use server"

import clientPromise from "@/lib/mongo/mongodb"
import { ObjectId } from "mongodb"; // Import ObjectId for handling MongoDB IDs




export async function UploadCategorie(Categorie) {
    try{
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
  
      const result = await db.collection('Categories').insertOne(Categorie)

      if (result.acknowledged == true){
       
        return true
      }
    }catch(error){
       console.log(error)
    }
     
  }

  export async function GetCategoryById(id) {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
  
      const category = await db
        .collection("Categories")
        .findOne({ _id: new ObjectId(id) });

     
        if(category != null){
        const formattedCategorie = {
          ...category,
          _id: category._id.toString(), // Convert ObjectId to string
         
        }
          return formattedCategorie;
      }else {return null}
       
     
    } catch (error) {
      console.error("Error retrieving category:", error);
      return null;
    }
  }


  export async function GetCategories(param) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
   

    if(!param){
      try {
     
    
        // Fetch blogs without a projection, so `_id` is included
        const Categories = await db.collection('Categories').find({}).toArray();
    
        // Convert `_id` to a string while keeping its name as `_id`
        if (Categories != null) {
        const formattedCategories = Categories.map(Categorie => ({
          ...Categorie,
          _id: Categorie._id.toString(), // Convert ObjectId to string
        }));
      
      return formattedCategories;
      }else {return null}
    
        
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch blogs');
      }
    }else{
      try {
    
        // Fetch Cats without a projection, so `_id` is included
        const Categories = await db.collection('Categories').find({Name: { $regex: param, $options: 'i' }} ).toArray()
    
        // Convert `_id` to a string while keeping its name as `_id`
        const formattedCategories = Categories.map(Categorie => ({
          ...Categorie,
          _id: Categorie._id.toString(), // Convert ObjectId to string
        }));
    
        return formattedCategories;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch Categories');
      }
    }
    
}






  
// export async function DeletingCategories(Ids) {
//   const client = await clientPromise; // Connect to MongoDB client
//   const db = client.db(process.env.MONGODB_DB); // Get the database instance

//   try {
//       // Perform the deletion
//       const result = await db.collection('Categories').deleteMany({
//           _id: { $in: Ids } // Match documents where email is in the emails array
//       });

//      return result.acknowledged
      
//   } catch (error) {
//       console.error("Error deleting Reservation:", error);
//       return false 
//   } 
// }




export async function DeletingCategories(Ids) {
  const client = await clientPromise; // Connect to MongoDB client
  const db = client.db(process.env.MONGODB_DB); // Get the database instance

  try {
    // Convert Ids to ObjectId if they are not already
    const objectIds = Ids.map(id => new ObjectId(id));

    // Perform the deletion
    const result = await db.collection('Categories').deleteMany({
      _id: { $in: objectIds } // Match documents where _id is in the Ids array
    });

    return result.acknowledged;
  } catch (error) {
    console.error("Error deleting Categories:", error);
    return false;
  }
}




export async function UpdateCategoryById(id, updateData) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("Categories").updateOne(
      { _id: new ObjectId(id) },
      { $set: { Name: updateData.Name ,  Describtion : updateData.Describtion , CategorieImage : updateData.CategorieImage  } }
    );
    
    return result.acknowledged; // Returns true if the update was successful
  } catch (error) {
    console.error("Error updating category:", error);
    return false;
  }
}