import { apiClient } from "./apiClient";

export const getBookings = () => {
  return apiClient("/holidaze/bookings");
};

export const getBookingById = (id) => {
  return apiClient(`/holidaze/bookings/${id}`);
};

export const createBooking = (bookingData) => {
  return apiClient("/holidaze/bookings", {
    method: "POST",
    body: bookingData,
  });
};

export const updateBooking = (id, bookingData) => {
  return apiClient(`/holidaze/bookings/${id}`, {
    method: "PUT",
    body: bookingData,
  });
};

export const deleteBooking = (id) => {
  return apiClient(`/holidaze/bookings/${id}`, {
    method: "DELETE",
  });
};
