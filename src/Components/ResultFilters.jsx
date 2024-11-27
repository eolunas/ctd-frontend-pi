import { useCharStates } from "../Context";
import Card from "../Components/Card";

const ResultFilters = () => {
  const { state } = useCharStates();

  return (
    <>
    {console.log(state.list.length, state.filteredList.length)}
      {state.filteredList.length > 0 && (
        <div className="z-10 m-6 md:m-10">
          <h2 className="text-2xl font-bold text-cyan-500 mb-5">
            Resultados ({state.filteredList.length})
          </h2>
          <div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {state.filteredList.map((event, index) => (
              <Card key={index} event={event} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ResultFilters;
