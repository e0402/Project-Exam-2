import React from 'react';
import RegisterForm from '../../forms/RegisterForm';
import { FaUserPlus } from 'react-icons/fa';

const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Register <FaUserPlus className="inline-block ml-2 text-2xl relative top-[-2px]" /></h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
