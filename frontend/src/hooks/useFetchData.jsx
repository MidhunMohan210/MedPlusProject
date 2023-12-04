import { useState, useEffect } from "react";
import { token } from "../config";

function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        // 'userType': type,
      });
      const result = await res.json();
      // console.log("result", result);
      console.log(result.data);

      if (!res.ok) {
        throw new Error(result.message);
      }

      setData(result.data);
      console.log("data", data);

      setLoading(false);
    } catch (fetchError) {
      console.log("fetchError", fetchError);
      setError(fetchError);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  console.log("data", data);

  return {
    data,
    loading,
    error,
    refetch,
    fetchData,
  };
}

export default useFetchData;
