import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
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
      <main className='flex-grow w-full p-4 max-w-[1480px] justify-center items-center  self-center'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
