import React from 'react'

import FAQ from './FAQ'

const AcoordionWrapper = ({QAs}) => {
  return (
  <section className='w-full     ' id = "Q&A">
    {QAs.length > 0 &&   
      <div className='w-[50vw] max-md:w-full max-md:p-4  max-md:mx-0 mx-auto justify-center items-center  flex   pb-11 ' >
        <FAQ QAs={QAs}/>
      </div> 
    }
    </section>
  )
}

export default AcoordionWrapper