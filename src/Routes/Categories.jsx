import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../Components/Card";

const Categories = () => {
  const { category } = useParams(); // Obtener el parámetro dinámico de la URL
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://50xba6bw91.execute-api.us-east-1.amazonaws.com/event/category/${category}`
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <div
        onClick={() => navigate(-1)}
        className=' hover:text-primaryBlue flex justify-end items-center mb-8 mt-2 gap-2 text-white text-sm w-full cursor-pointer'
      >
        <i className='fa-solid fa-arrow-left'></i>
        <span className='flex justify-center items-center'>Regresar</span>
      </div>
      <h2 className='text-2xl font-bold text-primaryBlue mb-4'>
        Eventos de {category}
      </h2>
      <div className='z-10 grid grid-cols-1 gap-4 md:grid-cols-2'>
        {events.map((event, index) => (
          <Card key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
