import { useState } from "react";
import close from "../assets/1-Iconos/close.png";
import eyeIcon from "../assets/1-Iconos/eye.png"; // Asegúrate de tener el ícono de ojo
import eyeSlashIcon from "../assets/1-Iconos/eyeSlashIcon.png"; // Ícono de ojo cerrado

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
      if (formData.password.length < 6) {
        newErrors.password =
          "La contraseña debe tener como mínimo 6 caracteres.";
      }
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password =
          "La contraseña debe contener al menos una  mayúscula.";
      }
      if (!/\d/.test(formData.password)) {
        newErrors.password = "La contraseña debe contener al menos un número.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
        className='relative bg-black border-[#424242] border p-6 rounded-2xl max-w-md w-full'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='absolute top-4 right-4 text-white rounded-full cursor-pointer'
          onClick={onClose}
        >
          <img src={close} alt='' />
        </div>
        <h2 className='text-center text-lg font-bold text-primaryBlue mb-4'>
          Crea tu cuenta
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
                <div
                  className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                  style={{
                    backgroundColor: "rgba(242, 161, 161, 0.14)",
                    border: "2px solid rgba(223, 22, 22, 0.39)", // Added "solid" for border style
                  }}
                >
                  <img src={close} className='w-5 h-5' alt='' />

                  <p className='text-[#DABEBE] text-sm '>{errors.nombre}</p>
                </div>
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
                <div
                  className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                  style={{
                    backgroundColor: "rgba(242, 161, 161, 0.14)",
                    border: "2px solid rgba(223, 22, 22, 0.39)", // Added "solid" for border style
                  }}
                >
                  <img src={close} className='w-5 h-5' alt='' />

                  <p className='text-[#DABEBE] text-sm '>{errors.apellido}</p>
                </div>
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
              <div
                className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                style={{
                  backgroundColor: "rgba(242, 161, 161, 0.14)",
                  border: "2px solid rgba(223, 22, 22, 0.39)", // Added "solid" for border style
                }}
              >
                <img src={close} className='w-5 h-5' alt='' />

                <p className='text-[#DABEBE] text-sm '>{errors.email}</p>
              </div>
            )}
          </div>

          {/* Contraseña */}
          <div className='relative'>
            <label htmlFor='password' className='block text-sm text-white mb-1'>
              Contraseña
            </label>
            <div className='flex relative items-center'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Contraseña'
                className='w-full px-4 py-2 bg-[#1E1E1E] text-white rounded-xl'
              />
              <div
                className=' absolute  right-3 cursor-pointer'
                onClick={togglePasswordVisibility}
              >
                <img
                  src={showPassword ? eyeSlashIcon : eyeIcon}
                  alt='Toggle password visibility'
                  className='w-5'
                />
              </div>
            </div>
            {errors.password && (
              <div
                className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                style={{
                  backgroundColor: "rgba(242, 161, 161, 0.14)",
                  border: "2px solid rgba(223, 22, 22, 0.39)", // Added "solid" for border style
                }}
              >
                <img src={close} className='w-5 h-5' alt='' />

                <p className='text-[#DABEBE] text-sm '>{errors.password}</p>
              </div>
            )}
            <p className='text-end text-sm text-white mt-2'>
              ¿Ya tienes una cuenta?{" "}
              <a href='/' className='text-primaryBlue'>
                Iniciar sesión
              </a>
            </p>
          </div>

          {/* Botón de Enviar */}
          <button
            type='submit'
            className='w-full py-2 bg-secondaryYellow text-white text-lg font-bold rounded-md'
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
