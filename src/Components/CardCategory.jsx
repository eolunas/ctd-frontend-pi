const CardCategory = ({ card }) => {
  return (
    <div
      key={card.id}
      className="flex justify-center items-center bg-black/50 p-4 shadow-lg rounded-xl sm:aspect-[2/1] cursor-pointer"
    >
      <h3 className="font-semibold text-secondaryYellow  sm:text-3xl">
        {card.name}
      </h3>
    </div>
  );
};

export default CardCategory;
