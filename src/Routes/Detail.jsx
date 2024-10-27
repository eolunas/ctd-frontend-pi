import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Detail = () => {
  const { id }= useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    // Consultar detalle del evento:
    // axios.get(`https://[RUTA BACKEND]/${id}`)
    //   .then(res => setEvent(res.data))
    //   .catch(error => {
    //     console.error('Error fetching data:', error); 
    //   });
    setEvent({
        name: 'Ejemplo',
        location: 'Teatro X',
        description: 'Reunion musical',
    })
  }, []);

  return (
    <>
      <h1>Detalle de evento # {id}</h1>
      {event && (
        <div>  
            <span>Nombre: {event.name}</span>
            <span>Localizacion: {event.location}</span>
            <span>Descripcion: {event.description}</span>
        </div>
      )}
    </>
  )
}

export default Detail