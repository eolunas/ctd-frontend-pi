import Card from '../Components/Card'

const cardData = [
    {
      title: "Card Title 1",
      description: "Card description or content goes here."
    },
    {
      title: "Card Title 2",
      description: "Card description or content goes here."
    },
    {
      title: "Card Title 3",
      description: "Card description or content goes here."
    },
    {
      title: "Card Title 4",
      description: "Card description or content goes here."
    },
    {
      title: "Card Title 5",
      description: "Card description or content goes here."
    },
    {
      title: "Card Title 6",
      description: "Card description or content goes here."
    }
  ];

const Categories = () => {
    return (
        <div className="m-5">
            <h2 className="text-lg font-bold text-cyan-500 mb-4">Categorías</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {cardData.map((card, index) => (<Card key={index} card={card} />))}
            </div>
        </div>
    );
};

export default Categories;
