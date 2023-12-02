import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useFormSubmit } from '../../../hooks/useFormSubmit';
import { createVenue, updateVenue } from '../../../api/venuesApi';
import { createVenueSchema, updateVenueSchema } from '../../../validation/validationSchemas'; 
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../common/ModalContext';
import Modal from '../../common/Modal';
import { FaCheckCircle } from 'react-icons/fa';
import Spinner from '../../common/LoadingSpinner';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { getErrorMessage } from '../../../utils/utils';

const CreateVenueForm = ({ editMode = false, initialData = {}, venueId }) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { apiError, showError, clearError } = useErrorHandling();

  const apiFunction = editMode 
    ? (formData) => updateVenue(venueId, formData) 
    : (formData) => createVenue(formData);
  
  const { handleSubmit: handleApiSubmit } = useFormSubmit(apiFunction, {
    onSuccess: (response, navigate) => {
      clearError();
      openModal("Venue " + (editMode ? "Updated" : "Created") + " Successfully!");
      
      setTimeout(() => {
        navigate('/my-listings');
        closeModal();
      }, 2000);
    },
    onFailure: (error) => {
     showError(getErrorMessage(error));
    },
  });
    
  const formik = useFormik({
    initialValues: editMode ? initialData : {
      name: '',
      description: '',
      media: [],
      price: 0,
      maxGuests: 0,
      rating: 0,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false
      },
      location: {
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
        lat: 0,
        lng: 0
      },
    },
    validationSchema: editMode ? updateVenueSchema : createVenueSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await handleApiSubmit(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (editMode) {
      formik.setValues(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, initialData]); // Notice `formik.setValues` is removed
  
  const handleBack = () => {
    navigate('/my-listings');
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-12 pb-8 mb-4">
        <div className="flex flex-col md:flex-row">
          {/* Left form column */}
          <div className="flex-1 md:mr-7">

            {/* Name & Max Guests */}
            <div className="flex flex-wrap mb-4">
              {/* Name */}
              <div className="flex-1 mr-2">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name*:</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder='Name of the venue'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-xs italic">{formik.errors.name}</div>
                )}
              </div>
              {/* Max Guests */}
              <div className="flex-1">
                <label htmlFor="maxGuests" className="block text-gray-700 text-sm font-bold mb-2">Max Guests*:</label>
                <input
                  id="maxGuests"
                  type="number"
                  name="maxGuests"
                  onChange={formik.handleChange}
                  value={formik.values.maxGuests}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.maxGuests && formik.errors.maxGuests && (
                  <div className="text-red-500 text-xs italic">{formik.errors.maxGuests}</div>
                )}
              </div>
            </div>
  
            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description*:</label>
              <textarea
                id="description"
                name="description"
                placeholder='Please provide a detailed description of your venue here'
                onChange={formik.handleChange}
                value={formik.values.description}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-xs italic">{formik.errors.description}</div>
              )}
            </div>
  
            {/* Price & Rating */}
            <div className="flex flex-wrap mb-4">
              {/* Price */}
              <div className="flex-1 mr-2">
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price ($)*:</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-500 text-xs italic">{formik.errors.price}</div>
                )}
              </div>
              {/* Rating */}
              <div className="flex-1">
                <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Stars:</label>
                <input
                  id="rating"
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  onChange={formik.handleChange}
                  value={formik.values.rating}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.rating && formik.errors.rating && (
                  <div className="text-red-500 text-xs italic">{formik.errors.rating}</div>
                )}
              </div>
            </div>
  
            {/* Media URLs */}
            <div className="mb-4">
              <label htmlFor="media" className="block text-gray-700 text-sm font-bold mb-2">Media URLs:</label>
              {formik.values.media.map((url, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    name={`media[${index}]`}
                    value={url}
                    onChange={formik.handleChange}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow mr-2"
                  />
                  <button 
                    type="button" 
                    onClick={() => formik.setFieldValue('media', formik.values.media.filter((_, idx) => idx !== index))}
                    className="  font-bold py-2 px-1 rounded focus:outline-none focus:shadow-outline
                    "
                  >
                    X
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => formik.setFieldValue('media', [...formik.values.media, ''])}
                className="bg-white hover:bg-gray-100 text-blue-700 border border-blue-700 font-semibold py-2 px-7 rounded-full mr-3 mt-2"
              >
                Add Media URL
              </button>
            </div>
          </div>
  
          {/* Right form column */}
          <div className="flex-1 md:ml-7">

             {/* Meta (Object with Booleans) */}
          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Includes:</p>
            <div className="flex flex-wrap">
              {/* Column 1 */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <input
                    id="wifi"
                    type="checkbox"
                    name="meta.wifi"
                    onChange={formik.handleChange}
                    checked={formik.values.meta.wifi}
                    className="mr-2 leading-tight"
                  />
                  <label htmlFor="wifi" className="text-sm">WiFi</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="parking"
                    type="checkbox"
                    name="meta.parking"
                    onChange={formik.handleChange}
                    checked={formik.values.meta.parking}
                    className="mr-2 leading-tight"
                  />
                  <label htmlFor="parking" className="text-sm">Parking</label>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <input
                    id="breakfast"
                    type="checkbox"
                    name="meta.breakfast"
                    onChange={formik.handleChange}
                    checked={formik.values.meta.breakfast}
                    className="mr-2 leading-tight"
                  />
                  <label htmlFor="breakfast" className="text-sm">Breakfast</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="pets"
                    type="checkbox"
                    name="meta.pets"
                    onChange={formik.handleChange}
                    checked={formik.values.meta.pets}
                    className="mr-2 leading-tight"
                  />
                  <label htmlFor="pets" className="text-sm">Pets Allowed</label>
                </div>
              </div>
            </div>
          </div>

          {/* Location (Nested Object) */}
          <div className="mb-4">
            <label htmlFor="location.address" className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
            <input
              type="text"
              name="location.address"
              placeholder="Venue address"
              onChange={formik.handleChange}
              value={formik.values.location.address}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
  
          {/* Location - City & Zip */}
          <div className="flex flex-wrap mb-4">
            {/* City */}
            <div className="flex-1 mr-2">
              <label htmlFor="location.city" className="block text-gray-700 text-sm font-bold mb-2">City:</label>
              <input
                type="text"
                name="location.city"
                placeholder="City"
                onChange={formik.handleChange}
                value={formik.values.location.city}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Zip */}
            <div className="flex-1">
              <label htmlFor="location.zip" className="block text-gray-700 text-sm font-bold mb-2">Zip:</label>
              <input
                type="text"
                name="location.zip"
                placeholder="Zip code"
                onChange={formik.handleChange}
                value={formik.values.location.zip}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Location - Country & Continent */}
          <div className="flex flex-wrap mb-4">
            {/* Country */}
            <div className="flex-1 mr-2">
              <label htmlFor="location.country" className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
              <input
                type="text"
                name="location.country"
                placeholder="Country"
                onChange={formik.handleChange}
                value={formik.values.location.country}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Continent */}
            <div className="flex-1">
              <label htmlFor="location.continent" className="block text-gray-700 text-sm font-bold mb-2">Continent:</label>
              <input
                type="text"
                name="location.continent"
                placeholder="Continent"
                onChange={formik.handleChange}
                value={formik.values.location.continent}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Location - Latitude & Longitude */}
          <div className="flex flex-wrap mb-4">
            {/* Latitude */}
            <div className="flex-1 mr-2">
              <label htmlFor="location.lat" className="block text-gray-700 text-sm font-bold mb-2">Latitude:</label>
              <input
                type="number"
                name="location.lat"
                placeholder="Latitude"
                onChange={formik.handleChange}
                value={formik.values.location.lat}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Longitude */}
            <div className="flex-1">
              <label htmlFor="location.lng" className="block text-gray-700 text-sm font-bold mb-2">Longitude:</label>
              <input
                type="number"
                name="location.lng"
                placeholder="Longitude"
                onChange={formik.handleChange}
                value={formik.values.location.lng}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-full">
          {editMode ? 'Edit Listing' : 'Create Listing'}
        </button>
        {editMode && (
          <button onClick={handleBack} className="bg-white hover:bg-gray-100 text-blue-700 border border-blue-700 font-semibold py-2 px-7 rounded-full mr-3 cursor-pointer mx-3">
            Cancel
          </button>
        )}
      </div>
    </form>

    {/* Conditional rendering of Modal */}
    <Modal>
      <div className="flex justify-center items-center mb-5">
        <FaCheckCircle className="text-green-500" style={{ fontSize: '80px' }} />
      </div>
      <p className='font-semibold text-3xl mb-10'>
        {editMode ? "Update successfull!" : "Listing successfully created!"} 
      </p>
      <div><Spinner /></div>
    </Modal>

      {/* Error display */}
      {apiError && <div className="flex justify-center items-center h-formHeight bg-red-200 text-red-800 p-8 border border-red-800 rounded">{apiError}</div>}
    </div>
  );
};

export default CreateVenueForm;
