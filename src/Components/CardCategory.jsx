import { useNavigate } from "react-router-dom";

const CardCategory = ({ card }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navegar a la ruta dinámica basada en card.name
    navigate(`/category/${card.name}`);
  };

  return (
    <div
      key={card.id}
      className={`
        flex justify-center items-center bg-black/50 p-4 shadow-lg rounded-xl cursor-pointer min-w-60 mb-2
        hover:scale-105`}
      onClick={handleCardClick} // Asignar la función al clic
    >
      <h3 className='font-semibold text-secondaryYellow flex flex-col justify-center items-center gap-2 sm:text-3xl'>
        <i className={`${card.icon} text-secondaryYellow text-4xl`}></i>
        {card.name}
      </h3>
    </div>
  );
};

export default CardCategory;
