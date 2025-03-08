

import React from 'react'
import clientPromise from '@/lib/mongo/mongodb';
import { ObjectId } from "mongodb";
import ViewMore from '@/components/ViewMore';
import { gettingSession } from '@/lib/session';
import ReservigBut from '@/components/ReservigBut';
import ReservationGallery from '@/components/ReservationGallery';
import RelatedProducts from '@/components/RelatedProducts';



export const dynamic = 'force-dynamic';



const  Reservation = async ({searchParams}) => {
  const SearchParams = await searchParams
   
  const id = SearchParams._id
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const Car = await db.collection('Cars').findOne({ _id: new ObjectId(id) } );

   const session =  await gettingSession() || ''
   const ViewCar = {...Car , _id : ''}
   
 

  return (
    <>
        <section className='w-full   mx-auto overflow-hidden text-[#3b3a3ab6] max-md:h-auto ' > 
              {/* <div className='w-[80%] mx-auto flex justify-between   items-end relative h-[20vh] mb-20'>
                <div className='w-[40%] max-md:hidden' > 
                {session != ''  &&
                  <div className='w-full  flex justify-center items-center flex-col relative  '>
                    <h3 className='w-full  text-xl font-semibold  flex justify-center gap-8 items-center flex-row-reverse'><span className='text-2xl font-bold text-black '> : نام کاربری  </span> {session.userId}</h3>
                    <h3 className='w-full  text-xl font-semibold flex justify-center gap-8 items-center flex-row-reverse'><span className='text-2xl font-bold text-black '>  : ایمیل</span> {session.email}</h3>
                    <h3 className='w-full  text-xl font-semibold flex justify-center gap-8 items-center flex-row-reverse '><span className='text-2xl font-bold text-black '> : شماره تماس</span> {session.phoneNumber}</h3>
                  </div>
                  }
                </div>
                <div className='w-[40%] max-md:w-full'>
                    <h1 className='text-justify-right'>سلام به صفحه رزرو کردن ماشین خوشامدید اطلاعات ماشین مورد نظر  در باکس اطلاعات و عکس های ماشین مورد نظر در باکس گالری به نمایش گزاشته شده  در صورت تایید با فشردن دکمه درخاست رزرو درخاست شما ثبت و با شما تماس خواهد گرفته شد </h1>
                </div>
              </div> */}
              <div className='w-[90%] h-[80vh] max-md:h-auto mx-auto flex justify-center  gap-8 items-start relative max-md:flex-col max-md:items-center mt-20 '>
                <div className='w-[40%] h-[60vh]  max-md:h-[50vh] flex justify-start items-center flex-col  max-md:w-full max-md:mt-12 p-2 ' >
                    <ReservationGallery ImageUrls = {Car?.ImageUrls } />
                </div>
                <div className='w-[40%] h-[60vh]   rounded-lg  max-md:mt-12  p-6 pl-12  max-md:pl-6  max-md:w-full max-md:h-[80vh]    max-md:mb-12' >            
                  {/* <h3 className='w-full flex gap-4 justify-center  items-center text-2xl font-semibold max-md:justify-end'>اطلاعات ماشین مورد نظر</h3>    */}
                  <h1 className='w-[40%]  text-3xl font-semibold max-md:w-[80%] text-black '> {Car.model }</h1> 
                   {/* <div className='grid grid-cols-3 mt-12 w-full text-right mx-auto max-md:grid-cols-1'>
                        <h3 className=' font-semibold block ' >{Car?.year} :<span className='text-xl md:text-2xl text-black'> سال ساخت</span>  </h3>
                        <h3 className=' font-semibold block ' >{Car?.city_mpg} :<span className='text-xl md:text-2xl text-black'> کیلومتر کارکرد</span>  </h3> 
                        <h3 className='font-semibold block ' >{Car?.make} :<span className='text-xl md:text-2xl text-black'> سازنده  </span>  </h3>     
                   </div> */}

                        <p className='text-lg font-bold text-blue-500 mt-2' >$2000  -  $3000</p>
                       <p className='w-full text-right leading-loose mt-10'>
                        {Car?.describtion}  
                            
                      </p>
                       <div className='w-full pt-[200px]' >
                          <ReservigBut Title={'درخاست رزرو کردن'} CarId ={id}/>
                          <ViewMore Title={'اطلاعات بیشتر'} Car={ViewCar} />
                        </div>
                </div>
              </div>
                 
        </section>
         <RelatedProducts Title={"ماشین های دیگر"} Cat={Car.Categorie?.Name}  />
        </>
  )
}

export default Reservation


