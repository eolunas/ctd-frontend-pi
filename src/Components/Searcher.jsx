
const Searcher = () => {

  return (
    <div className={`
      flex flex-col w-vw h-auto mb-3
      bg-searcher-mb bg-cover bg-center
      md:bg-searcher-tb 
      lg:bg-searcher-pc`}
      style={{ boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.7)' }}> 
        <h1 className={`
          text-[30px] font-bold text-white w-3/4 m-5
          md:text-[65px] md:w-2/3
          lg:w-1/3`}>
          Descubre, reserva y disfuta
        </h1>
        <p className={`
          mt-4 text-white m-5 w-1/2 text-[10px]
          md:text-[20px] md:w-2/3
          lg:w-1/3`}>
          No dejes pasar la oportunidad de disfrutar de tus artistas favoritos en el escenario.
        </p>
        <form className="flex bg-white m-auto mb-5 p-2 w-5/6 rounded-lg">
          <input placeholder="Busca tu evento" />
        </form>
    </div>
  );
};

export default Searcher;