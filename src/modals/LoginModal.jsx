import { useState } from "react";
import close from "../assets/1-Iconos/close.png";
import advert from "../assets/1-Iconos/advert.png";
import eyeIcon from "../assets/1-Iconos/eye.png"; // Import the eye icon
import eyeSlashIcon from "../assets/1-Iconos/eyeSlashIcon.png"; // Import the eye-slash icon

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          Inicia sesión
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
            <p className='text-end text-sm mt-2'>
              <a href='/' className='text-primaryBlue font-normal'>
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
