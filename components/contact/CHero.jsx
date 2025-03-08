import React from 'react'
import Image from 'next/image'


const CHero = () => {
  return (
    <section className="w-full h-[60vh] max-md:h-[50vh] flex  justify-center md:justify-start md:pl-14 items-center relative mt-2 max-md:flex-col z-0">
      <div className="absolute inset-0 bg-black -z-10 opacity-50" />
      <Image 
        src={'/Contact.jpg'} 
        fill 
        sizes="100%" 
        className="absolute inset-0 object-cover -z-20" 
        alt="bg image" 
      />
      <div className="text-white relative z-10 w-[40vw] text-7xl font-semibold max-md:text-center max-md:w-full max-md:text-5xl">
      <span className='text-shadow-3d-subtle'>Contact</span> Us 
      </div>
      
  </section>
  
  )
}

export default CHero