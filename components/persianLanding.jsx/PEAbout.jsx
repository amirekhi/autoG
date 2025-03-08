import React from 'react'
import Image from 'next/image'

const PEAbout = () => {
  return (
    <section className='2xl:w-[80%] w-[95%] mx-auto h-auto max-lg:h-auto flex   p-4 justify-center items-center max-lg:flex-col  pb-16'>
        <div className='w-[50%] h-[500px] mx-auto  flex justify-center  items-center flex-col relative max-lg:w-full max-lg:h-[700px]'>
            <h1 className=' xl:text-6xl text-5xl font-semibold mb-12   text-shadow-3d-subtle max-lg:text-4xl'>درباره ما</h1>
            <p className='max-w-[60%] text-xl   leading-loose pt-6 max-lg:max-w-full text-justify-center max-lg:text-[16px]  p-3'>اشنایی بیشتر با توانایی ها و اعتبار و روند کار این مجموعه <span className='text-blue-400 font-bold text-2xl'>موجب خاطر جمعی</span>  شما عزیزان میباشد و <span className='text-blue-400 font-bold text-2xl'>رضایت شما</span> در خرید که هدف اصلی ما میباشد   </p>
            <p className='max-w-[80%] text-lg  max-lg:p-12 text-[#797979] leading-loose  max-lg:max-w-full text-justify-center max-md:p-0 max-lg:pt-12 pt-12  p-3 max-lg:text-[16px]'> ما پیشرو ترین و موفق‌ ترین مجموعه در خرید و فروش خودروهای لوکس هستیم. با سال‌ها تجربه و همکاری با برترین برندهای خودرویی، بهترین گزینه‌ها را برای مشتریان خاص و مشکل‌ پسند فراهم کرده‌ایم.

تعهد ما، ارائه خدماتی بی‌ نقص همراه با ۱۰۰٪ ضمانت تحویل است. هر خودرویی که از ما انتخاب کنید، با اطمینان کامل و در کوتاه‌ترین زمان به شما تحویل داده می‌شود.

به ما اعتماد کنید و تجربه‌ای بی‌نظیر از خرید خودروهای لوکس را با ما داشته باشید! 🚗✨

</p>

        </div>
        <div className='w-[50%] h-[100vh]  flex justify-center items-center max-lg:w-full  max-lg:h-[100vh]'>
                  <div className='grid grid-cols-6 gap-6   h-[60%] w-[70%] max-lg:h-[80%] max-lg:w-full' >
                    <div className='relative col-span-6 rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/Instanemati.png'} className='w-full h-full object-cover object-top rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
                    {/* <div className='relative col-span-3 max-md:col-span-6 rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/Instanemati.png'} className='w-full h-full object-cover object-top  rounded-xl duration-200 transition hover:scale-110 ' fill sizes='100%' alt='main Image of our shop' /></div>
                    <div className='relative col-span-3 max-md:col-span-6 rounded-xl shadow-xl shadow-blue-400 overflow-hidden'><Image src={'/Instanemati.png'} className='w-full h-full object-cover object-top  rounded-xl duration-200 transition hover:scale-110' fill sizes='100%' alt='main Image of our shop' /></div> */}
                  </div>
              </div>
    </section>
  )
}

export default PEAbout