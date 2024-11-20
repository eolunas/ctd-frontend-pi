const CardCategory = ({ card }) => {
  return (
    <div
      key={card.id}
      className="flex justify-center items-center bg-gray-700/40 p-4 shadow-lg rounded-2xl sm:aspect-[2/1] cursor-pointer"
    >
      <h3 className="font-semibold text-secondaryWhite  sm:text-3xl">
        {card.name}
      </h3>
    </div>
  );
};

export default CardCategory;
