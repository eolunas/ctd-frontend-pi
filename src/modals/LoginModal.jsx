import { useState } from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import close from "../assets/1-Iconos/close.png";
import eyeIcon from "../assets/1-Iconos/eye.png";
import eyeSlashIcon from "../assets/1-Iconos/eyeSlashIcon.png";
import { useCharStates } from "../Context";
import { login } from "../auth";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { dispatch } = useCharStates(); // Access dispatch from context

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const authStatus = await login(formData);

      if (authStatus.isLoggedIn) {
        dispatch({
          type: "LOGIN",
          payload: {
            isLoggedIn: true,
            role: authStatus.user.role,
            user: authStatus.user,
          },
        });
        navigate(authStatus.role === "Administrator" ? "/admin" : "/");
        onClose();
      } else {
        setErrors({ ...errors, form: authStatus.error });
      }
    }
  };
  if (!isOpen) return null;

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
                  border: "2px solid rgba(223, 22, 22, 0.39)",
                }}
              >
                <img src={close} className='w-5 h-5' alt='' />
                <p className='text-[#DABEBE] text-sm '>{errors.email}</p>
              </div>
            )}
          </div>

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
                className='absolute right-3 cursor-pointer'
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
                  border: "2px solid rgba(223, 22, 22, 0.39)",
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

          {errors.form && (
            <div className='text-red-500 text-sm mt-2'>{errors.form}</div>
          )}

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
LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Expecting a boolean value for isOpen
  onClose: PropTypes.func.isRequired, // Expecting a function for onClose
};

export default LoginModal;
