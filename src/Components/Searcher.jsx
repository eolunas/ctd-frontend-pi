import { GlobeAmericasIcon, MagnifyingGlassCircleIcon, MusicalNoteIcon, UsersIcon } from '@heroicons/react/24/solid';

const Searcher = () => {

  return (
    <div className={`
      flex flex-col w-vw h-auto mb-3 p-6 gap-5
      bg-searcher-mb bg-cover bg-center
      md:bg-searcher-tb md:p-10 
      lg:bg-searcher-pc`}
      style={{ boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.7)' }}> 
        <h1 className={`
          text-[35px] font-bold text-white w-full
          md:text-[60px] md:w-2/3
          lg:w-1/3`}>
          Descubre, reserva y disfruta
        </h1>
        <p className={`
          mt-4 text-white text-[15px] mb-5 w-full
          md:w-2/3
          lg:w-1/3`}>
          No dejes pasar la oportunidad de disfrutar de tus artistas favoritos en el escenario.
        </p>

        <form className={`
          flex align-middle justify-between bg-white m-auto mb-5 p-1 rounded-xl w-full gap-1
          md:w-5/6
        `}>
          <div className={`
              flex flex-col gap-1 basis-[100%]
              md:flex-row`}>
            <div className='flex justify-center items-center gap-3 relative w-full'>
                <GlobeAmericasIcon className="h-6 w-6 text-black absolute left-2" />
                <input type="text"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5`} 
                      placeholder="Ciudad" />
            </div>
            <div className='flex justify-center items-center gap-3 relative w-full'>
                <UsersIcon className="h-6 w-6 text-black absolute left-2" />
                <input type="text"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5`}
                      placeholder="Artista" />
            </div>
            <div className='flex justify-center items-center gap-3 w-full'>
              <div className='flex justify-center items-center relative w-full'>
                  <MusicalNoteIcon className="h-6 w-6 text-black absolute left-2" />
                  <select id="genero" 
                          className={`
                          bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10`}>
                      <option selected>Genero</option>
                      <option value="1">Rock</option>
                      <option value="2">Jazz</option>
                      <option value="3">Pop</option>
                      <option value="4">Hip-Hop</option>
                      <option value="4">Electronic</option>
                      <option value="4">Reggae</option>
                  </select>
              </div>
            </div>
          </div>
          
          <a className={`
            flex flex-col justify-center items-center bg-secondaryYellow px-2 gap-3 w-2/3
            rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer
            md:flex-row md:w-1/4 md:gap-0`}>
            <MagnifyingGlassCircleIcon className={`
                h-12 w-12 text-white
                md:h-6 md:w-6 md:mr-2`} /> 
            <span className="text-white font-semibold">Buscar</span>
          </a>    
        </form>
    </div>
  );
};

export default Searcher;
