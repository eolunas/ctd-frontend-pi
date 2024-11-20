import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationMessage from "./ConfirmationMessage.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado

  // Función para obtener usuarios desde la API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://54.147.179.179:8080/admin/users"
      );
      console.log("Usuarios obtenidos:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setError(
        "No se pudo obtener la lista de usuarios. Verifica la autorización."
      );
      setIsErrorOpen(true); // Abrir mensaje de error
    }
  };

  // Función para cambiar el rol de un usuario
  const changeUserRole = async (userId, role) => {
    console.log(userId, role);
    try {
      await axios.put(`http://54.147.179.179:8080/admin`, null, {
        params: { userId, role },
      });
      console.log(`Rol cambiado exitosamente para el usuario ${userId}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, role } : user))
      );
    } catch (error) {
      console.error("Error al cambiar el rol:", error);
      setError("No se pudo cambiar el rol del usuario.");
      setIsErrorOpen(true); // Abrir mensaje de error
    }
  };

  // Función para abrir confirmación
  // Función para abrir confirmación
  const handleOpenConfirm = (user) => {
    setSelectedUser(user);
    setIsConfirmOpen(true);
  };

  // Mensaje dinámico para confirmación
  const getConfirmationMessage = () => {
    if (!selectedUser) return { title: "", description: "" };

    if (selectedUser.role === "Administrator") {
      return {
        title:
          "Al revocar el rol de administrador, le limitaras los accesos al sitio web",
        description: `¿Estás seguro de que deseas revocar el rol de administrador a ${selectedUser.fullName}?`,
        confirmText: "Sí, revocar permisos",
        cancelText: "No, cancelar",
      };
    } else {
      return {
        title:
          "Al otorgar el rol de administrador a este usuario, le concederás acceso completo para editar y gestionar el contenido del sitio web. ",
        description: `¿Estás seguro de que deseas otorgar el rol de administrador a ${selectedUser.fullName}?`,
        confirmText: "Sí, otorgar permisos",
        cancelText: "No, cancelar",
      };
    }
  };

  // Función para confirmar el cambio de rol
  const handleConfirmAction = async () => {
    if (selectedUser) {
      const newRole =
        selectedUser.role === "Administrator" ? "User" : "Administrator";
      await changeUserRole(selectedUser.id, newRole);
    }
    setIsConfirmOpen(false);
    setSelectedUser(null);
  };

  // Llamar a fetchUsers cuando el componente se monte
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-8 bg-black text-white flex flex-col w-full'>
      <h2 className='text-2xl font-bold text-cyan-500 mb-4'>
        Gestión de usuarios
      </h2>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700'>
          <thead>
            <tr className='text-gray-400 border-b border-gray-700'>
              <th className='px-4 py-2 border-r border-gray-700 text-left'>
                Usuario
              </th>
              <th className='px-4 py-2 border-r border-gray-700 text-left'>
                Rol
              </th>
              <th className='px-4 py-2 text-left'>Otorgar permisos</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='border-b border-gray-700'>
                <td className='px-4 py-2 text-gray-300 border-r border-gray-700 flex items-center'>
                  <div className='bg-yellow-500 text-black font-bold w-10 h-10 flex items-center justify-center rounded-full mr-3'>
                    {user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className='font-semibold'>{user.fullName}</p>
                    <p className='text-gray-400 text-sm'>{user.email}</p>
                  </div>
                </td>
                <td className='px-4 py-2 text-gray-300 border-r border-gray-700'>
                  {user.role}
                </td>
                <td className='px-4 py-2 text-gray-300'>
                  <label className='inline-flex relative items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      className='sr-only peer'
                      checked={user.role === "Administrator"}
                      onChange={() => handleOpenConfirm(user)}
                    />
                    <div className="w-9 h-5 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-500 peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensaje de confirmación */}
      {isConfirmOpen && selectedUser && (
        <ConfirmationMessage
          title={getConfirmationMessage().title}
          description={getConfirmationMessage().description}
          confirmText={getConfirmationMessage().confirmText}
          cancelText={getConfirmationMessage().cancelText}
          onConfirm={handleConfirmAction}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}

      {/* Mensaje de error */}
      {isErrorOpen && (
        <ErrorMessage
          title='Lo sentimos :('
          description='No tienes permisos suficientes para acceder al Panel de administrador.'
          buttonText='Volver a Inicio'
          onClose={() => setIsErrorOpen(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
