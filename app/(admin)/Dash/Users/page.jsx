"use client"
import React from 'react'
import { useEffect , useState } from 'react'

import { GetUsers , DeletingUsers } from './Usersactions'

import { FaSearch } from 'react-icons/fa';
import SpinningLoading from '@/components/SpinningLoading';


import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Usertable from '@/components/Usertable';




const page = () => {
    const [Users , setUsers] = useState(null)
    const [isWhatIsOpen , setIsWhatIsOpen] = useState(false)
    const [Columns , setColumns] = useState({Username : true , Email : true , phoneNumber : true})
    const [selectedUsers, setSelectedUsers] = useState({}); // State to track user inputs


    const [searchedName, setSearchedName] = useState('');

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

      const GettingUsers = async () => {
            const res = await GetUsers()
            setUsers(res)
            }


    useEffect(() => { 
        GettingUsers()
    } , [])


    const handleOpen = (param) => {
      if(isWhatIsOpen == param){
        setIsWhatIsOpen('none')
      }else{
       setIsWhatIsOpen(param)
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
    const res = await GetUsers(searchedName) 
    showToast(`Results for ${searchedName}`) 
    setUsers(res)
  }

  const handleChange = (e) => {
    setSearchedName(e.target.value); // Update state with the input value
  };
   

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId], // Toggle the selected state
    }));
  };


 const  handleDelete = async () => {
  const trueKeys = Object.keys(selectedUsers).filter(key => selectedUsers[key]);
  const res = await DeletingUsers(trueKeys )
  
  if (res == true){
    showSuccessToast('Deleted Successfully !!')
  }else{
    showFailureToast('Somthing went wrong !!')
  }
  
  setSelectedUsers([])
  GettingUsers()
 }

 


  return (
   <section className='w-full min-h-[800px] flex justify-start items-center flex-col '>
     <div className='w-[95%] h-[10%] flex items-center justify-end  mx-auto' > 
    
        <div>
          <div className={`inline-block mr-6 ${Object.values(selectedUsers).some((value) => value === true) ? ('') :  ('hidden')} `}>
              <button className={`px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300  `} onClick={handleDelete}>Delete</button>
              <button className={`px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300   `}  >Edit</button>
          </div>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ' onClick={() => {handleOpen('Filter')}} >Filter</button>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ' onClick={() => {handleOpen('Column')}} >Columns</button>
        </div> 
     </div>
     {isWhatIsOpen == 'Filter' && (
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
     {isWhatIsOpen == 'Column' && (
      <div className='mb-12'>
         <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300 ' onClick={() => {handleColumns('Username')}} >UserName</button>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300   max-md:hidden' onClick={() => {handleColumns('phoneNumber')}}  >PhoneNumber</button>
          <button className='px-3 hover:scale-95 transition duration-200 h-[30px] m-1 rounded-lg bg-gray-300  max-md:hidden 'onClick={() => {handleColumns('Email')}}   >Email</button>
      </div>
     )}
    <div className='w-[80%]  max-md:w-full ' >
        <div className='h-[60px] w-[90%] border-b-2  border-stone-400 mx-auto grid grid-cols-4  m-12 max-md:grid-cols-2'>     
             {Columns.Username != false && <p className='self-center' >UserName</p> }
            {Columns.phoneNumber != false && <p className='self-center max-md:hidden' >PhoneNumber</p> }
            {Columns.Email != false && <p className='self-center  max-md:hidden' >Email</p> }

           </div>
        {Users ? (Users.map((user , index) => (
        <Usertable handleCheckboxChange={handleCheckboxChange} user={user} Columns={Columns} selectedUsers={selectedUsers} index={index}  key={index} />
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
