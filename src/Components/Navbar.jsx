import { Link } from "react-router-dom";
import { useCharStates } from "../Context";
import logo from "../assets/0-Logo/isologo.svg";
import slogan from "../assets/0-Logo/Slogan.svg";
import Button from "./Button";

const Navbar = () => {
  const { state } = useCharStates();

  return (
    <nav
      className={`sticky top-0 z-10 flex justify-between items-center w-full py-3 md:px-10 px-2 bg-black  
        ${!state.theme && "dark-nav"}`}
    >
      <Link className='' to='/'>
        <div className='md:flex md:gap-4 w-32 sm:w-full  items-end'>
          <img className='' src={logo} alt='Logo' />
          <img className='md:mb-[4px]' src={slogan} alt='Logo' />
        </div>
      </Link>
      <div className='flex md:gap-5 gap-2'>
        <Button type='secondary' to='/admin/products'>
          Iniciar sesión
        </Button>
        <Button to='/'>Crear cuenta</Button>
        {/* <ThemeButton /> */}
      </div>
    </nav>
  );
};

export default Navbar;
