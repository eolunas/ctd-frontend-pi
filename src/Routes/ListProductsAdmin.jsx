// src/Routes/ListProductsAdmin.jsx
import { useState } from "react";

const ListProductsAdmin = () => {
  // Datos simulados para los productos
  const [products] = useState([
    { id: 1, name: "Ticket for Coachella", price: "$300" },
    { id: 2, name: "Ticket for Tomorrowland", price: "$350" },
    { id: 3, name: "Ticket for Glastonbury", price: "$250" },
  ]);

  return (
    <div className='bg-black w-full text-white p-8'>
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse'>
          {/* Título de la tabla */}
          <caption className='caption-top text-2xl font-semibold text-cyan-500 mb-4 text-left'>
            Lista de productos
          </caption>

          <thead>
            <tr className='bg-gray-800 text-gray-200'>
              <th className='px-4 py-2 border-t border-l  border-cyan-500'>
                ID
              </th>
              <th className='px-4 py-2 border-t  border-cyan-500'>Nombre</th>
              <th className='px-4 py-2 border-t  border-r border-cyan-500'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className='px-4 py-2 text-center border border-cyan-500'>
                  {product.id}
                </td>
                <td className='px-4 py-2 text-center border border-cyan-500'>
                  {product.name}
                </td>
                <td className='px-4 py-2 text-center border border-cyan-500'>
                  {/* <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProductsAdmin;
