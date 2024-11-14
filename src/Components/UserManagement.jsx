// src/Routes/UserManagement.jsx
import React, { useState } from "react";

const UserManagement = () => {
  // Datos completos de ejemplo de los usuarios
  const [users, setUsers] = useState([
    {
      fullName: "Ricky Shen",
      email: "ricky@example.com",
      role: "Administrator",
      initials: "RS",
      admin: true,
    },
    {
      fullName: "Ricky Shen",
      email: "ricky1@example.com",
      role: "User",
      initials: "RS",
      admin: false,
    },
    {
      fullName: "Ricky Shen",
      email: "ricky2@example.com",
      role: "User",
      initials: "RS",
      admin: false,
    },
    {
      fullName: "Sofia Millan",
      email: "sofia@example.com",
      role: "User",
      initials: "SM",
      admin: false,
    },
    {
      fullName: "Kim Zacarias",
      email: "kim@example.com",
      role: "Administrator",
      initials: "KZ",
      admin: true,
    },
    {
      fullName: "camilo martinez",
      email: "camilo@gmail.com",
      role: "User",
      initials: "CM",
      admin: false,
    },
    {
      fullName: "Kim Zacarias",
      email: "kim2@example.com",
      role: "User",
      initials: "KZ",
      admin: false,
    },
    {
      fullName: "Juan Martinez",
      email: "camilo1@gmail.com",
      role: "User",
      initials: "JM",
      admin: false,
    },
    {
      fullName: "daniel rivera",
      email: "daniel@gmail.com",
      role: "User",
      initials: "DR",
      admin: false,
    },
    {
      fullName: "asd asd",
      email: "asd@asd.com",
      role: "User",
      initials: "AA",
      admin: false,
    },
    {
      fullName: "asd sad",
      email: "as@fasd.com",
      role: "User",
      initials: "AS",
      admin: false,
    },
    {
      fullName: "asd sadas",
      email: "asfd@asd.com",
      role: "User",
      initials: "AS",
      admin: false,
    },
    {
      fullName: "asdfsa fasd",
      email: "asfdas@safda.com",
      role: "User",
      initials: "AF",
      admin: false,
    },
    {
      fullName: "dvcsa vcx",
      email: "cvbsx@vxz.com",
      role: "User",
      initials: "DV",
      admin: false,
    },
    {
      fullName: "sdff sdffa",
      email: "adsfds@asdfa.com",
      role: "User",
      initials: "SS",
      admin: false,
    },
    {
      fullName: "hola hola",
      email: "hola@fga.com",
      role: "User",
      initials: "HH",
      admin: false,
    },
    {
      fullName: "cami saf",
      email: "fafsad@fas.com",
      role: "User",
      initials: "CS",
      admin: false,
    },
    {
      fullName: "cami saf",
      email: "fafsdfsad@fas.com",
      role: "User",
      initials: "CS",
      admin: false,
    },
    {
      fullName: "cami saf",
      email: "fafssdfsad@fas.com",
      role: "User",
      initials: "CS",
      admin: false,
    },
    {
      fullName: "sdfsd fsd",
      email: "sfdsd@fasf.com",
      role: "User",
      initials: "SF",
      admin: false,
    },
    {
      fullName: "hola2 AS",
      email: "holahola@hola.com",
      role: "User",
      initials: "HA",
      admin: false,
    },
    {
      fullName: "camifda fasddas",
      email: "fdsf@fasdfasd.com",
      role: "User",
      initials: "CF",
      admin: false,
    },
    {
      fullName: "casdfca fdsafsad",
      email: "fdsf@fasdfsad.com",
      role: "User",
      initials: "CF",
      admin: false,
    },
    {
      fullName: "fsdsddfs sdffsd",
      email: "sdffsdsdf@fdsfsdfsd.com",
      role: "User",
      initials: "FS",
      admin: false,
    },
    {
      fullName: "csadsa csadcdsa",
      email: "cdasdca@fasfas.com",
      role: "User",
      initials: "CC",
      admin: false,
    },
    {
      fullName: "ANDREA MONSALVE VELASQUEZ",
      email: "lauralme96@gmail.com",
      role: "User",
      initials: "AM",
      admin: false,
    }
  ]);

  // Función para cambiar el estado de permisos
  const togglePermission = (userIndex) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, index) =>
        index === userIndex ? { ...user, admin: !user.admin } : user
      )
    );
  };

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
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="px-4 py-2 text-gray-300 border-r border-gray-700 flex items-center">
                  {/* Avatar circular con iniciales */}
                  <div className="bg-yellow-500 text-black font-bold w-10 h-10 flex items-center justify-center rounded-full mr-3">
                    {user.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{user.fullName}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-gray-300 border-r border-gray-700">{user.role}</td>
                <td className="px-4 py-2 text-gray-300">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={user.admin}
                      onChange={() => togglePermission(index)}
                    />
                    <div className="w-9 h-5 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-500 peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
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
