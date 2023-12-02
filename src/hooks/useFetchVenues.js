import { useState, useEffect } from "react";
import { getVenues } from "../api/venuesApi";
import { getErrorMessage } from "../utils/utils";
import { useErrorHandling } from "./useErrorHandling";

export const useFetchVenues = () => {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError, clearError } = useErrorHandling();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getVenues();
        setVenues(data);
      } catch (error) {
        showError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [showError, clearError]);

  return { venues, isLoading };
};
