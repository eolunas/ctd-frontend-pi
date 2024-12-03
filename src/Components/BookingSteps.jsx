import { useCallback, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import blueArrow from "../assets/Steps/blueArrow.png";
import whiteArrow from "../assets/Steps/whiteArrow.png";

export const BookingSteps = () => {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState("");
  const { event } = location.state || {}; // Manejar el caso donde no haya estado

  const determineActiveStep = useCallback(() => {
    const pathname = location.pathname;
    if (pathname.includes("summary")) {
      setActiveStep("summary");
    } else if (pathname.includes("succes")) {
      setActiveStep("succes");
    } else {
      setActiveStep("booking");
    }
  }, [location.pathname]);

  useEffect(() => {
    determineActiveStep();
  }, [determineActiveStep]);

  const steps = ["booking", "summary", "succes"];
  const icons = {
    booking: "fa-regular fa-calendar",
    summary: "fa-solid fa-clipboard-list",
    succes: "fa-solid fa-check",
  };
  const sections = [
    "Confirmación de fecha",
    "Resumen de reserva",
    "Reserva realizada",
  ];

  const pageLinks = {
    booking: { path: "/booking", state: { event } },
    summary: { path: "/booking/summary", state: { event } },
    succes: { path: "/booking/succes", state: { event } },
  };

  const activeIndex = steps.indexOf(activeStep);

  return (
    <div className='flex items-center justify-between w-full border-2 shadow rounded-r-full rounded-l-3xl'>
      {steps.map((step, index) => (
        <Link
          to={pageLinks[step].path}
          state={pageLinks[step].state}
          key={index}
          onClick={(e) => index > activeIndex && e.preventDefault()}
          className={`flex items-center justify-around  md:justify-between w-full p-4  ${
            index < activeIndex
              ? "bg-primaryBlue  hover:text-[#235884] text-[#235884]"
              : index === activeIndex
              ? "bg-primaryBlue rounded-r-full hover:text-[#235884] text-[#235884]"
              : "cursor-not-allowed hover:text-gray-400 text-gray-400"
          }`}
        >
          <div className='flex  gap-2 items-center justify-center text-center'>
            <i className={`${icons[step]} text-2xl md:text-xl `} />
            <p className='text-sm lg:text-base font-bold hidden md:block'>
              {sections[index]}
            </p>
          </div>

          <div className='overflow-x-hidden'>
            <img
              src={blueArrow}
              alt={"blueArrow"}
              className={`w-6 ${index <= activeIndex ? "block" : "hidden"}`}
            />
            <img
              src={whiteArrow}
              alt={"whiteArrow"}
              className={`w-6 ${index <= activeIndex ? "hidden" : "block"}`}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
