import { useState } from "react";

const UserDropdown = ({ state, handleLogout }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className='relative'>
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
        <div className='absolute right-0 mt-2 w-32 bg-black shadow-lg rounded-md border'>
          <div className='px-4 py-2 cursor-pointer' onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
