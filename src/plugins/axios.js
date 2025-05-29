// src/plugins/axios.js
import axios from "axios";

// Create instance
const api = axios.create({
  baseURL: "https://fakestoreapi.com", // Change to your API
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Example: Add token if exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Handle errors globally
      switch (status) {
        case 401:
          alert("Unauthorized. Please login again.");
          break;
        case 403:
          alert("Forbidden access.");
          break;
        case 404:
          alert("API not found.");
          break;
        case 500:
          alert("Server error. Try again later.");
          break;
        default:
          alert(error.response.data?.message || "Unexpected error");
      }
    } else {
      alert("Network error or server not responding");
    }

    return Promise.reject(error);
  }
);

export default api;
