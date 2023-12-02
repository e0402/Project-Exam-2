import { useEffect, useState } from "react";
import {
  getProfileByName,
  getProfileBookings,
  getProfileVenues,
} from "../api/profilesApi";
import { getVenueById } from "../api/venuesApi";
import { useErrorHandling } from "./useErrorHandling";
import { getErrorMessage } from "../utils/utils";

export function useFetchProfile() {
  const [user, setUser] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { showError, clearError } = useErrorHandling();

  useEffect(() => {
    const fetchData = async () => {
      clearError();
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          showError("Username not found in storage.");
          return;
        }

        const profileData = await getProfileByName(username);
        setUser(profileData);

        const userBookings = await getProfileBookings(username);
        setBookings(userBookings);

        const userVenues = await getProfileVenues(username);
        const venuesWithBookings = await Promise.all(
          userVenues.map(async (venue) => {
            const venueDetails = await getVenueById(venue.id);
            return { ...venueDetails };
          })
        );
        setVenues(venuesWithBookings);
      } catch (error) {
        showError(getErrorMessage(error));
      }
    };

    fetchData();
  }, [clearError, showError]);

  return { user, bookings, setUser, venues, setVenues };
}
