const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiClient = async (endpoint, options = {}) => {
  const base = API_BASE_URL.replace(/\/+$/, "");
  const urlPath = endpoint.replace(/^\/+/, "");
  const url = `${base}/${urlPath}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = localStorage.getItem("authToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.body && !["GET", "HEAD"].includes(options.method)) {
    options.body = JSON.stringify(options.body);
  }

  if (["GET", "HEAD"].includes(options.method)) {
    delete options.body;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      try {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message ||
            `Network response was not ok (status: ${response.status})`
        );
      } catch (jsonParseError) {
        throw new Error(
          `Network response was not ok and error message could not be parsed (status: ${response.status})`
        );
      }
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
