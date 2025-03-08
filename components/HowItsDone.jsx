import React from 'react'
import Image from 'next/image'

const HowItsDone = () => {
  return (
    <section className=' max-md:mx-4 max-lg:mx-12 lg:w-[80%] lg:mx-auto h-auto max-lg:h-auto flex  justify-center items-center flex-col  pt-[100px]  border-t-4 border-blue-700 bg-blue-200 shadow-xl shadow-blue-700  mb-12 rounded-xl mt-20 max-lg:mt-32  rounded-b-2xl  '>
      <div className='w-full flex justify-center items-center flex-col pb-12 max-lg:pb-0' >
        <h3 className='xl:text-6xl text-5xl text-blue-500 font-bold max-lg:text-3xl text-shadow-3d-subtle p-4 '>How Does it Work ?</h3>
        <p className='text-3xl mt-8 max-lg:text-2xl' >three <span className='text-blue-500 ' >Easy</span> steps</p>
      </div>
        <div className='w-full h-auto max-lg:h-auto flex  justify-center items-center max-lg:flex-col '>
        <div className='w-[50%] h-[60vh] max-md:h-[320px] mx-auto  flex justify-center   items-center flex-col relative max-md:w-full max-lg:h-[630px]'>
            <h1 className='text-blue-500 text-4xl font-semibold p-5   max-lg:text-2xl  max-lg:text-center '>1. Making an Account</h1>
            <p className='max-w-[60%] text-lg  text-[#797979] leading-loose pt-6 max-lg:max-w-[90%] text-justify-center  p-3'>Create an account quickly and easily to get started with your car reservation process. Provide your details and become part of our exclusive car-buying experience.</p>

        </div>
        <div className='w-[50%] h-[60vh] max-md:h-[320px]   flex justify-center items-center max-lg:w-full  max-lg:h-[80vh]'>
            <div className='  h-full w-full flex justify-center items-center max-lg:justify-start flex-col gap-6 max-lg:h-[80%]' >
              <div className='relative w-[80%]  h-[70%] rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/SignUpPage.png'} className='w-full h-full object-cover object-top rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
           </div>
        </div>
        </div>
        <div className='w-full h-auto max-lg:h-auto flex  justify-center items-center max-lg:flex-col lg:flex-row-reverse '>
        <div className='w-[50%] h-[60vh] max-md:h-[320px] mx-auto  flex justify-center items-center flex-col relative max-lg:w-full max-lg:h-[630px]'>
            <h1 className='text-blue-500 text-4xl font-semibold p-5   max-lg:text-2xl  max-lg:text-center '>2. Reserve Your Car</h1>
            <p className='max-w-[60%] text-lg  text-[#797979] leading-loose pt-6 max-lg:max-w-[90%] text-justify-center  p-3'> Browse through our collection of cars and reserve the one you want directly from the car's page. Choose the model, year, and features you desire, and let us know your preferences.</p>

        </div>
        <div className='w-[50%] h-[60vh] max-md:h-[320px]  flex justify-center items-center max-lg:w-full  max-lg:h-[80vh]'>
            <div className='  h-full w-full flex justify-center items-center max-lg:justify-start  flex-col gap-6 max-lg:h-[80%]' >
              <div className='relative w-[80%]  h-[70%] rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/CarPage.png'} className='w-full h-full object-cover object-top rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
           </div>
        </div>
        </div>
        <div className='w-full h-auto max-lg:h-auto flex  justify-center items-center max-lg:flex-col '>
        <div className='w-[50%] h-[60vh] max-md:h-[320px] mx-auto  flex justify-center  items-center flex-col relative max-lg:w-full max-lg:h-[630px]'>
            <h1 className='text-blue-500 text-4xl font-semibold p-5   max-lg:text-2xl max-lg:text-center '>3. Wait for Our Contact</h1>
            <p className='max-w-[60%] text-lg  text-[#797979] leading-loose pt-6 max-lg:max-w-[90%] text-justify-center  p-3'>After reserving your car, simply wait for our team to contact you. We will get in touch to confirm the details, finalize the deal, and arrange the delivery of your vehicle.</p>

        </div>
        <div className='w-[50%] h-[60vh] max-md:h-[320px]  flex justify-center items-center max-lg:w-full  max-lg:h-[80vh]'>
            <div className='  h-full w-full flex justify-center items-center max-lg:justify-start  flex-col gap-6 max-lg:h-[80%]' >
              <div className='relative w-[80%]  h-[70%] rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/ReservationPage.png'} className='w-full h-full object-cover object-top rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
           </div>
        </div>
        </div>
        
    </section>
  )
}

export default HowItsDone