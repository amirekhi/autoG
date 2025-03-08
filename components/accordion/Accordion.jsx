"use client"





import React, { useState } from "react";

const Accordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  // const [Id , setId ] = useState(id)
 
  

  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full p-3 font-bold"
      >
      
        <span className="text-left w-full  flex justify-start">{title}</span>
        {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
        <svg
          className="shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden  transition-all duration-300 ease-in-out text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-2">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;
