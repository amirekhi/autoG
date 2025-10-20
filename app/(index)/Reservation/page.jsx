

import React from 'react'
import clientPromise from '@/lib/mongo/mongodb';
import { ObjectId } from "mongodb";
import ViewMore from '@/components/ViewMore';
import { gettingSession } from '@/lib/session';
import ReservigBut from '@/components/ReservigBut';
import Image from 'next/image';
import ReservationGallery from '@/components/ReservationGallery';
import RelatedProducts from '@/components/RelatedProducts';

export const dynamic = 'force-dynamic';



const  Reservation = async ({searchParams}) => {
  const SearchParams = await searchParams
   
  const id = SearchParams.id
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const Car = await db.collection('Cars').findOne({ _id: new ObjectId(id) } );

   const ViewCar = {...Car , _id : ''}
  

  return (
    <>
        <section className='w-full h-[700px]  mx-auto overflow-hidden text-[#3b3a3ab6] max-md:h-auto ' > 
        {/* <div className='w-[80%] mx-auto flex justify-between   items-end relative h-[20vh] mb-20 max-md:mt-[80px]'>
                <div className='w-[40%] max-md:hidden ' > 
                {session != ''  &&
                  <div className='w-full h-[50%] text-left flex justify-center  flex-col relative '>
                    <h3 className='mt-2     text-xl font-semibold'><span className='text-2xl font-bold text-black '> Username :</span> {session.userId}</h3>
                    <h3 className='mt-2    text-xl font-semibold'><span className='text-2xl font-bold text-black '> Email:</span> {session.email}</h3>
                    <h3 className='mt-2     text-xl font-semibold'><span className='text-2xl font-bold text-black '> Phone Number :</span> {session.phoneNumber}</h3>
                  </div>
                  }
                </div>
                <div className='w-[40%] max-md:w-full'>
                <h1 className=''> Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem aliquam harum eveniet eligendi voluptatem modi ad inventore mollitia consequatur dignissimos.</h1>
              </div>
              </div> */}
              <div className='w-full  h-[650px] max-md:h-auto mx-auto flex justify-center gap-8  items-start max-md:items-center relative  max-md:flex-col mt-20 max-md:mt-4 '>
                <div className='w-[40%] h-[60vh]  max-md:min-h-[60vh] flex justify-start items-center flex-col  max-md:w-full max-md:mt-4 p-2 ' >
                  
                <ReservationGallery ImageUrls = {Car?.ImageUrls } />
           
                </div>
                <div className='w-[40%] h-[60vh]  max-md:h-auto  max-md:mt-4 r p-6 pl-12 max-md:pl-6 max-md:w-full   max-md:mb-12' >            
                  <h1 className='w-[40%]  text-3xl font-semibold max-md:w-[80%] text-black'> {Car.EN.model }</h1>   
                   {/* <div className='grid grid-cols-3 mt-12 w-full mx-auto'>
                        <h3 className=' font-semibold block' ><span className='text-xl text-black'>year</span> : {Car.year}</h3>
                        <h3 className=' font-semibold block' ><span className='text-xl text-black'>Model</span> : {Car.model}</h3> 
                        <h3 className='font-semibold block' ><span className='text-xl text-black'>Make</span> : {Car.make}</h3>     
                   </div> */}

                       <p className='text-lg font-bold text-gray-500 mt-2' > Price : {Car.EN.Price}</p>
                       <p className='w-full text-justify leading-loose mt-4 '> 
                            {Car.EN.describtion && Car.EN.describtion}
                      </p>

                      <div className='w-full mt-[200px] max-md:mt-4 h-auto flex justify-center gap-20 max-md:gap-5 items-center '>
                      <ReservigBut Title={'Reserve'} CarId ={id}/>
                      <ViewMore Title={'View more'} Car={ViewCar.EN} />
                      </div>
                       
             
                </div>
              </div>
             
                 
        </section>
        <RelatedProducts Title={'Related Cars'} Cat={Car.Categorie}/>
        </>
  )
}

export default Reservation


{/* <ReservationImgCar images = {Car.ImageUrls} /> */}