"use client"

import React from 'react'

const Map = () => {
  return (
    <div className='w-full   mt-[100px]  relative z-10 text-white max-md:mb-0 ' id='map'  >
  
  <iframe className='w-full  mx-auto      max-md:mt-[100px] max-md:h-[80vh]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1619.5086319443587!2d50.99384935195169!3d35.72579394160896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8d95b4000b661d%3A0xb9498ac990ee51a5!2z2YbZhdin24zYtNqv2KfZhyDYp9iq2YjZhdio24zZhCDYqtqp!5e0!3m2!1sen!2s!4v1691242985310!5m2!1sen!2s"  height="500"  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
  </div>
  )
}

export default Map