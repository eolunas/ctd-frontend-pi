import Card from '../Components/Card'
import { useCharStates } from '../Context';
import { Link } from "react-router-dom";

const Home = () => {
  const { state } = useCharStates();
  return (
    <main> 
      <div className='card-grid'>
        {state.list.map((item, index) => 
          <Card key={index} name={item.name} username={item.username} id={item.id}/>
        )}
      </div>
      <h1 className="text-2xl font-bold">Bienvenido a TicketGo</h1>
      <p className="mt-4 text-lg">Encuentra los mejores eventos musicales aquí.</p>
      <Link to="/eventos">
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Ver Lista de Eventos
        </button>
      </Link>

    </main>
  )
}

export default Home