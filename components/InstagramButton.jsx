import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';

const InstagramButton = () => {
  return (
    <Link href={'https://www.instagram.com/amir_ekh_?igsh=YzU3Mnh5MWx3aXRj'} className="block translate-y-10">
      <button
        className="rounded-full mt-4 hover:scale-125 transition duration-300 ease-in-out text-white font-bold h-[60px] w-[120px] flex items-center justify-center"
        style={{
          background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
        }}
      >
        <FaInstagram size={24} />
      </button>
    </Link>
  );
};

export default InstagramButton;
