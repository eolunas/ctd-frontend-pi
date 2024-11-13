import { useCharStates } from "../Context";

const Categories = () => {
  const { state } = useCharStates();
  return (
    <div className='relative m-6 md:m-10'>
      <div className='absolute top-1/2  w-full aspect-square bg-blur-cover bg-cover bg-center z-0 transform -translate-y-1/2'></div>

      <h2 className='text-2xl font-bold text-secondaryYellow mb-4 relative'>
        Categorías
      </h2>

      <div className='relative grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {state.topCategories.map((card, index) => (
          <div
            key={index}
            className='bg-gray-600 p-4 shadow-lg rounded-2xl aspect-[2/1]'
          >
            <h3 className='font-semibold text-secondaryWhite text-2xl mb-5'>
              {card.title}
            </h3>
            <p className='text-md text-secondaryWhite'>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
