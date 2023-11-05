import React, { useEffect, useState } from 'react';
import ListingsCard from '../components/common/ListingsCard';

const HomePage = () => {
  const [homes, setHomes] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

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
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: checked }));
  };

  // Function to apply all filters
  const applyFilters = (homes, filters, searchTerm) => {
    return homes.filter((home) => {
      const matchesSearchTerm = home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                home.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAmenities = Object.entries(filters).every(([key, value]) => 
        !value || home.meta[key]
      );
      return matchesSearchTerm && matchesAmenities;
    });
  };

  const filteredHomes = applyFilters(homes, filters, searchTerm);

  return (
    <div className="container mx-auto px-4 py-6">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <input
          type="text"
          className="mb-4 p-2 border rounded"
          placeholder="Search homes"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Checkbox filters for amenities */}
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {homes.length > 0 ? (
          filteredHomes.map((home) => <ListingsCard key={home.id} home={home} />)
        ) : (
          <p>Loading homes...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
