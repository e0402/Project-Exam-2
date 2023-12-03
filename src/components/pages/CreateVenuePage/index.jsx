import React from 'react';
import CreateVenueForm from '../../forms/CreateVenueForm';
import HelmetWrapper from '../../common/HelmetWrapper';


const CreateVenuePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <HelmetWrapper 
        title="Create New Listing" 
        description="Create a new listing for you venue." 
      />
      <h1 className="text-4xl font-bold text-center mb-12 mt-12">Create Venue Listing</h1>
      <div className='p-4 max-w-3xl mx-auto'>
        <p className='mb-5'>Please provide as much detail as possible when registering your venue. This both increases the likelyhood of bookings and prevents unnecesairy questions by potential customers.</p>
        <p className='font-semibold mb-5'>Fields marked with * are required. The rest is optional, although we recommend using all of them</p>
      </div>
      <CreateVenueForm />
    </div>
  );
};

export default CreateVenuePage;
