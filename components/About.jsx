'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="relative w-full flex flex-col lg:flex-row justify-between items-center overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Left Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2 px-6 lg:px-16 flex flex-col justify-center text-center lg:text-left"
      >
        <h1 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-8">
          About Us
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
          We are one of the most successful companies in the luxury car market,
          working with high-end vehicles and offering 100% delivery guarantees.
          With a dedicated team and years of experience, we ensure that you get
          the best cars under the best conditions. Our commitment to customer
          satisfaction and attention to detail make us your go-to choice for
          luxury car purchases.
        </p>
      </motion.div>

      {/* Right Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2 h-[60vh] lg:h-[80vh] relative mt-12 lg:mt-0"
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="relative w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl shadow-blue-300">
            <Image
              src="/Instanemati.png"
              alt="Our luxury car showroom"
              fill
              className="object-cover object-top transition-transform duration-500 hover:scale-105"
              sizes="100%"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
