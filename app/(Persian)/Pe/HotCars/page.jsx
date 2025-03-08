


import clientPromise from '@/lib/mongo/mongodb';
import React from 'react'


import { allCars } from '@/constants';
import PECarCard from '@/components/PersianComp/PECarCard';

const HotCars = async () => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const Pre_data = await db.collection('Cars').find({Hot : true}).toArray();
    const data = Pre_data.map((obj)=>({...obj , _id : obj._id.toString()})  )

    const isDataEmpty = !Array.isArray(data) || data.length < 1 || !data;

  return (
    <div className='mt-40 max-md:mt-12 padding-x padding-y  overflow-x-hidden max-width' id='discover'>
  <div className=' flex flex-col items-end justify-start gap-y-2.5 text-black-100'>
      <h1 className='text-4xl font-extrabold md:text-6xl text-right' >   ماشین های <span className='text-shadow-3d-subtle'>پرطرفدار</span>  </h1>
      <p className='md:text-xl mt-8 mb-12 w-[700px] text-[#777777] text-right max-md:w-full'>در این بخش، شما می‌توانید با جدیدترین و پرطرفدارترین خودروهای روز آشنا شوید که طرفداران زیادی در دنیای خودرو دارند. این خودروها به دلیل طراحی منحصر به فرد، ویژگی‌های فنی پیشرفته و محبوبیت در بازار، در صدر توجهات قرار دارند. اگر به دنبال خودرویی هستید که توجه همه را جلب کند و تجربه‌ای متفاوت از رانندگی را برای شما فراهم کند، اینجا محل مناسبی است!</p>
    </div>

   

    {!isDataEmpty ? (
      <section className='mb-[200px]'>
        <div className='home__cars-wrapper'>
          {data?.map((car , index) => (
            <PECarCard key={index} car={car} />
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