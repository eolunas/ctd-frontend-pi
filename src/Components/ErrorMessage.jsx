import React from "react";

const ErrorMessage = ({ title, description, buttonText, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-96">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            ✖
          </button>
        </div>
        <div className="text-center">
          <div className="text-cyan-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300 mb-6">{description}</p>
          <button
            onClick={onClose}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-400"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
