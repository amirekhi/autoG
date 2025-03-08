"use client"


import React from "react";
import Accordion from "./Accordion";
import {  useState } from "react";

const FAQ = ({QAs}) => {
  const [Questions , setQuestions] = useState(QAs)



  return (

    <>
                        <div className="p-4 bg-gray-300 w-[800px] max-md:w-[95%] rounded-lg">
                                { Questions?.length > 0 &&
                                   Questions.map((ac ,  index)=>(
                                    <Accordion title={ac.question} answer={ac.answer} key={index} />
                                    ))
                                  }
                           </div>
    </>
   
  );
};

export default FAQ;

