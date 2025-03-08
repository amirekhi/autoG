import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';

import {  Roboto } from "next/font/google";

const poppins =  Roboto({
  subsets: ['latin'],
  weight: ['400'] // Customize weights as needed
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
      
        <body className={`${poppins.className} w-full overflow-x-hidden   `}>
           {children}
        </body>
    </html>
  );
}
