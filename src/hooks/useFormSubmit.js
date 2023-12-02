import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/utils";
import { useErrorHandling } from "./useErrorHandling";

export const useFormSubmit = (apiCall, { onSuccess, onFailure }) => {
  const navigate = useNavigate();
  const { showError, clearError } = useErrorHandling();

  const handleSubmit = async (data) => {
    clearError();

    try {
      const response = await apiCall(data);
      if (onSuccess) {
        onSuccess(response, navigate);
      }
    } catch (submissionError) {
      const formattedError = getErrorMessage(submissionError);
      showError(formattedError);
      if (onFailure) {
        onFailure(submissionError, navigate);
      }
    }
  };

  return { handleSubmit };
};
