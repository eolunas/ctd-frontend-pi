import Categories from '../Components/Categories';
import Searcher from '../Components/Searcher';
import Suggested from '../Components/Suggested';
import { useCharStates } from '../Context';

const Home = () => {
  const { state } = useCharStates();
  return (
    <> 
      <Searcher />
      <Categories />
      <Suggested />
    </>
  )
}

export default Home


{/* 
   BACKUP 
  <div className='card-grid'>
        {state.list.map((item, index) => 
          <Card key={index} name={item.name} username={item.username} id={item.id}/>
        )}
  </div> 

  <Link to="/eventos">
  <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
    Ver Lista de Eventos
  </button>
</Link>

  */}