import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="relative w-[100%] h-[21rem]">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="w-full h-full object-cover" />

            {/* Left navigation button */}
            {currentIndex > 0 && (
                <button onClick={goToPrevious} className="absolute top-1/2 left-4 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full">
                    <ChevronLeftIcon className="h-5 w-5" />
                </button>
            )}

            {/* Right navigation button */}
            {images.length > 1 && currentIndex < images.length - 1 && (
                <button onClick={goToNext} className="absolute top-1/2 right-4 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full">
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            )}

            {/* Indicators (Dots) */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 w-2 bg-white rounded-full ${currentIndex === index ? 'bg-opacity-100' : 'bg-opacity-50'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
