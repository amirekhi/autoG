import React from 'react'
import ImageSlider from '../ImageSlider'
import PEContext from '../PersianComp/PEContext'

const PEHero = () => {
  return (
   <section className='md:w-[80%] md:mx-auto  flex justify-around flex-row-reverse items-center max-md:flex-col '>
     <PEContext />
     <ImageSlider/>
   </section>
  )
}

export default PEHero