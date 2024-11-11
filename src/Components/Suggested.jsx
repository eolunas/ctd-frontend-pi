import { useCharStates } from "../Context";
import Card from "../Components/Card";

const Suggested = () => {
  const { state } = useCharStates();
    return (
        <div className="m-6 md:m-10">
            <h2 className="text-2xl font-bold text-cyan-500 mb-5">Recomendaciones</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {state.list.map((event, index) => (<Card key={index} event={event} />))}
            </div>
        </div>
    );
  };
  
  export default Suggested;