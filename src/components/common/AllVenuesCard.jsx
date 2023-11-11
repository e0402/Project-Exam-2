import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../RatingStars';

const AllVenuesCard = ({ home }) => {
  return (
    <Link to={`/venue/${home.id}`} className="text-inherit no-underline">
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
          <h3 className="text-lg font-semibold mt-2">{home.name}</h3>
          <p className="flex-grow text-gray-600 mt-2 mb-2 line-clamp-3">{home.description}</p>
          {/* Display price */}
          <p className="text-xl font-bold mt-2">{home.price ? `$${home.price.toLocaleString()}` : 'Contact for price'}</p>
        </div>
        <a href={`/venue/${home.id}`}
          className="bg-orange-400 hover:bg-orange-500 text-white text-center font-bold py-2 px-4 rounded-b-lg inline-block w-full">
          View venue
        </a>
      </div>
    </Link>
  );
};

export default AllVenuesCard;
