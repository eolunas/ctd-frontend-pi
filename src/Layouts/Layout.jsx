import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-black-paper bg-cover bg-center'>
        <Navbar />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
