


const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000" 
  : "https://management-order-2.onrender.com"; // Render backend



export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ API call failed: ${endpoint}`, error.message);
    throw error;
  }
};


export { API_BASE_URL };
