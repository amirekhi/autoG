import React from 'react'

const SpinningLoading = ({size}) => {
  return (
    <div className="flex items-center justify-center h-full w-full ">
      <div className={`w-${size} h-${size} border-4 border-blue-600 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  )
}

export default SpinningLoading