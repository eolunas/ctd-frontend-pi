// src/Routes/UserManagement.jsx
import React from "react";

const UserManagement = () => {
  const users = [
    {
      id: "1",
      name: "Juan David",
      email: "Juandavid20@gmail.com",
      role: "Administrador",
    },
    {
      id: "2",
      name: "Daniel Medina",
      email: "Danielmedina30@gmail.com",
      role: "Usuario",
    },
  ];

  return (
    <div className="p-8 bg-black text-white flex flex-col w-full">
      <h2 className="text-2xl font-bold text-cyan-500 mb-4">Gestión de usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="px-4 py-2 border-r border-gray-700 text-left">Usuario</th>
              <th className="px-4 py-2 border-r border-gray-700 text-left">Rol</th>
              <th className="px-4 py-2 text-left">Otorgar permisos</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="px-4 py-2 text-gray-300 border-r border-gray-700 flex items-center">
                  {/* Avatar circular con iniciales */}
                  <div className="bg-yellow-500 text-black font-bold w-10 h-10 flex items-center justify-center rounded-full mr-3">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-gray-300 border-r border-gray-700">{user.role}</td>
                <td className="px-4 py-2 text-gray-300">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-500 peer-checked:bg-cyan-500"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
