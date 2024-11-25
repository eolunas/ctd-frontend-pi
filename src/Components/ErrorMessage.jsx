import React from "react";
import close from "../assets/1-Iconos/close.png";

const ErrorMessage = ({ title, description, buttonText, onClose }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-black border-[#424242] border relative text-white rounded-lg p-6 w-96'>
        <div
          className='absolute top-4 right-4 text-white rounded-full cursor-pointer'
          onClick={onClose}
        >
          <img src={close} alt='' />
        </div>
        <div className='text-center'>
          <div className='text-cyan-500 text-4xl mb-4'>⚠️</div>
          <h3 className='text-xl font-bold mb-2'>{title}</h3>
          <p className='text-gray-300 mb-6'>{description}</p>
          <button
            onClick={onClose}
            className='bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-400'
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
