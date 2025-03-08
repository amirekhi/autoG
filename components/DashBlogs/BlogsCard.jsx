"use client"


import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa';
import { FaTimes , FaEdit } from 'react-icons/fa';
import { DeleteBlog } from '@/app/(admin)/Dash/CreateBlog/BlogUpload';

import { ToastContainer, toast, Slide } from "react-toastify";

import { useRouter } from 'next/navigation';

const BlogsCard = ({blog}) => {



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


  const router = useRouter();

  const handleDelete = async () => {
    const res = await DeleteBlog(blog.Url)
    
    if(res == true){
      showSuccessToast("Successfully Deleted")
      window.location.reload()
    }else{
      showFailureToast('failed to delete')
    }

  }


  const handleEdit = () => {
    router.push(`/Dash/CreateBlog/Update?id=${blog._id}`)
  }


  return (
    <div className='rounded-lg w-[70%] h-[400px] max-lg:w-[90%] pb-4 mt-20 mx-auto shadow-xl border-2 text-[#696969] border-gray-400 hover:scale-105 duration-200 transition flex justify-start items-start  flex-col'>
          <Link href={`/blog/${blog.Url}`} className='w-full h-[45%] block   '> 
            <div className='w-full h-full relative' >
                  <Image src={  blog.HeroImgUrl ||'/bgimg.jpg'} className='w-full h-full object-cover' fill sizes='100%' alt={blog.HeroTitle}/>
              </div>
            </Link>
            <div className='w-full h-[45%]  relative ' > 
                <button   className='block w-8  ml-auto z-40  mt-2' onClick={handleDelete} ><FaTimes/></button>
                <button   className='block w-8  ml-auto z-40 mt-2' onClick={handleEdit} ><FaEdit/></button>
                <h2 className='ml-2' ><span className='text-xl font-semibold text-black'>Title : </span>{blog.HeaderTitle}</h2>
                <p className='ml-2 ' >
                <span className="text-xl font-semibold text-black">Description: </span>
                <span className="line-clamp-2 m-2">{blog.Headerdescribtion}</span>
                </p>
                <p className='ml-2' ><span className='text-xl font-semibold text-black'>Date : </span>{blog.HeaderPublishedDate}</p>
                <Link href={`/blog/${blog.Url}`} className='block w-8 ml-auto '><FaArrowRight/></Link>
            </div>
         <ToastContainer
                    transition={Slide}
                    style={{ width: "90%", maxWidth: "360px" }}
                  />
    </div>
  )
}

export default BlogsCard