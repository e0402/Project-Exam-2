import React from 'react';
import { ImageSlider } from '../ImageSlider';

const singlePlaceholderImage = "/banner-placeholder.jpg";
const numberOfPlaceholderSlides = 1;
const avatarPlaceholderImage = "/avatar-placeholder.png";

const ImageDisplay = ({ media, displayType = 'slider', className = '' }) => {
    const getPlaceholderImages = () => {
      return Array(numberOfPlaceholderSlides).fill(singlePlaceholderImage);
    };
  
    if (displayType === 'slider') {
      const imagesToShow = media && media.length > 0 ? media : getPlaceholderImages();
      return <ImageSlider images={imagesToShow} />;
    } 
    else if (displayType === 'single') {
        const imageUrl = media && media[0] ? media[0] : singlePlaceholderImage;
        return <img src={imageUrl} alt="Venue placeholder" className={`${className}`} />;
    }
    else if (displayType === 'avatar') {
      const avatarImageUrl = media && media[0] ? media[0] : avatarPlaceholderImage;
      return <img src={avatarImageUrl} alt="Avatar placeholder" className={`${className}`} />;
    }
  
    return null;
  };

  export default ImageDisplay