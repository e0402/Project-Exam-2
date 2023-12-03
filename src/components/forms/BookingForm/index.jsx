import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormik } from 'formik';
import { bookingSchema } from '../../../validation/validationSchemas';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../../../api/bookingsApi';
import { useFormSubmit } from '../../../hooks/useFormSubmit';
import { useModal } from '../../common/ModalContext';
import Modal from '../../common/Modal';
import { FaCheckCircle } from 'react-icons/fa';
import Spinner from '../../common/LoadingSpinner';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { getErrorMessage } from '../../../utils/utils';

const BookingForm = ({ venueId, bookedDates, pricePerNight, maxGuests }) => {
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { apiError, showError, clearError } = useErrorHandling();

    const formik = useFormik({
        initialValues: {
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          guests: 1,
        },
        validationSchema: bookingSchema(bookedDates, maxGuests),
        onSubmit: async (values, { setSubmitting }) => {
        const bookingData = {
          dateFrom: values.startDate.toISOString(),
          dateTo: values.endDate.toISOString(),
          guests: values.guests,
          venueId,
        };
       
        await handleApiSubmit(bookingData);
        setSubmitting(false);
      },
    });

    const handleStartDateChange = (date) => {
        formik.setFieldValue('startDate', date);
        if (date >= formik.values.endDate) {
          const nextDay = new Date(date);
          nextDay.setDate(nextDay.getDate() + 1);
          formik.setFieldValue('endDate', nextDay);
        }
      };
  
    const { handleSubmit: handleApiSubmit } = useFormSubmit(createBooking, {
    onSuccess: (response) => {
        clearError();
        setBookingSuccess(true);
        openModal("Booking successful!");
        setTimeout(() => {
        navigate('/my-bookings');
        closeModal();
        }, 2000);
    },
    onFailure: (error) => {
        showError(getErrorMessage(error));
    },
    });

  const calculateNights = (start, end) => {
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalPrice = calculateNights(formik.values.startDate, formik.values.endDate) * pricePerNight;

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto space-y-4 p-10 rounded-lg shadow-lg border border-gray-200">
        {apiError && <div className="text-red-500 p-4 border border-red-800 rounded">{apiError}</div>}
  
        <div className="space-y-4">
          <div className="flex flex-col w-full">
            <label htmlFor="startDate" className="mb-1 text-sm font-semibold">From:</label>
            <DatePicker
              id="startDate"
              selected={formik.values.startDate}
              onChange={handleStartDateChange}
              excludeDates={bookedDates.map((date) => new Date(date))}
              minDate={new Date()}
              className="form-input rounded-md border-gray-300 cursor-pointer w-full rounded-lg border border-gray-400 p-1"
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <div className="text-red-500">{formik.errors.startDate}</div>
            )}
          </div>
  
          <div className="flex flex-col w-full">
            <label htmlFor="endDate" className="mb-1 text-sm font-semibold">To:</label>
            <DatePicker
              id="endDate"
              selected={formik.values.endDate}
              onChange={(date) => formik.setFieldValue('endDate', date)}
              excludeDates={bookedDates.map((date) => new Date(date))}
              minDate={new Date(formik.values.startDate.getTime() + 86400000)}
              className="form-input rounded-md border-gray-300 cursor-pointer w-full rounded-lg border border-gray-400 p-1"
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <div className="text-red-500">{formik.errors.endDate}</div>
            )}
          </div>
  
          <div className="flex flex-col w-full">
            <label htmlFor="guests" className="mb-1 text-sm font-semibold">Guests:</label>
            <input
              id="guests"
              type="number"
              value={formik.values.guests}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min="1"
              className="form-input rounded-md border-gray-300 cursor-pointer w-full rounded-lg border border-gray-400 p-1"
            />
            {formik.touched.guests && formik.errors.guests && (
              <div className="text-red-500">{formik.errors.guests}</div>
            )}
          </div>
        </div>
  
        {/* Displaying Total Price */}
        <div className="text-center text-lg my-4">
          <span className='font-bold'>Total Price:</span> ${totalPrice.toLocaleString()}
        </div>
  
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 font-semibold py-2 px-8 rounded-full w-full"
            disabled={formik.isSubmitting}
          >
            Book Now
          </button>
        </div>
      </form>
  
   {/* Conditional rendering of Modal */}
   {bookingSuccess && (
        <Modal>
          <div className="flex justify-center items-center mb-5">
            <FaCheckCircle className="text-green-500" style={{ fontSize: '80px' }} />
          </div>
          <p className='font-semibold text-3xl mb-10'>
            {"Booking successful!"} 
          </p>
          <div><Spinner /></div>
        </Modal>
      )}
    </div>
  );
};

export default BookingForm;
