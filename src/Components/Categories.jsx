import Card from '../Components/Card'

const cardData = [
  {
    title: "Rock",
    description: "Energía pura, guitarras potentes y una actitud rebelde."
  },
  {
    title: "Jazz",
    description: "Improvisación y elegancia en cada nota."
  },
  {
    title: "Pop",
    description: "Melodías pegajosas y ritmos que te harán bailar."
  },
  {
    title: "Hip-Hop",
    description: "Rimas intensas y beats que laten al ritmo de la calle."
  },
  {
    title: "Electronic",
    description: "Sonidos futuristas y ritmos que encienden la pista."
  },
  {
    title: "Reggae",
    description: "Vibras relajadas, ritmos caribeños y buena onda."
  }
];

const Categories = () => {
    return (
        <div className="m-10">
            <h2 className="text-xl font-bold text-cyan-500 mb-4">Categorías</h2>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                {cardData.map((card, index) => (<Card key={index} card={card} />))}
            </div>
        </div>
    );
};

export default Categories;
