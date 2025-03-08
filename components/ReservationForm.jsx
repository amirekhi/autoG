"use client"
import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { handlerUnkownRgistration } from "@/app/serveractions";
import { useState } from "react";

import { AiOutlineCheckCircle } from "react-icons/ai";


const ReservationForm = ({ isOpen, closeModal , CarId}) => {
  const [Res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData(e.target);

    // Convert FormData entries to an object
    const userData = Object.fromEntries(formData.entries());


     const res = await handlerUnkownRgistration(CarId , userData )
     
     if(res){
      setRes(res)
     }

  }

  return(
  <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-out duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                <button
                  type='button'
                  className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  onClick={closeModal}
                >
                  <Image
                    src='/close.svg'
                    alt='close'
                    width={20}
                    height={20}
                    className='object-contain'
                  />
                </button>

               <form onSubmit={handleSubmit} className="w-[90%] mx-auto">
                <label className="flex flex-col justify-center items-start mt-3">
                  <span className="font-semibold">Name</span>
                  <input type="text" name="userId" className="border border-gray-400 mt-3 shadow-xl w-full p-1  rounded-md" placeholder="Name"  required/>
                </label>
                <label className="flex flex-col justify-center items-start mt-3">
                  <span className="font-semibold">Surname</span>
                  <input type="text" name="Surname" className="border border-gray-400 mt-3 shadow-xl w-full p-1  rounded-md" placeholder="Surname"  />
                </label>
                <label className="flex flex-col justify-center items-start mt-3">
                  <span className="font-semibold">Email</span>
                  <input type="email" name="userEmail" className="border border-gray-400 mt-3 shadow-xl w-full p-1  rounded-md" placeholder="Email"  required/>
                </label>
                <label className="flex flex-col justify-center items-start mt-3">
                  <span className="font-semibold">Number</span>
                  <input type="tel" name="userPhoneNumber" className="border border-gray-400 mt-3 shadow-xl w-full p-1  rounded-md" placeholder="Number"  required/>
                </label>
                <button type="submit" className={`w-[100px] h-[60px] block my-3 mt-5 transition duration-200 hover:scale-90  mx-auto rounded-full ${Res?.error == 'file_added' ? ('bg-green-600') : ('bg-gray-500 text-white') }`} >{Res?.error == 'file_added' ? (<AiOutlineCheckCircle className="text-white mx-auto" size={40} />) : ('Submit') }</button>
               </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>)
};

export default ReservationForm;