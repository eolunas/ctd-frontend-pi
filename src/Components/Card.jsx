import { Link } from "react-router-dom";
import { useScreenSize } from "../Hooks/useScreenSize";
import { useCharStates } from "../Context";
import FavIcon from "../assets/1-Iconos/Home/favorite-card.svg";
import FavIconFilled from "../assets/1-Iconos/Home/favorite-filled.svg";
import PlaceIcon from "../assets/1-Iconos/Home/place.svg";
import GenreIcon from "../assets/1-Iconos/Home/genre.svg";

// eslint-disable-next-line react/prop-types
const Card = ({ event }) => {
  const screenSize = useScreenSize();
  const { state, dispatch } = useCharStates();
  const stored = state.favs.find((item) => item.id == event.id);
  const addFav = (id) =>
    dispatch({
      type: stored ? "REMOVE_FAVS" : "ADD_FAVS",
      payload: { id },
    });

  return (
    <div key={event.id} className="z-10 overflow-hidden">
      <Link className="relative" to={`/detail/${event.id}`} state={{ event }}>
        <img
          className="w-full aspect-2/1 object-cover cursor-pointer rounded-3xl"
          src={event.images[screenSize]}
          alt={event.name}
        />
        <div className={`
          bg-secondaryYellow absolute bottom-0 left-0 w-5/12 h-1/4 rounded-tr-2xl rounded-bl-2xl
          flex flex-col justify-center items-center`}>
          <span className="text-white text-2xl">{event.date}</span>
          <span className="text-white text-lg">{event.time}hrs</span>
        </div>
      </Link>
      <div className="my-5 flex flex-col gap-4 lg:mx-5">
        <div className="flex w-full justify-between">
          <h3 className="text-white font-semibold text-2xl">{event.name}</h3>
          <a
            className="basis-[15%] flex justify-end m-2"
            onClick={() => addFav(event.id)}
          >
            <img
              className="size-6 cursor-pointer"
              src={stored ? FavIconFilled : FavIcon}
              alt="Favorite Icon"
            />
          </a>
        </div>
        <p className="text-secondaryYellow text-xl">{event.city}</p>
        <div className="flex">
          <span className="w-3/5 text-white text-sm flex gap-2">
            <img className="size-6" src={PlaceIcon} alt="Place Icon" />
            {event.site}
          </span>
          <span className="w-2/5 text-white text-sm flex gap-2">
            <img className="size-6" src={GenreIcon} alt="Genre Icon" />
            {event.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

{
  /* 
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
    
*/
}
