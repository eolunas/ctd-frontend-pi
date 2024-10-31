import { Link } from "react-router-dom";
import { useCharStates } from "../Context";

// eslint-disable-next-line react/prop-types
const Card = ({ card }) => {
  // const { state, dispatch } = useCharStates();
  // const stored = state.favs.find(item => item.id == id);
  // const addFav = () => dispatch({ 
  //   type: stored ? 'REMOVE_FAVS' : 'ADD_FAVS', 
  //   payload: { name, username, id } 
  // });
  
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h3 className="text-md font-semibold text-gray-700">{card.title}</h3>
      <p className="text-sm text-gray-500">{card.description}</p>
    </div>
  );
};

export default Card;


{/* 
  Backup

  <div className="card">
    <Link to={`/detail/${id}`}>
      <img src="images/doctor.jpg" alt="Foto doctor" />
      <div className={`info-container ${!state.theme && "dark-info-container"}`}>
          <span className="name-indicator">{name}</span>
          <span className="username-indicator">{username}</span>
      </div>
    </Link>
    <span className="id-indicator">{id}</span>
    <button onClick={addFav} className="favButton">
      {stored ?"💚" : "🤍"}
    </button>
  </div> 
    
*/}