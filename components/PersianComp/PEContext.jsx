
import React from 'react'
import Link from 'next/link';
import InstagramButton from '../InstagramButton';


const PEContext = () => {



  return (
  
    <div className=" pt-36 h-full padding-x  -translate-y-44 max-lg:h-[600px] max-lg:w-full max-lg:translate-y-0 max-md:pt-12 w-[35vw] text-right " >
      <h1 className="hero__title max-md:text-4xl " >
       <span className='text-shadow-3d-subtle   max-md:text-4xl  '>ماشین</span> مورد علاقت اینجاست 
      </h1>

      <p className="hero__subtitle max-md:text-xl">
       اینجا با <span className='  text-shadow-3d-subtle  text-5xl'>3</span> قدم کوچیک و سریع میتونی ماشینت رو داشته باشی 
      </p>

      <div className='flex justify-start flex-row-reverse items-center gap-4' >
          <Link href={'./Pe/Cars'  } className=' block translate-y-10' > <button className='rounded-full mt-4 hover:scale-125 transition duration-300 ease-in-out bg-blue-600 text-white font-bold h-[60px] w-[120px]'  > ماشین ها</button></Link>
          <InstagramButton/>
     </div>
    </div>

    
   
 
);
  
}

export default PEContext