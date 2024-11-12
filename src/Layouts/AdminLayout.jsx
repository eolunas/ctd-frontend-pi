
// src/Layouts/AdminLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AdminSidebar from "../Components/SideBar";
import { Link } from "react-router-dom";

// Importa las imágenes
import listProductsIcon from "../assets/Admin/boxes-stacked-solid 1.svg";
import manageCharacteristicsIcon from "../assets/Admin/pen-to-square-regular 1.svg";
import manageUsersIcon from "../assets/Admin/streamline_hierarchy-2.svg";

const AdminLayout = () => {
  const location = useLocation();

  // Verifica si estás en la ruta principal del panel de administración
  const isAdminHome = location.pathname === "/admin";

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal para pantallas grandes */}
      <div className="flex flex-1">
        {/* Barra lateral */}
        <AdminSidebar />

        {/* Panel de administración principal */}
        <main className="flex-1 flex flex-col items-center p-8">
          {isAdminHome && (
            <>
              <h1 className="text-3xl font-bold text-yellow-500 mb-8">Panel de Administración</h1>
              <div className="grid gap-6 w-full max-w-3xl sm:grid-cols-1 lg:grid-cols-3">
                {/* Tarjeta: Listar productos */}
                <Link
                  to="/admin/products"
                  className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition w-full"
                >
                  <img src={listProductsIcon} alt="Listar productos" className="w-12 h-12 mb-4" />
                  <span className="text-cyan-500 font-semibold text-center">Listar productos</span>
                </Link>

                {/* Tarjeta: Administrar características */}
                <Link
                  to="/admin/characteristics"
                  className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition w-full"
                >
                  <img src={manageCharacteristicsIcon} alt="Administrar características" className="w-12 h-12 mb-4" />
                  <span className="text-cyan-500 font-semibold text-center">Administrar Características</span>
                </Link>

                {/* Tarjeta: Gestión de usuarios */}
                <Link
                  to="/admin/users"
                  className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition w-full"
                >
                  <img src={manageUsersIcon} alt="Gestión de usuarios" className="w-12 h-12 mb-4" />
                  <span className="text-cyan-500 font-semibold text-center">Gestión de usuarios</span>
                </Link>
              </div>
            </>
          )}
          {/* Outlet para mostrar el contenido de cada sección específica */}
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
