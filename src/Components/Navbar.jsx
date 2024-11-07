import { Link } from "react-router-dom";
import { useCharStates } from "../Context";
import logo from "../assets/0-Logo/isologo.svg";
import slogan from "../assets/0-Logo/Slogan.svg";
import Button from "./Button";
import { useState } from "react";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";

const Navbar = () => {
  const { state } = useCharStates();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-10 flex justify-between items-center w-full py-3 md:px-10 px-2 bg-black  
        ${!state.theme && "dark-nav"}`}
    >
      <Link to='/'>
        <div className='md:flex md:gap-4 w-32 sm:w-full items-end'>
          <img src={logo} alt='Logo' />
          <img className='md:mb-[4px]' src={slogan} alt='Slogan' />
        </div>
      </Link>
      <div className='flex md:gap-5 gap-2'>
        <Button type='secondary' onClick={openLoginModal}>
          Iniciar sesión
        </Button>
        <Button onClick={openRegisterModal}>Crear cuenta</Button>
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModal} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={closeModal} />
      </div>
    </nav>
  );
};

export default Navbar;
