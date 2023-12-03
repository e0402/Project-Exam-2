import React from 'react';
import RegisterForm from '../../forms/RegisterForm';
import { FaUserPlus } from 'react-icons/fa';
import HelmetWrapper from '../../common/HelmetWrapper';

const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <HelmetWrapper 
        title="Register" 
        description="Create a new Holidaze account to book or list a venue" 
      />
      <h2 className="text-3xl font-bold text-center mb-4">Register <FaUserPlus className="inline-block ml-2 text-2xl relative top-[-2px]" /></h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
