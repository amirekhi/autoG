'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PEAbout = () => {
  return (
    <section className="w-[95%] 2xl:w-[80%] mx-auto flex flex-col lg:flex-row justify-between items-center py-16 lg:py-24 px-4 lg:px-12 bg-gradient-to-b from-white via-blue-50 to-white">
      
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2 flex justify-center items-center mb-12 lg:mb-0"
      >
        <div className="relative w-[85%] h-[55vh] lg:h-[70vh] rounded-2xl overflow-hidden shadow-2xl shadow-blue-200">
          <Image
            src="/Instanemati.png"
            alt="نمایی از نمایشگاه ما"
            fill
            className="object-cover object-top transition-transform duration-500 hover:scale-105"
            sizes="100%"
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-end text-right"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-blue-600">
          درباره ما
        </h1>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-[80%] lg:max-w-[70%] mb-6">
          آشنایی بیشتر با توانایی‌ها، اعتبار و روند کار این مجموعه
          <span className="text-blue-500 font-semibold"> موجب خاطر جمعی </span>
          شما عزیزان می‌باشد و
          <span className="text-blue-500 font-semibold"> رضایت شما </span>
          در خرید، هدف اصلی ماست.
        </p>

        <p className="text-gray-600 text-[16px] md:text-lg leading-loose max-w-[85%] lg:max-w-[70%]">
          ما پیشروترین و موفق‌ترین مجموعه در خرید و فروش خودروهای لوکس هستیم. با
          سال‌ها تجربه و همکاری با برترین برندهای خودرویی، بهترین گزینه‌ها را برای
          مشتریان خاص و مشکل‌پسند فراهم کرده‌ایم.
          <br />
          <br />
          تعهد ما، ارائه خدماتی بی‌نقص همراه با ۱۰۰٪ ضمانت تحویل است. هر خودرویی
          که از ما انتخاب کنید، با اطمینان کامل و در کوتاه‌ترین زمان به شما تحویل
          داده می‌شود.
          <br />
          <br />
          به ما اعتماد کنید و تجربه‌ای بی‌نظیر از خرید خودروهای لوکس را با ما
          داشته باشید! 🚗✨
        </p>
      </motion.div>
    </section>
  );
};

export default PEAbout;
