import React from 'react'
import Image from 'next/image'

const PEHowItsDone = () => {
  return (
    <section className='max-md:mx-4 max-lg:mx-12 lg:w-[80%] lg:mx-auto h-auto max-lg:h-auto flex  justify-center items-center flex-col  pt-[100px]  border-t-4 border-blue-700 bg-blue-200 shadow-xl shadow-blue-700  mb-12 rounded-xl mt-20 max-lg:mt-32 rounded-b-2xl   '>
      <div className='w-full flex justify-center items-center flex-col pb-12 max-lg:pb-0' >
        <h3 className='xl:text-6xl text-5xl text-shadow-3d-subtle font-bold max-lg:text-3xl p-4'>روند کار به چه شکل هست</h3>
        <p className='text-3xl mt-8 max-lg:text-2xl' > <span className='text-shadow-3d-subtle font-bold'>  سه قدم </span> ساده</p>
      </div>
        <div className='w-full h-auto max-lg:h-auto flex  justify-center items-center max-lg:flex-col '>
        <div className='w-[50%] h-[60vh] max-md:h-[300px] mx-auto  flex justify-center   items-center flex-col relative max-lg:w-full max-lg:h-[550px]'>
            <h1 className='text-shadow-3d-subtle text-4xl font-semibold p-5   max-lg:text-2xl flex flex-row-reverse max-lg:text-center'><span>&nbsp;&nbsp;.1</span> ثبت نام / ورود  </h1>
            <p className='max-w-[60%] text-lg  text-[#797979] leading-loose pt-6 max-lg:max-w-[90%] text-justify-center  p-3'>ایجاد حساب کاربری – ابتدا در سایت ثبت‌نام کنید تا بتوانید از تمامی امکانات ما بهره‌مند شوید.
</p>

        </div>
        <div className='w-[50%] h-[60vh] max-md:h-[300px]  flex justify-center items-center max-lg:w-full  max-lg:h-[80vh]'>
            <div className='  h-full w-full flex justify-center items-center max-lg:justify-start  flex-col gap-6 max-lg:h-[80%]' >
              <div className='relative w-[80%]   h-[70%] rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/SignUpPage.png'} className='w-full h-full object-cover object-top rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
           </div>
        </div>
        </div>
        <div className='w-full h-auto max-lg:h-auto flex  justify-center items-center max-lg:flex-col lg:flex-row-reverse '>
        <div className='w-[50%] h-[60vh] mx-auto  max-md:h-[300px]  flex justify-center items-center flex-col relative max-lg:w-full max-lg:h-[550px]'>
            <h1 className='text-shadow-3d-subtle text-4xl font-semibold p-5   max-lg:text-2xl flex flex-row-reverse max-lg:text-center'><span>&nbsp;&nbsp;.2</span> انتخاب ماشین مورد نظر</h1>
            <p className='max-w-[60%] text-lg  text-[#797979] leading-loose pt-6 max-lg:max-w-[90%] text-justify-center  p-3'> زرو خودرو – از میان خودروهای موجود، گزینه مورد نظر خود را انتخاب کرده و درخواست رزرو ارسال کنید.</p>

        </div>
        <div className='w-[50%] h-[60vh] max-md:h-[300px]   flex justify-center items-center max-lg:w-full  max-lg:h-[80vh]'>
            <div className='  h-full w-full flex justify-center items-center max-lg:justify-start  flex-col gap-6 max-lg:h-[80%]' >
              <div className='relative w-[80%]   h-[70%] rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/CarPage.png'} className='w-full h-full object-cover object-top rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
           </div>
        </div>
        </div>
        <div className='w-full h-auto max-lg:h-auto flex  justify-center items-center max-lg:flex-col '>
        <div className='w-[50%] h-[60vh] mx-auto  max-md:h-[300px]  flex justify-center  items-center flex-col relative max-lg:w-full max-lg:h-[550px]'>
            <h1 className='text-shadow-3d-subtle text-4xl font-semibold p-5   max-lg:text-2xl flex flex-row-reverse max-lg:text-center'><span>&nbsp;&nbsp;.3</span> ثبت درخاست  و تمام </h1>
            <p className='max-w-[60%] text-lg  text-[#797979] leading-loose pt-6 max-lg:max-w-[90%] text-justify-center  p-3'>تماس و هماهنگی – پس از بررسی درخواست شما، تیم متخصص ما در اسرع وقت با شما تماس خواهد گرفت تا زمان و جزئیات ملاقات را هماهنگ کنیم.</p>

        </div>
        <div className='w-[50%] h-[60vh] max-md:h-[300px]  flex justify-center items-center max-lg:w-full  max-lg:h-[80vh]'>
            <div className='  h-full w-full flex justify-center items-center max-lg:justify-start   flex-col gap-6 max-lg:h-[80%]' >
              <div className='relative w-[80%]   h-[70%] rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/ReservationPage.png'} className='w-full h-full object-cover object-top rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
           </div>
        </div>
        </div>
        
    </section>
  )
}

export default PEHowItsDone