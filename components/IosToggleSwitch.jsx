"use client"

import React  from 'react';

const IosToggleSwitch = ({ value, onChange }) => {


  return (
    <div
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
        value ? 'bg-green-500' : 'bg-gray-400'
      }`}
      onClick={() => onChange(!value)}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
          value ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></div>
    </div>
  );
};

export default IosToggleSwitch;
