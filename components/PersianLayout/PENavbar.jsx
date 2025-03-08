"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import Link from 'next/link'
import { useState } from 'react'
import { menu, close } from '@/assets'
import { useEffect } from 'react'

import gsap from 'gsap'
import { PEnavLinks } from '@/constants'
import { useGSAP } from '@gsap/react'
import { redirect } from 'next/navigation'
import { gettingClientsideSession } from '@/app/(index)/login/actions'
import { logout } from '@/app/(index)/login/actions'
import { AiOutlinePhone } from 'react-icons/ai'


const PENavbar = () => {
  const [active , setActive] = useState("")
  const menuRef = useRef(null)
  const [toggle , setToggle] = useState(false)
  const [Session ,setSession] = useState('')
  
  let NavSession = Session || ''
  
  function shortenString(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  }
  

  useEffect( () => { 
    const getSession = async ( ) => {
      const res = await gettingClientsideSession()
      setSession(res) 
    }
    getSession()
  } , [])
  
  
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setToggle(false);
    }
  };


  useGSAP(()=> {
    gsap.to("#navbar" , {
      y: 0 , 
      duration:1,
      delay:0.3,
    })

  } , [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className=' relative max-w-full  lg:max-w-[95%] 2xl:max-w-[80%]   mx-auto  z-50 h-[120px]  flex text-black justify-around items-center   max-xl:justify-between bg-white' >
      <Link href={'/Pe'} className={`${NavSession != '' && ('max-md:hidden')}`} ><Image src={logo} height={80} alt='menu' className='object-contain  ml-8 -translate-y-6  hover:-translate-y-8 transition  duration-300 ease-in-outs '  /></Link> 
      {NavSession != '' ? (<div className='flex justify-center items-center gap-3'><h3 className='text-2xl font-semibold max-md:pl-6'>{ shortenString(NavSession.userId , 8)}</h3><button className='w-[100px] h-[50px] rounded-full hover:scale-110 transition duration-200   bg-red-400 text-white max-md:w-[80px] ' onClick={ async () => { await logout()
       window.location.reload() }} >خروج</button> </div>) : (<div className='flex gap-4 w-[33%] py-4 justify-center items-center h-full max-sm:flex-col '><button className='w-[100px] h-[50px] rounded-full hover:scale-110 transition duration-200   bg-gray-400 text-white max-md:w-[80px] ' onClick={()=> {redirect('/Pe/Sign-Up')}} >ثبت نام</button> <button className='w-[100px] h-[50px] rounded-full   hover:scale-110 transition duration-200 bg-blue-500 text-white  max-md:w-[80px]' onClick={()=> {redirect('/Pe/login')}} >ورود</button> </div>)}
      <nav className=' flex justify-center items-center -translate-y-20 gap-11 max-xl:hidden' id='navbar'>
              {PEnavLinks.map((link)=> (
                <Link key={link.path} href={link.path} className={` ${link.path === active ? 'text-blue-400 border-b-2 border-blue-600' : 'text-secondary'} hover:text-blue-700 font-bold hover:scale-125  transition duration-300 ease-in-outs `  } onClick={() => {setActive(link.path)}} > {link.title} </Link>
              ))}
              
              <Link href="tel:09336565309">
                <div className=" flex justify-center items-center px-4 py-2 bg-green-400 text-white rounded-lg shadow min-w-[100px] text-center hover:bg-green-600 transition-all duration-300 cursor-pointer">
                      <AiOutlinePhone className='text-2xl  '/>
                </div>
             </Link>
      </nav>
       

      <nav ref={menuRef} className="xl:hidden flex  justify-end w-[20%] items-center z-50 ">
          <Image 
            src={toggle ? close : menu} 
            height={40} 
            width={40} 
            className="-translate-x-10" 
            alt="menu" 
            onClick={() => setToggle(!toggle)} 
          />
          <div 
            className={`${!toggle ? 'hidden' : 'flex'} p-8 bg-gray-300 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-50 rounded-xl`}
          >
            <ul className="list-none flex relative z-50 justify-center items-end flex-col gap-4">
              {PEnavLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className={`text-[16px] cursor-pointer font-bold font-poppins ${link.path === active ? 'text-white' : 'text-secondary'}`}
                    onClick={() => setActive(link.path)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
    </nav>


    </header>
  )
}

export default PENavbar