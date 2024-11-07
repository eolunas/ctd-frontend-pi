import { useState } from "react";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Maneja los cambios de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validación de campos
  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }
    if (!formData.password) {
      newErrors.password = "Ingresa tu contraseña.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Inicio de sesión enviado:", formData);
      // Aquí puedes realizar la lógica de inicio de sesión, como enviar los datos al backend
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='relative bg-black p-6 rounded-2xl max-w-md w-full'
        onClick={(e) => e.stopPropagation()}
      >
        <button className='absolute top-2 right-2 text-white' onClick={onClose}>
          &times;
        </button>
        <h2 className='text-center text-lg font-bold text-white mb-4'>
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Correo Electrónico */}
          <div>
            <label htmlFor='email' className='block text-sm text-white mb-1'>
              Correo Electrónico
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Correo electrónico'
              className='w-full px-4 py-2 bg-[#1E1E1E] text-white rounded-xl'
            />
            {errors.email && (
              <p className='text-[#AD0606] text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor='password' className='block text-sm text-white mb-1'>
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Contraseña'
              className='w-full px-4 py-2 bg-[#1E1E1E] text-white rounded-xl'
            />
            {errors.password && (
              <p className='text-[#AD0606] text-sm mt-1'>{errors.password}</p>
            )}
            <p className='text-end text-sm mt-2'>
              <a href='/' className='text-blue-400'>
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          </div>

          {/* Botón de Iniciar Sesión */}
          <button
            type='submit'
            className='w-full py-2 bg-secondaryYellow text-white text-lg font-bold rounded-md'
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
