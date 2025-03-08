"use client"

import { GetCarsByCat } from '@/app/(index)/Reservation/Cars'
import React, { useEffect, useState } from 'react'
import { CarCard } from '.'

const RelatedProducts = ({Cat , Title}) => {
   const [Products , setProducts] =  useState([])

    useEffect(() => {
        const GetProducts = async () => {
            if(Cat != null || Cat == "Select an option"){
            const res = await GetCarsByCat(Cat)
            setProducts(res)
            }
        }

        GetProducts()
     } , [])

  return (
    <section className='w-[80%] mx-auto max-md:mt-20'>
      {Products.length != 0 &&  <h2 className={`text-blue-500 text-4xl text-shadow-3d-subtle ${Title == "Related Cars" ? ('') : ('text-right ')} max-md:text-center `}>{Title}</h2>}
    <div className='w-full relative grid grid-cols-4  gap-10 my-20 max-md:grid-cols-1' >
       {Products.map((product , index) => (
        <CarCard key={index} car={product} />
       ))

       }
    </div>
    </section>
  )
}

export default RelatedProducts