import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect } from "react";
import Searcher from "../Components/Searcher";

export const Layout = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isHomeRoute ? "bg-black-paper bg-cover bg-fixed bg-center" : ""
      }`}
    >
      <Navbar />
      {isHomeRoute ? (
        <div className=''>
          <Searcher />
        </div>
      ) : (
        <></>
      )}
      <main className='flex-grow max-w-[1480px] self-center'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
