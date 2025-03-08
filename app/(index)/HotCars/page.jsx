


import clientPromise from '@/lib/mongo/mongodb';
import React from 'react'
import { CarCard} from "../../../components";

import { allCars } from '../../../constants';

const HotCars = async () => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const Pre_data = await db.collection('Cars').find({Hot : true}).toArray();
    const data = Pre_data.map((obj)=>({...obj , _id : obj._id.toString()})  )

    const isDataEmpty = !Array.isArray(data) || data.length < 1 || !data;

  return (
    <div className='mt-40 max-md:mt-12 padding-x padding-y  overflow-x-hidden max-width' id='discover'>
    <div className='home__text-container'>
      <h1 className='text-4xl font-extrabold'><span className=' text-shadow-3d-subtle'>Hot</span> Cars</h1>
      <p className='text-lg w-[700px] mt-8 mb-12 max-md:w-full' >In this section, you can discover the latest and most popular cars that have attracted a lot of attention in the automotive world. These cars are at the top due to their unique design, advanced features, and high demand in the market. If you are looking for a car that will turn heads and provide you with a unique driving experience, this is the place for you!</p>
    </div>

   

    {!isDataEmpty ? (
      <section className='mb-[200px]'>
        <div className='home__cars-wrapper'>
          {data?.map((car , index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>

        
      </section>
    ) : (
      <div className='home__error-container'>
        <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
        <p>{allCars?.message}</p>
      </div>
    )}
  </div>
    
  )
}


export const dynamic = 'force-dynamic' 
export default HotCars