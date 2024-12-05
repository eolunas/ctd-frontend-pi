import { useCharStates } from "../Context";
import Card from "../Components/Card";
import Pagination from "./Pagination";

const ResultFilters = () => {
  const { state } = useCharStates();
  const rendered = state.filteredList?.results?.length;
  console.log(rendered, state.filteredList)
  return (
    <div className="z-20">
      {rendered > 0 && (
        <div className="z-10 m-6 md:m-10">
          <h2 className="text-2xl font-bold text-cyan-500 mb-5">
            Resultados ({state.filteredList?.results?.length})
          </h2>
          <div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {state.filteredList?.results?.map((event, index) => (
              <Card key={index} event={event} />
            ))}
          </div>
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default ResultFilters;
