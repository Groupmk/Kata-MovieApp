import { useState } from "react";

export const useFetching = (Callback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetching = async (query, page) => {
    try {
      setLoading(true);
      await Callback(query, page);
    } catch (error) {
      setError(error.message);
      switch (error.response?.status) {
        case 400:
          setErrorType('clientError');
          break;
        case 500:
          setErrorType('serverError');
          break;
        default:
          setErrorType('unknownError');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return [fetching, loading, error, errorType, currentPage, setCurrentPage]; 
};
