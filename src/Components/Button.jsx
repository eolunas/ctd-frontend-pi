import { Link } from "react-router-dom";

const Button = ({ to = "/", children, type = "primary" }) => {
  const baseStyles =
    "inline-block md:px-6 px-1 text-sm md:text-md py-1 rounded-full   text-center transition duration-200 ease-in-out";

  const primaryStyles = "bg-primaryBlue text-white hover:text-white  ";
  const secondaryStyles =
    "bg-black border-primaryBlue border text-primaryBlue hover:text-primaryBlue";

  const buttonStyles = type === "primary" ? primaryStyles : secondaryStyles;

  return (
    <Link to={to} className={`${baseStyles} ${buttonStyles}`}>
      {children}
    </Link>
  );
};

export default Button;
