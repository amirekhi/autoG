"use client"

import { GetCategories } from "@/app/(admin)/Dash/Categories/CategoriesUpload";
import { useEffect, useState } from "react";

export default function DropDownButton({ setSelected , selected }) {
    const [options, setOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false); // Close dropdown after selection
  };

  useEffect( () => {
    async function fetchData() {
      const res = await GetCategories()
      setOptions(res)
     
      }
      fetchData();
   
   
  } , [])

  return (
    <div className="relative inline-block text-left w-full">
      <div className="w-[90%] mx-auto">
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between w-full  px-4 py-2  text-sm font-medium text-white bg-gray-400 rounded-md hover:bg-gray-500 focus:outline-none "
        >
          {selected?.Name || 'No Categories'}
          <svg
            className={`w-5 h-5 ml-2 -mr-1 transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-[50%] translate-x-[50%] z-10 mt-2  w-[300px] origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-1 ">
          <button
                
                type="button"
                onClick={() => handleSelect({Name : 'No Categories'})}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
              >
                No Categories
              </button>
            {options.map((option) => (
              <button
                key={option._id}
                type="button"
                onClick={() => handleSelect(option)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
              >
                {option.Name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
