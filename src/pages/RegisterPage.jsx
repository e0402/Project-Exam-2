import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
