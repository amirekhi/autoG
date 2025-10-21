"use client";

import { useState } from "react";
import Image from "next/image";
import hero from "@/public/hero.png";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import PECarDetails from "@/components/PECarDetails";

const PECarCard = ({ car }) => {
  const { کارکرد, سال, مدل, سازنده, گیربکس, قیمت } = car.PE;
  const id = car._id;
  const queryString = new URLSearchParams({ id }).toString();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="
        group relative mx-auto w-full max-w-sm
        bg-white rounded-2xl shadow-sm hover:shadow-lg
        transition-all duration-300 hover:-translate-y-1
        overflow-hidden border border-gray-100
      "
    >
      {/* Image Section */}
      <div className="relative w-full h-[210px]">
        <Image
          src={car.ImageUrls?.[0] || hero}
          alt={`${سازنده} ${مدل}`}
          fill
          priority
          sizes="100%"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-0.5 rounded-full text-xs font-medium tracking-wide">
          {سال}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 pt-4 pb-5 flex flex-col gap-2 text-right">
        <h2 className="text-lg font-semibold text-gray-900 leading-tight">
          {سازنده} {مدل}
        </h2>
        <p className="text-sm text-gray-500">
          {گیربکس} • {کارکرد.toLocaleString()} کیلومتر
        </p>

        <div className="mt-1">
          <p className="text-[15px] font-semibold text-gray-800">
            قیمت:{" "}
            <span className="text-blue-600 font-bold">{قیمت}</span>{" "}
            <span className="text-sm font-medium text-gray-600">
              میلیون تومان
            </span>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-6" />

      {/* Bottom Section */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-5 text-gray-500 text-sm">
          <div className="flex items-center gap-1.5">
            <Image
              src="/transmition.png"
              width={18}
              height={18}
              alt="transmission"
            />
            <span className="capitalize">{گیربکس}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Image src="/kilometer.svg" width={18} height={18} alt="mileage" />
            <span>{کارکرد.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <CustomButton
            title="مشخصات"
            handleClick={() => setIsOpen(true)}
            Color="blue"
          />
          <CustomButton
            title="بیشتر"
            handleClick={() => router.push(`/Pe/Reservation?${queryString}`)}
            Color="green"
          />
        </div>
      </div>

      <PECarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car.PE}
        ImageUrls={car.ImageUrls}
      />
    </div>
  );
};

export default PECarCard;
