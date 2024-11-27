import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Calendar = ({ dates }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs()); // Mes inicial
  const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
  const [isSelectVisible, setIsSelectVisible] = useState(false); // Controla el select
  console.log(dates);

  const parseDates = (dates) => {
    const formattedDates = {};
    dates?.forEach((dateStr) => {
      const date = dayjs(dateStr); // Convierte la fecha a dayjs
      const monthKey = date.format("YYYY-MM"); // Obtenemos el mes en formato 'YYYY-MM'
      const day = date.date(); // Extraemos el día

      // Agregar la fecha al objeto, si aún no existe, inicializamos el mes con un array vacío
      if (!formattedDates[monthKey]) {
        formattedDates[monthKey] = [];
      }
      formattedDates[monthKey].push(day); // Agregar el día disponible
    });
    return formattedDates;
  };

  // Fechas disponibles basadas en las fechas recibidas
  const availableDates = parseDates(dates);

  // Fechas simuladas
  // const availableDates = {
  //   "2024-11": [8, 9, 10],
  //   "2024-12": [4, 6, 15],
  //   "2025-01": [12, 15, 20],
  //   "2025-02": [5, 9],
  // };

  const fullDates = {};

  // Generar la lista de meses entre el actual y los próximos 12 meses
  const monthsList = Array.from({ length: 12 }, (_, i) =>
    dayjs().add(i, "month").startOf("month")
  );

  // Obtiene el nombre del mes
  const getMonthName = (date) => date.format("MMMM YYYY");

  const getDaysInMonth = (date) => {
    const startOfMonth = date.startOf("month").day();
    const daysInMonth = date.daysInMonth();
    return { startOfMonth, daysInMonth };
  };

  const changeMonths = (direction) => {
    const newMonth = currentMonth.add(direction, "month");
    if (
      newMonth.isAfter(dayjs().add(11, "month")) ||
      newMonth.isBefore(dayjs().startOf("month"))
    ) {
      return;
    }
    setCurrentMonth(newMonth);
  };

  const isAvailable = (monthKey, day) =>
    availableDates[monthKey]?.includes(day);
  const isFull = (monthKey, day) => fullDates[monthKey]?.includes(day);

  const handleDateClick = (monthKey, day) => {
    if (isAvailable(monthKey, day)) {
      setSelectedDate({ day, month: monthKey });
    }
  };

  const renderCalendar = (date) => {
    const { startOfMonth, daysInMonth } = getDaysInMonth(date);
    const monthKey = date.format("YYYY-MM");
    const daysArray = Array.from({ length: 42 }, (_, i) =>
      i < startOfMonth || i >= startOfMonth + daysInMonth
        ? null
        : i - startOfMonth + 1
    );

    return (
      <div className='p-2'>
        <div className='grid grid-cols-7 gap-2 text-sm text-primaryBlue'>
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={index} className='text-center'>
              {day}
            </div>
          ))}

          {daysArray.map((day, index) => {
            const dayClass =
              day === null
                ? "text-transparent"
                : isAvailable(monthKey, day)
                ? "bg-primaryBlue text-white cursor-pointer"
                : isFull(monthKey, day)
                ? "bg-gray-500 text-gray-300"
                : "text-gray-500";

            const selectedClass =
              selectedDate?.day === day && selectedDate?.month === monthKey
                ? "bg-secondaryYellow text-black font-bold"
                : "";

            return (
              <div
                key={index}
                className={`rounded-full w-8 h-8 flex items-center justify-center ${dayClass} ${selectedClass}`}
                onClick={() => handleDateClick(monthKey, day)}
              >
                {day || ""}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (dates && dates.length > 0) {
      // Convierte las fechas a objetos dayjs y encuentra la más cercana
      const today = dayjs();
      const closestDate = dates
        .map((dateStr) => dayjs(dateStr))
        .reduce((closest, date) =>
          Math.abs(date.diff(today)) < Math.abs(closest.diff(today))
            ? date
            : closest
        );

      // Configura el currentMonth al mes más cercano
      setCurrentMonth(closestDate.startOf("month"));
    }
  }, [dates]);

  return (
    <div className='bg-[#212121] rounded-3xl'>
      <h2 className='text-secondaryYellow p-4 text-2xl w-full border-primaryBlue border-b font-bold mb-4'>
        Fechas disponibles
      </h2>
      <div className='px-4'>
        {/* Controles del mes */}

        <div className='md:flex hidden justify-between items-center text-primaryBlue mb-4'>
          <div className='flex items-center gap-8'>
            <div
              className='cursor-pointer p-2'
              onClick={() => changeMonths(-1)}
            >
              <i className='fa-solid fa-chevron-left'></i>
            </div>
            <p>{getMonthName(currentMonth)}</p>
          </div>
          <div className='flex items-center gap-8'>
            <p>{getMonthName(currentMonth.add(1, "month"))}</p>
            <div className='cursor-pointer p-2' onClick={() => changeMonths(1)}>
              <i className='fa-solid fa-chevron-right'></i>
            </div>
          </div>
        </div>
        <div className='md:hidden justify-between items-center text-primaryBlue mb-4'>
          <div className='flex items-center justify-between  w-full'>
            <select
              className='bg-[#212121] focus:non '
              value={currentMonth.format("YYYY-MM")}
              onChange={(e) => setCurrentMonth(dayjs(e.target.value + "-01"))}
              onBlur={() => setIsSelectVisible(false)}
            >
              {monthsList.map((month) => (
                <option
                  key={month.format("YYYY-MM")}
                  value={month.format("YYYY-MM")}
                >
                  {getMonthName(month)}
                </option>
              ))}
            </select>

            <div className='flex'>
              <div
                className='cursor-pointer p-2'
                onClick={() => changeMonths(-1)}
              >
                <i className='fa-solid fa-chevron-left'></i>
              </div>

              <div
                className='cursor-pointer p-2'
                onClick={() => changeMonths(1)}
              >
                <i className='fa-solid fa-chevron-right'></i>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor de calendarios */}
        <div className='flex flex-col md:flex-row gap-5'>
          {renderCalendar(currentMonth)}
          <div className='hidden md:block'>
            {renderCalendar(currentMonth.add(1, "month"))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
