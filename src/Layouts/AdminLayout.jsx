// src/Layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AdminSidebar from "../Components/SideBar";


// Importa las imágenes


const AdminLayout = () => {
  

  // Verifica si estás en la ruta principal del panel de administración

  return (
    <div className='flex flex-col min-h-screen bg-black text-white'>
      {/* Navbar */}
      <Navbar />

      <div className=' flex-grow mt-4   sm:hidden  max-w-xs mx-auto'>
        <p className='bg-gray-800 text-white p-6 rounded-lg text-center'>
          Por el momento no está disponible nuestro servicio en móvil, utiliza
          el panel de administrador desde una computadora o tablet.
        </p>
      </div>

      {/* Contenido principal para pantallas grandes */}
      <div className=' flex-1 sm:flex hidden'>
        {/* Barra lateral */}
        <AdminSidebar />

        {/* Panel de administración principal */}
        <main className='flex-1 flex flex-col items-center p-8'>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
