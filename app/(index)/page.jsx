
import React from 'react'


import Hero from '@/components/Hero'
import About from '@/components/About'
import Brands from '@/components/Brands'

import Whyus from '@/components/Whyus'
import Feedbacks from '@/components/Feedback/Feedbacks'
import HowItsDone from '@/components/HowItsDone'
import Prises from '@/components/Prises'
import Categories from '@/components/Categories'
import CardCarousel from '@/components/CardCarousel'

const Home = () => {


  return (
    <>
      <Hero/>
      <CardCarousel/>
      {/* <HSlider/>   */}
      <Categories/>
      {/* <HowItsDone/> */}
      <About/>
      {/* <Prises/>
      <Whyus/>  */}
      {/* <Brands/> */}
    
    </>
    
  )
}

export default Home