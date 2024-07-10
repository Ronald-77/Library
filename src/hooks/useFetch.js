import { useEffect, useState } from "react";

function useFetch(url, method = "GET") {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [requestData, setRequestData] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;

    let options = {
      signal,
      method
    };

    const fetchData = () => {
      if (method === "GET" || (method !== "GET" && requestData)) {
        setLoading(true);
        if (method !== "GET") {
          options = {
            ...options,
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
          };
        }
        fetch(url, options)
          .then((res) => {
            if (!res.ok) {
              throw Error("something went wrong");
            }
            return res.json();
          })
          .then((data) => {
            setData(data);
            setError(null);
            setLoading(false);
          })
          .catch((e) => {
            setError(e.message);
            setLoading(false);
          });
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      abortController.abort();
    };
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
      setData(data.filter(item => item.id !== id));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { data, loading, error, doRequest,deleteItem };
}

export default useFetch;
