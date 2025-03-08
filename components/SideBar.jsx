"use client"

import React, { useState , useRef ,useEffect } from 'react'
import Image from 'next/image'
import logo from '../public/logo.svg'
import { Create } from '@/public'
import cars from '@/public/cars.png'
import Dashboard from '@/public/Dashboard.png'
import Link from 'next/link'


import menu from '@/public/menu-2.png'
import close from '@/public/close-2.png'
import { dashboardLinks  } from '@/constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'



{/* <Link href={'/admin/Create' } className={` w-[90%]  p-2  rounded-[5%] transition duration-300 hover:scale-110 hover:bg-gray-600 hover:text-white flex gap-2  ${active == '/admin/Create' ? ('bg-gray-500 text-white' ) : ('bg-white text-gray-600')} `}  onClick={()=>{setActive('/admin/Create') }} > <Image src={Craete} height={20} width={20}  alt='Create'/> Create {active == '/admin/Create' ? ('ok' ) : ('nope')} </Link>
            <Link href={'/admin/Cars' } className={` w-[90%]  p-2  rounded-[5%] transition duration-300 hover:scale-110 hover:bg-gray-600 hover:text-white flex gap-2 ${active == '/admin/Cars' ? ('bg-gray-500 text-white' ) : ('bg-white text-gray-600')}    `}  onClick={()=>{setActive('/admin/Cars')}} > <Image src={cars} height={20} width={20}  alt='Create'/> Cars {active == '/admin/Cars' ? ('ok' ) : ('nope')} </Link>
            <Link href={'/admin/Dashboard' } className={` w-[90%]  p-2  rounded-[5%] transition duration-300 hover:scale-110 hover:bg-gray-600 hover:text-white flex gap-2 ${active == '/admin/Dashboard' ? ('bg-gray-500 text-white' ) : ('bg-white text-gray-600')}  `}  onClick={()=>{setActive('/admin/Dashboard')}} > <Image src={Dashboard} height={20} width={20}  alt='Create'/> Dashboard {active == '/admin/Dashboard' ? ('ok' ) : ('nope')} </Link>
            <Link href={'/Create' } className={` w-[90%]  p-2  rounded-[5%] transition duration-300 hover:scale-110 hover:bg-gray-600 hover:text-white flex gap-2 ${active == '/admin/Create' ? ('bg-gray-500 text-white' ) : ('bg-white text-gray-600')}  `}  onClick={()=>{setActive('/admin/Create')}} > <Image src={Craete} height={20} width={20}  alt='Create'/> Create {active == '/admin/Create' ? ('ok' ) : ('nope')} </Link>
           */}


                                       {/* <li ><Link  href={'/admin/Create'} className={`text-[16px] cursor-pointer  font-bold font-poppings ${'/admin/Create' === active ? 'text-white' : 'text-secondary'}`} onClick={() => {setActive('/admin/Create')}} >Create</Link></li>
                            
                            <li ><Link  href={'/admin/Dashboard'} className={`text-[16px] cursor-pointer  font-bold font-poppings ${'/admin/Dashboard' === active ? 'text-white' : 'text-secondary'}`} onClick={() => {setActive('/admin/Dashboard')}} >Dashboard</Link></li>
                            
                            <li ><Link  href={'/admin/admin'} className={`text-[16px] cursor-pointer  font-bold font-poppings ${'/admin' === active ? 'text-white' : 'text-secondary'}`} onClick={() => {setActive('/admin')}} >admin</Link></li> */}
                            


const SideBar = () => {

  useGSAP(()=>{ 
    gsap.to('#sidebar' , {
      opacity:1,
      duration:1,
      x:0,
    })
  } , [])
   
  
   const [toggle , setToggle] = useState(false)
  
   const [active , setActive] = useState("")
   const menuRef = useRef(null)
   const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setToggle(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
  <>
    <section className='w-[350px] max-2xl:hidden  h-screen flex justify-center items-center flex-col gap-10 relative bg-[#182237] border border-gray-600  z-20  -translate-x-[100%] ' id='sidebar' >
        <Link href={'./'}  ><Image src='/User.png' height={80} width={80} alt='logo' className='absolute left-[30%] top-[50px] z-10 '/></Link> 
        <div className='w-full flex justify-center items-center  flex-col  h-full'>
           {dashboardLinks.map((item)=> (
            <div className='w-[90%] text-white   ' key={item.title} > 
                <h2 className='font-bold md-5 text-sm ' >{item.title}</h2>
                <ul className='h-full'>
                  {item.sub_title.map((sub)=> (
                    <Link  key={sub.title} href={sub.pathname} onClick={()=>{ setActive(sub.pathname) }} ><li className={`flex gap-6 ml-4 text-sm  w-[80%] h-8 m-4 z-20  ${active == sub.pathname ? ('bg-gray-200 rounded-md text-black') : ('') } `}><div className='flex justify-center items-center pl-2' ><Image src={sub.Image_src} width={20} height={20}   /></div><h3 className=' hover:scale-125 transition duration-300 ease-in-out flex justify-center items-center '>{sub.title} </h3></li></Link>
                  ))}  
                </ul> 
            </div>
           ))}
        </div>

        

        <footer className='absolute bottom-0 left-0 w-[90%] h-[100px] text-white font-bold ml-3 max-md:hidden'>
          
            <p>Welcome to the dashboard</p>
        </footer>
        
    </section>
    
    
    <div ref={menuRef} className=' 2xl:hidden flex  justify-end item-center  z-20 p-5 sm:p-10 w-full'  >
             <div className='w-[90-px] h-[90px] flex translate-x-8  -translate-y-5   justify-center item-center  '>
            <Image src= {toggle ? close: menu } height={60} width={60} className=' m-5'   alt="menu" onClick={() => setToggle(!toggle)} />
              </div>
            <div className={`${!toggle ? 'hidden' : 'flex'} p-8 bg-gray-300 absolute top-20 right-0 mx-6 my-2 min-w-[140px] z-20 rounded-xl `} >
                  <ul className='list-none flex  justify-end item-starts flex-col gap-4'>
                            {dashboardLinks.map((item)=> (
                              item.sub_title.map((sub)=>(
                                <li key={sub.title}><Link href={sub.pathname} className={`text-[16px] cursor-pointer  font-bold font-poppings ${sub.pathname === active ? 'text-white' : 'text-secondary'}`} onClick={() => {setActive(sub.pathname)}} >{sub.title}</Link></li>
                              ))
                            ))}

                                                
                   </ul>
            </div>
          </div>

          </>
  )
}

export default SideBar