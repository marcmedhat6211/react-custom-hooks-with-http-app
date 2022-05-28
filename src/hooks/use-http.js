import { useState, useCallback } from "react";

/**
 * requestConfig is an object where you pass everything about the request
 * applyData is a function that handles what happens with the request
 */
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // here we are using the useCallback hook to ensure that this send request method which is an object, will never run again to avoid infinite loop
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []); // now this will cause another problem, because of course requestConfig and applyData are objects too. The solution is to wrap them with useCallback too where you call them

  return {
    // you can write the object like this if you have the keyname and the value name with the same values
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
