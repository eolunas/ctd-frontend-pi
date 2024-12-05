import { useEffect, useState } from "react";
import { useCharStates } from "../Context";
import { fetchFiltersPagination } from "../api/eventApi";

const Pagination = () => {
  const { state, dispatch } = useCharStates();
  const { count, pages } = state.filteredList?.info;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchFiltersPagination(state.homeFilters, currentPage);
        dispatch({ type: "SET_DATAFILTERED", payload: data.data });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "SET_DATAFILTERED", payload: [] });
      }
    };

    getData();
  }, [currentPage]);

  return (
    <div className="relative my-5 z-20">
      {pages > 1 && (
        <>
          <hr></hr>
          <nav className="flex w-full">
            <ul className="flex items-center justify-between -space-x-px h-10 text-base w-full">
              <li>
                <a
                  className={`flex items-center justify-center cursor-pointer 
                pr-4 h-10 leading-tight text-gray-500 rounded-e-lg hover:text-primaryBlue`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 0))
                  }
                >
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                  <span className="ml-4">Anterior</span>
                </a>
              </li>
              <div className="flex">
                {Array.from({ length: pages }, (_, i) => (
                  <li key={"pag" + i}>
                    <a
                      className={`flex items-center justify-center cursor-pointer
                      px-4 h-10 leading-tight ${
                        currentPage == i
                          ? "text-secondaryYellow"
                          : "text-gray-500"
                      } hover:text-primaryBlue`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </div>
              <li>
                <a
                  className={`flex items-center justify-center cursor-pointer 
                pl-4 h-10 leading-tight text-gray-500 rounded-e-lg hover:text-primaryBlue`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, pages-1))
                  }
                >
                  <span className="mr-4">Siguiente</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Pagination;
