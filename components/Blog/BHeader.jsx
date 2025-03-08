import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FaInstagram , FaTelegramPlane , FaLinkedin, FaWhatsapp} from 'react-icons/fa';

const BHeader = ({HeaderTiTle , Headerdescribtion , HeaderAuthor ,HeaderPublishedDate ,HeaderImgUrl , directionRtL}) => {
  return (
    <section className='w-full'>
        <div className='w-[50vw] mx-auto my-20  max-md:w-full max-md:p-12 max-md:mx-0 max-md:my-8' >
            <h2 className={`text-5xl font-semibold mt-6 max-md:text-2xl  ${directionRtL ? ('text-right') : ('')} `}>{HeaderTiTle}</h2>
            <p className={`text-[#696969] text-sm text-justify mt-6 ${directionRtL ? ('text-justify-right ') : ('')} `}>{Headerdescribtion}</p>
            <div className='w-full flex justify-between items-center p-6 max-md:flex-col' > 
            {HeaderAuthor && <p><span className='font-semibold text-xl' >Author :</span> {HeaderAuthor}</p>}
            {HeaderPublishedDate &&  <p className='text-sm max-w-[400px] max-md:w-full max-md:my-6' ><span className='font-semibold text-xl' >Published :</span> {HeaderPublishedDate}</p>}
              <div className='flex justify-center items-center gap-4 ' >
                <Link href={'/'} className='transition duration-200 hover:scale-90 p-2 ' ><FaInstagram  size={30} /></Link>
                <Link href={'/'}  className='transition duration-200 hover:scale-90 p-2'><FaTelegramPlane size={30} /></Link>
                <Link href={'/'}  className='transition duration-200 hover:scale-90 p-2'><FaLinkedin size={30} /></Link>
                <Link href={'/'}  className='transition duration-200 hover:scale-90 p-2'><FaWhatsapp size={30} /></Link>
              </div>
            </div>
            <div className='w-full h-[300px] relative mt-6' >
                <Image src={HeaderImgUrl || '/bgimg.jpg'} className='w-full h-full  object-cover' fill sizes='100%' alt='image'  />
            </div>
        </div>             
    </section>
  )
}

export default BHeader