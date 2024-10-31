import urlEvento from "../assets/0-Logo/detalles.svg";
import { Link } from "react-router-dom";

// Datos simulados para los eventos con imágenes locales
const eventList = [
  { id: "1", name: "Festival Coachella", date: "April 12, 2024", location: "Empire Polo Club, Indio", imageUrl: urlEvento },
  { id: "2", name: "Tomorrowland", date: "July 21, 2024", location: "Boom, Belgium", imageUrl: urlEvento },
  { id: "3", name: "Glastonbury Festival", date: "June 26, 2024", location: "Worthy Farm, Pilton", imageUrl: urlEvento },
  { id: "4", name: "Rock al parque", date: "August 02, 2024", location: "Media torta, Bogota", imageUrl: urlEvento }
];

const Suggested = () => {
    return (
        <div className="m-10">
            <h2 className="text-xl font-bold text-cyan-500 mb-5">Recomendaciones</h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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