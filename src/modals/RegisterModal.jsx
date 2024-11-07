import { useState } from "react";

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  console.log(formData);

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
    if (!formData.nombre.trim()) {
      newErrors.nombre = "Ingresa un nombre.";
    }
    if (!formData.apellido.trim()) {
      newErrors.apellido = "Ingresa tu apellido.";
    }
    if (!formData.email) {
      newErrors.email = "Ingresa un correo electronico valido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }
    if (!formData.password) {
      newErrors.password = "Ingrese una contraseña.";
    } else {
      // Validar longitud de la contraseña
      if (formData.password.length < 6) {
        newErrors.password =
          "La contraseña debe tener como mínimo 6 caracteres.";
      }
      // Validar que tenga al menos una mayúscula
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password =
          "La contraseña debe contener al menos una letra mayúscula.";
      }
      // Validar que tenga al menos un número
      if (!/\d/.test(formData.password)) {
        newErrors.password = "La contraseña debe contener al menos un número.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulario enviado:", formData);
      // Aquí puedes realizar la lógica de registro, como enviar los datos al backend
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='relative bg-black p-6  rounded-2xl max-w-md w-full'
        onClick={(e) => e.stopPropagation()}
      >
        <button className='absolute top-2 right-2 text-white' onClick={onClose}>
          &times;
        </button>
        <h2 className='text-center text-lg font-bold text-white mb-4'>
          Crear cuenta
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Nombre y Apellido en la misma línea */}
          <div className='sm:flex gap-4'>
            <div className='flex-1'>
              <label htmlFor='nombre' className='block text-sm text-white mb-1'>
                Nombre
              </label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                value={formData.nombre}
                onChange={handleChange}
                placeholder='Nombre'
                className='w-full px-4 py-2 bg-[#1E1E1E] text-white rounded-xl'
              />
              {errors.nombre && (
                <p className='text-[#AD0606] text-sm mt-1'>{errors.nombre}</p>
              )}
            </div>
            <div className='flex-1'>
              <label
                htmlFor='apellido'
                className='block text-sm text-white sm:mt-0 mt-4 mb-1'
              >
                Apellido
              </label>
              <input
                type='text'
                id='apellido'
                name='apellido'
                value={formData.apellido}
                onChange={handleChange}
                placeholder='Apellido'
                className='w-full px-4 py-2 bg-[#1E1E1E] text-white rounded-xl'
              />
              {errors.apellido && (
                <p className='text-[#AD0606] text-sm mt-1'>{errors.apellido}</p>
              )}
            </div>
          </div>

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
            <p className='text-end text-sm text-white mt-2'>
              ¿Ya tienes una cuenta?{" "}
              <a href='/' className='text-blue-400'>
                Iniciar sesión
              </a>
            </p>
          </div>

          {/* Botón de Enviar */}
          <button
            type='submit'
            className='w-full py-2 bg-secondaryYellow text-white  text-lg font-bold rounded-md'
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
