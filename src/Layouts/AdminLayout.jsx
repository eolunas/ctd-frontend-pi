// Layouts/AdminLayout.js
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AdminSidebar from "../Components/SideBar";

const AdminLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <div className=' flex-grow mt-4   sm:hidden  max-w-xs mx-auto'>
        <p className='bg-gray-800 text-white p-6 rounded-lg text-center'>
          Por el momento no está disponible nuestro servicio en móvil, utiliza
          el panel de administrador desde una computadora o tablet.
        </p>
      </div>
      <main className='flex-grow sm:flex hidden  '>
        <AdminSidebar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
