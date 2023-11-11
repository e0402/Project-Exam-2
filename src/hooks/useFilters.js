import { useState, useCallback } from "react";

const useFilters = () => {
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

  const handleFilterChange = useCallback((event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  }, []);

  const handlePriceFilterChange = useCallback((min, max) => {
    setPriceFilter({ min, max });
  }, []);

  const handleStarFilterChange = useCallback((rating) => {
    setStarFilter(rating);
  }, []);

  return {
    filters,
    priceFilter,
    starFilter,
    handleFilterChange,
    handlePriceFilterChange,
    handleStarFilterChange,
  };
};

export default useFilters;
