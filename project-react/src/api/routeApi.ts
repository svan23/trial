import axios from "axios";

// Always use the full URL
const API_BASE_URL = "http://128.85.34.139"; 

export const getBestMatch = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/top-match`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      // Add these options to help with CORS
      withCredentials: false
    });
    return response.data;
  } catch (error) {
    console.error("Error getting best match:", error);
    throw error;
  }
};