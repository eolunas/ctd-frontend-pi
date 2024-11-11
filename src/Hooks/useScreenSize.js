import { useState, useEffect } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("medium");

  useEffect(() => {
    function updateScreenSize() {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("small");      // Tamaño "small" para pantallas pequeñas
      else if (width >= 640 && width < 1024) setScreenSize("medium"); // Tamaño "medium" para pantallas medianas
      else setScreenSize("large");                  // Tamaño "large" para pantallas grandes
    }

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return screenSize;
}
