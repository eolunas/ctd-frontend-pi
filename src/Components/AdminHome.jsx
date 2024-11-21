import React from 'react'
import { Link } from "react-router-dom";
import listProductsIcon from "../assets/Admin/boxes-stacked-solid 1.svg";
import manageCharacteristicsIcon from "../assets/Admin/pen-to-square-regular 1.svg";
import manageUsersIcon from "../assets/Admin/streamline_hierarchy-2.svg";
export default function AdminHome() {
  return (
    <>
              <h1 className='text-3xl font-bold text-yellow-500 mb-8'>
                Panel de Administración
              </h1>
              <div className='grid gap-6 w-full max-w-3xl sm:grid-cols-1 lg:grid-cols-3'>
                {/* Tarjeta: Listar productos */}
                <Link
                  to='/admin/products'
                  className='flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition w-full'
                >
                  <img
                    src={listProductsIcon}
                    alt='Listar productos'
                    className='w-12 h-12 mb-4'
                  />
                  <span className='text-cyan-500 font-semibold text-center'>
                    Listar productos
                  </span>
                </Link>

                {/* Tarjeta: Administrar características (sin funcionalidad de clic) */}
                
                <Link
                  to='/admin/features'
                  className='flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition w-full'
                >
                  <img
                    src={manageCharacteristicsIcon}
                    alt='Administrar características'
                    className='w-12 h-12 mb-4'
                  />
                  <span className='text-cyan-500 font-semibold text-center'>
                    Administrar Caracteristicas
                  </span>
                </Link>
                {/* Tarjeta: Gestión de usuarios */}
                <Link
                  to='/admin/users'
                  className='flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition w-full'
                >
                  <img
                    src={manageUsersIcon}
                    alt='Gestión de usuarios'
                    className='w-12 h-12 mb-4'
                  />
                  <span className='text-cyan-500 font-semibold text-center'>
                    Gestión de usuarios
                  </span>
                </Link>
              </div>
            </>
  )
}





