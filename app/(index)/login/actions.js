"use server";

import { z } from "zod";
import { createSession , deleteSession, gettingSession } from "@/lib/session";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongo/mongodb";






const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});





const SignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .trim(),
  phoneNumber: z
    .string()
    .regex(/^0\d{9,14}$/, { message: "Phone number must start with 0 and be between 10 and 15 digits" })
    .trim(),
});



export async function login(prevState , formData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data = {
    ...result.data,
    email: result.data.email.toLowerCase(),
  };

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const res = await db.collection('Users').findOne({ email : data.email} , {projection :  {_id:0 }} );
  
 

 if(res != null) {
        if ( data.email !== res.email || data.password !== res.password) {
      return {
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

 }else{
  console.log('user Not Found')
  return {
    errors: {
      email: ["Invalid email or password"],
    },
  };
 }

  
 
 
  
  await createSession(res.username , res.phoneNumber , res.email);
  return {
    errors: {
      res: ['User-logged'],
    }
}
  
}


export async function SignUp (prevState , formData) {
  const result = SignUpSchema.safeParse(Object.fromEntries(formData));

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  


  const data = {
    ...result.data,
    email: result.data.email.toLowerCase(),
  };
 
  const exist = await db.collection('Users').findOne({ email : data.email } );
  
  if(exist != null) {
    console.log('user Exist')
    return {
      errors: {
        email: ["user exist"],
      }
  }
  }
  const res = await db.collection('Users').insertOne(data);
  
  if(res.acknowledged == true && res != null){
      await createSession(data.username , data.phoneNumber , data.email);
      return {
        errors: {
          res: ['User-added'],
        }
    }
  }
 
  




}

export async function logout( requestUrl) {
  await deleteSession();
  if (requestUrl != null) {
    redirect(requestUrl);
  }
  
}





export const gettingClientsideSession = async () => {
const session = await gettingSession()
 return session
};