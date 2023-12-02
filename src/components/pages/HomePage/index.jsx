import React from 'react';
import { useFetchVenues } from '../../../hooks/useFetchVenues';
import useSearch from '../../../hooks/useSearch';
import useFilters from '../../../hooks/useFilters';
import VenueCard from '../../common/VenueCard';
import { FaWifi, FaStar, FaPaw, FaParking, FaCoffee, FaSearch, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import Spinner from '../../common/LoadingSpinner';
import { useErrorHandling } from '../../../hooks/useErrorHandling';

const HomePage = () => {
  const { venues, isLoading } = useFetchVenues();
  const { apiError } = useErrorHandling();
  const searchKeys = ['name', 'location.country', 'location.city', 'location.continent'];
  const { searchTerm, suggestions, handleSearchChange, handleClearSearch, setSuggestions, setSearchTerm } = useSearch(venues, searchKeys);
  const { 
    filters, 
    priceFilter, 
    starFilter, 
    handleFilterChange, 
    handlePriceFilterChange, 
    handleStarFilterChange 
  } = useFilters();

  const applyFilters = (venues, filters, searchTerm, priceFilter, starFilter) => {
    return venues.filter((venue) => {
      const matchesSearchTerm = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                venue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                venue.location?.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAmenities = Object.entries(filters).every(([key, value]) => !value || venue.meta[key]);
      const matchesPrice = venue.price >= priceFilter.min && venue.price <= priceFilter.max;
      const matchesStars = starFilter === 0 || (venue.rating && venue.rating >= starFilter);
      return matchesSearchTerm && matchesAmenities && matchesPrice && matchesStars;
    });
  };

  const filteredVenues = applyFilters(venues, filters, searchTerm, priceFilter, starFilter);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  
  if (apiError) {
    return <div className="m-4 bg-red-200 text-red-800 p-8 border border-red-800 rounded">Error: {apiError}</div>;
  }

 return (
  <div className="2xl:container mx-auto">
    <div className='mx-auto max-w-lg sm:max-w-none'>
    <div
      className="relative mx-5 max-w-lg sm:max-w-none text-white text-center p-9 md:ml-12 md:mr-9 md:p-16 rounded-3xl mt-10 mb-12"
      style={{
        backgroundImage: 'url(/banner-placeholder.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl"></div>
    <h1 className="z-10 relative text-3xl md:text-5xl lg:text-5xl font-bold mt-20">Find your dream accommodation!</h1>
    <div className="relative mb-12 mt-12 w-2/3 mx-auto"> 
      <div className="absolute left-3 top-3.5 text-gray-600">
        <FaSearch size={14.7} />
      </div>
      <input
        type="text"
        className="pl-9 p-2 border border-gray-300 rounded-lg w-full placeholder-gray-800 text-black" 
        placeholder="Start exploring..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
          <FaTimesCircle 
            className="absolute right-3 top-3.5 text-gray-600 cursor-pointer"
            onClick={handleClearSearch}
            size={16}
          />
        )}
      {suggestions.length > 0 && (
      <ul className="absolute z-30 list-none bg-white shadow-lg rounded border max-h-60 overflow-auto w-full">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer text-black text-left"
            onClick={() => {
              setSearchTerm(suggestion);
              setSuggestions([]);
            }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    )}
      </div>
    </div>
    </div>
    
    <div className="flex mr-4 md:mr-8 lg:mr-7">
      <aside className="hidden md:block w-full md:w-2/4 pt-0 mt-0 p-12 mt-13 max-w-xxs">
        <div className="mb-4">
          <p className="font-bold text-m mt-0 mb-3">Includes:</p>
          {Object.keys(filters).map((filterKey) => (
            <label key={filterKey} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                name={filterKey}
                checked={filters[filterKey]}
                onChange={handleFilterChange}
              />
              {filterKey === 'wifi' && <FaWifi />}
              {filterKey === 'parking' && <FaParking />}
              {filterKey === 'breakfast' && <FaCoffee />}
              {filterKey === 'pets' && <FaPaw />}
              <span>{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</span>
            </label>
          ))}
        </div>

        <div className="my-10 max-w-xs">
          <label htmlFor="nightlyBudget" className="text-m font-bold text-gray-700 flex items-center mb-2">
          Per night:
          </label>
          <p>${priceFilter.max}</p>
          <input
            id="nightlyBudget"
            type="range"
            min="0"
            max="10000"
            value={priceFilter.max}
            onChange={(e) => handlePriceFilterChange(0, Number(e.target.value))}
            className="mt-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer w-full"
          />
        </div>

        <div className="my-5">
          <label htmlFor="starRating" className="text-m font-bold text-gray-700 flex items-center mb-3">
            Rating <FaStar className="ml-1" />:
          </label>
          <select
            id="starRating"
            value={starFilter}
            onChange={(e) => handleStarFilterChange(Number(e.target.value))}
            className="mt-2 block pl-2 pr-1 py-2 text-base border border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white"
          >
            <option value="0">All Ratings</option>
            <option value="1">1 Star +</option>
            <option value="2">2 Stars +</option>
            <option value="3">3 Stars +</option>
            <option value="4">4 Stars +</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </aside>

      <main className="flex-grow pl-4 mt-14">
        <div className="mx-auto sm:mx-2 md:mx-auto lg:mx-2 max-w-md sm:max-w-none md:max-w-lg lg:max-w-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-4">
          {isLoading ? (
            <Spinner />
          ) : filteredVenues.length > 0 ? (
            filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} owner={venue.owner} />
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <div className="flex flex-col items-center text-center">
                <div className="text-6xl lg:text-8xl text-orange-500">
                  <FaExclamationTriangle className='text-orange-300'/>
                </div>
                <p className="mt-4 font-semibold text-md lg:text-xl">Unfortunately, no homes match your search criteria</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  </div>
  );
};

export default HomePage;
