import { apiClient } from "./apiClient";

export const getProfiles = () => {
  return apiClient("/holidaze/profiles?_bookings=true");
};

export const getProfileByName = (name) => {
  return apiClient(`/holidaze/profiles/${name}?_venueManager=true`);
};

export const getProfileBookings = (name) => {
  return apiClient(`/holidaze/profiles/${name}/bookings?_venue=true`);
};

export const getProfileVenues = (name) => {
  return apiClient(`/holidaze/profiles/${name}/venues`);
};

export const updateProfile = (name, data) => {
  return apiClient(`/holidaze/profiles/${name}/media`, {
    method: "PUT",
    body: data,
  });
};
