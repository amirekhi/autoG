"use client";


import { useState } from "react";
import Image from "next/image";
import hero from '@/public/hero.png'


import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import PECarDetails from "@/components/PECarDetails";

const PECarCard = ({ car }) => {

  const {   کارکرد, سال, مدل, سازنده, گیربکس , قیمت } = car.PE;
  const id = car._id;
  const queryParams = { id }; // Example query parameters
  const queryString = new URLSearchParams(queryParams).toString();
  const router = useRouter()
   
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div className="car-card group mx-auto relative max-md:my-8  py-6 ">

      <div className="car-card__content px-6 justify-end">
        <h2 className="car-card__content-title  ">
          {سازنده} {مدل} 
        </h2>
      </div>

      <p className='flex w-full  mt-[3px] text-[16px] leading-[38px] font-semibold px-6 justify-end  text-[#727272]'>
        <span className='self-center text-[14px] leading-[17px] font-semibold  mr-[4px]'>میلیون تومان </span>
        {قیمت &&  قیمت }
        <span className='self-center text-[14px] leading-[17px] font-medium ml-[4px]'> : قیمت</span>
      </p>

      <div className='relative w-full h-[200px] my-3  '>
        <Image src={ car.ImageUrls?.[0] || hero} alt='car model' fill priority  sizes="100%"  
        className="w-full h-full object-cover" />
      </div>

      <div className='relative flex w-full mt-2 px-6'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/transmition.png' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {گیربکس}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/calender.png" width={20}   height={20} alt="seat" />
            <p className="car-card__icon-text"> {سال}</p>
          </div>
          <div className="car-card__icon">
              <div className="relative w-[20px] h-[20px]">
                    <Image src="/kilometer.svg" alt="seat" fill className="object-contain" sizes="100%" />
              </div> 
            <p className="car-card__icon-text">{کارکرد} کیلومتر</p>
          </div>
        </div>

        <div className="car-card__btn-container gap-4">
          <CustomButton
            title='مشخصات'
            handleClick={() => setIsOpen(true)}
            Color='blue'
          />
          <CustomButton
            title='بیشتر'
            handleClick={() => { router.push(`/Pe/Reservation?${queryString}`)}}
            Color='green'
          />
        </div>
      </div>

      <PECarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car.PE}  ImageUrls={car.ImageUrls}/>
    </div>
  );
};

export default PECarCard;
