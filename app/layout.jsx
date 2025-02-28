import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "@/assets/styles/globals.css";

const inter=Inter({subsets: ['latin']});

export const metadata = {
  title: "Addis Hall Booking | Book a Room",
  description: "Book conference halls in Addis Ababa with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <main className="mx-auto max-w-7x1 px-4 py-6 sm:px-4 lg:px-7">
          {children}
        </main>

        <Footer/>
        <ToastContainer/>
      </body>
    </html>
  );
}
