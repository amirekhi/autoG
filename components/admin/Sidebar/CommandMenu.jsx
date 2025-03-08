"use client"


import { Command } from "cmdk";
import Link from "next/link";
import {  useEffect, useState } from "react";
import { FiEye, FiLink, FiLogOut, FiPhone, FiPlus } from "react-icons/fi";

import { DialogTitle } from "@radix-ui/react-dialog";

import { logout } from "@/app/(index)/login/actions";


export const CommandMenu = ({ open, setOpen}) => {
  const [value, setValue] = useState("");

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-stone-950/50 z-50"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden  max-w-lg mx-auto mt-12 w-[80vw]"
      >
        <DialogTitle className="sr-only" >Global Command Menu</DialogTitle>
        
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="What do you need?"
          className="relative border-b border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none"
        />
        <Command.List className="p-3 ">
          <Command.Empty>
            No results found for{" "}
            <span className="text-violet-500">"{value}"</span>
          </Command.Empty>

          <Command.Group heading="Team" className="text-sm mb-3 text-stone-400">
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlus />
              Invite Member
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiEye />
              See Org Chart
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Pages" className="text-sm mb-3 text-stone-400">
            
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlus />
              <Link href={'/Dash/Cars'} ><button className="w-full h-full " >Cars</button></Link>
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlus />
              <Link href={'/Dash/Cars/Hot'} ><button className="w-full h-full " >Hot Cars</button></Link>
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlus />
              <Link href={'/Dash/Create'} ><button className="w-full h-full " >Add new Cars</button></Link>
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlus />
              <Link href={'/Dash/DeletedCars'} ><button className="w-full h-full " >Deleted Cars</button></Link>
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlus />
              <Link href={'/Dash/Users'} ><button className="w-full h-full " >Users</button></Link>
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlus />
              <Link href={'/Dash/Reservations'} ><button className="w-full h-full " >Reservations</button></Link>
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlus />
              <Link href={'/Dash/CreateBlog'} ><button className="w-full h-full " >Create Blog</button></Link>
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPlus />
              <Link href={'/Dash/Brands'} ><button className="w-full h-full " >Brands</button></Link>
            </Command.Item>
           
          </Command.Group>

          <Command.Group
            heading="Integrations"
            className="text-sm text-stone-400 mb-3"
          >
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiLink />
              Link Services
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPhone />
              Contact Support
            </Command.Item>
          </Command.Group>

          <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2">
            <FiLogOut />
            <button className="w-full h-full " onClick={ async () => { await logout('/')
                   window.location.reload() }} >Sign Out</button>  
          </Command.Item>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};
