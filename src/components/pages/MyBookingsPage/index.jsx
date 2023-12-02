import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchProfile } from '../../../hooks/useFetchProfile'; 
import Spinner from '../../common/LoadingSpinner';
import ImageDisplay from '../../common/ImageDisplay';
import { useErrorHandling } from '../../../hooks/useErrorHandling';

const MyBookingsPage = () => {
    const { user, bookings } = useFetchProfile();
    const { apiError } = useErrorHandling();
    const navigate = useNavigate();
  
    const onBookingCardClick = (venueId) => {
      navigate(`/venue/${venueId}`);
    };

    if (apiError) {
        return <div className="mt-32 bg-red-200 text-red-800 p-8 border border-red-800 rounded">{apiError}</div>;
      }
    
    if (!user || !bookings) {
      return <div className='mt-32'><Spinner /></div>;
    }
  
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-12 mt-12">My Bookings</h1>
      
          {bookings.length === 0 ? (
            <div className="text-center">
              <p className="text-xl font-semibold mt-2 mb-5">You have no bookings yet.</p>
              <p>Book your dream accommodation today! <a href="/" className="text-blue-700 underline">Explore venues.</a></p>
            </div>
          ) : (
            <div className="mt-6">
              <div className='p-4 max-w-3xl mx-auto'>
                <p className='mb-10'>Below is a list of bookings you've made, with a short summary for each booking. The dates you've reserved the accommodation for are listed as well as a booking ID. When contacting us about a particular reservation, please refer to this ID. To view more details, please click the card and you will be taken to that specific venue listing.</p>
                </div>
              <div className="flex flex-wrap mx-2 max-w-7xl mx-auto">
                {bookings.map((booking) => {
                  const bookingImage = Array.isArray(booking.venue.media) ? booking.venue.media[0] : booking.venue.media;
                  return (
                    <div
                      key={booking.id}
                      className="p-2 mx-auto sm:mx-0 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4"
                      onClick={() => onBookingCardClick(booking.venue.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="bg-white shadow-md p-4 mb-4 rounded-md h-full flex flex-col">
                        <ImageDisplay media={[bookingImage]} displayType="single" className="w-full h-60 object-cover" />
                        <div className="mt-2 flex-grow">
                          <p className='my-3'><span className="font-bold">Venue Name:</span> {booking.venue.name}</p>
                          <p className='my-3'><span className="font-bold">Check-in:</span> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                          <p className='my-3'><span className="font-bold">Check-out:</span> {new Date(booking.dateTo).toLocaleDateString()}</p>
                          <p className='my-3'><span className="font-bold">Guests:</span> {booking.guests}</p>
                          <p className='my-3'><span className="font-bold">Booking ID:</span> {booking.id}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );      
  };
  
  export default MyBookingsPage;
  
  