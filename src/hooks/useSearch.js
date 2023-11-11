import { useState, useEffect } from "react";

const useSearch = (items, searchKey) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const searchResults = items.map((item) => item[searchKey]).filter(Boolean);

    const uniqueResults = Array.from(new Set(searchResults));

    const filteredSuggestions = uniqueResults
      .filter((result) =>
        result.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);

    setSuggestions(filteredSuggestions);
  }, [items, searchTerm, searchKey]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return {
    searchTerm,
    suggestions,
    handleSearchChange,
    setSuggestions,
  };
};

export default useSearch;
