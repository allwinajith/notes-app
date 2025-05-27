import { useState } from "react";
import axios from "axios";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async ({
    url,
    method = "get",
    data = null,
    headers = {},
    withAuth = false,
  }) => {
    setLoading(true);
    setError(null);
    try {
      if (withAuth) {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found. Please login.");
        }
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await axios({ url, method, data, headers });
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; 
      }
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { sendRequest, loading, error };
};

export default useApi;
