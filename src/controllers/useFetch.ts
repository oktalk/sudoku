import React from 'react';

export const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiData, setApiData] = React.useState();
  const [serverError, setServerError] = React.useState();

  React.useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await (await fetch(url)).json();
        setApiData(data);
        setIsLoading(false);
      } catch (err: any) {
        setServerError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, apiData, serverError };
};
