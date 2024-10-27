import Card from '../Components/Card'
import { useCharStates } from '../Context';

const Home = () => {
  const { state } = useCharStates();
  return (
    <main> 
      <div className='card-grid'>
        {state.list.map((item, index) => 
          <Card key={index} name={item.name} username={item.username} id={item.id}/>
        )}
      </div>
    </main>
  )
}

export default Home