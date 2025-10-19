import React, { useState } from "react";

export const CustomDropdown = ({ value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (e) => {
    onChange(e);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={toggleDropdown}
        className="block w-full px-4 py-2 mt-1 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {value}
      </button>
      {isOpen && (
        <div
          className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto"
          style={{ height: "10rem" }} // Adjust height to show 4 options
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className="block w-full px-4 py-2 text-left hover:bg-gray-200"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

