import { createContext, useContext, useEffect, useState } from "react";

const CopartLocationsContext = createContext(null);

export const CopartLocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [iaaLocations, setIaaLocations] = useState([]);

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const [copartResponse, iaaResponse] = await Promise.all([
          fetch("http://localhost:3000/copartLocations"),
          fetch("http://localhost:3000/iaaLocations"),
        ]);

        const [copartData, iaaData] = await Promise.all([
          copartResponse.json(),
          iaaResponse.json(),
        ]);

        // Combine both datasets
        setLocations(copartData);
        setIaaLocations(iaaData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchAllLocations();
  }, []);

  return (
    <CopartLocationsContext.Provider value={{ locations, iaaLocations }}>
      {children}
    </CopartLocationsContext.Provider>
  );
};

export const useCopartLocations = () => useContext(CopartLocationsContext);

export default CopartLocationsContext;
