import React from 'react'
import Image from 'next/image'


const BBHero = ({imgUrl , Title , Parag , directionRtL}) => {
  return ( 
    
    <section className={`w-full h-[50vh] flex  ${directionRtL ? ('justify-end') : ('justify-start')}  items-center relative mt-2  z-0`}>
            <div className="absolute inset-0 bg-black -z-10 opacity-50" />
            <Image 
            src={imgUrl || '/bgimg.jpg'} 
            fill 
            sizes="100%" 
            className="absolute inset-0 object-cover -z-20" 
            alt="bg image" 
            />
            <div className={`text-white relative z-10  ${directionRtL ? ('mr-12') : ('ml-12')} w-[40vw] font-semibold max-md:text-center max-md:w-full max-md:mr-0 max-md:ml-0 ${directionRtL && ('text-right')}`}>
            <h1 className={`text-8xl  max-md:text-5xl `}>{Title}</h1>
            <p className={`text-3xl leading-loose  ${directionRtL ? ('') : ('max-w-[500px]')}   `}>{Parag}</p>
            </div>
  
     </section>
   
  )
}

export default BBHero