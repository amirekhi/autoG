'use client'

import React from "react";
import { motion } from "framer-motion";

import { styles } from "@/utils/styles";
import { SectionWrapper } from "@/hoc";
import { fadeIn , textVariant } from "@/utils/motion";
import { testimonials } from "@/constants";

import Image from "next/image";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-gray-400 p-10 rounded-3xl w-[320px] max-md:w-full shadow-md shadow-blue-400 '
  >
    <p className='text-white font-black text-[48px]'>"</p>

    <div className='mt-1'>
      <p className='text-white tracking-wider text-[18px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-[#797979] text-[12px]'>
            {designation} of {company}
          </p>
        </div>

        <Image
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        width={40}
        height={40}
          
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12 w-[70%] max-md:w-full mx-auto  rounded-[20px] p-8 max-md:p-0  shadow-2xl shadow-blue-500 bg-gray-300 -translate-y-32 `}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px] max-md:h-12 p-8`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} w-full flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
