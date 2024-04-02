import useFetch from "../../../core/hooks/useFetch";

const useFetchListing = (url) => {
  const {
    apiStatus,
    data,
    error,
    fetchData,
    isError,
    isLoading,
    isSuccess,
    setData,
  } = useFetch({
    url: url,
    otherOptions: {
      skipApiCallOnMount: true,
    }
  });

  const fetchRecords = async (pageSize, currentPage, searchQuery, onSuccessCallback) => {
    const queryParams = {
      perPage: pageSize,
      page: currentPage,
      ...(searchQuery && { q: searchQuery }),
    };
  
    await fetchData({
      queryParamsObject: queryParams,
      onSuccessCallback: (responseData) => {
        setData({
          records: responseData.records,
          meta: responseData.meta,
        });
        if (onSuccessCallback) {
          onSuccessCallback(responseData);
        }
      },
      onErrorCallback: (error) => {
        console.error('Error fetching candidates:', error);
      },
    });
  };

  const records = data?.records || [];
  const metaData = data?.meta || null;

  return {
    apiStatus,
    records,
    error,
    fetchRecords,
    isError,
    isLoading,
    isSuccess,
    metaData,
  };
};

export default useFetchListing;