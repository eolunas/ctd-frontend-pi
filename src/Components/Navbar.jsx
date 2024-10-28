import { Link } from "react-router-dom";
import { useCharStates } from "../Context";
import logo from "../assets/0-Logo/isologo.svg";
import Button from "./Button";
const Navbar = () => {
  const { state } = useCharStates();
  return (
    // dark-nav es una clase que no existe, se debe estilar para el tema
    <nav
      className={`flex justify-between items-center w-full py-3 md:px-10 px-2 bg-black  
        ${!state.theme && "dark-nav"}`}
    >
      <div className='md:flex items-end md:gap-4'>
        <Link to='/'>
          <img className='w-24 md:w-full' src={logo} alt='' />
        </Link>
        <h3 className='text-primaryBlue'>Tu boleto a la diversión</h3>
      </div>
      <div className='flex md:gap-5 gap-2'>
        <Button type='secondary'>Iniciar sesión</Button>
        <Button to='/favs'>Crear cuenta</Button>
        {/* <ThemeButton /> */}
      </div>
    </nav>
  );
};

export default Navbar;
