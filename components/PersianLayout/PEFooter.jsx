'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiPhone, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { PEnavLinks } from '@/constants';

const PEFooter = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sectionClass =
    'border-b border-white/20 py-4 md:border-none md:py-0';

  return (
    <footer
      dir="rtl"
      className="w-full bg-blue-600 text-white pt-10 pb-6 relative overflow-hidden"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white/40 to-blue-800" />

      {/* Content grid */}
      <div className="w-[90%] mx-auto grid md:grid-cols-3 gap-10 md:gap-8">
        {/* Pages Section */}
        <div className={`${sectionClass}`}>
          <button
            onClick={() => toggleSection('pages')}
            className="w-full flex justify-between items-center md:block text-right"
          >
            <h3 className="text-xl font-semibold mb-2 md:mb-6">صفحات</h3>
            <FiChevronDown
              className={`md:hidden transition-transform ${
                openSection === 'pages' ? 'rotate-180' : ''
              }`}
            />
          </button>
          <ul
            className={`overflow-hidden transition-all duration-300 md:block ${
              openSection === 'pages' ? 'max-h-40' : 'max-h-0 md:max-h-none'
            }`}
          >
            {PEnavLinks.map((nav) => (
              <li key={nav.path} className="mb-3">
                <Link
                  href={nav.path}
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section (fixed alignment) */}
        <div className={`${sectionClass}`}>
          <button
            onClick={() => toggleSection('contact')}
            className="w-full flex justify-between items-center md:block text-right"
          >
            <h3 className="text-xl font-semibold mb-2 md:mb-6">
              با ما تماس بگیرید
            </h3>
            <FiChevronDown
              className={`md:hidden transition-transform ${
                openSection === 'contact' ? 'rotate-180' : ''
              }`}
            />
          </button>

          <ul
            className={`overflow-hidden transition-all duration-300 md:block ${
              openSection === 'contact' ? 'max-h-60' : 'max-h-0 md:max-h-none'
            }`}
            dir='ltr'
          >
            <li className="flex   items-center justify-end gap-3 mb-3 text-sm text-white/80">
              <FiPhone className="text-white text-lg" />
              <span>۰۲۶۳۶۵۵۳۸۲۳</span>
              <span className="text-white/60">: شماره تماس</span>
            </li>

            <li className="flex   items-center justify-end gap-3 mb-3 text-sm text-white/80">
              <FiPhone className="text-white text-lg" />
              <span>۰۲۶۳۶۵۵۳۸۲۳</span>
              <span className="text-white/60">: شماره تماس</span>
            </li>

            <li className="flex   items-start justify-end gap-3 text-sm text-white/80">
              <FiMapPin className="text-white text-lg mt-1" />
              <span className="max-w-[70%]">
                استان البرز، فردیس، جاده ملارد، خیابان ۵۱
              </span>
              <span className="text-white/60 whitespace-nowrap">
                : آدرس نمایشگاه
              </span>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div className={`${sectionClass}`}>
          <button
            onClick={() => toggleSection('services')}
            className="w-full flex justify-between items-center md:block text-right"
          >
            <h3 className="text-xl font-semibold mb-2 md:mb-6">خدمات</h3>
            <FiChevronDown
              className={`md:hidden transition-transform ${
                openSection === 'services' ? 'rotate-180' : ''
              }`}
            />
          </button>

          <ul
            className={`overflow-hidden transition-all duration-300 md:block ${
              openSection === 'services' ? 'max-h-40' : 'max-h-0 md:max-h-none'
            }`}
          >
            <li className="mb-3">
              <Link
                href="/Cars"
                className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                خرید ماشین
              </Link>
            </li>
            <li className="mb-3">
              <Link
                href="/Blogs"
                className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                سوالات اداری و حقوقی
              </Link>
            </li>
            <li className="mb-3">
              <Link
                href="/Cars/Hot"
                className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                بهترین ماشین‌ها
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-[90%] mx-auto border-t border-white/20 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-white/70 text-center md:text-right">
        <p>© {new Date().getFullYear()} AutoG Motors — تمامی حقوق محفوظ است.</p>
        <p className="mt-2 md:mt-0">طراحی و توسعه توسط AutoG</p>
      </div>

      {/* Blue Glow Accent */}
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-800 rounded-full blur-3xl opacity-20" />
    </footer>
  );
};

export default PEFooter;
