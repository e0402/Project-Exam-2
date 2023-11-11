import React from 'react';
import { useFetchVenues } from '../hooks/useFetchVenues';
import useSearch from '../hooks/useSearch';
import useFilters from '../hooks/useFilters';
import AllVenuesCard from '../components/common/AllVenuesCard';

const HomePage = () => {
  const { venues, error, isLoading } = useFetchVenues();
  const { searchTerm, suggestions, handleSearchChange, setSuggestions } = useSearch(venues);
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


  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className='text-center font-bold text-5xl mt-12 mb-12'>Find your dream accommodation!</h1>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Loading homes...</p>}
      
      {/* Filter sidebar */}
      <aside className="w-1/4 pt-12 mt-8 mr-12 self-start">
        {/* Checkboxes for Amenities Filters */}
        <div className="mb-4">
          {Object.keys(filters).map((filterKey) => (
            <label key={filterKey} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                name={filterKey}
                checked={filters[filterKey]}
                onChange={handleFilterChange}
              />
              <span>{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</span>
            </label>
          ))}
        </div>

        {/* Price Range Filter */}
        <div className="my-10">
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
            Max Price: ${priceFilter.max}
          </label>
          <input
            id="priceRange"
            type="range"
            min="0"
            max="10000"
            value={priceFilter.max}
            onChange={(e) => handlePriceFilterChange(0, Number(e.target.value))}
            className="mt-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer w-full"
          />
        </div>

        {/* Star Rating Filter */}
        <div className="my-5">
          <label htmlFor="starRating" className="block text-sm font-medium text-gray-700">
            Star Rating:
          </label>
          <select
            id="starRating"
            value={starFilter}
            onChange={(e) => handleStarFilterChange(Number(e.target.value))}
            className="mt-2 block pl-0 pr-1 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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

      {/* Main content */}
      <main className="flex-grow">
        {/* Search field and suggestions */}
        <div className="relative mb-10">
          <input
            type="text"
            className="p-2 border rounded w-full placeholder-gray-800"
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
                    searchTerm(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* AllVenuesCards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue) => (
              <AllVenuesCard key={venue.id} home={venue} />
            ))
          ) : (
            <p>No homes match your criteria.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;