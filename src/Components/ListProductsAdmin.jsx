// src/Routes/ProductList.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import editIcon from "../assets/Admin/line-md_edit.svg";
import deleteIcon from "../assets/Admin/material-symbols_delete-outline.svg";
import plusIcon from "../assets/Admin/add-fav-button.svg";

const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/event");
    return response.data;
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    await axiosInstance.delete(`/event/${id}`);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar la lista de productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data); // Guardar productos en el estado
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Manejar la eliminación de un producto
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id); // Llamar a la API para eliminar
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id)); // Actualizar la tabla
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="p-8 bg-black text-white flex flex-col w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cyan-500">Lista de productos</h2>
        <Link
          to="/admin/products/new"
          className="h-10 flex justify-center items-center md:px-6 px-1.5 text-sm md:text-md py-1.5 rounded-full cursor-pointer text-center transition duration-200 ease-in-out bg-secondaryYellow text-white hover:bg-opacity-90"
        >
          <img src={plusIcon} alt="Agregar" className="w-5 h-5 mr-2" /> Agregar
        </Link>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-400 text-center">Cargando productos...</p>
        ) : (
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="px-4 py-2 border-r border-gray-700 text-center">ID</th>
                <th className="px-4 py-2 border-r border-gray-700 text-center">NOMBRE</th>
                <th className="px-4 py-2 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-700">
                  <td className="px-4 py-2 text-gray-300 border-r border-gray-700 text-center">
                    {product.id}
                  </td>
                  <td className="px-4 py-2 text-gray-300 border-r border-gray-700 text-center">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-4">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="flex items-center text-yellow-500 hover:text-yellow-400"
                      >
                        <img src={editIcon} alt="Editar" className="w-4 h-4 mr-1" /> Editar
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex items-center text-red-500 hover:text-red-400 border-none bg-transparent hover:bg-transparent cursor-pointer"
                      >
                        <img src={deleteIcon} alt="Eliminar" className="w-4 h-4 mr-1" /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
