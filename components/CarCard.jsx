"use client";

import { useState } from "react";
import Image from "next/image";
import hero from "../public/hero.png";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import CarDetails from "./CarDetails";

const CarCard = ({ car }) => {
  const { url, Milage, year, make, model, transmission, Price } = car.EN;
  const id = car._id;
  const queryParams = { id };
  const queryString = new URLSearchParams(queryParams).toString();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
        group relative mx-auto max-w-sm 
        bg-white rounded-2xl shadow-md hover:shadow-lg 
        transition-all duration-300 hover:-translate-y-1
        overflow-hidden border border-gray-100
      "
    >
      {/* Image Section */}
      <div className="relative w-full h-[200px]">
        <Image
          src={car.ImageUrls?.[0] || hero}
          alt={`${make} ${model}`}
          fill
          priority
          sizes="100%"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {year}
        </div>
      </div>

      {/* Car Info */}
      <div className="px-6 pt-4 pb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {make} {model}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {transmission} • {Milage} km
        </p>
        <p className="mt-3 text-[15px] font-semibold text-gray-800">
          Price:{" "}
          <span className="text-blue-600 font-bold">{Price}</span>{" "}
          <span className="text-sm font-medium text-gray-600">
            Million Toman
          </span>
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center px-6 pb-5">
        <div className="flex flex-col gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <Image src="/transmition.png" width={18} height={18} alt="gear" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/kilometer.svg" width={18} height={18} alt="mileage" />
            <span>{Milage}</span>
          </div>
        </div>

        <div className="flex ml-10 gap-2">
          <CustomButton
            title="Details"
            handleClick={() => setIsOpen(true)}
            Color="blue"
          />
          <CustomButton
            title="More"
            handleClick={() => router.push(`/Reservation?${queryString}`)}
            Color="green"
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car.EN}
        ImageUrls={car.ImageUrls}
      />
    </div>
  );
};

export default CarCard;
