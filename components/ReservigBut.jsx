"use client"

import React, { useEffect } from 'react'
import { handlerRgistration } from '@/app/serveractions'
import { useState } from 'react'
import ReservationForm from './ReservationForm'

import { AiOutlineCheckCircle } from "react-icons/ai";


const ReservigBut = ({CarId ,Title}) => {
    const [Res, setRes] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    

 const habdleRegister = async ( ) => {
 const res = await  handlerRgistration(CarId)
 setRes(res)
 }


 useEffect(() => { 
  if(Res != null){
    if(Res?.error == 'no_session'){
      setIsOpen(true)
    }
    if(Res?.error == 'file_added'){
      alert('Thank You We will Contact you , as soon as posible')
    }
  }
 } , [Res])
  

  return (
    <>
       <ReservationForm  isOpen={isOpen} closeModal={() => setIsOpen(false)} CarId={CarId}  />
       <button onClick={habdleRegister} className={`w-full h-[60px]  block  mt-8 transition duration-200 hover:scale-95 font-semibold  ${Res?.error == 'file_added' ? ('bg-green-800') : ('bg-green-500 text-white') }`} > {Res?.error == 'file_added' ? (  <AiOutlineCheckCircle className="text-white mx-auto" size={40} />) : (Title) }</button>
    </>
  )
}

export default ReservigBut