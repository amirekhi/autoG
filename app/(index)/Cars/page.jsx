
import clientPromise from '@/lib/mongo/mongodb';
import React from 'react'
import { CarCard, ShowMore, SearchBar, CustomFilter } from "../../../components";
import { fuels, yearsOfProduction } from "../../../constants";
import { allCars } from '../../../constants';


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
        car.PE?.سال == SearchParams.year
        
      )
     }

     function makefilter(data) {
      return data.filter(car => 
        car.EN.make?.toLowerCase() == SearchParams.manufacturer.toLowerCase() || 
        car.PE.سازنده?.toLowerCase() == SearchParams.manufacturer.toLowerCase()
      );
    }
    

     function  modelfilter(data) {
      
      return data.filter(car => 
        (
        car.EN.model?.toLowerCase() == SearchParams.model.toLowerCase()|| 
        car.PE.مدل?.toLowerCase() == SearchParams.model.toLowerCase()
          
        )
      )
     }

      function  fuelfilter(data) {
      return data.filter(car => 
        car.EN.fuel_type?.toLowerCase() == SearchParams.fuel.toLowerCase()|| 
      car.PE.سوخت?.toLowerCase() == SearchParams.fuel.toLowerCase()        
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
    <div className='home__text-container'>
      <h1 className='text-4xl font-extrabold text-shadow-3d-subtle'>Cars</h1>
      <p className='w-[700px] mt-8 mb-12 text-lg max-md:w-full'>In this section, we have provided features that allow you to search for your desired car using precise filters. Simply select your desired features, and find the best car from a wide range of options.</p>
    </div>

    <div className='home__filters'>
      <SearchBar />

      <div className='home__filter-container'>
        <CustomFilter title='fuel' options={fuels} />
        <CustomFilter title='year' options={yearsOfProduction} />
      </div>
    </div>

    {!isDataEmpty ? (
      <section className='mb-[200px]'>
        <div className='home__cars-wrapper'>
          {newFilteredCars?.map((car , index) => (
            <CarCard key={index} car={car} />
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