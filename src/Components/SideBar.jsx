// src/Routes/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 p-6 flex flex-col">
  <h2 className="text-yellow-500 text-2xl font-bold mb-6">Admin TicketGo</h2>
  <nav className="flex flex-col space-y-4">
    <Link to="/admin" className="text-gray-400 hover:text-white transition">
      Inicio
    </Link>
    <Link to="/admin/products" className="text-gray-400 hover:text-white transition">
      Listar productos
    </Link>
    <Link to="/admin/features" className="text-gray-400 hover:text-white transition">
      Administrar características
    </Link>
    <Link to="/admin/users" className="text-gray-400 hover:text-white transition">
      Gestión de usuarios
    </Link>
  </nav>
</div>

  );
};

export default Sidebar;
