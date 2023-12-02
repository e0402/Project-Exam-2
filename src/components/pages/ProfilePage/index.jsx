import React from 'react';
import ProfileForm from '../../forms/ProfileForm';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 mt-12">Personal details</h1>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
