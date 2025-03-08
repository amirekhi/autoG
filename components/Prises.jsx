import React from 'react'
import { FaCar , FaShieldAlt ,FaTags } from 'react-icons/fa';


const Prises = () => {
  return (
    <section  className='w-full bg-blue-500 h-[400px] grid grid-cols-3 text-white max-lg:grid-cols-1 max-lg:h-auto  max-lg:py-12 max-lg:gap-12 '>
       <div className='flex justify-center items-center flex-col  gap-6 ' >
         <FaCar className='text-white text-8xl'  />
         <p className='text-xl font-bold w-[300px] text-center' >💰 Best Price, Highest Quality</p>
         <p className='w-[300px] text-center text-sm'>We believe that quality and price should go hand in hand. Therefore, our cars are offered at the best possible price with competitive terms, so you can have a unique buying experience.</p>
       </div> 
       
       <div className='flex justify-center items-center flex-col  gap-6 ' >
         <FaTags className='text-white text-8xl'  />
         <p className='text-xl font-bold w-[300px] text-center' >🚗 Unmatched Experience in the Luxury Car Market</p>
         <p className='w-[300px] text-center text-sm'>With over 1000 cars sold, we have gained extensive experience in this industry, allowing us to provide the best services with the highest standards.</p>
       </div> 
     
          <div className='flex justify-center items-center flex-col  gap-6 ' >
            <FaShieldAlt  className='text-white text-8xl'  />
            <p className='text-xl font-bold w-[300px] text-center' >✅ 100% Delivery Guarantee and Legal Transactions</p>
            <p className='w-[300px] text-center text-sm'>We provide all cars with a complete delivery guarantee. Additionally, all purchase and ownership transfer steps are done under official legal supervision to ensure you can complete your transactions with peace of mind.</p>
          </div> 

    </section>
  )
}

export default Prises