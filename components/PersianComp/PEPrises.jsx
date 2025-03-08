import React from 'react'
import { FaCar , FaShieldAlt ,FaTags } from 'react-icons/fa';


const PEPrises = () => {
  return (
    <section  className='w-full bg-blue-500 h-[400px] grid grid-cols-3 text-white max-lg:grid-cols-1 max-lg:h-auto  max-lg:py-12 max-lg:gap-12 '>
       <div className='flex justify-center items-center flex-col  gap-6 ' >
         <FaCar className='text-white text-8xl'  />
         <p className='text-2xl font-bold' >🚗 تجربه بی‌ رقیب</p>
         <p className='text-lg max-w-[250px] text-center'>با بیش از ۱۰۰۰ خودروی فروخته‌ شده، ما سال‌ها تجربه در بازار خودروهای لوکس داریم. رضایت مشتریان ما نشان‌دهنده‌ی اعتبار و تخصص  ما در این صنعت است! </p>
       </div> 
       <div className='flex justify-center items-center flex-col  gap-6 ' >
         <FaTags className='text-white text-8xl'  />
         <p className='text-2xl font-bold' >🏆 بهترین قیمت</p>
         <p className='text-lg max-w-[250px] text-center'>ما با ارائه منصفانه‌ ترین قیمت‌ ها، تضمین می‌کنیم که خودروی مورد نظر خود را با بهترین شرایط خریداری کنید. کیفیت بالا با قیمت عادلانه، تخصص ماست</p>
       </div> 
       <div className='flex justify-center items-center flex-col  gap-6 ' >
         <FaShieldAlt className='text-white text-8xl'  />
         <p className='text-2xl font-bold' >⚖️ تضمین قانونی</p>
         <p className='text-lg  max-w-[250px] text-center'>تمام معاملات ما تحت پوشش  قوانین رسمی انجام می‌شوند. شما می‌توانید با اطمینان کامل خرید کنید، زیرا تمامی مراحل حقوقی و اسناد خودرو توسط تیم ما بررسی و تضمین می‌شوند.
    </p>
       </div> 
     
  

    </section>
  )
}

export default PEPrises