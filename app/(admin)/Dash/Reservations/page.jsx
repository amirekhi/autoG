"use client"
import React from 'react'
import { useEffect , useState } from 'react'
import { GetReservations } from './ResActions'

import { DeletingReservations } from './ResActions'

import { FaSearch } from 'react-icons/fa';
import SpinningLoading from '@/components/SpinningLoading'


import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



import Table from '@/components/Table'


const page = () => {
    const [Reservations , setReservations] = useState(null)
    const [WhatIsOpen , setWhatIsOpen] = useState(false)
    const [Columns , setColumns] = useState({userId : true , userEmail : true , userPhoneNumber : true , make: true , year : true})
    const [selectedReservations, setSelectedReservations] = useState({}); // State to track user inputs
    const [DeleteResponse, setDeleteResponse] = useState(); // State to track user inputs
    const [searchedName, setSearchedName] = useState('');

    

      const GettingReservations = async () => {
        const res = await GetReservations()
        
        setReservations(res)
        }

         const showSuccessToast = (error) => {
              toast.success(error, {
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
              const showToast = (param) => {
                toast.info(param, {
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


    useEffect(() => { 
        GettingReservations()
    } , [])

    const handleOpen = (param) => {
      if(WhatIsOpen == param){
        setWhatIsOpen('none')
      }else{
       setWhatIsOpen(param)
      }
    }

    const handleColumns = (param) => {
      if(Columns[param] == true)   {   
        setColumns((pervState) => ({ ...pervState ,  [param]: false, }) )
    }else{
      setColumns((pervState) => ({ ...pervState ,  [param]: true, }) )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    
    
    // Log the value of searchedName
    const res = await GetReservations(searchedName)
    showToast(`results for ${searchedName} `) 
    setReservations(res)
        
    

  }

  const handleChange = (e) => {
    setSearchedName(e.target.value); // Update state with the input value
  };
   

  const handleCheckboxChange = (Id) => {
    setSelectedReservations((prev) => ({
      ...prev,
      [Id]: !prev[Id], // Toggle the selected state
    }));
  };


 const  handleDelete = async () => {
  const trueKeys = Object.keys(selectedReservations).filter(key => selectedReservations[key]);
  const res = await DeletingReservations(trueKeys)
  if (res == true){
    showSuccessToast('Deleted Successfully !!')
  }else{
    showFailureToast('Somthing went wrong !!')
  }
  
  setSelectedReservations([])
  GettingReservations()
 }




  return (
   <section className='w-full min-h-[800px] flex justify-start flex-col items-center '>
    <div className='w-[95%] h-[10%] flex items-center justify-between   mx-auto' > 
     <div className=' p-8 mx-auto font-semibold' >{DeleteResponse}</div>
        <div>
          <div className={`inline-block mr-6 ${Object.values(selectedReservations).some((value) => value === true) ? ('') :  ('hidden')} `}>
              <button className={`px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300  `} onClick={handleDelete}>Delete</button>
              <button className={`px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300   `}  >Edit</button>
          </div>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ' onClick={() => {handleOpen('Filter')}} >Filter</button>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ' onClick={() => {handleOpen('Column')}} >Columns</button>
        </div> 
     </div>
     {WhatIsOpen == 'Filter' && (
     <form className="mb-12" onSubmit={handleSubmit} >
     <label className="flex items-center bg-gray-200 border-2 border-stone-400 rounded-lg overflow-hidden">
     <button type='submit' > <FaSearch className="text-gray-600 mx-3 text-xl" /></button>
       <input
         type="text"
         placeholder="Search..."
         value={searchedName} // Bind the value to the state
         onChange={handleChange} // Update state as the user types
         className="flex-grow p-2 outline-none text-gray-700 bg-transparent"
       />
      
     </label>
     
     </form>
   
     )}
     {WhatIsOpen == 'Column' && (
      <div className='mb-12'>
         <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ' onClick={() => {handleColumns('userId')}} >UserName</button>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 max-md:hidden ' onClick={() => {handleColumns('userPhoneNumber')}}  >PhoneNumber</button>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300  max-md:hidden'onClick={() => {handleColumns('userEmail')}}   >Email</button>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300  max-md:hidden'onClick={() => {handleColumns('make')}}   >make</button>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 max-md:hidden 'onClick={() => {handleColumns('year')}}   >year</button>
      </div>
     )}
    <div className='w-[80%]  max-md:w-full ' >
        <div className='h-[60px] w-[90%] border-b-2  border-stone-400 mx-auto grid grid-cols-6 m-12 max-md:grid-cols-2'>            
            {Columns.userId != false && <p className='self-center' >UserName</p> }
            {Columns.userPhoneNumber != false && <p className='self-center  max-md:hidden ' >PhoneNumber</p>}
            {Columns.userEmail != false && <p className='self-center  max-md:hidden ' >Email</p> }
            {Columns.make != false && <p className='self-center  max-md:hidden ' >Make</p> }
            {Columns.year != false && <p className='self-center  max-md:hidden ' >Year</p> }
           </div>
        {Reservations ? (Reservations.map((res , index) => (
         <Table Columns={Columns}  handleCheckboxChange={handleCheckboxChange} key={index} index={index} res={res} selectedReservations={selectedReservations} />
        ))) : (<SpinningLoading size={16} />)}

    </div>
    <ToastContainer
        transition={Slide}
        style={{ width: "90%", maxWidth: "360px" }}
      />
        
   </section>
  )


}

export default page