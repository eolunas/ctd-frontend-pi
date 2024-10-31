import { GlobeAmericasIcon, MagnifyingGlassCircleIcon, UsersIcon } from '@heroicons/react/24/solid';
import DropDownHover from './DropDownHover';

const Searcher = () => {

  return (
    <div className={`
      flex flex-col w-vw h-auto mb-3 p-10 gap-5
      bg-searcher-mb bg-cover bg-center
      md:bg-searcher-tb 
      lg:bg-searcher-pc`}
      style={{ boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.7)' }}> 
        <h1 className={`
          text-[30px] font-bold text-white w-3/4
          md:text-[60px] md:w-2/3
          lg:w-1/3`}>
          Descubre, reserva y disfruta
        </h1>
        <p className={`
          mt-4 text-white w-1/2 text-[10px] mb-5
          md:text-[15px] md:w-2/3
          lg:w-1/3`}>
          No dejes pasar la oportunidad de disfrutar de tus artistas favoritos en el escenario.
        </p>
        <form className="flex align-middle justify-between bg-white m-auto mb-5 p-1 w-5/6 rounded-xl">
          <div className='flex justify-center items-center gap-3 relative'>
              <GlobeAmericasIcon className="h-6 w-6 text-black absolute left-2" />
              <input type="text"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5`} 
                    placeholder="Ciudad" />
          </div>
          <div className='flex justify-center items-center gap-3 relative'>
              <UsersIcon className="h-6 w-6 text-black absolute left-2" />
              <input type="text"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5`}
                    placeholder="Artista" />
          </div>
          <div className='flex justify-center items-center gap-3 ml-3'>
            <DropDownHover />
          </div>
          <a className={`
            flex justify-center items-center bg-secondaryYellow px-2  
            rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer`}>
            <MagnifyingGlassCircleIcon className="h-6 w-6 text-white mr-2" /> 
            <span className="text-white font-semibold">Buscar</span>
          </a>    
        </form>
    </div>
  );
};

export default Searcher;
