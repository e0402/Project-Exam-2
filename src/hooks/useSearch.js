import { useState, useEffect, useCallback } from "react";

const useSearch = (items) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const debouncedSearch = useCallback(() => {
    let handler;
    if (searchTerm) {
      handler = setTimeout(() => {
        const searchTermLower = searchTerm.toLowerCase();
        const searchResults = new Set();

        items.forEach((item) => {
          if (item.name.toLowerCase().includes(searchTermLower)) {
            searchResults.add(item.name);
          }

          const country = item.location?.country?.toLowerCase();
          if (country && country.includes(searchTermLower)) {
            searchResults.add(country);
          }

          const continent = item.location?.continent?.toLowerCase();
          if (continent && continent.includes(searchTermLower)) {
            searchResults.add(continent);
          }

          item.description
            .toLowerCase()
            .split(/\s+/)
            .forEach((word) => {
              if (word.includes(searchTermLower)) {
                searchResults.add(word);
              }
            });
        });

        setSuggestions(Array.from(searchResults).slice(0, 15));
      }, 300);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, items]);

  useEffect(() => {
    const cleanup = debouncedSearch();
    return cleanup;
  }, [debouncedSearch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  return {
    searchTerm,
    suggestions,
    handleSearchChange,
    handleClearSearch,
    setSuggestions,
    setSearchTerm,
  };
};

export default useSearch;
