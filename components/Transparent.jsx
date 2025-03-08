import React from 'react'

const Transparent = () => {
  return (
    <div className="relative w-screen h-[40vh]">
      {/* Fixed Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover -z-10 bg-center"
        style={{ backgroundImage: "url('bgimg.jpg')" }} // Replace with your image URL
      ></div>

      {/* Transparent Section */}
      <div className="relative w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className='text-7xl font-semibold text-white mb-12 ' >Business Partners</h3>
          
        </div>
      </div>
    </div>
  )
}

export default Transparent