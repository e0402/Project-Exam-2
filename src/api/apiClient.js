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
    const response = await fetch(url, { ...options, headers });

    const contentType = response.headers.get("Content-Type");
    let responseJson = {};
    if (contentType && contentType.includes("application/json")) {
      responseJson = await response.json();
    }

    if (!response.ok) {
      const errorDetails = `Request URL: ${url}, Method: ${
        options.method
      }, Response: ${JSON.stringify(responseJson)}`;
      const error = new Error(
        responseJson.message ||
          `Network response was not ok (status: ${response.status})`
      );
      error.status = response.status;
      error.response = responseJson;
      error.details = errorDetails;
      throw error;
    }

    return responseJson;
  } catch (error) {
    throw error;
  }
};
