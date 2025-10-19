"use client";


import { useState } from "react";
import Image from "next/image";
import hero from '../public/hero.png'


import CustomButton from "./CustomButton";

import { useRouter } from "next/navigation";
import CarDetails from "./CarDetails";

const CarCard = ({ car }) => {

  const {   url, Milage, year, make, model, transmission, Price  } = car.EN;
  const id = car._id;
  const queryParams = { id }; // Example query parameters
  const queryString = new URLSearchParams(queryParams).toString();
  const router = useRouter()
   
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="car-card group mx-auto relative py-6 max-md:my-4   ">

      <div className="car-card__content justify-start  px-6">
        <h2 className="car-card__content-title">
          {make} {model} 
        </h2>
      </div>

      <p className='flex mt-[3px] text-[16px] leading-[38px] font-semibold px-6 text-[#727272]'>
        <span className='self-center text-[14px] leading-[17px] font-semibold mr-[4px] '> Price :</span>
       {Price && Price}
        <span className='self-center text-[14px] leading-[17px] font-extrabold ml-[4px]  '>Milion Toman</span>
      </p>

      <div className='relative w-full h-[200px] my-3 '>
        <Image src={ car.ImageUrls?.[0] || hero} alt='car model' fill priority sizes="100%"     
        className="w-full h-full object-cover" />
      </div>

      <div className='relative flex w-full mt-2 px-6'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/transmition.png' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/calender.png" width={20}   height={20} alt="seat" />
            <p className="car-card__icon-text">{year}</p>
          </div>
          <div className="car-card__icon">
          <div className="relative w-[20px] h-[20px]">
                 <Image src="/kilometer.svg" alt="seat" fill className="object-contain" sizes="100%" />
            </div>      
            <p className="car-card__icon-text">{Milage} kilometer</p>
          </div>
        </div>

        <div className="car-card__btn-container gap-4">
          <CustomButton
            title='Details'
            handleClick={() => setIsOpen(true)}
            Color='blue'
          />
          <CustomButton
            title='More'
            handleClick={() => { router.push(`/Reservation?${queryString}`)}}
            Color='green'
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car.EN}  ImageUrls={car.ImageUrls}/>
    </div>
  );
};

export default CarCard;
