import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFormSubmit = (apiCall, { onSuccess, onFailure }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (data, event) => {
    if (event) event.preventDefault();
    setError(null);

    try {
      const response = await apiCall(data);

      if (onSuccess) {
        onSuccess(response, navigate);
      }
    } catch (submissionError) {
      console.error("Submission error:", submissionError);
      const errorMessage =
        submissionError.response?.data?.message ||
        "An error occurred during the request.";
      setError(errorMessage);
      if (onFailure) {
        onFailure(submissionError, navigate);
      }
    }
  };

  return { error, handleSubmit };
};
