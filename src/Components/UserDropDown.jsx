import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ state, handleLogout }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className='relative'>
      <div
        className='cursor-pointer flex items-center justify-between gap-3'
        onClick={toggleDropdown}
      >
        <div className='bg-secondaryYellow text-base font-bold rounded-full w-8 h-8 flex justify-center items-center'>
          {state.user?.initials}
        </div>
        <span>{state.user?.role === "User" ? "Usuario" : "Admin"}</span>

        <svg
          className={`w-4 h-4 transition-transform ${
            isDropdownVisible ? "transform rotate-180" : ""
          }`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M6 9l6 6 6-6'></path>
        </svg>
      </div>
      {isDropdownVisible && (
        <div className='absolute right-0 mt-2 w-60 bg-black shadow-lg rounded-md border'>
          <div
            className='px-4 py-2 flex items-center w-full gap-2 cursor-pointer hover:text-primaryBlue'
            onClick={() => navigate("/")}
          >
            <i className='fa-solid fa-pencil'></i>
            <p>Editar perfil</p>
          </div>

          {state.user?.role === "Administrator" ? (
            <div
              className='px-4 py-2 flex items-center w-full gap-2 cursor-pointer hover:text-primaryBlue'
              onClick={() => navigate("/admin")}
            >
              <i className='fa-solid fa-wrench'></i>
              <p>Panel de administrador</p>
            </div>
          ) : (
            <div
              className='px-4 py-2 flex items-center w-full gap-2 cursor-pointer hover:text-primaryBlue'
              onClick={() => navigate("/favs")}
            >
              <i className='fa-solid fa-bookmark'></i>
              <p>Favoritos</p>
            </div>
          )}

          {state.user?.role === "Administrator" ? (
            <div
              className='px-4 py-2 flex items-center w-full gap-2 cursor-pointer hover:text-primaryBlue'
              onClick={() => navigate("/")}
            >
              <i className='fa-solid fa-eye'></i>
              <p>Ver sitio web</p>
            </div>
          ) : (
            <div
              className='px-4 py-2 flex items-center w-full gap-2 cursor-pointer hover:text-primaryBlue'
              onClick={() => navigate("/")}
            >
              <i className='fa-regular fa-clock'></i>
              <p>Historial de reservas</p>
            </div>
          )}

          <div
            className='px-4 py-2 flex items-center w-full gap-2 cursor-pointer hover:text-primaryBlue'
            onClick={handleLogout}
          >
            <i className='fa-solid fa-right-from-bracket'></i>
            <p>Cerrar sesión</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
