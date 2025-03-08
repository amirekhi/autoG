"use client";


import { useEffect, useState } from 'react';
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

import { storage } from "@/firebase/firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UploadBlog } from './BlogUpload';

import { useLoading } from '@/hook/hooks';
import IosToggleSwitch from '@/components/IosToggleSwitch';
import FroalaEditorComponent from '@/components/FroalaEditorComponent';
import SpinningLoading from '@/components/SpinningLoading';

import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    const [Form , setForm ] = useState({HeroParag: '', HeroTitle: '' ,HeaderTitle : '' , HeaderAuthor : '' , HeaderPublishedDate: '' , Headerdescribtion: '' , HeroImgUrl : '' , HeaderImgUrl : ''})
    // const [Contents , setContents ] = useState([])
    const [QAs , setQAs ] = useState([])
    const [Links , setLinks ] = useState([])
    const [Url, setUrl] = useState({ address : '' });
    const [QAformData, setQAFormData] = useState({ question: "", answer: "" });

    const [loading, withLoading] = useLoading();

    const [HeroImage, setHeroImage] = useState(null);
    const [HeaderImage, setHeaderImage] = useState(null);


    const [UrlTitle , setUrlTitle ] = useState('')


    const [isToggleOn, setIsToggleOn] = useState(false);


    const [htmlContent, setHtmlContent] = useState('');


    function shortenString(str, maxLength) {
      if (str.length <= maxLength) return str;
      return str.substring(0, maxLength) + '...';
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

      useEffect(() => {
        if(isToggleOn == true){
          showInfoToast( '!! زبان به فارسی تبدیل شد ')
        }
      } ,[isToggleOn])



    async function uploadImage(Image) {
        try {
          if (Image != null) {
            const storageRef = ref(storage, `uploads/${Image.name}`);
            await uploadBytes(storageRef, Image);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL; // Return the download URL
          } else {
            showFailureToast('No image selected !!')
            return null; // Return null if no image is provided
          }
        } catch (error) {
          showFailureToast(`Error uploading file : ${error}`)
          throw error; // Propagate the error to the parent function
        }
      }




    const handleFormsSubmition = async ( ) => {
      
      withLoading(async () => {
        const HeroImgUrl = await uploadImage(HeroImage);
        const HeaderImgUrl = await uploadImage(HeaderImage);
        const Url = UrlTitle?.replaceAll(' ', '-');
        const finalObj = { ...Form, HeaderImgUrl, HeroImgUrl,  QAs, Links, Url , directionRtL : isToggleOn , htmlContent};
    
        const res = await UploadBlog(finalObj);
        if (res) showSuccessToast( 'Successfully added the blog !!')
        setForm({HeroParag: '', HeroTitle: '' , HeaderTitle : '' , HeaderAuthor : '' , HeaderPublishedDate: '' , Headerdescribtion: '' , HeroImgUrl : '' , HeaderImgUrl : ''})
        // setContents([])
        
        setQAs([])
        setLinks([])
        setIsToggleOn(false)
      })

    }
   

    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        
      }

      // const handleContentChange = (e) => {
      //   const { name, value } = e.target;
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     [name]: value,
      //   }));
      // };

      const handleQAChange = (e) => {
        const { name, value } = e.target;
        setQAFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleUrlChange = (e) => {
        const { name, value } = e.target;
        setUrl((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      // const handleContentSubmit = (e) => {
      //   e.preventDefault();
      //   if(formData.Title == '' || formData.Parag == ''){
      //       alert('Content  Field is empty')
      //       return
      //   }
      //   setContents((prevItems) => [...prevItems, formData]);
      //   setFormData({ Title: "", Parag: "" }); // Clear form fields
      // };


      const handleQASubmit = (e) => {
        e.preventDefault();
        if(QAformData.answer== '' || QAformData.question == ''){
            alert(' Qa Field is empty')
            return
        }
        setQAs((prevItems) => [...prevItems, QAformData]);
        setQAFormData({ answer: "", question: "" }); // Clear form fields
      };

      const handleUrlSubmit = (e) => {
        e.preventDefault();
        if(Url.address == ''){
            alert(' url address Field is empty')
            return
        }
        setLinks((prevItems) => [...prevItems, Url]);
        setUrl({ address : '' }); // Clear form fields
      };

  return (
        <section className='w-full ' >
              <ToastContainer
                    transition={Slide}
                    style={{ width: "90%", maxWidth: "360px" }}
                  />
           <div className='w-[90%]  mx-auto ' >
            <div >
               <h3 className='m-1'>فارسی ؟</h3>
              <IosToggleSwitch value={isToggleOn} onChange={setIsToggleOn}/></div>
             <form className='w-full'>
               <div className='w-full mt-20'>
                    <h2 className={`text-3xl font-semibold my-6 ${isToggleOn && ('flex justify-end items-center')}`}>{isToggleOn ?  ('بخش قهرمان') :  ('Hero')}</h2>
                     <div className={`w-full grid  gap-4 max-md:grid-cols-1 ${isToggleOn ?  ('[grid-template-columns:_repeat(3,_1fr)] [direction:rtl]') :  ('grid-cols-3 ')} `}>

                            <label className='block  bg-gray-300 p-4 rounded-md shadow-md'  >
                                <span className='block  text-gray-500 font-semibold mb-2 '> URlTitle</span>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                    placeholder="Enter title"
                                    onChange={(e) => {setUrlTitle(e.target.value)}}
                                    name='UrlTitle'
                                    value={UrlTitle}
                                />
                            </label>
                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md ">
                                <span className="block  text-gray-500 font-semibold mb-2">Title</span>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                    placeholder="Enter title"
                                    onChange={handleChange}
                                    name='HeroTitle'
                                    value={Form.HeroTitle }
                                />
                            </label>
                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md ">
                                <span className="block  text-gray-500 font-semibold mb-2">Parag</span>
                                <input
                                   required
                                    type="text"
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                    placeholder="Enter title"
                                    onChange={handleChange}
                                    name='HeroParag'
                                    value={Form.HeroParag }
                                />
                            </label>
                            <label className="block bg-gray-300 p-4 rounded-md shadow-md ">
                                <span className="block text-gray-500 font-semibold mb-2">Upload Image</span>
                                <input
                                    required
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => { setHeroImage(e.target.files[0])}}
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none file:cursor-pointer file:bg-gray-500 file:text-gray-200 file:rounded-md file:px-4 file:py-2"
                                />
                            </label>

                    </div>

               </div>


               <div className='w-full mt-20'>
                    <h2 className={`text-3xl font-semibold mt-20 ${isToggleOn && ('flex justify-end items-center')}`}>{isToggleOn ?  ('بخش هدر جذاب') :  ('Header')}</h2>
                     <div className={`w-full grid ${isToggleOn ?  ('[grid-template-columns:_repeat(3,_1fr)] [direction:rtl]') :  ('grid-cols-3 ')} gap-4 my-6 max-md:grid-cols-1`}>
                        
                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md ">
                                <span className="block  text-gray-500 font-semibold mb-2">Title</span>
                                <input
                                    required    
                                    type="text"
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                    placeholder="Enter title"
                                    onChange={handleChange}
                                    name='HeaderTitle'
                                    value={Form.HeaderTitle }
                                />
                            </label>
                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md ">
                                <span className="block  text-gray-500 font-semibold mb-2">Author</span>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                    placeholder="Enter title"
                                    onChange={handleChange}
                                    name='HeaderAuthor'
                                    value={Form.HeaderAuthor}
                                />
                            </label>
                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md ">
                                <span className="block  text-gray-500 font-semibold mb-2">describtion</span>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                    placeholder="Enter title"
                                    onChange={handleChange}
                                    name='Headerdescribtion'
                                    value={Form.Headerdescribtion}
                                />
                            </label>
                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md ">
                                <span className="block  text-gray-500 font-semibold mb-2">PublishedDate</span>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                    placeholder="Enter title"
                                    onChange={handleChange}
                                    name='HeaderPublishedDate'
                                    value={Form.HeaderPublishedDate}
                                />
                            </label>
                            <label className="block bg-gray-300 p-4 rounded-md shadow-md ">
                                <span className="block text-gray-500 font-semibold mb-2">Upload Image</span>
                                <input
                                    required
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => { setHeaderImage(e.target.files[0])}}
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none file:cursor-pointer file:bg-gray-500 file:text-gray-200 file:rounded-md file:px-4 file:py-2"
                                />
                            </label>

                    </div>

               </div>
               
             </form>
             {/* onSubmit={handleContentSubmit} */}
             {/* belonged to the form below */}
                     <div className='w-full' >
                        <div className='w-full mt-20'>
                             <h2 className={`text-3xl font-semibold my-6 ${isToggleOn && ('flex justify-end items-center')}`}> {isToggleOn ?  ('بخش مطالب اصلی') :  ('Content')}</h2>
                             <FroalaEditorComponent  OnSubmit={setHtmlContent}  />
                                     {/* <div className='w-full grid grid-cols-3 gap-4 max-md:grid-cols-1'>
                                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md col-span-1 ">
                                                      <span className="block  text-gray-500 font-semibold mb-2">Title</span>
                                                    <input  
                                                        required
                                                        className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                                        type="text"
                                                        placeholder="Enter title"
                                                        onChange={handleContentChange}
                                                        name='Title'
                                                        value={formData.Title}
                                                    />
                                            </label>
                                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md  col-span-2 max-md:col-span-1">
                                               <span className="block  text-gray-500 font-semibold mb-2">Paragraph</span>
                                                    <textarea
                                                        required
                                                        type="text"
                                                        className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                                        placeholder="Enter title"
                                                        onChange={handleContentChange}
                                                        name='Parag'
                                                        value={formData.Parag}
                                                    />
                                           </label>

                                    </div> */}
                                    {/* <div className='flex justify-center items-center w-full mt-12'>
                                            <button className='p-4 w-[120px] h-[60px] rounded-full bg-gray-500 text-white  ' type='submit' >Add</button>
                                            <div className='flex justify-start items-center gap-4 ml-12'>
                                                {
                                                    Contents?.map((content ) => (
                                                        <p className=' h-[60px] rounded-full bg-gray-300 p-4 flex justify-center items-center gap-2 ' key={content.Title}>
                                                            {content.Title}
                                                            <button><AiOutlineClose/></button>
                                                        </p>
                                                    ))
                                                }
                                            </div>
                                     </div> */}
                                    
                            </div>
                     </div>


                     <form className='w-full' onSubmit={handleQASubmit}>
                        <div className='w-full mt-20'>
                             <h2 className={`text-3xl font-semibold my-6 ${isToggleOn && ('flex justify-end items-center')}`}> {isToggleOn ?  ('بخش سوال و پاسخ ') :  ('QA')}</h2>
                                     <div className={`w-full grid ${isToggleOn ?  ('[grid-template-columns:_repeat(3,_1fr)] [direction:rtl]') :  ('grid-cols-3 ')} gap-4 max-md:grid-cols-1 `}>
                                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md col-span-1 ">
                                                      <span className="block  text-gray-500 font-semibold mb-2">Question</span>
                                                    <input
                                                        className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                                        type="text"
                                                        placeholder="Enter title"
                                                        onChange={handleQAChange}
                                                        name='question'
                                                        value={QAformData.question}
                                                    />
                                            </label>
                                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md  col-span-2 max-md:col-span-1">
                                               <span className="block  text-gray-500 font-semibold mb-2">Answer</span>
                                                    <textarea
                                                        type="text"
                                                        className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                                        placeholder="Enter title"
                                                        onChange={handleQAChange}
                                                        name='answer'
                                                        value={QAformData.answer}
                                                    />
                                           </label>

                                    </div>
                                    <div className='flex justify-center items-start w-full mt-12'>
                                            <button className='p-4 w-[120px] h-[60px] rounded-full bg-gray-500 text-white  ' type='submit' >Add</button>
                                            <div className='flex justify-start flex-col items-center gap-4 ml-12'>
                                                {
                                                    QAs?.map((qa ) => (
                                                        <p className=' h-[60px] rounded-full bg-gray-300 p-4 flex justify-center items-center gap-2 ' key={qa.question}>
                                                            { shortenString(qa.question , 8)}
                                                            <button><AiOutlineClose/></button>
                                                        </p>
                                                    ))
                                                }
                                            </div>
                                     </div>
                                    
                            </div>
                     </form>

                     
                     <form className='w-full' onSubmit={handleUrlSubmit}>
                        <div className='w-full mt-20'>
                             <h2 className={`text-3xl font-semibold my-6 ${isToggleOn && ('flex justify-end items-center')}`}> {isToggleOn ?  ('(لینک ها (ادرس ها') :  ('Links')}</h2>
                                     <div className={`w-full grid ${isToggleOn ?  ('[grid-template-columns:_repeat(3,_1fr)] [direction:rtl]') :  ('grid-cols-3 ')} gap-4 max-md:grid-cols-1`}>
                                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md col-span-1 ">
                                                      <span className="block  text-gray-300 font-semibold mb-2">Link</span>
                                                    <input
                                                        className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                                        type="text"
                                                        placeholder="Enter title"
                                                        onChange={handleUrlChange}
                                                        name='address'
                                                        value={Url.address}
                                                    />
                                            </label>
                                    

                                    </div>
                                    <div className='flex justify-center items-start w-full mt-12'>
                                            <button className='p-4 w-[120px] h-[60px] rounded-full bg-gray-500 text-white  ' type='submit' >Add</button>
                                             <div className='flex justify-start items-center flex-col  gap-4 ml-12'>
                                                {
                                                    Links?.map((lin ) => (
                                                        <p className=' h-[60px] rounded-full bg-gray-300 p-4 flex  justify-center items-center gap-2 ' key={lin.address}>
                                                            {shortenString(lin.address , 8)}
                                                            <button><AiOutlineClose/></button>
                                                        </p>
                                                    ))
                                                }
                                            </div> 
                                     </div> 
                                    
                            </div>
                     </form>
                    
             
             <button onClick={handleFormsSubmition} className='w-[300px] h-[80px] bg-green-400 ml-auto block mt-12 rounded-full text-gray-600 duration-200 hover:scale-90 transition' >{loading ? ( <SpinningLoading size={8}/>  ) : ( isToggleOn ? ('نشر')  : ('publish'))}</button>
           </div>   
        </section>
  )
}

export default page








// {
//     id: '2',

//   Hero : {
//     Title : 'Blogs',
//     imgUrl :  '/bgimg.jpg',
//     Parag : 'Get informed of everything that is going on in the cars world',
//   },

//   Header : {
//     Title : 'Get informed of everything that is going on in the cars world',
//     Author : 'Amir ekh',
//     PublishedDate : 'Published on 23 Dec, 2021, 11:01 AM IST Updated on 27 Jun, 2024, 12:20 PM IST',
//     imgUrl : '/bgimg.jpg',
//     describtion : 'If you are planning to buy a new car or already own one, the names of car parts and components might seem like foreign languages. As a car owner, having basic car knowledge and knowing about essential car parts will go a long way in helping you take care of your car. For instance, basic automotive knowledge can come in handy if your car breaks down in the middle of nowhere. Read ahead to know more about essential car parts.',
//   },

//   Contents :[
//     {
//       Title: 'title',
//       parag:'If you are planning to buy a new car or already own one, the names of car parts and components might seem like foreign languages. As a car owner, having basic car knowledge and knowing about essential car parts will go a long way in helping you take care of your car. For instance, basic automotive knowledge can come in handy if your car breaks down in the middle of nowhere. Read ahead to know more about essential car parts.'
//      },
//     {
//       Title: 'title',
//       parag:'If you are planning to buy a new car or already own one, the names of car parts and components might seem like foreign languages. As a car owner, having basic car knowledge and knowing about essential car parts will go a long way in helping you take care of your car. For instance, basic automotive knowledge can come in handy if your car breaks down in the middle of nowhere. Read ahead to know more about essential car parts.'
//      },
//     {
//       Title: 'title',
//       parag:'If you are planning to buy a new car or already own one, the names of car parts and components might seem like foreign languages. As a car owner, having basic car knowledge and knowing about essential car parts will go a long way in helping you take care of your car. For instance, basic automotive knowledge can come in handy if your car breaks down in the middle of nowhere. Read ahead to know more about essential car parts.'
//      },
//     {
//       Title: 'title',
//       parag:'If you are planning to buy a new car or already own one, the names of car parts and components might seem like foreign languages. As a car owner, having basic car knowledge and knowing about essential car parts will go a long way in helping you take care of your car. For instance, basic automotive knowledge can come in handy if your car breaks down in the middle of nowhere. Read ahead to know more about essential car parts.'
//      },
//  ],
 
//  QAs :  [
//   {
//     question: 'yous winddow shopper' ,
//     answer :'mad at me'

// },
//   {
//     question: 'yous winddow shopper' ,
//     answer :'mad at me'

// },
//   {
//     question: 'yous winddow shopper' ,
//     answer :'mad at me'

// },
//   {
//     question: 'yous winddow shopper' ,
//     answer :'mad at me'

// },
// ],
//  Explore : {
//   Links: [{Url:'www.google,asdasu/fnadss'},{Url:'www.google,asasu/dfnadss'},{Url:'www.googe,asdasu/dfnadss'},{Url:'www.gogle,asdasu/dfnadss'},]
//  } 
  

// }