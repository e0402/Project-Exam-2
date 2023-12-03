import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchProfile } from '../../../hooks/useFetchProfile';
import { deleteVenue } from '../../../api/venuesApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Spinner from '../../common/LoadingSpinner';
import ImageDisplay from '../../common/ImageDisplay';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { getErrorMessage } from '../../../utils/utils';
import HelmetWrapper from '../../common/HelmetWrapper';

const MyListingsPage = () => {
  const { user, venues, setVenues } = useFetchProfile();
  const { apiError, showError } = useErrorHandling();
  const navigate = useNavigate();

  const onVenueCardClick = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  const onEditClick = (e, venueId) => {
    e.stopPropagation();
    navigate(`/edit-venue/${venueId}`);
  };

  const onDeleteClick = async (e, venueId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteVenue(venueId);
        setVenues(currentVenues => currentVenues.filter(venue => venue.id !== venueId));
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        showError(errorMessage);
      }
    }
  };
  
  if (apiError) {
    return <div className='mt-32 bg-red-200 text-red-800 p-8 border border-red-800 rounded'>Error: {apiError}</div>;
  }

  if (!user || venues === undefined) {
    return <div className='mt-32'><Spinner /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HelmetWrapper 
        title="My Listings" 
        description="A display of all your recent venue listings." 
      />
      <h1 className="text-4xl font-bold text-center mt-12 mb-14">My Venue Listings</h1>
      {venues.length === 0 ? (
        <div>
            <p className="text-center text-xl font-semibold mt-2 mb-5">No listings yet.</p>
            <p className='text-center'>Listing a Venue is both simple and quick. <a href="/create-venue" className='text-blue-700 underline font-semibold'>Get started now!</a></p>
        </div>
        ) : (
        <div className="mt-6">
          <div className="flex flex-wrap -mx-2 max-w-7xl mx-auto">
            <p className='mb-10 p-4 max-w-3xl mx-auto'>This is were all active listings are displayed. To view an individual listing, please click the card and you will be taken to that individual listing page. There you can view the listing as its displayed to other users. You also have the option to edit or delete a listing by clicking the icons displayed on each card.</p>
            {venues.map(venue => (
              <div 
                key={venue.id} 
                className="p-2 w-full xl:w-1/2 relative cursor-pointer mt-5" 
                onClick={() => onVenueCardClick(venue.id)}
              >
                <div className="bg-white shadow-md p-4 mb-4 rounded-md h-full flex flex-col relative">
                  <div className="absolute top-0 right-0 bg-green-700 text-white px-2 py-1 rounded-bl-md">Active</div>
                  <ImageDisplay media={venue.media} displayType="single" className="mx-auto h-24 w-24 object-cover rounded-full mt-6" />
                  <div className="mt-2 flex-grow">
                    <h2 className="font-bold text-2xl my-3 text-center">{venue.name}</h2>
                    {venue.bookings.length > 0 ? (
                      <>
                        <div className="block md:hidden">
                          {/* Mobile View */}
                          <h3 className="font-bold text-lg my-12 text-center">Customer Bookings:</h3>
                          <div className="flex flex-col items-center divide-y divide-gray-200">
                            {venue.bookings.map(booking => (
                              <div key={booking.id} className="py-2">
                                <p><strong>Created:</strong> {new Date(booking.created).toLocaleDateString()}</p>
                                <p><strong>Date From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                                <p><strong>Date To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
                                <p><strong>Guests:</strong> {booking.guests}</p>
                                <p><strong>Updated:</strong> {new Date(booking.updated).toLocaleDateString()}</p>
                              </div>
                            ))}
                          </div>
                        </div>
  
                        <div className="hidden md:block">
                          {/* Desktop View */}
                          <h3 className="font-bold text-lg my-12 text-center">Customer Bookings:</h3>
                          <table className="min-w-full divide-y divide-gray-200 mt-2">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date From</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date To</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {venue.bookings.map(booking => (
                                <tr key={booking.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.created).toLocaleDateString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.dateFrom).toLocaleDateString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.dateTo).toLocaleDateString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{booking.guests}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <p className="mt-2 text-center font-semibold mb-12">No bookings yet</p>
                    )}
                  </div>
                  <div className="flex justify-center items-center space-x-4 mt-4 mb-4">
                    <button onClick={(e) => onEditClick(e, venue.id)} className="px-4 py-2 rounded-md text-2xl"><FaEdit /></button>
                    <button onClick={(e) => onDeleteClick(e, venue.id)} className="px-4 py-2 rounded-md text-xl"><FaTrash/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );  
};

export default MyListingsPage;
