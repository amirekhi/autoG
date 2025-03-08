"use client";


import { useState } from "react";
import Image from "next/image";
import hero from '@/public/hero.png'
import { calculateCarRent } from "@/utils";

import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import PECarDetails from "@/components/PECarDetails";

const PECarCard = ({ car }) => {

  const { _id,  کارکرد, سال, مدل, سازنده, گیربکس } = car;
  const queryParams = { _id }; // Example query parameters
  const queryString = new URLSearchParams(queryParams).toString();
  const router = useRouter()
   
  const [isOpen, setIsOpen] = useState(false);
  const carRent = calculateCarRent(کارکرد, سال);

  return (
    <div className="car-card group mx-auto relative max-md:my-8  py-6 ">

      <div className="car-card__content px-6">
        <h2 className="car-card__content-title">
          {سازنده} {مدل} 
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold px-6'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3  '>
        <Image src={ car.ImageUrls?.[0] || hero} alt='car model' fill priority  sizes="100%"  
        className="w-full h-full object-cover" />
      </div>

      <div className='relative flex w-full mt-2 px-6'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {گیربکس === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20}   height={20} alt="seat" />
            <p className="car-card__icon-text">{مدل?.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
              <div className="relative w-[20px] h-[20px]">
                    <Image src="/gas.svg" alt="seat" fill className="object-contain" sizes="100%" />
              </div> 
            <p className="car-card__icon-text">{کارکرد} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container gap-4">
          <CustomButton
            title='اطلاعات بیشتر'
            handleClick={() => setIsOpen(true)}
            Color='blue'
          />
          <CustomButton
            title='رزرو'
            handleClick={() => { router.push(`/Pe/Reservation?${queryString}`)}}
            Color='green'
          />
        </div>
      </div>

      <PECarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default PECarCard;
