import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating, outOf = 5 }) => {
  let stars = [];

  for (let i = 1; i <= outOf; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} color="black" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} color="black" />);
    } else {
      stars.push(<FaRegStar key={i} color="black" />);
    }
  }

  return <div className="flex">{stars}</div>;
};

export default RatingStars;
