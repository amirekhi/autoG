'use client'
import Image from 'next/image';
import React from 'react'
import { useState } from 'react';

const ReservationGallery = ({ImageUrls}) => {
    const [ImageIndex , setImageIndex] = useState(0)


    const handleImageChange = (index) => {
          setImageIndex(index)

    }


  return (
    <>
    <div className='w-full h-[80%] relative' >
                        <Image src={ImageUrls?.[ImageIndex]} className='w-full h-full object-cover' fill sizes='100%' alt='main Image of the product ' />
                      </div>
    <div   className='w-full h-[20%] relative grid grid-cols-6 gap-3 py-2 '>
            {ImageUrls?.map((ImgAddress , Index) => (
                    <button className='h-full relative block hover:scale-95 duration-300 transition col-span-1' key={ImgAddress} onClick={() => handleImageChange(Index)}  >
                            <Image src={ImgAddress} className='w-full h-full object-cover ' fill sizes='100%' alt='Sub Image of the product '  />
                    </button>
            ))}          
    </div>
    </>
  )
}

export default ReservationGallery