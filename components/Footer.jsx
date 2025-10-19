'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiPhone, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { navLinks } from '@/constants';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sectionClass =
    'border-b border-white/20 py-4 md:border-none md:py-0';

  return (
    <footer className="w-full bg-blue-600 text-white pt-10 pb-6 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white/40 to-blue-800" />

      {/* Desktop grid */}
      <div className="w-[90%] mx-auto grid md:grid-cols-3 gap-10 md:gap-8">
        {/* Pages */}
        <div className={`${sectionClass}`}>
          <button
            onClick={() => toggleSection('pages')}
            className="w-full flex justify-between items-center md:block text-left"
          >
            <h3 className="text-xl font-semibold mb-2 md:mb-6">
              Pages
            </h3>
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
            {navLinks.map((nav) => (
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

        {/* Contact */}
        <div className={`${sectionClass}`}>
          <button
            onClick={() => toggleSection('contact')}
            className="w-full flex justify-between items-center md:block text-left"
          >
            <h3 className="text-xl font-semibold mb-2 md:mb-6">
              Contact Us
            </h3>
            <FiChevronDown
              className={`md:hidden transition-transform ${
                openSection === 'contact' ? 'rotate-180' : ''
              }`}
            />
          </button>
          <ul
            className={`overflow-hidden transition-all duration-300 md:block ${
              openSection === 'contact' ? 'max-h-48' : 'max-h-0 md:max-h-none'
            }`}
          >
            <li className="flex items-center gap-3 mb-3 text-sm text-white/80">
              <FiPhone className="text-white text-lg" />
              <span>0263 655 3823</span>
            </li>
            <li className="flex items-center gap-3 mb-3 text-sm text-white/80">
              <FiPhone className="text-white text-lg" />
              <span>0263 655 3823</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/80">
              <FiMapPin className="text-white text-lg mt-1" />
              <span>Karaj, Fardis, Mallard Blvd, 51st Street</span>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className={`${sectionClass}`}>
          <button
            onClick={() => toggleSection('services')}
            className="w-full flex justify-between items-center md:block text-left"
          >
            <h3 className="text-xl font-semibold mb-2 md:mb-6">
              Our Services
            </h3>
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
                Buy a Car
              </Link>
            </li>
            <li className="mb-3">
              <Link
                href="/Blogs"
                className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                Auto News
              </Link>
            </li>
            <li className="mb-3">
              <Link
                href="/Cars/Hot"
                className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                Best Deals
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-[90%] mx-auto border-t border-white/20 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-white/70">
        <p>© {new Date().getFullYear()} AutoG Motors. All Rights Reserved.</p>
        <p className="mt-2 md:mt-0">Powered by AutoG</p>
      </div>
    </footer>
  );
};

export default Footer;
