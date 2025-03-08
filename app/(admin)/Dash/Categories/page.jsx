"use client"

import { FaSearch } from 'react-icons/fa';

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLoading } from '@/hook/hooks';
import { storage } from "@/firebase/firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { DeletingCategories, GetCategories, UploadCategorie } from './CategoriesUpload';
import { ToastContainer, toast, Slide } from "react-toastify";
import SpinningLoading from '@/components/SpinningLoading';
import CatTable from '@/components/CatTable';
import EditModal from '@/components/EditModal';



const page = () => {
    const [Image, setImage] = useState(null);
     const [loading, withLoading] = useLoading();
     const [Form , setForm ] = useState({Name : '' , Describtion : '' , PersianDescribtion : ''})
     const [Cats , setCats ] = useState([])
      const [searchedName, setSearchedName] = useState('');

      const [isOpen, setIsOpen] = useState(false);
        
  const [selectedCategories, setSelectedCategories] = useState({});
  const [WhatIsOpen , setWhatIsOpen] = useState(false)
  const [Columns , setColumns] = useState({Name : true , Describtion : true })

  const handleOpen = (param) => {
    if(WhatIsOpen == param){
      setWhatIsOpen('none')
    }else{
     setWhatIsOpen(param)
    }
  }
 
  const GetCat = async () => {
        const res = await GetCategories()
        setCats(res)
      }


  const handleCheckboxChange = (id) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the selected state
    }));
  };

   const  handleDelete = async () => {   
 
    const trueKeys = Object.keys(selectedCategories).filter(key => selectedCategories[key]);
    console.log(trueKeys)
    const res = await DeletingCategories(trueKeys)
    if (res == true){
      showSuccessToast('Deleted Successfully')
    }else{
      showFailureToast('Somthing went wrong')
    }
    
    setSelectedCategories([])
    GetCat()
  
   }
    

     const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      
    }
  

    useEffect(() => {
    

      GetCat()
     }  , [])


    async function uploadImage(Image) {
        try {
          if (Image != null) {
            const storageRef = ref(storage, `uploads/${Image.name}`);
            await uploadBytes(storageRef, Image);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL; // Return the download URL
          } else {
            
            return null; // Return null if no image is provided
          }
        } catch (error) {
          console.error('Error in uploading file:', error);
          throw error; // Propagate the error to the parent function
        }
      }

      const handleFormsSubmition = async (e) => {
            e.preventDefault()
            withLoading(async () => {
              const CategorieImage = await uploadImage(Image);
              if(Form.Name != '' || Form.Describtion != '' ){
            
              const finalObj = { ...Form , CategorieImage};
              
          
              const res = await UploadCategorie(finalObj) ;
              if (res == true) {
                showSuccessToast('Submited Successfully');
                setForm({Description: '' , Name : ''})
                await GetCat()
              }else{
                showFailureToast('there was a problme , Not Submited')
                setForm({Description: '' , Name : ''})
              }
      }else{
        showInfoToast('Please Fill in the fields');
      }
    
    })
        
   }


   const handleEdit = () => {
    setIsOpen(true)
   }

          const handleColumns = (param) => {
            if(Columns[param] == true)   {   
              setColumns((pervState) => ({ ...pervState ,  [param]: false, }) )
          }else{
            setColumns((pervState) => ({ ...pervState ,  [param]: true, }) )
          }
        }

          
            const handleSubmitSearch = async (e) => {
              e.preventDefault(); // Prevent page reload on form submit
              
              
              // Log the value of searchedName
              const res = await GetCategories(searchedName)
              showInfoToast(`results for "${searchedName}" `) 
              setCats(res)
                  
              
          
            }
          
            const handleChangeSearch = (e) => {
              setSearchedName(e.target.value); // Update state with the input value
            };

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
                const showInfoToast = (param) => {
                  toast.info(param, {
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

  return (
    <section className='w-[95%] mx-auto h-full flex justify-between items-start max-md:flex-col pt-20'  >
      <div  className=' flex justify-start items-start flex-col relative max-md:w-full'>
            <h1 className='text-3xl text-shadow-3d-subtle max-md:w-full max-md:flex max-md:justify-center max-md:items-center  max-md:text-3xl   mb-12 '>Add New Categories</h1>
            <form  onSubmit={handleFormsSubmition} >
                <label className='flex justify-center items-start flex-col w-[400px] mb-16 max-md:w-full max-md:items-center' >
                    <span className='mb-1 text-sm'>Name</span>
                    <input type="text" name='Name'  className='border-2 border-gray-400 rounded-md w-full p-2 max-md:w-[90%]' value={Form.Name} onChange={handleChange} />
                    <p className='text-gray-400 text-sm max-md:text-center'>The name is how it appears on your site.</p>
                </label>
                <label  className='flex justify-center items-start flex-col w-[400px] mb-16  max-md:w-full max-md:items-center' >
                    <span className='mb-1 text-sm'>Describtion</span>
                    <textarea name='Describtion'  className='border-2 border-gray-400 rounded-md w-full p-2 max-md:w-[90%]' value={Form.Describtion}  onChange={handleChange} />
                    <p className='text-gray-400 text-sm max-md:text-center'>The description is not prominent by default however, some themes may show it.</p>
                </label>
                <label  className='flex justify-center items-start flex-col w-[400px] mb-16  max-md:w-full max-md:items-center' >
                    <span className='mb-1 text-sm text-right'>توضیحات به فارسی</span>
                    <textarea name='PersianDescribtion'  className='border-2  border-gray-400 rounded-md w-full p-2 max-md:w-[90%]' value={Form.PersianDescribtion}  onChange={handleChange} />
                    <p className='text-gray-400 text-right text-sm max-md:text-center'>توضیحات به صورت پیش‌فرض برجسته نیستند، اما برخی از قالب‌ها ممکن است آن را نمایش دهند.</p>
                </label>

                <label className="block bg-gray-300 p-4 rounded-md shadow-md ">
                                    <span className="block font-semibold mb-1 text-sm">Upload Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => { setImage(e.target.files[0])}}
                                        className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none file:cursor-pointer file:bg-gray-500 file:text-gray-200 file:rounded-md file:px-2 file:py-1"
                                    />
                </label>

                  <button className='rounded-full hover:scale-95 mx-auto mt-12 block transition duration-300 ease-in-out bg-blue-600 text-white font-bold h-[60px] w-[120px]'  type='submit' > {loading ? (<div className="flex items-center justify-center h-full w-full ">
              <div className={`w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin`}></div>
            </div>) : ('Submit')}</button>
      
            </form>
        </div>

        
        <div className='w-[50%]  max-md:w-full max-md:mt-20 ' >
            <div className='w-[95%] h-[10%] flex items-center justify-end   mx-auto' >
                <div>
                  <div className={`inline-block mr-6 ${Object.values(selectedCategories).some((value) => value === true) ? ('') :  ('hidden')} `}>
                      <button className={`px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300   `} onClick={handleDelete}>Delete</button>
                      <button className={`px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ${Object.keys(selectedCategories).filter(key => selectedCategories[key]).length >= 2 ? ('hidden') : ('')}`} onClick={handleEdit}  >Edit</button>
                  </div>
                  <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ' onClick={() => {handleOpen('Filter')}} >Filter</button>
                  <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ' onClick={() => {handleOpen('Column')}} >Columns</button>
                </div> 
            </div>

             {WhatIsOpen == 'Filter' && (
                 <form className="mb-12" onSubmit={handleSubmitSearch} >
                 <label className="flex w-[50%] mx-auto mt-12 items-center bg-gray-200 border-2 border-stone-400 rounded-lg overflow-hidden">
                 <button type='submit' > <FaSearch className="text-gray-600 mx-3 text-xl" /></button>
                   <input
                     type="text"
                     placeholder="Search..."
                     value={searchedName} // Bind the value to the state
                     onChange={handleChangeSearch} // Update state as the user types
                     className="flex-grow p-2 outline-none text-gray-700 bg-transparent"
                   />
                  
                 </label>
                 
                 </form>
               
                 )}
                 {WhatIsOpen == 'Column' && (
                  <div className='mb-12 w-[50%] mx-auto  mt-12'>
                     <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ' onClick={() => {handleColumns('Name')}} >Name</button>
                      <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 max-md:hidden ' onClick={() => {handleColumns('Describtion')}}  >Describtion</button>
                     
                  </div>
                 )}

                 

            <div className={`h-[60px] w-[90%] border-b-2  border-stone-400 mx-auto grid grid-cols-${Object.keys(Columns).filter(key => Columns[key]).length + 1} m-12 max-md:grid-cols-2`}>            
            
            
               {Columns.Name  == true && <p className='self-center  col-span-1 ' >Name </p>  }
               {Columns.Describtion  == true && <p className='self-center  col-span-1  ' >Describtion </p> }
                <p className='self-center  max-md:hidden col-span-1 ' >Options</p>
               
              </div>
            {Cats ? (Cats.map((res , index) => (
            <CatTable Columns={Columns}  handleCheckboxChange={handleCheckboxChange} key={index} index={index} res={res} selectedReservations={selectedCategories} />
            ))) : (<SpinningLoading size={16} />)}

       </div>
        
                     <ToastContainer
                          transition={Slide}
                          style={{ width: "90%", maxWidth: "360px" }}
                        />
                  <EditModal isOpen={isOpen} closeModal={() => setIsOpen(false)} Id={Object.keys(selectedCategories).filter(key => selectedCategories[key])[0]} />
    </section>
  )
}

export default page