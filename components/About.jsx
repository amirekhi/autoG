import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <section className='2xl:w-[80%] w-full max-lg:p-3 mx-auto h-auto max-lg:h-auto flex  justify-center items-center max-lg:flex-col   pb-16 ' >
        <div className='w-[50%] h-[500px] mx-auto  flex justify-center  items-center flex-col relative max-lg:w-full max-lg:h-[700px]'>
            <h1 className=' xl:text-6xl text-5xl font-semibold mb-12    text-shadow-3d-subtle max-lg:text-4xl'>About Us</h1>
            {/* <p className='max-w-[60%] text-xl  text-blue-300 leading-loose pt-6 max-md:max-w-full text-justify-center max-md:p-0 max-md:pt-3 p-3'>Lorem ipsum dolor sit amet ullam rerum, debitis iure, laboriosam aspernatur!</p> */}
            <p className='max-w-[80%] text-lg max-lg:p-12 text-[#797979] leading-loose max-lg:max-w-full text-justify-center max-md:p-0 pt-12 p-3'>We are one of the most successful companies in the luxury car market, working with high-end vehicles and offering 100% delivery guarantees. With a dedicated team and years of experience, we ensure that you get the best cars under the best conditions. Our commitment to customer satisfaction and attention to detail make us your go-to choice for luxury car purchases.</p>

        </div>
        <div className='w-[50%] h-[100vh]  flex justify-center items-center max-lg:w-full  max-lg:h-[80vh]'>
            <div className='grid grid-cols-6 gap-6   h-[60%] w-[70%] max-lg:h-[80%] max-lg:w-full' >
              <div className='relative col-span-6 rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/Instanemati.png'} className='w-full h-full object-cover object-top rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
              {/* <div className='relative col-span-3 max-md:col-span-6 rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/Instanemati.png'} className='w-full h-full object-cover object-top  rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
              <div className='relative col-span-3 max-md:col-span-6 rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/Instanemati.png'} className='w-full h-full object-cover object-top  rounded-xl duration-200 transition hover:scale-110' fill sizes='100%' alt='main Image of our shop' /></div> */}
            </div>
        </div>
    </section>
  )
}

export default About