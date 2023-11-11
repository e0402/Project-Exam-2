import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../common/Input';
import { FormLayout } from '../common/FormLayout';
import { useFormLogic } from '../../hooks/useFormLogic';
import { registerSchema } from '../../validation/validationSchemas';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { registerUser } from '../../api/authApi';
import { getErrorMessage } from '../../utils/utils';

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit: handleValidationSubmit, formState: { errors } } = useFormLogic(registerSchema);

  const onSuccess = (response) => {
console.log('Registration successful:', response)
    navigate('/login');
  };

  const onFailure = (error) => {
    const errorMessage = getErrorMessage(error);
    console.error("Registration Failed: ", errorMessage);
  };

  const { error, handleSubmit } = useFormSubmit(registerUser, { onSuccess, onFailure });

  const onSubmit = (data, event) => {
    handleSubmit(data, event);
  };

  return (
    <FormLayout onSubmit={handleValidationSubmit(onSubmit)}>
      {error && <div className="alert alert-danger">{error}</div>}
      <Input register={register} name="name" label="Username" error={errors.name?.message} />
      <Input register={register} name="email" label="Email" type="email" error={errors.email?.message} />
      <Input register={register} name="password" label="Password" type="password" error={errors.password?.message} />
      <Input register={register} name="avatar" label="Avatar URL (optional)" error={errors.avatar?.message} />
      <Input register={register} name="venueManager" label="Are you a venue manager?" type="checkbox" error={errors.venueManager?.message} />
      <button type="submit">Register</button>
    </FormLayout>
  );
};

export default RegisterForm;
