import coachellaImage from "../assets/0-Logo/detalles.svg";
import tomorrowlandImage from "../assets/0-Logo/detalles.svg";
import glastonburyImage from "../assets/0-Logo/detalles.svg";
import { Link } from "react-router-dom";

// Datos simulados para los eventos con imágenes locales
const eventList = [
  { id: "1", name: "Festival Coachella", date: "April 12, 2024", location: "Empire Polo Club, Indio", imageUrl: coachellaImage },
  { id: "2", name: "Tomorrowland", date: "July 21, 2024", location: "Boom, Belgium", imageUrl: tomorrowlandImage },
  { id: "3", name: "Glastonbury Festival", date: "June 26, 2024", location: "Worthy Farm, Pilton", imageUrl: glastonburyImage }
];

const Suggested = () => {
    return (
        <div className="m-5">
            <h2 className="text-lg font-bold text-cyan-500 mb-4">Recomendaciones</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {eventList.map((event) => (
              <div key={event.id} className="bg-black overflow-hidden shadow-lg">
                <Link to={`/detail/${event.id}`} state={{ event }}>
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-full h-48 object-cover cursor-pointer rounded-lg"
                  />
                </Link>
                <div className="">
                  <h3 className="text-white font-semibold text-xl">{event.name}</h3>
                  <p className="text-gray-400">{event.location}</p>
                  <p className="text-gray-400">{event.date}</p>
                </div>
              </div>
            ))}
            </div>
        </div>
    );
  };
  
  export default Suggested;