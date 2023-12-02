import { useState, useCallback } from "react";

export function useErrorHandling() {
  const [apiError, setApiError] = useState(null);

  const showError = useCallback((message) => {
    setApiError(message);
  }, []);

  const clearError = useCallback(() => {
    setApiError(null);
  }, []);

  const getCombinedErrorMessage = (fetchError) => {
    if (fetchError && apiError) {
      return `${fetchError}. ${apiError}`;
    } else if (fetchError) {
      return fetchError;
    } else if (apiError) {
      return apiError;
    }
    return null;
  };

  return { apiError, showError, clearError, getCombinedErrorMessage };
}
