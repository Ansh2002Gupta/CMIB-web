import axios from "axios";
import { API_VERSION_NUMBER } from "./constant/apiEndpoints";
import { getItem } from "./services/encrypted-storage-service";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // *** Just an example *** //
    const token = getItem("authToken");
    if (token) {
      const alreadyPresentHeaders = config.headers;
      config.headers = {
        ...alreadyPresentHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
    // ****** //
    config.headers["api-version"] = API_VERSION_NUMBER;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
