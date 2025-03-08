"use client"


import { useEffect } from 'react'
import { CarCardthree } from '@/components'


import React, { useState } from 'react'




const DeletedCars = () => {
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch('/api/DeletedCars' ,{cache : 'no-store' , headers:{ 'Content-Type': 'application/json', anotherheader : 'helloninja'}});
      const data = await res.json();
      setCars(data);
      setLoading(false)
    };

    fetchData();
    
  }, []);

  const [Cars , setCars] = useState([])
  const [Loading , setLoading] = useState(true)
  const [pageNum , setPageNum] = useState(1)
  const slicedCars = Cars.slice((pageNum *6)-6,pageNum * 6)
  
 


  
  return (
    <section className='flex flex-col  min-h-[100vh] overflow-auto py-16 '>


    <div className='flex items-center  justify-center flex-col gap-3 p-5  ml-auto  '>
            <div className='flex items-center justify-center gap-3 p-1 ' >
            <button className='bg-gray-300  p-1  rounded-md hover:scale-125 transition duration-300 ease-in-out  ' onClick={()=>{ if (pageNum > 1 ){setPageNum(prevCount => prevCount - 1)}}}  >Prev</button>
            <button className='bg-gray-300  p-1 rounded-md hover:scale-125 transition duration-300 ease-in-out' onClick={()=>{setPageNum(prevCount => prevCount + 1)}} >Next</button>
            </div>
            <p className='text-sm'>Page number:{pageNum}</p>
        </div>




{Loading   

    ? (<div className="flex items-center justify-center h-[60vh]">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
         </div>)
     : (<section className='ml-6 max-md:ml-0  ' >
            <div className='home__cars-wrapper xl:grid-cols-3 2xl:grid-cols-4  lg:grid-cols-2 max-lg:grid-cols-1'>
              {slicedCars?.map((car , index) => (
                <CarCardthree key={index} car={car} />
              ))}
            </div>
      </section>)
      }




</section>
  )
}

export default DeletedCars