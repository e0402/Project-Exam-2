import { useState, useEffect } from "react";
import { getVenueById } from "../api/venuesApi";
import { getBookedDates } from "../utils/getBookedDates";
import { getErrorMessage } from "../utils/utils";
import { useErrorHandling } from "./useErrorHandling";

export const useFetchVenueById = (id) => {
  const [venue, setVenue] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { showError, clearError } = useErrorHandling();

  useEffect(() => {
    if (!id) return;

    const fetchVenueData = async () => {
      clearError();
      setisLoading(true);
      try {
        const venueData = await getVenueById(id);
        setVenue(venueData);
        const formattedBookedDates = getBookedDates(venueData.bookings);
        setBookedDates(formattedBookedDates);
      } catch (error) {
        showError(getErrorMessage(error));
      } finally {
        setisLoading(false);
      }
    };

    fetchVenueData();
  }, [id, showError, clearError]);

  return { venue, bookedDates, isLoading };
};
