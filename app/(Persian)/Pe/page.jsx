import React from 'react'


import PEHero from '@/components/persianLanding.jsx/PEHero'
import PEHSlider from '@/components/persianLanding.jsx/PEHSlider'
import PEAbout from '@/components/persianLanding.jsx/PEAbout'
import PEBrands from '@/components/persianLanding.jsx/PEBrands'
import PEHowItsDone from '@/components/persianLanding.jsx/PEHowItsDone'
import PEWhyus from '@/components/persianLanding.jsx/PEWhyus'
import PEFeedbacks from '@/components/persianLanding.jsx/PEFeedbacks'
import PEPrises from '@/components/PersianComp/PEPrises'
import PECategories from '@/components/PersianComp/PECategories'


const Home = () => {


  return (
    <>
      <PEHero/>
      <PEHSlider/>
      <PECategories/>
      <PEHowItsDone/>
      <PEAbout/>
      <PEPrises/>
      <PEWhyus/> 
      <PEBrands/>
      <PEFeedbacks/>
    </>
    
  )
}

export default Home