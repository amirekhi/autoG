import ".././globals.css";

import Navbar from "../../components/Navbar";



import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";


export default async function RootLayout({ children }) {
  

  
  return (
   <>
        <Navbar  />
        {children}
        <FloatingButton/>
        <Footer/>
    </>
  );
}
