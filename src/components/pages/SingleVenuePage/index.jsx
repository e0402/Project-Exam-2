import React from 'react';
import { useParams } from 'react-router-dom';
import VenueCard from '../../common/VenueCard';
import { useFetchVenueById } from '../../../hooks/useFetchVenueById';
import Spinner from '../../common/LoadingSpinner';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import HelmetWrapper from '../../common/HelmetWrapper';

const SingleVenue = () => {
  const { id } = useParams();
  const { venue, bookedDates, isLoading } = useFetchVenueById(id);
  const { apiError } = useErrorHandling();

  if (apiError) {
    return <div className="flex justify-center items-center h-screen bg-red-200 text-red-800 p-8 border border-red-800 rounded">Error: {apiError}</div>;
  }

  if (isLoading || !venue) { 
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const owner = venue.owner;

  return (
    <div className="m-4 md:m-6 lg:m-12 xl:m-12">
      <HelmetWrapper 
        title="More info" 
        description="View more details about your chosen venue." 
      />
      <VenueCard venue={venue} bookedDates={bookedDates} maxGuests={venue.maxGuests} isSingleVenuePage={true} owner={owner} />
    </div>
  );
};

export default SingleVenue;
