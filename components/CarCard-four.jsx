"use client";

import close from '@/public/close.svg'
import { useState } from "react";
import Image from "next/image";
import hero from '../public/hero.png'
import { calculateCarRent } from "../utils";

import CustomButton from "./CustomButton";
import CarDetails from "./PECarDetails";


const CarCard_four = ({ car }) => {
  const {  url, city_mpg, year, make, model, transmission, drive } = car;


 

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group mx-auto relative py-6  ">

      <div className="car-card__content px-6">
        <h2 className="car-card__content-title">
          {make} {model} 
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold px-6'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={ car.ImageUrls?.[0] || hero} alt='car model' fill priority   sizes='100%'
        className="absolute inset-0" />
      </div>

      <div className='relative flex w-full mt-2 px-6'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel'  />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20}   height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard_four;
