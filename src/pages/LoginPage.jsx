import React from 'react';
import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
