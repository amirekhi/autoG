import React from 'react'


const CustomButton = ({ isDisabled, btnType,  title,  handleClick , Color}) => {
  return (
    <button disabled={isDisabled}
    type={btnType || "button"} 
    className={` rounded-lg mt-4 hover:scale-90 transition duration-300 ease-in-out ${Color == 'blue' ? 'bg-blue-400 ' : 'bg-gray-500 ' } text-white text-sm font-bold h-[40px] w-[60px]`} 
    onClick={handleClick} >

  {title}


  </button>
  )
}

export default CustomButton