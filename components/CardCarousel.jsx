'use client';

import { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useGettingHotCars } from '@/hook/hooks';
import Image from 'next/image';
import Link from 'next/link';

export default function CardCarousel() {
  const [Data, loading] = useGettingHotCars();
  const scrollRef = useRef(null);
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  useEffect(() => {
    if (!loading && cardRef.current) {
      const observer = new ResizeObserver(() => {
        if (cardRef.current) {
          setCardWidth(cardRef.current.offsetWidth + 16);
        }
      });
      observer.observe(cardRef.current);
      return () => observer.disconnect();
    }
  }, [loading, Data]);

  const scroll = (direction) => {
    if (!scrollRef.current || cardWidth === 0) return;
    scrollRef.current.scrollTo({
      left:
        direction === 'left'
          ? scrollRef.current.scrollLeft - cardWidth
          : scrollRef.current.scrollLeft + cardWidth,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.clientX;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[520px] px-4">
      <div className="relative group w-full h-full">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/30 backdrop-blur-md text-black opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out shadow-md hover:bg-white/50"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Scroll Container */}
        {!loading && (
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            className="flex overflow-x-auto no-scrollbar scroll-smooth scroll-pl-4 scroll-pr-4 snap-x snap-mandatory py-20 md:ml-[100px]"
          >
            {Data.map((card, index) => (
              <Link href={`/Reservation?id=${card._id}`}  key={index}>
              <div
               
                ref={index === 0 ? cardRef : null}
                className="snap-start shrink-0 w-[300px] h-[400px] sm:w-[60%] lg:h-[500px] lg:w-[400px] mx-2 rounded-2xl relative bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.5),_-4px_-4px_10px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_20px_rgba(0,0,0,0.15),_-6px_-6px_20px_rgba(0,0,0,0.07)] hover:scale-[1.01] transition duration-500 p-6"
              >
                <Image
                  src={card.ImageUrls[0]}
                  alt="model"
                  fill
                  sizes="100%"
                  className="w-full h-full object-cover absolute inset-0 rounded-2xl"
                />
                <div className="relative z-50">
                  <h3 className="text-xl font-bold text-white drop-shadow z-50">{card.EN.model}</h3>
                </div>
              </div>
              </Link>
            ))}
          </div>
        )}

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/30 backdrop-blur-md text-black opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out shadow-md hover:bg-white/50"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
