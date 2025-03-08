'use client'


import {  FiMoreHorizontal } from "react-icons/fi";
import React from 'react'
import { useState } from "react";
import ResDetails from "./ResDetails";

const Usertable = ({ Columns , handleCheckboxChange , index , user , selectedUsers}) => {

        const [isOpen ,setIsOpen] = useState(false)

        function shortenString(str, maxLength) {
                if (str.length <= maxLength) return str;
                return str.substring(0, maxLength) + '...';
              }
              
    
  return (
            <div className={`h-[60px] w-[90%] px-6 border-b-2  ${index % 2 == 0 ? ('bg-gray-200') : ('bg-white')} border-stone-400 mx-auto grid grid-cols-4  max-md:grid-cols-2`} >
            {Columns.Username != false && <p className='self-center md:hidden' > { shortenString(user.username , 8)} </p> }
            {Columns.Username != false && <p className='self-center max-md:hidden ' > {shortenString(user.username , 13)} </p> }
            {Columns.phoneNumber != false && <p className='self-center max-md:hidden' >{user.phoneNumber} </p> }
            {Columns.Email != false && <p className='self-center  max-md:hidden' >{user.email} </p> }

            <ResDetails closeModal={() => setIsOpen(false)} isOpen={isOpen} Details={user} />




                        <div className='flex justify-around items-center'>
                                <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8" onClick={() => {setIsOpen((prevState) => !prevState)}} >
                                        <FiMoreHorizontal />
                                </button>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers[user.email] || false}
                                    onChange={() => handleCheckboxChange(user.email)}
                                    className="w-[20px] h-[20px] self-center  mr-12"
                                    />
                        </div>

    
     
   </div>
  )
}

export default Usertable