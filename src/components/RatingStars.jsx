import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating, outOf = 5 }) => {
  let stars = [];

  for (let i = 1; i <= outOf; i++) {
    if (i <= rating) {
      // Full star
      stars.push(<FaStar key={i} color="gold" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // Half star
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      // Empty star
      stars.push(<FaRegStar key={i} color="gold" />);
    }
  }

  return <div className="flex">{stars}</div>;
};

export default RatingStars;
