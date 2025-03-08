import React from 'react'

const BContent = ({Contents }) => {
  return (
    <section className='w-full' >
        <div className='w-[50vw] mx-auto max-md:w-full max-md:p-4 ' >

         
                    <div className={`w-full my-12 max-md:my-4   overflow-hidden `}   dangerouslySetInnerHTML={{ __html: Contents}}>
                       
                    </div>
         
        
        </div>
    </section>
  )
}

export default BContent 

{/* <h2 className='text-4xl font-semibold mt-6   ' >
                            {content.Title}
                        </h2>
                        <p className='text-[#797979] mt-12 max-md:mt-[70px] ' >{content.Parag}</p> */}