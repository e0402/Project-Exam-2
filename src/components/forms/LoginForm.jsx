import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../common/Input';
import { FormLayout } from '../common/FormLayout';
import { useFormLogic } from '../../hooks/useFormLogic';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { loginSchema } from '../../validation/validationSchemas';
import { loginUser } from '../../api/authApi';
import { getErrorMessage } from '../../utils/utils'

const LoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit: handleValidationSubmit, formState: { errors } } = useFormLogic(loginSchema);

  const onSuccess = (response) => {
    localStorage.setItem('authToken', response.accessToken);
    console.log('login successful:', response)
    navigate('/register');
};


  const onFailure = (error) => {
    const errorMessage = getErrorMessage(error);
    console.error("Login Failed: ", errorMessage);
  };

  const { error, handleSubmit } = useFormSubmit(loginUser, { onSuccess, onFailure });

  const onSubmit = (data, event) => {
    handleSubmit(data, event);
  };

  return (
    <FormLayout onSubmit={handleValidationSubmit(onSubmit)}>
      {error && <div className="alert alert-danger">{error}</div>}
      <Input register={register} name="email" label="Email" type="email" error={errors.email?.message} />
      <Input register={register} name="password" label="Password" type="password" error={errors.password?.message} />
      <button type="submit">Login</button>
    </FormLayout>
  );
};

export default LoginForm;
