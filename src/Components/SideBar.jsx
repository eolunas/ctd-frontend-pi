// Components/AdminSidebar.js
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className='bg-[#424242] sm:px-10 text-white flex flex-col justify-between p-4'>
      {/* Título */}
      <div>
        <h1 className='text-2xl text-center font-bold text-primaryBlue'>
          Admin TicketGo
        </h1>
        <hr className='my-4 border-white' />

        {/* Links */}
        <nav className='flex flex-col gap-4'>
          <Link
            to='/admin/products'
            className='hover:text-primaryBlue  text-white'
          >
            Listar productos
          </Link>
          <Link
            to='/admin/clients'
            className='hover:text-primaryBlue  text-white'
          >
            Clientes
          </Link>
          <Link
            to='/admin/income'
            className='hover:text-primaryBlue  text-white'
          >
            Ingresos
          </Link>
        </nav>
      </div>

      {/* Cerrar sesión */}
      <div>
        <hr className='my-4 border-white' />
        <div className='hover:text-primaryBlue cursor-pointer text-center p-2 font-semibold'>
          Cerrar sesión
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
