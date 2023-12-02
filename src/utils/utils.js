export const getErrorMessage = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return "Bad request. Please check your input.";
      case 401:
        return "Incorrect username or password.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "Requested resource not found.";
      case 408:
        return "Request timeout, please try again.";
      case 422:
        return "Unprocessable entity. Validation failed for the input.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Server error, please try again later.";
      case 502:
        return "Bad gateway. The server received an invalid response.";
      case 503:
        return "Service unavailable. Please try again later.";
      case 504:
        return "Gateway timeout. The server did not respond in time.";
      default:
        return (
          error.response.data?.message ||
          "An unexpected error occurred, please try again."
        );
    }
  }
  if (error.request) {
    return "No response from the server, please check your network connection.";
  }
  return (
    error.message ||
    "Network error, please check your connection and try again."
  );
};
