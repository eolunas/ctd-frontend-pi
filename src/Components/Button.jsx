const Button = ({ children, type = "primary", color = "primaryBlue", onClick }) => {
  const baseStyles =
    "h-10 flex justify-center items-center md:px-6 px-1.5 text-sm md:text-md py-1.5 rounded-full cursor-pointer text-center transition duration-200 ease-in-out";

  // Estilos basados en el tipo y color personalizado
  const primaryStyles = `bg-${color} text-white hover:bg-opacity-90`;
  const secondaryStyles = `bg-transparent border-${color} border text-${color} hover:bg-${color} hover:bg-opacity-10`;

  const buttonStyles = type === "primary" ? primaryStyles : secondaryStyles;

  return (
    <div className={`${baseStyles} ${buttonStyles}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;