import React from 'react';
import ProfileForm from '../../forms/ProfileForm';
import HelmetWrapper from '../../common/HelmetWrapper';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <HelmetWrapper 
        title="Profile" 
        description="Change your avatar and view your personal details." 
      />
      <h1 className="text-4xl font-bold text-center mb-12 mt-12">Personal Details</h1>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
