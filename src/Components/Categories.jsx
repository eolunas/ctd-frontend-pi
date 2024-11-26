import { useCharStates } from "../Context";
import CardCategory from "./CardCategory";
import Spinner from "./Spinner";

const Categories = () => {
  const { state } = useCharStates();
  return (
    <>
      {state.topCategories.length > 0 ? (
        <div className="relative m-6 md:m-10">
          <div className="absolute top-1/2  w-full aspect-square bg-blur-cover bg-cover bg-center z-0 transform -translate-y-1/2"></div>

          <h2 className="text-3xl font-bold text-cyan-500 mb-4 relative">
            Categorías
          </h2>

          <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
            {state.topCategories.map((genre, index) => (
              <CardCategory key={index} card={genre} />
            ))}
          </div>
        </div>
      ) : (
        <Spinner color={"fill-secondaryYellow"} size={12} />
      )}
    </>
  );
};

export default Categories;
