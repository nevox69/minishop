import { useState, useEffect } from "react";
import api from "../api/axios";

const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, reFetch: fetchData };
};

export default useFetch;



