import ".././globals.css";


import FloatingButton from "@/components/FloatingButton";
import PENavbar from "@/components/PersianLayout/PENavbar";
import PEFooter from "@/components/PersianLayout/PEFooter";


export default async function RootLayout({ children }) {
  

  
  return (
   <>
        <PENavbar  />
        {children}
        <FloatingButton/>
        <PEFooter/>
    </>
  );
}
