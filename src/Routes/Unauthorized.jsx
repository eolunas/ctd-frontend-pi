import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='bg-black p-4 w-80 border-[#424242] text-center border rounded-lg flex flex-col items-center gap-4'>
        <span className='text-primaryBlue font-bold text-lg'>
          Lo sentimos :(
        </span>
        <p>
          No tienes permisos suficientes para acceder al Panel de administrador.
        </p>
        <button
          onClick={() => navigate("/")}
          className='py-2 bg-secondaryYellow text-white text-lg font-bold rounded-md'
        >
          Volver a Inicio
        </button>
      </div>
    </div>
  );
}
