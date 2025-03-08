
import React from 'react'

import HSlider from '@/components/HSlider'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Brands from '@/components/Brands'

import Whyus from '@/components/Whyus'
import Feedbacks from '@/components/Feedback/Feedbacks'
import HowItsDone from '@/components/HowItsDone'
import Prises from '@/components/Prises'
import Categories from '@/components/Categories'


const Home = () => {


  return (
    <>
      <Hero/>
      <HSlider/>  
      <Categories/>
      <HowItsDone/>
      <About/>
      <Prises/>
      <Whyus/> 
      <Brands/>
      <Feedbacks/>
    </>
    
  )
}

export default Home