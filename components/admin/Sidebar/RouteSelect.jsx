"use client"

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";


import { FaCar , FaTrash , FaFire , FaPlus , FaUser , FaBlog , FaPenNib ,FaHome } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdArticle } from 'react-icons/md';

export const RouteSelect =  () => {
     const pathname = usePathname()
    

  return (
    <div className="space-y-1 ">
      <Route Icon={FaHome} selected={pathname == '/'} title="Home"  Url={'/'} />
      <Route Icon={FaCar} selected={pathname == '/Dash/Cars'} title="Cars"  Url={'/Dash/Cars'} />
      <Route Icon={FaTrash} selected={pathname == '/Dash/DeletedCars'} title="Deleted Cars"  Url={'/Dash/DeletedCars'}/>
      <Route Icon={FaFire} selected={pathname == '/Dash/Cars/Hot'} title="Hot Cars" Url={'/Dash/Cars/Hot'} />
      <Route Icon={FaPlus} selected={pathname == '/Dash/Create'} title="Add a Car" Url={'/Dash/Create'} />
      <Route Icon={ FaUser } selected={pathname == '/Dash/Users'} title="Users"  Url={'/Dash/Users'}/>
      <Route Icon={ FaRegCalendarAlt } selected={pathname == '/Dash/Reservations'} title="Reservations"  Url={'/Dash/Reservations'}/>
      <Route Icon={ MdArticle } selected={pathname == '/Dash/CreateBlog'} title="CreateBlog"  Url={'/Dash/CreateBlog'}/>
      <Route Icon={ FaBlog } selected={pathname == '/Dash/Brands'} title="Brands"  Url={'/Dash/Brands'}/>
      <Route Icon={ FaPenNib } selected={pathname == '/Dash/Blogs'} title="Blogs"  Url={'/Dash/Blogs'}/>
      <Route Icon={ MdCategory } selected={pathname == '/Dash/Categories'} title="Categories"  Url={'/Dash/Categories'}/>
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  Url,
}) => {
  return (
    <Link href={Url}>
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
    </Link>
  );
};
