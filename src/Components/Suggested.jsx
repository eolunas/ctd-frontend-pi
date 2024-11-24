import { useCharStates } from "../Context";
import Card from "../Components/Card";
import Spinner from "./Spinner";

const Suggested = () => {
  const { state } = useCharStates();

  // Recomendar 4 eventos de forma aleatorea:
  const getRandomEvents = (list) => {
    if (!Array.isArray(list) || list.length === 0) return [];

    const randomIndices = new Set();
    const result = [];

    // Aseguramos que se obtengan exactamente 4 índices únicos o el máximo posible si hay menos de 4 elementos
    while (randomIndices.size < Math.min(4, list.length)) {
      const randomIndex = Math.floor(Math.random() * list.length);
      randomIndices.add(randomIndex);
    }

    // Construimos la lista de eventos aleatorios
    randomIndices.forEach((index) => result.push(list[index]));

    return result;
  };

  // Usando la función con el estado
  const suggestedEvents = () => {
    const events = state?.list || [];
    return getRandomEvents(events);
  };

  return (
    <>
      {suggestedEvents()?.length > 0 ? (
        <div className="z-10 m-6 md:m-10">
          <h2 className="text-3xl font-bold text-cyan-500 mb-5">
            Recomendaciones
          </h2>
          <div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {suggestedEvents().map((event, index) => (
              <Card key={index} event={event} />
            ))}
          </div>
        </div>
      ) : (
        <Spinner color={"fill-primaryBlue"} size={12} />
      )}
    </>
  );
};

export default Suggested;
