"use client"

import instagram from '@/public/instagram.png'
import facebook from '@/public/facebook.svg'
import whatsapp from '@/public/whatsapp.png'
import telegram from '@/public/telegram.png'
import linkedin from '@/public/linkedin.svg'


import Link from 'next/link';
import React from 'react'
import emailjs from 'emailjs-com';
import Image from 'next/image';

import { useState , useRef } from "react"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";



import { AiOutlinePhone, AiOutlineMessage } from 'react-icons/ai';
import PECHero from '@/components/PersianComp/PECHero'
import Map from '@/components/Map'


// import emailjs from '@emailjs/browser'
const Contact = () => {
    const forRef = useRef()
    const  [form , setform] =  useState({
      name :'',
      email:'',
      message: ' ', 
    })
    const [Loading , setLoading] = useState(false)
    const handleChange = (e) => {
      const {name , value} = e.target
      setform({...form , [name] : value})
    }

 gsap.registerPlugin(ScrollTrigger);

   useGSAP(()=>{
    gsap.to('#form' , {
      x:0,
    }),

    gsap.to('#map' , {
      x:0,
      duration:1.5,
      scrollTrigger: {
        trigger: "#map",   // Element that triggers the animation
        start: "top 80%",  // When the element is 80% from the top of the viewport
       
      },
      ease:'elastic.inOut'
    })

   } , [])

    const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true)
   
  
  
  
      emailjs.send('service_4o7jbq2' , 'template_q4awnb1' , {from_name : form.name , to_name : 'Amir' , from_email : form.email , to_email:'skullbreaker44333@gmail.com' , message:form.message,  }  , '-4fVKwIJWjP4PAdXI' ).then(() => {setLoading(false) ; alert('Thank You I will get back to you as soon as possible')})
  
      setform({
        name:'',
        email: '',
        message:'',
      } , (error ) => {
        setLoading(false)
        console.log(error)
        alert('Somthing went wrong')
      } )
    }
   



  return (<>
    <PECHero/>
    <div className='mt-40 w-full  ' >
        <div className="xl:mt-12 max-lg:h-auto grid grid-cols-6 gap-6 overflow-hidden 2xl:w-[80%] w-[90%] max-xl:w-full max-xl:p-4 p-12 mx-auto" >
              <div className="col-span-2 max-lg:col-span-6 text-black bg-gray-200 border border-gray-500 p-8 rounded-2xl -translate-x-[110%] shadow-xl shadow-blue-500" id='form' >
                  <p  className="  font-black md:text-[60px] sm:text-[50px] text-right  xs:text-[40px] text-[30px]" > !! به ما  <span className='text-blue-500 text-shadow-3d-subtle'> ایمیل </span> بزنید  </p>
                  <h3 className="sm:text-[18px] text-right  text-[14px] text-secondary uppercase tracking-wider"  >نظرتونو به ما بگید</h3>
                  <form  ref={forRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8" >
                    <label className="flex flex-col" >
                        <span className={` text-right  font-medium mb-4`} >
                           نام  و نام خانوادگی 
                        </span>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="نام شریفتون " className=" text-right border border-gray-500 bg-tertiary py-4 px-6 placeholder:text-secondary  rounded-lg  font-medium " />
                      </label>
                      <label className="flex flex-col" >
                        <span className={` text-right  font-medium mb-4`} >                  
                                ایمیل
                        </span>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="ایمیل خودتان" className="text-right border border-gray-500 bg-tertiary py-4 px-6 placeholder:text-secondary  rounded-lg  font-medium " />
                      </label>
                      <label className="flex flex-col" >
                        <span className={` text-right font-medium mb-4`} >
                        پیامی که برای من دارید
                        </span>
                        <textarea rows='7'  name="message" value={form.message} onChange={handleChange} placeholder="What's yor Good Name ?" className="border border-gray-500 bg-tertiary py-4 px-6 placeholder:text-secondary  rounded-lg  font-medium " />
                      </label>
                      <button type="submit" className="bg-tertiary py-3 px-8 outline-none w-fit  font-bold shadow-md shadow-primary rounded-xl" >{Loading  ?  '... درحال ارسال ' : 'ارسال'}</button>
                    </form>
                </div>

                <div className="col-span-4  max-lg:col-span-6 relative max-lg:h-[140vh] text-black bg-gray-200 border border-gray-500  rounded-2xl translate-x-[110%] shadow-xl shadow-blue-400 "  id='form' >

                          <div className='w-[100%] mx-auto h-[50%]  fontbold     relative ' >
                                              <Image src={'/Instanemati.png'} className='w-full h-full object-cover object-top rounded-2xl ' fill sizes='100%' alt='picture if nematis instagram'  />
                          </div>
                          
                          

                          <div className=' mx-auto  h-[50%]    w-full relative     ' >
                              <div className='w-full h-[50%] text-center flex justify-start items-center flex-col  mt-12' >
                                  <h2 className='text-2xl font-bold mt-4' >چطور با ما در تماس باشید ؟</h2>
                                   <p className=' text-lg w-[50%] max-md:w-[95%] mt-4 text-[#797979]'> برای هرگونه سوال یا درخواست، با ما در ارتباط باشید. تیم ما آماده است تا به شما کمک کند. شما می‌توانید از روش‌های زیر برای برقراری ارتباط با ما استفاده کنید</p>
                              </div>
                           
                              <div className='flex justify-center items-center w-[70%] gap-4 mx-auto max-md:mt-20'>
                                  <Link href={'./'}  className='block  duration-150 hover:scale-90 transition'> <Image width={50} src={linkedin} alt={'linkedin'} /> </Link>
                                  <Link href={'https://www.instagram.com/amir_ekh_?igsh=YzU3Mnh5MWx3aXRj'}  className='block  duration-150 hover:scale-90 transition  '> <Image width={50} src={instagram} alt={'instagram'} /> </Link>
                                  <Link href={'./'}  className='block  duration-150 hover:scale-90 transition '> <Image width={50} src={whatsapp} alt={'whatsapp'} /> </Link>
                                  <Link href={'https://t.me/amir44333'}  className='block  duration-150 hover:scale-90 transition '> <Image width={50} src={telegram} alt={'telegram'} /> </Link>
                                  <Link href={'./'}  className='block  duration-150 hover:scale-90 transition '> <Image width={50} src={facebook} alt={'facebook'} /> </Link>
                                </div>
                          </div>
                              
                </div>
           </div>
           <h4 className='mx-auto  w-[500px] my-12 text-center text-2xl max-lg:w-full max-lg:text-xl max-lg:p-4' >📍 موقعیت ما:
           ما در [آدرس دقیق خود] واقع شده‌ایم. برای مراجعه حضوری، می‌توانید به آدرس زیر بیایید.</h4>
           <Map/>
    </div>
   <div className='fixed bottom-0 flex justify-center items-center  right-0 left-0 h-[60px] z-50 text-white md:hidden' >
      
         <div className='w-full h-full bg-green-500 flex justify-center items-center text-xl font-semibold ' >
           <div className='flex justify-center items-center  duration-150 hover:scale-90 transition px-6 cursor-pointer'>  
              <a
           href={`tel:09336565309`}
           className='flex justify-center items-center'
           
         >
         Call Us  <AiOutlinePhone className='text-2xl ml-2 ' /> 
         </a></div> 
         </div>
       </div>

    </>
  )
}

export default Contact