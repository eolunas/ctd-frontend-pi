import React from "react";
import close from "../assets/1-Iconos/close.png";

const ConfirmationMessage = ({
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      onClick={onCancel}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
    >
      <div className='bg-black border-[#424242] border relative text-white rounded-lg p-6 w-96'>
        <div
          className='absolute top-4 right-4 text-white rounded-full cursor-pointer'
          onClick={onCancel}
        >
          <img src={close} alt='' />
        </div>
        <div className='text-center'>
          <i className='fa-solid fa-triangle-exclamation fa-2xl text-primaryBlue mb-4'></i>
          <h3 className=' my-4'>{title}</h3>
          <p className='text-primaryBlue font-semibold mb-6'>{description}</p>
          <div className='flex flex-col justify-center gap-4'>
            <button
              onClick={onConfirm}
              className='bg-secondaryYellow w-full text-white px-4 py-2 rounded-full '
            >
              {confirmText}
            </button>
            <button
              onClick={onCancel}
              className='bg-transparent text-white px-4 w-full py-2 rounded-full'
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
