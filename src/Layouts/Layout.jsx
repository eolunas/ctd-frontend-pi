import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export const Layout = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  console.log(location.pathname)
  return (
    <div
      className={`flex flex-col min-h-screen ${
        isHomeRoute ? "bg-black-paper bg-cover bg-fixed bg-center" : ""
      }`}
    >
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
