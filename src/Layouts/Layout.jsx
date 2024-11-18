import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect } from "react";

export const Layout = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "Administrator") {
        navigate("/admin");
      } else {
        // navigate("/");
      }
    }
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isHomeRoute ? "bg-black-paper bg-cover bg-fixed bg-center" : ""
      }`}
    >
      <Navbar />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
