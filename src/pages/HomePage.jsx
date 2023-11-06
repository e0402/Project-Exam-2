import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingsCard from '../components/common/ListingsCard';

const HomePage = () => {
  const [homes, setHomes] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: 10000,
  });
  const [starFilter, setStarFilter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.noroff.dev/api/v1/holidaze/venues');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHomes(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const uniqueCountries = Array.from(new Set(homes.map((home) => home.location?.country).filter(Boolean)));
      const filteredSuggestions = uniqueCountries.filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: checked }));
  };

  const handlePriceFilterChange = (value) => {
    setPriceFilter((prev) => ({
      ...prev,
      max: Number(value),
    }));
  };

  const handleStarFilterChange = (event) => {
    setStarFilter(Number(event.target.value));
  };

  const applyFilters = (homes, filters, searchTerm, priceFilter, starFilter) => {
    return homes.filter((home) => {
      const matchesSearchTerm = home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                home.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                home.location?.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAmenities = Object.entries(filters).every(([key, value]) => !value || home.meta[key]);
      const matchesPrice = home.price >= priceFilter.min && home.price <= priceFilter.max;
      const matchesStars = starFilter === 0 || (home.rating && home.rating >= starFilter);
      return matchesSearchTerm && matchesAmenities && matchesPrice && matchesStars;
    });
  };

  const filteredHomes = applyFilters(homes, filters, searchTerm, priceFilter, starFilter);

  return (
    <div className="container mx-auto px-4 py-6">
      {error && <p className="text-red-500">{error}</p>}
      <div className="relative">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Search homes by name, description, or country"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 list-none bg-white shadow-lg rounded border max-h-60 overflow-auto w-full">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="p-2 hover:bg-gray-100 cursor-pointer"
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

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(filters).map((filterKey) => (
          <label key={filterKey}>
            <input
              type="checkbox"
              name={filterKey}
              checked={filters[filterKey]}
              onChange={handleFilterChange}
            />
            {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
          </label>
        ))}
      </div>

      <div className="my-5">
        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
          Max Price: ${priceFilter.max}
        </label>
        <input
          id="priceRange"
          type="range"
          min="0"
          max="10000"
          value={priceFilter.max}
          onChange={(e) => handlePriceFilterChange(e.target.value)}
          className="mt-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <div className="my-5">
        <label htmlFor="starRating" className="block text-sm font-medium text-gray-700">
          Minimum Star Rating
        </label>
        <select
          id="starRating"
          value={starFilter}
          onChange={handleStarFilterChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="0">All Ratings</option>
          <option value="1">1 Star & Up</option>
          <option value="2">2 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
          <option value="4">4 Stars & Up</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {homes.length > 0 ? (
          filteredHomes.map((home) => (
            <ListingsCard key={home.id} home={home} />
          ))
        ) : (
          <p>Loading homes...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
