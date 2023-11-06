import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../RatingStars';

const ListingsCard = ({ home }) => {
  return (
    <Link to={`/listing/${home.id}`} className="text-inherit no-underline">
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="w-full h-48 bg-gray-200 mb-2">
        <img
          src={home.media[0]}
          alt={home.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <RatingStars rating={home.rating} />
        <h3 className="text-lg font-semibold mt-5">{home.name}</h3>
        <p className="flex-grow text-gray-600 mt-2 mb-5 line-clamp-3">{home.description}</p>
      </div>
    </div>
    </Link>
  );
};

export default ListingsCard;
