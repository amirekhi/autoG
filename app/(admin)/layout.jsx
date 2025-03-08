import ".././globals.css";


import { Sidebar } from "@/components/admin/Sidebar/Sidebar";
import { TopBar } from "@/components/admin/Dashboard/TopBar";


export default function RootLayout({ children }) {
  return (
      <section className={` text-stone-950 bg-stone-100`} >
        <main className="grid gap-4 p-4 grid-cols-[220px,_1fr] max-md:block">
        <Sidebar/>
        <div className="bg-white rounded-lg pb-4 shadow">
        <TopBar />
        {children}
        </div>
        </main>
    </section>
  );
}
