// src/Routes/ProductList.jsx

import { Link } from "react-router-dom";
import { useCharStates } from "../Context";
// Importa las imágenes de los iconos locales
import editIcon from "../assets/Admin/line-md_edit.svg";
import deleteIcon from "../assets/Admin/material-symbols_delete-outline.svg";
import viewIcon from "../assets/Admin/lucide_eye.svg";
import plusIcon from "../assets/Admin/add-fav-button.svg";

const ProductList = () => {
  const { state } = useCharStates();
  console.log(state.list);

  const products = state.list;

  return (
    <div className='p-8 bg-black text-white flex flex-col w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold text-cyan-500'>Lista de productos</h2>
        <button className='flex items-center bg-yellow-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-yellow-400 transition'>
          <img src={plusIcon} alt='Agregar' className='w-5 h-5 mr-2' /> Agregar
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700'>
          <thead>
            <tr className='text-gray-400 border-b border-gray-700'>
              <th className='px-4 py-2 border-r border-gray-700 text-center'>
                ID
              </th>
              <th className='px-4 py-2 border-r border-gray-700 text-center'>
                NOMBRE
              </th>
              <th className='px-4 py-2 text-center'>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className='border-b border-gray-700'>
                <td className='px-4 py-2 text-gray-300 border-r border-gray-700 text-center'>
                  {product.id}
                </td>
                <td className='px-4 py-2 text-gray-300 border-r border-gray-700 text-center'>
                  {product.name}
                </td>
                <td className='px-4 py-2 text-center'>
                  <div className='flex md:flex-row flex-col justify-center md:space-x-4'>
                    <Link
                      to='#'
                      onClick={(e) => e.preventDefault()}
                      className='flex items-center text-yellow-500 hover:text-yellow-400 cursor-pointer'
                    >
                      <img
                        src={editIcon}
                        alt='Editar'
                        className='w-4 h-4 mr-1'
                      />{" "}
                      Editar
                    </Link>
                    <Link
                      to='#'
                      onClick={(e) => e.preventDefault()}
                      className='flex items-center text-cyan-500 hover:text-cyan-400 cursor-pointer'
                    >
                      <img src={viewIcon} alt='Ver' className='w-4 h-4 mr-1' />{" "}
                      Ver
                    </Link>
                    <Link
                      to='#'
                      onClick={(e) => e.preventDefault()}
                      className='flex items-center text-red-500 hover:text-red-400 cursor-pointer'
                    >
                      <img
                        src={deleteIcon}
                        alt='Eliminar'
                        className='w-4 h-4 mr-1'
                      />{" "}
                      Eliminar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
