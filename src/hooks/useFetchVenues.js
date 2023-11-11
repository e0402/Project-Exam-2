import { useState, useEffect } from "react";
import { getVenues } from "../api/venuesApi";

export const useFetchVenues = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVenues();
        setVenues(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return { venues, error };
};
