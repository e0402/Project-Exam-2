export const getBookedDates = (bookings) => {
  const bookedDates = [];

  bookings.forEach((booking) => {
    const startDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      bookedDates.push(new Date(date));
    }
  });

  return bookedDates;
};
