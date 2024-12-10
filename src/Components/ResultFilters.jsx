import { useCharStates } from "../Context";
import Card from "../Components/Card";
import Pagination from "./Pagination";

const ResultFilters = () => {
  const { state } = useCharStates();
  const rendered = state.filteredList?.results?.length;

  return (
    <div className="z-20">
      {rendered > 0 && (
        <div className="z-10 m-6 md:mx-10">
          <Pagination />
          <div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {state.filteredList?.results?.map((event, index) => (
              <Card key={index} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultFilters;
