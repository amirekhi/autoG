"use client"

import React, { useEffect, useState } from 'react'
import { storage } from "@/firebase/firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSearchParams } from "next/navigation";
import SpinningLoading from '@/components/SpinningLoading';

import Image from 'next/image';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';

import { Reorder } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import DropDownButton from '@/components/DropDownButton';
import { ToastContainer, toast, Slide } from "react-toastify";
import { GetCategoryById } from '../../Categories/CategoriesUpload';

const  Update = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    // const id = '6752c2e0b8a307224183cc0c'
    // const id = param.id
  
    
  
  

  const [ExternalImages, setExternalImages] = useState([]);
  
  const [LocalImages, setLocalImages] = useState([]);
  const [Images, setImages] = useState([]);
  const [Loading , setLoading] = useState(false)
  const [Error , setError] = useState("")
  const [Form ,setForm ] = useState({PE : { مدل : "" , سوخت : "" , سال : "" , کارکرد : "" , سازنده : "" , گیربکس  : "" } , EN : {make : "" , model : "" , year : "" , fuel_type: "" , Milage : "" , transmission : ""}})
  
const [selectedCat, setSelectedCat] = useState({Name : "Select an option"  });
  

  
    const showFailureToast = (error) => {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "custom-progress-bar-error",
        toastClassName: "custom-toast-error",
      });
    };
    const showToast = (error) => {
      toast.info(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "custom-progress-bar-error",
        toastClassName: "custom-toast-error",
      });
    };
    const showSuccessToast = (param) => {
      toast.success(param, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "custom-progress-bar-error",
        toastClassName: "custom-toast-error",
      });
    };
    
    
    const handleImageChange = (e) => {
   
    
    
      const files = Array.from(e.target.files);
      const imageUrls = files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
  
      // Append the new images to the existing ones 
      setImages((prevImages) => [...prevImages, ...files])
      setLocalImages((prevImages) => [...prevImages, ...imageUrls]);
      
    };

  
    const handleChange = (e) => {
      const {name , value} = e.target
      setForm(prevForm => ({
        ...prevForm,
        EN: {
          ...prevForm.EN, // Preserve existing properties of PE
          [name]: value   // Update only the specific property
        }
      }));
    }
    const handlePEChange = (e) => {
      const {name , value} = e.target
      setForm(prevForm => ({
        ...prevForm,
        PE: {
          ...prevForm.PE, // Preserve existing properties of PE
          [name]: value   // Update only the specific property
        }
      }));
      
    }

   const handleUPDTAE = async (id) => {
    
      const form = await fetch(`/api/GetCar/${id}` )
      const formDT = await form.json()
      const cat = await GetCategoryById(formDT.Categorie)
      setExternalImages(formDT.ImageUrls)
      setSelectedCat(cat)
      setForm({EN : formDT.EN , PE : formDT.PE})
      showToast('Content Loaded')
   }

  useEffect( () =>  {
    if(id){
     handleUPDTAE(id)   
    }
      
   } , [id])

   const handleHotBox = (e) => {
    setForm((prevState) => ({...prevState , Hot : !prevState.Hot}))

  }
 
  
 
   

  const handleSubmit  = async (e) => {
    e.preventDefault()

    setLoading(true)

    
    setError('') 
    
      
   
    const uploadedImageUrls = [...ExternalImages];

 if(Images.length > 0){
    for (const image of Images) {
     const storageRef = ref(storage, `uploads/${image.name}`);
     await uploadBytes(storageRef, image);
     const downloadURL = await getDownloadURL(storageRef);
      uploadedImageUrls.push(downloadURL);
    }
    
   
  }
    
    
    
   
  if(uploadedImageUrls.length > 0){

    const res = await fetch(`/api/Update/${id}` , { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...Form , ImageUrls: uploadedImageUrls ,  Categorie : selectedCat?._id}),
    })

    

    
      if (res.ok){
        
      showSuccessToast('Successfully added the Car !!')  }
      else{
        setError('try again later servers are down !!')
        showFailureToast('try again later servers are down !!')
      
      }
      setLoading(false)
      
    }else{
      setError('try again later servers are down image has failed !!') 
      showFailureToast('try again later servers are down image has failed !!')      
    }
 setLoading(false)
 setForm({ PE : { مدل : '' , سوخت : "" , سال : "" , کارکرد : "" , سازنده : "" , گیربکس  : "" } , EN : {make : '' , model : '' , year : '' , fuel_type: '' , Milage : '' , transmission : ''}})
   }


  
  // drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    
    const imageUrls = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    // Append the new images to the existing ones
    setImages((prevImages) => [...prevImages, ...files])
    setLocalImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const removeImage = (name) => {
    setLocalImages((prev) => prev.filter((Limg) => Limg.name !== name));
    setImages((prev) => prev.filter((img) => img.name !== name));
  };

  const removeExternalImage = (name) => {
    setExternalImages((prevImages) => prevImages.filter((img) => img !== name));
  };
  




  return (
   <section className='w-full  flex justify-center items-center  ' >
      
      <form  className='w-[90%] max-md:w-[90%] mx-auto p-5 rounded-md  bg-gray-300 border border-gray-500 flex flex-col justify-center items-center mb-6 '  onSubmit={handleSubmit}>
        <h2 className='font-bold text-blue-500 text-2xl'  >Update</h2>

        <div className='grid grid-cols-3 max-md:grid-cols-1 w-full max-2xl:mt-20'>


                <div className='w-full'>
                    
                <label className='flex flex-col  m-3 text-black w-[90%]' >
                          <span className='text-sm  font-semibold'>Make</span>
                          <input type="text"   className='bg-white w-[90%] m-1 p-2 border border-gray-500 text-black   rounded-md ' name='make'  value={Form.EN.make  || ''}  onChange={handleChange} placeholder='Make'   />
                      </label>
                      <label className='flex flex-col  m-3 text-black w-[90%]  ' >
                          <span className='text-sm font-semibold'>Model</span>
                          <input type="text"   className='bg-white w-[90%]  border border-gray-500 m-1 p-2 text-black   rounded-md '  name='model'  value={Form.EN.model || ''}   onChange={handleChange} placeholder='Model'   />
                      </label>
                    
                      <label className='flex flex-col  m-3 text-black  w-[90%]' >
                          <span className='text-sm  font-semibold'>Year</span>
                          <input type="number"  min="2000"  className='bg-white border border-gray-500 w-[90%] m-1 p-2 text-black   rounded-md ' name='year'  value={Form.EN.year  || ''} onChange={handleChange} placeholder='Year'   />
                      </label>
                    
                 
                      <label className='flex flex-col m-3 text-black w-[90%]' >
                          <span className='text-sm  font-semibold'>Fuel_type</span>
                          <input type="text"   className='bg-white w-[90%] m-1 p-2 border border-gray-500 text-black   rounded-md ' name='fuel_type'   value={Form.EN.fuel_type  || ''}  onChange={handleChange} placeholder='Fuel_type'   />
                      </label>
                       <label className='flex flex-col  m-3 text-black w-[90%] ' >
                            <span className='text-sm  font-semibold'>Milage</span>
                            <input type="number"  min="0" className='bg-white w-[90%] m-1 p-2 border border-gray-500 text-black   rounded-md '  name='Milage'  value={Form.EN.Milage  || ''}   onChange={handleChange} placeholder='city_mpg'   />
                        </label>
                        <label className='flex flex-col  m-3 text-black w-[90%]' >
                          <span className='text-sm  font-semibold'>Transmission</span>
                          <input type="text"   className='bg-white w-[90%] m-1 p-2 border border-gray-500 text-black   rounded-md ' name='transmission'   value={Form.EN.transmission  || ''}  onChange={handleChange} placeholder='Transmission'   />
                      </label>

                    
                    
                    
                </div>

                <div className='w-full' >
                <label className='flex flex-col  m-3 text-black w-[90%]' >
                          <span className='text-sm  font-semibold ml-auto mr-[12%] '>سازنده</span>
                          <input type="text"   className='bg-white w-[90%] m-1 p-2 border border-gray-500 text-black   rounded-md ' name='سازنده'  value={Form.PE.سازنده  || ''}  onChange={handlePEChange} placeholder='Make'   />
                      </label>
                      <label className='flex flex-col  m-3 text-black w-[90%]  ' >
                          <span className='text-sm font-semibold ml-auto mr-[12%]'>مدل</span>
                          <input type="text"   className='bg-white w-[90%]  border border-gray-500 m-1 p-2 text-black   rounded-md '  name='مدل'  value={Form.PE.مدل || ''}   onChange={handlePEChange} placeholder='Model'   />
                      </label>
                      <label className='flex flex-col  m-3 text-black  w-[90%]' >
                          <span className='text-sm  font-semibold ml-auto mr-[12%]'>سال ساخت</span>
                          <input type="number"  min="2000"  className='bg-white border border-gray-500 w-[90%] m-1 p-2 text-black   rounded-md ' name='سال'  value={Form.PE.سال  || ''} onChange={handlePEChange} placeholder='Year'   />
                      </label>
                      <label className='flex flex-col m-3 text-black w-[90%]' >
                          <span className='text-sm  font-semibold  ml-auto mr-[12%]'>سوخت</span>
                          <input type="text"   className='bg-white w-[90%] m-1 p-2 border border-gray-500 text-black   rounded-md ' name='سوخت'   value={Form.PE.سوخت  || ''}  onChange={handlePEChange} placeholder='Fuel_type'   />
                      </label>
                      <label className='flex flex-col  m-3 text-black w-[90%] ' >
                            <span className='text-sm  font-semibold ml-auto mr-[12%]'>کارکرد</span>
                            <input type="number"  min="0" className='bg-white w-[90%] m-1 p-2 border border-gray-500 text-black   rounded-md '  name='کارکرد'  value={Form.PE.کارکرد  || ''}   onChange={handlePEChange} placeholder='city_mpg'   />
                        </label>
                       
                       <label className='flex flex-col  m-3 text-black w-[90%]' >
                          <span className='text-sm  font-semibold ml-auto mr-[12%]'>گیربکس</span>
                          <input type="text"   className='bg-white w-[90%] m-1 p-2 border border-gray-500 text-black   rounded-md ' name='گیربکس'   value={Form.PE.گیربکس  || ''}  onChange={handlePEChange} placeholder='Transmission'   />
                      </label>
                    
                        
                </div>
                            <div className='w-full '>                 
                                <div className='w-full' >
                                <div className="p-5">
                                                      {/* Click-to-Add + Drag-and-Drop Area */}
                                                      <div
                                                        className="w-full h-64 border-4 border-dashed border-gray-400 rounded-lg p-5 text-center flex items-center justify-center cursor-pointer"
                                                        onDrop={handleDrop}
                                                        onDragOver={handleDragOver}
                                                        onClick={() => document.getElementById('file-input').click()} // Trigger input on click
                                                      >
                                                        <input
                                                          type="file"
                                                          id="file-input"
                                                          accept="image/*"
                                                          multiple
                                                          onChange={handleImageChange}
                                                          className="hidden"
                                                        />
                                                        <p className="text-gray-600 flex justify-center items-center flex-col">
                                                           <AiOutlineCloudUpload size={150}   />
                                                           Drag & Drop images here or click to select
                                                        </p>
                                                        
                                                      </div>
          
                                                  
                                                    </div>
                                 
                                 <div className='w-full'>
                                  <Reorder.Group values={Images} onReorder={setImages} >
                                      {Images?.map((img , index) => (
                                        <Reorder.Item value={img} key={img.name}>
                                         <div className='w-[90%] group relative mx-auto shadow-sm shadow-blue-800 rounded-xl  p-2 my-3 h-16 bg-blue-200 grid grid-cols-3 max-md:h-24 ' ><span className='p-3 bg-blue-600  text-white  flex justify-center items-center w-12 my-auto h-8 rounded-full' >{index + 1} -</span> <span className='p-3'>{img?.name?.substring(0, 8)}</span> <div className=' relative ' ><Image src={LocalImages.find((Loc) => Loc.name === img.name)?.url} fill sizes='100%' alt=' Uploading image'  className='w-full h-full object-cover' / ><button  className="absolute  -right-[70%] top-[50%] -translate-y-[50%]  px-2 py-1 text-md rounded opacity-0 group-hover:opacity-100 transition-opacity " onClick={() => removeImage(img.name)} ><FiTrash size={30} className='my-auto'/></button></div> </div>
                                        </Reorder.Item>
                                      ))}
                                   
                                  </Reorder.Group>
                                  <Reorder.Group values={ExternalImages} onReorder={setExternalImages}>
                                       {ExternalImages.map((img , index) => (
                                           <Reorder.Item value={ExternalImages[index]} key={img}>
                                           <div className='w-[90%] group relative mx-auto shadow-sm shadow-blue-800 rounded-xl  p-2 my-3 h-16 bg-blue-200 grid grid-cols-3 max-md:h-24 ' ><span className='p-3 bg-blue-600  text-white  flex justify-center items-center w-12 my-auto h-8 rounded-full' >{index + 1 } -</span><span className='p-3'>Extrenal</span>  <div className=' relative ' ><Image src={img} fill sizes='100%' alt=' Uploading image'  className='w-full h-full object-cover' / ><button  className="absolute  -right-[70%] top-[50%] -translate-y-[50%]  px-2 py-1 text-md rounded opacity-0 group-hover:opacity-100 transition-opacity " onClick={() => removeExternalImage(img)} ><FiTrash size={30} className='my-auto'/></button></div> </div>
                                          </Reorder.Item>
                                      ))}
                                  </Reorder.Group>
                                 </div>
                                </div>
                                <label className='flex items-center justify-around gap-2 m-3 text-black w-[90%]' >
                                    <span>HOT ?</span>
                                    <input type="checkbox"    className='bg-white w-8 h-8 m-2 p-2 border border-gray-500 text-black   rounded-md ' name='Hot'  checked={Form.Hot}  onChange={handleHotBox} placeholder='Hot?'   />
                                  </label>
          
                                  <label  className='flex flex-col gap-2 m-3 text-black w-[90%]' >
                                  <span>describtion</span>
                                  <textarea name="describtion" rows={2}  onChange={handleChange}  placeholder='describtion'  value={Form.describtion  || ''} className='bg-white w-[90%] m-2 p-2 border border-gray-500 text-black   rounded-md'   ></textarea>
                                </label>
                                 <label  className='flex flex-col gap-2 m-3 text-black w-[90%]' >
                                 <span className='w-full font-semibold'>توضیحات به فارسی</span>
                                 <textarea name="PersianDescribtion" rows={2}  onChange={handleChange}  placeholder='describtion'  value={Form.PersianDescribtion  || ''} className='bg-white w-[90%] m-2 p-2 border border-gray-500 text-black   rounded-md'   ></textarea>
                               </label>
          
                                <DropDownButton  selected={selectedCat} setSelected={setSelectedCat}/>
                            </div>

                </div> 
                <h1 className='text-white font-bold m-3' >{Error && (Error)}</h1>
        <button type="submit" className="bg-gray-500 py-3 px-8 outline-none w-fit text-white font-bold shadow-lg shadow-primary rounded-xl" >{Loading  ?  (<SpinningLoading size={8}/> ) : ('Send')}</button>
      </form>
    
       <ToastContainer
              transition={Slide}
              style={{ width: "90%", maxWidth: "360px" }}
            />

   </section>
  )
}

export default Update