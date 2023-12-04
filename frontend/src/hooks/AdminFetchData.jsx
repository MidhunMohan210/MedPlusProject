import { useState, useEffect } from "react";
import { adminToken } from "../config";

function AdminFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${adminToken}` },
        // 'userType': type,
      });
      const result = await res.json();
      console.log("result", result);
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
    // Call the fetchData function to refetch data
    fetchData();
  };

  console.log("data", data);

  return {
    data,
    loading,
    error,
    refetch,
    fetchData, // Include the refetch function in the returned object
  };
}

export default AdminFetchData;
