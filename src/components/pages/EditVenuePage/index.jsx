import React from 'react';
import { useParams } from 'react-router-dom';
import CreateVenueForm from '../../forms/CreateVenueForm';
import { useFetchVenueById } from '../../../hooks/useFetchVenueById';
import Spinner from '../../common/LoadingSpinner';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import HelmetWrapper from '../../common/HelmetWrapper';

const EditVenuePage = () => {
    const { venueId } = useParams();
    const { venue, isLoading } = useFetchVenueById(venueId);
    const { apiError } = useErrorHandling();
  
    return (
      <div className="container mx-auto px-4 py-8">
        <HelmetWrapper 
        title="Edit Listing" 
        description="Edit your listed venue." 
      />
        <h1 className="text-4xl font-bold text-center mb-12 mt-12">Edit Venue</h1>
        {isLoading && <div className="flex justify-center items-center h-formHeight"><Spinner /></div>}
        {apiError && <div className="flex justify-center items-center h-formHeight bg-red-200 text-red-800 p-8 border border-red-800 rounded">Error: {apiError}</div>}
        {!isLoading && !apiError && venue && <CreateVenueForm editMode={true} initialData={venue} venueId={venueId} />}
      </div>
    );
  };
  

export default EditVenuePage;
