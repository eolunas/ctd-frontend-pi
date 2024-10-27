import Card from "../Components/Card";
import { useCharStates } from "../Context";

const Favs = () => {
  const { state } = useCharStates();
  return (
    <>
      <h1>Eventos destacados</h1>
      <div className="card-grid">
        {state.favs.map((item, index) => 
          <Card key={index} id={item.id} username={item.username} name={item.name}/>
          )}
      </div>
    </>
  );
};

export default Favs;