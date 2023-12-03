import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../common/Input';
import { FormLayout } from '../../common/FormLayout';
import { useFormLogic } from '../../../hooks/useFormLogic';
import { registerSchema } from '../../../validation/validationSchemas';
import { useFormSubmit } from '../../../hooks/useFormSubmit';
import { registerUser } from '../../../api/authApi';
import Modal from '../../common/Modal';
import { useModal } from '../../common/ModalContext';
import { FaCheckCircle } from 'react-icons/fa';
import Spinner from '../../common/LoadingSpinner';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { getErrorMessage } from '../../../utils/utils';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [venueManager, setVenueManager] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { openModal, closeModal } = useModal();
  const { apiError, showError, clearError } = useErrorHandling();

  const {
    register,
    handleSubmit: handleValidationSubmit,
    formState: { errors },
  } = useFormLogic(registerSchema);

  const onSuccess = (response) => {
    clearError()
    setRegistrationSuccess(true);
    openModal("Registration successful!");
    setTimeout(() => {
      navigate('/login');
      closeModal();
    }, 2000);
  };

  const onFailure = (error) => {
    showError(getErrorMessage(error));
  };

  const { handleSubmit } = useFormSubmit(registerUser, { onSuccess, onFailure });

  const handleVenueManagerChange = (event) => {
    setVenueManager(event.target.checked);
  };

  const onSubmit = (data, event) => {
    clearError();
    data.venueManager = venueManager;
    handleSubmit(data, event);
  };

  return (
    <FormLayout onSubmit={handleValidationSubmit(onSubmit)}>
      {apiError && <div className="bg-red-200 text-red-800 p-4 border border-red-800 rounded">{apiError}</div>}
      <Input
        register={register}
        name="name"
        label="Username"
        placeholder="User123" 
        error={errors.name?.message}
      />
      <Input
        register={register}
        name="email"
        label="Email"
        placeholder="example123@stud.noroff.no" 
        type="email"
        error={errors.email?.message}
      />
      <Input
        register={register}
        name="password"
        label="Password"
        placeholder="PassWord123" 
        type="password"
        error={errors.password?.message}
      />
      <Input
        register={register}
        name="avatar"
        label="Avatar URL (optional)"
        placeholder="http://url.com/image.jpg" 
        error={errors.avatar?.message}
      />
      <div className="flex items-center my-8">
        <input
          id="venueManager"
          type="checkbox"
          checked={venueManager}
          onChange={handleVenueManagerChange}
          className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
        />
        <label htmlFor="venueManager" className="ml-2 block text-sm leading-5 text-gray-900">
          Are you a venue manager?
        </label>
      </div>
      {errors.venueManager && <p className="text-sm text-red-600">{errors.venueManager.message}</p>}
      <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 font-semibold py-2 px-8 w-full rounded-full mt-2'>Create account</button>
      
      {registrationSuccess && (
        <Modal>
          <div className="flex justify-center items-center mb-5">
            <FaCheckCircle className="text-green-500" style={{ fontSize: '80px' }} />
          </div>
          <p className='font-semibold text-3xl mb-10'>
            {"Registration successful!"} 
          </p>
          <div><Spinner /></div>
        </Modal>
      )}
    </FormLayout>
  );
};

export default RegisterForm;
