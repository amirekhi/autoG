"use client";

import React, { useState, useEffect, useRef } from "react";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";
import { HiMenu } from "react-icons/hi";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Ref to the sidebar
  const sidebarRef = useRef(null);

  const toggleState = () => {
    setIsOpen((prev) => !prev);
  };

  // Event listener to close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the sidebar is open and the click is outside
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`bg-gray-400 p-4 rounded-full absolute top-[20px] left-[30px] md:hidden ${
          isOpen ? "hidden" : ""
        }`}
        onClick={toggleState}
      >
        <HiMenu />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isOpen ? "-translate-x-0" : "max-md:-translate-x-full"
        } transition duration-300 z-40 relative max-md:bg-gray-200 max-md:p-6  max-md:fixed top-0 left-0`}
      >
        <div className="overflow-y-auto sticky top-4 h-[calc(100vh-32px-48px)]">
          <AccountToggle onToggle={toggleState} />
          <Search />
          <RouteSelect />
        </div>
        <Plan />
      </div>
    </>
  );
};