import { apiClient } from "./apiClient";

export const getVenues = (
  limit = 100,
  offset = 0,
  sort = "created",
  sortOrder = "desc"
) => {
  return apiClient(
    `/holidaze/venues?_owner=true&limit=${limit}&offset=${offset}&sort=${sort}&sortOrder=${sortOrder}`
  );
};

export const getVenueById = (id) => {
  return apiClient(`/holidaze/venues/${id}?_bookings=true&_owner=true`);
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
