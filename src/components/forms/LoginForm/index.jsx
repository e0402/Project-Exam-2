import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../common/Input';
import { FormLayout } from '../../common/FormLayout';
import { useFormLogic } from '../../../hooks/useFormLogic';
import { useFormSubmit } from '../../../hooks/useFormSubmit';
import { loginSchema } from '../../../validation/validationSchemas';
import { loginUser } from '../../../api/authApi';
import Modal from '../../common/Modal';
import { useModal } from '../../common/ModalContext';
import { FaCheckCircle } from 'react-icons/fa';
import Spinner from '../../common/LoadingSpinner';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { getErrorMessage } from '../../../utils/utils';

const LoginForm = ({ onLoginSuccess, isModal }) => {
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { openModal, closeModal } = useModal();
  const { apiError, showError, clearError } = useErrorHandling();

  const { register, handleSubmit: handleValidationSubmit, formState: { errors } } = useFormLogic(loginSchema);

  const onSuccess = (response) => {
    clearError();
    const { accessToken, venueManager, name } = response;
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('isVenueManager', venueManager);
    localStorage.setItem('username', name);

    window.dispatchEvent(new CustomEvent('login-success'));
  
    setLoginSuccess(true);
    openModal("Booking successful!");
  
    setTimeout(() => {
      closeModal();
  
      if (onLoginSuccess) {
        onLoginSuccess();
      }
  
      if (!isModal) {
        navigate('/');
      }
    }, 2000);
  };
  
  const onFailure = (error) => {
    showError(getErrorMessage(error));
  };

  const { handleSubmit } = useFormSubmit(loginUser, { onSuccess, onFailure });

  const onSubmit = (data, event) => {
    clearError();
    handleSubmit(data, event);
  };

  return (
    <FormLayout onSubmit={handleValidationSubmit(onSubmit)}>
      {apiError && <div className="bg-red-200 text-red-800 p-4 border border-red-800 rounded">{apiError}</div>}
      <Input 
        register={register} 
        name="email" 
        placeholder="example123@stud.noroff.no" 
        label="Email" 
        type="email" 
        error={errors.email?.message} 
      />
      <Input 
        register={register} 
        name="password" 
        placeholder="Password_123" 
        label="Password" 
        type="password" 
        error={errors.password?.message} 
      />
      <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 font-semibold py-2 px-8 w-full rounded-full mt-8'>Log in</button>

      {loginSuccess && (
        <Modal>
          <div className="flex justify-center items-center mb-5">
            <FaCheckCircle className="text-green-500" style={{ fontSize: '80px' }} />
          </div>
          <p className='font-semibold text-3xl mb-10'>
            {"Login successful!"} 
          </p>
          <div><Spinner /></div>
        </Modal>
      )}
    </FormLayout>
  );
};

export default LoginForm;