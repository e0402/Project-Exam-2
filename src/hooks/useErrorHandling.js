import { useState } from "react";

export const useErrorHandling = (initialState = "") => {
  const [error, setError] = useState(initialState);

  const showError = (errorMessage) => {
    setError(errorMessage);
  };

  const clearError = () => {
    setError("");
  };

  return {
    error,
    showError,
    clearError,
  };
};
