
import React from 'react'
import Link from 'next/link';
import InstagramButton from './InstagramButton';


const Context = () => {



  return (
  
    <div className=" pt-36 h-screen padding-x flex justify-center items-start flex-col -translate-y-44 max-lg:mt-20 max-lg:justify-start max-lg:h-[600px] max-lg:w-full max-lg:translate-y-0 max-lg:pt-12 w-[50vw]" >
      <h1 className="hero__title max-md:text-4xl " >
        Find, book, rent a car—quick and super <span className='text-blue-600 text-shadow-3d  '>easy!</span> 
      </h1>

      <p className="hero__subtitle max-md:text-xl">
        Streamline your car rental experience with our effortless booking
        process.
      </p>
     <div className='flex justify-start items-center gap-4' >
          <Link href={'./Cars'  } className=' block translate-y-10' > <button className='rounded-full mt-4 hover:scale-125 transition duration-300 ease-in-out bg-blue-600 text-white font-bold h-[60px] w-[120px]'  > Cars</button></Link>
          <InstagramButton/>
     </div>
    </div>

    
   
 
);
  
}

export default Context