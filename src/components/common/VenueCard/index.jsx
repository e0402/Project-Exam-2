import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingStars from '../RatingStars';
import BookingForm from '../../forms/BookingForm';
import LoginModal from '../LoginModal';
import LoginForm from '../../forms/LoginForm';
import { FaWifi, FaPaw, FaParking, FaCoffee, FaUser } from 'react-icons/fa';
import Spinner from '../LoadingSpinner';
import ImageDisplay from '../ImageDisplay';

const VenueCard = ({ venue, bookedDates, maxGuests, owner, isSingleVenuePage = false }) => {
  const isLoggedIn = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!venue) {
    return <div><Spinner /></div>;
  }

  const renderMetaInfo = (icon, label, value) => {
    return (
      <p className={`${value ? '' : 'line-through'}`}>
        {icon} {label}
      </p>
    );
  };

    const renderHomepageView = () => (
      <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden w-full mx-auto cursor-pointer transform transition duration-2000 ease-in-out hover:duration-300"
      onClick={() => navigate(`/venue/${venue.id}`)}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.007)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <div className="w-[100%] mx-auto h-[calc(100% - 20px)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}>
        <div className="relative top-[-20px]">
          <ImageDisplay media={venue.media} displayType="slider" />
        </div>
      </div>
  
      {/* Venue Details */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between mx-3">
          <div className='mt-1'>    
            <RatingStars rating={venue.rating} />
          </div>
          <div className='text-gray-500 text-sm'>
            <p><FaUser className="inline" /> Guests: {venue.maxGuests}</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-5 mx-3">{venue.name}</h3>
        <p className="flex-grow text-gray-600 mt-2 mb-0 line-clamp-2 mx-3">{venue.description}</p>
        <p className="text-xl text-center font-bold mt-5 mb-5">
          {venue.price ? `$${venue.price.toLocaleString()}` : 'Contact for price'}{' '}
          <span className='text-sm'>(Per Night)</span>
        </p>
  
        {/* View Venue Button */}
        <div className="mt-1 text-center mb-4">
          <button
            onClick={() => navigate(`/venue/${venue.id}`)}
            className="bg-orange-400 hover:bg-orange-500 text-white text-center font-semibold py-2 px-7 rounded-full inline-block">
            View Venue
          </button>
        </div>
      </div>
    </div>
  );
  
const renderSingleVenueView = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full w-[87.5%] max-w-7xl mx-auto">
    {/* Image Slider */}
    <ImageDisplay media={venue.media} displayType="slider" />
    
    {/* Venue Name */}
    <h1 className="text-3xl text-center font-semibold mx-5 mt-10 mb-5">{venue.name}</h1>
    <div className="flex flex-row justify-center items-center mx-5">
      {/* Owner Information */}
      <div className="text-sm">
        <div className="flex items-center space-x-2">
            <ImageDisplay media={[owner.avatar]} displayType="avatar" className="w-10 h-10 rounded-full" />
          <span>{owner.name}</span>
        </div>
      </div>

      {/* Star rating */}
      <div className="ml-7">
        <RatingStars rating={venue.rating} />
      </div>
    </div>


    {/* Venue Details and Booking Form */}
    <div className="flex flex-col md:flex-row p-2 md:p-12 ml-2">
      <div className="md:w-2/3 md:mr-4">
        <p className="text-m font-semibold mt-8 mb-8">
          <span className='font-bold'>Price: </span>{venue.price ? `$${venue.price.toLocaleString()}` : 'Contact for price'} (Per Night)
        </p>
        <p className="text-gray-600 mt-3 mb-8">{venue.description}</p>

        {/* Additional Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Additional info:</h2>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <FaUser className="inline mr-1" /> Guests: {venue.maxGuests}
            </p>
            {renderMetaInfo(<FaWifi className="inline mr-1" />, 'Wifi', venue.meta.wifi)}
            {renderMetaInfo(<FaParking className="inline mr-1" />, 'Parking', venue.meta.parking)}
            {renderMetaInfo(<FaCoffee className="inline mr-1" />, 'Breakfast', venue.meta.breakfast)}
            {renderMetaInfo(<FaPaw className="inline mr-1" />, 'Pets', venue.meta.pets)}
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="sm:w-2/3 mx-auto lg:w-1/3 mt-4 md:mx-2">
      {isLoggedIn ? (
        <BookingForm venueId={venue.id} bookedDates={bookedDates} maxGuests={maxGuests} pricePerNight={venue.price} />
      ) : (
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="text-lg font-semibold text-center mb-4">
            See available dates for this venue:
          </p>
          <LoginModal isOpen={isModalOpen} closeModal={closeModal}>
            <LoginForm onLoginSuccess={closeModal} isModal={true} />
          </LoginModal>
          <button 
            className='bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 font-semibold py-2 px-8 rounded-full mb-12'
            onClick={openModal}
          >
            See dates
          </button>
        </div>
        )}
      </div>
    </div>
  </div>
);

  return isSingleVenuePage ? renderSingleVenueView() : renderHomepageView();
};

export default VenueCard;
