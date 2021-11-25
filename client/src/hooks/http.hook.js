import { useState, useCallback } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const request = useCallback(
    async (url, method = 'POST', body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        setLoading(false);
        setMessage(data.message);

        return data;
      } catch (e) {
        setLoading(false);
        setMessage(e.message);
        throw e;
      }
    },
    []
  );

  const clearMessage = (timeout) => setTimeout(() => setMessage(null), timeout);

  return { loading, request, message, clearMessage };
};

export default useHttp;
