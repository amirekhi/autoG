"use client"

import React from 'react'
import Image from 'next/image';
import hero from '../public/hero.png'
import { useGSAP } from '@gsap/react';


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const ImageSlider = () => {


  
 




  useGSAP(()=>{
    gsap.to("#slider" , {
      x:0,
      duration:2,
      ease: 'elastic.inOut',
      scrollTrigger:{
        trigger: '#slider',
        start: "top 80%",
     
      }
    })
  }, [])



  return (
    
    <div className='w-[40vw]  max-lg:hidden  '>
        <div className="hero__image-container  ">
            <div className="hero__image translate-x-[600px] "  id='slider'>
              <Image src={hero} alt="english Hero Landing page Image" fill className="object-contain " sizes='100%'  />
            </div>

             {/* <div className="hero__image-overlay " />  */}
          </div>
      
      </div>
  )
}

export default ImageSlider