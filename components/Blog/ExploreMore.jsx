import React from 'react'
import Link from 'next/link'

export const ExploreMore = ({Links}) => {
  return (
    <section className='w-full my-12' >
      {Links.length > 0 && 
        <div className='w-[50vw] mx-auto max-md:w-full max-md:p-4 max-md:mx-0' >
            <h3 className='font-semibold text-2xl' >Explore  More :</h3>
            <ul className='ml-12 w-full mt-6 max-md:ml-4'>
             {Links?.map((link , index) => (
              <li className='list-disc my-2 max-w-screen ' key={index} ><Link href={link.address} className=' text-blue-300 underline '  >{link.address}</Link></li>
             )) }
                
            </ul>      
      </div>
      }
    </section>
  )
}