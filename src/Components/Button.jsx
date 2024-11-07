// Button.js
const Button = ({ children, type = "primary", onClick }) => {
  const baseStyles =
    "inline-block md:px-6 px-1 text-sm md:text-md py-1 rounded-full cursor-pointer text-center transition duration-200 ease-in-out";

  const primaryStyles = "bg-primaryBlue text-white hover:text-white";
  const secondaryStyles =
    "bg-black border-primaryBlue border text-primaryBlue hover:text-primaryBlue";

  const buttonStyles = type === "primary" ? primaryStyles : secondaryStyles;

  return (
    <div className={`${baseStyles} ${buttonStyles}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
