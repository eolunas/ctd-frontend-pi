import { Outlet } from "react-router-dom";
import { BookingSteps } from "../Components/BookingSteps";

export default function BookingLayout() {
  return (
    <div className=''>
      {/* Steps arriba */}
      <BookingSteps />
      {/* Contenido centrado */}
      <div className='mt-10 w-full'>
        <Outlet />
      </div>
    </div>
  );
}
