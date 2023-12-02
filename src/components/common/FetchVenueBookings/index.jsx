import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../../forms/BookingForm';
import { getVenueById } from '../../../api/venuesApi';
import Spinner from '../LoadingSpinner';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { getErrorMessage } from '../../../utils/utils';

const FetchVenueBookings = ({ venueId }) => {
  const navigate = useNavigate();
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiError, showError, clearError } = useErrorHandling();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      getVenueBookings();
    }
  }, [venueId, navigate]);

  const getVenueBookings = async () => {
    clearError();
    try {
      const venueData = await getVenueById(venueId);
      setBookedDates(venueData.bookings);
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div>
      {apiError && <div className="bg-red-200 text-red-800 p-4 border border-red-800 rounded">{apiError}</div>}
      <BookingForm venueId={venueId} bookedDates={bookedDates} />
    </div>
  );
};

export default FetchVenueBookings;
