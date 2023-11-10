import { apiClient } from "./apiClient";

export const getProfiles = () => {
  return apiClient("/holidaze/profiles");
};

export const getProfileByName = (name) => {
  return apiClient(`/holidaze/profiles/${name}`);
};

export const getProfileBookings = (name) => {
  return apiClient(`/holidaze/profiles/${name}/bookings`);
};

export const getProfileVenues = (name) => {
  return apiClient(`/holidaze/profiles/${name}/venues`);
};

export const updateProfile = (name, data) => {
  return apiClient(`/holidaze/profiles/${name}`, {
    method: "PUT",
    body: data,
  });
};
