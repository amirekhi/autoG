import React from 'react'
import Image from 'next/image'

const PEBHero = () => {
  return (
    <section className="w-full h-[60vh] max-md:h-[50vh] flex justify-end items-center relative mt-2  z-0">
    <div className="absolute inset-0 bg-black -z-10 opacity-50" />
    <Image 
      src={'/Blogs.jpg'} 
      fill 
      sizes="100%" 
      className="absolute inset-0 object-cover -z-20" 
      alt="bg image" 
    />
    <div className="text-white relative z-10  w-[40vw] font-semibold max-md:text-center max-md:w-full text-right p-4 md:mr-12 px-8  ">
              <h1 className='text-7xl max-md:text-3xl'>
                  <span className='text-shadow-3d-subtle'>وبلاگ خبری</span> – تازه‌ ترین اخبار دنیای خودرو
              </h1>
              <p className='text-2xl  max-md:text-lg mt-12'>
                 در بخش <span className='text-shadow-3d-subtle' >وبلاگ خبری </span>، روزانه مهم‌ترین و داغ‌ ترین اخبار دنیای خودرو را منتشر می‌کنیم. از معرفی جدیدترین مدل‌های خودروهای لوکس گرفته تا تحلیل بازار، فناوری‌های نوین، قوانین جدید و هر آنچه که برای شما به‌عنوان یک علاقه‌مند به خودرو اهمیت دارد.
              </p>
      </div>
        
  </section>
  
  )
}

export default PEBHero