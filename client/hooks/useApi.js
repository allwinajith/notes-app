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
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({ url, method, data, headers });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { sendRequest, loading, error };
};

export default useApi;
