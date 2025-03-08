"use client";

import close from '@/public/close.svg'
import { useState } from "react";
import Image from "next/image";
import hero from '../public/hero.png'
import { calculateCarRent } from "../utils";

import edit from '@/public/edit.png'
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import Link from 'next/link';


import { ToastContainer, toast, Slide } from "react-toastify";




const CarCard = ({ car }) => {
  

  const { city_mpg, year, make, model, transmission, drive , ImageUrls} = car.EN
  const Rest = {city_mpg, year, make, model, transmission, drive , ImageUrls}



  const showFailureToast = (error) => {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "custom-progress-bar-error",
        toastClassName: "custom-toast-error",
      });
    };
    const showSuccessToast = (param) => {
      toast.success(param, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "custom-progress-bar-error",
        toastClassName: "custom-toast-error",
      });
    };


  const handleDelete = async ( ) => {
    
    const response = await fetch(`/api/Delete/${car._id}` , {
       method : 'DELETE',
       headers: {
        'Content-Type': 'application/json',
        
      },
      body :JSON.stringify({...car})
    
    })
      if (!response.ok) {
        showFailureToast('Failed to delete the item')
      }else{
        showSuccessToast('Successfully Deleted')
        setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
      
      

      
    
      
      
  }

  

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group mx-auto relative  mt-4  py-6 ">
      <button onClick={ ()=> handleDelete()} className='absolute top-0 right-0 m-4 z-10 hover:scale-125 transition duration-200   ' ><  Image objectFit='cover'  src={close} alt='close' width={30} /></button>
       <Link href={{
        pathname : '/Dash/Create/Update',
        query : {
          id: `${car._id}`
        }
       }}> <button  className='absolute top-0 right-10 mr-5 hover:scale-125 transition duration-200  m-4 z-10 ' ><  Image objectFit='cover'  src={edit} alt='close' width={30} /></button></Link>
      <div className="car-card__content px-6">
        <h2 className="car-card__content-title">
          {make} {model} 
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold px-6 '>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={ car.ImageUrls?.[0]  || hero} alt='car model' fill priority     objectFit="cover"
        className="absolute inset-0" />
      </div>

      <div className='relative flex w-full mt-2 px-6'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20}  height={20} alt="seat" />
            <p className="car-card__icon-text">{drive?.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20}  height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            handleClick={() => setIsOpen(true)}
            Color='blue'
          />
        
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
         <ToastContainer
                transition={Slide}
                style={{ width: "90%", maxWidth: "360px" }}
              />
    </div>
  );
};

export default CarCard;
