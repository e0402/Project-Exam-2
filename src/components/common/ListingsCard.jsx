import React from 'react';

const ListingsCard = ({ home }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-48 bg-gray-200 flex-none">
        <img
          src={home.media}
          alt={home.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold">{home.name}</h3>
        <p className="flex-1 text-gray-600 mt-2">{home.description}</p>
      </div>
    </div>
  );
};

export default ListingsCard;
