export default function SuccesRegisterModal({
  onClose,
  resetRegistrationSuccess,
}) {
  const handleClose = () => {
    resetRegistrationSuccess(); // Pone registrationSuccess en false
    onClose(); // Cierra el modal
  };

  return (
    <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='bg-black border-[#424242] text-center border py-4 rounded-lg flex flex-col items-center gap-4'>
        <span className='text-primaryBlue font-bold text-lg'>
          Registro exitoso
        </span>
        <p>
          Te damos una gran bienvenida, ahora podrás encontrar y reservar todos
          los eventos, conciertos y festivales musicales que más te gusten.
        </p>
        <button
          onClick={handleClose}
          className='py-2 bg-secondaryYellow text-white text-lg font-bold rounded-md'
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
