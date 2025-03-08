"use client"

import React from 'react'
import { useState } from 'react'

import { storage } from "@/firebase/firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UploadBrands } from '@/app/(admin)/Dash/Brands/BrandActions';
import { useLoading } from '@/hook/hooks';
import SpinningLoading from './SpinningLoading';



import { ToastContainer, toast , Slide  } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BrandsForm = () => {
   const [Image , setImage] = useState(null)
   const [loading, withLoading] = useLoading();


   const showAlert = () => {
    toast.success("Successfully added the New Brand!", {
      position: "top-right",
      autoClose: 5000, // Time in milliseconds
      hideProgressBar: false, // Show the progress bar
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressClassName: "bg-red-600 h-1"
    });
  };


   async function uploadImage(Image) {
    try {
      if (Image != null) {
        const storageRef = ref(storage, `uploads/${Image.name}`);
        await uploadBytes(storageRef, Image);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL; // Return the download URL
      } else {
        console.log('No image selected.');
        return null; // Return null if no image is provided
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Propagate the error to the parent function
    }
  }



   const handleSubmit = async (e) =>  {
    e.preventDefault()
    withLoading(async () => {
      const ImageUrl  = await uploadImage(Image)
          if(ImageUrl != null) {
          const res = await UploadBrands({ImageUrl})
          if(res == true ){
              showAlert()
              // window.location.reload()
            }
          }
    })
    
    



   }


  return (
    <section className='w-full '>
        <form  className='w-[80vw] mx-auto flex justify-center items-center max-md:flex-col' onSubmit={handleSubmit}>
            <label className=' bg-gray-400 block p-8 mt-20 rounded-lg' >
                <span className=' block mb-2 text-white font-semibold'>Picture</span>
                                <input
                                    required
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => { setImage(e.target.files[0])}}
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none file:cursor-pointer file:bg-gray-500 file:text-gray-200 file:rounded-md file:px-4 file:py-2"
                                />
            </label>

            <button className='w-[120px] h-[60px] p-2 bg-gray-300 rounded-full block mt-12 ml-12 max-md:mx-auto' type='submit' >{loading ? (<SpinningLoading size={8}/> ) :  ('Upload')} </button>

        </form>
         <ToastContainer    
             transition={Slide}
            toastClassName="rounded-lg shadow-lg"
            bodyClassName="text-sm"
            style={{ width: "90%", maxWidth: "360px" }}
             />
    </section>
   
  )
}

export default BrandsForm