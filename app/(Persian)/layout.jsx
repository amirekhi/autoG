import ".././globals.css";


import FloatingButton from "@/components/FloatingButton";
import PENavbar from "@/components/PersianLayout/PENavbar";
import PEFooter from "@/components/PersianLayout/PEFooter";


export default async function RootLayout({ children }) {
  

  
  return (
   <div className="font-persian">
        <PENavbar  />
        {children}
        <FloatingButton/>
        <PEFooter/>
    </div>
  );
}
