import React from 'react'
import CardSlider from './CardSlider'

const HSlider =  async () => {

  
  return (
    <section  className='w-[80%]  mx-auto h-[750px]   max-lg:w-screen'>
       <div className='w-full flex justify-center items-center xl:text-7xl text-6xl font-bold text-blue-600 text-shadow-3d-subtle max-lg:text-4xl max-md:text-4xl  ' >Hot Cars </div>
        <CardSlider />
    </section>
  )
}

export default HSlider