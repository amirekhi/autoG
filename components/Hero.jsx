import React from 'react'
import Context from './Context'
import ImageSlider from './ImageSlider'

const Hero = () => {
  return (
   <section className='w-full md:h-[75vh] md:translate-y-[100px]  flex justify-center items-center max-md:flex-col '>
     <Context />
     <ImageSlider/>
   </section>
  )
}

export default Hero