"use client";


import { useState ,useEffect } from 'react';
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

import { storage } from "@/firebase/firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UpdateBlog } from '../BlogUpload';

import { useLoading ,useGettingBlog } from '@/hook/hooks';

import { useSearchParams } from 'next/navigation';
import FroalaEditorComponent from '@/components/FroalaEditorComponent';
import IosToggleSwitch from '@/components/IosToggleSwitch';
import SpinningLoading from '@/components/SpinningLoading';

import { ToastContainer, toast, Slide } from "react-toastify";

const page = () => { 
    // getting the blog to edit
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Extract the 'id' parameter from the URL
    const [ data ,  blogloading ] = useGettingBlog({ id: id });

    const [Form , setForm ] = useState({HeroParag: '', HeroTitle: '' , HeaderTitle : '' , HeaderAuthor : '' , HeaderPublishedDate: '' , Headerdescribtion: '' , HeroImgUrl : '' , HeaderImgUrl : ''}) 
    const [QAs , setQAs ] = useState([])
    const [Links , setLinks ] = useState([])
    const [Url, setUrl] = useState({ address : '' });
    const [QAformData, setQAFormData] = useState({ question: "", answer: "" });

    const [ExternalHeroImgUrl, setExternalHeroImgUrl] = useState(null);
    const [ExternalHeaderImgUrl, setExternalHeaderImgUrl] = useState(null);


    const [loading, withLoading] = useLoading();
   

    const [HeroImage, setHeroImage] = useState(null);
    const [HeaderImage, setHeaderImage] = useState(null);


    const [isToggleOn, setIsToggleOn] = useState(false);

    const [UrlTitle , setUrlTitle ] = useState('')


    const [htmlContent, setHtmlContent] = useState(null);


    
      const showFailureToast = (error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 1500,
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
          autoClose: 1500,
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
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressClassName: "custom-progress-bar-error",
          toastClassName: "custom-toast-error ",
          style: {
            marginTop: '50px', // Add spacing from the top
          
          },
        });
      };

        useEffect(() => {
              if(isToggleOn == true){
                showInfoToast( '!! زبان به فارسی تبدیل شد ')
              }
            } ,[isToggleOn])
      


    //updating states with the data that came from the hook 
    useEffect(() => {
      
        if (data) {
          
          setForm({HeroParag: data.HeroParag , HeroTitle: data.HeroTitle ,HeaderTitle : data.HeaderTitle , HeaderAuthor : data.HeaderAuthor  , HeaderPublishedDate: data.HeaderPublishedDate , Headerdescribtion: data.Headerdescribtion , HeroImgUrl : data.HeroImgUrl, HeaderImgUrl : data.HeaderImgUrl});
          setQAs(data.QAs)
          setLinks(data.Links)
          setHtmlContent(data.htmlContent)      
          setUrlTitle( data.Url)
          setIsToggleOn(data.directionRtL)
          showInfoToast('Content has been loaded you can edit now !!')
          setExternalHeaderImgUrl(data.HeaderImgUrl)
          setExternalHeroImgUrl( data.HeroImgUrl)

        }
      }, [data]);

   
   


    


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




      const handleFormsSubmition = async () => {
        withLoading(async () => {
          // Use existing URLs if no new image is selected
          const HeroImgUrl = HeroImage ? await uploadImage(HeroImage) : ExternalHeroImgUrl;
          const HeaderImgUrl = HeaderImage ? await uploadImage(HeaderImage) : ExternalHeaderImgUrl;
      
          const Url = UrlTitle?.replaceAll(' ', '-');
          const finalObj = { 
            ...Form, 
            HeaderImgUrl, 
            HeroImgUrl,  
            QAs, 
            Links, 
            Url, 
            directionRtL: isToggleOn, 
            htmlContent
          };
      
          const res = await UpdateBlog(finalObj, id);
          
          if (res === true) {
            showSuccessToast('Submitted Successfully !!');
          } else {
            showFailureToast('There was a problem, Not Submitted !!');
          }
        });
      };
      
   

    
    
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


      const handleLinkremoval = (indexToRemove) => {
         setLinks((prevArray) => prevArray.filter((_, index) => index !== indexToRemove))
      }
      const handleQAremoval = (indexToRemove) => {
         setQAs((prevArray) => prevArray.filter((_, index) => index !== indexToRemove))
      }

  return (
        <>
        <div className=' mx-auto '>{blogloading  && (<SpinningLoading size={16} />)}</div>
        <section className='w-full ' >
           <div className='w-[90%]  mx-auto ' >
                <div >
                   <h3 className='m-1'>فارسی ؟</h3>
                    <IosToggleSwitch value={isToggleOn} onChange={setIsToggleOn}/>
                </div>
             <form className='w-full'>
               <div className='w-full mt-20'>
                    <h2 className='text-3xl font-semibold my-6'>Hero</h2>
                     <div className='w-full grid grid-cols-3 gap-4 max-md:grid-cols-1'>

                            <label className="block  bg-gray-300 p-4 rounded-md shadow-md ">
                                <span className="block  text-gray-500 font-semibold mb-2">URlTitle</span>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none placeholder-gray-500"
                                    placeholder="Enter Url"
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
                                    placeholder="Enter Parag"
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
                                    onChange={(e) => { 
                                      setHeroImage(e.target.files[0])                               
                                    }}
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none file:cursor-pointer file:bg-gray-500 file:text-gray-200 file:rounded-md file:px-4 file:py-2"
                                />
                            </label>

                    </div>

               </div>


               <div className='w-full mt-20'>
                    <h2 className='text-3xl font-semibold mt-20'>Header</h2>
                     <div className='w-full grid grid-cols-3 gap-4 my-6 max-md:grid-cols-1'>
                        
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
                                    onChange={(e) => { 
                                      setHeaderImage(e.target.files[0])                                  
                                    }}
                                    className="w-full bg-white text-gray-500 rounded-md px-3 py-2 border-none outline-none file:cursor-pointer file:bg-gray-500 file:text-gray-200 file:rounded-md file:px-4 file:py-2"
                                />
                            </label>

                    </div>

               </div>
               
             </form>
             
                     <div className='w-full'>
                        <div className='w-full mt-20'>
                             <h2 className='text-3xl font-semibold my-6'>Content</h2>
                             {htmlContent != null && <FroalaEditorComponent  OnSubmit={setHtmlContent} initialContent={htmlContent}/>}
                              
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
                             <h2 className='text-3xl font-semibold my-6'>QA</h2>
                                     <div className='w-full grid grid-cols-3 gap-4 max-md:grid-cols-1'>
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
                                    <div className='flex justify-center items-center w-full mt-12'>
                                            <button className='p-4 w-[120px] h-[60px] rounded-full bg-gray-500 text-white  ' type='submit' >Add</button>
                                            <div className='flex justify-start items-center gap-4 ml-12'>
                                                {
                                                    QAs?.map((qa , index) => (
                                                        <p className=' h-[60px] rounded-full bg-gray-300 p-4 flex justify-center items-center gap-2 ' key={qa.question}>
                                                            {qa.question}
                                                            <button type="button" onClick={() => handleQAremoval(index)}><AiOutlineClose/></button>
                                                        </p>
                                                    ))
                                                }
                                            </div>
                                     </div>
                                    
                            </div>
                     </form>

                     
                     <form className='w-full' onSubmit={handleUrlSubmit}>
                        <div className='w-full mt-20'>
                             <h2 className='text-3xl font-semibold my-6'>Links</h2>
                                     <div className='w-full grid grid-cols-3 gap-4 max-md:grid-cols-1'>
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
                                    <div className='flex justify-center items-center w-full mt-12'>
                                            <button className='p-4 w-[120px] h-[60px] rounded-full bg-gray-500 text-white  ' type='submit' >Add</button>
                                             <div className='flex justify-start items-center gap-4 ml-12'>
                                                {
                                                    Links?.map((lin , index) => (
                                                        <p className=' h-[60px] rounded-full bg-gray-300 p-4 flex justify-center items-center gap-2 ' key={lin.address}>
                                                            {lin.address}
                                                            <button type="button" onClick={() => handleLinkremoval(index)}><AiOutlineClose/></button>
                                                        </p>
                                                    ))
                                                }
                                            </div> 
                                     </div> 
                                    
                            </div>
                     </form>
                     
             
             <button onClick={handleFormsSubmition} className='w-[300px] h-[80px] bg-green-400 ml-auto block mt-12 rounded-full text-gray-600 duration-200 hover:scale-90 transition' >{loading ? (<SpinningLoading size={8} />) : ('Update')}</button>
               <ToastContainer
                     transition={Slide}
                     style={{ width: "90%", maxWidth: "360px" }}
                   />
           </div>   
        </section>
        </>
  )
}

export default page