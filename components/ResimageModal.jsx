'use client'

import React from 'react'
import Image from "next/image";
import ImageModal from './ImageModal';
import { useState } from 'react';

const ResimageModal = ({img}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0); // Track the initial touch position
  const threshold = 10; // Minimum distance to consider as a slide

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX); // Store initial touch position
  };


  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const distance = Math.abs(endX - startX);

    if (distance <= threshold) {
      setIsOpen(true)
    }
  };

  return (
       <div className="w-full  relative h-[450px] max-md:h-[300px]  " onDoubleClick={()=> setIsOpen(true)}   onTouchStart={handleTouchStart}  onTouchEnd={handleTouchEnd} >
          <Image src={img} className="w-full h-full object-contain" fill sizes="100%" alt="Car images" />
          <ImageModal isOpen={isOpen} closeModal={() => setIsOpen(false)} img={img} />   
        </div>
  )
}

export default ResimageModal