"use client"


import {  FiMoreHorizontal } from "react-icons/fi";
import React from 'react'
import { useState } from "react";
import ResDetails from "./ResDetails";

const CatTable = ({ Columns , handleCheckboxChange , index , res , selectedReservations}) => {

    const [isOpen ,setIsOpen] = useState(false)


    function shortenString(str, maxLength) {
      if (str.length <= maxLength) return str;
      return str.substring(0, maxLength) + '...';
    }
    


  return (
     <div className={`h-[60px] w-[90%] border-b-2 ${index % 2 == 0 ? ('bg-gray-200') : ('bg-white')}  px-6 border-stone-400 mx-auto grid grid-cols-${Object.keys(Columns).filter(key => Columns[key]).length + 1}  max-md:grid-cols-2 `} >
   
               {Columns.Name  == true && <p className='self-center md:hidden ' >{ shortenString(res.Name , 8)} </p>  }
               {Columns.Name  == true && <p className='self-center max-md:hidden' >{shortenString(res.Name , 13)} </p>  }
               {Columns.Describtion  == true && <p className='self-center  max-md:hidden ' >{res.Describtion} </p> }
            
   
               
                <ResDetails closeModal={() => setIsOpen(false)} isOpen={isOpen} Details={res} />
                
                <div className='flex justify-around items-center'>
                  <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8" onClick={() => {setIsOpen((prevState) => !prevState)}} >
                           <FiMoreHorizontal />
                  </button>
                 <input
                 type="checkbox"
                 checked={selectedReservations[res._id] || false}
                 onChange={() => handleCheckboxChange(res._id)}
                 className="w-[20px] h-[20px] self-center  mr-12"
               />
               </div>
              </div>
  )
}

export default CatTable