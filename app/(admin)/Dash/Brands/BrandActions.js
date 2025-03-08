"use server"

import clientPromise from "@/lib/mongo/mongodb"


export async function UploadBrands(brand) {
   try{
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection('Brands').insertOne(brand);
    return result.acknowledged
   }catch(error){
      console.log(error)
   }
    
}




export async function GetBrands() {
   try{
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
  
      const brands = await db.collection('Brands').find({} , {projection :  { _id:0 }} ).toArray()
      return brands
     }catch(error){
        console.log(error)
     }
      
   
}


export async function DeleteBrand(ImageUrl) {
   try{
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
  
      const result = await db.collection('Brands').deleteOne({ ImageUrl: ImageUrl });
      return result.acknoledged
     }catch(error){
        console.log(error)
     }
      
   
}


