"use client"
import { useState } from "react";
import Link from "next/link";
import { FaGlobe, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMessage } from 'react-icons/ai';

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed bottom-6  ${pathname.includes('Pe') ? ('left-6') : ('right-6')} z-50`}>
      {/* Circular Button */}
      <button
        onClick={toggleOptions}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-blue-600 text-white" : "bg-blue-400 text-white hover:bg-blue-500"
        }`}
      >
        {isOpen ? <FaTimes size={24} /> : <FaGlobe size={24} />}
      </button>

      {/* Language Options */}
      <div
        className={`absolute bottom-16  ${pathname.includes('Pe') ? ('left-0') : ('right-0')}  flex flex-col items-end space-y-2 ${
          isOpen ? "animate-bounceIn" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link href="tel:09336565309">
          <div className=" flex justify-center items-center px-4 py-2 bg-green-400 text-white rounded-lg shadow min-w-[100px] text-center hover:bg-green-600 transition-all duration-300 cursor-pointer">
                <AiOutlinePhone className='text-2xl  '/>
          </div>
        </Link>
        <Link href="sms:09336565309">
          <div className=" flex justify-center items-center px-4 py-2 bg-gray-400 text-white rounded-lg shadow min-w-[100px] text-center hover:bg-gray-500 transition-all duration-300 cursor-pointer">
                <AiOutlineMessage className='text-2xl  '/>
          </div>
        </Link>
        <Link href="/">
          <div className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow min-w-[100px] text-center hover:bg-blue-500 transition-all duration-300 cursor-pointer">
            English
          </div>
        </Link>
        <Link href="/Pe">
          <div className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow min-w-[100px] text-center hover:bg-blue-500 transition-all duration-300 cursor-pointer">
                فارسی
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default FloatingButton;

