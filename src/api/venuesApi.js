import { apiClient } from "./apiClient";

export const getVenues = () => {
  return apiClient("/holidaze/venues");
};

export const getVenueById = (id) => {
  return apiClient(`/holidaze/venues/${id}`);
};

export const createVenue = (venueData) => {
  return apiClient("/holidaze/venues", {
    method: "POST",
    body: venueData,
  });
};

export const updateVenue = (id, venueData) => {
  return apiClient(`/holidaze/venues/${id}`, {
    method: "PUT",
    body: venueData,
  });
};

export const deleteVenue = (id) => {
  return apiClient(`/holidaze/venues/${id}`, {
    method: "DELETE",
  });
};
