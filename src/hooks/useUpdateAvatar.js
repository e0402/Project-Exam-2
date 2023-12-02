import { updateProfile } from "../api/profilesApi";
import { useErrorHandling } from "./useErrorHandling";
import { getErrorMessage } from "../utils/utils";

const useUpdateAvatar = (setUser) => {
  const { showError, clearError } = useErrorHandling();

  const updateAvatar = async (avatarUrl) => {
    clearError();
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        throw new Error("Username not found in storage.");
      }

      const updatedUserData = await updateProfile(username, {
        avatar: avatarUrl,
      });
      setUser(updatedUserData);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    }
  };

  return updateAvatar;
};

export default useUpdateAvatar;
