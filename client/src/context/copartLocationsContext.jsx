import { createContext, useContext, useEffect, useState } from "react";

const CopartLocationsContext = createContext(null);

export const CopartLocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:3000/copartLocations");
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching copart locations:", error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <CopartLocationsContext.Provider value={{ locations }}>
      {children}
    </CopartLocationsContext.Provider>
  );
};

export const useCopartLocations = () => useContext(CopartLocationsContext);

export default CopartLocationsContext;
