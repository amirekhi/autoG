"use server"

import clientPromise from "@/lib/mongo/mongodb"
import { ObjectId } from "mongodb";


export async function UploadBlog(blog) {
   try{
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection('Blogs').insertOne(blog);
    return result.acknowledged
   }catch(error){
      console.log(error)
   }
    
}


export async function UpdateBlog(blog , id) {
  try{
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection('Blogs').updateOne(
      { _id: new ObjectId(id) },
      { $set: blog }
    );
    if (result.acknowledged == true){
      return true
    }
  }catch(error){
     console.log(error)
  }
   
}

export async function GetBlogs() {
   try {
     const client = await clientPromise;
     const db = client.db(process.env.MONGODB_DB);
 
     // Fetch blogs without a projection, so `_id` is included
     const blogs = await db.collection('Blogs').find({}).toArray();
 
     // Convert `_id` to a string while keeping its name as `_id`
     const formattedBlogs = blogs.map(blog => ({
       ...blog,
       _id: blog._id.toString(), // Convert ObjectId to string
     }));
 
     return formattedBlogs;
   } catch (error) {
     console.error(error);
     throw new Error('Failed to fetch blogs');
   }
 }


 export async function GetBlog(id) {
   try {
     const client = await clientPromise;
     const db = client.db(process.env.MONGODB_DB);
 
     // Fetch a single blog by ID
     const blog = await db.collection('Blogs').findOne({ _id: new ObjectId(id) });
 
     if (!blog) {
       throw new Error(`Blog with ID ${id} not found`);
     }
 
     // Optionally, convert `_id` to a string for frontend use
     return {
       ...blog,
       _id: blog._id.toString(),
     };
   } catch (error) {
     console.error(error);
     throw new Error('Failed to fetch the blog');
   }
 }
 

export async function DeleteBlog(ImageUrl) {
   try{
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
  
      const result = await db.collection('Blogs').deleteOne({ Url: ImageUrl });
      return result.acknowledged
     }catch(error){
        console.log(error)
     }
      
   
}
