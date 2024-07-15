import { useEffect, useState } from "react";

function useFetch(url, method = "GET") {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [requestData, setRequestData] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    let options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET" && requestData) {
      options.body = JSON.stringify(requestData);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, method, requestData]);

  const doRequest = (data = null) => {
    setRequestData(data);
  };

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw Error("Failed to delete item");
      }
      setData(data.filter((item) => item.id !== id)); // Update data after successful delete
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch, doRequest, deleteItem };
}

export default useFetch;
