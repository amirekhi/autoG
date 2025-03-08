"use client"

import { Fragment, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { useState  } from "react";
import { GetCategoryById, UpdateCategoryById } from "@/app/(admin)/Dash/Categories/CategoriesUpload";

import SpinningLoading from "./SpinningLoading";

import { storage } from "@/firebase/firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useLoading } from '@/hook/hooks';
import Image from "next/image";


const EditModal= ({ isOpen, closeModal, Id }) => {

      const [Cat, setCat] = useState({Describtion : '' , Name : '' });
      const [Imagee, setImagee] = useState(null);
      const [loading, withLoading] = useLoading();

     const GettingTheCat = async () => {
     const theCat = await GetCategoryById(Id)
     console.log(theCat)
     setCat(theCat)
     }

     const handleChange = (e) => {
        const { name, value } = e.target;
        setCat((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        
      }


      async function uploadImage(Image) {
      
        if(Cat.CategorieImage == null){  
         
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
      }else{
        return Cat.CategorieImage
      }
      }


      useEffect(() => {
        if(isOpen == true){
        GettingTheCat()
        }
      } , [isOpen])
    
    



      
            const handleFormsSubmition = async (e) => {
                  e.preventDefault()
                  withLoading(async () => {
                    const CategorieImage = await uploadImage(Imagee);
                    if(Cat.Name != '' || Cat.Describtion != '' ){
                  
                    const finalObj = { ...Cat , CategorieImage};
                    console.log(finalObj)
                
                    const res = await UpdateCategoryById( Id , finalObj) ;
                    if (res == true) {
                      showSuccessToast('Submited Successfully');
                      setCat({Describtion : '' , Name : ''})
                    }else{
                      showFailureToast('there was a problme , Not Updated')
                      setCat({Describtion : '' , Name : ''})
                    }
            }else{
              showInfoToast('Please Fill in the fields');
            }
          
          })
              
         }


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
         






 return ( <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto '>
          <div className='flex min-h-full items-center justify-center p-4 text-center '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-out duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative w-full max-w-xl max-h-[90vh] overflow-x-hidden overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                <button
                  type='button'
                  className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  onClick={closeModal}
                >
                  <Image
                    src='/close.svg'
                    alt='close'
                    width={20}
                    height={20}
                    className='object-contain'
                  />
                </button>

              

               <form onSubmit={handleFormsSubmition} className="w-[90%] mx-auto">
                               <label className="flex flex-col justify-center items-start mt-4">
                                 <span className="font-semibold">Name</span>
                                 <input type="text" name="Name" className="border border-gray-400 mt-1 shadow-xl w-full p-1  rounded-md" placeholder="Name" value={Cat?.Name}  onChange={handleChange} required/>
                               </label>

                               <label className="flex flex-col justify-center items-start mt-4">
                                 <span className="font-semibold">Describtion</span>
                                 <input type="text" name="Describtion" className="border border-gray-400 mt-1 shadow-xl w-full p-1  rounded-md" placeholder="Describtion" value={Cat?.Describtion} onChange={handleChange}  />
                               </label>

                               <label className="block bg-gray-300 p-4 rounded-md shadow-md  mt-8">
                                    <span className="block font-semibold mb-1 text-sm">Upload Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => { 
                                          setImagee(e.target.files[0])
                                          setCat((prevState) => ({...prevState , CategorieImage : null}))
                                        }}
                                        className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none file:cursor-pointer file:bg-gray-500 file:text-gray-200 file:rounded-md file:px-2 file:py-1"
                                    />
                                </label>
                             
                               <button type="submit" className={`w-[100px] h-[60px] block my-3 mt-5 transition duration-200 hover:scale-90  mx-auto rounded-full text-white bg-gray-500`} >{loading  ? (<SpinningLoading size={8} />) : ('Update') }</button>
                              </form>
                                <ToastContainer
                                                  transition={Slide}
                                                  style={{ width: "90%", maxWidth: "360px" }}
                                                />

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>)
};

export default EditModal;