"use client"

import React  from "react";
import Slider from "react-slick";

import ResimageModal from "./ResimageModal";

function Resimages({images}) {
  const settings = {
    dots: images?.length > 1, // Enable dots only if more than one slide
    lazyLoad: true,
    infinite: images?.length > 1, // Enable infinite scroll only if more than one slide
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0, // Adjusted to start from the first slide
    arrows: false, // Disable navigation arrows
  };
  return (
    <div className="slider-container ">
      <Slider {...settings}>
       {images?.map((img , index)=> (
        <ResimageModal key={index} img={img}/>
       ))}
      
      </Slider>
    </div>
  );
}

export default Resimages;
