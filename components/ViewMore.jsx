"use client"

import React from 'react'
import { useState } from 'react';
import CarDetails from './PECarDetails';

const ViewMore = ({Car, Title}) => {
    const [isOpen, setIsOpen] = useState(false);
   
   
  
  return (
    <>
                  <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={Car} />    
                  <button onClick={() => ( setIsOpen(true))} className='w-full h-[60px]  block  mt-8 transition duration-200 hover:scale-95 bg-blue-300 font-semibold' >{Title}</button>
                  
    </>
  )
}

export default ViewMore