const CardCategory = ({ card }) => {
  return (
    <div
      key={card.id}
      className="bg-gray-700 p-4 shadow-lg rounded-2xl sm:aspect-[2/1]"
    >
      <h3 className="font-semibold text-secondaryWhite text-2xl mb-5">
        {card.title}
      </h3>
      <p className="text-sm text-secondaryWhite">{card.description}</p>
    </div>
  );
};

export default CardCategory;
