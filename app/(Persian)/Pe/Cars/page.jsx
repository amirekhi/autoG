
import clientPromise from '@/lib/mongo/mongodb';
import React from 'react'
import {  ShowMore,  CustomFilter } from "@/components";
import {  Pefuels, PEyearsOfProduction, } from "@/constants";
import { allCars } from '@/constants';
import PESearchBar from '@/components/PersianComp/PESearchBar';
import PECarCard from '@/components/PersianComp/PECarCard';


export const Cars = async ({searchParams}) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  
  const Pre_data = await db.collection('Cars').find({} ).toArray();
  const data = Pre_data.map((obj)=>({...obj , _id : obj._id.toString()})  )

 
 

  const SearchParams = await searchParams

  const filterCars = (init_data) => {
    // year
  
     function  yearfilter(data) {
     return data?.filter(car => 
       car.EN?.year == Number(SearchParams.year) || 
       car.PE?.سال == Number(SearchParams.year)
       
     )
    }

    function makefilter(data) {
     return data.filter(car => 
       car.EN.make?.toLowerCase() === SearchParams.manufacturer.toLowerCase() || 
       car.PE.سازنده?.toLowerCase() === SearchParams.manufacturer.toLowerCase()
     );
   }
   

    function  modelfilter(data) {
     
     return data.filter(car => 
       (
       car.EN.model?.toLowerCase() == SearchParams.model.toLowerCase() || 
       car.PE.مدل?.toLowerCase() === SearchParams.model.toLowerCase()
         
       )
     )
    }

     function  fuelfilter(data) {
     return data.filter(car => 
     (
       car.EN.fuel_type?.toLowerCase() == SearchParams.fuel.toLowerCase() || 
     car.PE.سوخت?.toLowerCase() == SearchParams.fuel.toLowerCase()        
     )
    )
    }

     if(SearchParams.manufacturer > '' &&  SearchParams.model > '' && SearchParams.year > '' && SearchParams.fuel > ''){
        const lvl1 =  yearfilter(init_data)
        const lvl2 =  makefilter(lvl1)
        const lvl3 = modelfilter(lvl2)
        const lvl4 = fuelfilter(lvl3)
        return lvl4
     }


     if(SearchParams.manufacturer > '' &&  SearchParams.model > '' && SearchParams.year > '' && (SearchParams.fuel == null || SearchParams.fuel == '')){
        const lvl1 =  yearfilter(init_data)
        const lvl2 =  makefilter(lvl1)
        const lvl3 = modelfilter(lvl2)
        return lvl3
     }

     if(SearchParams.manufacturer > '' &&  SearchParams.model > '' && (SearchParams.year == null || SearchParams.year == '')  && SearchParams.fuel > ''){
        const lvl1 =  makefilter(init_data)
        const lvl2 = modelfilter(lvl1)
        const lvl3 = fuelfilter(lvl2)
        return lvl3
     }

     if(SearchParams.manufacturer > '' &&   (SearchParams.model == null || SearchParams.model == '' ) && SearchParams.year > '' && SearchParams.fuel > ''){
      const lvl1 =  yearfilter(init_data)
      const lvl2 =  makefilter(lvl1)
      const lvl3 = fuelfilter(lvl2)
      return lvl3
     }
     if((SearchParams.manufacturer == null || SearchParams.manufacturer == '') &&  SearchParams.model > '' && SearchParams.year > '' && SearchParams.fuel > ''){
      const lvl1 =  yearfilter(init_data)
      const lvl2 = modelfilter(lvl1)
      const lvl3 = fuelfilter(lvl2)
      return lvl3
   }

   if(SearchParams.manufacturer > '' &&  SearchParams.model > '' && (SearchParams.year == null || SearchParams.year == '') && (SearchParams.fuel == null || SearchParams.fuel == '')){
    const lvl1 =  makefilter(init_data)
    const lvl2 = modelfilter(lvl1)
   
    return lvl2
 }

    if(SearchParams.manufacturer > '' &&   (SearchParams.model == null || SearchParams.model == '' ) && SearchParams.year > '' && (SearchParams.fuel == null || SearchParams.fuel == '')){
      const lvl1 =  yearfilter(init_data)
      const lvl2 =  makefilter(lvl1)
      
      return lvl2
    }


    if((SearchParams.manufacturer == null || SearchParams.manufacturer == '') &&  SearchParams.model > '' && SearchParams.year > '' && (SearchParams.fuel == null || SearchParams.fuel == '')){
      const lvl1 =  yearfilter(init_data)
      const lvl2 = modelfilter(lvl1)
      
      return lvl2
   }

   if(SearchParams.manufacturer > '' &&   (SearchParams.model == null || SearchParams.model == '' ) && (SearchParams.year == null || SearchParams.year == '') && SearchParams.fuel > ''){
    const lvl1 =  makefilter(init_data)
    const lvl2 = fuelfilter(lvl1)

    return lvl2
 }

  if((SearchParams.manufacturer == null || SearchParams.manufacturer == '') &&  SearchParams.model > '' && (SearchParams.year == null || SearchParams.year == '') && SearchParams.fuel > ''){
    const lvl1 =  modelfilter(init_data)
    const lvl2 = fuelfilter(lvl1)
    return lvl2
  }

  if((SearchParams.manufacturer == null || SearchParams.manufacturer == '') &&   (SearchParams.model == null || SearchParams.model == '' ) && SearchParams.year > '' && SearchParams.fuel > ''){
    const lvl1 =  yearfilter(init_data)
    const lvl2 = fuelfilter(lvl1)
    return lvl2
 }

 if((SearchParams.manufacturer == null || SearchParams.manufacturer == '')  &&   (SearchParams.model == null || SearchParams.model == '' ) && (SearchParams.year == null || SearchParams.year == '') && SearchParams.fuel > ''){
  const lvl1 = fuelfilter(init_data)
  return lvl1
}
 if((SearchParams.manufacturer == null || SearchParams.manufacturer == '') &&  (SearchParams.model == null || SearchParams.model == '') && SearchParams.year > '' && (SearchParams.fuel == null || SearchParams.fuel == '' )){
  const lvl1 = yearfilter(init_data)
  
  return lvl1
}
 if((SearchParams.manufacturer == null || SearchParams.manufacturer == '' ) &&  SearchParams.model > '' &&  (SearchParams.year == null || SearchParams.year == '') && (SearchParams.fuel == null || SearchParams.fuel == '')){
  const lvl1 = modelfilter(init_data)
  return lvl1
}
 if(SearchParams.manufacturer > '' &&  (SearchParams.model == null || SearchParams.model == '' ) && (SearchParams.year == null || SearchParams.year == '') && (SearchParams.fuel == null || SearchParams.fuel == '' )){
  const lvl1 = makefilter(init_data)
  return lvl1
}
return init_data

  

    
    
   }

   

   



  

  
  
   const newFilteredCars =  filterCars(data)



  const isDataEmpty = !Array.isArray(data) || data.length < 1 || !data;

  return (
    <div className='mt-40 padding-x padding-y max-md:mt-12  overflow-x-hidden max-width' id='discover'>
    <div className=' flex flex-col items-end justify-start gap-y-2.5 text-black-100'>
      <h1 className='text-4xl font-extrabold md:text-6xl text-shadow-3d-subtle'>ماشین ها</h1>
      <p className='md:text-xl w-[700px] text-right mt-8 mb-12 text-[#777777] max-md:w-full'>  در این بخش، ما امکاناتی فراهم کرده‌ایم تا شما بتوانید خودروی مورد نظر خود را با استفاده از فیلترهای دقیق جستجو کنید. فقط کافیست ویژگی‌های مورد نظر خود را انتخاب کنید و از میان گزینه‌های متنوع بهترین خودرو را پیدا کنید</p>
    </div>

    <div className='home__filters'>
      <PESearchBar />

      <div className='home__filter-container'>
        <CustomFilter title='fuel' options={Pefuels} />
        <CustomFilter title='year' options={PEyearsOfProduction} />
      </div>
    </div>

    {!isDataEmpty ? (
      <section className='mb-[200px]'>
        <div className='home__cars-wrapper'>
          {newFilteredCars?.map((car , index) => (
            <PECarCard key={index} car={car} />
          ))}
        </div>

        <ShowMore
          pageNumber={(SearchParams.limit || 10) / 10}
          isNext={(SearchParams.limit || 10) > allCars.length}
        />
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


export default Cars