import axios from "axios";

export const getApiData = async (apiUrl) => {
  if (!apiUrl) {
    console.error("API URL is required");
    return undefined;
  }

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `API request failed with status ${error.response.status}:`,
          error.response.data
        );
      } else if (error.request) {
        console.error("API request failed: No response received", error.request);
      } else {
        console.error("API request failed:", error.message);
      }
    } else {
      console.error("Unexpected error during API request:", error);
    }
    return undefined;
  }
};
